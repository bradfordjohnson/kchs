<!-- ---
style: custom-style.css
--- -->

# Raw Flights

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
  display(arrivals);

  const departureData = await getData(
    "https://ccaafids.azurewebsites.net/api/FIDsTest?code=VnSepGuKSiEXD0zW_eOg73NkKKgyT_jDIZOm8pvuCbs8AzFuNZG1RA==&dir=departure"
  );

  if (!departureData) {
    console.error("No departure data available");
    return;
  }

  const departures = filterFlights(departureData, "departure", airlines);
  display(departures);

/* */
  const groupFlightsByRegistration = (departures, arrivals) => {
    const allFlights = [...departures, ...arrivals];

    return allFlights.reduce((acc, flight) => {
      flight.statusDetails.forEach((status) => {
        const regNumber = status.equipment?.aircraftRegistrationNumber;
        if (regNumber) {
          if (!acc[regNumber]) {
            acc[regNumber] = [];
          }
          acc[regNumber].push(flight);
        }
      });
      return acc;
    }, {});
  };

  const flightsByRegistration = groupFlightsByRegistration(
    departures,
    arrivals
  );
  display(flightsByRegistration);

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
