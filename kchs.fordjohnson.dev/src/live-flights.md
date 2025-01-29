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

const arrivalData = await getData(API_CONFIG.arrivalUrl);
const departureData = await getData(API_CONFIG.departureUrl);
```

```js
display(arrivalData);

display(departureData);
```
