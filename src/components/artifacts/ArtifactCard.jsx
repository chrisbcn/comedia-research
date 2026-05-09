import { ARTIFACT_TYPES } from '../../artifactTypes.js';
import { AGENTS } from '../../agents.js';

export default function ArtifactCard({ artifact, onClick, isSelected }) {
  const ti = ARTIFACT_TYPES[artifact.type] || ARTIFACT_TYPES.GENERAL;
  const ag = AGENTS[artifact.agentId];

  return (
    <div
      onClick={() => onClick(artifact)}
      role="button"
      aria-pressed={isSelected}
      style={{
        padding: '9px 11px',
        borderRadius: 8,
        cursor: 'pointer',
        marginBottom: 5,
        background: isSelected ? ti.bg : 'white',
        border: isSelected ? `1px solid ${ti.color}40` : '0.5px solid rgba(0,0,0,0.09)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
        <span style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: '0.05em',
          padding: '1px 4px',
          borderRadius: 3,
          background: ti.bg,
          color: ti.color,
          border: `0.5px solid ${ti.color}35`,
        }}>
          {ti.label.toUpperCase()}
        </span>
        {ag && (
          <span style={{ fontSize: 10, color: ag.color, display: 'flex', alignItems: 'center', gap: 2 }}>
            <i className={`ti ${ag.icon}`} style={{ fontSize: 10 }} aria-hidden="true" />
            {ag.shortName}
          </span>
        )}
      </div>
      {artifact.title && (
        <p style={{ fontSize: 11, fontWeight: 500, margin: '0 0 2px', color: '#2C2C2A', lineHeight: 1.3 }}>
          {artifact.title}
        </p>
      )}
      <p style={{
        fontSize: 11,
        color: '#5F5E5A',
        margin: 0,
        lineHeight: 1.4,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
      }}>
        {artifact.snippet}
      </p>
    </div>
  );
}
