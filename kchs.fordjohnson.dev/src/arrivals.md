---
style: custom-style.css
---

# Arrivals

<div class="chip-description">
  <div class="chip-caption">
  See page:
  </div>
  <a href="/" class="chip">
  Home
  </a>
  <a href="/departures" class="chip">
  Departures
  </a>
</div>

```js

import { API_CONFIG, carrierCodes, todaysDate, mapData, airlineLogos, convertTo12Hour, getData, locations } from "./config.js";

const arrivalData = await getData(API_CONFIG.arrivalUrl);

const arrivalsRaw = arrivalData.data.map(flight =>  mapData(flight));

const arrivals = arrivalsRaw.filter(item => 
  item.arrivalDate === todaysDate &&
  item.estimatedArrival !== undefined &&
  carrierCodes.includes(item.carrierCode)
);

function createArrivalBoard(arrivals) {

  arrivals.sort((a, b) => a.arrivalTime.localeCompare(b.arrivalTime));
  
  const table = document.createElement("table");
  table.classList.add("arrival-board");

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th></th>
      <th>Flight</th>
      <th>Origin</th>
      <th>Time</th>
      <th>Gate</th>
      <th>Status</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  arrivals.forEach(arrival => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${airlineLogos[arrival.carrierCode]}" class="airline-logo" alt="${arrival.airline}"></td>
      <td>${arrival.flightNumber}</td>
      <td>${locations[arrival.departrueIcao] || arrival.departrueIcao}</td>
      <td>${convertTo12Hour(arrival.arrivalTime)}</td>
      <td>${arrival.arrivalGate}</td>
      <td class="${arrival.arrivalInGateTimeliness.toLowerCase()}">${arrival.arrivalInGateTimeliness}</td>
    `;
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  return table;
}

display(createArrivalBoard(arrivals));
```