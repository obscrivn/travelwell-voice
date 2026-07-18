import { BedDouble, Dumbbell, Plane, Salad, TrainFront } from 'lucide-react';
import type { ItineraryItem, TravelCategory } from '../types/travel';
import { StatusBadge } from './StatusBadge';

interface ItineraryTimelineProps {
  items: ItineraryItem[];
}

const categoryIcon: Record<TravelCategory, typeof Plane> = {
  flight: Plane,
  hotel: BedDouble,
  ground: TrainFront,
  dining: Salad,
  wellness: Dumbbell,
};

export function ItineraryTimeline({ items }: ItineraryTimelineProps) {
  return (
    <section className="itinerary-panel" aria-labelledby="itinerary-title">
      <div className="section-heading-row compact-heading-row">
        <div>
          <div className="eyebrow">Unified itinerary</div>
          <h2 id="itinerary-title">The evening, re-sequenced</h2>
        </div>
        <span className="itinerary-legend"><i /> Trip data <i /> Suggestions</span>
      </div>

      <ol className="itinerary-list">
        {items.map((item) => {
          const Icon = categoryIcon[item.category];
          return (
            <li key={item.id} className={`itinerary-item itinerary-${item.kind.replace(' ', '-')}`}>
              <time>{item.time}</time>
              <span className="itinerary-node"><Icon aria-hidden="true" /></span>
              <div className="itinerary-copy">
                <div className="itinerary-title-row">
                  <strong>{item.title}</strong>
                  <StatusBadge status={item.status} subtle />
                </div>
                <p>{item.detail}</p>
                <span className="itinerary-kind">{item.kind}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
