import { ChevronDown, LockKeyhole } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

interface WorkflowSectionProps {
  step: number;
  title: string;
  description: string;
  state: 'available' | 'locked';
  defaultOpen?: boolean;
  openSignal?: string | null;
  children?: ReactNode;
}

export function WorkflowSection({
  step,
  title,
  description,
  state,
  defaultOpen = false,
  openSignal,
  children,
}: WorkflowSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    if (openSignal) setIsOpen(true);
  }, [openSignal]);

  if (state === 'locked') {
    return (
      <section className="workflow-section workflow-locked" aria-label={`${title} unavailable`}>
        <span className="workflow-step">{String(step).padStart(2, '0')}</span>
        <div><h2>{title}</h2><p>{description}</p></div>
        <span className="workflow-lock"><LockKeyhole aria-hidden="true" /> Complete the previous step</span>
      </section>
    );
  }

  return (
    <details
      className="workflow-section workflow-available"
      open={isOpen}
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
    >
      <summary>
        <span className="workflow-step">{String(step).padStart(2, '0')}</span>
        <div><h2>{title}</h2><p>{description}</p></div>
        <span className="workflow-toggle">View section <ChevronDown aria-hidden="true" /></span>
      </summary>
      <div className="workflow-content">{children}</div>
    </details>
  );
}
