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
    arrivalGate: flight.statusDetails?.[0]?.arrival.gate ?? '',
    departrueIcao: flight.statusDetails?.[0]?.departure.airport.icao,
    departrueGate: flight.statusDetails?.[0]?.departure.gate ?? '',
    
    estimatedArrival: flight.statusDetails?.[0]?.arrival.estimatedTime,
    arrivalInGateTimeliness: flight.statusDetails?.[0]?.arrival?.estimatedTime?.inGateTimeliness ?? null,
    arrivalInGateVariation: flight.statusDetails?.[0]?.arrival?.estimatedTime?.inGateVariation ?? null,
    actualArrival: flight.statusDetails?.[0]?.arrival.actualTime,
    estimatedDeparture: flight.statusDetails?.[0]?.departure.estimatedTime,
    departureOutGateTimeliness: flight.statusDetails?.[0]?.departure?.estimatedTime?.outGateTimeliness ?? null,
    departureOutGateVariation: flight.statusDetails?.[0]?.departure?.estimatedTime?.outGateVariation ?? null,
    actualDeparture: flight.statusDetails?.[0]?.departure.actualTime,
  };
}

export const airlineLogos = {
  "AAL": "https://cdn0.scrvt.com/9fbbd4f2786c6956c2e6ddc476051b3a/9db257a46c64f6dd/a16503bb3782/v/280a9bdb1f36/AirlineLogo_AA-V1.png",
  "DAL": "https://cdn0.scrvt.com/9fbbd4f2786c6956c2e6ddc476051b3a/89c8e830774aaae3/8761bb11e718/v/64aba68e3303/Delta-V1.png",
  "UAL": "https://cdn0.scrvt.com/9fbbd4f2786c6956c2e6ddc476051b3a/cea5f593bd55e4fd/ca3dd4bdc574/v/652a4c936410/United-V1.png",
  "MXY": "https://cdn0.scrvt.com/9fbbd4f2786c6956c2e6ddc476051b3a/6c6882e3ea90d906/9d9e8f0f049e/v/521722b2e2e7/breeze-light-transparent-01f3bf80eb3c9cc8fbefcbb229f1125e49854e46706a25c28f0dfd3b29a93e73.png",
  "ASA": "https://cdn0.scrvt.com/9fbbd4f2786c6956c2e6ddc476051b3a/27eed57edd34d58c/bf277f264e8a/v/75d1d7130846/Alaska-V1.png",
  "SWA": "https://cdn0.scrvt.com/9fbbd4f2786c6956c2e6ddc476051b3a/0a048ded0d2e0498/4dc185b2177e/v/ec65fa320d7e/Southwest-V1.png",
  "ACA": "https://cdn0.scrvt.com/9fbbd4f2786c6956c2e6ddc476051b3a/e8fc91367c78da42/3f4d10c59e8b/v/1d17a6957dd6/Air-Canada-Logo.png",
  "AAY": "https://cdn0.scrvt.com/9fbbd4f2786c6956c2e6ddc476051b3a/3ca80735d5e76a62/90dbef0c2116/v/d4e5319bf583/Allegiant-V1.png",
  "VXP": "https://cdn0.scrvt.com/9fbbd4f2786c6956c2e6ddc476051b3a/144cf6c8ead84482/50e285f8f066/v/ccc874911957/Avelo_Logo-1.png",
  "FFT": "https://cdn0.scrvt.com/9fbbd4f2786c6956c2e6ddc476051b3a/4b61e76b4201d0fc/e41d86be2b5f/v/3a38db9396b4/Frontier-V1.png",
  "NKS": "https://cdn0.scrvt.com/9fbbd4f2786c6956c2e6ddc476051b3a/ee0ca3ee681fcbe6/96b1b2d6436e/v/d74833a0f2bc/1200px-Spirit_Airlines_logo.svg.png",
  "JBU": "https://cdn0.scrvt.com/9fbbd4f2786c6956c2e6ddc476051b3a/b7cd5d7d4b35637d/ff48ff63d1ad/v/2fc783f1606c/JetBlue-V1.png"
};

export const locations = {
  "KIAD": "Washington, D.C.",
  "KDCA": "Washington, D.C.",
  "KEWR": "Newark",
  "KIAH": "Houston",
  "KDEN": "Denver",
  "KORD": "Chicago",
  "KMDW": "Chicago",
  "KFLL": "Fort Lauderdale",
  "KBWI": "Baltimore",
  "KDAL": "Dallas",
  "KHOU": "Houston",
  "KBNA": "Nashville",
  "KSTL": "St. Louis",
  "KHPN": "White Plains, NY",
  "KJFK": "New York City",
  "KLGA": "New York City",
  "KBOS": "Boston",
  "KPHL": "Philadelphia",
  "KMSP": "Minneapolis",
  "KDTW": "Detroit",
  "KATL": "Atlanta",
  "KCAK": "Akron/Canton",
  "KCMH": "Columbus",
  "KCVG": "Cincinnati",
  "KRSW": "Fort Myers",
  "KBDL": "Hartford",
  "KISP": "Long Island, NY",
  "KLAX": "Los Angeles",
  "KSDF": "Louisville",
  "KMHT": "Manchester",
  "KSWF": "Newburgh",
  "KHVN": "New Haven",
  "KMSY": "New Orleans",
  "KORF": "Norfolk",
  "KMCO": "Orlando",
  "KPIT": "Pittsburgh",
  "KPWM": "Portland, ME",
  "KPVD": "Providence",
  "KRIC": "Richmond",
  "KSYR": "Syracuse",
  "KTPA": "Tampa",
  "KHPN": "White Plains, NY",
  "KPBI": "West Palm Beach",
  "KCLT": "Charlotte",
  "KDFW": "Dallas/Fort Worth",
  "KMIA": "Miami",
  "KSEA": "Seattle",
  "KYYZ": "Toronto, CA"
}
export function convertTo12Hour(time24) {
  let [hours, minutes] = time24.split(":").map(Number);
  let period = hours >= 12 ? "PM" : "AM";
  
  hours = hours % 12 || 12;
  
  return `${hours}:${String(minutes).padStart(2, "0")} ${period}`;
}

export async function getData(url) {
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

export const chsGates = {
  "A1": [32.8850172, -80.0358008],
  "A2A": [32.8851562, -80.0361841],
  "A2": [32.8852379, -80.0360727],
  "A3": [32.8852228, -80.0356374],
  "A4": [32.8853767, -80.0359035],
  "A5": [32.8852696, -80.0356879],
  "A6": [32.8853484, -80.0358443],
  "A7": [32.8852910, -80.0357244],
  "B1": [32.8854944, -80.0375096],
  "B2": [32.8852433, -80.0379275],
  "B3": [32.8856302, -80.0376012],
  "B4": [32.8855400, -80.0379757],
  "B5": [32.8859834, -80.0377125],
  "B6": [32.8858971, -80.0380917],
  "B7": [32.8860952, -80.0377476],
  "B8": [32.8860084, -80.0381299],
  "B9": [32.8861763, -80.0378856],
  "B10": [32.8861417, -80.0380336]
}