import {
  BedSingle,
  BriefcaseBusiness,
  Car,
  Dumbbell,
  PlaneTakeoff,
  Salad,
  ShoppingBasket,
  TrainFront,
  Umbrella,
} from 'lucide-react';
import { useState } from 'react';
import type { IntelligenceCategory, ProactiveRecommendation } from '../types/travel';
import { StatusBadge } from './StatusBadge';

interface ProactiveRecommendationsProps {
  recommendations: ProactiveRecommendation[];
}

const categoryIcon: Record<IntelligenceCategory, typeof PlaneTakeoff> = {
  lounge: PlaneTakeoff,
  dining: Salad,
  wellness: Dumbbell,
  weather: Umbrella,
  retail: ShoppingBasket,
  ground: TrainFront,
  rental: Car,
  workspace: BriefcaseBusiness,
  recovery: BedSingle,
};

export function ProactiveRecommendations({ recommendations }: ProactiveRecommendationsProps) {
  const [previewedId, setPreviewedId] = useState<string | null>(null);

  return (
    <section className="recommendation-section" aria-labelledby="recommendations-title">
      <div className="intelligence-section-heading">
        <div>
          <div className="eyebrow">Travel Intelligence Cards</div>
          <h2 id="recommendations-title">What TravelWell has learned so far</h2>
          <p>Each card shows the discovery, its source, and the context still needed before TravelWell can act confidently.</p>
        </div>
        <span>TravelWell intelligence</span>
      </div>

      <div className="how-travelwell-knows" aria-labelledby="how-travelwell-knows-title">
        <div><span className="knowledge-source sabre-source">S</span><p><strong id="how-travelwell-knows-title">How TravelWell knows</strong><small>Transparent context, not hidden assumptions</small></p></div>
        <div><span className="knowledge-source sabre-source">S</span><p><strong>Sabre</strong><small>Flight and trip context</small></p></div>
        <div><span className="knowledge-source memory-source">M</span><p><strong>Traveler Memory</strong><small>Persistent preferences and habits</small></p></div>
        <div><span className="knowledge-source conversation-source">C</span><p><strong>Conversation</strong><small>Details you share in the moment</small></p></div>
        <div><span className="knowledge-source external-source">E</span><p><strong>External integrations</strong><small>Availability and actions · not connected</small></p></div>
      </div>

      <div className="recommendation-grid">
        {recommendations.map((recommendation) => {
          const Icon = categoryIcon[recommendation.category];
          const isPreviewed = previewedId === recommendation.id;
          return (
            <article key={recommendation.id} className={`recommendation-card recommendation-category-${recommendation.category}`}>
              <div className="recommendation-card-topline">
                <span className="recommendation-icon"><Icon aria-hidden="true" /></span>
                <StatusBadge status={recommendation.status} subtle />
              </div>
              <div>
                <h3>{recommendation.title}</h3>
                <span className="intelligence-card-label">What was discovered</span>
                <p>{recommendation.explanation}</p>
              </div>
              <div className="why-now">
                <span>Why it matters now</span>
                <p>{recommendation.whyNow}</p>
              </div>
              <div className="traveler-fit">
                <span>Why it fits you</span>
                <p>{recommendation.travelerFit}</p>
              </div>
              <div className="recommendation-context">
                <span><small>Source</small>{recommendation.contextLabel}</span>
                <strong><small>Confidence</small>{recommendation.confidence}</strong>
              </div>
              <div className="recommendation-urgency"><span>Urgency</span><strong>{recommendation.timing}</strong></div>
              <button type="button" onClick={() => setPreviewedId(recommendation.id)}>
                Next action · {recommendation.actionLabel}
              </button>
              {isPreviewed && (
                <div className="preview-feedback" role="status">
                  Preview only — no call, booking, or trip change was made.
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
