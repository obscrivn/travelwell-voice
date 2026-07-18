import { AlertTriangle, ArrowRight, Building2, CalendarDays, MapPin, UserRound } from 'lucide-react';
import type { TripContext } from '../types/travel';

interface TripContextCardProps {
  trip: TripContext;
}

export function TripContextCard({ trip }: TripContextCardProps) {
  return (
    <section className="trip-context-panel" aria-labelledby="trip-context-title">
      <div className="section-heading-row compact-heading-row">
        <div>
          <div className="eyebrow">Trip overview</div>
          <h2 id="trip-context-title">{trip.destination} · {trip.dates}</h2>
        </div>
        <span className="fixture-label">{trip.dataLabel}</span>
      </div>

      <div className="route-lockup">
        <div>
          <span>From</span>
          <strong>{trip.origin}</strong>
        </div>
        <ArrowRight aria-hidden="true" />
        <div>
          <span>To</span>
          <strong>{trip.destination}</strong>
        </div>
      </div>

      <dl className="trip-facts">
        <div><CalendarDays aria-hidden="true" /><dt>Arrival</dt><dd>{trip.arrivalWindow}</dd></div>
        <div><UserRound aria-hidden="true" /><dt>Travelers</dt><dd>{trip.traveler}</dd></div>
        <div><Building2 aria-hidden="true" /><dt>Stay</dt><dd>{trip.hotel}</dd></div>
        <div><MapPin aria-hidden="true" /><dt>Context</dt><dd>Downtown Chicago</dd></div>
      </dl>

      <div className="disruption-callout">
        <AlertTriangle aria-hidden="true" />
        <div>
          <span>Current disruption</span>
          <strong>{trip.disruption}</strong>
        </div>
      </div>
      <p className="data-separation-note">
        Trip details above are demo data. Suggested actions below have not been booked or completed.
      </p>
    </section>
  );
}
