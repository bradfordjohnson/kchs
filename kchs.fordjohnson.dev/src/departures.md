---
style: custom-style.css
---

# Departures

<div class="chip-description">
  <div class="chip-caption">
  See page:
  </div>
  <a href="/" class="chip">
  Home
  </a>
  <a href="/arrivals" class="chip">
  Arrivals
  </a>
</div>


```js

import { API_CONFIG, carrierCodes, todaysDate, mapData, airlineLogos, convertTo12Hour, getData, locations } from "./config.js";

const departureData = await getData(API_CONFIG.departureUrl);

const departuresRaw = departureData.data.map(flight =>  mapData(flight));

const departures = departuresRaw.filter(item => 
  item.departureDate === todaysDate &&
  item.estimatedDeparture !== undefined &&
  carrierCodes.includes(item.carrierCode)
);

function createDepartureBoard(departures) {

  departures.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
  
  const table = document.createElement("table");
  table.classList.add("departure-board");

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th></th>
      <th>Flight</th>
      <th>Destination</th>
      <th>Time</th>
      <th>Gate</th>
      <th>Status</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  departures.forEach(departure => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${airlineLogos[departure.carrierCode]}" class="airline-logo" alt="${departure.airline}"></td>
      <td>${departure.flightNumber}</td>
      <td>${locations[departure.arrivalIcao] || departure.arrivalIcao }</td>
      <td>${convertTo12Hour(departure.departureTime)}</td>
      <td>${departure.departrueGate}</td>
      <td class="${departure.departureOutGateTimeliness.toLowerCase()}">${departure.departureOutGateTimeliness}</td>
    `;
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  return table;
}


display(createDepartureBoard(departures));
```