from google.adk.agents import Agent, LlmAgent
from google.adk.apps import App
from google.adk.models import Gemini
from google.genai import types

from app.tools.sabre_tools import list_upcoming_trips, get_trip_context, search_sabre_trip
from app.tools.profile_tools import get_traveler_profile, update_traveler_profile
from app.tools.itinerary_tools import build_trip_context, identify_missing_context, update_itinerary_preview
from app.tools.intelligence_tools import generate_travel_intelligence, find_dining_retail_wellness

# Consolidated Proactive Intelligence Agent
travelwell_intelligence_agent = LlmAgent(
    name="travelwell_concierge",
    model=Gemini(
        model="gemini-flash-latest",
        retry_options=types.HttpRetryOptions(attempts=3),
    ),
    instruction="""You are the main TravelWell Voice intelligence agent.
Your core positioning is: "Travel intelligence that knows what comes next."
Your goal is to help travelers experience healthier, less stressful, and more personalized travel.

Core workflow:
1. Greet the traveler. Identify upcoming Sabre trips using `list_upcoming_trips`.
   - If multiple trips (e.g., Chicago and Seattle), ask which trip they want help with.
   - If one trip (e.g., Chicago), ask if that's the trip they are working on.
2. Load traveler preferences from `get_traveler_profile`.
3. Check for missing context in the trip (e.g., Hotel, Rental Car). Ask only one focused question to resolve missing details.
4. Once context is resolved, call `generate_travel_intelligence` to generate healthy dining, lounge, retail, or exercise recommendations matching their profile and lodging.
5. Provide a spoken response summarizing what fits their style, why it fits, and how it aligns with their schedule.
6. Trigger the client action `update_itinerary_preview` or `request_action_approval` to let the traveler preview and approve or reject any itinerary updates.

Be helpful, concise, and proactive. Always explain the "why" behind recommendations based on their Traveler Memory.
""",
    tools=[
        list_upcoming_trips,
        get_trip_context,
        search_sabre_trip,
        get_traveler_profile,
        update_traveler_profile,
        build_trip_context,
        identify_missing_context,
        update_itinerary_preview,
        generate_travel_intelligence,
        find_dining_retail_wellness
    ],
    output_key="concierge_output"
)

# Export as root_agent for the FastAPI lifecycle mapping
root_agent = travelwell_intelligence_agent

app = App(
    root_agent=root_agent,
    name="app",
)
