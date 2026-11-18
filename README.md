# Pakistan Destinations Data Analysis

A simple, clean static dashboard for 24 of Pakistan's most-visited destinations,
built for TechAbout task TPT-2026-03089. It shows the full 24-destination dataset
in a filterable table and 7 charts: GB tourists by month and by district, international
arrivals 1993-2018, Booking.com property counts, destinations by region, altitude
of the highest destinations, and foreign arrivals by nationality in 2024. It also
includes a half-page summary of what the data shows, the key findings, the
limitations, and the full sources list.

## Data source

All figures come from the public Google Sheet "Travel.pk - Pakistan Destinations
Data Analysis":

https://docs.google.com/spreadsheets/d/1neE_90jI32ZKyMF3WSHnEll96mLAj4cwEd0Gp7UZiT4/edit?usp=sharing

The sheet was built from public sources (Wikipedia "Tourism in Pakistan", the GB
Tourism Department "Tourist Inflow 2026" PDF, a Dawn article on KP tourism,
Booking.com property counts checked 17 Nov 2026, Wikipedia destination articles,
Pamir Times, and UNESCO Taxila). The dashboard data in `app.js` is a direct
transcription of that sheet. Where the sheet says no figure is published, the
dashboard says so too; nothing is estimated or invented.

## Setup

No build step and no backend. The page is plain HTML, CSS and JavaScript, with
Chart.js 4.4.1 vendored in `vendor/chart.umd.min.js`, so the charts work offline
with no CDN.

Open `index.html` directly in a browser, or serve the folder locally:

```
python3 -m http.server 8000
```

then open http://localhost:8000

## How it was tested

1. `node --check app.js` to confirm the JavaScript parses.
2. `node tests/check-data.js` to run the 21 data checks: 24 destinations with unique names and all 9 fields, region counts (GB 8, KP 8, Punjab 3, AJK 2, Balochistan 2, Sindh 1), GB monthly and district series both summing to 482,617, international arrivals 383,000 in 1993 to 1,900,035 in 2018, all 7 chart canvases, dataset table, summary and sources sections, README, .env.example and .gitignore present, and no em dash in app.js or index.html.
2. Served locally with `python3 -m http.server` and fetched the page with curl,
   confirming HTTP 200 and that the page contains the title, the 7 chart canvases,
   the dataset table and the sources section.
3. Verified every number in `app.js` against the source sheet (24 destinations,
   GB monthly and district totals, the 1993-2018 arrivals series, Booking.com
   counts, region counts, altitudes, 2024 nationalities).
4. After deploying to GitHub Pages, fetched the live URL with curl and confirmed
   it returns HTTP 200 with the full page, and confirmed the vendored Chart.js
   file it loads is served from the same site.
5. Checked the whole repo for the em dash character and for any secret before
   pushing; none present.

## Limitations

- No official visitor count for a single destination is published for any of the
  24 destinations; the best available figures are district totals for GB and a
  provincial total for KP, and the dashboard says that plainly.
- Booking.com counts cover only 6 destinations, count listings (not rooms or
  beds) and include nearby properties.
- Stay lengths are itinerary norms, not measured data; no length-of-stay
  statistics are published per destination.
- The GB 2026 figures cover January to June only; the full year is not yet
  published.
- Chart.js is vendored in the repo, so the charts work offline too.