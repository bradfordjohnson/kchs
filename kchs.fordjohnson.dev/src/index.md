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

<div class="grid grid-cols-2">
  <div class="card">
    <h2>Arrivals</h2>
    <span class="big">${filteredArrivals.length}</span>
  </div>
  <div class="card">
    <h2>Departures</h2>
    <span class="big">${filteredDepartures.length}</span>
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
