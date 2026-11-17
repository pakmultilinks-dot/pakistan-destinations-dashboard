// Pakistan Destinations Data Analysis
// Data transcribed from the public Google Sheet "Travel.pk - Pakistan Destinations
// Data Analysis" (TPT-2026-03089), checked 17 Nov 2026. Figures are quoted as
// published; where no figure is published the dataset says so.

const DESTINATIONS = [
  { name: "Hunza Valley", region: "Gilgit-Baltistan", type: "Mountain valley", altitude: 2438, season: "May-Oct", peak: "Jun-Sep", stay: "3-4", visitors: "Hunza district: 86,975 domestic tourists Jan-Jun 2026", booking: "38" },
  { name: "Skardu", region: "Gilgit-Baltistan", type: "Mountain town and lakes", altitude: 2228, season: "May-Oct", peak: "Jun-Sep", stay: "3-4", visitors: "Skardu district: 97,688 domestic tourists Jan-Jun 2026", booking: "93" },
  { name: "Gilgit", region: "Gilgit-Baltistan", type: "City and gateway", altitude: 1500, season: "May-Oct", peak: "Jun-Sep", stay: "1-2", visitors: "Gilgit district: 76,728 domestic tourists Jan-Jun 2026", booking: "26" },
  { name: "Fairy Meadows", region: "Gilgit-Baltistan", type: "Mountain meadow", altitude: 3300, season: "Jun-Sep", peak: "Jul-Aug", stay: "2-3", visitors: "Diamer district: 127,044 domestic tourists Jan-Jun 2026", booking: "Not counted" },
  { name: "Deosai Plains", region: "Gilgit-Baltistan", type: "High plateau", altitude: 4114, season: "Jun-Sep", peak: "Jul-Aug", stay: "1-2", visitors: "Skardu/Astore districts: 97,688 / 64,065 domestic tourists Jan-Jun 2026", booking: "Not counted" },
  { name: "Khunjerab Pass", region: "Gilgit-Baltistan", type: "High mountain pass", altitude: 4693, season: "May-Oct", peak: "Jun-Sep", stay: "1", visitors: "Hunza district: 86,975 domestic tourists Jan-Jun 2026", booking: "Not counted" },
  { name: "Khaplu", region: "Gilgit-Baltistan", type: "Mountain town and valley", altitude: 2600, season: "May-Oct", peak: "Jun-Sep", stay: "2-3", visitors: "Ghanche district: 5,493 domestic tourists Jan-Jun 2026", booking: "Not counted" },
  { name: "Astore Valley", region: "Gilgit-Baltistan", type: "Mountain valley", altitude: 2600, season: "Jun-Sep", peak: "Jul-Aug", stay: "2-3", visitors: "Astore district: 64,065 domestic tourists Jan-Jun 2026", booking: "Not counted" },
  { name: "Naran", region: "Khyber Pakhtunkhwa", type: "Mountain town and lakes", altitude: 2409, season: "May-Oct", peak: "Jun-Sep", stay: "2-3", visitors: "KP total 9.3m tourists May-Jul 2024", booking: "28" },
  { name: "Lake Saiful Muluk", region: "Khyber Pakhtunkhwa", type: "Alpine lake", altitude: 3224, season: "Jun-Sep", peak: "Jul-Aug", stay: "1", visitors: "KP total 9.3m tourists May-Jul 2024", booking: "Not counted" },
  { name: "Shogran", region: "Khyber Pakhtunkhwa", type: "Hill station", altitude: 2362, season: "May-Oct", peak: "Jun-Sep", stay: "1-2", visitors: "Not published for this destination", booking: "Not counted" },
  { name: "Kalam", region: "Khyber Pakhtunkhwa", type: "Mountain town and valley", altitude: 2000, season: "May-Oct", peak: "Jun-Sep", stay: "2-3", visitors: "Not published for this destination", booking: "Not counted" },
  { name: "Malam Jabba", region: "Khyber Pakhtunkhwa", type: "Ski resort and hill station", altitude: 2804, season: "Dec-Mar ski / May-Sep", peak: "Jan-Feb and Jul-Aug", stay: "1-2", visitors: "Not published for this destination", booking: "Not counted" },
  { name: "Swat (Mingora)", region: "Khyber Pakhtunkhwa", type: "Valley and city", altitude: 984, season: "Mar-Oct", peak: "Jun-Sep", stay: "2-3", visitors: "KP total 9.3m tourists May-Jul 2024", booking: "Not counted" },
  { name: "Chitral", region: "Khyber Pakhtunkhwa", type: "Mountain town and valleys", altitude: 1494, season: "May-Oct", peak: "May and Jul-Aug", stay: "3-4", visitors: "Not published for this destination", booking: "Not counted" },
  { name: "Nathia Gali", region: "Khyber Pakhtunkhwa", type: "Hill station", altitude: 2410, season: "May-Sep", peak: "Jun-Aug", stay: "1-2", visitors: "Not published for this destination", booking: "Not counted" },
  { name: "Murree", region: "Punjab", type: "Hill station", altitude: 2291, season: "Year-round; peaks May-Aug and Dec-Jan", peak: "Jun-Aug and Dec-Jan", stay: "2", visitors: "Not published for this destination", booking: "174" },
  { name: "Lahore", region: "Punjab", type: "Historic city", altitude: 217, season: "Oct-Mar", peak: "Dec-Feb", stay: "2-3", visitors: "Not published for this destination", booking: "1208" },
  { name: "Taxila", region: "Punjab", type: "Archaeological site", altitude: 549, season: "Oct-Mar", peak: "Nov-Feb", stay: "1", visitors: "Not published for this destination; UNESCO World Heritage 1980", booking: "Not counted" },
  { name: "Muzaffarabad", region: "Azad Jammu and Kashmir", type: "City and gateway", altitude: 737, season: "Mar-Nov", peak: "May-Sep", stay: "1-2", visitors: "Not published for this destination", booking: "Not counted" },
  { name: "Neelum Valley", region: "Azad Jammu and Kashmir", type: "Mountain valley", altitude: 1440, season: "May-Oct", peak: "Jun-Sep", stay: "2-3", visitors: "Not published for this destination", booking: "Not counted" },
  { name: "Quetta", region: "Balochistan", type: "City", altitude: 1680, season: "Mar-May and Sep-Nov", peak: "Apr-May and Oct", stay: "2-3", visitors: "Not published for this destination", booking: "Not counted" },
  { name: "Ziarat", region: "Balochistan", type: "Hill station", altitude: 2449, season: "May-Sep", peak: "Jun-Aug", stay: "1-2", visitors: "Not published for this destination", booking: "Not counted" },
  { name: "Gorakh Hill", region: "Sindh", type: "Hill station", altitude: 1734, season: "Nov-Feb", peak: "Dec-Jan", stay: "1-2", visitors: "Not published for this destination", booking: "Not counted" }
];

