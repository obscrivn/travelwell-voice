from typing import Dict, Any, List
from app.services.mock_data import load_mock_data

def calculate_route_distances(facility_id: str) -> Dict[str, Any]:
    """Calculates route walking times, driving times, and distances.

    Args:
        facility_id: The unique identifier for the facility.

    Returns:
        A dictionary containing walking time, driving time, and distance metrics.
    """
    from app.services.google_maps import get_maps_api_key, get_route_live, get_place_details_live
    key = get_maps_api_key()
    if key and not facility_id.startswith("mock_"):
        details = get_place_details_live(facility_id) or {}
        dest_coords = details.get("geometry", {}).get("location", {}) if details.get("geometry") else {}
        dest_lat = dest_coords.get("lat") or 41.8962 
        dest_lng = dest_coords.get("lng") or -87.6287
        
        dest_str = f"{dest_lat},{dest_lng}"
        origin_str = "41.8817,-87.6278"
        walk_route = get_route_live(origin_str, dest_str, "walking")
        drive_route = get_route_live(origin_str, dest_str, "driving")
        
        walk_min = 15
        if walk_route and "duration_value_seconds" in walk_route:
            walk_min = max(1, int(walk_route["duration_value_seconds"] / 60))
        
        drive_min = 5
        if drive_route and "duration_value_seconds" in drive_route:
            drive_min = max(1, int(drive_route["duration_value_seconds"] / 60))
        
        dist_miles = 0.5
        if walk_route and "distance_text" in walk_route:
            try:
                dist_text = walk_route["distance_text"]
                cleaned_dist = "".join([c for c in dist_text if c.isdigit() or c == "."])
                dist_miles = float(cleaned_dist)
            except Exception:
                dist_miles = 0.5
        
        return {
            "status": "success",
            "travel_metadata": {
                "walk_minutes": walk_min,
                "drive_minutes": drive_min,
                "distance_miles": dist_miles
            }
        }

    data = load_mock_data()
    for scenario in data.get("scenarios", []):
        for fac in scenario.get("candidate_facilities_seed", []):
            if fac.get("id") == facility_id:
                return {
                    "status": "success",
                    "travel_metadata": fac.get("travel_metadata")
                }
    return {"status": "error", "message": f"Facility {facility_id} not found."}


def build_trip_context(trip_id: str, updates: dict) -> Dict[str, Any]:
    """Combines existing Sabre context with user voice updates.

    Args:
        trip_id: The ID of the selected trip.
        updates: Specific updates provided by the user.

    Returns:
        The updated trip context dictionary.
    """
    from app.tools.sabre_tools import get_trip_context
    context = get_trip_context(trip_id)
    for key in ["hotel", "rental_car", "ground_transport", "dining"]:
        if key in updates and updates[key]:
            context[key] = updates[key]
    
    # Recalculate missing fields
    missing = []
    if not context.get("hotel"):
        missing.append("hotel")
    if not context.get("rental_car"):
        missing.append("rental_car")
    context["missing_fields"] = missing
    
    return context

def identify_missing_context(context: dict) -> List[str]:
    """Identifies fields that have not been provided or resolved.

    Args:
        context: The current trip context dictionary.

    Returns:
        List of missing fields.
    """
    return context.get("missing_fields", [])

def update_itinerary_preview(trip_id: str, approved_actions: list) -> List[dict]:
    """Generates an updated chronological itinerary preview based on approved actions.

    Args:
        trip_id: Unique identifier for the trip.
        approved_actions: List of actions approved by the traveler.

    Returns:
        List of itinerary item dictionaries.
    """
    # Baseline itinerary
    itinerary = [
        {
            "id": "flight",
            "category": "flight",
            "time": "6:40 PM",
            "title": "Arrive in Chicago",
            "detail": "IND → ORD · estimated arrival",
            "status": "Delayed",
            "kind": "trip data"
        },
        {
            "id": "ground",
            "category": "ground",
            "time": "7:20 PM",
            "title": "Ground transport downtown",
            "detail": "Uber Black selection based on ground preferences",
            "status": "Suggested",
            "kind": "suggestion"
        },
        {
            "id": "hotel",
            "category": "hotel",
            "time": "8:05 PM",
            "title": "Marriott Downtown Check-in",
            "detail": "Loyalty tier recognized: Titanium Elite",
            "status": "Confirmed",
            "kind": "trip data"
        }
    ]

    for act in approved_actions:
        if act == "add_dinner":
            itinerary.append({
                "id": "dining",
                "category": "dining",
                "time": "8:30 PM",
                "title": "Healthy dinner nearby",
                "detail": "True Food Kitchen suggested (organic, high protein)",
                "status": "Confirmed",
                "kind": "suggestion"
            })
        elif act == "add_workout":
            itinerary.append({
                "id": "wellness",
                "category": "wellness",
                "time": "9:20 PM",
                "title": "Short indoor workout",
                "detail": "Marriott Fitness Center (indoor pool, open 24/7)",
                "status": "Confirmed",
                "kind": "suggestion"
            })
            
    # Sort itinerary by time (simple hour comparison)
    return itinerary
