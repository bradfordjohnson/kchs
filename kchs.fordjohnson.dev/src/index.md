<!-- markdownlint-disable -->

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

const locations = [
  {
    code: "CHS",
    name: "Charleston",
  },
  {
    code: "ATL",
    name: "Atlanta",
  },
  {
    code: "SEA",
    name: "Seattle",
  },
  {
    code: "CVG",
    name: "Cincinnati",
  },
  {
    code: "LCK",
    name: "Columbus",
  },
  {
    code: "IND",
    name: "Indianapolis",
  },
  {
    code: "SDF",
    name: "Louisville",
  },
  {
    code: "PIT",
    name: "Pittsburgh",
  },
  {
    code: "BLV",
    name: "St. Louis",
  },
  {
    code: "CLT",
    name: "Charlotte",
  },
  {
    code: "ORD",
    name: "Chicago",
  },
  {
    code: "DFW",
    name: "Dallas/Forth Worth",
  },
  {
    code: "PHL",
    name: "Philadelphia",
  },
  {
    code: "MIA",
    name: "Miami",
  },
  {
    code: "DCA",
    name: "Washington, D.C.",
  },
  {
    code: "HVN",
    name: "New Haven",
  },
  {
    code: "CAK",
    name: "Akron/Canton",
  },
  {
    code: "CMH",
    name: "Columbus",
  },
  {
    code: "RSW",
    name: "Fort Myers",
  },
  {
    code: "BDL",
    name: "Hartford",
  },
  {
    code: "ISP",
    name: "Islip",
  },
  {
    code: "LAS",
    name: "Las Vegas",
  },
  {
    code: "SDF",
    name: "Louisville",
  },
  {
    code: "MSY",
    name: "New Orleans",
  },
  {
    code: "ORF",
    name: "Norfolk",
  },
  {
    code: "MCO",
    name: "Orlando",
  },
  {
    code: "PFD",
    name: "Providence",
  },
  {
    code: "RIC",
    name: "Richmond",
  },
  {
    code: "SFO",
    name: "San Francisco",
  },
  {
    code: "SYR",
    name: "Syracuse",
  },
  {
    code: "TPA",
    name: "Tampa",
  },
  {
    code: "HPN",
    name: "Westchester, NY",
  },
  {
    code: "PBI",
    name: "West Palm Beach",
  },
  {
    code: "BOS",
    name: "Boston",
  },
  {
    code: "DTW",
    name: "Detroit",
  },
  {
    code: "LGA",
    name: "New York City",
  },
  {
    code: "JFK",
    name: "New York City",
  },
  {
    code: "MSP",
    name: "Minneapolis",
  },
  {
    code: "DEN",
    name: "Denver",
  },
  {
    code: "FLL",
    name: "Fort Lauderdale",
  },
  {
    code: "LAX",
    name: "Los Angeles",
  },
  {
    code: "AUS",
    name: "Austin",
  },
  {
    code: "BWI",
    name: "Baltimore",
  },
  {
    code: "MDW",
    name: "Chicago",
  },
  {
    code: "DAL",
    name: "Dallas",
  },
  {
    code: "HOU",
    name: "Houston",
  },
  {
    code: "MCI",
    name: "Kansas City",
  },
  {
    code: "BNA",
    name: "Nashville",
  },
  {
    code: "STL",
    name: "St. Louis",
  },
  {
    code: "IAH",
    name: "Houston",
  },
  {
    code: "EWR",
    name: "Newark",
  },
  {
    code: "IAD",
    name: "Washington, D.C.",
  },
  {
    code: "PNS",
    name: "Pensacola",
  },
  {
    code: "SAT",
    name: "San Antonio",
  },
  {
    code: "COS",
    name: "Colorado Springs",
  },
  {
    code: "PHX",
    name: "Phoenix",
  },
  {
    code: "PVD",
    name: "Providence",
  },
  {
    code: "PVU",
    name: "Provo",
  },
  {
    code: "TYS",
    name: "Jacksonville",
  },
  {
    code: "ABE",
    name: "Allentown",
  },
  {
    code: "OMA",
    name: "Omaha",
  },
  {
    code: "TRI",
    name: "Bristol/Johnson/Kingsp",
  },
  {
    code: "ABQ",
    name: "Albuquerque",
  },
  {
    code: "ALB",
    name: "Albany",
  },
  {
    code: "BHM",
    name: "Birmingham",
  },
  {
    code: "BRL",
    name: "Burlington",
  },
  {
    code: "BTR",
    name: "Baton Rouge",
  },
  {
    code: "BUF",
    name: "Buffalo",
  },
  {
    code: "CAE",
    name: "Columbia",
  },
  {
    code: "CID",
    name: "Cedar Rapids",
  },
  {
    code: "CLE",
    name: "Cleveland",
  },
  {
    code: "CRP",
    name: "Corpus Christi",
  },
  {
    code: "DAY",
    name: "Dayton",
  },
  {
    code: "DSM",
    name: "Des Moines",
  },
  {
    code: "ELP",
    name: "El Paso",
  },
  {
    code: "EVV",
    name: "Evansville",
  },
  {
    code: "FWA",
    name: "Fort Wayne",
  },
  {
    code: "GRR",
    name: "Grand Rapids",
  },
  {
    code: "GSO",
    name: "Greensboro/High Point",
  },
  {
    code: "GSP",
    name: "Greenville/Spartanburg",
  },
  {
    code: "HSV",
    name: "Huntsville",
  },
  {
    code: "JAX",
    name: "Jacksonville",
  },
  {
    code: "LFT",
    name: "Lafayette",
  },
  {
    code: "LIT",
    name: "Little Rock",
  },
  {
    code: "LRD",
    name: "Laredo",
  },
  {
    code: "MBS",
    name: "Saginaw/Midland/Bay C.",
  },
  {
    code: "MDT",
    name: "Harrisburg",
  },
  {
    code: "MEM",
    name: "Memphis",
  },
  {
    code: "MFE",
    name: "McAllen/Mission",
  },
  {
    code: "MGM",
    name: "Montgomery",
  },
  {
    code: "MKE",
    name: "Milwaukee",
  },
  {
    code: "MLI",
    name: "Moline",
  },
  {
    code: "MOB",
    name: "Mobile",
  },
  {
    code: "OKC",
    name: "Oklahoma City",
  },
  {
    code: "PDX",
    name: "Portland",
  },
  {
    code: "RDU",
    name: "Raleigh/Durham",
  },
  {
    code: "ROC",
    name: "Rochester",
  },
  {
    code: "SAN",
    name: "San Diego",
  },
  {
    code: "SBN",
    name: "South Bend",
  },
  {
    code: "SHV",
    name: "Shreveport",
  },
  {
    code: "SLC",
    name: "Salt Lake City",
  },
  {
    code: "SMF",
    name: "Sacramento",
  },
  {
    code: "SWF",
    name: "New York",
  },
  {
    code: "TOL",
    name: "Toledo",
  },
  {
    code: "TUL",
    name: "Tulsa",
  },
  {
    code: "TUS",
    name: "Tucson",
  },
  {
    code: "TVC",
    name: "Traverse City",
  },
  {
    code: "YUL",
    name: "Montreal",
  },
  {
    code: "YYZ",
    name: "Toronto",
  },
  {
    code: "PWM",
    name: "Portland",
  },
  {
    code: "MHT",
    name: "Manchester",
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

    const city = statusDetails
      ? type === "arrival"
        ? statusDetails.departure.airport.iata
        : statusDetails?.arrival.airport.iata
      : null;

    const cityName = locations.find((location) => location.code === city)?.name;

    return {
      airlineName: airline ? airline.name : null,
      flightNumber: flight.flightNumber || null,
      city: cityName,
      timeliness: timeliness,
      aircraftRegistrationNumber:
        statusDetails.equipment.aircraftRegistrationNumber,
      aircraftType: statusDetails.equipment.actualAircraftType.icao,
      gate: statusObj.gate,
      status: statusObj,
      type,
    };
  };

  const combinedFlights = [
    ...arrivals.map((flight) => mapData(flight, "arrival")),
    ...departures.map((flight) => mapData(flight, "departure")),
  ];

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

  // airline chart
  const airlineFlightTypeStackedHorizontalBar = Plot.plot({
    marginLeft: 90,
    x: { label: "Flights" },
    y: { label: null },
    fx: { label: null },
    // color: { legend: true },
    marks: [
      Plot.barX(
        combinedFlights,
        Plot.groupY(
          { x: "count" },
          {
            // fx: "type",
            fill: "type",
            y: "airlineName",
            sort: { y: "x", reverse: true },
            tip: true,
          }
        )
      ),
    ],
  });

  document
    .getElementById("airlinesByFlightType")
    .appendChild(airlineFlightTypeStackedHorizontalBar);

  const airlineFlightTypeAndTimelinessStackedHorizontalBar = Plot.plot({
    marginLeft: 90,
    x: { label: "Flights" },
    color: {
      scheme: "category10",
      // legend: true,
      domain: ["OnTime", "Delayed", "Early"],
    },
    y: { label: null },
    // fx: { label: null },
    marks: [
      Plot.barX(
        combinedFlights,
        Plot.groupY(
          { x: "count" },
          {
            // fx: "type",
            fill: "timeliness",
            y: "airlineName",
            sort: { y: "x", reverse: true },
            tip: true,
          }
        )
      ),
    ],
  });

  document
    .getElementById("airlinesByFlightTypeAndTimeliness")
    .appendChild(airlineFlightTypeAndTimelinessStackedHorizontalBar);

  const flightsTimelinessStackedHorizontalBar = Plot.barY(
    combinedFlights,

    Plot.groupX(
      { y: "count" },
      {
        x: "gate",
        // fy: "gate",
        fill: "timeliness",
        sort: { x: "y", reverse: true },
        tip: true,
      }
    )
  ).plot({
    color: { domain: ["OnTime", "Delayed", "Early"], scheme: "category10" },
    y: { label: "Flights" },
  });

  document
    .getElementById("flightsTimeliness")
    .appendChild(flightsTimelinessStackedHorizontalBar);
    

  // display(combinedFlights);
  // display(arrivals);
}

fetchFlightData();
```

<div class="grid grid-cols-4" style="grid-auto-rows: auto;">
  <div class="card grid-colspan-2">
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

  <div class="card grid-colspan-2" style="display: flex; flex-direction: column; gap: 1rem;">
  <span id="airlinesByFlightType"></span>
  </div>

  <div class="card grid-colspan-2" style="display: flex; flex-direction: column; gap: 1rem;">
  <span id="airlinesByFlightTypeAndTimeliness"></span>
  </div>

  <div class="card grid-colspan-2" style="display: flex; flex-direction: row; gap: 1rem;">
  <span id="flightsTimeliness"></span>
  </div>
  
</div>
