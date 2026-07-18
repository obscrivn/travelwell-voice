import type { TranscriptMessage } from '../types/travel';

interface ConversationTranscriptProps {
  messages: TranscriptMessage[];
}

export function ConversationTranscript({ messages }: ConversationTranscriptProps) {
  return (
    <section className="conversation-panel" aria-labelledby="conversation-title">
      <div className="section-heading-row compact-heading-row">
        <div>
          <div className="eyebrow">Conversation</div>
          <h2 id="conversation-title">One request, shared trip context</h2>
        </div>
        <span className="conversation-count">{messages.length} messages</span>
      </div>

      <div className="transcript-list">
        {messages.length === 0 && (
          <div className="transcript-empty-state">
            Connect voice or use the text fallback to choose Chicago or Austin.
          </div>
        )}
        {messages.map((message) => (
          <article key={message.id} className={`transcript-message transcript-${message.speaker}`}>
            <div className="transcript-meta">
              <span>{message.speaker === 'traveler' ? 'You' : 'TravelWell Voice'}</span>
              <time>{message.time}</time>
            </div>
            <p>{message.text}</p>
            {message.marker && <span className="transcript-marker">{message.marker}</span>}
          </article>
        ))}
      </div>
    </section>
  );
}
