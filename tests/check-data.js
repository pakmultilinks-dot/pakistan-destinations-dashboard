// Checks for the Pakistan Destinations dashboard (TPT-2026-03089).
// Run with: node tests/check-data.js
// Exit code 0 means every check passed, non-zero means a check failed.
// This file reads app.js as text and evaluates only the DESTINATIONS array
// and the chart data series, so it does not need a browser or Chart.js.
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const appJs = fs.readFileSync(path.join(root, "app.js"), "utf8");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");

let failures = 0;
function check(name, ok, detail) {
  if (ok) {
    console.log("PASS: " + name);
  } else {
    failures += 1;
    console.log("FAIL: " + name + (detail ? " (" + detail + ")" : ""));
  }
}
function sum(values) {
  return values.reduce(function (a, b) { return a + b; }, 0);
}

// Extract and evaluate the DESTINATIONS array literal.
const destMatch = appJs.match(/const DESTINATIONS = (\[[\s\S]*?\n\]);/);
check("DESTINATIONS array found in app.js", Boolean(destMatch));
const DESTINATIONS = destMatch
  ? vm.runInNewContext("(" + destMatch[1] + ")")
  : [];

check("dataset has 24 destinations", DESTINATIONS.length === 24, "found " + DESTINATIONS.length);
const names = DESTINATIONS.map(function (d) { return d.name; });
check("destination names are unique", new Set(names).size === names.length);

const required = ["name", "region", "type", "altitude", "season", "peak", "stay", "visitors", "booking"];
const incomplete = DESTINATIONS.filter(function (d) {
  return required.some(function (k) { return d[k] === undefined || d[k] === ""; }) || typeof d.altitude !== "number";
});
check("every destination has all 9 fields with a numeric altitude", incomplete.length === 0, incomplete.length + " incomplete");

const regionCounts = {};
DESTINATIONS.forEach(function (d) { regionCounts[d.region] = (regionCounts[d.region] || 0) + 1; });
check("regions are GB 8, KP 8, Punjab 3, AJK 2, Balochistan 2, Sindh 1",
  regionCounts["Gilgit-Baltistan"] === 8 &&
  regionCounts["Khyber Pakhtunkhwa"] === 8 &&
  regionCounts["Punjab"] === 3 &&
  regionCounts["Azad Jammu and Kashmir"] === 2 &&
  regionCounts["Balochistan"] === 2 &&
  regionCounts["Sindh"] === 1,
  JSON.stringify(regionCounts));

// GB monthly tourists Jan-Jun 2026, from the GB Tourism Department Tourist Inflow 2026 figures.
const months = [18400, 26935, 35625, 92649, 108328, 200680];
check("GB monthly series sums to 482617", sum(months) === 482617, "sum " + sum(months));
check("GB monthly series is in app.js", months.every(function (n) { return appJs.includes(String(n)); }));
check("June 2026 is 200680, 41.6 percent of the Jan-Jun total",
  Math.abs(200680 / 482617 - 0.416) < 0.001);

// GB tourists by district Jan-Jun 2026.
const districts = [127044, 97688, 86975, 76728, 64065, 9601, 7411, 5966, 5493, 1646];
check("GB district series sums to 482617", sum(districts) === 482617, "sum " + sum(districts));
check("Diamer district leads with 127044", districts[0] === 127044);

// International arrivals 1993-2018.
check("international arrivals start at 383000 in 1993", appJs.includes("383000"));
check("international arrivals end at 1900035 in 2018", appJs.includes("1900035"));

// Charts and page structure.
const chartIds = ["chart-months", "chart-districts", "chart-arrivals", "chart-booking", "chart-regions", "chart-altitude", "chart-nationality"];
check("all 7 chart canvases exist in index.html",
  chartIds.every(function (id) { return indexHtml.includes('id="' + id + '"'); }));
check("dataset table exists in index.html", indexHtml.includes('id="dest-body"'));
check("summary section exists in index.html", /summary/i.test(indexHtml));
check("sources section exists in index.html", /sources/i.test(indexHtml));

// Repo completeness.
check("README.md exists", fs.existsSync(path.join(root, "README.md")));
check(".env.example exists", fs.existsSync(path.join(root, ".env.example")));
check(".gitignore exists", fs.existsSync(path.join(root, ".gitignore")));
check("no em dash in app.js", !appJs.includes("\u2014"));
check("no em dash in index.html", !indexHtml.includes("\u2014"));

if (failures > 0) {
  console.log(failures + " check(s) failed.");
  process.exit(1);
}
console.log("All checks passed.");
