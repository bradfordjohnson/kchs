<!-- markdownlint-disable -->

<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W39B6FZ6"height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>


# Charleston International Airport

```js
import * as Plot from "npm:@observablehq/plot";
import * as L from "npm:leaflet";
import {airlines, locations, chsGatePlanes} from "./helpers.js";

const now = new Date();
  document.getElementById("lastUpdated").innerText = now.toLocaleTimeString();

const gateMap = {
  A1: null,
  A2A: null,
  A2: null,
  A3: null,
  A4: null,
  A5: null,
  A6: null,
  A7: null,
  B1: null,
  B2: null,
  B3: null,
  B4: null,
  B5: null,
  B6: null,
  B7: null,
  B8: null,
  B9: null,
  B10: null,
};

const groupFlightsByAircraft = (flights) => {
  return flights.reduce((acc, flight) => {
    const regNum = flight.aircraftRegistrationNumber;
    if (!regNum) return acc;

    if (!acc[regNum]) {
      acc[regNum] = [];
    }
    acc[regNum].push(flight);
    return acc;
  }, {});
};

// Function to sort flights by gate times
const sortFlightsByGateTime = (flights) => {
  return flights.sort((a, b) => {
    const aGateTime =
      a.status?.estimatedTime?.inGate?.local ||
      a.status?.estimatedTime?.outGate?.local;
    const bGateTime =
      b.status?.estimatedTime?.inGate?.local ||
      b.status?.estimatedTime?.outGate?.local;

    return new Date(aGateTime) - new Date(bGateTime);
  });
};

// Function to update gate map with occupancy and departure status
const updateGateMap = (flights) => {
  const groupedFlights = groupFlightsByAircraft(flights);

  // For each aircraft, sort flights by gate times and update the gate status
  for (const regNum in groupedFlights) {
    const aircraftFlights = sortFlightsByGateTime(groupedFlights[regNum]);

    let isAtGate = false;
    let currentGate = null;

    // Process each flight for this aircraft
    for (const flight of aircraftFlights) {
      const { gate, status, type } = flight;
      if (!gate || !status || !status.actualTime) continue;

      if (type === "arrival" && status.actualTime.inGate) {
        // Arrival: Mark the gate as occupied if it's not already
        if (!isAtGate && gateMap[gate] === null) {
          gateMap[gate] = {
            aircraft: regNum,
            inTime: status.actualTime.inGate.local,
            airlineName: flight.airlineName,
          };
          isAtGate = true;
        }
      } else if (type === "departure" && status.actualTime.outGate) {
        // Departure: Mark the gate as free if the plane has departed
        if (isAtGate && gateMap[gate]?.aircraft === regNum) {
          // Clear the gate only if the aircraft matches
          gateMap[gate] = null; // Clear the gate
          isAtGate = false;
        }
      }
    }
  }

  // Optionally, clear gates that should no longer be occupied based on outGate time
  for (const gate in gateMap) {
    if (gateMap[gate] !== null && gateMap[gate]?.outTime) {
      gateMap[gate] = null; // Clear gate if it's occupied but the plane has departed
    }
  }

  return gateMap;
};

async function fetchAndProcessFlights() {
  const getData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  const filterFlights = (flights, flightType, airlines) =>
    flights.filter((flight) => {
      const airline = flight.carrierCode?.iata;
      const serviceType = flight.serviceTypeCode?.iata;
      if (!airline || !flight.statusDetails?.[0]) return false;
      if (
        (airline === "AC" &&
          flightType === "arrival" &&
          flight.departure.airport.iata !== "YYZ") ||
        (airline === "UA" &&
          flightType === "departure" &&
          flight.arrival.airport.iata === "YYZ") ||
        serviceType !== "J"
      ) {
        return false;
      }
      if (flight.codeshare?.comment050?.code) {
        const codeshareAirline = flight.codeshare.comment050.code;
        if (
          codeshareAirline !== "AC" &&
          airlines.some((a) => a.code === codeshareAirline)
        ) {
          return false;
        }
      }
      return true;
    });

  const mapData = (flight, type) => {
    const airline = airlines.find(
      (airline) => airline.code === flight.carrierCode?.iata
    );
    const statusDetails = flight.statusDetails?.[0] || {};
    const statusObj =
      type === "arrival"
        ? statusDetails.arrival || {}
        : statusDetails.departure || {};
    const timeliness =
      type === "arrival"
        ? statusObj.estimatedTime?.inGateTimeliness || null
        : statusObj.estimatedTime?.outGateTimeliness || null;
    const city =
      type === "arrival"
        ? statusDetails.departure?.airport?.iata || null
        : statusDetails.arrival?.airport?.iata || null;
    const cityName = locations.find((location) => location.code === city)?.name;
    return {
      airlineName: airline?.name || null,
      flightNumber: flight.flightNumber || null,
      city: cityName,
      timeliness: timeliness,
      aircraftRegistrationNumber:
        statusDetails.equipment?.aircraftRegistrationNumber || null,
      aircraftType: statusDetails.equipment?.actualAircraftType?.icao || null,
      gate: statusObj.gate || null,
      status: statusObj,
      type,
    };
  };

  const arrivalData = await getData(
    "https://ccaafids.azurewebsites.net/api/FIDsTest?code=VnSepGuKSiEXD0zW_eOg73NkKKgyT_jDIZOm8pvuCbs8AzFuNZG1RA==&dir=arrival"
  );
  const departureData = await getData(
    "https://ccaafids.azurewebsites.net/api/FIDsTest?code=VnSepGuKSiEXD0zW_eOg73NkKKgyT_jDIZOm8pvuCbs8AzFuNZG1RA==&dir=departure"
  );
  if (!arrivalData || !departureData) {
    console.error("No flight data available");
    return [];
  }

  const combinedFlights = [
    ...filterFlights(arrivalData, "arrival", airlines).map((flight) =>
      mapData(flight, "arrival")
    ),
    ...filterFlights(departureData, "departure", airlines).map((flight) =>
      mapData(flight, "departure")
    ),
  ];

  return combinedFlights;
}

fetchAndProcessFlights().then((combinedFlights) => {

  const totalFlights = combinedFlights.length;
  document.getElementById("totalFlights").innerText = `${totalFlights}`;

  const totalArrivals = combinedFlights.filter(
    (flight) => flight.type === "arrival"
  ).length;
  document.getElementById("totalArrivals").innerText = `${totalArrivals}`;

  const totalDepartures = combinedFlights.filter(
    (flight) => flight.type === "departure"
  ).length;
  document.getElementById("totalDepartures").innerText = `${totalDepartures}`;

    const airlineFlightTypeStackedBar = Plot.plot({
    marginBottom: 60,
    color: {legend: true,},
    x: { label: null, tickRotate: -30 },
    y: { label: "Flights" },
    fx: { label: null },
    marks: [
      Plot.barY(
        combinedFlights,
        Plot.groupX(
          { y: "count" },
          {
            fill: "type",
            x: "airlineName",
            sort: { x: "y", reverse: true },
            tip: true,
          }
        )
      ),
    ],
  });
  
  document
    .getElementById("airlinesByFlightType")
    .appendChild(airlineFlightTypeStackedBar);
  

  const arrivalsAirline = combinedFlights.filter(flight => flight.type === "arrival");
  const airlineArrivalsTimelinessStackedBar = Plot.plot({
    marginBottom: 60,
    x: { label: null, tickRotate: -30 },
    y: { label: "Flights" },
    fx: { label: null },
    color: { domain: ["OnTime", "Delayed", "Early"], scheme: "category10", legend: true, },
    marks: [
      Plot.barY(
        arrivalsAirline,
        Plot.groupX(
          { y: "count" },
          {
            x: "airlineName",
            fill: "timeliness",
            sort: { x: "y", reverse: true },
            tip: true,
          }
        )
      ),
    ],
  });

  document
    .getElementById("airlinesArrivalsByTimeliness")
    .appendChild(airlineArrivalsTimelinessStackedBar);

  const departuresAirline = combinedFlights.filter(flight => flight.type === "departure");
  const airlineDeparturesTimelinessStackedBar = Plot.plot({
    marginBottom: 60,
    x: { label: null, tickRotate: -30 },
    y: { label: "Flights" },
    fx: { label: null },
    color: { domain: ["OnTime", "Delayed", "Early"], scheme: "category10", legend: true, },
    marks: [
      Plot.barY(
        departuresAirline,
        Plot.groupX(
          { y: "count" },
          {
            x: "airlineName",
            fill: "timeliness",
            sort: { x: "y", reverse: true },
            tip: true,
          }
        )
      ),
    ],
  });

  document
    .getElementById("airlinesDeparturesByTimeliness")
    .appendChild(airlineDeparturesTimelinessStackedBar);


  const gateMapDiv = document.createElement("div");
  gateMapDiv.style = "height: 450px;";

  document
    .getElementById("gate-map")
    .appendChild(gateMapDiv);
  
  const map = L.map(gateMapDiv, {
  zoomControl: true,
  scrollWheelZoom: false,
  dragging: true,
  }).setView([32.885636, -80.036886], 18);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const updatedGateMap = updateGateMap(combinedFlights);

  const early = [];
  const late = [];
  const hidden = Object.keys(updatedGateMap).filter(
    (gate) => updatedGateMap[gate] === null
  );

  Object.entries(chsGatePlanes).forEach(([key, { svg, bounds }]) => {
    var svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgElement.innerHTML = svg;
    svgElement.classList.add(`plane-${key}`);

    // If the key is in the 'early' list, change fill to green
    if (early.includes(key)) {
      svgElement.querySelectorAll("path").forEach((path) => {
        path.setAttribute("fill", "#50C878");
      });
    }

    if (late.includes(key)) {
      svgElement.querySelectorAll("path").forEach((path) => {
        path.setAttribute("fill", "#880808");
      });
    }

    if (hidden.includes(key)) {
      svgElement.style.display = "none"; // Completely hides the SVG
    }

    L.svgOverlay(svgElement, bounds).addTo(map);
  });

});
```

