# NYC Doughnut Portrait — First Draft

A Doughnut Economics portrait of **New York City**, built as a deliberate contrast to
the Petaluma portrait: 8.3M people against 60,000, a global finance capital against a
small agricultural city. Same framework, opposite scale.

## What makes this portrait different from Petaluma's

| | Petaluma | NYC |
|---|---|---|
| Jurisdictions | 1 | 6 — citywide + all five boroughs |
| Dimensions | 12 social + 9 ecological (+2 local) | 13 social + 11 ecological |
| Local dimensions | mobility, waste & materials | mobility, waste & materials, **heat & climate resilience** |
| DEAL lenses | 2 (local only) | **4** — local + global, per dimension |
| Policy anchor | General Plan update | Local Law 97 · PlaNYC · City of Yes · CLCPA |

## Status — this is a first draft, and it is partial

**8 of 24 dimensions researched — and all 8 adversarially reviewed.**

Breadth was traded for verification deliberately. Every dimension that exists in this
portrait has been through an independent reviewer that re-fetched its sources; none is
carrying an unchecked figure. The 16 missing dimensions are honestly absent rather than
present-and-unverified.

The build was interrupted twice by account usage limits. Rather than hide the gap, the
16 un-researched dimensions render in the dashboard as explicit grey "Not yet
researched" wedges, and every figure carries a provenance badge distinguishing
*draft* from *adversarially reviewed*.

| Dimension | Ring | Local | Global | Reviewed | Findings |
|---|---|---|---|---|---|
| housing | social | **135** | 60 | ✓ | 3 critical, 12 major, 12 minor |
| heat & climate resilience | eco | **100** | null | ✓ | 3 critical, 6 major, 7 minor |
| income & work | social | **100** | 100 | ✓ | 2 critical, 11 major, 17 minor |
| climate change | eco | **75** | **120** | ✓ | 9 major, 14 minor |
| nitrogen & phosphorus | eco | **55** | **105** | ✓ | 8 major, 11 minor |
| air pollution | eco | **50** | 50 | ✓ | 1 critical, 8 major, 8 minor (partly applied) |
| land conversion | eco | **25** | null | ✓ | 12 findings |
| mobility | social | **−65** | null | ✓ | 1 critical, 3 major, 12 minor |

**Every one of the 8 reviews returned "sound-with-corrections" — none was clean.** Six of
the eight had their severity level changed; four had a headline indicator or its sourcing
replaced outright; four global lenses lost an unsupported score and went to `null`.

Remaining, not yet researched: ocean acidification, chemical pollution, freshwater
withdrawals, biodiversity loss, ozone layer depletion, waste & materials, food, health,
education, water & sanitation, energy, networks, gender equality, social equity,
political voice, peace & justice.

## Two findings that justify the method

**1. The four-lens design changes the answer on climate.** NYC's production-based emissions
are ~5.7 tCO2e/person (2024, derived; 6.2 t is the last published per-capita, 2023) —
*lower* than Petaluma's 7.25. Its consumption-based footprint is **11 tCO2e/person**, and
it rises to ~13 if government consumption is allocated. Borough figures range from the
Bronx at 9 to Staten Island at 15, and the pattern is **not** a simple affluence gradient:
vehicle ownership and home size drive it, which is why Staten Island tops Manhattan.

A local-only portrait would have shown the megacity beating the small agricultural city on
climate. That reading is wrong, and only the global lens reveals it.

**2. Compliance and planetary boundaries give opposite answers.** Nitrogen & phosphorus is
the sharpest case. NYC is **meeting its regulatory obligations**: the Long Island Sound
nitrogen TMDL is met at 68% against a 60% requirement, the Jamaica Bay target at ~57%
against >50%, and DEP certified its December 2025 green-infrastructure milestone on time.
Scored on compliance, this dimension is a success story. Scored against the planetary
boundary — ~30–41 kg N/capita/yr against a fair share of ~7.7 kg — it is a **4–5x
overshoot**. Both are true. Ruling R12 exists because a portrait that scored compliance
would have shown a green wedge over a 4x boundary breach.

## Method

Two agent layers, orchestrated:

1. **Research** (Sonnet) — one agent per dimension, gathering citywide + five boroughs +
   both lenses, against a shared contract (`RESEARCH_BRIEF.md`).
