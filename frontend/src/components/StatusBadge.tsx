import type { TravelStatus, VoicePreviewState } from '../types/travel';

interface StatusBadgeProps {
  status: TravelStatus | VoicePreviewState;
  subtle?: boolean;
}

const statusClassName = (status: StatusBadgeProps['status']) =>
  status.toLowerCase().replace(/ /g, '-');

export function StatusBadge({ status, subtle = false }: StatusBadgeProps) {
  return (
    <span className={`status-badge status-${statusClassName(status)} ${subtle ? 'status-badge-subtle' : ''}`}>
      <span className="status-badge-dot" aria-hidden="true" />
      {status}
    </span>
  );
}
