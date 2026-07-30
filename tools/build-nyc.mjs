#!/usr/bin/env node
// Build the NYC portrait from per-dimension research dossiers.
//
//   node tools/build-nyc.mjs <dossierDir> [reviewDir]
//
// Emits:
//   data/nyc_ny.json          canonical citywide portrait (boroughs + global lens embedded)
//   data/nyc_<borough>.json   five derived borough portraits
//   docs/data-nyc.js          the six JURISDICTIONS entries the D3 viz consumes
//
// A dossier in <reviewDir>/<slug>.corrected.json always wins over
// <dossierDir>/<slug>.json — adversarially-reviewed data supersedes the draft.

import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const [dossierDir, reviewDir] = process.argv.slice(2);
if (!dossierDir) {
    console.error('usage: node tools/build-nyc.mjs <dossierDir> [reviewDir]');
    process.exit(1);
}

const REPO = resolve(import.meta.dirname, '..');

// Wedge order drives the viz layout. Keep it stable — reordering rotates the chart.
const ECOLOGICAL = [
    'climate change', 'ocean acidification', 'chemical pollution',
    'nitrogen & phosphorus loading', 'freshwater withdrawals', 'land conversion',
    'biodiversity loss', 'air pollution', 'ozone layer depletion',
    'waste & materials', 'heat & climate resilience',
];
const SOCIAL = [
    'food', 'health', 'education', 'income & work', 'water & sanitation',
    'energy', 'networks', 'housing', 'gender equality', 'social equity',
    'political voice', 'peace & justice', 'mobility',
];

const BOROUGHS = {
    bronx:       { name: 'The Bronx',     county: 'Bronx County',    pop: '~1,356,000' },
    brooklyn:    { name: 'Brooklyn',      county: 'Kings County',    pop: '~2,561,000' },
    manhattan:   { name: 'Manhattan',     county: 'New York County', pop: '~1,597,000' },
    queens:      { name: 'Queens',        county: 'Queens County',   pop: '~2,252,000' },
    statenIsland:{ name: 'Staten Island', county: 'Richmond County', pop: '~491,000' },
};

// ---------------------------------------------------------------- load

function loadDossiers() {
    const found = new Map();
    const readDir = (dir, suffix, reviewed) => {
        if (!dir || !existsSync(dir)) return;
        for (const f of readdirSync(dir)) {
            if (!f.endsWith(suffix)) continue;
            let d;
            try {
                d = JSON.parse(readFileSync(join(dir, f), 'utf8'));
            } catch (e) {
                console.warn(`  ! ${f}: invalid JSON, skipped (${e.message})`);
                continue;
            }
            if (!d.dimension) {
                console.warn(`  ! ${f}: no "dimension" field, skipped`);
                continue;
            }
            found.set(d.dimension, { ...d, _reviewed: reviewed, _file: f });
        }
    };
    readDir(dossierDir, '.json', false);
    readDir(reviewDir, '.corrected.json', true); // reviewed wins
    return found;
}

// ------------------------------------------------------- shape a dimension

const numOrNull = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : null);

// Research agents write prose here ("consumption-based (global supply chains); framing
// only"), so coerce to the schema enum and keep the prose as a separate note.
function normalizePvC(raw) {
    if (typeof raw !== 'string' || !raw.trim()) return [undefined, undefined];
    const s = raw.toLowerCase();
    const prod = s.includes('production');
    const cons = s.includes('consumption');
    let val;
    if (prod && cons) val = 'both';
    else if (cons) val = 'consumption-based';
    else if (prod) val = 'production-based';
    else if (s.includes('not applicable') || s.includes('n/a')) val = 'not-applicable';
    const isBare = ['production-based', 'consumption-based', 'both', 'not-applicable'].includes(raw.trim());
    return [val, isBare ? undefined : raw.trim()];
}

const SCALES = ['borough', 'county', 'metro', 'state', 'national', 'global', 'city'];

// Same treatment for geographic scale: agents qualify it ("city (Jamaica Bay)",
// "county-level proxy"), so coerce to the enum and keep the qualifier as a note.
function normalizeScale(raw, fallback) {
    if (typeof raw !== 'string' || !raw.trim()) return [fallback, undefined];
    const s = raw.toLowerCase();
    const val = SCALES.find((x) => s.includes(x)) || fallback;
    const isBare = SCALES.includes(raw.trim());
    return [val, isBare ? undefined : raw.trim()];
}

function normalizeSubIndicators(subs) {
    if (!Array.isArray(subs)) return undefined;
    return subs.map((si) => {
        const [scale, note] = normalizeScale(si.geographicScale, undefined);
        const out = { ...si };
        if (scale) out.geographicScale = scale; else delete out.geographicScale;
        if (note) out.geographicScaleNote = note;
        return out;
    });
}


