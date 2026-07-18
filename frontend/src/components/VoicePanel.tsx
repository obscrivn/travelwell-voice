import { AlertCircle, Keyboard, Mic, MicOff } from 'lucide-react';
import type { VoicePreviewState } from '../types/travel';
import { StatusBadge } from './StatusBadge';

// Extended states: 'Ready' | 'Connecting' | 'Listening' | 'Thinking' | 'Speaking' | 'Error' | 'Disconnected'
export type ActiveVoiceState = VoicePreviewState | 'Disconnected';

interface VoicePanelProps {
  state: ActiveVoiceState;
  textValue: string;
  onTextChange: (value: string) => void;
  onMicPress: () => void;
  onDisconnect?: () => void;
}

const voiceStateCopy: Record<ActiveVoiceState, string> = {
  Ready: 'Start your voice conversation',
  Connecting: 'Establishing WebRTC session…',
  Listening: 'Say something, I am listening…',
  Thinking: 'Personalizing your travel recommendations…',
  Speaking: 'Speaking agent response…',
  Error: 'Session error. Typing fallback is active.',
  Disconnected: 'Session ended cleanly. Click mic to restart.',
};

export function VoicePanel({
  state,
  textValue,
  onTextChange,
  onMicPress,
  onDisconnect,
}: VoicePanelProps) {
  const isActive = state !== 'Ready' && state !== 'Disconnected' && state !== 'Error';

  return (
    <section className="voice-panel" aria-labelledby="voice-panel-title">
      <div className="section-heading-row">
        <div>
          <div className="eyebrow">Voice agent room</div>
          <h1 id="voice-panel-title">Coordinate hands-free</h1>
        </div>
        <StatusBadge status={state as any} />
      </div>

      <div className={`voice-stage voice-stage-${state.toLowerCase()}`} aria-live="polite">
        <button
          className="microphone-control"
          type="button"
          onClick={onMicPress}
          aria-label={isActive ? `Voice session is ${state}. Press to disconnect` : 'Start voice conversation'}
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

      {isActive && onDisconnect && (
        <div className="voice-actions-row">
          <button onClick={onDisconnect} className="disconnect-btn" type="button">
            Disconnect Session
          </button>
        </div>
      )}

      <div className="text-fallback">
        <div className="text-fallback-label">
          <Keyboard aria-hidden="true" />
          <label htmlFor="voice-text-fallback">Prefer to type?</label>
        </div>
        <textarea
          id="voice-text-fallback"
          value={textValue}
          onChange={(event) => onTextChange(event.target.value)}
          placeholder="Example: I'm staying at the Marriott Downtown and renting from Hertz."
          rows={3}
        />
        <div className="text-fallback-note">
          <AlertCircle aria-hidden="true" />
          Typing fallback sends updates straight to our travel intelligence engine.
        </div>
      </div>
    </section>
  );
}
