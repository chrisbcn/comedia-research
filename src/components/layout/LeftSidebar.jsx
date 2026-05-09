import { AGENTS } from '../../agents.js';

const PERSONAS = [
  ['Advisor',    'Senior wealth advisor',    '#1D9E75'],
  ['Associate',  'Deep practitioner',        '#378ADD'],
  ['Specialist', 'T&E authority, JD',        '#534AB7'],
  ['End Client', 'HNW individual',           '#BA7517'],
];

export default function LeftSidebar({ activeAgent, convos, artifacts, diagrams, onSelectAgent }) {
  return (
    <div style={{ width: 216, background: '#1A1A18', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      {/* Brand bar */}
      <div style={{ padding: '13px 13px 9px', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#1D9E75' }} />
          <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
            Comedia × Vanilla
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>Discovery Platform</p>
      </div>

      {/* Agents */}
      <div style={{ padding: '9px 7px', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
        <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.22)', margin: '0 0 5px 8px', textTransform: 'uppercase' }}>Agents</p>
        {Object.values(AGENTS).map(ag => {
          const active = activeAgent === ag.id;
          const n = Math.floor((convos[ag.id]?.length || 0) / 2);
          return (
            <button
              key={ag.id}
              onClick={() => onSelectAgent(ag.id)}
              aria-pressed={active}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '6px 8px',
                borderRadius: 6,
                border: 'none',
                marginBottom: 1,
                background: active ? `${ag.color}18` : 'transparent',
                color: active ? ag.color : 'rgba(255,255,255,0.42)',
                textAlign: 'left',
              }}
            >
              <i className={`ti ${ag.icon}`} style={{ fontSize: 14, flexShrink: 0 }} aria-hidden="true" />
              <span style={{ fontSize: 11, flex: 1 }}>{ag.name}</span>
              {n > 0 && (
                <span style={{
                  fontSize: 9,
                  fontWeight: 600,
                  background: active ? ag.color : 'rgba(255,255,255,0.1)',
                  color: active ? 'white' : 'rgba(255,255,255,0.35)',
                  borderRadius: 8,
                  padding: '1px 5px',
                }}>
                  {n}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Project stats */}
      <div style={{ padding: '9px 13px', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
        <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.22)', margin: '0 0 5px', textTransform: 'uppercase' }}>Project</p>
        {[['Phase', 'Wk 1–2: Discovery'], ['Artifacts', artifacts.length], ['Diagrams', diagrams.length]].map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.27)' }}>{label}</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)' }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Personas */}
      <div style={{ padding: '9px 13px', flex: 1, overflowY: 'auto' }}>
        <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.22)', margin: '0 0 7px', textTransform: 'uppercase' }}>Personas</p>
        {PERSONAS.map(([name, subtitle, color]) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 7 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: color, flexShrink: 0 }} />
            <div>
              <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>{name}</p>
              <p style={{ margin: 0, fontSize: 9, color: 'rgba(255,255,255,0.22)' }}>{subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
