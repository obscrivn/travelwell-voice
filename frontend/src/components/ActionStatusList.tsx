import { BedDouble, CircleDot, Dumbbell, Plane, Salad, TrainFront } from 'lucide-react';
import type { ActionStatusItem, AgentActivityItem, TravelCategory } from '../types/travel';
import { StatusBadge } from './StatusBadge';

interface ActionStatusListProps {
  actions: ActionStatusItem[];
  activity: AgentActivityItem[];
}

const categoryIcon: Record<TravelCategory, typeof Plane> = {
  flight: Plane,
  hotel: BedDouble,
  ground: TrainFront,
  dining: Salad,
  wellness: Dumbbell,
};

export function ActionStatusList({ actions, activity }: ActionStatusListProps) {
  return (
    <section className="action-panel" aria-labelledby="action-status-title">
      <div className="section-heading-row compact-heading-row">
        <div>
          <div className="eyebrow">Action status</div>
          <h2 id="action-status-title">Nothing happens without approval</h2>
        </div>
      </div>

      <div className="action-status-list">
        {actions.map((action) => {
          const Icon = categoryIcon[action.category];
          return (
            <div key={action.id} className="action-status-row">
              <span className="action-icon"><Icon aria-hidden="true" /></span>
              <div className="action-copy">
                <strong>{action.label}</strong>
                <span>{action.detail}</span>
              </div>
              <StatusBadge status={action.status} subtle />
            </div>
          );
        })}
      </div>

      <div className="agent-activity" aria-labelledby="agent-activity-title">
        <div className="agent-activity-heading">
          <div>
            <div className="eyebrow">Agent activity</div>
            <h3 id="agent-activity-title">Visible orchestration</h3>
          </div>
          <span>Integration preview</span>
        </div>
        <div className="agent-activity-list">
          {activity.map((item) => (
            <div key={item.id} className={`agent-activity-item activity-${item.state}`}>
              <CircleDot aria-hidden="true" />
              <div>
                <strong>{item.label}</strong>
                <span>{item.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