// Reviewers sometimes add prose keys (e.g. "patternNote") alongside the borough keys.
// Split them out: object values are borough entries, string values become a note.
function splitBoroughs(raw) {
    if (!raw || typeof raw !== 'object') return [undefined, undefined];
    const entries = {}, notes = [];
    for (const [k, v] of Object.entries(raw)) {
        if (v && typeof v === 'object' && !Array.isArray(v)) entries[k] = v;
        else if (typeof v === 'string' && v.trim()) notes.push(v.trim());
    }
    return [Object.keys(entries).length ? entries : undefined, notes.length ? notes.join(' ') : undefined];
}

// Canonical (schema-compliant) form: keeps boroughs + the global lens.
function toCanonical(d) {
    const l = d.local || {};
    const ring = d.ring === 'social' ? 'social' : 'ecological';
    const out = {
        name: d.dimension,
        lens: ring === 'social' ? 'local-social' : 'local-ecological',
        level: numOrNull(l.level),
        levelRationale: l.levelRationale,
        indicator: l.indicator,
        value: l.value ?? null,
        year: Number.isInteger(l.year) ? l.year : null,
        target: l.target,
        context: l.context,
        source: l.source,
        sourceUrl: l.sourceUrl,
        screenshot: null,
        confidence: l.confidence || 'medium',
        geographicScale: normalizeScale(l.geographicScale, 'city')[0],
        actions: d.actions || [],
        reviewStatus: {
            state: d._reviewed ? 'adversarially-reviewed' : 'draft',
            reviewedLevel: numOrNull(l.level),
            notes: d._reviewed
                ? 'Corrections from an independent adversarial review applied.'
                : 'DRAFT severity — not yet adversarially reviewed or expert-validated.',
        },
    };
    const [lpvc, lpvcNote] = normalizePvC(l.productionVsConsumption);
    if (lpvc) out.productionVsConsumption = lpvc;
    if (lpvcNote) out.productionVsConsumptionNote = lpvcNote;
    const [lbor, lborNote] = splitBoroughs(l.boroughs);
    if (lbor) out.boroughs = lbor;
    if (lborNote) out.boroughsNote = lborNote;
    if (l.neighborhoodNote) out.neighborhoodNote = l.neighborhoodNote;
    if (l.subIndicators?.length) out.subIndicators = normalizeSubIndicators(l.subIndicators);
    if (d.global) {
        const g = d.global;
        out.global = {
            lens: g.lens || (ring === 'social' ? 'global-social' : 'global-ecological'),
            level: numOrNull(g.level),
            levelRationale: g.levelRationale,
            indicator: g.indicator,
            value: g.value ?? null,
            year: Number.isInteger(g.year) ? g.year : null,
            target: g.target,
            context: g.context,
            source: g.source,
            sourceUrl: g.sourceUrl,
            confidence: g.confidence || 'low',
            geographicScale: 'global',
        };
        const [gpvc, gpvcNote] = normalizePvC(g.productionVsConsumption);
        if (gpvc) out.global.productionVsConsumption = gpvc;
        if (gpvcNote) out.global.productionVsConsumptionNote = gpvcNote;
        // Ruling R7: borough data measured on the global/consumption basis rides on the
        // global lens, never in local.boroughs.
        const [gbor, gborNote] = splitBoroughs(g.boroughs);
        if (gbor) out.global.boroughs = gbor;
        if (gborNote) out.global.boroughsNote = gborNote;
    }
    if (d.policyAnchors?.length) {
        // Drop null/absent fields rather than emitting them — the schema types these as
        // strings, and an agent that omits a source URL should produce a missing key.
        out.policyAnchors = d.policyAnchors.map((p) => {
            const a = {};
            if (p.name) a.name = p.name;
            if (p.relevance) a.relevance = p.relevance;
            const st = p.status2026 || p.status;
            if (st) a.status = st;
            if (typeof p.sourceUrl === 'string' && p.sourceUrl) a.sourceUrl = p.sourceUrl;
            return a;
        });
    }
    if (d.petalumaContrast) out.comparisonNote = d.petalumaContrast;
    if (d.dataGaps?.length) out.dataGaps = d.dataGaps;
    if (d.expertsForPhase2?.length) out.experts = d.expertsForPhase2;
    return out;
}

