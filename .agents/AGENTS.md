# TravelWell Voice: Agent Guidelines

## 1. Project Purpose & Vision
TravelWell Voice is a proactive healthy-travel intelligence platform.
**Positioning:** *“Travel intelligence that knows what comes next.”*
It combines Sabre travel context, traveler profiles, and Vertex AI Gemini agents to suggest healthy lounges, dining, retail, and wellness activities, synchronizing with Vocal Bridge voice interactions.

---

## 2. Architecture Quick Reference
- **Frontend:** React, Vite, TS, Vanilla CSS. State managed in `App.tsx`.
- **Backend:** FastAPI, Python, Google ADK.
- **Orchestration:** Single Vertex AI Gemini Agent with tool functions (rather than complex multi-agent layers).
- **Voice Integration:** Vocal Bridge SDK connects to LiveKit/WebRTC rooms using backend-generated JWT tokens.
- **External Data:** Sabre API (flight data), Google Places/Maps API.

---

## 3. APIs & Boundaries (Do Not Change)
- `POST /api/recommend`: Streams ADK execution steps (SSE). Used for text-based fallback and telemetry.
- `GET /resolve_location`: Geocoding address resolver.
- `POST /api/voice-token`: Must retrieve and return LiveKit JWT credentials from Vocal Bridge for the voice stream.

---

## 4. Coding Conventions
- **TypeScript:** Strict types; avoid `any`. Prefer interfaces matching backend schemas.
- **CSS:** Use vanilla CSS and custom properties in `App.css`. Do not add utility classes or TailwindCSS.
- **Python:** Use `uv` package manager. Maintain standard comments/docstrings.
- **Orchestration:** Keep a single agent; register new skills as tools to avoid multi-agent deployment overhead.

---

## 5. Frontend-Backend Data Contract
All itinerary updates must synchronize with the following structure:
```typescript
interface ItineraryItem {
  id: string;
  category: 'flight' | 'hotel' | 'ground' | 'dining' | 'wellness';
  time: string;
  title: string;
  detail: string;
  status: 'Confirmed' | 'Delayed' | 'Suggested' | 'Needs approval';
  kind: 'trip data' | 'suggestion';
}
```
Client actions sent from Vocal Bridge should send standard payloads matching this interface.
