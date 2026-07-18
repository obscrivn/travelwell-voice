# TravelWell Voice

> *“Travel systems manage bookings. TravelWell manages the traveler.”*

TravelWell Voice is a proactive travel intelligence and wellness platform. It integrates active travel parameters from Sabre, persistent profiles from Traveler Memory, Vertex AI Gemini orchestration, and Vocal Bridge voice interactions to anticipate traveler needs, reduce travel stress, and deliver healthy, personalized recommendations.

---

## 1. Core Architecture

The system consists of a Vite React frontend, a FastAPI backend running on Cloud Run, and a single Vertex AI Gemini reasoning agent managing custom tools.

```
       [ Jim / Traveler ]
               │
               ▼ (Voice Dialogue)
        [ Vocal Bridge ]
               │
               ▼ (WebRTC Audio Stream)
       [ React Frontend ]
               │
               ▼ (FastAPI backend tools)
       [ FastAPI Engine ] ◄───► [ Gemini on Vertex AI ]
               │
               ├─────────────────────────┐
               ▼                         ▼
    [ Sabre remote MCP ]         [ Traveler Memory ]
 (https://mcp2.cert.sabre.com)     (Diet / Habits / VIP)
```

- **Sabre knows the trip:** Live flight status (carrier, timing, delays, gate numbers) retrieved via Sabre's remote MCP Skills server.
- **TravelWell knows the traveler:** Persistent traveler memory profile preserving dietary choices (veggie/high-protein), exercise habits (25-min workouts), brand loyalty, and stress goals.
- **Gemini reasons over both:** Translates flight updates and profile habits into proactive recommendations (e.g. Admiral lounge workspace near gate when flight is delayed).
- **Vocal Bridge coordinates action:** Initiates continuous voice dialogue, gathers missing itinerary parameters, and applies updates gated by traveler approvals.

---

## 2. API Contracts & Security

The FastAPI backend exposes the following interfaces:
- `POST /api/voice-token`: Connects to Vocal Bridge API using server-side keys and returns short-lived WebRTC session credentials.
- `POST /api/travel-intelligence`: Triggers Gemini agent reasoning on active flight states and traveler preferences.
- `POST /api/actions/{action_id}/decision`: Records the traveler's approval or rejection of a proposed wellness suggestion.
- `GET /api/diagnostics/sabre`: Diagnostic endpoint mapping remote Sabre MCP server connectivity and available skills.

### Security
All backend-to-backend Custom API tool routes are protected via `verify_travelwell_key` checking for `X-TravelWell-Key` in headers to prevent unauthorized triggers.

---

## 3. Remote Sabre MCP Client

Sabre integration uses the Model Context Protocol (MCP) to access tools hosted in the CERT environment.
- **Endpoint:** `https://mcp2.cert.sabre.com/mcp`
- **Authentication Headers:**
  - `Authorization: Bearer <SABRE_MCP_TOKEN>`
  - `X-Sabre-PCC: <SABRE_PCC>`
  - `Accept: application/json, text/event-stream` (required to bypass CDN/WAF filters)
- **Tool Normalization:** Raw JSON-RPC responses are mapped and normalized inside `sabre_tools.py` into unified `TripSummary` and `TripContext` models. If credentials are missing or the server fails, a deterministic local fixture fallback is preserved.

---

## 4. Getting Started

### Local Setup
1. **Configure Environment Variables:**
   Create a `backend/.env` file with placeholders matching `backend/.env.example`:
   ```env
   # Vocal Bridge
   VOCAL_BRIDGE_API_KEY=vb_key
   VOCAL_BRIDGE_AGENT_ID=agent-id
   VOCAL_BRIDGE_BASE_URL=https://vocalbridgeai.com

   # Sabre MCP
   SABRE_MCP_TOKEN=token
   SABRE_PCC=PCC_ID
   SABRE_MCP_URL=https://mcp2.cert.sabre.com/mcp
   ```

2. **Run Backend Server:**
   ```bash
   cd backend
   uv run uvicorn app.fast_api_app:app --reload --port 8000
   ```

3. **Run React Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

### Running Tests
Execute the pytest suite to verify routers, agent execution, and security handlers:
```bash
cd backend
uv run pytest
```

---

## 5. Cinematic Presentation Demo

An interactive 10-slide cinematic presentation of the TravelWell concept is available at `demo/index.html`. It features a dark theme, parallax aurora gradients, and an animated traveler journey showing live context updates.

To run and preview:
```bash
python3 -m http.server -d "demo" 8080
```
Then visit: [http://localhost:8080](http://localhost:8080)