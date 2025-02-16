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
div.style = "height: 500px;";


const map = L.map(div,  { zoomControl: false, scrollWheelZoom: false, dragging: false })
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
// svgElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1833.46 -449.694 1634 1457"><path d="m-1790.3492 706.5654q78.8488 36.7678 276.8588-35.302l318.9423-116.0855 615.6712 444.8752 5.0152 3.442q12.6883 5.9167 24.6486 1.5634L-464.1619 974.1025q11.9603-4.3532 17.877-17.0415 8.875-19.0325-4.0576-33.8901L-855.6721 431.8371-530.0852 313.3332Q-343.122 475.5453-330.4337 481.4619-317.7454 487.3786-305.785 483.0254L-220.7338 452.0693Q-208.7734 447.716-202.8568 435.0277-195.2496 418.7142-205.5244 402.8892L-393.7847 144.0784-415.9293-175.1936q-.9723-19.2108-18.1921-27.2405-12.6883-5.9167-24.6486-1.5634l-85.9576 30.5335q-11.9603 4.3532-17.877 17.0415-5.9167 12.6883-44.8709 257.1276L-933.0624 219.209-938.3852-417.7154q.3567-19.6945-18.6758-28.5695-12.6883-5.9167-24.6486-1.5634l-85.0513 30.9561q-11.9603 4.3532-17.877 17.0415-1.6905 3.6252-1.6294 5.8605l-185.6712 736.54-318.9423 116.0855q-198.01 72.0697-234.7778 150.9185-13.5238 29.0018-3.6081 56.2448 9.9156 27.243 38.9175 40.7668z" fill="#000000"/></svg>`;
// var svgElementBounds = [ [ 32.886579,-80.037513], [ 32.886054,-80.037269 ] ];
// L.svgOverlay(svgElement, svgElementBounds).addTo(map);


Object.values(chsGatePlanes).forEach(({ svg, bounds }) => {
  var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgElement.innerHTML = svg;
  L.svgOverlay(svgElement, bounds).addTo(map);
});

```