2. **Adversarial review** (Opus) — one agent per dimension, whose job is to *break* the
   dossier: re-fetch every source, hunt fabricated figures and law numbers, catch
   geographic-scale substitution and invented borough data, and check severity scores
   against stated targets (`REVIEW_BRIEF.md`).

Judgement calls escalate to the orchestrator and are settled once, in
`ORCHESTRATOR_RULINGS.md` (R1–R16), which both layers read. Highlights:

- **R1** — the wedge scores the *dimension*, not just the headline indicator.
- **R2** — a global-lens entry must describe the city's *external* footprint. An
  international benchmark of NYC's own performance is not a global lens.
- **R7** — never put a consumption-based figure in a production-based slot.
- **R10** — a borough entry must measure the *same indicator* as the headline; a proxy
  goes in `note`, never in `value`.
- **R12** — ecological levels score against the *planetary boundary*, not the city's own
  statute. Without this, NYC's climate wedge sat at 40 against its 40x30 target while
  Petaluma sat at 100 against the DEAL benchmark — for 15% *higher* per-capita emissions.
- **R15** — where no downscaled city-scale benchmark exists, the local lens scores against
  the best regulatory target and the *global* lens carries the quantified boundary comparison.

## Files

```
research/nyc/
├── RESEARCH_BRIEF.md         contract given to every research agent
├── REVIEW_BRIEF.md           contract given to every adversarial reviewer
├── ORCHESTRATOR_RULINGS.md   R1–R16, binding on both layers
├── dossiers/                 raw per-dimension research output
└── reviews/                  adversarial reviews + corrected dossiers
```

Generated artefacts (do not edit by hand):

```
data/nyc_ny.json              canonical citywide portrait
data/nyc_<borough>.json       five derived borough portraits
docs/data-nyc.js              six JURISDICTIONS entries for the D3 viz
```

## Rebuilding

```bash
node tools/build-nyc.mjs research/nyc/dossiers research/nyc/reviews
```

A reviewed dossier (`reviews/<dim>.corrected.json`) always supersedes the draft, so
finishing a review and re-running is the entire update path.

## What the review layer actually caught

Enough that no unreviewed dossier in this project should be trusted:

- **A whole inventory vintage missed.** MOCEJ published CY2024 in Dec 2025; the dossier was
  still on 2023 — and had 2023 wrong too (51.2–51.3 Mt claimed, 50.43 Mt actual).
- **A fabricated statutory deadline.** Local Law 148's 30% canopy goal is real; the "by
  2040" deadline attached to it is not in the statute.
- **A superseded deadline.** The No. 4 heating-oil phase-out date was overtaken by Local
  Law 32 of 2023.
- **A law asserted as unenacted that had passed.** The pied-à-terre tax was enacted May 2026.
- **An unsourceable statistic.** "10% of Manhattan condo sales are pied-à-terre" traced to
  no DOF table and no secondary source citing one. Removed.
- **A state figure passed off as a city figure.** 672,000 undocumented is New York State;
  NYC is ~412,000. The research layer overrode a *correct* brief to introduce this.
- **A statistic describing the wrong population.** Housing's 86% voucher-holder
  rent-burden figure belongs to a nearly opposite population.
- **An equity ratio attached to the wrong denominator.** Heat's Black:white mortality ratio
  is 3:1, not 2:1 — and it covers only the ~7 direct heat-stress deaths a year, not the
  ~490 heat-exacerbated deaths that are 98% of the headline.
- **A methodology replaced.** DOHMH does publish a citywide PM2.5 mean (6.26 µg/m³, 2024),
  so the author-computed unweighted average across 59 community districts — which weighted
  Midtown equally with the Rockaways — was both unnecessary and wrong.
- **An orchestrator error.** The −45 mobility override rested partly on "traffic deaths at
  post-Vision-Zero highs." NYC DOT reports 205 deaths in 2025, the fewest since 1910.
  Corrected to −65.

## To finish this portrait

1. Research the remaining 16 dimensions (one Sonnet agent each), then review each one.
   Do not add breadth without verification — on this evidence, an unreviewed dossier
   carries roughly one critical and several major defects.
2. Resolve the residual gaps the reviewers flagged but could not close: the vintage of the
   18 BGY CSO figure (needs someone able to read DEP slide images), and re-applying air
   pollution's remaining 17 findings, whose reviewer was cut off before writing a full
   corrected dossier.
3. Phase 2 expert validation, per the Petaluma pattern.
