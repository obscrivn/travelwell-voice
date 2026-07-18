# Hackathon Plan: TravelWell Voice

## 1. Two-Hour MVP Plan

### hour 0.0 - 0.5: Backend Setup & Secrets
- Set up GCP Secret Manager values: `VOCAL_BRIDGE_API_KEY`, `SABRE_API_KEY`.
- Implement `POST /api/voice-token` in `backend/app/fast_api_app.py`.
- Define backend profile fixture data containing: business tier preference, loyalty, wellness interests.

### hour 0.5 - 1.0: Frontend WebRTC Connection
- Run `npm install @vocalbridgeai/sdk` in frontend.
- Replace mockup preview dropdown inside `VoicePanel.tsx` with actual WebRTC connections.
- Bind `vb.on('transcript', ...)` to write speech bubbles directly to the screen.

### hour 1.0 - 1.5: Gemini Single Agent & Sabre Skills
- Refactor `backend/app/agent.py` to use a single Gemini agent with tools.
- Implement Sabre tool `get_trip_context` and Google Places tool `find_dining_retail_wellness`.
- Ensure tool calls run successfully when triggered by the agent.

### hour 1.5 - 2.0: Bidirectional UI State Sync & Verification
- Establish the data-channel action handlers (`update_itinerary_preview`, `request_action_approval`) on both backend agent and frontend app.
- Perform end-to-end integration run.

---

## 2. Environment Variables
- `VOCAL_BRIDGE_API_KEY`: Secrets key.
- `VOCAL_BRIDGE_URL`: Vocal Bridge server (e.g. `http://vocalbridgeai.com`).
- `SABRE_API_KEY` / `SABRE_SECRET_KEY`: Sabre integration.
- `GOOGLE_MAPS_API_KEY`: Routing and Place details.

---

## 3. Fallback Plan (If APIs Block)
- **Vocal Bridge Blocked:** Fall back to the SSE endpoint `/api/recommend` using text-based updates. The frontend UI remains identical but processes textual prompts with mock audio states.
- **Sabre Blocked:** Use simulated Sabre tool results returning a pre-baked response for standard flight codes (e.g. `AA123`).
