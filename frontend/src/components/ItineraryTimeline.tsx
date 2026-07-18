import { Activity, BedDouble, Car, Dumbbell, Plane, Salad, ShoppingBag, TrainFront } from 'lucide-react';
import { useState } from 'react';
import type { ItineraryItem, TravelCategory } from '../types/travel';
import { StatusBadge } from './StatusBadge';

interface ItineraryTimelineProps {
  items: ItineraryItem[];
}

const categoryIcon: Record<TravelCategory, typeof Plane> = {
  flight: Plane,
  hotel: BedDouble,
  rental: Car,
  ground: TrainFront,
  dining: Salad,
  wellness: Dumbbell,
  activity: Activity,
  shopping: ShoppingBag,
};

export function ItineraryTimeline({ items }: ItineraryTimelineProps) {
  const [previewAction, setPreviewAction] = useState<{ itemId: string; action: string } | null>(null);

  return (
    <section className="itinerary-panel" aria-labelledby="itinerary-title">
      <div className="section-heading-row compact-heading-row">
        <div>
          <div className="eyebrow">Proposed itinerary · local preview</div>
          <h2 id="itinerary-title">A plan for your approval</h2>
        </div>
        <span className="itinerary-legend"><i /> Trip data <i /> Suggestions</span>
      </div>

      {previewAction && (
        <div className="itinerary-preview-feedback" role="status">
          Preview: “{previewAction.action}” would require approval. No external itinerary was changed.
        </div>
      )}

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
                <div className="itinerary-item-footer">
                  <span className="itinerary-kind">{item.kind}</span>
                  <div className="itinerary-preview-actions" aria-label={`Preview controls for ${item.title}`}>
                    {(item.kind === 'suggestion' ? ['Add to itinerary', 'Replace', 'Move'] : ['Remove', 'Replace', 'Move']).map((action) => (
                      <button
                        type="button"
                        key={action}
                        onClick={() => setPreviewAction({ itemId: item.id, action })}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
