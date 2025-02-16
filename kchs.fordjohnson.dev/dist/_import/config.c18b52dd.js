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

export const chsGatePlanes = {
  "A1": {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1397 -1397 1397 1397"><path d="m-1397-1324q0 87 149 236l240 240-143 746-1 6q0 14 9 23L-1079-9q9 9 23 9 21-0 29-18L-753-593-508-348Q-576-110-576-96-576-82-567-73L-503-9Q-494 0-480 0-462 0-452-16L-297-296-17-451q17-9 17-28-0-14-9-23l-64-65q-9-9-23-9-14 0-252 68L-593-753-18-1027q18-8 18-29-0-14-9-23l-64-64q-9-9-23-9-4 0-6 1l-746 143-240-240q-149-149-236-149-32 0-52.5 20.5-20.5 20.5-20.5 52.5z" fill="#000000"/></svg>`,
    bounds: [ [ 32.885097, -80.035599], [ 32.884572, -80.035355 ] ]
  },
  "A3": {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1770.75 -1051.95 1609 1415"><path d="m-1765.5853-766.3509q29.7558 81.7533 220.731 170.8065l307.6111 143.4414 120.771 749.9196 1.1124 5.9802q4.7883 13.1557 16.3237 18.5347L-1017.0065 360.5825q11.5354 5.3791 24.6911.5908 19.7335-7.1824 21.0947-26.8331L-910.4065-299.6966-596.3869-153.2668Q-578.8852 93.6374-574.0969 106.7931-569.3086 119.9488-557.7732 125.3279L-475.7436 163.5789Q-464.2082 168.958-451.0525 164.1697-434.138 158.0133-430.2134 139.558L-380.3267-176.569-170.2259-417.987q12.8966-14.2716 6.3982-32.1257-4.7883-13.1557-16.3237-18.5347l-82.3716-39.1907q-11.5354-5.3791-24.6911-.5908-13.1557 4.7883-213.5452 150.0882L-814.7789-504.7706-368.1692-958.908q14.1783-13.6739 6.9959-33.4074-4.7883-13.1557-16.3237-18.5347l-82.0296-38.251q-11.5354-5.3791-24.6911-.5908-3.7588 1.3681-5.2961 2.9918l-652.1018 389.5231-307.6111-143.4414q-190.9752-89.0532-272.7285-59.2974-30.0702 10.9446-42.3224 37.2198-12.2523 26.2751-1.3076 56.3453z" fill="#000000"/></svg>`,
    bounds: [ [ 32.885445,-80.035328], [ 32.88492,-80.035084 ] ]
  },
  "A5": {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1833.46 -449.694 1634 1457"><path d="m-1790.3492 706.5654q78.8488 36.7678 276.8588-35.302l318.9423-116.0855 615.6712 444.8752 5.0152 3.442q12.6883 5.9167 24.6486 1.5634L-464.1619 974.1025q11.9603-4.3532 17.877-17.0415 8.875-19.0325-4.0576-33.8901L-855.6721 431.8371-530.0852 313.3332Q-343.122 475.5453-330.4337 481.4619-317.7454 487.3786-305.785 483.0254L-220.7338 452.0693Q-208.7734 447.716-202.8568 435.0277-195.2496 418.7142-205.5244 402.8892L-393.7847 144.0784-415.9293-175.1936q-.9723-19.2108-18.1921-27.2405-12.6883-5.9167-24.6486-1.5634l-85.9576 30.5335q-11.9603 4.3532-17.877 17.0415-5.9167 12.6883-44.8709 257.1276L-933.0624 219.209-938.3852-417.7154q.3567-19.6945-18.6758-28.5695-12.6883-5.9167-24.6486-1.5634l-85.0513 30.9561q-11.9603 4.3532-17.877 17.0415-1.6905 3.6252-1.6294 5.8605l-185.6712 736.54-318.9423 116.0855q-198.01 72.0697-234.7778 150.9185-13.5238 29.0018-3.6081 56.2448 9.9156 27.243 38.9175 40.7668z" fill="#000000"/></svg>`,
    bounds: [ [ 32.885716,-80.035516], [ 32.885191,-80.035272 ] ]
  },
  "B1": {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1833.46 -449.694 1634 1457"><path d="m-1790.3492 706.5654q78.8488 36.7678 276.8588-35.302l318.9423-116.0855 615.6712 444.8752 5.0152 3.442q12.6883 5.9167 24.6486 1.5634L-464.1619 974.1025q11.9603-4.3532 17.877-17.0415 8.875-19.0325-4.0576-33.8901L-855.6721 431.8371-530.0852 313.3332Q-343.122 475.5453-330.4337 481.4619-317.7454 487.3786-305.785 483.0254L-220.7338 452.0693Q-208.7734 447.716-202.8568 435.0277-195.2496 418.7142-205.5244 402.8892L-393.7847 144.0784-415.9293-175.1936q-.9723-19.2108-18.1921-27.2405-12.6883-5.9167-24.6486-1.5634l-85.9576 30.5335q-11.9603 4.3532-17.877 17.0415-5.9167 12.6883-44.8709 257.1276L-933.0624 219.209-938.3852-417.7154q.3567-19.6945-18.6758-28.5695-12.6883-5.9167-24.6486-1.5634l-85.0513 30.9561q-11.9603 4.3532-17.877 17.0415-1.6905 3.6252-1.6294 5.8605l-185.6712 736.54-318.9423 116.0855q-198.01 72.0697-234.7778 150.9185-13.5238 29.0018-3.6081 56.2448 9.9156 27.243 38.9175 40.7668z" fill="#000000"/></svg>`,
    bounds: [ [ 32.885909,-80.037415], [ 32.885384,-80.037171 ] ]
  },
  "B3": {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1833.46 -449.694 1634 1457"><path d="m-1790.3492 706.5654q78.8488 36.7678 276.8588-35.302l318.9423-116.0855 615.6712 444.8752 5.0152 3.442q12.6883 5.9167 24.6486 1.5634L-464.1619 974.1025q11.9603-4.3532 17.877-17.0415 8.875-19.0325-4.0576-33.8901L-855.6721 431.8371-530.0852 313.3332Q-343.122 475.5453-330.4337 481.4619-317.7454 487.3786-305.785 483.0254L-220.7338 452.0693Q-208.7734 447.716-202.8568 435.0277-195.2496 418.7142-205.5244 402.8892L-393.7847 144.0784-415.9293-175.1936q-.9723-19.2108-18.1921-27.2405-12.6883-5.9167-24.6486-1.5634l-85.9576 30.5335q-11.9603 4.3532-17.877 17.0415-5.9167 12.6883-44.8709 257.1276L-933.0624 219.209-938.3852-417.7154q.3567-19.6945-18.6758-28.5695-12.6883-5.9167-24.6486-1.5634l-85.0513 30.9561q-11.9603 4.3532-17.877 17.0415-1.6905 3.6252-1.6294 5.8605l-185.6712 736.54-318.9423 116.0855q-198.01 72.0697-234.7778 150.9185-13.5238 29.0018-3.6081 56.2448 9.9156 27.243 38.9175 40.7668z" fill="#000000"/></svg>`,
    bounds: [ [ 32.886304,-80.037442], [ 32.885779,-80.037198 ] ]
  },
  "B5": {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1833.46 -449.694 1634 1457"><path d="m-1790.3492 706.5654q78.8488 36.7678 276.8588-35.302l318.9423-116.0855 615.6712 444.8752 5.0152 3.442q12.6883 5.9167 24.6486 1.5634L-464.1619 974.1025q11.9603-4.3532 17.877-17.0415 8.875-19.0325-4.0576-33.8901L-855.6721 431.8371-530.0852 313.3332Q-343.122 475.5453-330.4337 481.4619-317.7454 487.3786-305.785 483.0254L-220.7338 452.0693Q-208.7734 447.716-202.8568 435.0277-195.2496 418.7142-205.5244 402.8892L-393.7847 144.0784-415.9293-175.1936q-.9723-19.2108-18.1921-27.2405-12.6883-5.9167-24.6486-1.5634l-85.9576 30.5335q-11.9603 4.3532-17.877 17.0415-5.9167 12.6883-44.8709 257.1276L-933.0624 219.209-938.3852-417.7154q.3567-19.6945-18.6758-28.5695-12.6883-5.9167-24.6486-1.5634l-85.0513 30.9561q-11.9603 4.3532-17.877 17.0415-1.6905 3.6252-1.6294 5.8605l-185.6712 736.54-318.9423 116.0855q-198.01 72.0697-234.7778 150.9185-13.5238 29.0018-3.6081 56.2448 9.9156 27.243 38.9175 40.7668z" fill="#000000"/></svg>`,
    bounds: [ [ 32.886579,-80.037513], [ 32.886054,-80.037269 ] ]
  }
}