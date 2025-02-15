# Charleston International Airport

## Today's Flights

```js
import * as Plot from "npm:@observablehq/plot";
import { API_CONFIG, carrierCodes, todaysDate, mapData } from "./config.js";

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

<div class="grid grid-cols-2" style="grid-auto-rows: auto;">
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

<div class="grid grid-cols-2">
  <div class="card" style="padding: 0;">
    ${Inputs.table(filteredArrivals, {
  columns: [
    "arrivalTime",
    "carrierCode",
    "flightNumber",
    "departrueIcao",
    "arrivalInGateTimeliness",
    "arrivalInGateVariation"
  ],
  header: {
    arrivalTime: "  Arrival Time",
    carrierCode: "  Carrier",
    flightNumber: "  Flight Number",
    departrueIcao: "  From",
    arrivalInGateTimeliness: "  Flight Status",
    arrivalInGateVariation: "  Variation"
  },
  format: {
    flightNumber: (x) => x.toString()
  },
  sort: "arrivalTime",
  layout: "auto",
  select: false,
})}
  </div>
  <div class="card" style="padding: 0;">
    ${Inputs.table(filteredDepartures, {
  columns: [
    "departureTime",
    "carrierCode",
    "flightNumber",
    "arrivalIcao",
    "departureOutGateTimeliness",
    "departureOutGateVariation"
  ],
  header: {
    departureTime: "  Departure Time",
    carrierCode: "  Carrier",
    flightNumber: "  Flight Number",
    arrivalIcao: "  To",
    departureOutGateTimeliness: "  Flight Status",
    departureOutGateVariation: "  Variation"
  },
  format: {
    flightNumber: (x) => x.toString()
  },
  sort: "departureTime",
  layout: "auto",
  select: false,
})}
  </div>
</div>
<div class="grid grid-cols-2">
  <div class="card">
  <h2>Arrival Status by Carrier</h2>

  ${Plot.rectY(
        countByCarrierAndField(filteredArrivals, "arrivalInGateTimeliness"),
    {
        x: "carrierCode",
        y: "count",
        fill: "arrivalInGateTimeliness",
        tip: true,
        sort: {x: "y", order: "descending"},
    }).plot(
        {
            color: {legend: true, label: "Timeliness", domain: ["OnTime", "Early", "Delayed"]}
        }
    )}
  
  </div>
  <div class="card">
  <h2>Departure Status by Carrier</h2>
  ${Plot.rectY(
        countByCarrierAndField(filteredDepartures, "departureOutGateTimeliness"),
    {
        x: "carrierCode",
        y: "count",
        fill: "departureOutGateTimeliness",
        tip: true,
        sort: {x: "y", order: "descending"}
    }).plot(
        {
            color: {legend: true, label: "Timeliness", domain: ["OnTime", "Early", "Delayed"]}
        }
    )}
  
  </div>
</div>

```js
function countByCarrierAndField(data, field) {
  return Object.entries(
    data.reduce((acc, obj) => {
      let key = `${obj.carrierCode}-${obj[field]}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {})
  )
  .map(([key, count]) => {
    let [carrierCode, fieldValue] = key.split("-");
    return { carrierCode, [field]: fieldValue, count };
  })
  .sort((a, b) => b.count - a.count);
}

```

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