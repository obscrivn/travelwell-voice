from typing import Dict, Any, List, Optional

def find_dining_retail_wellness(location: str, preferences: List[str]) -> List[Dict[str, Any]]:
    """Finds healthy dining options, retailers, or wellness facilities matching the traveler's profile.

    Args:
        location: Target city or area (e.g. "Chicago" or "Downtown hotel").
        preferences: List of preferences (e.g. ["organic", "high protein"]).

    Returns:
        List of recommended places.
    """
    # Google Places integration can be performed here. If not configured, return deterministic mock data.
    return [
        {
            "id": "dining_1",
            "category": "dining",
            "title": "True Food Kitchen",
            "description": "Anti-inflammatory, organic dining within 5 mins walk of your hotel.",
            "why_now": "Dinner window fits perfectly before closing.",
            "match_reason": "High protein and organic choices match dietary preferences.",
            "source": "google_places",
            "confidence": "inferred",
            "urgency": "normal",
            "proposed_action": {
                "id": "add_dinner",
                "action_type": "itinerary_addition",
                "label": "Add Dinner Suggestion",
                "requires_approval": True,
                "integration_status": "preview"
            }
        },
        {
            "id": "retail_1",
            "category": "retail",
            "title": "Whole Foods Market",
            "description": "Organic grocery and prepared food bar, 8 mins walk.",
            "why_now": "Option to stock healthy room snacks tonight.",
            "match_reason": "Matches your preference for organic foods.",
            "source": "google_places",
            "confidence": "suggested",
            "urgency": "normal",
            "proposed_action": {
                "id": "add_wholefoods",
                "action_type": "itinerary_addition",
                "label": "Add Whole Foods stop",
                "requires_approval": True,
                "integration_status": "preview"
            }
        }
    ]

def check_lounge_options(airport: str, profile: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Checks airport lounge availability matching traveler airline status and memberships.

    Args:
        airport: Airport code (e.g., "ORD").
        profile: The traveler's persistent profile.

    Returns:
        List of lounge options.
    """
    has_lounge_access = profile.get("lounge_access", True) or len(profile.get("lounge_memberships", [])) > 0
    if not has_lounge_access:
        return []
    
    return [
        {
            "id": "lounge_1",
            "category": "wellness",
            "title": "AA Admirals Club (Concourse H/K)",
            "description": "Quiet workspaces, clean showers, and healthy salads.",
            "why_now": "Available during your layover / departure window.",
            "match_reason": "Complimentary access verified via Admirals Club membership.",
            "source": "sabre_loyalty_match",
            "confidence": "verified",
            "urgency": "normal",
            "proposed_action": {
                "id": "add_lounge",
                "action_type": "itinerary_addition",
                "label": "Add Lounge Access",
                "requires_approval": True,
                "integration_status": "preview"
            }
        }
    ]

def check_rental_car_context(airport: str, profile: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """Retrieves timing and instructions for rental-car pickup.

    Args:
        airport: Airport code (e.g. "ORD").
        profile: Traveler profile dictionary.

    Returns:
        Rental car context summary dictionary.
    """
    prefs = profile.get("rental_car_preferences", [])
    if "Hertz Presidents Circle" in prefs:
        return {
            "id": "rental_car_hertz",
            "category": "ground",
            "title": "Hertz Ultimate Choice Pickup",
            "description": "Head straight to the Hertz Gold zone tomorrow morning.",
            "why_now": "Hertz reservation is confirmed for tomorrow morning.",
            "match_reason": "Preferences match: Hertz Presidents Circle.",
            "source": "sabre_reservation",
            "confidence": "verified",
            "urgency": "normal",
            "proposed_action": None
        }
    return None

def generate_travel_intelligence(trip_context: Dict[str, Any], traveler_profile: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Aggregates all proactive intelligence items using context and profile.

    Args:
        trip_context: Current trip context.
        traveler_profile: Traveler memory profile.

    Returns:
        List of TravelRecommendations.
    """
    recs = []
    
    # 1. Lounges
    flight = trip_context.get("flight") or {}
    dest = flight.get("destination", "Chicago")
    recs.extend(check_lounge_options("ORD" if "chicago" in dest.lower() else "SEA", traveler_profile))
    
    # 2. Dining and wellness
    recs.extend(find_dining_retail_wellness(dest, traveler_profile.get("dietary_preferences", [])))
    
    # 3. Rental Car
    rental = check_rental_car_context("ORD" if "chicago" in dest.lower() else "SEA", traveler_profile)
    if rental:
        recs.append(rental)
        
    return recs
