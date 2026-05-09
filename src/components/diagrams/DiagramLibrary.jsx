import { useState } from 'react';
import { AGENTS } from '../../agents.js';

const FILTERS = [
  ['ALL', d => true],
  ['CURRENT-STATE', d => d.diagramType === 'CURRENT-STATE'],
  ['PROPOSED', d => d.diagramType === 'PROPOSED'],
  ['GENERAL', d => d.diagramType === 'GENERAL'],
];

const FILTER_LABELS = {
  ALL: 'All',
  'CURRENT-STATE': 'Current',
  PROPOSED: 'Proposed',
  GENERAL: 'Other',
};

function typeStyle(diagramType) {
  if (diagramType === 'CURRENT-STATE') return { color: '#378ADD', bg: '#E6F1FB' };
  if (diagramType === 'PROPOSED')      return { color: '#D85A30', bg: '#FAECE7' };
  return { color: '#534AB7', bg: '#EEEDFE' };
}

export default function DiagramLibrary({ diagrams, compareSelection, onToggleCompare, onCompare }) {
  const [filter, setFilter] = useState('ALL');

  const shown = filter === 'ALL'
    ? diagrams
    : diagrams.filter(d => d.diagramType === filter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <div style={{ padding: '8px 12px', borderBottom: '0.5px solid rgba(0,0,0,0.06)', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: compareSelection.length ? 7 : 0 }}>
          {FILTERS.map(([key]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                fontSize: 10,
                padding: '2px 7px',
                borderRadius: 8,
                border: `0.5px solid ${filter === key ? '#378ADD' : 'rgba(0,0,0,0.1)'}`,
                background: filter === key ? '#E6F1FB' : 'transparent',
                color: filter === key ? '#0C447C' : '#888780',
                fontWeight: filter === key ? 500 : 400,
              }}
            >
              {FILTER_LABELS[key]}{key === 'ALL' ? ` (${diagrams.length})` : ''}
            </button>
          ))}
        </div>
        {compareSelection.length >= 2 && (
          <button
            onClick={onCompare}
            aria-label="Open diagram comparison"
            style={{ width: '100%', padding: '5px', borderRadius: 6, background: '#D85A30', border: 'none', color: 'white', fontSize: 11, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: 6 }}
          >
            <i className="ti ti-layout-columns" style={{ fontSize: 13 }} aria-hidden="true" />
            Compare {compareSelection.length} diagrams
          </button>
        )}
        {compareSelection.length === 1 && (
          <p style={{ fontSize: 10, color: '#B4B2A9', margin: '5px 0 0', textAlign: 'center' }}>Select one more to compare</p>
        )}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 12px' }}>
        {shown.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px 14px' }}>
            <i className="ti ti-chart-dots-3" style={{ fontSize: 26, color: '#D3D1C7', display: 'block', marginBottom: 8 }} aria-hidden="true" />
            <p style={{ fontSize: 11, color: '#B4B2A9', margin: 0, lineHeight: 1.5 }}>
              Flow diagrams from the UX Mapper and IA Architect appear here automatically when produced.
            </p>
          </div>
        ) : shown.map(d => {
          const sel = compareSelection.includes(d.id);
          const { color: tc, bg: tb } = typeStyle(d.diagramType);
          return (
            <div
              key={d.id}
              onClick={() => onToggleCompare(d.id)}
              role="button"
              aria-pressed={sel}
              style={{
                padding: '8px 10px',
                borderRadius: 8,
                marginBottom: 5,
                cursor: 'pointer',
                border: `${sel ? '1.5px' : '0.5px'} solid ${sel ? '#D85A30' : 'rgba(0,0,0,0.08)'}`,
                background: sel ? '#FAECE7' : 'white',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                <i className="ti ti-chart-dots-3" style={{ fontSize: 11, color: '#888780' }} aria-hidden="true" />
                <span style={{ fontSize: 11, fontWeight: 500, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#1A1A18' }}>
                  {d.title}
                </span>
                {sel && <i className="ti ti-check" style={{ fontSize: 12, color: '#D85A30' }} aria-hidden="true" />}
              </div>
              <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center' }}>
                {d.diagramType && d.diagramType !== 'GENERAL' && (
                  <span style={{ fontSize: 9, fontWeight: 600, padding: '1px 4px', borderRadius: 3, background: tb, color: tc }}>
                    {d.diagramType === 'CURRENT-STATE' ? 'CURRENT' : d.diagramType}
                  </span>
                )}
                {d.option && (
                  <span style={{ fontSize: 9, padding: '1px 4px', borderRadius: 3, background: '#F1EFE8', color: '#5F5E5A' }}>{d.option}</span>
                )}
                {d.persona && (
                  <span style={{ fontSize: 9, color: '#B4B2A9' }}>{d.persona}</span>
                )}
                <span style={{ fontSize: 9, color: '#B4B2A9', marginLeft: 'auto' }}>
                  {AGENTS[d.agentId]?.shortName}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
