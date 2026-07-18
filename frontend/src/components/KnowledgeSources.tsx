import { Database, UserCheck, Mic, Globe } from 'lucide-react';

export function KnowledgeSources() {
  const sources = [
    {
      icon: Database,
      name: "Sabre trip data",
      desc: "Flight timing, airline, status and basic itinerary verified through Sabre GDS."
    },
    {
      icon: UserCheck,
      name: "Traveler Memory",
      desc: "Loyalty tiers, lounge memberships, dietary preferences, and wellness habits."
    },
    {
      icon: Mic,
      name: "Voice conversation",
      desc: "Active lodging, rental car pickup, and trip focus preferences gathered in real-time."
    },
    {
      icon: Globe,
      name: "External context",
      desc: "Google Places details, maps coordinates, local weather, and transit estimations."
    }
  ];

  return (
    <section className="knowledge-sources-panel" aria-labelledby="knowledge-title">
      <div className="section-heading-row compact-heading-row">
        <div>
          <div className="eyebrow">Personalization transparency</div>
          <h2 id="knowledge-title">How TravelWell knows</h2>
        </div>
      </div>
      <div className="sources-list">
        {sources.map((src, i) => {
          const Icon = src.icon;
          return (
            <div key={i} className="source-item">
              <span className="source-icon-wrap"><Icon aria-hidden="true" size={16} /></span>
              <div className="source-details">
                <strong>{src.name}</strong>
                <p>{src.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
