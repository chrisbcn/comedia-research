import { ARTIFACT_TYPES } from '../artifactTypes.js';
import { AGENT_PROFILES } from '../agentProfiles.js';

function Section({ label, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ margin: '0 0 10px', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
        {label}
      </p>
      {children}
    </div>
  );
}

export default function AgentProfileModal({ agent, onClose }) {
  const profile = AGENT_PROFILES[agent.id];
  if (!profile) return null;

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 300, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 20px', overflowY: 'auto' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ width: '100%', maxWidth: 640, background: '#1A1A18', borderRadius: 14, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}>

        {/* Header */}
        <div style={{ padding: '22px 26px 20px', borderBottom: '0.5px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: agent.colorLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <i className={`ti ${agent.icon}`} style={{ fontSize: 20, color: agent.color }} aria-hidden="true" />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: '0 0 3px', fontSize: 17, fontWeight: 600, color: 'rgba(255,255,255,0.92)' }}>{agent.name}</h2>
            <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>{profile.role}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close agent profile"
            style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 6, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}
          >
            <i className="ti ti-x" style={{ fontSize: 13 }} aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '26px 26px 30px' }}>

          <Section label="What they do">
            {profile.what.split('\n\n').map((para, i) => (
              <p key={i} style={{ margin: '0 0 10px', fontSize: 13, color: 'rgba(255,255,255,0.62)', lineHeight: 1.7 }}>{para}</p>
            ))}
          </Section>

          <Section label="Why they're on the team">
            {profile.why.split('\n\n').map((para, i) => (
              <p key={i} style={{ margin: '0 0 10px', fontSize: 13, color: 'rgba(255,255,255,0.62)', lineHeight: 1.7 }}>{para}</p>
            ))}
          </Section>

          <Section label="Subject matter expertise">
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {profile.sme.map((item, i) => {
                const [bold, ...rest] = item.split(' — ');
                return (
                  <li key={i} style={{ display: 'flex', gap: 9, marginBottom: 7, fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
                    <span style={{ color: agent.color, flexShrink: 0, marginTop: 1 }}>→</span>
                    <span>
                      <strong style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{bold}</strong>
                      {rest.length > 0 && <span style={{ color: 'rgba(255,255,255,0.4)' }}> — {rest.join(' — ')}</span>}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Section>

          <Section label="Outputs">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
              {profile.outputs.map(type => {
                const ti = ARTIFACT_TYPES[type] || ARTIFACT_TYPES.GENERAL;
                return (
                  <span key={type} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.04em', padding: '3px 8px', borderRadius: 4, background: ti.bg, color: ti.color, border: `0.5px solid ${ti.color}30` }}>
                    {type}
                  </span>
                );
              })}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {profile.outputs.map(type => {
                const note = profile.outputNotes?.[type];
                const ti = ARTIFACT_TYPES[type] || ARTIFACT_TYPES.GENERAL;
                if (!note) return null;
                return (
                  <div key={type} style={{ display: 'flex', gap: 9, fontSize: 12, lineHeight: 1.5 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 5px', borderRadius: 3, background: ti.bg, color: ti.color, whiteSpace: 'nowrap', alignSelf: 'flex-start', marginTop: 1 }}>
                      {type}
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.45)' }}>{note}</span>
                  </div>
                );
              })}
            </div>
          </Section>

          <Section label="When to use">
            <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.62)', lineHeight: 1.7 }}>{profile.when}</p>
          </Section>

        </div>
      </div>
    </div>
  );
}