// Render the dataset table, with a region filter.
const tbody = document.getElementById("dest-body");
const rowCount = document.getElementById("row-count");

function renderTable(region) {
  const rows = DESTINATIONS.filter(function (d) {
    return region === "All" || d.region === region;
  });
  tbody.innerHTML = rows.map(function (d) {
    return "<tr><td><strong>" + d.name + "</strong></td><td>" + d.region + "</td><td>" + d.type + "</td><td>" + d.altitude.toLocaleString("en-US") + "</td><td>" + d.season + "</td><td>" + d.peak + "</td><td>" + d.stay + "</td><td>" + d.visitors + "</td><td>" + d.booking + "</td></tr>";
  }).join("");
  rowCount.textContent = "Showing " + rows.length + " of " + DESTINATIONS.length + " destinations.";
}

renderTable("All");

document.getElementById("filters").addEventListener("click", function (e) {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  document.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
  btn.classList.add("active");
  renderTable(btn.dataset.region);
});

// Charts (Chart.js 4, loaded from CDN in index.html).
const GREEN = "#166534";
const GREEN_LIGHT = "#22c55e";
const TEAL = "#0d9488";
const AMBER = "#d97706";
const SLATE = "#64748b";
const BLUE = "#2563eb";
const PALETTE = ["#166534", "#0d9488", "#2563eb", "#d97706", "#dc2626", "#7c3aed"];

