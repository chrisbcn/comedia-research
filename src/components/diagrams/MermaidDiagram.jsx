import { useRef, useEffect, useState } from 'react';

export default function MermaidDiagram({ code, title, option, diagramType, onSave, isSaved }) {
  const ref = useRef(null);
  const [err, setErr] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!ref.current || !window.mermaid) return;
    setErr(null);
    const id = 'm' + Math.random().toString(36).slice(2);
    window.mermaid.render(id, code)
      .then(({ svg }) => {
        if (!ref.current) return;
        ref.current.innerHTML = svg;
        const s = ref.current.querySelector('svg');
        if (s) {
          s.style.width = '100%';
          s.style.height = 'auto';
          s.style.maxWidth = '100%';
        }
      })
      .catch(() => setErr(true));
  }, [code]);

  const typeColor = diagramType === 'CURRENT-STATE' ? '#378ADD'
    : diagramType === 'PROPOSED' ? '#D85A30'
    : '#534AB7';
  const typeBg = diagramType === 'CURRENT-STATE' ? '#E6F1FB'
    : diagramType === 'PROPOSED' ? '#FAECE7'
    : '#EEEDFE';

  function handleCopy() {
    navigator.clipboard.writeText('```mermaid\n' + code + '\n```');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div style={{ border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: 10, overflow: 'hidden', background: 'white', marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 11px', borderBottom: '0.5px solid rgba(0,0,0,0.06)', background: '#FAFAF9' }}>
        <i className="ti ti-chart-dots-3" style={{ fontSize: 13, color: '#888780' }} aria-hidden="true" />
        <span style={{ fontSize: 12, fontWeight: 500, flex: 1, color: '#1A1A18' }}>{title}</span>
        {diagramType && diagramType !== 'GENERAL' && (
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.05em', padding: '2px 5px', borderRadius: 3, background: typeBg, color: typeColor }}>
            {diagramType === 'CURRENT-STATE' ? 'CURRENT' : diagramType}
          </span>
        )}
        {option && (
          <span style={{ fontSize: 9, fontWeight: 600, padding: '2px 5px', borderRadius: 3, background: '#F1EFE8', color: '#5F5E5A' }}>
            {option}
          </span>
        )}
        <button
          onClick={handleCopy}
          aria-label="Copy Mermaid source"
          style={{ background: 'none', border: 'none', padding: '1px 3px', color: copied ? '#1D9E75' : '#B4B2A9', fontSize: 11, display: 'flex', alignItems: 'center', gap: 2 }}
        >
          <i className={`ti ${copied ? 'ti-check' : 'ti-copy'}`} style={{ fontSize: 12 }} aria-hidden="true" />
          <span>{copied ? 'Copied' : 'Source'}</span>
        </button>
        {onSave && (
          <button
            onClick={onSave}
            aria-label={isSaved ? 'Diagram saved' : 'Save diagram'}
            style={{ background: isSaved ? '#E1F5EE' : 'none', border: `0.5px solid ${isSaved ? '#1D9E75' : 'rgba(0,0,0,0.15)'}`, borderRadius: 4, padding: '2px 6px', color: isSaved ? '#085041' : '#888780', fontSize: 11, display: 'flex', alignItems: 'center', gap: 2 }}
          >
            <i className={`ti ${isSaved ? 'ti-check' : 'ti-bookmark'}`} style={{ fontSize: 12 }} aria-hidden="true" />
            {isSaved ? 'Saved' : 'Save'}
          </button>
        )}
      </div>
      <div style={{ padding: 14, overflowX: 'auto' }}>
        {err ? (
          <div style={{ padding: 10, background: '#FCEBEB', borderRadius: 6, fontSize: 11, color: '#A32D2D' }}>
            Diagram syntax error.
            <pre style={{ marginTop: 6, fontSize: 10, color: '#5F5E5A', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{code}</pre>
          </div>
        ) : (
          <div ref={ref}>
            <p style={{ fontSize: 12, color: '#B4B2A9', textAlign: 'center' }}>Rendering…</p>
          </div>
        )}
      </div>
    </div>
  );
}
