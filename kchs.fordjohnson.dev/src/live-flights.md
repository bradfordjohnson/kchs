# Live Flights

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
display(arrivalData);

display(departureData);
```

```js
import { mapDepartureData, mapArrivalData } from './flightSchema.js';

const departures = departureData.data.map(flight => mapDepartureData(flight));
display(departures);

const arrivals = arrivalData.data.map(flight => mapArrivalData(flight));
display(arrivals);
```
