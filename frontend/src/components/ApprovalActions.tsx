import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import type { ApprovalAction } from '../types/travel';
import { StatusBadge } from './StatusBadge';

interface ApprovalActionsProps {
  actions: ApprovalAction[];
}

export function ApprovalActions({ actions }: ApprovalActionsProps) {
  const [previewedId, setPreviewedId] = useState<string | null>(null);

  return (
    <section className="approval-section" aria-labelledby="approval-actions-title">
      <div className="approval-heading">
        <div className="approval-heading-icon"><ShieldCheck aria-hidden="true" /></div>
        <div>
          <div className="eyebrow">Actions requiring approval</div>
          <h2 id="approval-actions-title">Ready when you decide</h2>
          <p>These controls demonstrate potential actions. Integrations are local previews unless explicitly marked otherwise.</p>
        </div>
      </div>

      <div className="approval-list">
        {actions.map((action) => {
          const isPreviewed = previewedId === action.id;
          return (
            <div key={action.id} className="approval-row">
              <div className="approval-copy">
                <strong>{action.title}</strong>
                <span>{action.explanation}</span>
                <small>{action.integrationLabel}</small>
              </div>
              <StatusBadge status={action.status} subtle />
              <button type="button" onClick={() => setPreviewedId(action.id)}>
                {action.actionLabel}<ArrowUpRight aria-hidden="true" />
              </button>
              {isPreviewed && (
                <div className="approval-preview-feedback" role="status">
                  No action taken. A connected integration and your explicit approval would be required.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
