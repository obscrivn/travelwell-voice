from typing import Dict, Any, Optional
from app.schemas import TravelerProfile

MOCK_PROFILES: Dict[str, Dict[str, Any]] = {
    "traveler_1": {
        "id": "traveler_1",
        "travel_style": "both",
        "airline_loyalty": ["American Airlines (AAdvantage Executive Platinum)", "United MileagePlus"],
        "hotel_loyalty": ["Marriott Bonvoy Titanium Elite"],
        "lounge_memberships": ["Admirals Club", "Centurion Lounge"],
        "dietary_preferences": ["organic", "high protein", "low sugar"],
        "wellness_habits": ["short indoor workout", "morning yoga", "cardio"],
        "preferred_retailers": ["Whole Foods Market", "Lululemon"],
        "walking_tolerance_minutes": 15,
        "rental_car_preferences": ["Hertz Presidents Circle"],
        "ground_transport_preferences": ["Uber Black", "Train/Transit"]
    }
}

def get_traveler_profile(profile_id: str = "traveler_1") -> Dict[str, Any]:
    """Retrieves the persistent traveler profile for intelligence matching.

    Args:
        profile_id: Identifier for the traveler profile.

    Returns:
        A dictionary matching the TravelerProfile schema.
    """
    return MOCK_PROFILES.get(profile_id, MOCK_PROFILES["traveler_1"])

def update_traveler_profile(profile_id: str, changes: dict) -> Dict[str, Any]:
    """Updates specific preferences in the traveler profile.

    Args:
        profile_id: Identifier for the traveler profile.
        changes: Dictionary of fields to update.

    Returns:
        The updated profile dictionary.
    """
    profile = MOCK_PROFILES.get(profile_id)
    if not profile:
        profile = MOCK_PROFILES["traveler_1"].copy()
        profile["id"] = profile_id
        MOCK_PROFILES[profile_id] = profile
    
    for key, val in changes.items():
        if key in profile:
            profile[key] = val
    return profile
