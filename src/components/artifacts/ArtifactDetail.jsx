import { ARTIFACT_TYPES } from '../../artifactTypes.js';

export default function ArtifactDetail({ artifact, onClose, onDigDeeper }) {
  const ti = ARTIFACT_TYPES[artifact.type] || ARTIFACT_TYPES.GENERAL;

  return (
    <div style={{ borderTop: '0.5px solid rgba(0,0,0,0.08)', background: '#F7F5F0', padding: 11, maxHeight: 220, overflowY: 'auto', flexShrink: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
        <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 5px', borderRadius: 3, background: ti.bg, color: ti.color }}>
          {ti.label.toUpperCase()}
        </span>
        <button
          onClick={onClose}
          aria-label="Close artifact detail"
          style={{ background: 'none', border: 'none', color: '#B4B2A9', padding: 2 }}
        >
          <i className="ti ti-x" style={{ fontSize: 12 }} aria-hidden="true" />
        </button>
      </div>
      {artifact.title && (
        <p style={{ fontSize: 11, fontWeight: 600, margin: '0 0 4px' }}>{artifact.title}</p>
      )}
      <p style={{ fontSize: 11, color: '#444441', margin: '0 0 8px', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
        {artifact.snippet}
      </p>
      {onDigDeeper && artifact.title && (
        <button
          onClick={() => onDigDeeper(artifact)}
          style={{ fontSize: 10, padding: '3px 8px', borderRadius: 5, background: ti.bg, border: `0.5px solid ${ti.color}40`, color: ti.color, fontWeight: 500 }}
        >
          Dig deeper →
        </button>
      )}
    </div>
  );
}