```js
async function getHistData(url) {
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

const historicalArrivals = await getHistData(
  "https://raw.githubusercontent.com/bradfordjohnson/kchs/refs/heads/master/data/arrivals.json"
);

const historicalDepartures = await getHistData(
  "https://raw.githubusercontent.com/bradfordjohnson/kchs/refs/heads/master/data/departures.json"
);

const histArrivals = Object.values(historicalArrivals)
  .flat(2)
  .map((entry) => ({
    ...entry,
    type: "arrival",
  }));

const histDepartures = Object.values(historicalDepartures)
  .flat(2)
  .map((entry) => ({
    ...entry,
    type: "departure",
  }));

const combinedHistoricalFlights = [...histArrivals, ...histDepartures];

const airlineLookup = Object.fromEntries(
  airlines.map((airline) => [airline.icao, airline])
);

const filteredHistoricalFlights = combinedHistoricalFlights.filter(
  (flight) => airlineLookup[flight.icao]
);

const mapHistoricData = (flight, type) => {
  const airline = airlines.find(
    (airline) => airline.icao === flight.icao
  );

  const timeliness =
    type === "arrival"
      ? flight.estimatedArrivalInGateTimeliness || null
      : flight.estimatedDepartureOutGateTimeliness || null;

  const city = type === "arrival" ? flight.departureIcao || null : flight.arrivalIcao || null;

  const gate = type === "arrival" ? flight.arrivalGate || null : flight.departureGate || null;

  const cityName = locations.find((location) => location.icao === city)?.name;

  const date = type === "arrival" ? flight.arrivalDate || flight.departureDate || null : flight.departureDate || flight.arrivalDate || null;

  return {
    flightDate: date,
    airlineName: airline?.name || null,
    flightNumber: flight.flightNumber || null,
    city: cityName,
    timeliness: timeliness,
    aircraftRegistrationNumber: flight.aircraftRegistrationNumber || null,
    aircraftType: flight.aircraftType || null,
    gate: gate,
    type,
  };
};

const mappedHistoricFlights = filteredHistoricalFlights.map(flight =>
  mapHistoricData(flight, flight.type)
);

const parseDate = d3.timeParse("%Y-%m-%d");

const historicAggregatedFlightsByType = Array.from(
  d3.rollup(
    mappedHistoricFlights,
    flights => flights.length,
    flight => flight.flightDate,
    flight => flight.type
  ),
  ([flightDate, typeMap]) => {
    return Array.from(typeMap, ([type, count]) => ({
      date: parseDate(flightDate),
      type,
      count
    }));
  }
).flat();

const historicFlightsTrendLine = Plot.plot({
  y: {zero: true, label: "Flights"},
  fy: {label: null},
  marks: [
    Plot.lineY(historicAggregatedFlightsByType, {x: "date", y: "count", stroke: "type", fy: "type", tip: "x"}),
    Plot.crosshairX(historicAggregatedFlightsByType, {x: "date", y: "count"}),
    Plot.frame()
  ]
});

  document
    .getElementById("historicFlightsTrendLine")
    .appendChild(historicFlightsTrendLine);
```

