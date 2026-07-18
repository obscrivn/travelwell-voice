import { Check, Link2, Pencil, ShieldCheck, UserRound } from 'lucide-react';
import { useState } from 'react';
import type { TravelerProfile } from '../types/travel';

interface TravelerProfileSetupProps {
  profile: TravelerProfile;
  isComplete: boolean;
  onSave: (profile: TravelerProfile) => void;
  onEdit: () => void;
}

const dietaryOptions = ['High-protein', 'Vegetable-forward', 'Vegetarian', 'Gluten-aware'];
const wellnessOptions = ['Short indoor workouts', 'Hotel pool', 'Morning walks', 'Recovery time'];

const toggleValue = (values: string[], value: string) =>
  values.includes(value) ? values.filter((item) => item !== value) : [...values, value];

export function TravelerProfileSetup({ profile, isComplete, onSave, onEdit }: TravelerProfileSetupProps) {
  const [draft, setDraft] = useState(profile);
  const [connectionPreview, setConnectionPreview] = useState<string | null>(null);

  if (isComplete) {
    return (
      <section className="traveler-profile-card" aria-labelledby="traveler-profile-title">
        <div className="profile-card-lead">
          <span className="profile-avatar"><UserRound aria-hidden="true" /></span>
          <div>
            <div className="eyebrow">Traveler Memory</div>
            <h2 id="traveler-profile-title">Your preferences can travel with you</h2>
            <p>{profile.travelerType} travel · {profile.walkingTolerance.toLowerCase()}</p>
          </div>
        </div>
        <div className="profile-summary-items">
          <span><strong>Loyalty</strong>{profile.airlineLoyalty} · {profile.hotelLoyalty}</span>
          <span><strong>Food</strong>{profile.dietaryPreferences.join(', ')}</span>
          <span><strong>Wellness</strong>{profile.wellnessHabits.join(', ')}</span>
          <span><strong>Retail</strong>{profile.preferredRetailers}</span>
        </div>
        <button type="button" className="profile-edit-button" onClick={onEdit}>
          <Pencil aria-hidden="true" /> Edit
        </button>
      </section>
    );
  }

  return (
    <section className="traveler-setup" aria-labelledby="traveler-setup-title">
      <div className="setup-intro">
        <div className="setup-step-number">01</div>
        <div>
          <div className="eyebrow">Traveler Memory setup · local preview</div>
          <h2 id="traveler-setup-title">Let’s build your Traveler Memory.</h2>
          <p>These preferences are designed to persist across trips so TravelWell can learn through conversation. This demo remains local and nothing is connected or shared.</p>
        </div>
      </div>

      <form className="traveler-setup-form" onSubmit={(event) => { event.preventDefault(); onSave(draft); }}>
        <fieldset className="setup-fieldset traveler-type-fieldset">
          <legend>Traveler type</legend>
          <div className="setup-choice-row">
            {(['Business', 'Leisure', 'Both'] as const).map((type) => (
              <label key={type} className={draft.travelerType === type ? 'selected' : ''}>
                <input
                  type="radio"
                  name="traveler-type"
                  value={type}
                  checked={draft.travelerType === type}
                  onChange={() => setDraft({ ...draft, travelerType: type })}
                />
                {draft.travelerType === type && <Check aria-hidden="true" />}{type}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="setup-input-grid">
          <label>Airline loyalty<input value={draft.airlineLoyalty} onChange={(event) => setDraft({ ...draft, airlineLoyalty: event.target.value })} /></label>
          <label>Hotel loyalty<input value={draft.hotelLoyalty} onChange={(event) => setDraft({ ...draft, hotelLoyalty: event.target.value })} /></label>
          <label>Lounge memberships<input value={draft.loungeMemberships} onChange={(event) => setDraft({ ...draft, loungeMemberships: event.target.value })} /></label>
          <label>Preferred retailers<input value={draft.preferredRetailers} onChange={(event) => setDraft({ ...draft, preferredRetailers: event.target.value })} /></label>
        </div>

        <div className="setup-preference-grid">
          <fieldset className="setup-fieldset">
            <legend>Dietary preferences</legend>
            <div className="setup-check-grid">
              {dietaryOptions.map((option) => (
                <label key={option} className={draft.dietaryPreferences.includes(option) ? 'selected' : ''}>
                  <input
                    type="checkbox"
                    checked={draft.dietaryPreferences.includes(option)}
                    onChange={() => setDraft({ ...draft, dietaryPreferences: toggleValue(draft.dietaryPreferences, option) })}
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="setup-fieldset">
            <legend>Workout and wellness habits</legend>
            <div className="setup-check-grid">
              {wellnessOptions.map((option) => (
                <label key={option} className={draft.wellnessHabits.includes(option) ? 'selected' : ''}>
                  <input
                    type="checkbox"
                    checked={draft.wellnessHabits.includes(option)}
                    onChange={() => setDraft({ ...draft, wellnessHabits: toggleValue(draft.wellnessHabits, option) })}
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <label className="walking-tolerance-label">
          Walking tolerance
          <select
            value={draft.walkingTolerance}
            onChange={(event) => setDraft({ ...draft, walkingTolerance: event.target.value as TravelerProfile['walkingTolerance'] })}
          >
            <option>Short walks</option>
            <option>Up to 20 minutes</option>
            <option>Long walks welcome</option>
          </select>
        </label>

        <div className="account-connections">
          <div className="account-connections-heading">
            <div><Link2 aria-hidden="true" /><span><strong>Optional account connections</strong><small>Preview placeholders only</small></span></div>
            <span>Not connected</span>
          </div>
          <div className="connection-options">
            {['American Airlines', 'Marriott Bonvoy', 'Calendar'].map((account) => (
              <button type="button" key={account} onClick={() => setConnectionPreview(account)}>
                Connect {account}<span>Preview</span>
              </button>
            ))}
          </div>
          {connectionPreview && <p role="status">{connectionPreview} connection is a UI preview. No account was connected.</p>}
        </div>

        <div className="setup-submit-row">
          <span><ShieldCheck aria-hidden="true" /> Stored only in this page preview</span>
          <button type="submit">Use this demo profile</button>
        </div>
      </form>
    </section>
  );
}
