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

**8 of 24 dimensions researched. 1 of 24 adversarially reviewed.**

The build was interrupted twice by account usage limits. Rather than hide the gap, the
16 un-researched dimensions render in the dashboard as explicit grey "Not yet
researched" wedges, and every figure carries a provenance badge distinguishing
*draft* from *adversarially reviewed*.

| Dimension | Ring | Local | Global | Boroughs | Status |
|---|---|---|---|---|---|
| climate change | eco | 50 | 100 | 5/5 (consumption basis) | draft |
| land conversion | eco | **25** | null | 5/5 | ✓ reviewed, 12 findings |
| nitrogen & phosphorus | eco | 40 | 65 | 5/5 | draft |
| air pollution | eco | — | — | — | draft |
| heat & climate resilience | eco | 100 | 70 | 5/5 (proxies) | draft |
| housing | social | — | — | — | draft |
| income & work | social | — | — | — | draft |
| mobility | social | **-45** | — | 5/5 | draft + orchestrator override |

Remaining, not yet researched: ocean acidification, chemical pollution, freshwater
withdrawals, biodiversity loss, ozone layer depletion, waste & materials, food, health,
education, water & sanitation, energy, networks, gender equality, social equity,
political voice, peace & justice.

## The headline finding so far

NYC's **production-based** emissions are ~6.2 tCO2e/person — *lower* than Petaluma's
7.25. Its **consumption-based** footprint is ~11 tCO2e/person, **67% larger** than its
production-based total, and it rises with borough affluence (Bronx 9 → Staten Island 15).

A local-only portrait would have shown NYC outperforming a small California city on
climate. The four-lens portrait shows why that reading is wrong. This is the single
strongest argument for having done the four-lens version.

## Method

Two agent layers, orchestrated:

1. **Research** (Sonnet) — one agent per dimension, gathering citywide + five boroughs +
   both lenses, against a shared contract (`RESEARCH_BRIEF.md`).
2. **Adversarial review** (Opus) — one agent per dimension, whose job is to *break* the
   dossier: re-fetch every source, hunt fabricated figures and law numbers, catch
   geographic-scale substitution and invented borough data, and check severity scores
   against stated targets (`REVIEW_BRIEF.md`).

Judgement calls escalate to the orchestrator and are settled once, in
`ORCHESTRATOR_RULINGS.md` (R1–R11), which both layers read. Highlights:

- **R1** — the wedge scores the *dimension*, not just the headline indicator.
- **R2** — a global-lens entry must describe the city's *external* footprint. An
  international benchmark of NYC's own performance is not a global lens.
- **R7** — never put a consumption-based figure in a production-based slot.
- **R10** — a borough entry must measure the *same indicator* as the headline; a proxy
  goes in `note`, never in `value`.

## Files

```
research/nyc/
├── RESEARCH_BRIEF.md         contract given to every research agent
├── REVIEW_BRIEF.md           contract given to every adversarial reviewer
├── ORCHESTRATOR_RULINGS.md   R1–R11, binding on both layers
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

## To finish this portrait

1. Research the remaining 16 dimensions (one Sonnet agent each).
2. Run the adversarial reviewer for all 24 — currently only land conversion has one, and
   it found 12 issues in a dossier that looked clean, including a law with a fabricated
   deadline. Assume the other 23 have comparable defects until checked.
3. Re-run the mobility reviewer specifically: its level is currently an orchestrator
   override, not an independent verification.
4. Phase 2 expert validation, per the Petaluma pattern.
