# Charleston International Airport

```js
import * as Plot from "npm:@observablehq/plot";

const airlines = [
  {
    code: "AA",
    name: "American Airlines",
  },
  {
    code: "AS",
    name: "Alaska",
  },
  {
    code: "G4",
    name: "Allegiant",
  },
  {
    code: "XP",
    name: "Avelo",
  },
  {
    code: "MX",
    name: "Breeze Airways",
  },
  {
    code: "DL",
    name: "Delta",
  },
  {
    code: "F9",
    name: "Frontier",
  },
  {
    code: "B6",
    name: "JetBlue",
  },
  {
    code: "3M",
    name: "Silver",
  },
  {
    code: "WN",
    name: "Southwest",
  },
  {
    code: "SY",
    name: "Sun Country",
  },
  {
    code: "UA",
    name: "United Airlines",
  },
  {
    code: "NK",
    name: "Spirit",
  },
  {
    code: "AC",
    name: "Air Canada",
  },
];

async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

function filterFlights(flights, flightType, airlines) {
  return flights.filter((flight) => {
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
}

async function fetchFlightData() {
  const arrivalData = await getData(
    "https://ccaafids.azurewebsites.net/api/FIDsTest?code=VnSepGuKSiEXD0zW_eOg73NkKKgyT_jDIZOm8pvuCbs8AzFuNZG1RA==&dir=arrival"
  );

  if (!arrivalData) {
    console.error("No arrival data available");
    return;
  }

  const arrivals = filterFlights(arrivalData, "arrival", airlines);

  const departureData = await getData(
    "https://ccaafids.azurewebsites.net/api/FIDsTest?code=VnSepGuKSiEXD0zW_eOg73NkKKgyT_jDIZOm8pvuCbs8AzFuNZG1RA==&dir=departure"
  );

  if (!departureData) {
    console.error("No departure data available");
    return;
  }

  const departures = filterFlights(departureData, "departure", airlines);

  // mapping data
  const mapData = (flight, type) => {
    const airline = airlines.find(
      (airline) => airline.code === flight.carrierCode?.iata
    );

    const statusDetails = flight.statusDetails?.[0];
    const statusObj = statusDetails
      ? type === "arrival"
        ? statusDetails.arrival
        : statusDetails.departure
      : null;

    const timeliness = statusDetails
      ? type === "arrival"
        ? statusDetails.arrival.estimatedTime.inGateTimeliness
        : statusDetails.departure.estimatedTime.outGateTimeliness
      : null;

    return {
      airlineName: airline ? airline.name : null,
      flightNumber: flight.flightNumber || null,
      timeliness: timeliness,
      status: statusObj,

      type,
    };
  };

  const combinedFlights = [
    ...arrivals.map((flight) => mapData(flight, "arrival")),
    ...departures.map((flight) => mapData(flight, "departure")),
  ];

  display(combinedFlights);

  const totalFlights = combinedFlights.length;
  document.getElementById("totalFlights").innerText = `${totalFlights}`;

  const totalArrivals = combinedFlights.filter(
    (flight) => flight.type === "arrival"
  ).length;
  document.getElementById(
    "totalArrivals"
  ).innerText = `${totalArrivals}`;

  const totalDepartures = combinedFlights.filter(
    (flight) => flight.type === "departure"
  ).length;
  document.getElementById(
    "totalDepartures"
  ).innerText = `${totalDepartures}`;
}

fetchFlightData();
```

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
  
</div>