function barChart(id, labels, data, label, horizontal) {
  return new Chart(document.getElementById(id), {
    type: "bar",
    data: { labels: labels, datasets: [{ label: label, data: data, backgroundColor: GREEN, borderRadius: 4 }] },
    options: {
      indexAxis: horizontal ? "y" : "x",
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { x: { ticks: { callback: function (v) { return Number(v).toLocaleString("en-US"); } } }, y: { ticks: { callback: function (v) { return Number(v).toLocaleString("en-US"); } } } }
    }
  });
}

// 1. GB domestic tourists by month, Jan-Jun 2026.
barChart("chart-months",
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  [18400, 26935, 35625, 92649, 108328, 200680],
  "Domestic tourists");

// 2. GB domestic tourists by district, Jan-Jun 2026.
barChart("chart-districts",
  ["Diamer", "Skardu", "Hunza", "Gilgit", "Astore", "Shigar", "Ghizer", "Nagar", "Ghanche", "Kharmang"],
  [127044, 97688, 86975, 76728, 64065, 9601, 7411, 5966, 5493, 1646],
  "Domestic tourists", true);

// 3. International tourist arrivals to Pakistan, 1993-2018 (no figure for 1999).
new Chart(document.getElementById("chart-arrivals"), {
  type: "line",
  data: {
    labels: ["1993", "1994", "1995", "1996", "1997", "1998", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"],
    datasets: [{ label: "International arrivals", data: [383000, 378000, 369000, 375000, 429000, 432000, 557000, 500000, 498000, 501000, 648000, 798000, 898000, 840000, 823000, 855000, 907000, 1161000, 966000, 565212, 530000, 563400, 965498, 1750000, 1900035], borderColor: TEAL, backgroundColor: "rgba(13,148,136,0.12)", fill: true, tension: 0.25, pointRadius: 2 }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { ticks: { callback: function (v) { return (v / 1000000).toFixed(1) + "m"; } } } }
  }
});

// 4. Booking.com properties by destination, 17 Nov 2026.
barChart("chart-booking",
  ["Lahore", "Murree", "Skardu", "Hunza", "Naran", "Gilgit"],
  [1208, 174, 93, 38, 28, 26],
  "Booking.com properties", true);

// 5. Destinations by region.
new Chart(document.getElementById("chart-regions"), {
  type: "doughnut",
  data: {
    labels: ["Gilgit-Baltistan", "Khyber Pakhtunkhwa", "Punjab", "Azad Jammu and Kashmir", "Balochistan", "Sindh"],
    datasets: [{ data: [8, 8, 3, 2, 2, 1], backgroundColor: PALETTE, borderWidth: 2, borderColor: "#fff" }]
  },
  options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } }
});

// 6. Altitude of the highest destinations (m).
barChart("chart-altitude",
  ["Khunjerab Pass", "Deosai Plains", "Fairy Meadows", "Lake Saiful Muluk", "Malam Jabba", "Khaplu", "Astore Valley"],
  [4693, 4114, 3300, 3224, 2804, 2600, 2600],
  "Altitude (m)", true);

// 7. Foreign arrivals by nationality, 2024.
new Chart(document.getElementById("chart-nationality"), {
  type: "bar",
  data: {
    labels: ["United Kingdom", "Afghanistan", "United States", "Canada", "China", "India", "United Arab Emirates", "Saudi Arabia"],
    datasets: [{ label: "Foreign arrivals 2024", data: [503383, 461199, 260406, 114133, 104788, 84327, 48177, 46255], backgroundColor: [GREEN, TEAL, BLUE, AMBER, SLATE, "#7c3aed", "#dc2626", GREEN_LIGHT], borderRadius: 4 }]
  },
  options: {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { ticks: { callback: function (v) { return Number(v).toLocaleString("en-US"); } } } }
  }
});
