# Orchestrator Rulings — NYC Doughnut Portrait

Standing decisions from the orchestrator. **Read this alongside the research or review
brief.** These are settled: apply them, and do not re-litigate them as findings.
If a ruling genuinely cannot be applied to your dimension, say so and explain why.

---

## R1. The severity `level` scores the DIMENSION, not just the headline indicator

The viz renders **one wedge per dimension**, and readers interpret that wedge as the
dimension's overall standing. So a level that faithfully scores the headline indicator
while ignoring well-sourced failures inside the same dimension is misleading, even
when it is technically accurate.

Therefore:
- Anchor the level primarily on the headline indicator versus its stated target.
- **Then adjust** for material, well-sourced shortfalls captured in the
  `subIndicators` — and say what moved it, by name, in `levelRationale`.
- `levelRationale` must be auditable: a reader should be able to see which facts pushed
  the number up or down.

This cuts both ways. Do not let one bad sub-indicator drag a genuinely strong dimension
into the red, and do not let a strong headline launder a real failure.

**Worked example (mobility) — CORRECTED, and instructive about how this ruling fails.**
Drive-alone share of 20.6% against a <50% target argues for roughly -85. The orchestrator
originally adjusted to -45, citing four pull factors. The adversarial reviewer then
**refuted one of them outright**: "traffic deaths at or near post-Vision-Zero highs" is
false. NYC DOT reports **205 traffic deaths in 2025 — the fewest since record-keeping
began in 1910**, down 19% year-on-year and 31% since 2014, with Q1 2026 the third-lowest
on record. Traffic safety is a verified NYC *strength*, not a pull factor.

