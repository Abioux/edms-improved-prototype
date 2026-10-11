# EDMS Economic Dossier – data-entry prototype (v2)

Front-end-only demo of an improved mission data-entry form. **Not connected to EDMS**, sample data only, saved in the browser (localStorage).

Live: https://abioux.github.io/edms-improved-prototype/

## Look and feel
Rebuilt to match the existing EDMS (Laravel/Livewire, Bootstrap 5.3, Figtree font): same navigation bar, blue "Economic Dossier" header card, vertical pill tabs (Strategic Assessment, Macro Snapshot, Trade Profile, Key Players, View and Send), green per-tab Save buttons, "Saved!" pop-up, same labels/wording, preview page with Submit Report. Bootstrap CSS and the Figtree font are embedded, so the page works offline (no CDN).

## What is improved (kept subtle)
- **Logical data checks** – GDP (USD bn) × 1000 ÷ population (m) must roughly equal GDP per capita. Likely unit slips (GDP in millions, population in persons/thousands, per-capita in thousands, trade amounts in full dollars) get a friendly message and a one-click **Convert for me**. Plausibility limits: impossible values block Save/Submit; suspicious values only warn.
- **Trade logic** – amounts vs GDP, ranking order, duplicates blocked, ASEAN vs global partner consistency, a country cannot be its own partner.
- **Currency** – type a code or name (e.g. `my` → MYR – Malaysian Ringgit), then the rate shown as `1 USD = [rate] MYR`. 162 ISO 4217 currencies incl. OMR, YER, SDG, SSP.
- **HS4 search** – exports/imports: type a product word or code (palm, 1511, semiconductor, crude oil). 1,266 HS4 headings embedded (UN Comtrade HS classification).
- **Searchable country list** (normal capitalisation) for global partners; ASEAN partners stay a dropdown of the 11 states.
- Period = quarter + year (no default), "Data as at" shown, "Data not available" option, completeness check before Submit, unsaved-changes warning, Malaysian company suggestions/standardisation, Report type (Country / Consulate-General), areas-covered filter on the dashboard, printable preview, JSON download.

## Files
`index.html` is the single built page. `src/` has the sources (`app.js`, `data.js`, `hsdata.js`, `style.css`, `gen_assets.py`, `build.sh`, `test.py`).
HS4 data: UN Comtrade reference file `https://comtradeapi.un.org/files/v1/app/reference/HS.json` (4-digit level; 6-digit descriptions are used as hidden search keywords).
