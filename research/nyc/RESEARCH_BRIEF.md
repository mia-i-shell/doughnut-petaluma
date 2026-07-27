# NYC Doughnut Portrait — Shared Research Brief (v1)

You are one of 24 research agents building a Doughnut Economics portrait for
**New York City**, using Kate Raworth's framework and DEAL's City Portrait method.
This is a companion to an existing portrait of Petaluma, CA. The NYC portrait must
be **substantively distinct**: a 8.3M-person global megacity, not a 60k small town.

Today's date: **2026-07-25**. Your training data ends earlier than that. **You must
use WebSearch and WebFetch for every data point.** Do not assert a number from memory.

---

## 1. Geographic resolution — REQUIRED

For your dimension you must report, where published:

| Scope | Notes |
|---|---|
| **NYC citywide** | The headline value. Required. |
| **Bronx** | Borough / Bronx County |
| **Brooklyn** | Kings County |
| **Manhattan** | New York County |
| **Queens** | Queens County |
| **Staten Island** | Richmond County |

If a borough figure is genuinely not published, set it to `null` and say in one
sentence what the closest available proxy is and who would have it. **Do not
invent, interpolate, or pro-rate borough values from citywide numbers.** A
truthful `null` is worth more than a fabricated number — an adversarial Opus
reviewer will check every figure against its source and will flag invented ones.

Where community-district or neighborhood (NTA) data materially sharpens the
equity story (e.g. Mott Haven vs Upper East Side), include it as a
`neighborhoodNote`.

## 2. Four lenses — REQUIRED

DEAL's City Portrait asks four questions. You must fill **two** of them for your
dimension:

- If you have a **social** dimension: the **local-social** lens (what would it mean
  for the people of NYC to thrive?) and the **global-social** lens (what would it
  mean for NYC to respect the wellbeing of people worldwide?).
- If you have an **ecological** dimension: the **local-ecological** lens (what
  would it mean for NYC to thrive within its natural habitat?) and the
  **global-ecological** lens (what would it mean for NYC to respect the health of
  the whole planet?).

The **global** lens is where NYC differs most from Petaluma and is not optional
hand-waving. Concrete examples of what a real global-lens entry looks like:

- *Food (global-social):* NYC's food supply chain labour conditions — imported
  produce, the Hunts Point wholesale market's sourcing geography, coffee/cocoa/
  banana supply chains, and whether the city's ~$500M+/yr institutional food
  procurement (Good Food Purchasing Program) enforces labour standards abroad.
- *Climate (global-ecological):* consumption-based vs production-based emissions.
  NYC's sector-based inventory (~in the high-40s MtCO2e) excludes embodied
  emissions in imported goods, aviation, and food; a consumption-based accounting
  is materially higher per capita. Find and cite the actual studies.
- *Income & Work (global-social):* NYC's financial sector as an allocator of
  global capital — e.g. fossil-fuel underwriting and financed emissions by
  NYC-headquartered banks, and the NYC pension funds' divestment commitments.
- *Chemical pollution (global-ecological):* where the city's electronic and
  hazardous waste physically ends up.

If the global lens for your dimension has no quantified evidence base, say so
explicitly and score it `null` — but you must still write the qualitative framing
and name who could quantify it.

## 3. Political anchor — REQUIRED

Targets and actions must anchor to NYC's actual binding and stated commitments,
not to generic aspiration. Verify current status of each one you cite:

- **Local Law 97 of 2019** — building emissions caps; 2024–2029 period, then the
  tighter 2030–2034 limits. Check current DOB/Mayor's Office of Climate &
  Environmental Justice rulemaking and reported compliance rates.
- **Local Law 154** (gas ban in new construction), **LL 87/88/33/95** (energy audits, benchmarking, grades)
- **PlaNYC: Getting Sustainability Done** (2023) and any later update
- **OneNYC / NYC Climate Budgeting**
- **City of Yes for Housing Opportunity** (adopted Dec 2024, ~80k units target) and **City of Yes for Economic Opportunity**, **Carbon Neutrality**
- **NY State Climate Leadership and Community Protection Act (CLCPA)** — 40% below 1990 by 2030, 85% by 2050, 70% renewable electricity by 2030
- **Environmental Bond Act (2022, $4.2B)**
- **NYC Housing Blueprint / Fair Housing Framework / "City of Yes" follow-ons**
- **Zero Waste Act (2023)** — curbside organics citywide, 2030 diversion goals
- **NYCHA** capital needs and the PACT/Trust program
- Dimension-specific: e.g. **Streets Plan (LL195)** for mobility, **Cool
  Neighborhoods NYC / Climate Resiliency Design Guidelines** for heat, **Right to
  Counsel / Good Cause Eviction (2024)** for housing.

Also note the **2026 political moment** — verify what is actually live as of mid-2026
(charter revision, mayoral administration priorities, state budget) rather than
assuming. Flag anything you cannot confirm.

## 4. Severity scale — must match the existing repo