The other three pillars held on primary sources: subway accessibility (160 of 472
stations, 33.9%), bus speeds (8.17 mph, and *slower* than 2015's 8.22), and Fair Fares
(41% of ~940,000 eligible enrolled). Three real shortfalls, not four.

**Mobility therefore lands at -65, not -45.** The lesson for anyone applying R1: an
adjustment is only as good as each individual pull factor, and a factor asserted from
plausibility rather than from a source will inflate the adjustment. Verify every factor
you name before it moves a number. The orchestrator introduced this error in the research
brief and it propagated into the override — briefs are not evidence.

## R2. The global lens must be about the city's EXTERNAL footprint or responsibility

A global-lens entry has to say something about how the city affects, or is responsible
to, people and ecosystems **beyond its own boundary**. Two failure modes to avoid:

- **Restating local data** with the word "global" attached. Not a global lens.
- **A comparative performance statistic** that is merely internationally *benchmarked*.
  "NYC's subway construction costs are the highest in the world" is a governance and
  cost-efficiency fact about NYC, not a claim about NYC's effect on anyone else.

Where a comparative benchmark is the best material available, it may stay as
**supporting context or a subIndicator** — but it must not be the headline global
indicator, and it must not carry a confident score on its own.

**Prefer, in order:** (1) a quantified embodied/consumption-based footprint;
(2) a quantified transmission channel (trade, finance, procurement, waste export,
supply-chain labour, remittances, aviation); (3) an honest qualitative framing with
`level: null` and a named party who could quantify it.

**A `null` global level with strong framing beats an invented number.** Do not attach a
precise-looking score to an unquantified claim — a `level` of 30 or 65 next to
`confidence: "low"` and no underlying quantity is a finding, not a result.

**Worked example (mobility).** Lead the global-social lens with the supply-chain and
transferability content (rolling stock and EV-battery sourcing; NYC as the one US city
whose mode share is compatible with a 1.5°C per-capita transport budget, and what that
means for the ~1 billion people without all-season road access). Keep the Transit Costs
Project figure as a subIndicator. If nothing is quantified, score `null`.

## R3. Prefer the officially published figure at the target geography

Where an agency or the Census publishes a figure directly at the geography you need,
use it as the headline. A defensible aggregate you computed yourself (e.g. worker-
weighted across the five counties) is acceptable **only** when no published
place-level figure exists — and then the method must be stated in `value` or `context`
and `confidence` capped at `medium`.

If your own aggregate and a published figure disagree, report the **published** figure
as the headline and note the discrepancy. Never present a derived number as if an
agency published it.

## R4. Petaluma comparability lives in prose, not in forced indicator matching

Use the indicator that is genuinely right for a megacity. Cross-portrait comparability
is carried by the `petalumaContrast` field, not by using the same metric everywhere.
The one exception is `mobility`, where drive-alone share is the shared headline in both
portraits by design — keep it.

## R5. NYC outperforming is a real result — report it

Several dimensions should score **negative** (inside the safe space): mobility mode
share, water supply, per-capita production-based emissions, per-capita land
consumption, homicide rate. Report those honestly and do not manufacture a problem to
make the portrait look uniformly alarming. The portrait is more useful, and more
credible, when the strengths are as well-evidenced as the failures.

Equally, do not launder a genuine crisis (housing, Rikers, heat mortality inequity)
into a moderate score.

## R6. Settled structural decisions — do not report these as findings

- Extraterritorial assets NYC controls but does not contain (e.g. the ~200,000+ acres
  of protected upstate watershed land) are **excluded** from local scores and belong in
  `policyAnchors` and the global lens.
- **`waste & materials`** and **`heat & climate resilience`** are locally-defined
  ecological dimensions, intentionally outside Raworth's 9 planetary boundaries.
  **`mobility`** is a locally-defined social dimension outside the standard 12.
- For nitrogen & phosphorus: **CSO volume is the headline**, WRRF nitrogen loading is a
  subIndicator, and nitrogen-weighting over phosphorus is correct for NYC given
  N-limited marine receiving waters.
- A borough entry of `value: null` **plus a `note`** naming the closest proxy is the
  correct encoding of a real gap, and must never be marked down as incompleteness.
  An interpolated or population-pro-rated borough figure is a critical defect.

## R7. Never put a consumption-based figure in a production-based slot

Sometimes the only sub-jurisdiction (borough) data that exists for a dimension is
consumption-based, while the local/production-based figure exists only citywide. That
is exactly the case for climate change: MOCEJ publishes no production-based borough
inventory, but the Consumption-Based Emissions Inventory (CBEI) gives real per-capita
figures for all five boroughs.

Do **not** resolve this by putting the consumption-based borough numbers into
`local.boroughs`. The two accountings differ by a factor of nearly two; mixing them
silently corrupts the dimension.

The correct structure:
- `local.boroughs` → `value: null` with a `note` saying production-based borough
  inventories are not published and naming MOCEJ as the holder.
- `global.boroughs` → the CBEI figures, which is where they actually belong. The schema
  now supports `boroughs` on the global lens entry for exactly this.
- The borough portraits surface the CBEI figure as an explicitly labelled
  **consumption-based** subIndicator, never as the borough's local headline.

Generalise this: whenever a sub-jurisdiction figure is measured on a different basis
than the dimension's headline, carry it on the lens it actually belongs to and label the
basis. Losing a real number is bad; silently mislabelling one is worse.

## R8. Score against the portrait's own target, not a borrowed regional average

Where a framework publishes a *typology* or regional-group average rather than a
city-specific target (e.g. C40's "Future of Urban Consumption in a 1.5°C World"
trajectory for "North America, Oceania & High-Income Asia"), that figure is **not** the
city's target and must never be presented as one.

Score the global lens against the portrait's standing benchmark — the DEAL
1.5°C-aligned per-capita figure of ~1.6–2.0 tCO2e/person — so that severity is
comparable across dimensions and across the Petaluma and NYC portraits. Cite the
regional trajectory as supporting context, explicitly labelled as a regional-typology
average that is not an NYC commitment.

## R9. GPC production-based is the headline inventory basis

For climate change, use MOCEJ's **Citywide-GPC** production-based figure as the local
headline: it is the international city-inventory standard, it is what Local Law 97 and
the 40x30 target are tracked against, and it is methodologically comparable to
Petaluma's inventory. Carry the Citywide-CLCPA variant (which additionally counts
near-term methane warming and runs higher) as a subIndicator with its basis stated —
not as the headline, and not silently averaged in.

## R10. A borough entry must measure the SAME indicator as the headline

`boroughs[x].value` is reserved for the dimension's headline indicator measured at that
borough. If the borough figure you found measures something *else* — a vulnerability
index instead of a mortality rate, facility density instead of a load, a related
composite instead of the metric itself — then:

- set `value: null`
- put the proxy in `note`, naming it as a proxy and naming what it actually measures
- do **not** assign a `level` derived from the proxy

This is R7 generalised to indicators rather than accounting bases. It is not a
criticism of finding proxies — proxies are useful and belong in the dossier. It is
about which field they go in, because the build pipeline promotes
`boroughs[x].value` to that borough's headline figure in its own portrait. A Heat
Vulnerability Index score sitting in the `value` slot of a heat-*mortality* dimension
becomes, in the Bronx portrait, a sentence asserting the Bronx's heat mortality is
"HVI 5". That is a fabrication produced by good-faith research in the wrong field.

