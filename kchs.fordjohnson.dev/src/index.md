---
style: custom-style.css
---

# Charleston International Airport

[![ETL Flight Data](https://github.com/bradfordjohnson/kchs/actions/workflows/etl-flight-data.yaml/badge.svg)](https://github.com/bradfordjohnson/kchs/actions/workflows/etl-flight-data.yaml)
[![Deploy dashboard to Pages](https://github.com/bradfordjohnson/kchs/actions/workflows/dashboard-deploy.yml/badge.svg)](https://github.com/bradfordjohnson/kchs/actions/workflows/dashboard-deploy.yml)

Built with Observable Framework, this dashboard provides a dynamic, data-driven view of Charleston International Airport (KCHS) flight activity. It combines JavaScript-powered visuals, data mapping and fetching with a Python-based ETL pipeline that collects daily flight snapshots for historical views.

## Features

- Daily flight metrics and trends for arrivals and departures
  - WoW delta comparisons
- Arrivals and departures "boards", showing flights, statuses, and more.

### Features in development

- Live gate map – a Leaflet-based gate map with SVG plane overlays to track & visualize real-time in-gate performance
- Main interactive dashboard page with historical and live data
  - dimensional filters, metric performance and trends

### TODO

- Create data model and logic to determine what flights are in the gate at a given time

---

## Today's Flights

<!-- <div class="chip-description">
  <div class="chip-caption">
  See page:
  </div>
  <a href="/arrivals" class="chip">
  Arrivals
  </a>
  <a href="/departures" class="chip">
  Departures
  </a>
</div> -->

```js
import * as Plot from "npm:@observablehq/plot";
import { API_CONFIG, carrierCodes, todaysDate, mapData, chsGates, chsGatePlanes} from "./config.js";

async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
}
const departureData = await getData(API_CONFIG.departureUrl);
const arrivalData = await getData(API_CONFIG.arrivalUrl);
```

```js
const arrivals = arrivalData.data.map(flight =>  mapData(flight));
const departures = departureData.data.map(flight =>  mapData(flight));

const filteredArrivals = arrivals.filter(item => 
  item.arrivalDate === todaysDate &&
  item.estimatedArrival !== undefined &&
  carrierCodes.includes(item.carrierCode)
);

const filteredDepartures = departures.filter(item => 
  item.departureDate === todaysDate &&
  item.estimatedDeparture !== undefined &&
  carrierCodes.includes(item.carrierCode)
);

```

<div class="grid grid-cols-4" style="grid-auto-rows: auto;">
  <div class="card">
    <h2>Arrivals</h2>
    <span class="big">${filteredArrivals.length}</span>
    <span class="small">${arrivalsWowPercentageChange.toFixed(2)}% WoW Δ</span>
    <br/>
    <span>${arrivalSparkline}</span>
  </div>
  <div class="card">
    <h2>Departures</h2>
    <span class="big">${filteredDepartures.length}</span>
    <span class="small">${departuresWowPercentageChange.toFixed(2)}% WoW Δ</span>
    <br/>
    <span>${departureSparkline}</span>
  </div>
  
</div>

```js

const historicalArrivals = await getData("https://raw.githubusercontent.com/bradfordjohnson/kchs/refs/heads/master/data/arrivals.json");

const combinedArrivals = Object.values(historicalArrivals).flat(2);

const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

const formattedLastWeek = oneWeekAgo.toISOString().split("T")[0];

const lastWeekArrivals = combinedArrivals.filter(
  arrival => arrival.arrivalDate === formattedLastWeek &&
  carrierCodes.includes(arrival.icao)
);

const arrivalsWowPercentageChange = ((filteredArrivals.length / lastWeekArrivals.length) - 1) * 100;

const filteredHistoricalArrivals = combinedArrivals.filter(arrival => carrierCodes.includes(arrival.icao));

const arrivalsByDate = filteredHistoricalArrivals.reduce((acc, arrival) => {
  acc[arrival.arrivalDate] = (acc[arrival.arrivalDate] || 0) + 1;
  return acc;
}, {});

const todaysArrivals = {
  date: todaysDate,
  arrivals: filteredArrivals.length
};

const arrivalSparklineData = Object.keys(arrivalsByDate)
  .sort()
  .map(date => ({ date, arrivals: arrivalsByDate[date] }));
arrivalSparklineData.push(todaysArrivals);


const arrivalSparkline = Plot.plot({
  style: {
    display: "inline-block",
    marginBottom: -1,
    overflow: "visible",
    zIndex: 2,
    position: "relative"
  },
  x: { axis: null, type: "point" },
  y: { axis: null },
  width: 150,
  height: 75,
  margin: 1,
  marks: [
    Plot.areaY(arrivalSparklineData, { x: "date", y: "arrivals", fillOpacity: 0.1}),
    Plot.lineY(arrivalSparklineData, { x: "date", y: "arrivals", tip: true})
  ]
});
```

```js
const historicalDepartures = await getData("https://raw.githubusercontent.com/bradfordjohnson/kchs/refs/heads/master/data/departures.json");

const combinedDepartures = Object.values(historicalDepartures).flat(2);

const lastWeekDepartures = combinedDepartures.filter(
  departure => departure.departureDate === formattedLastWeek &&
  carrierCodes.includes(departure.icao)
);

const departuresWowPercentageChange = ((filteredDepartures.length / lastWeekDepartures.length) - 1) * 100;

const filteredHistoricalDepartures = combinedDepartures.filter(departure => carrierCodes.includes(departure.icao));

const departuresByDate = filteredHistoricalDepartures.reduce((acc, departure) => {
  acc[departure.departureDate] = (acc[departure.departureDate] || 0) + 1;
  return acc;
}, {});

const todaysDepartures = {
  date: todaysDate,
  departures: filteredDepartures.length
};

const departureSparklineData = Object.keys(departuresByDate)
  .sort()
  .map(date => ({ date, departures: departuresByDate[date] }));
departureSparklineData.push(todaysDepartures);

const departureSparkline = Plot.plot({
  style: {
    display: "inline-block",
    marginBottom: -1,
    overflow: "visible",
    zIndex: 2,
    position: "relative"
  },
  x: { axis: null, type: "point" },
  y: { axis: null },
  width: 150,
  height: 75,
  margin: 1,
  marks: [
    Plot.areaY(departureSparklineData, { x: "date", y: "departures", fillOpacity: 0.1}),
    Plot.lineY(departureSparklineData, { x: "date", y: "departures", tip: true})
  ]
});
```

```js
import * as L from "npm:leaflet";

const div = display(document.createElement("div"));
div.style = "height: 450px;";



const map = L.map(div,  { zoomControl: true, scrollWheelZoom: false, dragging: true })
  .setView([32.885636, -80.036886], 18);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})
  .addTo(map);

// Object.entries(chsGates).forEach(([gate, coords]) => {
//   L.circle(coords, {
//     radius:  4,
//     color: "green"
//   })
//   .addTo(map)
//   .bindPopup(`<b>Gate: ${gate}</b>`);
// });

// var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
// svgElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="294.728 -842.512 1642 1515">
// 	<path d="m1908.1019-252.4527q-67.6116-54.7508-277.1752-32.7248l-337.552 35.4781-489.7581-580.6049-4.0336-4.5531q-10.88-8.8105-23.5382-7.48L686.031-832.8766q-12.6582 1.3304-21.4687 12.2105-13.2157 16.3201-4.2618 33.8651L934.7258-212.0038 590.1416-175.7867Q447.9746-378.4109 437.0945-387.2213 426.2146-396.0319 413.5563-394.7013L323.5426-385.2405Q310.8843-383.9101 302.0738-373.0301 290.746-359.0415 296.8871-341.2008L416.9433-44.5335 361.1913 270.612q-3.7041 18.8754 11.0617 30.8324 10.88 8.8105 23.5382 7.48l90.791-8.8315q12.6582-1.3304 21.4687-12.2105 8.8105-10.88 105.7428-238.6345L958.3778 13.0307 809.4566 632.3235q-5.1106 19.0232 11.2095 32.239 10.88 8.8105 23.5382 7.48l90.0139-9.4608q12.6582-1.3304 21.4687-12.2105 2.5174-3.1085 2.9988-5.2923l358.3411-669.7437 337.552-35.4781q209.5635-22.0259 264.3143-89.6377 20.1382-24.8686 17.1077-53.7012-3.0304-28.8326-27.8992-48.9709z" fill="#000000"/>
// </svg>`;
// var svgElementBounds = [ [ 32.885238,-80.03826], [32.884713,-80.038016 ] ];
// L.svgOverlay(svgElement, svgElementBounds).addTo(map);

const early = ["A1", "B2"];
const late = ["B9", "B10"];
const hidden = ["A2A"];
Object.entries(chsGatePlanes).forEach(([key, { svg, bounds }]) => {
  var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgElement.innerHTML = svg;
  svgElement.classList.add(`plane-${key}`);

  // If the key is in the 'early' list, change fill to green
  if (early.includes(key)) {
    svgElement.querySelectorAll("path").forEach(path => {
      path.setAttribute("fill", "#50C878");
    });
  }

  if (late.includes(key)) {
    svgElement.querySelectorAll("path").forEach(path => {
      path.setAttribute("fill", "#880808");
    });
  }

  if (hidden.includes(key)) {
    svgElement.style.display = "none"; // Completely hides the SVG
  }

  L.svgOverlay(svgElement, bounds).addTo(map);
});


```
