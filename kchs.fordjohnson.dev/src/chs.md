# CHS Code

```js
import { airlines, airports } from "./helpers.js";
import { API_CONFIG, mapData } from "./config.js";

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
```

raw:

```js
display(arrivalData);
```

---

```js
function cleanFlightData(rawData, flightType) {
  function convertTo12Hour(time) {
    if (!time) return "";
    const match = time.match(/^([01]?\d|2[0-3]):?([0-5]\d)$/);
    if (!match) return time;
    let [, hours, minutes] = match;
    const suffix = hours >= 12 ? " PM" : " AM";
    hours = hours % 12 || 12; // Convert 0 to 12
    return `${hours}:${minutes}${suffix}`;
  }

  return rawData
    .filter((flight) => {
      // Filter by airline and service type
      const airline = flight.carrierCode?.iata;
      const serviceType = flight.serviceTypeCode?.iata;
      if (!airline || !flight.statusDetails?.[0]) return false;

      // Exclude specific flights
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

      // Exclude certain codeshare flights
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
    })
    .map((flight) => {
      let cleanedFlight = {
        flightType: flightType,
        flightNumber: flight.flightNumber,
        oagFingerprint: flight.oagFingerprint,
        airline:
          airlines.find((a) => a.code === flight.carrierCode.iata)?.name ||
          flight.carrierCode.iata,
        flightDisplay: `${flight.carrierCode.iata}-${flight.flightNumber}`,
        city:
          airports.find(
            (a) =>
              a.code ===
              (flightType === "arrival"
                ? flight.departure.airport.iata
                : flight.arrival.airport.iata)
          )?.name ||
          (flightType === "arrival"
            ? flight.departure.airport.iata
            : flight.arrival.airport.iata),
        scheduledTime: convertTo12Hour(
          flightType === "arrival"
            ? flight.arrival.passengerLocalTime
            : flight.departure.passengerLocalTime
        ),
        estimatedTime: flight.statusDetails[0]?.[flightType]?.estimatedTime
          ?.onGround
          ? new Date(
              flight.statusDetails[0][flightType].estimatedTime.onGround.utc
            )
              .toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })
              .replace(/^0+/, "")
          : "",
        status: flight.statusDetails[0]?.state?.includes("Cancel")
          ? "Cancelled"
          : flight.statusDetails[0]?.[flightType]?.estimatedTime
              ?.inGateTimeliness || "",
        gate: flight.statusDetails[0]?.[flightType]?.gate || "",
        claim: flight.statusDetails[0]?.[flightType]?.claim || "",
        baggage: flight.statusDetails[0]?.[flightType]?.baggage || "",
        date: flight.arrival?.date || flight.departure?.date,
      };
      return cleanedFlight;
    })
    .sort((a, b) => {
      const timeA = Date.parse(
        `1970/01/01 ${a.scheduledTime.slice(0, -2)} ${a.scheduledTime.slice(
          -2
        )}`
      );
      const timeB = Date.parse(
        `1970/01/01 ${b.scheduledTime.slice(0, -2)} ${b.scheduledTime.slice(
          -2
        )}`
      );
      return timeA - timeB;
    });
}

fetch(
  "https://ccaafids.azurewebsites.net/api/FIDsTest?code=VnSepGuKSiEXD0zW_eOg73NkKKgyT_jDIZOm8pvuCbs8AzFuNZG1RA==&dir=arrival"
)
  .then((response) => response.json())
  .then((data) => {
    const cleanedArrivals = cleanFlightData(data.data, "arrival");
    display(cleanedArrivals);
  });

fetch(
  "https://ccaafids.azurewebsites.net/api/FIDsTest?code=VnSepGuKSiEXD0zW_eOg73NkKKgyT_jDIZOm8pvuCbs8AzFuNZG1RA==&dir=departure"
)
  .then((response) => response.json())
  .then((data) => {
    const cleanedDepartures = cleanFlightData(data.data, "departure");
    display(cleanedDepartures);
  });
```