Reporting "2 of 5 boroughs have real data, 3 have proxies named in notes" is a better
result than "5 of 5" purchased by loosening what counts.

## R11. Verify a surprising figure against the previous vintage before headlining it

If your figure differs substantially from the value the orchestrator's prompt suggested,
or from the previously published vintage, that is a signal to slow down — it is roughly
as likely to be a misread chart, a different denominator, or a redefined measure as it
is to be a real change.

Before headlining it: locate the prior year's published figure, state both, and explain
the change (methodology revision, genuine trend, scope change). If you cannot explain
the gap, headline the figure you can defend and put the other in a subIndicator with
the discrepancy flagged.

Specific live example: the heat dimension reports ~500 heat-related deaths/year from a
2026 DOHMH report where the prompt suggested ~350. Both may be right — DOHMH has revised
its heat-exacerbated-mortality methodology before — but the portrait must say which
vintage and which definition it is using, and whether the change is methodological or
real.

## R12. Ecological levels score against the PLANETARY BOUNDARY, not the city's own statute

This supersedes any reading of R9 that made a city's own policy target the scoring anchor.
R9 still governs the *accounting basis* (GPC production-based for the local climate
headline); R12 governs which *target* the severity is measured against.

The Doughnut's outer ring asks whether a city is living within planetary means. It does
not ask whether a city is on track against its own legislation. Those are different
questions with different answers, and conflating them breaks the portrait in a specific,
visible way:

> NYC's production-based emissions are ~6.2 tCO2e/person. Petaluma's are 7.25 — **15%
> higher**. Scored against the DEAL 1.5°C-aligned benchmark (1.6–2.0 t), Petaluma sits at
> 100. Scored against NYC's own 40x30 statutory target, NYC landed at **40**. Side by side
> in the same tool, a reader sees Petaluma deep in the red and NYC almost inside the
> doughnut — for near-identical per-capita emissions. That comparison is false, and the
> falseness is an artefact of the scoring anchor, not of anything either city did.

Therefore, for every **ecological** dimension:
- Score against the framework/planetary benchmark, applied identically across all
  portraits in the repo.
- Report progress against the city's own statutory commitments (LL97, 40x30, CLCPA,
  Zero Waste Act) in `context`, `policyAnchors`, and `subIndicators`.
- That progress may adjust the level modestly under R1 — a city genuinely and rapidly
  decarbonising is in a better position than one that is not — but it is a modifier, never
  the anchor.

**Applied to climate change:** local level **75**, not 40. NYC is roughly 3x the
1.5°C-aligned per-capita benchmark (clearly overshooting), moderated from Petaluma's 100
because its per-capita is 15–20% lower and its trend is genuinely downward (−25.2% vs
2005, with 2024 the largest single-year cut in the series). Global lens stays at **120**:
the consumption overshoot ratio (~5.5–6.9x) is about 1.5x Petaluma's, and flattening that
to an identical 100 would erase a real difference.

Social dimensions are less exposed to this, because most lack a downscaled global
benchmark — but the same principle holds wherever a cross-portrait comparison exists.

## R13. Corrected figures that must be applied portrait-wide

Errors found in one dimension often propagate. These are settled corrections; apply them
wherever they appear, and do not re-derive them:

- **Undocumented New Yorkers: ~412,000 (MOIA, 2022)**, down from ~611,000 in 2012. The
  **672,000 figure is New York STATE** (CMS), not the city. Figures of 820,400 and 943,000
  are unsupportable as city numbers. This was a scale substitution that the research layer
  introduced by overriding a correct brief — treat any six-figure "undocumented NYC"
  number above ~450,000 as suspect until sourced to a city-scale publication.
- **NYC GHG inventory: CY2024 is the current vintage** (published Dec 2025; NYC Open Data
  `wq7q-htne`). CY2024 = **47,944,551 tCO2e**, −25.2% vs the 2005 baseline of 64,139,721,
  and −4.9% vs CY2023's **50,433,720**. The figures 51.2–51.3 Mt for 2023 are wrong.
  Officially published per-capita: **6.2 t (2023)**; the 2024 per-capita (~5.7) is derived,
  not published, and must be labelled as such.
- **Local Law 97 covers ~35% of citywide emissions**, not 72%. The 72% figure is *all*
  buildings; LL97 covers roughly 60% of floor area and ~50% of building emissions.
