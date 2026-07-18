import { ArrowRight, CalendarDays, MapPin, Plus } from 'lucide-react';
import { useState } from 'react';
import type { UpcomingTrip } from '../types/travel';

interface SelectCurrentTripProps {
  trips: UpcomingTrip[];
  selectedTripId: string | null;
  onSelect: (tripId: string) => void;
}

export function SelectCurrentTrip({ trips, selectedTripId, onSelect }: SelectCurrentTripProps) {
  const [otherTrip, setOtherTrip] = useState('');

  return (
    <section className="trip-selector" aria-labelledby="trip-selector-title">
      <div className="trip-selector-heading">
        <div>
          <div className="eyebrow">Upcoming trips · local demo</div>
          <h2 id="trip-selector-title">Which trip should TravelWell understand?</h2>
          <p>Select discovered context or describe another trip. No travel account is actually connected.</p>
        </div>
        {selectedTripId && <span>Current trip selected</span>}
      </div>

      <div className="upcoming-trip-list">
        {trips.map((trip) => (
          <button
            type="button"
            key={trip.id}
            className={selectedTripId === trip.id ? 'selected' : ''}
            onClick={() => onSelect(trip.id)}
          >
            <span className="trip-found-label">{trip.detectionLabel}</span>
            <strong>{trip.destination}</strong>
            <span className="trip-route"><MapPin aria-hidden="true" />{trip.route}</span>
            <span className="trip-dates"><CalendarDays aria-hidden="true" />{trip.dates}</span>
            <small>{trip.context}</small>
            <span className="trip-select-action">Use this trip <ArrowRight aria-hidden="true" /></span>
          </button>
        ))}
      </div>

      <form
        className="other-trip-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (otherTrip.trim()) onSelect('custom');
        }}
      >
        <Plus aria-hidden="true" />
        <label htmlFor="other-trip">Tell me about another trip</label>
        <input
          id="other-trip"
          value={otherTrip}
          onChange={(event) => setOtherTrip(event.target.value)}
          placeholder="Destination, dates, or anything you already know…"
        />
        <button type="submit" disabled={!otherTrip.trim()}>Use conversation context</button>
      </form>
      {selectedTripId === 'custom' && (
        <p className="custom-trip-feedback" role="status">
          Conversation context selected: “{otherTrip}”. Missing details will remain visible until you provide them.
        </p>
      )}
    </section>
  );
}