// A placeholder for a dimension nothing has been researched for yet. An explicit
// "no data" wedge is better than a silently missing one.
function placeholder(name, ring) {
    return {
        name,
        lens: ring === 'social' ? 'local-social' : 'local-ecological',
        level: null,
        indicator: 'Not yet researched',
        value: null,
        year: null,
        target: 'TBD',
        context: 'No research dossier has been produced for this dimension yet. Rendered as an explicit data gap rather than omitted, so the portrait does not read as complete when it is not.',
        source: 'Pending',
        sourceUrl: 'https://github.com/mia-i-shell/doughnut-petaluma',
        screenshot: null,
        confidence: 'low',
        geographicScale: 'city',
        actions: [],
        reviewStatus: { state: 'draft', notes: 'Not yet researched.' },
    };
}

// Borough view: prefer the borough's own reading, else fall back to the citywide
// figure and say so in the context. Never silently present city data as borough data.
function toBoroughDimension(canonical, key) {
    const b = canonical.boroughs?.[key];
    const base = { ...canonical };
    delete base.boroughs;
    const label = BOROUGHS[key].name;

    if (b && b.value != null) {
        return {
            ...base,
            level: numOrNull(b.level) ?? canonical.level,
            value: b.value,
            year: Number.isInteger(b.year) ? b.year : canonical.year,
            source: b.source || canonical.source,
            sourceUrl: b.sourceUrl || canonical.sourceUrl,
            confidence: b.confidence || canonical.confidence,
            geographicScale: 'borough',
            context: `${label}: ${b.value}\n\nCitywide for comparison: ${canonical.value ?? 'n/a'}\n\n${canonical.context ?? ''}`.trim(),
        };
    }
    const why = b?.note ? ` ${b.note}` : ' No borough-level figure is published for this indicator.';
    const out = {
        ...base,
        geographicScale: 'city',
        confidence: 'low',
        context: `⚠ Citywide figure shown — not specific to ${label}.${why}\n\n${canonical.context ?? ''}`.trim(),
    };
    // R7: where the borough figure exists only on the global/consumption basis, surface it
    // as an explicitly-labelled subIndicator rather than as this borough's headline.
    const gb = canonical.global?.boroughs?.[key];
    if (gb && gb.value != null) {
        out.subIndicators = [
            {
                name: `${label} — ${canonical.global.indicator} (different basis: ${canonical.global.productionVsConsumption || canonical.global.lens})`,
                value: gb.value,
                year: Number.isInteger(gb.year) ? gb.year : canonical.global.year,
                source: gb.source || canonical.global.source,
                sourceUrl: gb.sourceUrl || canonical.global.sourceUrl,
                geographicScale: 'borough',
                geographicScaleNote: `Borough figure measured on the ${canonical.global.productionVsConsumption || 'global'} basis — NOT comparable with the local headline indicator above.`,
            },
            ...(out.subIndicators || []),
        ];
    }
    return out;
}

// ---------------------------------------------------------------- emit

const dossiers = loadDossiers();
console.log(`Loaded ${dossiers.size} dossier(s):`);
for (const [dim, d] of [...dossiers].sort()) {
    console.log(`  ${d._reviewed ? '✓ reviewed' : '· draft   '}  ${dim}  (${d._file})`);
}

const build = (names, ring) =>
    names.map((n) => (dossiers.has(n) ? toCanonical(dossiers.get(n)) : placeholder(n, ring)));

const ecological = build(ECOLOGICAL, 'ecological');
const social = build(SOCIAL, 'social');

const researched = [...ecological, ...social].filter((d) => d.level !== null || d.value !== null).length;
const reviewed = [...ecological, ...social].filter((d) => d.reviewStatus?.state === 'adversarially-reviewed').length;

const CITY_DESC =
    'The largest city in the United States: 8.3 million people across five boroughs and 59 community districts, ' +
    'and the command centre of global finance. Portrait built on DEAL\'s full four-lens City Portrait method — ' +
    'local-social and local-ecological scored as the two rings, global-social and global-ecological carried per ' +
    'dimension — and anchored to Local Law 97, PlaNYC and City of Yes. Every dimension is disaggregated to all ' +
    'five boroughs. Companion to the Petaluma portrait: same framework, opposite scale.';

const citywide = {
    meta: {
        id: 'nyc_ny',
        name: 'New York City',
        region: 'New York',
        country: 'US',
        population: '~8,258,000',
        description: CITY_DESC,
        jurisdictionType: 'city',
        subJurisdictions: Object.keys(BOROUGHS),
        lenses: ['local-social', 'local-ecological', 'global-social', 'global-ecological'],
        policyAnchor: 'Local Law 97 of 2019 · PlaNYC: Getting Sustainability Done (2023) · City of Yes (2024) · NY State CLCPA',
        coordinates: { lat: 40.7128, lng: -74.006 },
        lastUpdated: new Date().toISOString().slice(0, 10),
        contributors: ['CalDEC', 'Claude research + adversarial review fan-out'],
    },
    social,
    ecological,
};

