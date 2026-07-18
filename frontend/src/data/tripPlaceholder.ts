import type {
  ActionStatusItem,
  AgentActivityItem,
  ItineraryItem,
  TranscriptMessage,
  TripContext,
} from '../types/travel';

export const tripContext: TripContext = {
  origin: 'Indianapolis',
  destination: 'Chicago',
  dates: 'Jul 19–21',
  traveler: '1 traveler',
  arrivalWindow: 'Evening arrival',
  hotel: 'Downtown Chicago hotel',
  disruption: 'Flight arrival delayed by 1 hr 45 min',
  dataLabel: 'Demo trip data',
};

export const transcriptMessages: TranscriptMessage[] = [
  {
    id: 'message-1',
    speaker: 'traveler',
    text: 'My flight to Chicago is delayed. I still need a healthy dinner and a short indoor workout tonight.',
    time: '5:02 PM',
  },
  {
    id: 'message-2',
    speaker: 'assistant',
    text: 'I can reorganize the evening around the later arrival. I’ll keep the hotel fixed and prepare dinner, transport, and wellness suggestions for your approval.',
    time: '5:02 PM',
    marker: 'Preview response',
  },
  {
    id: 'message-3',
    speaker: 'traveler',
    text: 'Keep the workout under 45 minutes and indoors.',
    time: '5:03 PM',
  },
];

export const itineraryItems: ItineraryItem[] = [
  {
    id: 'flight',
    category: 'flight',
    time: '6:40 PM',
    title: 'Arrive in Chicago',
    detail: 'IND → ORD · estimated arrival in demo trip',
    status: 'Delayed',
    kind: 'trip data',
  },
  {
    id: 'ground',
    category: 'ground',
    time: '7:20 PM',
    title: 'Ground transport downtown',
    detail: 'Timing adjusted for the later arrival; no ride requested',
    status: 'Suggested',
    kind: 'suggestion',
  },
  {
    id: 'hotel',
    category: 'hotel',
    time: '8:05 PM',
    title: 'Downtown hotel check-in',
    detail: 'Existing hotel remains unchanged',
    status: 'Confirmed',
    kind: 'trip data',
  },
  {
    id: 'dining',
    category: 'dining',
    time: '8:30 PM',
    title: 'Healthy dinner nearby',
    detail: 'Shortlist can be prepared after timing is approved',
    status: 'Needs approval',
    kind: 'suggestion',
  },
  {
    id: 'wellness',
    category: 'wellness',
    time: '9:20 PM',
    title: 'Short indoor workout',
    detail: '30–45 minute option near the hotel',
    status: 'Suggested',
    kind: 'suggestion',
  },
];

export const actionStatusItems: ActionStatusItem[] = [
  {
    id: 'flight-action',
    category: 'flight',
    label: 'Flight',
    detail: 'Delayed arrival shown from demo trip context',
    status: 'Delayed',
  },
  {
    id: 'hotel-action',
    category: 'hotel',
    label: 'Hotel',
    detail: 'Existing stay; no change requested',
    status: 'Confirmed',
  },
  {
    id: 'ground-action',
    category: 'ground',
    label: 'Ground transport',
    detail: 'No ride has been requested',
    status: 'Suggested',
  },
  {
    id: 'dining-action',
    category: 'dining',
    label: 'Dining',
    detail: 'Healthy dinner preference captured',
    status: 'Needs approval',
  },
  {
    id: 'wellness-action',
    category: 'wellness',
    label: 'Wellness',
    detail: 'Existing TravelWell search is available below',
    status: 'Suggested',
  },
];

export const agentActivityItems: AgentActivityItem[] = [
  {
    id: 'sabre',
    label: 'Checking Sabre flight data',
    detail: 'Preview only · Sabre is not connected',
    state: 'active',
  },
  {
    id: 'hotel-timing',
    label: 'Evaluating hotel timing',
    detail: 'Using local demo trip context',
    state: 'queued',
  },
  {
    id: 'wellness-options',
    label: 'Finding wellness options',
    detail: 'Available through the existing search below',
    state: 'available',
  },
];
