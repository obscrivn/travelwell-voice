export type VoicePreviewState =
  | 'Ready'
  | 'Connecting'
  | 'Listening'
  | 'Thinking'
  | 'Speaking'
  | 'Error';

export type TravelStatus =
  | 'Confirmed'
  | 'Delayed'
  | 'Suggested'
  | 'Needs approval'
  | 'Not connected';

export type TravelCategory =
  | 'flight'
  | 'hotel'
  | 'ground'
  | 'dining'
  | 'wellness';

export interface TranscriptMessage {
  id: string;
  speaker: 'traveler' | 'assistant';
  text: string;
  time: string;
  marker?: string;
}

export interface TripContext {
  origin: string;
  destination: string;
  dates: string;
  traveler: string;
  arrivalWindow: string;
  hotel: string;
  disruption: string;
  dataLabel: string;
}

export interface ItineraryItem {
  id: string;
  category: TravelCategory;
  time: string;
  title: string;
  detail: string;
  status: TravelStatus;
  kind: 'trip data' | 'suggestion';
}

export interface ActionStatusItem {
  id: string;
  category: TravelCategory;
  label: string;
  detail: string;
  status: TravelStatus;
}

export interface AgentActivityItem {
  id: string;
  label: string;
  detail: string;
  state: 'active' | 'queued' | 'available';
}
