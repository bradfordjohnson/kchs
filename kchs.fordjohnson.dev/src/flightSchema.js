export function mapDepartureData(flight) {
    return {
    //   airport: {
    //     iata: flight.departure.airport.iata,
    //     icao: flight.departure.airport.icao
    //   },
    //   date: flight.departure.date,
    //   localTime: flight.departure.passengerLocalTime,
    carrierCode: flight.carrierCode
    };
  }