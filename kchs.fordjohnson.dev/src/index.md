---
style: custom-style.css
---

# Charleston International Airport

## Today's Flights

<div class="chip-description">
  <div class="chip-caption">
  See page:
  </div>
  <a href="/arrivals" class="chip">
  Arrivals
  </a>
  <a href="/departures" class="chip">
  Departures
  </a>
</div>

```js
import * as Plot from "npm:@observablehq/plot";
import { API_CONFIG, carrierCodes, todaysDate, mapData, chsGates} from "./config.js";

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
    <span class="small">${arrivalsWowPercentageChange.toFixed(2)}% WoW</span>
    <br/>
    <span>${arrivalSparkline}</span>
  </div>
  <div class="card">
    <h2>Departures</h2>
    <span class="big">${filteredDepartures.length}</span>
    <span class="small">${departuresWowPercentageChange.toFixed(2)}% WoW</span>
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
div.style = "height: 600px;";

const map = L.map(div)
  .setView([32.885336, -80.036886], 18);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})
  .addTo(map);

Object.entries(chsGates).forEach(([gate, coords]) => {
  L.circle(coords, {
    radius:  4,
    color: "green"
  })
  .addTo(map)
  .bindPopup(`<b>Gate: ${gate}</b>`);
});

// var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
// svgElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1758.68 -905.444 1642 1515">
// 	<path d="M-1741.1785-212.7127q-20.1383-24.8687-17.1078-53.7012 3.0304-28.8326 27.8991-48.9708 67.6117-54.7509 277.1752-32.7249l337.5519 35.4781 489.7581-580.6049q.925-2.0358 4.0336-4.5531 10.88-8.8105 23.5382-7.4801l90.0138 9.4608q12.6582 1.3304 21.4687 12.2105 13.2157 16.3201 4.2617 33.865L-757.0112-274.936-412.427-238.7187Q-270.26-441.3429-259.38-450.1534q10.88-8.8105 23.5382-7.4801l90.6432 10.238q12.6582 1.3304 21.4687 12.2105 11.9571 14.7658 4.4095 32.4585L-239.3766-106.0591l55.7521 315.1455q2.2977 18.7275-11.691 30.0553-10.88 8.8105-23.5382 7.4801l-90.0138-9.4608q-12.6582-1.3304-21.4687-12.2105-8.8105-10.88-105.7428-238.6346L-780.6633-49.9013-631.7421 569.3914q5.1106 19.0232-11.2095 32.2389-10.88 8.8105-23.5382 7.4801l-90.0138-9.4608q-12.6582-1.3304-21.4687-12.2105l-2.9988-5.2922L-1139.3122-87.5969-1476.8641-123.075q-209.5635-22.026-264.3144-89.6377Z" fill="#000000"/>
// </svg>`;
// var svgElementBounds = [ [ 32.885197, -80.035599], [ 32.884672, -80.035355 ] ];
// L.svgOverlay(svgElement, svgElementBounds).addTo(map);

```