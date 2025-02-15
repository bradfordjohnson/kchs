export const API_CONFIG = {
    departureUrl: "https://ccaafids.azurewebsites.net/api/FIDsTest?code=VnSepGuKSiEXD0zW_eOg73NkKKgyT_jDIZOm8pvuCbs8AzFuNZG1RA==&dir=departure",
    arrivalUrl: "https://ccaafids.azurewebsites.net/api/FIDsTest?code=VnSepGuKSiEXD0zW_eOg73NkKKgyT_jDIZOm8pvuCbs8AzFuNZG1RA==&dir=arrival"
  };

export const carrierCodes = ['AAL', 'MXY', 'DAL', 'JBU', 'SWA', 'NKS', 'UAL'];

export const todaysDate = new Date().toISOString().slice(0, 10);

export function mapData(flight) {
  return {
    arrivalDate: flight.arrival.date,
    arrivalTime: flight.arrival.passengerLocalTime,
    departureDate: flight.departure.date,
    departureTime: flight.departure.passengerLocalTime,
    
    carrierCode: flight.carrierCode.icao,
    aircraftRegistrationNumber: flight.statusDetails?.[0]?.equipment.aircraftRegistrationNumber,
    aircraftType: flight.statusDetails?.[0]?.equipment.actualAircraftType.icao,
    flightNumber: flight.flightNumber,
    flightStatus: flight.statusDetails?.[0]?.state,

    arrivalIcao: flight.statusDetails?.[0]?.arrival.airport.icao,
    arrivalGate: flight.statusDetails?.[0]?.arrival.gate,
    departrueIcao: flight.statusDetails?.[0]?.departure.airport.icao,
    departrueGate: flight.statusDetails?.[0]?.departure.gate,
    
    estimatedArrival: flight.statusDetails?.[0]?.arrival.estimatedTime,
    arrivalInGateTimeliness: flight.statusDetails?.[0]?.arrival.estimatedTime.inGateTimeliness,
    arrivalInGateVariation: flight.statusDetails?.[0]?.arrival.estimatedTime.inGateVariation,
    actualArrival: flight.statusDetails?.[0]?.arrival.actualTime,
    estimatedDeparture: flight.statusDetails?.[0]?.departure.estimatedTime,
    departureOutGateTimeliness: flight.statusDetails?.[0]?.departure.estimatedTime.outGateTimeliness,
    departureOutGateVariation: flight.statusDetails?.[0]?.departure.estimatedTime.outGateVariation,
    actualDeparture: flight.statusDetails?.[0]?.departure.actualTime,
  };
}
