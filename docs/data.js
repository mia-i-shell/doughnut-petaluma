// Doughnut data for the City of Petaluma — CalDEC General Plan pilot
// Level scale: -100 = no problem, -50 = under control, 0 = on track, 50 = not good, 100 = out of control, 150 = severe, NaN = unknown

const JURISDICTIONS = {
    "city_petaluma": {
        name: "City of Petaluma",
        population: "~60,000",
        description: "Small city in southern Sonoma County, CA, on the Petaluma River. Updating its General Plan for the first time since 2008. CalDEC's small-city pilot integrating Doughnut Economics into the GP update. Draft GP + EIR expected Spring 2026. Project lead: Amelia Eichel.",
        ecological: [
            {
                name: "climate change",
                level: 100,
                indicator: "Per capita GHG emissions",
                value: "7.25 MT CO2e/person",
                year: 2024,
                target: "1.6–2.0 MT CO2e/person (1.5 °C-aligned)",
                context: "DRAFT severity — pending review. Community-wide emissions ~435,000 MTCO2e ÷ ~60,000 residents. Significantly above the DEAL 'safe and just space' target.",
                source: "Petaluma Blueprint for Climate Action",
                sourceUrl: "https://www.planpetaluma.org/blueprint-for-climate-action",
                screenshot: null,
                actions: [
                    "Switch to an EV or ride Petaluma Transit / SMART",
                    "Electrify home heating + cooking",
                    "Enroll in Sonoma Clean Power EverGreen (100% renewable)",
                    "Support Blueprint for Climate Action implementation in the GP update"
                ]
            },
            {
                name: "ocean acidification",
                level: "NaN",
                indicator: "Estuarine pH near Petaluma River mouth → San Pablo Bay",
                value: "No public summarized value available. SF Estuary Partnership (2016) noted 'managers lack data on this threat.' Continuous carbonate-chemistry monitoring (SF Bay NERR China Camp station, SCQC1) exists in raw form via NERRS CDMO but is not published as an annual mean pH.",
                year: null,
                target: "Maintain estuarine pH near pre-industrial (~8.2); protect bay ecosystem health",
                context: "Research-confirmed gap. The closest long-term station to Petaluma River mouth is SF Bay NERR China Camp (SCQC1, ~10 km southeast). Recommend Phase-2 outreach to the SF Bay NERR Research Director or direct query of the NERRS CDMO Advanced Query System for SCQC1 pH parameter (2023–2024). Petaluma River feeds San Pablo Bay so this is more than a global indicator here.",
                source: "SF Estuary Partnership; SF Bay NERR; NOAA NDBC SCQC1",
                sourceUrl: "https://www.sfestuary.org/report-released-on-ocean-acidification-in-san-francisco-bay/",
                screenshot: null,
                actions: [
                    "Reduce personal carbon footprint (CO2 drives acidification)",
                    "Support Petaluma River + SF Bay watershed restoration",
                    "Volunteer with Petaluma River cleanups",
                    "Advocate for a Petaluma-mouth pH monitoring station"
                ]
            },
            {
                name: "chemical pollution",
                level: 50,
                indicator: "Pesticide use (Sonoma County, active ingredient applied)",
                value: "2,449,036 lbs of active ingredient applied in 2023 (+6% vs 2022's 2,312,392 lbs). ~92% from wine grapes (2,249,403 lbs); structural pest control 45,802 lbs; apples 51,569 lbs.",
                year: 2023,
                target: "Reduce total agricultural and structural pesticide use year-over-year; phase down highest-toxicity classes",
                context: "Sonoma County ranks 21st statewide for pesticide use. The use is increasing year-over-year, not decreasing — hence the 'needs attention' severity. Petaluma-specific use isn't published; this is the county figure (Petaluma sits at the southern edge of Sonoma's wine country). Source page 18 / Table 15 of CDPR's 2023 Pesticide Use Annual Report. Petaluma City staff input still needed for any in-city industrial releases (EPA TRI).",
                source: "California Department of Pesticide Regulation — 2023 Pesticide Use Annual Report (Table 15)",
                sourceUrl: "https://www.cdpr.ca.gov/wp-content/uploads/2025/08/2023_pur_annual_report.pdf",
                screenshot: null,
                actions: [
                    "Buy organic + locally grown produce",
                    "Reduce household pesticide / herbicide use",
                    "Support pollinator-friendly landscaping",
                    "Advocate for regenerative-viticulture incentives in the GP"
                ]
            },
            {
                name: "nitrogen & phosphorus loading",
                level: 20,
                indicator: "Groundwater nitrogen levels",
                value: "Most wells <10 mg/L; hotspots 4–7 mg/L near agricultural boundaries",
                year: 2024,
                target: "<10 mg/L (drinking water standard); reduce ag + septic runoff",
                context: "DRAFT severity — moderate loading; localized hotspots near ag boundaries and septic areas.",
                source: "Petaluma Valley Groundwater WY2024 Annual Report",
                sourceUrl: "https://petalumavalleygroundwater.org/wp-content/uploads/PV-Annual-Report_WY2024-ADA.pdf",
                screenshot: null,
                actions: [
                    "Reduce lawn fertilizer use",
                    "Convert septic to sewer where feasible",
                    "Support regenerative agriculture in Petaluma Valley"
                ]
            },
            {
                name: "freshwater withdrawals",
                level: -10,
                indicator: "Withdrawals vs. sustainable yield",
                value: "City of Petaluma WY2024: ~2,701 acre-feet groundwater pumping (~22% of city demand); Sonoma Water contract entitlement up to 13,400 AF/yr. Petaluma Valley Groundwater Basin operating within sustainable yield in WY2024 (normal water year, stable levels).",
                year: 2024,
                target: "Withdrawals ≤ sustainable annual yield (groundwater levels stable, no subsidence, quality maintained)",
                context: "Sourced from the Petaluma Valley Groundwater Sustainability Agency's WY2024 Annual Report + the City's 2020 Water Shortage Contingency Plan. Basin currently meets sustainability criteria; flagged as drought-sensitive (Sonoma County). John Shribbs (Council) flagged the need for a long-term water-plan indicator in the GP update. DRAFT severity — note this assumes the WY2024 normal-water-year status; drought years would shift this materially.",
                source: "Petaluma Valley GSA WY2024 Annual Report; City of Petaluma WSCP",
                sourceUrl: "https://petalumavalleygroundwater.org/wp-content/uploads/PV-Annual-Report_WY2024_Draft4.pdf",
                screenshot: null,
                actions: [
                    "Cut household water use 20%",
                    "Replace lawn with drought-tolerant landscape",
                    "Support water-recycling expansion at Ellis Creek",
                    "Advocate for groundwater protection in the GP"
                ]
            },
            {
                name: "land conversion",
                level: 0,
                indicator: "% protected land (Petaluma Valley / Sonoma Mountain)",
                value: "~22% under conservation easements or public ownership",
                year: 2024,
                target: "≥30% by 2030 (California 30x30 goal)",
                context: "DRAFT severity — on track but short of CA 30x30. Petaluma's Urban Growth Boundary is a key tool; the GP update is the leverage point.",
                source: "Sonoma Mountain Preservation",
                sourceUrl: "https://sonomamountain.org/preservation/protected-open-space/",
                screenshot: null,
                actions: [
                    "Support Sonoma Land Trust + Sonoma Mountain Preservation",
                    "Defend Petaluma's Urban Growth Boundary in the GP update",
                    "Volunteer with land-stewardship orgs"
                ]
            },
            {
                name: "biodiversity loss",
                level: 75,
                indicator: "Federally/state-listed threatened or endangered species in Petaluma River watershed",
                value: "At least 8 listed T&E species documented: California red-legged frog (fed T), Central CA Coast steelhead (fed T), Chinook salmon (fed E), willow flycatcher (fed T), bank swallow (state T), California freshwater shrimp (fed E), salt marsh harvest mouse (fed E), Ridgway's rail (fed E).",
                year: 2024,
                target: "Stable / increasing populations of native species; no net habitat loss; recovery of listed species",
                context: "Verified via Sonoma Resource Conservation District watershed page (red-legged frog, steelhead, Chinook, willow flycatcher, bank swallow confirmed on page directly). Freshwater shrimp confirmed in Petaluma River range per EPA ESPP fact sheet. Multiple listed species = high biodiversity-pressure signal. Population trend data is not publicly available as annual counts — Phase 2 recommendation: query CDFW's CNDDB by USGS quad (Petaluma, Petaluma River, Cotati, Glen Ellen).",
                source: "Sonoma Resource Conservation District; USFWS / EPA Endangered Species Protection; NOAA Fisheries",
                sourceUrl: "https://sonomarcd.org/district-watersheds/petaluma-river/",
                screenshot: null,
                actions: [
                    "Plant California natives in your yard",
                    "Support Sonoma Ecology Center + Sonoma Land Trust + Sonoma RCD",
                    "Volunteer for Petaluma River stream-restoration projects",
                    "Advocate for riparian buffers + steelhead-recovery actions in the GP"
                ]
            },
            {
                name: "air pollution",
                level: 30,
                indicator: "PM2.5 annual average",
                value: "7.0–9.5 μg/m³",
                year: 2024,
                target: "≤5 μg/m³ (WHO guideline)",
                context: "DRAFT severity — above WHO target; meets US EPA standard. Wildfire smoke is the dominant episodic driver.",
                source: "Bay Area Air Quality Management District",
                sourceUrl: "https://www.baaqmd.gov/en/about-air-quality/current-air-quality/air-monitoring-data/",
                screenshot: null,
                actions: [
                    "Use HEPA filters during smoke events",
                    "Reduce home wood-burning",
                    "Support Sonoma County FireSafe Council"
                ]
            },
            {
                name: "ozone layer depletion",
                level: -100,
                indicator: "Stratospheric ozone (global)",
                value: "Global Montreal Protocol — on track to recover by ~2066",
                year: 2024,
                target: "Continued global compliance with Montreal Protocol",
                context: "Largely a global indicator; included for framework completeness.",
                source: "UNEP / NOAA",
                sourceUrl: "https://ozone.unep.org/",
                screenshot: null,
                actions: [
                    "Properly dispose of refrigerants + old appliances",
                    "Support continued Montreal Protocol enforcement"
                ]
            },
            {
                name: "waste & materials",
                level: 75,
                indicator: "Per-capita disposal rate (Sonoma County Waste Management Agency)",
                value: "7.1 lbs/person/day calculated disposal rate (target: 4.5 lbs/person/day) — agency well above target.",
                year: 2022,
                target: "≤4.5 lbs/person/day (Zero Waste Sonoma target); zero waste long-term",
                context: "Locally-defined Petaluma dimension (10th ecological wedge) — not in Kate Raworth's standard 9. Petaluma reports waste through SCWMA (Zero Waste Sonoma), which covers all 10 Sonoma jurisdictions including Petaluma. CalRecycle's per-jurisdiction tool returns 'No Data' for Petaluma-only because it's reported via SCWMA. The 7.1 vs 4.5 target gap = 58% overshoot of target. Source: SCWMA 2022 EAR submitted to CalRecycle, page 46 (re-reported on 2024 EAR page 49).",
                source: "Zero Waste Sonoma — Electronic Annual Report (EAR) to CalRecycle",
                sourceUrl: "https://zerowastesonoma.gov/uploads/reports/Annual-Report-2024.pdf",
                screenshot: null,
                actions: [
                    "Compost food scraps + yard waste",
                    "Cut single-use plastics + packaging",
                    "Use Recology Sonoma Marin's organics program",
                    "Advocate for stronger procurement + extended producer responsibility in the GP"
                ]
            }
        ],
        social: [
            {
                name: "food",
                level: 25,
                indicator: "Food insecurity rate",
                value: "5.4% of households food insecure",
                year: 2024,
                target: "Zero hunger",
                context: "DRAFT severity — pending review. Below US avg (~10%) but short of the zero-hunger target. Open question: how many people are eligible for food-bank services? Bring Redwood Empire Food Bank into the conversation.",
                source: "Petaluma Health and Environmental Justice Report (p. 82)",
                sourceUrl: "https://cityofpetaluma.org/",
                screenshot: null,
                actions: [
                    "Support Redwood Empire Food Bank",
                    "Volunteer at Petaluma Bounty",
                    "Advocate for school meal programs"
                ]
            },
            {
                name: "health",
                level: 10,
                indicator: "Uninsured rate",
                value: "5.5% uninsured",
                year: 2024,
                target: "Universal coverage",
                context: "DRAFT severity — pending review. Below CA average (~7%). John Shribbs (Council) suggested: consult Elece Hempel, Chair of Petaluma Health District. He also suggested adding a tree-cover/shade indicator (Blue Zone could advise) as the climate gets hotter.",
                source: "U.S. Census Bureau ACS 2020–2024",
                sourceUrl: "https://data.census.gov/",
                screenshot: null,
                actions: [
                    "Support Covered California enrollment outreach",
                    "Volunteer with Petaluma Health Center",
                    "Advocate for shade-tree plantings in the GP"
                ]
            },
            {
                name: "education",
                level: -30,
                indicator: "High school graduation rate",
                value: "92%",
                year: 2024,
                target: "≥95% with no achievement gap by race/income",
                context: "DRAFT severity — above CA avg (~87%). Peggy flagged: needs an equity lens (achievement-gap disaggregation). Verify with the Petaluma City Schools Superintendent.",
                source: "U.S. Census Bureau ACS 2020–2024",
                sourceUrl: "https://data.census.gov/",
                screenshot: null,
                actions: [
                    "Support Petaluma City Schools",
                    "Mentor or tutor at-risk students",
                    "Volunteer with after-school programs"
                ]
            },
            {
                name: "income & work",
                level: -10,
                indicator: "Poverty rate",
                value: "6.5% of persons in poverty",
                year: 2024,
                target: "<5% in poverty; living wage for all workers",
                context: "DRAFT severity — below CA avg (~12%). Petaluma People Services has additional data on local poverty.",
                source: "U.S. Census Bureau ACS 2020–2024",
                sourceUrl: "https://data.census.gov/",
                screenshot: null,
                actions: [
                    "Support Petaluma People Services",
                    "Shop local small businesses",
                    "Advocate for a local living-wage standard"
                ]
            },
            {
                name: "housing",
                level: 60,
                indicator: "Cost-burdened households + point-in-time unhoused",
                value: "34% cost-burdened (>30% income on housing); 214 persons unhoused (PIT)",
                year: 2024,
                target: "<30% cost-burdened; zero unhoused",
                context: "DRAFT severity — Sonoma County's housing affordability crisis hits Petaluma hard. John Shribbs suggested adding an indicator from Generation Housing (Gen H). Sources: Housing Element p. B21; Socioeconomic Profile p. 9.",
                source: "Petaluma Housing Element + Socioeconomic Profile",
                sourceUrl: "https://www.planpetaluma.org/",
                screenshot: null,
                actions: [
                    "Support COTS Petaluma",
                    "Advocate for affordable-housing zoning in the GP",
                    "Volunteer at the Mary Isaak Center",
                    "Support Generation Housing's policy work"
                ]
            },
            {
                name: "water & sanitation",
                level: 30,
                indicator: "Drinking water quality (EPA compliance + health-guideline gaps)",
                value: "0 EPA legal-limit violations (Apr–Jun 2024 quarter); 12 of 24 detected contaminants exceed EWG health guidelines — notably HAA5 (36.2 ppb, 362× EWG guideline) and TTHM (25.4 ppb, 170× EWG guideline). Population served: 61,304.",
                year: 2024,
                target: "0 EPA violations AND levels at or below EWG health guidelines for disinfection byproducts",
                context: "Verified via EWG Tap Water Database (cross-checked with the EWG page — confirmed). PWS ID CA4910006 = City of Petaluma. Federally compliant but disinfection byproducts (HAA5, TTHM) are dramatically above EWG's cancer-risk-based thresholds. Chelsea Thompson at Ellis Creek Water Recycling Facility can advise on next-level indicators. John Shribbs flagged: add a long-term-water-plan / availability indicator.",
                source: "EWG Tap Water Database (aggregating EPA SDWIS + City CCR)",
                sourceUrl: "https://www.ewg.org/tapwater/system.php?pws=CA4910006",
                screenshot: null,
                actions: [
                    "Use a carbon-block filter for HAA5/TTHM",
                    "Conserve household water",
                    "Support graywater + rainwater capture",
                    "Advocate for groundwater + treatment investments in the GP"
                ]
            },
            {
                name: "energy",
                level: 0,
                indicator: "Electricity mix (Sonoma Clean Power default) + energy burden",
                value: "Sonoma Clean Power CleanStart (default): 51% renewable + 40% large hydro = 91% carbon-free. EverGreen opt-up: 100% renewable (90% geothermal, 10% solar). Energy burden ≈8% for low-income households (Sonoma County, LEAD Tool).",
                year: 2024,
                target: "100% clean electricity; <6% energy burden for all households",
                context: "Verified via Sonoma Clean Power Power Sources page (cross-checked — confirmed). Petaluma is in SCP's service territory. The 91% carbon-free default is ahead of CA's 60% by 2030 goal. Energy-burden number is a low-income-household proxy from the DOE LEAD Tool; precise Petaluma-specific figure requires interactive LEAD query at lead.openei.org. Reps at PG&E + SCP can advise.",
                source: "Sonoma Clean Power; DOE LEAD Tool",
                sourceUrl: "https://sonomacleanpower.org/power-sources",
                screenshot: null,
                actions: [
                    "Enroll in SCP EverGreen 100% renewable",
                    "Apply for SCP/PG&E income-qualified weatherization",
                    "Electrify home heating + cooking",
                    "Install rooftop solar via SCP ProFIT"
                ]
            },
            {
                name: "social equity",
                level: 75,
                indicator: "Gini index of income inequality",
                value: "0.44 (i.e., 44 on 0–100 scale)",
                year: 2019,
                target: "<30 (California Doughnut target)",
                context: "DRAFT severity — significantly above target. Subindicator: Racial Equity Index Inclusion Score = 66 (CA = 65; California Doughnut target = 100). Brian O. (development team) may have additional cohesion data; Blue Zone could advise on a Happiness Scale.",
                source: "Petaluma Socioeconomic Profile (p. 26)",
                sourceUrl: "https://www.planpetaluma.org/",
                screenshot: null,
                actions: [
                    "Support local living-wage ordinances",
                    "Advocate for progressive local taxation",
                    "Support Petaluma People Services + Mentor Me Petaluma"
                ]
            },
            {
                name: "peace & justice",
                level: 30,
                indicator: "Violent crimes per 100,000 residents",
                value: "510.7 per 100,000 (≈5.1 per 1,000); 302 violent crimes in 2023",
                year: 2023,
                target: "Reduced violent crime + restorative justice; ideally below CA average",
                context: "Verified via FBI Crime Data Explorer (Petaluma agency). The spreadsheet's '12.18 per 1,000' figure was INCORRECT — that's likely Part I total (violent + property) per 1,000 misclassified. Petaluma's 2023 rate (510.7 per 100k) is essentially the same as the California state average (508.2 per 100k).",
                source: "FBI UCR / Crime Data Explorer (Petaluma PD)",
                sourceUrl: "https://cde.ucr.cjis.gov/",
                screenshot: null,
                actions: [
                    "Support restorative-justice programs in Sonoma County",
                    "Participate in community-policing forums",
                    "Advocate for violence-prevention funding in the GP"
                ]
            },
            {
                name: "political voice",
                level: -50,
                indicator: "Voter turnout — Sonoma County, Nov 2024 general election",
                value: "~83% turnout (Sonoma County; ~54,000 of ~318,000 registered voters did not return ballots). Petaluma-specific turnout requires Statement-of-Vote-by-Precinct query.",
                year: 2024,
                target: ">75% turnout; broad civic participation",
                context: "Verified via Sonoma County Registrar of Voters (certified Dec 3, 2024 by Registrar Deva Marie Proto). County-scale turnout is well above target. Petaluma-specific number to be pulled from the precinct-level Statement of Vote. John Shribbs suggested adding a workshop-attendance / civic-engagement indicator for the GP update outreach.",
                source: "Sonoma County Registrar of Voters",
                sourceUrl: "https://sonomacounty.gov/administrative-support-and-fiscal-services/clerk-recorder-assessor-registrar-of-voters/registrar-of-voters/elections/november-5-2024-general-election-main-page",
                screenshot: null,
                actions: [
                    "Register + vote in every election",
                    "Attend Petaluma City Council meetings",
                    "Participate in GP update workshops"
                ]
            },
            {
                name: "gender equality",
                level: 25,
                indicator: "Gender pay ratio (full-time, year-round)",
                value: "Women earn 82¢ per $1 men earn — 18% pay gap. Male median: $92,544; female median: $75,991 (Petaluma city)",
                year: 2022,
                target: "1:1 pay equity",
                context: "Source: ACS 2017–2021 5-Year Estimates (2022 inflation-adjusted dollars), reported by Neilsberg. CA statewide ratio: 89.9% (BLS 2023). Petaluma's 82% means a wider pay gap than the state average. For the freshest number pull Census table S2002 directly (ACS 2019–2023). Gen H may also have county-level data.",
                source: "U.S. Census ACS via Neilsberg (BLS for state benchmark)",
                sourceUrl: "https://www.neilsberg.com/insights/topic/petaluma-ca-income/",
                screenshot: null,
                actions: [
                    "Support pay-transparency ordinances",
                    "Advocate for women-owned business procurement at the City",
                    "Support women-led Petaluma nonprofits"
                ]
            },
            {
                name: "networks",
                level: 0,
                indicator: "Broadband subscription + nonprofit density (social capital proxy)",
                value: "85% of Petaluma households subscribe to broadband (cable/fiber/DSL); 84% have fiber/cable/DSL available; 1% on Affordable Connectivity Program. Sonoma County has ~3,080 registered nonprofits = ~6.3 per 1,000 residents.",
                year: 2023,
                target: "Universal broadband (≥95%); strong civic-association density",
                context: "Verified via Census ACS S2801 (Petaluma city, 2023 5-Year). Note: 'Mobility' (72.6% commuters drive alone) is currently a separate Petaluma-specific dimension (see Mobility wedge), not folded into networks. Nonprofit density is a Sonoma County proxy — Petaluma-specific count not separately published.",
                source: "U.S. Census Bureau ACS 2023 Table S2801; Press Democrat nonprofit reporting",
                sourceUrl: "https://data.census.gov/table/ACSST5Y2023.S2801",
                screenshot: null,
                actions: [
                    "Support digital-equity programs",
                    "Strengthen neighborhood associations",
                    "Volunteer with Petaluma nonprofits",
                    "Advocate for ACP-replacement subsidies in the GP"
                ]
            },
            {
                name: "mobility",
                level: 75,
                indicator: "% of commuters driving alone (vs. transit / bike / walk / carpool)",
                value: "72.6% drive alone",
                year: 2024,
                target: "<50% drive-alone share (CalDEC / climate-action goal); growing transit + active-mobility share",
                context: "From Amelia's spreadsheet (Petaluma Socioeconomic Profile p. 35). Locally-defined Petaluma dimension — not in Kate Raworth's standard 12 — added because mobility is central to Petaluma's GP update + climate strategy. John Shribbs (Council) suggested adding indicators for student travel (e.g., % students biking to school) and public-transit ridership. Drive-alone share at 72.6% is significantly above the <50% target, meaning substantial overshoot relative to the SAFE space.",
                source: "Petaluma Socioeconomic Profile (p. 35) — ACS Journey-to-Work data",
                sourceUrl: "https://www.planpetaluma.org/",
                screenshot: null,
                actions: [
                    "Ride SMART, Petaluma Transit, or Sonoma County Transit",
                    "Bike or walk for short trips (Petaluma is 5 mi end-to-end)",
                    "Carpool — use Sonoma County Transportation Authority's carpool tools",
                    "Advocate for protected bike lanes + safer routes to school in the GP"
                ]
            }
        ]
    }
};
