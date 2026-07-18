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
  | 'Not connected'
  | 'Available'
  | 'Needs details'
  | 'Found'
  | 'Time-sensitive';

export type TravelCategory =
  | 'flight'
  | 'hotel'
  | 'ground'
  | 'dining'
  | 'wellness'
  | 'rental'
  | 'activity'
  | 'shopping';

export interface TranscriptMessage {
  id: string;
  speaker: 'traveler' | 'assistant';
  text: string;
  time: string;
  marker?: string;
}

export interface TravelerProfile {
  travelerType: 'Business' | 'Leisure' | 'Both';
  airlineLoyalty: string;
  hotelLoyalty: string;
  loungeMemberships: string;
  dietaryPreferences: string[];
  wellnessHabits: string[];
  preferredRetailers: string;
  walkingTolerance: 'Short walks' | 'Up to 20 minutes' | 'Long walks welcome';
}

export interface UpcomingTrip {
  id: string;
  destination: string;
  dates: string;
  context: string;
  detectionLabel: string;
  status: TravelStatus;
  route?: string;
  airline?: string;
  flightNumber?: string;
  verificationLabel?: string;
  missingContext?: string;
  originCode?: string;
  destinationCode?: string;
}

export interface TripSummary {
  id: string;
  destination: string;
  start_date: string;
  end_date: string;
  primary_carrier?: string | null;
  source: 'sabre' | 'fixture' | 'traveler';
}

export interface TripContext {
  trip_id?: string;
  flight?: any;
  hotel?: any;
  rental_car?: any;
  ground_transport?: any;
  trip_priorities?: string | null;
  dining?: any;
  activities?: any[];
  missing_fields?: string[];
  origin?: string;
  destination?: string;
  dates?: string;
  traveler?: string;
  arrivalWindow?: string;
  disruption?: string;
  dataLabel?: string;
  accountDetection?: string;
  accountConnectionLabel?: string;
  segments?: any[];
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

export interface ApprovalAction {
  id: string;
  title?: string;
  explanation?: string;
  integrationLabel?: string;
  status: TravelStatus;
  actionLabel?: string;
  // Compatibility fields
  category?: TravelCategory;
  label?: string;
  detail?: string;
}

export type IntelligenceCategory =
  | 'lounge'
  | 'dining'
  | 'wellness'
  | 'weather'
  | 'retail'
  | 'ground'
  | 'rental'
  | 'workspace'
  | 'recovery';

export interface ProactiveRecommendation {
  id: string;
  category: IntelligenceCategory;
  status: TravelStatus;
  title: string;
  explanation: string;
  whyNow: string;
  travelerFit: string;
  contextLabel: string;
  confidence: 'verified' | 'provided' | 'inferred' | 'suggested' | 'High' | 'Medium' | 'Low';
  timing: string;
  actionLabel: string;
}
