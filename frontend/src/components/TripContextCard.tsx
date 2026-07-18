import { Building2, CalendarDays, Car, Compass, ListChecks } from 'lucide-react';
import type { TripContext } from '../types/travel';

interface TripContextCardProps {
  context: TripContext | null;
}

export function TripContextCard({ context }: TripContextCardProps) {
  if (!context) {
    return (
      <section className="trip-context-panel trip-context-empty" aria-labelledby="trip-context-title">
        <div className="section-heading-row compact-heading-row">
          <div>
            <div className="eyebrow">Trip overview</div>
            <h2 id="trip-context-title">Current Trip</h2>
          </div>
          <span className="fixture-label">Waiting for context</span>
        </div>
        <p>Choose a trip by voice or select one below.</p>
      </section>
    );
  }

  const destination = context.destination || context.flight?.destination || 'Selected trip';

  return (
    <section className="trip-context-panel" aria-labelledby="trip-context-title">
      <div className="section-heading-row compact-heading-row">
        <div>
          <div className="eyebrow">Trip overview</div>
          <h2 id="trip-context-title">{destination} travel context</h2>
        </div>
        <span className="fixture-label">Active Trip Context</span>
      </div>

      <div className="context-items-list">
        {/* Flight */}
        <div className="context-row">
          <div className="context-key-val">
            <span className="key"><CalendarDays size={16} /> Flight status</span>
            <span className="val">{context.flight ? `${context.flight.flight_number} (${context.flight.status})` : 'Not available'}</span>
          </div>
          <span className={`source-badge ${context.flight ? 'sabre-source' : 'missing-source'}`}>
            {context.flight ? 'Sabre verified' : 'Not available'}
          </span>
        </div>

        {/* Hotel */}
        <div className="context-row">
          <div className="context-key-val">
            <span className="key"><Building2 size={16} /> Stay (Hotel)</span>
            <span className="val">{context.hotel ? context.hotel.name : 'Missing'}</span>
          </div>
          <span className={`source-badge ${context.hotel ? 'traveler-source' : 'missing-source'}`}>
            {context.hotel ? 'Provided by traveler' : 'Missing'}
          </span>
        </div>

        {/* Rental Car */}
        <div className="context-row">
          <div className="context-key-val">
            <span className="key"><Car size={16} /> Rental car</span>
            <span className="val">{context.rental_car ? context.rental_car.name : 'Missing'}</span>
          </div>
          <span className={`source-badge ${context.rental_car ? 'traveler-source' : 'missing-source'}`}>
            {context.rental_car ? 'Provided by traveler' : 'Missing'}
          </span>
        </div>

        {/* Ground transportation */}
        <div className="context-row">
          <div className="context-key-val">
            <span className="key"><Compass size={16} /> Ground transportation</span>
            <span className="val">{context.ground_transport ? context.ground_transport.name : 'Missing'}</span>
          </div>
          <span className={`source-badge ${context.ground_transport ? 'traveler-source' : 'missing-source'}`}>
            {context.ground_transport ? 'Provided by traveler' : 'Missing'}
          </span>
        </div>

        {/* Trip priorities */}
        <div className="context-row">
          <div className="context-key-val">
            <span className="key"><ListChecks size={16} /> Trip priorities</span>
            <span className="val">{context.trip_priorities || 'Missing'}</span>
          </div>
          <span className={`source-badge ${context.trip_priorities ? 'traveler-source' : 'missing-source'}`}>
            {context.trip_priorities ? 'Provided by traveler' : 'Missing'}
          </span>
        </div>
      </div>
    </section>
  );
}
