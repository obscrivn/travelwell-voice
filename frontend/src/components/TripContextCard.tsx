import { Building2, CalendarDays, Car, Clock3, Compass, ListChecks, MapPin, PlaneTakeoff } from 'lucide-react';
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
        <span className="fixture-label connected-context-label">Connected account</span>
      </div>

      <div className="context-items-list">
        {context.flight ? (
          <article className="journey-flight-strip">
            <div className="journey-flight-topline">
              <div>
                <span className="journey-category-label"><PlaneTakeoff aria-hidden="true" /> American Airlines</span>
                <strong>{context.flight.flight_number}</strong>
              </div>
              <span className="journey-delay-label">Delayed by {context.flight.delay_minutes ?? 42} minutes</span>
            </div>

            <div className="journey-route-lockup">
              <div className="journey-airport">
                <strong>{context.flight.origin_code || 'IND'}</strong>
                <span>{context.flight.origin}</span>
                <time>{context.flight.departure_time || '4:58 PM'}</time>
              </div>
              <div className="journey-route-line" aria-hidden="true">
                <span />
                <svg viewBox="0 0 240 42" role="presentation">
                  <path d="M8 31 C72 4 166 4 232 31" />
                </svg>
                <PlaneTakeoff />
                <span />
              </div>
              <div className="journey-airport journey-airport-arrival">
                <strong>{context.flight.destination_code || 'ORD'}</strong>
                <span>{context.flight.destination}</span>
                <time>{context.flight.estimated_arrival || context.flight.eta}</time>
              </div>
            </div>

            <div className="journey-flight-meta">
              <span><Clock3 aria-hidden="true" /><small>Scheduled arrival</small><strong>{context.flight.scheduled_arrival || '5:58 PM'}</strong></span>
              <span><MapPin aria-hidden="true" /><small>Terminal & gate</small><strong>{context.flight.terminal || 'Terminal 3'} · {context.flight.gate || 'H15'}</strong></span>
              <span className="source-badge sabre-source">Sabre verified</span>
            </div>
          </article>
        ) : (
          <div className="context-row context-row-missing context-row-flight-missing">
            <div className="context-key-val">
              <span className="key"><CalendarDays size={16} /> Flight</span>
              <span className="val">Not available</span>
            </div>
            <span className="source-badge missing-source">Not available</span>
          </div>
        )}

        <div className="context-secondary-grid">
          <div className={`context-row context-row-hotel ${context.hotel ? 'context-row-provided' : 'context-row-missing'}`}>
            <span className="context-strip-icon"><Building2 aria-hidden="true" /></span>
            <div className="context-key-val">
              <span className="key">Hotel</span>
              <span className="val">{context.hotel ? context.hotel.name : 'Missing'}</span>
            </div>
            <span className={`source-badge ${context.hotel ? 'traveler-source' : 'missing-source'}`}>
              {context.hotel ? 'Provided by traveler' : 'Missing'}
            </span>
          </div>

          <div className={`context-row context-row-rental ${context.rental_car ? 'context-row-provided' : 'context-row-missing'}`}>
            <span className="context-strip-icon"><Car aria-hidden="true" /></span>
            <div className="context-key-val">
              <span className="key">Rental car</span>
              <span className="val">{context.rental_car ? context.rental_car.name : 'Missing'}</span>
            </div>
            <span className={`source-badge ${context.rental_car ? 'traveler-source' : 'missing-source'}`}>
              {context.rental_car ? 'Provided by traveler' : 'Missing'}
            </span>
          </div>

          <div className={`context-row context-row-ground ${context.ground_transport ? 'context-row-provided' : 'context-row-missing'}`}>
            <span className="context-strip-icon"><Compass aria-hidden="true" /></span>
            <div className="context-key-val">
              <span className="key">Ground transport</span>
              <span className="val">{context.ground_transport ? context.ground_transport.name : 'Missing'}</span>
            </div>
            <span className={`source-badge ${context.ground_transport ? 'traveler-source' : 'missing-source'}`}>
              {context.ground_transport ? 'Provided by traveler' : 'Missing'}
            </span>
          </div>

          <div className={`context-row context-row-priorities ${context.trip_priorities ? 'context-row-provided' : 'context-row-missing'}`}>
            <span className="context-strip-icon"><ListChecks aria-hidden="true" /></span>
            <div className="context-key-val">
              <span className="key">Trip priorities</span>
              <span className="val">{context.trip_priorities || 'Missing'}</span>
            </div>
            <span className={`source-badge ${context.trip_priorities ? 'traveler-source' : 'missing-source'}`}>
              {context.trip_priorities ? 'Provided by traveler' : 'Missing'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