mkdirSync(join(REPO, 'data'), { recursive: true });
writeFileSync(join(REPO, 'data', 'nyc_ny.json'), JSON.stringify(citywide, null, 2) + '\n');
console.log('\nwrote data/nyc_ny.json');

for (const [key, meta] of Object.entries(BOROUGHS)) {
    const portrait = {
        meta: {
            id: `nyc_${key.toLowerCase()}`,
            name: meta.name,
            region: 'New York',
            country: 'US',
            population: meta.pop,
            description: `${meta.name} (${meta.county}), one of New York City's five boroughs. Derived from the NYC citywide portrait: each dimension shows the borough's own figure where one is published, and falls back to the citywide figure — flagged in the context — where it is not.`,
            jurisdictionType: 'borough',
            parentId: 'nyc_ny',
            lenses: citywide.meta.lenses,
            policyAnchor: citywide.meta.policyAnchor,
            lastUpdated: citywide.meta.lastUpdated,
        },
        social: social.map((d) => toBoroughDimension(d, key)),
        ecological: ecological.map((d) => toBoroughDimension(d, key)),
    };
    writeFileSync(join(REPO, 'data', `nyc_${key.toLowerCase()}.json`), JSON.stringify(portrait, null, 2) + '\n');
    const own = [...portrait.social, ...portrait.ecological].filter((d) => d.geographicScale === 'borough').length;
    console.log(`wrote data/nyc_${key.toLowerCase()}.json  (${own}/24 dimensions with own data)`);
}

// ---- docs/data-nyc.js: the viz layer.
// Merges into the JURISDICTIONS object data.js defines, so Petaluma keeps working.

const vizDim = (d) => ({
    name: d.name,
    level: d.level === null ? 'NaN' : d.level,
    indicator: d.indicator,
    value: d.value ?? 'No data',
    year: d.year,
    target: d.target,
    context: d.context,
    source: d.source,
    sourceUrl: d.sourceUrl,
    screenshot: null,
    confidence: d.confidence,
    geographicScale: d.geographicScale,
    globalLens: d.global
        ? { level: d.global.level === null ? 'NaN' : d.global.level,
            indicator: d.global.indicator, value: d.global.value,
            context: d.global.context, source: d.global.source, sourceUrl: d.global.sourceUrl }
        : null,
    comparisonNote: d.comparisonNote || null,
    boroughs: d.boroughs || null,
    globalBoroughs: d.global?.boroughs || null,
    levelRationale: d.levelRationale || null,
    reviewState: d.reviewStatus?.state || 'draft',
    dataGaps: d.dataGaps || [],
    actions: d.actions || [],
});

const coverage = ` — FIRST DRAFT: ${researched} of 24 dimensions researched, ${reviewed} adversarially reviewed. Un-researched dimensions are shown as explicit grey gaps.`;

const entries = {
    city_nyc: {
        name: 'New York City',
        population: citywide.meta.population,
        description: CITY_DESC + coverage,
        social: social.map(vizDim),
        ecological: ecological.map(vizDim),
    },
};
for (const [key, meta] of Object.entries(BOROUGHS)) {
    entries[`nyc_${key.toLowerCase()}`] = {
        name: `NYC — ${meta.name}`,
        population: meta.pop,
        description: `${meta.name} (${meta.county}). Borough view of the NYC portrait: the borough's own figure where published, otherwise the citywide figure, flagged in the detail panel.`,
        social: social.map((d) => vizDim(toBoroughDimension(d, key))),
        ecological: ecological.map((d) => vizDim(toBoroughDimension(d, key))),
    };
}

const js = `// NYC Doughnut portrait — GENERATED FILE, DO NOT EDIT BY HAND.
// Regenerate:  node tools/build-nyc.mjs <dossierDir> [reviewDir]
// Source of truth: data/nyc_ny.json (canonical) + the per-dimension research dossiers.
//
// Six jurisdictions: citywide plus each of the five boroughs.
// Merges into the JURISDICTIONS object that data.js defines, so Petaluma is untouched.
//
// Coverage at generation time: ${researched}/24 dimensions researched, ${reviewed}/24 adversarially reviewed.
// Dimensions with no dossier yet render as explicit "Not yet researched" gaps (level NaN).

const NYC_JURISDICTIONS = ${JSON.stringify(entries, null, 4)};

if (typeof JURISDICTIONS !== 'undefined') {
    Object.assign(JURISDICTIONS, NYC_JURISDICTIONS);
} else if (typeof window !== 'undefined') {
    window.JURISDICTIONS = NYC_JURISDICTIONS;
}
`;
writeFileSync(join(REPO, 'docs', 'data-nyc.js'), js);
console.log(`wrote docs/data-nyc.js  (6 jurisdictions; ${researched}/24 researched, ${reviewed}/24 reviewed)`);
