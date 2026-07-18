import { AlertCircle, Keyboard, Mic, MicOff, Sparkles } from 'lucide-react';
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
  tripDestination?: string | null;
}

const voiceStateCopy: Record<ActiveVoiceState, string> = {
  Ready: 'Start with what matters for this trip',
  Connecting: 'Connecting your private conversation…',
  Listening: 'Listening for trip and traveler context…',
  Thinking: 'Bringing trip data and Traveler Memory together…',
  Speaking: 'Sharing the next useful step…',
  Error: 'Session error. Typing fallback is active.',
  Disconnected: 'Session ended cleanly. Click mic to restart.',
};

export function VoicePanel({
  state,
  textValue,
  onTextChange,
  onMicPress,
  onDisconnect,
  tripDestination,
}: VoicePanelProps) {
  const isActive = state !== 'Ready' && state !== 'Disconnected' && state !== 'Error';
  const hasSelectedTrip = Boolean(tripDestination);

  return (
    <section className="voice-panel" aria-labelledby="voice-panel-title">
      <div className="section-heading-row">
        <div>
          <div className="eyebrow">Vocal Bridge conversation</div>
          <h1 id="voice-panel-title">Coordinate the change, out loud.</h1>
        </div>
        <StatusBadge status={state as any} />
      </div>

      <div className={`voice-stage voice-stage-${state.toLowerCase()}`} aria-live="polite">
        <div className="voice-orbit" aria-hidden="true">
          <span className="voice-route voice-route-one" />
          <span className="voice-route voice-route-two" />
          <span className="voice-particle voice-particle-one" />
          <span className="voice-particle voice-particle-two" />
          <span className="voice-particle voice-particle-three" />
        </div>
        <div className="microphone-visual">
          <span className="voice-waveform" aria-hidden="true">
            <i /><i /><i /><i /><i />
          </span>
          <button
            className="microphone-control"
            type="button"
            onClick={onMicPress}
            aria-label={isActive ? `Voice session is ${state}. Press to disconnect` : 'Start voice conversation'}
            aria-pressed={isActive}
          >
            <span className="microphone-ring microphone-ring-one" aria-hidden="true" />
            <span className="microphone-ring microphone-ring-two" aria-hidden="true" />
            <span className="microphone-ring microphone-ring-three" aria-hidden="true" />
            {state === 'Error' ? <MicOff aria-hidden="true" /> : <Mic aria-hidden="true" />}
          </button>
        </div>
        <div className="voice-stage-copy">
          <strong>{state}</strong>
          <span>{voiceStateCopy[state]}</span>
        </div>
        <div className="voice-context-line">
          <Sparkles aria-hidden="true" />
          {tripDestination
            ? `TravelWell is ready for your ${tripDestination} trip.`
            : 'TravelWell is ready to find the right trip with you.'}
        </div>
        <div className="voice-intelligence-feed" aria-label="Live travel intelligence status">
          <span className="voice-intelligence-item intelligence-active"><i />{hasSelectedTrip ? `Checking your ${tripDestination} trip…` : 'Checking connected trips…'}</span>
          <span className={`voice-intelligence-item ${hasSelectedTrip ? 'intelligence-verified' : ''}`}><i />{hasSelectedTrip ? 'AA100 verified' : 'Chicago and Austin found'}</span>
          <span className={`voice-intelligence-item ${hasSelectedTrip ? 'intelligence-alert' : ''}`}><i />{hasSelectedTrip ? 'Flight delayed 42 minutes' : 'Waiting for trip selection'}</span>
          <span className={`voice-intelligence-item ${hasSelectedTrip ? 'intelligence-missing' : ''}`}><i />{hasSelectedTrip ? 'Hotel still missing' : 'Voice is ready'}</span>
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