<div class="grid grid-cols-2">
<div class="tip" label="About">

[![ETL Flight Data](https://github.com/bradfordjohnson/kchs/actions/workflows/etl-flight-data.yaml/badge.svg)](https://github.com/bradfordjohnson/kchs/actions/workflows/etl-flight-data.yaml)
[![Deploy dashboard to Pages](https://github.com/bradfordjohnson/kchs/actions/workflows/dashboard-deploy.yml/badge.svg)](https://github.com/bradfordjohnson/kchs/actions/workflows/dashboard-deploy.yml)

Built with Observable Framework, this _work in progress_ dashboard delivers a dynamic view of Charleston International Airport (KCHS) flights, combining JavaScript visuals, data mapping, and a Python ETL pipeline for daily historical snapshots.
</div>

<div class="warning">

__Historical trend data__ snapshots and __live gate map data__ may contain inaccuracies.

Other live data is pulled directly from an API that powers the official CHS website.
</div>
</div>

<div class="grid grid-cols-4" style="grid-auto-rows: auto;">
  <div class="card">
    <h2>Scheduled Flights Today</h2>
    <span class="big" id="totalFlights"></span>
  </div>

  <div class="card">
    <h2>Scheduled Arrivals</h2>
    <span class="big" id="totalArrivals"></span>
  </div>
  <div class="card">
    <h2>Scheduled Departures</h2>
    <span class="big" id="totalDepartures"></span>
  </div>
    <div class="card">
    <h2>Last Updated</h2>
    <span class="big" id="lastUpdated"></span>
  </div>
</div>

  <div class="card grid-colspan-2">
    <h2>Live Gate Map</h2>
    <p>Aircraft currently in their gates.</p>
    <div id="gate-map"></div>
  </div>

<div class="grid grid-cols-4" style="grid-auto-rows: auto;">
  <div class="card grid-colspan-2" style="display: flex; flex-direction: column; gap: 1rem;">
    <h2>Today's Flights by Type and Airline</h2>
    <span id="airlinesByFlightType"></span>
  </div>

  <div class="card grid-colspan-2" style="display: flex; flex-direction: column; gap: 1rem;">
    <h2>Historic Daily Trends by Flight Type</h2>
    <span id="historicFlightsTrendLine"></span>
  </div>

  <div class="card grid-colspan-2">
    <h2>Today's Arrival Timeliness by Airline</h2>
    <span id="airlinesArrivalsByTimeliness"></span>
  </div>

  <div class="card grid-colspan-2">
    <h2>Today's Departure Timeliness by Airline</h2>
    <span id="airlinesDeparturesByTimeliness"></span>
  </div>

</div>