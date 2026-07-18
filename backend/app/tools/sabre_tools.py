from typing import List, Dict, Any, Optional
import os
import requests
import logging

logger = logging.getLogger(__name__)

MOCK_TRIPS: List[Dict[str, Any]] = [
    {
        "id": "chicago_trip",
        "destination": "Chicago",
        "start_date": "Tomorrow",
        "end_date": "Jul 21",
        "primary_carrier": "American Airlines",
        "source": "fixture"
    },
    {
        "id": "seattle_trip",
        "destination": "Seattle",
        "start_date": "Aug 3",
        "end_date": "Aug 7",
        "primary_carrier": "Alaska Airlines",
        "source": "fixture"
    }
]

MOCK_TRIP_CONTEXTS: Dict[str, Dict[str, Any]] = {
    "chicago_trip": {
        "trip_id": "chicago_trip",
        "flight": {
            "flight_number": "AA100",
            "origin": "Indianapolis",
            "destination": "Chicago",
            "eta": "6:40 PM",
            "status": "Delayed"
        },
        "flight_source": "fixture",
        "hotel": None,
        "hotel_source": "missing",
        "rental_car": None,
        "rental_car_source": "missing",
        "ground_transport": None,
        "ground_transport_source": "missing",
        "dining": None,
        "dining_source": "missing",
        "activities": [],
        "missing_fields": ["hotel", "rental_car"]
    },
    "seattle_trip": {
        "trip_id": "seattle_trip",
        "flight": {
            "flight_number": "AS456",
            "origin": "Chicago",
            "destination": "Seattle",
            "eta": "10:15 AM",
            "status": "On Time"
        },
        "flight_source": "fixture",
        "hotel": {
            "name": "W Seattle",
            "status": "Confirmed"
        },
        "hotel_source": "traveler_provided",
        "rental_car": None,
        "rental_car_source": "missing",
        "ground_transport": None,
        "ground_transport_source": "missing",
        "dining": None,
        "dining_source": "missing",
        "activities": [],
        "missing_fields": ["rental_car"]
    }
}

def get_sabre_headers() -> Optional[Dict[str, str]]:
    token = os.getenv("SABRE_MCP_TOKEN")
    pcc = os.getenv("SABRE_PCC")
    pcc_header_name = os.getenv("SABRE_PCC_HEADER_NAME", "X-Sabre-PCC")

    if not token or not pcc:
        return None

    return {
        "Authorization": f"Bearer {token}",
        pcc_header_name: pcc,
        "Content-Type": "application/json"
    }

def call_sabre_mcp(method: str, params: Optional[Dict[str, Any]] = None) -> Optional[Dict[str, Any]]:
    url = os.getenv("SABRE_MCP_URL", "https://mcp2.cert.sabre.com/mcp")
    headers = get_sabre_headers()
    
    if not headers:
        logger.info("Sabre MCP credentials missing. Skipping MCP call.")
        return None

    payload = {
        "jsonrpc": "2.0",
        "method": method,
        "id": 1
    }
    if params is not None:
        payload["params"] = params

    try:
        res = requests.post(url, headers=headers, json=payload, timeout=8)
        if res.status_code == 200:
            return res.json()
        else:
            logger.warning(f"Sabre MCP returned status {res.status_code}")
            return None
    except Exception as e:
        logger.error(f"Sabre MCP connection error: {e}")
        return None

def list_upcoming_trips() -> List[Dict[str, Any]]:
    """Lists upcoming flights and trips available in the traveler's Sabre profile.

    Returns:
        List of TripSummary dictionaries.
    """
    mcp_res = call_sabre_mcp("tools/call", {"name": "get_upcoming_trips", "arguments": {}})
    if mcp_res and "result" in mcp_res:
        try:
            # Normalize Sabre MCP output
            raw_trips = mcp_res["result"].get("trips", [])
            normalized = []
            for t in raw_trips:
                normalized.append({
                    "id": t.get("trip_id") or t.get("id"),
                    "destination": t.get("destination"),
                    "start_date": t.get("start_date"),
                    "end_date": t.get("end_date"),
                    "primary_carrier": t.get("primary_carrier"),
                    "source": "sabre_verified"
                })
            if normalized:
                return normalized
        except Exception as e:
            logger.error(f"Error normalizing upcoming trips: {e}")

    # Fallback to fixtures
    return MOCK_TRIPS

def get_trip_context(trip_id: str) -> Dict[str, Any]:
    """Retrieves the full structural parameters of a trip context.

    Args:
        trip_id: Unique identifier for the trip.

    Returns:
        TripContext dictionary including confirmed and missing fields.
    """
    mcp_res = call_sabre_mcp("tools/call", {"name": "get_trip_context", "arguments": {"trip_id": trip_id}})
    if mcp_res and "result" in mcp_res:
        try:
            raw_context = mcp_res["result"]
            # Normalize Sabre MCP context
            normalized = {
                "trip_id": trip_id,
                "flight": raw_context.get("flight"),
                "flight_source": "sabre_verified" if raw_context.get("flight") else "missing",
                "hotel": raw_context.get("hotel"),
                "hotel_source": "sabre_verified" if raw_context.get("hotel") else "missing",
                "rental_car": raw_context.get("rental_car"),
                "rental_car_source": "sabre_verified" if raw_context.get("rental_car") else "missing",
                "ground_transport": raw_context.get("ground_transport"),
                "ground_transport_source": "inferred" if raw_context.get("ground_transport") else "missing",
                "dining": raw_context.get("dining"),
                "dining_source": "traveler_provided" if raw_context.get("dining") else "missing",
                "activities": raw_context.get("activities") or [],
                "missing_fields": raw_context.get("missing_fields") or []
            }
            return normalized
        except Exception as e:
            logger.error(f"Error normalizing trip context: {e}")

    # Fallback to fixtures
    fallback = MOCK_TRIP_CONTEXTS.get(trip_id, MOCK_TRIP_CONTEXTS["chicago_trip"])
    return fallback

def search_sabre_trip(origin: str, destination: str, date: str) -> Optional[Dict[str, Any]]:
    """Searches Sabre flight context for a matching itinerary.

    Args:
        origin: Flight origin code or city.
        destination: Flight destination.
        date: Flight date.

    Returns:
        A trip context dictionary if found.
    """
    mcp_res = call_sabre_mcp("tools/call", {
        "name": "search_trip", 
        "arguments": {"origin": origin, "destination": destination, "date": date}
    })
    if mcp_res and "result" in mcp_res:
        try:
            raw_trip = mcp_res["result"]
            trip_id = raw_trip.get("trip_id") or raw_trip.get("id")
            if trip_id:
                return get_trip_context(trip_id)
        except Exception as e:
            logger.error(f"Error searching trip: {e}")

    for trip in MOCK_TRIPS:
        if trip["destination"].lower() == destination.lower():
            return get_trip_context(trip["id"])
    return None
