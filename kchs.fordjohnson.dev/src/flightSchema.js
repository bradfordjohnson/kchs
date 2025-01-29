export function mapDepartureData(flight) {
    return {
        carrierCodes: flight.carrierCode,
        flightNumber: flight.flightNumber,
        flightType: flight.flightType,
        departure: flight.departure,
        aircraftType: flight.aircraftType,
        serviceTypeCode: flight.serviceTypeCode,
        statusDetails: flight.statusDetails
    };
}

export function mapArrivalData(flight) {
    return {
        carrierCodes: flight.carrierCode,
        flightNumber: flight.flightNumber,
        flightType: flight.flightType,
        departure: flight.departure,
        aircraftType: flight.aircraftType,
        serviceTypeCode: flight.serviceTypeCode,
        statusDetails: flight.statusDetails
    };
}