# Product Requirement Document (PRD): TravelWell Voice

## 1. Positioning & Vision
TravelWell is a proactive healthy-travel intelligence platform.
**Tagline:** *“Travel intelligence that knows what comes next.”*

Instead of just recovering from delays, TravelWell helps people experience healthier, less stressful, and more personalized travel before, during, and after a trip.
- **Sabre** knows the trip.
- **TravelWell** knows the traveler (via a persistent traveler profile).
- **Gemini** reasons over both, selecting the appropriate skills.
- **Vocal Bridge** provides natural voice interaction.
- **The traveler** approves any external action or itinerary change.

---

## 2. Target User
- **The Stressed / Health-Conscious Traveler:** A frequent traveler looking to maintain wellness habits, manage travel anxiety, and optimize time during trip disruptions or transitions.

---

## 3. Scope: The Hackathon MVP

### 3.1 First Vertical Slice (Real-time Integration)
1. **Retrieve AA Trip:** Access flight context (e.g. American Airlines flight status) from Sabre.
2. **Load Traveler Profile:** Load user preferences (dietary, hotel loyalty, workout habits, walking tolerance).
3. **Proactive Intelligence:** Generate 2-3 personalized healthy travel suggestions (e.g., matching lounge access, healthy dining near gate/hotel, packing weather reminders).
4. **Interactive Consent (Vocal Bridge):** Present suggestions verbally and in the UI. Allow the user to say "Add lounge to my itinerary" or "Approve dinner".
5. **Itinerary Update Preview:** Re-sequence/adjust the timeline in the UI upon approval, without executing real external transactions.

---

## 4. Key Functional Requirements

### 4.1 Vocal Bridge Interaction
- Voice transport via WebRTC.
- Server-to-server JWT generation on backend.
- Speech transcripts update the transcript box.
- Bidirectional custom actions (data channel) push state changes to the UI.

### 4.2 Vertex AI Reasoning (Single-Agent Orchestration)
- Invokes a single Gemini agent with tools/functions.
- Reads traveler profile & Sabre trip details.
- Explains why suggestions fit the traveler.
- Formulates proposals requiring explicit user approval.

### 4.3 Data Contracts & Profiles
- Pydantic schemas for `TravelerProfile`, `TripContext`, `TravelRecommendation`, `ItineraryItem`, `ProposedAction`, `ApprovalDecision`, `TravelIntelligenceResponse`.
- Keep existing schemas compatible by using adapters.
