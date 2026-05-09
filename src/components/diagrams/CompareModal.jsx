import MermaidDiagram from './MermaidDiagram.jsx';

export default function CompareModal({ diagrams, selection, onClose }) {
  const selected = diagrams.filter(d => selection.includes(d.id));

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 200, display: 'flex', flexDirection: 'column' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: 'white', padding: '11px 18px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '0.5px solid rgba(0,0,0,0.1)', flexShrink: 0 }}>
        <i className="ti ti-layout-columns" style={{ fontSize: 17, color: '#D85A30' }} aria-hidden="true" />
        <span style={{ fontSize: 14, fontWeight: 600, flex: 1 }}>Diagram Comparison</span>
        <button
          onClick={onClose}
          aria-label="Close comparison"
          style={{ background: 'none', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: 5, padding: '4px 9px', fontSize: 11, color: '#5F5E5A', display: 'flex', alignItems: 'center', gap: 3 }}
        >
          <i className="ti ti-x" style={{ fontSize: 12 }} aria-hidden="true" />
          Close
        </button>
      </div>
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: 16,
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(selected.length, 2)}, 1fr)`,
          gap: 14,
          alignItems: 'start',
          background: '#F7F5F0',
        }}
      >
        {selected.map(d => (
          <MermaidDiagram
            key={d.id}
            code={d.code}
            title={d.title}
            option={d.option}
            diagramType={d.diagramType}
          />
        ))}
      </div>
    </div>
  );
}
