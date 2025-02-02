import requests
import json
from datetime import datetime
import pytz
import os


def get_flight_data(url):
    try:
        response = requests.get(url, timeout=10)

        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error: Received status code {response.status_code}")
            return None

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None


def extract_flight_data(data):

    flight = data["data"]

    flights_info = [
        {
            "icao": flight.get("carrierCode", {}).get("icao", None),
            "flightNumber": flight.get("flightNumber", None),
            "flightType": flight.get("flightType", None),
            "flightStatus": (
                flight.get("statusDetails", [{}])[0].get("state", None)
                if flight.get("statusDetails")
                else None
            ),
            "departureDate": flight.get("departure", {}).get("date", None),
            "arrivalDate": flight.get("arrival", {}).get("date", None),
            "aircraftRegistrationNumber": (
                flight.get("statusDetails", [{}])[0]
                .get("equipment", {})
                .get("aircraftRegistrationNumber", None)
                if flight.get("statusDetails")
                else None
            ),
            "aircraftType": (
                flight.get("statusDetails", [{}])[0]
                .get("equipment", {})
                .get("actualAircraftType", {})
                .get("icao", None)
                if flight.get("statusDetails")
                else None
            ),
            "departureIcao": (
                flight.get("statusDetails", [{}])[0]
                .get("departure", {})
                .get("airport", {})
                .get("icao", None)
                if flight.get("statusDetails")
                and len(flight.get("statusDetails", [])) > 0
                else None
            ),
            "departureGate": (
                flight.get("statusDetails", [{}])[0]
                .get("departure", {})
                .get("gate", None)
                if flight.get("statusDetails")
                and len(flight.get("statusDetails", [])) > 0
                else None
            ),
            "estimatedDepartureOutGateTimeliness": (
                flight.get("statusDetails", [{}])[0]
                .get("departure", {})
                .get("estimatedTime", {})
                .get("outGateTimeliness", None)
                if flight.get("statusDetails")
                and len(flight.get("statusDetails", [])) > 0
                else None
            ),
            "estimatedDepartureOutGateVariation": (
                flight.get("statusDetails", [{}])[0]
                .get("departure", {})
                .get("estimatedTime", {})
                .get("outGateVariation", None)
                if flight.get("statusDetails")
                and len(flight.get("statusDetails", [])) > 0
                else None
            ),
            "actualDepartureOutGateTimeliness": (
                flight.get("statusDetails", [{}])[0]
                .get("departure", {})
                .get("actualTime", {})
                .get("outGateTimeliness", None)
                if flight.get("statusDetails")
                and len(flight.get("statusDetails", [])) > 0
                else None
            ),
            "actualDepartureOutGateVariation": (
                flight.get("statusDetails", [{}])[0]
                .get("departure", {})
                .get("actualTime", {})
                .get("outGateVariation", None)
                if flight.get("statusDetails")
                and len(flight.get("statusDetails", [])) > 0
                else None
            ),
            "arrivalIcao": (
                flight.get("statusDetails", [{}])[0]
                .get("arrival", {})
                .get("airport", {})
                .get("icao", None)
                if flight.get("statusDetails")
                and len(flight.get("statusDetails", [])) > 0
                else None
            ),
            "arrivalGate": (
                flight.get("statusDetails", [{}])[0]
                .get("arrival", {})
                .get("gate", None)
                if flight.get("statusDetails")
                and len(flight.get("statusDetails", [])) > 0
                else None
            ),
            "estimatedArrivalInGateTimeliness": (
                flight.get("statusDetails", [{}])[0]
                .get("arrival", {})
                .get("estimatedTime", {})
                .get("inGateTimeliness", None)
                if flight.get("statusDetails")
                and len(flight.get("statusDetails", [])) > 0
                else None
            ),
            "estimatedArrivalInGateVariation": (
                flight.get("statusDetails", [{}])[0]
                .get("arrival", {})
                .get("estimatedTime", {})
                .get("inGateVariation", None)
                if flight.get("statusDetails")
                and len(flight.get("statusDetails", [])) > 0
                else None
            ),
            "actualArrivalInGateTimeliness": (
                flight.get("statusDetails", [{}])[0]
                .get("arrival", {})
                .get("actualTime", {})
                .get("inGateTimeliness", None)
                if flight.get("statusDetails")
                and len(flight.get("statusDetails", [])) > 0
                else None
            ),
            "actualArrivalInGateVariation": (
                flight.get("statusDetails", [{}])[0]
                .get("arrival", {})
                .get("actualTime", {})
                .get("inGateVariation", None)
                if flight.get("statusDetails")
                and len(flight.get("statusDetails", [])) > 0
                else None
            ),
        }
        for flight in data.get("data", [])
    ]
    return flights_info


def load_data(file_path, key_name, extracted_data):

    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            existing_data = json.load(f)

        if key_name not in existing_data:
            existing_data[key_name] = []

        existing_data[key_name].append(extracted_data)

        with open(file_path, "w") as f:
            json.dump(existing_data, f, indent=4)

    else:
        with open(file_path, "w") as f:
            json.dump({key_name: [extracted_data]}, f, indent=4)


def get_est_timestamp():
    utc_now = datetime.now(pytz.utc)
    est = pytz.timezone("US/Eastern")
    return str(utc_now.astimezone(est).date())


def main(file_path, url):
    data = get_flight_data(url)
    extracted_data = extract_flight_data(data)
    load_data(file_path, get_est_timestamp(), extracted_data)

arrivals_api = os.getenv("ARRIVALS_API")

departures_api = os.getenv("DEPARTURES_API")

main("data/arrivals.json", arrivals_api)

main("data/departures.json", departures_api)
