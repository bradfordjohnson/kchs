---
style: custom-style.css
---

<!-- markdownlint-disable -->

# Gate Map

```js
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
//   display(arrivals);

  const departureData = await getData(
    "https://ccaafids.azurewebsites.net/api/FIDsTest?code=VnSepGuKSiEXD0zW_eOg73NkKKgyT_jDIZOm8pvuCbs8AzFuNZG1RA==&dir=departure"
  );

  if (!departureData) {
    console.error("No departure data available");
    return;
  }

  const departures = filterFlights(departureData, "departure", airlines);
//   display(departures);

/* */
  const groupFlightsByGate = (departures, arrivals) => {
    const registrationToGate = {};

    [...departures, ...arrivals].forEach((flight) => {
      flight.statusDetails.forEach((status) => {
        const regNumber = status.equipment?.aircraftRegistrationNumber;
        const departureGate =
          status.departure?.airport?.iata === "CHS"
            ? status.departure.gate
            : null;
        const arrivalGate =
          status.arrival?.airport?.iata === "CHS" ? status.arrival.gate : null;

        if (regNumber) {
          registrationToGate[regNumber] =
            departureGate || arrivalGate || registrationToGate[regNumber];
        }
      });
    });

    return [...departures, ...arrivals].reduce((acc, flight) => {
      flight.statusDetails.forEach((status) => {
        const regNumber = status.equipment?.aircraftRegistrationNumber;
        const gate = registrationToGate[regNumber] || "null";

        if (!acc[gate]) acc[gate] = [];
        acc[gate].push(flight);
      });

      return acc;
    }, {});
  };

  const flightsByGate = groupFlightsByGate(departures, arrivals);
  display(flightsByGate);
/* */
const groupFlightsByGateAndRegistration = (departures, arrivals) => {
  // Step 1: Create a lookup for registration numbers → gate
  const registrationToGate = {};

  [...departures, ...arrivals].forEach(flight => {
    flight.statusDetails.forEach(status => {
      const regNumber = status.equipment?.aircraftRegistrationNumber;
      const departureGate = status.departure?.airport?.iata === "CHS" ? status.departure.gate : null;
      const arrivalGate = status.arrival?.airport?.iata === "CHS" ? status.arrival.gate : null;

      if (regNumber) {
        registrationToGate[regNumber] = departureGate || arrivalGate || registrationToGate[regNumber];
      }
    });
  });

  // Step 2: Group flights by their resolved gate (or 'null' if no gate found)
  return [...departures, ...arrivals].reduce((acc, flight) => {
    flight.statusDetails.forEach(status => {
      const regNumber = status.equipment?.aircraftRegistrationNumber;
      const gate = registrationToGate[regNumber] || "null"; // Default to 'null' gate

      // Initialize the registration number group if not already created
      if (!acc[gate]) acc[gate] = {};

      // Initialize the registration number entry if not already created
      if (!acc[gate][regNumber]) acc[gate][regNumber] = [];

      // Get the actualTime from departure OR arrival, defaulting to estimatedTime if not available
      const actualTimeDeparture = status.departure?.actualTime || status.departure?.estimatedTime;
      const actualTimeArrival = status.arrival?.actualTime || status.arrival?.estimatedTime;

      // Add the actualTime or estimatedTime for both departure and arrival with the `isActualTime` flag
      if (actualTimeDeparture) {
        acc[gate][regNumber].push({
          time: actualTimeDeparture,
          isActualTime: !!status.departure?.actualTime // true if actualTime is used, false if using estimatedTime
        });
      }
      
      if (actualTimeArrival) {
        acc[gate][regNumber].push({
          time: actualTimeArrival,
          isActualTime: !!status.arrival?.actualTime // true if actualTime is used, false if using estimatedTime
        });
      }
    });

    return acc;
  }, {});
};

// Example usage
const flightsByGateAndRegistration = groupFlightsByGateAndRegistration(departures, arrivals);


display(flightsByGateAndRegistration);
/* */


}

fetchFlightData();
```

```js
import {chsGatePlanes} from "./config.js";
import * as L from "npm:leaflet";

const div = display(document.createElement("div"));
div.style = "height: 450px;";



const map = L.map(div,  { zoomControl: true, scrollWheelZoom: false, dragging: true })
  .setView([32.885636, -80.036886], 18);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})
  .addTo(map);

// Object.entries(chsGates).forEach(([gate, coords]) => {
//   L.circle(coords, {
//     radius:  4,
//     color: "green"
//   })
//   .addTo(map)
//   .bindPopup(`<b>Gate: ${gate}</b>`);
// });

// var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
// svgElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="294.728 -842.512 1642 1515">
// 	<path d="m1908.1019-252.4527q-67.6116-54.7508-277.1752-32.7248l-337.552 35.4781-489.7581-580.6049-4.0336-4.5531q-10.88-8.8105-23.5382-7.48L686.031-832.8766q-12.6582 1.3304-21.4687 12.2105-13.2157 16.3201-4.2618 33.8651L934.7258-212.0038 590.1416-175.7867Q447.9746-378.4109 437.0945-387.2213 426.2146-396.0319 413.5563-394.7013L323.5426-385.2405Q310.8843-383.9101 302.0738-373.0301 290.746-359.0415 296.8871-341.2008L416.9433-44.5335 361.1913 270.612q-3.7041 18.8754 11.0617 30.8324 10.88 8.8105 23.5382 7.48l90.791-8.8315q12.6582-1.3304 21.4687-12.2105 8.8105-10.88 105.7428-238.6345L958.3778 13.0307 809.4566 632.3235q-5.1106 19.0232 11.2095 32.239 10.88 8.8105 23.5382 7.48l90.0139-9.4608q12.6582-1.3304 21.4687-12.2105 2.5174-3.1085 2.9988-5.2923l358.3411-669.7437 337.552-35.4781q209.5635-22.0259 264.3143-89.6377 20.1382-24.8686 17.1077-53.7012-3.0304-28.8326-27.8992-48.9709z" fill="#000000"/>
// </svg>`;
// var svgElementBounds = [ [ 32.885238,-80.03826], [32.884713,-80.038016 ] ];
// L.svgOverlay(svgElement, svgElementBounds).addTo(map);

const early = ["A1", "B2"];
const late = ["B9", "B10"];
const hidden = ["A2A"];
Object.entries(chsGatePlanes).forEach(([key, { svg, bounds }]) => {
  var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgElement.innerHTML = svg;
  svgElement.classList.add(`plane-${key}`);

  // If the key is in the 'early' list, change fill to green
  if (early.includes(key)) {
    svgElement.querySelectorAll("path").forEach(path => {
      path.setAttribute("fill", "#50C878");
    });
  }

  if (late.includes(key)) {
    svgElement.querySelectorAll("path").forEach(path => {
      path.setAttribute("fill", "#880808");
    });
  }

  if (hidden.includes(key)) {
    svgElement.style.display = "none"; // Completely hides the SVG
  }

  L.svgOverlay(svgElement, bounds).addTo(map);
});


```
