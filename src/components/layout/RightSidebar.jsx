import { AGENTS } from '../../agents.js';
import ArtifactCard from '../artifacts/ArtifactCard.jsx';
import ArtifactDetail from '../artifacts/ArtifactDetail.jsx';
import DiagramLibrary from '../diagrams/DiagramLibrary.jsx';

export default function RightSidebar({
  artifacts,
  diagrams,
  rightTab,
  onTabChange,
  artFilter,
  onArtFilterChange,
  selectedArtifact,
  onSelectArtifact,
  onCloseArtifact,
  onDigDeeper,
  compareSelection,
  onToggleCompare,
  onCompare,
}) {
  const filteredArts = artifacts.filter(a => artFilter === 'ALL' || a.agentId === artFilter);

  return (
    <div style={{ width: 272, background: 'white', borderLeft: '0.5px solid rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      {/* Tab bar */}
      <div style={{ padding: '9px 11px', borderBottom: '0.5px solid rgba(0,0,0,0.08)', flexShrink: 0 }}>
        <div style={{ display: 'flex', background: '#F1EFE8', borderRadius: 7, padding: 3 }}>
          {[['artifacts', `Artifacts (${artifacts.length})`], ['diagrams', `Diagrams (${diagrams.length})`]].map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              style={{
                flex: 1,
                padding: '4px',
                borderRadius: 5,
                border: 'none',
                background: rightTab === tab ? 'white' : 'transparent',
                fontSize: 11,
                fontWeight: rightTab === tab ? 500 : 400,
                color: rightTab === tab ? '#1A1A18' : '#888780',
                boxShadow: rightTab === tab ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {rightTab === 'artifacts' && (
        <>
          {/* Agent filter */}
          <div style={{ padding: '7px 11px', borderBottom: '0.5px solid rgba(0,0,0,0.06)', flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              {['ALL', ...Object.keys(AGENTS)].map(f => {
                const ag = AGENTS[f];
                const active = artFilter === f;
                return (
                  <button
                    key={f}
                    onClick={() => onArtFilterChange(f)}
                    style={{
                      fontSize: 9,
                      padding: '2px 6px',
                      borderRadius: 7,
                      border: `0.5px solid ${active ? (ag?.color || '#1A1A18') : 'rgba(0,0,0,0.09)'}`,
                      background: active ? (ag?.colorLight || '#F1EFE8') : 'transparent',
                      color: active ? (ag?.colorDark || '#1A1A18') : '#888780',
                      fontWeight: active ? 500 : 400,
                    }}
                  >
                    {f === 'ALL' ? 'All' : ag?.shortName}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Artifact list */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '7px 11px' }}>
            {filteredArts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '36px 14px' }}>
                <i className="ti ti-folders" style={{ fontSize: 24, color: '#D3D1C7', display: 'block', marginBottom: 7 }} aria-hidden="true" />
                <p style={{ fontSize: 11, color: '#B4B2A9', margin: 0, lineHeight: 1.5 }}>
                  Typed artifacts from agent responses will appear here.
                </p>
              </div>
            ) : filteredArts.map(a => (
              <ArtifactCard
                key={a.id}
                artifact={a}
                onClick={onSelectArtifact}
                isSelected={selectedArtifact?.id === a.id}
              />
            ))}
          </div>

          {/* Detail panel */}
          {selectedArtifact && (
            <ArtifactDetail
              artifact={selectedArtifact}
              onClose={onCloseArtifact}
              onDigDeeper={onDigDeeper}
            />
          )}
        </>
      )}

      {rightTab === 'diagrams' && (
        <DiagramLibrary
          diagrams={diagrams}
          compareSelection={compareSelection}
          onToggleCompare={onToggleCompare}
          onCompare={onCompare}
        />
      )}
    </div>
  );
}
