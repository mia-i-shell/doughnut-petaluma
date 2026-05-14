# 🍩 Doughnut Petaluma

A Doughnut Economics portrait for the **City of Petaluma, California** — built as part of CalDEC's small-city pilot integrating the Doughnut framework into Petaluma's General Plan update (draft GP + EIR expected Spring 2026).

## Live Demo

Open `docs/index-d3.html` in a browser — no build step needed.

## City

**City of Petaluma, California** — ~60,000 residents in southern Sonoma County. This portrait covers **13 social foundation dimensions** (Raworth's 12 + locally-defined **Mobility**) and **10 ecological ceiling dimensions** (Raworth's 9 + locally-defined **Waste & Materials**) — 23 indicators total. All severities are DRAFT pending Phase 2 expert validation.

## Features

- **D3.js interactive doughnut chart** with hover tooltips, click-to-expand details, responsive design
- **Color-coded segments** showing severity (no problem → severe)
- **Detail panel** with indicator values, sources, targets, and community actions
- **Outreach directory** — 39 verified Petaluma/Sonoma orgs to consult for Phase 2 indicator validation
- **Data gap analysis** — completeness + quality report across the 23 dimensions
- **Energy deep-dive** connecting to [microgridme.xyz](https://microgridme.xyz) for distributed energy analysis
- **AI research agent** to auto-populate indicators with sourced data
- **Templatized JSON schema** for easy replication to other cities

## Project Structure

```
├── docs/                      # Website (GitHub Pages) + reference docs
│   ├── index-d3.html          # Main D3.js interactive visualization
│   ├── d3-doughnut.js         # D3.js doughnut chart component
│   ├── data.js                # Petaluma city data — drives the viz
│   ├── admin.html             # Spreadsheet admin UI for editing data
│   ├── energy-deepdive.html   # Energy dimension deep-dive (→ microgridme.xyz)
│   ├── index.html             # Legacy Canvas-based visualization
│   ├── app.js                 # Legacy app logic
│   ├── adding-a-city.md       # Reference: how the template is structured
│   ├── doughnut-economics-framework.md
│   ├── city-portrait-methodology.md
│   └── petaluma-data-source.md # Amelia's raw source data + expert network
├── data/
│   ├── schema.json            # JSON Schema for city portraits
│   └── petaluma_ca.json       # Petaluma portrait (schema-compliant archive)
└── tools/
    ├── cli.js                 # CLI for research agent
    ├── research-agent.js      # AI-powered data collection
    ├── schema.js              # Data schema definitions
    └── package.json
```

## Quick Start

### View the visualization
```bash
# Just open in a browser — no build step needed
open docs/index-d3.html
```

### Add a new city (AI-powered)
```bash
cd tools
npm install
LLM_API_KEY=your-key node cli.js "Austin" "Texas" --verbose --output ../data/austin_tx.json
```

### Add a new city (manual template)
```bash
cd tools
node cli.js --template "Austin" "Texas" --output ../data/austin_tx.json
# Then fill in data manually
```

### Check data quality
```bash
node tools/cli.js --report data/petaluma_ca.json
```

## The Framework

### Social Foundation (Inner Ring)
12 standard Raworth dimensions no one should fall below: food, health, education, income & work, housing, water & sanitation, energy, social equity, peace & justice, political voice, gender equality, networks. **Petaluma adds a 13th locally-defined dimension: Mobility** (drive-alone share, transit + active-mobility).

### Ecological Ceiling (Outer Ring)
9 standard planetary boundaries not to overshoot: climate change, ocean acidification, chemical pollution, nitrogen & phosphorus loading, freshwater withdrawals, land conversion, biodiversity loss, air pollution, ozone layer depletion. **Petaluma adds a 10th locally-defined dimension: Waste & Materials** (per-capita disposal rate).

### The Safe and Just Space
The doughnut — between the social foundation and ecological ceiling — is where people thrive within planetary means.

## Data Sources

All data points include source citations. Priority order:
1. City government reports and open data
2. U.S. Census Bureau (ACS)
3. Federal agencies (EPA, NOAA, BLS)
4. State agencies
5. Academic studies and nonprofits

## Energy Deep-Dive

The energy dimension includes a deep-dive page connecting to [microgridme.xyz](https://microgridme.xyz) with:
- Energy burden analysis by income level
- Renewable energy share by city/state
- Distributed generation and storage potential
- Virtual Power Plant (VPP) revenue estimates
- Local energy programs and incentive databases

## Contributing

See [docs/adding-a-city.md](docs/adding-a-city.md) for how to add your city.

## Credits & Provenance

This repo is a fork of [jglasskatz/doughnut-santa-cruz](https://github.com/jglasskatz/doughnut-santa-cruz) — the visualization template and codebase originate from that project. The Petaluma portrait, data, outreach directory, and documentation here were built specifically for Petaluma and are not derived from any other city's data. See `CLAUDE.md` for project context.

## License

MIT — Original D3.js visualization codebase by Jeremy Johnson / jglasskatz (2021–25).