| Level | Meaning |
|---|---|
| -100 | No problem — well within safe bounds |
| -50 | Under control — meeting targets |
| 0 | On track — at threshold, needs monitoring |
| 50 | Needs attention — exceeding threshold |
| 100 | Critical — significantly beyond threshold |
| 150 | Severe — emergency level |
| `null` | Unknown / insufficient data |

Intermediate integers (e.g. 20, 75, -10) are allowed and encouraged. **Justify the
number against the stated target in one or two sentences.** Vague severity claims
are the single most common thing the adversarial reviewer kills.

## 5. Source rules — non-negotiable

1. Every numeric claim needs a **source name, a direct URL, and a publication
   year**. Prefer a URL that resolves to the actual table/report, not a landing page.
2. **Prefer NYC agency primary sources**: NYC Open Data, DOHMH Community Health
   Survey / EpiQuery, MOCEJ GHG inventory, DCP / Population FactFinder, HPD
   Housing & Vacancy Survey, DSNY, DEP, DOE, NYPD, ACS via Census.
   Then: NY State, then federal, then academic/NGO.
3. If you cite ACS, name the table (e.g. `S2801`, `B25070`) and the vintage
   (e.g. 2024 1-Year, 2023 5-Year).
4. **You must actually fetch and read the source.** If a fetch fails, say the fetch
   failed and mark confidence `low` — do not substitute recollection.
5. Note the **geographic scale** of every figure (city / borough / metro / state /
   national / global). Never silently present a metro or state figure as a city one.
6. Distinguish **production-based vs consumption-based** for every ecological figure.
7. Set `confidence`: `high` (primary source, current, right scale), `medium`
   (primary but older/wrong scale, or good secondary), `low` (proxy, unverified,
   or fetch failed).

## 6. Ask the orchestrator

You are not alone. If you hit a genuine judgement call — the indicator choice is
ambiguous, two credible sources disagree materially, the right target is unclear,
or borough data exists only at a different scale — **state the question explicitly
in a `questionsForOrchestrator` array** in your output. Do the rest of your work
under a stated assumption rather than stalling. The orchestrator will answer and
may send you back a follow-up.

## 7. Output contract — return ONLY this JSON, no prose around it

```json
{
  "dimension": "climate change",
  "ring": "ecological",
  "local": {
    "lens": "local-ecological",
    "level": 100,
    "levelRationale": "1-2 sentences tying the value to the target.",
    "indicator": "Short name of the metric",
    "value": "The figure with units, plus the 1-2 most important disaggregations",
    "year": 2024,
    "target": "The specific target, with its legal or framework source",
    "geographicScale": "city",
    "context": "3-5 sentences. What this means for NYC, how it differs from a small city, which policy is the lever, what the caveats are.",
    "source": "Primary source name",
    "sourceUrl": "https://...",
    "confidence": "high",
    "productionVsConsumption": "production-based",
    "boroughs": {
      "bronx":   {"value": "...", "level": 100, "year": 2024, "source": "...", "sourceUrl": "...", "confidence": "high"},
      "brooklyn": {"value": null, "level": null, "note": "not published at borough level; DSNY reports by community district — closest proxy is ..."},
      "manhattan": {"...": "..."},
      "queens": {"...": "..."},
      "statenIsland": {"...": "..."}
    },
    "neighborhoodNote": "Optional — sharpest intra-city disparity, with source.",
    "subIndicators": [
      {"name": "...", "value": "...", "year": 2024, "source": "...", "sourceUrl": "...", "geographicScale": "city"}
    ]
  },
  "global": {
    "lens": "global-ecological",
    "level": 150,
    "levelRationale": "...",
    "indicator": "...",
    "value": "...",
    "year": 2023,
    "target": "...",
    "context": "Why NYC's global footprint/responsibility in this dimension matters and how it is transmitted (trade, finance, procurement, waste export, aviation).",
    "source": "...",
    "sourceUrl": "...",
    "confidence": "medium",
    "productionVsConsumption": "consumption-based"
  },
  "policyAnchors": [
    {"name": "Local Law 97 of 2019", "relevance": "...", "status2026": "verified status as of your research, with source", "sourceUrl": "https://..."}
  ],
  "actions": [
    "4-6 concrete things an NYC resident can do — specific to NYC (name the agency, program, coalition, or bill). Not generic advice."
  ],
  "petalumaContrast": "2-3 sentences: how NYC differs from Petaluma on this dimension, with both numbers where the Petaluma figure is known. This is what makes the two portraits worth comparing.",
  "dataGaps": ["Specific missing data + which NYC agency or expert would have it"],
  "expertsForPhase2": [{"org": "...", "why": "...", "contactPath": "public webpage or general contact route only"}],
  "questionsForOrchestrator": ["..."],
  "sourcesFetched": [{"url": "...", "fetchedOk": true, "whatItGave": "..."}]
}
```

## 8. Hard rules

- **No fabrication.** Not a number, not a URL, not a report title, not a person's
  name. An unfetchable source is a `dataGap`, never a guess.
- **No PII.** Organizations and public contact routes only — never a private
  individual's email, phone, or address.
- Use **they/them** for anyone whose pronouns you don't know.
- If your dimension's headline indicator turns out to be a bad proxy for NYC, say
  so and propose the better one — then research the better one.
