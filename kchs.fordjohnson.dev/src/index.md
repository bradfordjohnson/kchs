<!-- markdownlint-disable -->

# Charleston International Airport

```js
import * as Plot from "npm:@observablehq/plot";

const airlines = [
    {
      code: "AA",
      icao: "AAL",
      name: "American Airlines",
    },
    {
      code: "AS",
      icao: "ASA",
      name: "Alaska",
    },
    {
      code: "G4",
      icao: "AAY",
      name: "Allegiant",
    },
    {
      code: "XP",
      icao: "VXP",
      name: "Avelo",
    },
    {
      code: "MX",
      icao: "MXY",
      name: "Breeze Airways",
    },
    {
      code: "DL",
      icao: "DAL",
      name: "Delta",
    },
    {
      code: "F9",
      icao: "FFT",
      name: "Frontier",
    },
    {
      code: "B6",
      icao: "JBU",
      name: "JetBlue",
    },
    {
      code: "3M",
      icao: "SIL",
      name: "Silver",
    },
    {
      code: "WN",
      icao: "SWA",
      name: "Southwest",
    },
    {
      code: "SY",
      icao: "SCX",
      name: "Sun Country",
    },
    {
      code: "UA",
      icao: "UAL",
      name: "United Airlines",
    },
    {
      code: "NK",
      icao: "NKS",
      name: "Spirit",
    },
    {
      code: "AC",
      icao: "ACA",
      name: "Air Canada",
    },
];
  
  const locations = [
    { 
        code: "CHS", 
        icao: "KCHS", 
        name: "Charleston"
    },
    {
      code: "ATL",
      icao: "KATL",
       name: "Atlanta"
    },
    {
      code: "SEA",
      icao: "KSEA",
       name: "Seattle"
    },
    {
      code: "CVG",
      icao: "KCVG",
       name: "Cincinnati"
    },
    {
      code: "LCK",
      icao: "KLCK",
       name: "Columbus"
    },
    {
      code: "IND",
      icao: "KIND",
       name: "Indianapolis"
    },
    {
      code: "SDF",
      icao: "KSDF",
       name: "Louisville"
    },
    {
      code: "PIT",
      icao: "KPIT",
       name: "Pittsburgh"
    },
    {
      code: "BLV",
      icao: "KBLV",
       name: "St. Louis"
    },
    {
      code: "CLT",
      icao: "KCLT",
       name: "Charlotte"
    },
    {
      code: "ORD",
      icao: "KORD",
       name: "Chicago"
    },
    {
      code: "DFW",
      icao: "KDFW",
       name: "Dallas/Forth Worth"
    },
    {
      code: "PHL",
      icao: "KPHL",
       name: "Philadelphia"
    },
    {
      code: "MIA",
      icao: "KMIA",
       name: "Miami"
    },
    {
      code: "DCA",
      icao: "KDCA",
       name: "Washington, D.C."
    },
    {
      code: "HVN",
      icao: "KHVN",
       name: "New Haven"
    },
    {
      code: "CAK",
      icao: "KCAK",
       name: "Akron/Canton"
    },
    {
      code: "CMH",
      icao: "KCMH",
       name: "Columbus"
    },
    {
      code: "RSW",
      icao: "KRSW",
       name: "Fort Myers"
    },
    {
      code: "BDL",
      icao: "KBDL",
       name: "Hartford"
    },
    {
      code: "ISP",
      icao: "KISP",
       name: "Islip"
    },
    {
      code: "LAS",
      icao: "KLAS",
       name: "Las Vegas"
    },
    {
      code: "SDF",
      icao: "KSDF",
       name: "Louisville"
    },
    {
      code: "MSY",
      icao: "KMSY",
       name: "New Orleans"
    },
    {
      code: "ORF",
      icao: "KORF",
       name: "Norfolk"
    },
    {
      code: "MCO",
      icao: "KMCO",
       name: "Orlando"
    },
    {
      code: "PFD",
      icao: "KPFD",
       name: "Providence"
    },
    {
      code: "RIC",
      icao: "KRIC",
       name: "Richmond"
    },
    {
      code: "SFO",
      icao: "KSFO",
       name: "San Francisco"
    },
    {
      code: "SYR",
      icao: "KSYR",
       name: "Syracuse"
    },
    {
      code: "TPA",
      icao: "KTPA",
       name: "Tampa"
    },
    {
      code: "HPN",
      icao: "KHPN",
       name: "Westchester, NY"
    },
    {
      code: "PBI",
      icao: "KPBI",
       name: "West Palm Beach"
    },
    {
      code: "BOS",
      icao: "KBOS",
       name: "Boston"
    },
    {
      code: "DTW",
      icao: "KDTW",
       name: "Detroit"
    },
    {
      code: "LGA",
      icao: "KLGA",
       name: "New York City"
    },
    {
      code: "JFK",
      icao: "KJFK",
       name: "New York City"
    },
    {
      code: "MSP",
      icao: "KMSP",
       name: "Minneapolis"
    },
    {
      code: "DEN",
      icao: "KDEN",
       name: "Denver"
    },
    {
      code: "FLL",
      icao: "KFLL",
       name: "Fort Lauderdale"
    },
    {
      code: "LAX",
      icao: "KLAX",
       name: "Los Angeles"
    },
    {
      code: "AUS",
      icao: "KAUS",
       name: "Austin"
    },
    {
      code: "BWI",
      icao: "KBWI",
       name: "Baltimore"
    },
    {
      code: "MDW",
      icao: "KMDW",
       name: "Chicago"
    },
    {
      code: "DAL",
      icao: "KDAL",
       name: "Dallas"
    },
    {
      code: "HOU",
      icao: "KHOU",
       name: "Houston"
    },
    {
      code: "MCI",
      icao: "KMCI",
       name: "Kansas City"
    },
    {
      code: "BNA",
      icao: "KBNA",
       name: "Nashville"
    },
    {
      code: "STL",
      icao: "KSTL",
       name: "St. Louis"
    },
    {
      code: "IAH",
      icao: "KIAH",
       name: "Houston"
    },
    {
      code: "EWR",
      icao: "KEWR",
       name: "Newark"
    },
    {
      code: "IAD",
      icao: "KIAD",
       name: "Washington, D.C."
    },
    {
      code: "PNS",
      icao: "KPNS",
       name: "Pensacola"
    },
    {
      code: "SAT",
      icao: "KSAT",
       name: "San Antonio"
    },
    {
      code: "COS",
      icao: "KCOS",
       name: "Colorado Springs"
    },
    {
      code: "PHX",
      icao: "KPHX",
       name: "Phoenix"
    },
    {
      code: "PVD",
      icao: "KPVD",
       name: "Providence"
    },
    {
      code: "PVU",
      icao: "KPVU",
       name: "Provo"
    },
    {
      code: "TYS",
      icao: "KTYS",
       name: "Jacksonville"
    },
    {
      code: "ABE",
      icao: "KABE",
       name: "Allentown"
    },
    {
      code: "OMA",
      icao: "KOMA",
       name: "Omaha"
    },
    {
      code: "TRI",
      icao: "KTRI",
       name: "Bristol/Johnson/Kingsp"
    },
    {
      code: "ABQ",
      icao: "KABQ",
       name: "Albuquerque"
    },
    {
      code: "ALB",
      icao: "KALB",
       name: "Albany"
    },
    {
      code: "BHM",
      icao: "KBHM",
       name: "Birmingham"
    },
    {
      code: "BRL",
      icao: "KBRL",
       name: "Burlington"
    },
    {
      code: "BTR",
      icao: "KBTR",
       name: "Baton Rouge"
    },
    {
      code: "BUF",
      icao: "KBUF",
       name: "Buffalo"
    },
    {
      code: "CAE",
      icao: "KCAE",
       name: "Columbia"
    },
    {
      code: "CID",
      icao: "KCID",
       name: "Cedar Rapids"
    },
    {
      code: "CLE",
      icao: "KCLE",
       name: "Cleveland"
    },
    {
      code: "CRP",
      icao: "KCRP",
       name: "Corpus Christi"
    },
    {
      code: "DAY",
      icao: "KDAY",
       name: "Dayton"
    },
    {
      code: "DSM",
      icao: "KDSM",
       name: "Des Moines"
    },
    {
      code: "ELP",
      icao: "KELP",
       name: "El Paso"
    },
    {
      code: "EVV",
      icao: "KEVV",
       name: "Evansville"
    },
    {
      code: "FWA",
      icao: "KFWA",
       name: "Fort Wayne"
    },
    {
      code: "GRR",
      icao: "KGRR",
       name: "Grand Rapids"
    },
    {
      code: "GSO",
      icao: "KGSO",
       name: "Greensboro/High Point"
    },
    {
      code: "GSP",
      icao: "KGSP",
       name: "Greenville/Spartanburg"
    },
    {
      code: "HSV",
      icao: "KHSV",
       name: "Huntsville"
    },
    {
      code: "JAX",
      icao: "KJAX",
       name: "Jacksonville"
    },
    {
      code: "LFT",
      icao: "KLFT",
       name: "Lafayette"
    },
    {
      code: "LIT",
      icao: "KLIT",
       name: "Little Rock"
    },
    {
      code: "LRD",
      icao: "KLRD",
       name: "Laredo"
    },
    {
      code: "MBS",
      icao: "KMBS",
       name: "Saginaw/Midland/Bay C."
    },
    {
      code: "MDT",
      icao: "KMDT",
       name: "Harrisburg"
    },
    {
      code: "MEM",
      icao: "KMEM",
       name: "Memphis"
    },
    {
      code: "MFE",
      icao: "KMFE",
       name: "McAllen/Mission"
    },
    {
      code: "MGM",
      icao: "KMGM",
       name: "Montgomery"
    },
    {
      code: "MKE",
      icao: "KMKE",
       name: "Milwaukee"
    },
    {
      code: "MLI",
      icao: "KMLI",
       name: "Moline"
    },
    {
      code: "MOB",
      icao: "KMOB",
       name: "Mobile"
    },
    {
      code: "OKC",
      icao: "KOKC",
       name: "Oklahoma City"
    },
    {
      code: "PDX",
      icao: "KPDX",
       name: "Portland"
    },
    {
      code: "RDU",
      icao: "KRDU",
       name: "Raleigh/Durham"
    },
    {
      code: "ROC",
      icao: "KROC",
       name: "Rochester"
    },
    {
      code: "SAN",
      icao: "KSAN",
      name: "San Diego",
    },
    {
      code: "SBN",
      icao: "KSBN",
      name: "South Bend",
    },
    {
      code: "SHV",
      icao: "KSHV",
      name: "Shreveport",
    },
    {
      code: "SLC",
      icao: "KSLC",
      name: "Salt Lake City",
    },
    {
      code: "SMF",
      icao: "KSMF",
      name: "Sacramento",
    },
    {
      code: "SWF",
      icao: "KSWF",
      name: "New York",
    },
    {
      code: "TOL",
      icao: "KTOL",
      name: "Toledo",
    },
    {
      code: "TUL",
      icao: "KTUL",
      name: "Tulsa",
    },
    {
      code: "TUS",
      icao: "KTUS",
      name: "Tucson",
    },
    {
      code: "TVC",
      icao: "KTVC",
      name: "Traverse City",
    },
    {
      code: "YUL",
      icao: "CYUL",
      name: "Montreal",
    },
    {
      code: "YYZ",
      icao: "CYYZ",
      name: "Toronto",
    },
    {
      code: "PWM",
      icao: "KPWM",
      name: "Portland",
    },
    {
      code: "MHT",
      icao: "KMHT",
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

  const airlineFlightTypeStackedBar = Plot.plot({
    marginBottom: 60,
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

  const airlineFlightTypeAndTimelinessStackedBar = Plot.plot({
    marginBottom: 60,
    x: { label: null, tickRotate: -30 },
    y: { label: "Flights" },
    fx: { label: null },
    color: { domain: ["OnTime", "Delayed", "Early"], scheme: "category10" },
    marks: [
      Plot.barY(
        combinedFlights,
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
    .getElementById("airlinesByFlightTypeAndTimeliness")
    .appendChild(airlineFlightTypeAndTimelinessStackedBar);

  const flightsTimelinessStackedBar = Plot.barY(
    combinedFlights,

    Plot.groupX(
      { y: "count" },
      {
        x: "gate",
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
    .appendChild(flightsTimelinessStackedBar);

  // display(arrivals);

  // display(combinedFlights);
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


  <div class="card grid-colspan-2" style="display: flex; flex-direction: column; gap: 1rem;">
  <span id="airlinesByFlightType"></span>
  </div>

  <div class="card grid-colspan-2" style="display: flex; flex-direction: column; gap: 1rem;">
  <span id="historicFlightsTrendLine"></span>
  </div>

  <div class="card grid-colspan-2" style="display: flex; flex-direction: column; gap: 1rem;">
  <span id="airlinesByFlightTypeAndTimeliness"></span>
  </div>

  <div class="card grid-colspan-2" style="display: flex; flex-direction: row; gap: 1rem;">
  <span id="flightsTimeliness"></span>
  </div>

  <div class="card grid-colspan-2" style="display: flex; flex-direction: row; gap: 1rem;">
  <span id="historicFlightsTrendLineByAirline"></span>
  </div>
  
</div>

```js
import { carrierCodes } from "./config.js";

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
  y: {zero: true},
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

const historicAggregatedFlightsByAirline = Array.from(
  d3.rollup(
    mappedHistoricFlights,
    flights => flights.length,
    flight => flight.flightDate,
    flight => flight.airlineName
  ),
  ([flightDate, typeMap]) => {
    return Array.from(typeMap, ([airlineName, count]) => ({
      date: parseDate(flightDate),
      airlineName,
      count
    }));
  }
).flat();

const historicFlightsTrendLineByAirline = Plot.plot({
  y: {zero: true},
  marginRight: 100,
  fy: {label: null},
  marks: [
    Plot.ruleY([0]),
    Plot.areaY(historicAggregatedFlightsByAirline, {x: "date", y: "count", fy: "airlineName", tip: "x"}),
    Plot.frame()
  ]
});

  document
    .getElementById("historicFlightsTrendLineByAirline")
    .appendChild(historicFlightsTrendLineByAirline);


// display(historicAggregatedFlightsByAirline);

// display(mappedHistoricFlights)

// display(historicFlightsTrendLineByAirline)

```