- The **57% of buildings already exceeding the 2030 cap** and 9% figures are **Urban Green
  Council estimates** from CY2024 benchmarking data, **not DOB findings**. DOB confirms
  filing rates (~91–93%), ~1,400 non-filers and the $268/ton penalty, but is still
  auditing and has published no cap-compliance rate. Attribute accordingly.
- **JPMorgan Chase fossil-fuel financing: $58B (2025)**, ranked #1 globally. Citigroup is
  **top-five, not top-three**.
- **NYC pension fossil-fuel divestment is NOT reversed** — Court of Appeals denied leave
  to appeal, 21 October 2025.

## R14. Further portrait-wide corrections (extends R13)

- **NYC traffic deaths are at a RECORD LOW, not a high.** 205 in 2025 — fewest since
  record-keeping began in 1910; −19% year-on-year, −31% since 2014; Q1 2026 third-lowest
  on record (NYC DOT). Any dimension asserting rising or record-high traffic violence is
  wrong. This corrects an error the orchestrator introduced in the research brief.
- **Subway accessibility: 160 of 472 stations (33.9%)**, MTA-sourced. The 2022 settlement
  commits to 95% by 2055.
- **Bus speeds: 8.17 mph, down from 8.22 in 2015** — the decline is the finding.
- **Fair Fares: ~41% of roughly 940,000 eligible New Yorkers enrolled.** Any "37% of 1.4M"
  formulation is stale and internally inconsistent.
- **ACS publishes place-level data for "New York city, New York"** (`1600000US3651000`),
  tables B08301 and S0801, 2024 1-Year. There is no need to aggregate the five counties,
  and claims that no city-level Census geography exists are false.
- **Congestion pricing:** Judge Liman issued a **final ruling in *MTA v. Duffy* on 3 March
  2026**. Any dossier describing that litigation as pending is stale.
- **The global lens is systematically over-scored by the research layer.** Four of the six
  reviewed dimensions had a confident-looking global level resting on no quantity, and all
  four were moved to `null` under R2. Assume a global level is wrong until a quantified
  transmission channel is produced.

## R15. Where no downscaled local benchmark exists, the planetary comparison lives on the GLOBAL lens

R12 says ecological levels score against the planetary boundary rather than the city's own
statute. For climate that is mechanical, because a downscaled per-capita carbon budget
exists (~1.6–2.0 tCO2e/person). For most other boundaries it does not: there is no accepted
city-scale downscaled nitrogen-loading benchmark.

The convention, confirmed:
- **Local lens** — score against the best available regulatory or ecological-condition
  target (TMDL, consent order, dissolved-oxygen standard, ecological integrity), and say in
  `levelRationale` that this is a proxy for an absent planetary benchmark.
- **Global lens** — carry the planetary-boundary comparison, quantified per capita against
  the boundary's fair share. This is where the overshoot claim belongs anyway under R2,
  since it is a claim about the city's share of a global limit.

**Worked example (nitrogen & phosphorus).** The reviewer quantified NYC at **30–41 kg
N/capita/yr against a fair share of ~7.7 kg** (derived from the 62 Tg planetary boundary),
plus ~4.4 kg P/capita — moving the global lens from an unsupported 65/low-confidence to
**105/medium**, now genuinely quantified. The local lens sits at **55**, anchored off
consent-order compliance per R12 but scored against receiving-water condition.

This produces a result worth stating plainly, because it is the clearest vindication of R12
in the portrait: **NYC is meeting its regulatory obligations and still overshooting the
planetary boundary.** The Long Island Sound TMDL is met at 68% against a 60% requirement;
the Jamaica Bay nitrogen target is met at ~57% against a >50% requirement; DEP certified its
December 2025 green-infrastructure milestone on time. A portrait scored on compliance would
show this dimension as a success. Scored on the boundary, it is a 4–5x overshoot. Both facts
are true and the portrait must carry both.

## R16. A reviewer may fill a data gap, and should label it as derived

The nitrogen reviewer pulled CY2025 DMRs (parameter 00600) for all 14 WRRFs from EPA ECHO
and constructed a citywide total the research layer had recorded as an unfillable gap:
**~132,200 lb/day, ~21,900 t N/yr, ~2.6 kg N/person/yr.** Carry figures like this in the
dossier rather than leaving them in `dataGaps` — but label them as reviewer-derived, name
the method and the source system, and cap confidence at medium. A derived figure that is
transparently derived is far more useful than an absent one; a derived figure presented as
published is a defect (R3).
