# Today's Flights

```js
import { API_CONFIG } from "./config.js";

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
import { mapDepartureData, mapArrivalData } from './flightSchema.js';
const todaysDate = new Date().toISOString().slice(0, 10);

const carrierCodes = ['AAL', 'MXY', 'DAL', 'JBU', 'SWA', 'NKS', 'UAL']

const departures = departureData.data.map(flight => mapDepartureData(flight));

const filteredDepartures = departures.filter(
  item => item.departureDate === todaysDate
  && item.estimatedDeparture !== undefined
  && carrierCodes.includes(item.carrierCode)
);

const arrivals = arrivalData.data.map(flight => mapArrivalData(flight));

const filteredArrivals = arrivals.filter(
  item => item.arrivalDate === todaysDate 
  && item.estimatedArrival !== undefined
  && carrierCodes.includes(item.carrierCode)
);

```

<div class="grid grid-cols-4">
  <div class="card">
  <h2>Arrivals</h2>
  <span class="big">${filteredArrivals.length}</span>
  </div>
  <div class="card">
  <h2>Departures</h2>
  <span class="big">${filteredDepartures.length}</span>
  </div>
</div>


```js
display(filteredDepartures)
display(filteredArrivals)
```

```js
Inputs.table(filteredArrivals)
```
