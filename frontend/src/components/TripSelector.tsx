import type { UpcomingTrip } from '../types/travel';
import { Plane, Calendar } from 'lucide-react';

interface TripSelectorProps {
  trips: UpcomingTrip[];
  selectedTripId: string;
  onSelectTrip: (tripId: string) => void;
}

export function TripSelector({ trips, selectedTripId, onSelectTrip }: TripSelectorProps) {
  return (
    <section className="trip-selector-panel" aria-labelledby="trip-selector-title">
      <div className="section-heading-row compact-heading-row">
        <div>
          <div className="eyebrow">Visual fallback</div>
          <h2 id="trip-selector-title">Or select an upcoming trip</h2>
          <p>Voice is the primary path. These cards provide an accessible alternative.</p>
        </div>
      </div>

      <div className="trip-selector-grid">
        {trips.map((trip) => {
          const isSelected = trip.id === selectedTripId;
          return (
            <button
              key={trip.id}
              onClick={() => onSelectTrip(trip.id)}
              className={`trip-selector-card ${isSelected ? 'selected' : ''}`}
              type="button"
              aria-pressed={isSelected}
              aria-label={`Select ${trip.destination} trip, ${trip.dates}`}
            >
              <div className="card-header">
                <Plane aria-hidden="true" className="icon" />
                <span className="carrier">{trip.detectionLabel}</span>
                <span className="source-tag">{trip.status === 'Found' ? 'Sabre context' : 'Conversation'}</span>
              </div>
              <div className="card-body">
                <h3>{trip.destination}</h3>
                <div className="trip-meta">
                  <Calendar aria-hidden="true" size={14} />
                  <span>{trip.dates}</span>
                </div>
                <p className="trip-selector-context">{trip.context}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
