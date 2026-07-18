import { AlertCircle, Keyboard, Mic, MicOff } from 'lucide-react';
import type { VoicePreviewState } from '../types/travel';
import { StatusBadge } from './StatusBadge';

interface VoicePanelProps {
  state: VoicePreviewState;
  textValue: string;
  onTextChange: (value: string) => void;
  onMicPress: () => void;
  onPreviewStateChange: (state: VoicePreviewState) => void;
}

const voiceStateCopy: Record<VoicePreviewState, string> = {
  Ready: 'Tell me what changed with your trip',
  Connecting: 'Preparing the local voice preview…',
  Listening: 'Listening for your trip update…',
  Thinking: 'Organizing the request and trip context…',
  Speaking: 'Presenting a preview response…',
  Error: 'The preview could not connect. You can still type below.',
};

const previewStates: VoicePreviewState[] = [
  'Ready',
  'Connecting',
  'Listening',
  'Thinking',
  'Speaking',
  'Error',
];

export function VoicePanel({
  state,
  textValue,
  onTextChange,
  onMicPress,
  onPreviewStateChange,
}: VoicePanelProps) {
  const isActive = state !== 'Ready' && state !== 'Error';

  return (
    <section className="voice-panel" aria-labelledby="voice-panel-title">
      <div className="section-heading-row">
        <div>
          <div className="eyebrow">Voice preview</div>
          <h1 id="voice-panel-title">Coordinate the change, out loud.</h1>
        </div>
        <StatusBadge status={state} />
      </div>

      <div className={`voice-stage voice-stage-${state.toLowerCase()}`} aria-live="polite">
        <button
          className="microphone-control"
          type="button"
          onClick={onMicPress}
          aria-label={isActive ? `Voice preview is ${state}. Advance preview state` : 'Start local voice preview'}
          aria-pressed={isActive}
        >
          <span className="microphone-ring microphone-ring-one" aria-hidden="true" />
          <span className="microphone-ring microphone-ring-two" aria-hidden="true" />
          {state === 'Error' ? <MicOff aria-hidden="true" /> : <Mic aria-hidden="true" />}
        </button>
        <div className="voice-stage-copy">
          <strong>{state}</strong>
          <span>{voiceStateCopy[state]}</span>
        </div>
      </div>

      <div className="preview-state-control">
        <label htmlFor="voice-preview-state">Preview state</label>
        <select
          id="voice-preview-state"
          value={state}
          onChange={(event) => onPreviewStateChange(event.target.value as VoicePreviewState)}
        >
          {previewStates.map((previewState) => (
            <option key={previewState} value={previewState}>{previewState}</option>
          ))}
        </select>
        <span>Local UI states only · no audio is captured</span>
      </div>

      <div className="text-fallback">
        <div className="text-fallback-label">
          <Keyboard aria-hidden="true" />
          <label htmlFor="voice-text-fallback">Prefer to type?</label>
        </div>
        <textarea
          id="voice-text-fallback"
          value={textValue}
          onChange={(event) => onTextChange(event.target.value)}
          placeholder="Example: Keep dinner healthy and make the workout no longer than 45 minutes."
          rows={3}
        />
        <div className="text-fallback-note">
          <AlertCircle aria-hidden="true" />
          This updates your trip preferences. It does not book or change travel.
        </div>
      </div>
    </section>
  );
}
