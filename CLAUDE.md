# Petaluma Doughnut Economics Project

> **Fork status:** Forked from [jglasskatz/doughnut-santa-cruz](https://github.com/jglasskatz/doughnut-santa-cruz) on 2026-05-13. Owner: [mia-i-shell/doughnut-petaluma](https://github.com/mia-i-shell/doughnut-petaluma). Local upstream remote tracks the original for future syncs.

## Purpose

Build a complete Doughnut Economics portrait for the **City of Petaluma, California** using Kate Raworth's framework. This is **CalDEC's small-city pilot integrating the Doughnut into Petaluma's General Plan update** (the first GP update since 2008; draft GP + EIR expected Spring 2026). Project lead: **Amelia Eichel** (CalDEC board).

The project also retains the Santa Cruz and Portland portraits as references and to support replication for other cities.

## What is the Doughnut?

Two concentric rings:
- **Inner ring (Social Foundation)** — 12 dimensions of human wellbeing no one should fall below
- **Outer ring (Ecological Ceiling)** — 9 planetary boundaries humanity should not overshoot
- **The doughnut (safe and just space)** — the area between, where people thrive within planetary means

## The 12 Social Foundation Dimensions
1. Food
2. Health
3. Education
4. Income & Work
5. Water & Sanitation
6. Energy
7. Networks
8. Housing
9. Gender Equality
10. Social Equity
11. Political Voice
12. Peace & Justice

## The 9 Ecological Ceiling Boundaries
1. Climate Change
2. Ocean Acidification
3. Chemical Pollution
4. Nitrogen & Phosphorus Loading
5. Freshwater Withdrawals
6. Land Conversion
7. Biodiversity Loss
8. Air Pollution
9. Ozone Layer Depletion

## Petaluma Context

- **Population:** ~60,000 (largest city in southern Sonoma County)
- **Setting:** On the Petaluma River, which feeds San Pablo Bay / SF Bay (estuarine system)
- **Economy:** Mix of tech, dairy, poultry, wine country agriculture; receives a 1% tax on Amazon purchases
- **Climate:** Mediterranean; drought-sensitive; subject to wildfire smoke episodes
- **Planning moment:** General Plan update — the first since 2008. Council selected land-use map 2025-12-15. Draft GP + EIR public Spring 2026. **This is the leverage window for embedding the Doughnut into long-horizon policy.**

See `docs/petaluma-data-source.md` for the raw source data Amelia provided, including Peggy and Councilmember John Shribbs' feedback and the expert-network list for Phase 2 (indicator validation with topic experts).

## Open Schema Decisions

Amelia's data includes a few categories that don't map 1:1 to Raworth's standard 12 + 9. These need resolution:

| Petaluma category | Decision needed |
|---|---|
| **Mobility** (72.6% drive alone) | Map to networks? add as 13th dim? fold into climate change narrative? |
| **Global Measure of Wellbeing** | Treat as DEAL four-lens framing rather than a single dimension? |
| **Waste & Materials** | Supplementary local indicator, not a planetary boundary |
| **Global Consumption-Based Footprint** | Same as global-social — four-lens framing |
| **Equality (gender + racial together)** | Split: gender → gender equality dim; racial → social equity subIndicator (already done in current data) |

## Project Structure

```
doughnut-petaluma/
├── CLAUDE.md                              # This file
├── README.md
├── data/
│   ├── schema.json                        # JSON Schema for city portraits
│   ├── petaluma_ca.json                   # Petaluma portrait (schema-compliant archive)
│   └── portland_or.json                   # Reference: Portland portrait
├── docs/
│   ├── index-d3.html                      # Main D3.js interactive viz (open in browser)
│   ├── d3-doughnut.js                     # D3 chart component
│   ├── data.js                            # ⚡ THIS drives the viz — Petaluma + Santa Cruz + Portland live here
│   ├── adding-a-city.md
│   ├── city-portrait-methodology.md
│   ├── doughnut-economics-framework.md
│   ├── petaluma-data-source.md            # Amelia's raw input + expert network
│   ├── petaluma-context.md                # (TBD) Petaluma-specific context + data sources
│   └── santa-cruz-context.md
├── tools/                                 # AI research agent (optional)
└── sources/
```

## Data Collection Rules (Petaluma adaptation)

1. **Prefer City of Petaluma data** over county or regional data
2. **Note the geographic scale** for every data point (city, county, metro, state, global)
3. **Include source URL + publication year** for every data point
4. **Flag data gaps** explicitly using `level: "NaN"` (data.js) or `level: null` (JSON)
5. **Disaggregate by equity dimensions** where possible (race, income, neighborhood) — Peggy's recurring note
6. **Use the most recent data available** — note the year
7. **Distinguish production-based vs consumption-based** metrics for ecological dims
8. **Preserve expert-contact attributions** — see `docs/petaluma-data-source.md` for the Phase 2 expert list (Redwood Empire Food Bank, Petaluma Health District, Gen H, Ellis Creek WRF, PG&E, Sonoma Clean Power, Police Chief, Voter Registrar, etc.)

## Key Petaluma Data Sources (Priority Order)

### City-Level
- Petaluma General Plan update — https://www.planpetaluma.org
- Petaluma Blueprint for Climate Action
- Petaluma Health and Environmental Justice Report
- Petaluma Housing Element
- Petaluma Socioeconomic Profile
- City of Petaluma Water Resources & Conservation Dept

### County/Regional
- Sonoma County data portal
- Sonoma County Registrar of Voters
- Bay Area Air Quality Management District (BAAQMD)
- Sonoma Mountain Preservation (protected land)
- Petaluma Valley Groundwater Sustainability Plan

### State/Federal
- U.S. Census Bureau / ACS
- CalEnviroScreen
- CA Air Resources Board
- CA Dept of Pesticide Regulation
- CA Dept of Fish & Wildlife

## Indicator Scoring Scale (matches data.js)

| Level | Label | Meaning |
|---|---|---|
| -100 | No problem | Well within safe bounds |
| -50 | Under control | Meeting targets |
| 0 | On track | At threshold, needs monitoring |
| 50 | Needs attention | Exceeding threshold |
| 100 | Critical | Significantly beyond threshold |
| 150 | Severe | Emergency level |
| `"NaN"` | Unknown | Insufficient data |

> **All levels in the current Petaluma data are DRAFT — assigned by Claude based on stated targets. Every entry's `context` notes "DRAFT severity — pending review" and should be confirmed by Amelia + topic experts in Phase 2.**

## Workflow for Adding/Updating Indicators

1. Identify the dimension + lens (e.g., Climate Change / Local-Ecological)
2. Search City of Petaluma first → Sonoma County → state/federal
3. Update both `docs/data.js` (drives the viz) **and** `data/petaluma_ca.json` (schema-compliant archive)
4. Record: indicator name, value, year, geographic scale, target, context, source, source URL, geographic scale, confidence, actions
5. Assess severity against the target; assign `level` per the scale above

## Phase 2 — Expert Validation

For each indicator, consult the relevant expert (see `docs/petaluma-data-source.md`):
1. Confirm indicator choice is the right proxy
2. Verify data point + year
3. Suggest alternative or additional indicators
4. Update both `docs/data.js` and `data/petaluma_ca.json`
5. Remove the "DRAFT severity — pending review" flag once confirmed

## Reproducibility

Pattern for other CalDEC cities (San José, SF, San Mateo, etc.):
1. Fork this repo
2. Add a new entry to `JURISDICTIONS` in `docs/data.js` (key like `city_sanjose`)
3. Add corresponding `data/<city>.json` schema-compliant version
4. Replace context + sources with city-specific equivalents
5. Use the same severity scale + the same Raworth dimensions
