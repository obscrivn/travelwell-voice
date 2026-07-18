import type { UpcomingTrip } from '../types/travel';
import { Calendar, Check, CircleAlert, Plane } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

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
              className={`trip-selector-card trip-card-${trip.id} ${isSelected ? 'selected is-selected' : 'is-unselected'}`}
              type="button"
              aria-pressed={isSelected}
              aria-label={`Select ${trip.destination} trip, ${trip.dates}`}
            >
              <div className="card-header">
                <span className="trip-discovery-label"><Plane aria-hidden="true" className="icon" />{trip.detectionLabel}</span>
                <span className="trip-card-state">
                  {isSelected && <span className="trip-selected-indicator"><Check aria-hidden="true" />Selected trip</span>}
                  <span className={`source-tag ${trip.verificationLabel === 'Sabre verified' ? 'source-tag-verified' : ''}`}>
                    {trip.verificationLabel}
                  </span>
                </span>
              </div>
              <div className="trip-ticket-route" aria-hidden="true">
                <strong>{trip.originCode || 'IND'}</strong>
                <span className="trip-ticket-route-line">
                  <svg viewBox="0 0 180 32" role="presentation">
                    <path d="M4 24 C50 2 126 2 176 24" />
                    <circle cx="4" cy="24" r="3" />
                    <circle cx="176" cy="24" r="3" />
                  </svg>
                  <Plane />
                </span>
                <strong>{trip.destinationCode || trip.destination.slice(0, 3).toUpperCase()}</strong>
              </div>
              <div className="card-body">
                <div className="trip-card-title-row">
                  <div>
                    <span className="trip-airline">{trip.airline}</span>
                    <h3>{trip.destination}</h3>
                  </div>
                  <StatusBadge status={trip.status} subtle />
                </div>
                <div className="trip-card-facts">
                  {trip.flightNumber && <strong>{trip.flightNumber}</strong>}
                  <span>{trip.context}</span>
                  <span><Calendar aria-hidden="true" size={14} />{trip.dates}</span>
                </div>
                <p className="trip-selector-context"><CircleAlert aria-hidden="true" />{trip.missingContext}</p>
              </div>
              <div className="trip-city-art" aria-hidden="true">
                {trip.id === 'chicago' ? (
                  <svg viewBox="0 0 420 92" role="presentation">
                    <path d="M4 84H416M28 84V60H48V84M58 84V44H74V84M88 84V55H106V84M122 84V28H138V84M148 84V46H167V84M180 84V18H192V84M205 84V50H228V84M244 84V35H260V84M274 84V58H294V84M310 84V42H330V84M345 84V62H370V84M382 84V51H402V84" />
                    <path d="M186 18V4M181 9H197" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 420 92" role="presentation">
                    <path d="M4 84H416M24 84L44 58L64 84M72 84V46H92V84M108 84V63H142V84M154 84V35H174V84M190 84V55H214V84M228 84V42H250V84M266 84V61H300V84M314 84V49H342V84M356 84L376 59L396 84" />
                    <path d="M38 58H50M366 59H386M232 29C239 21 249 21 256 29" />
                  </svg>
                )}
                <span>{trip.id === 'chicago' ? 'CHI · LAKEFRONT' : 'ATX · HILL COUNTRY'}</span>
              </div>
              <span className="trip-ticket-notch trip-ticket-notch-top" aria-hidden="true" />
              <span className="trip-ticket-notch trip-ticket-notch-bottom" aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </section>
  );
}
