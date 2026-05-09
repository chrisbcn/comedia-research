import { useRef } from 'react';

export default function InputArea({ input, onInput, onKeyDown, onSend, loading, agent, uploadedDocs, onRemoveDoc, onFilesSelected }) {
  const fileRef = useRef(null);
  const textareaRef = useRef(null);

  const canSend = !loading && (input.trim().length > 0 || uploadedDocs.length > 0);

  function handleTextareaInput(e) {
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 90) + 'px';
    onInput(e.target.value);
  }

  return (
    <div style={{ padding: '9px 16px 13px', background: 'white', borderTop: '0.5px solid rgba(0,0,0,0.08)' }}>
      {uploadedDocs.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 7 }}>
          {uploadedDocs.map(d => (
            <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 6px', background: '#F1EFE8', borderRadius: 4, fontSize: 11, color: '#444441' }}>
              <i className="ti ti-file-text" style={{ fontSize: 11 }} aria-hidden="true" />
              <span style={{ maxWidth: 90, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {d.name}
              </span>
              {d.truncated && (
                <span style={{ fontSize: 9, color: '#BA7517', fontWeight: 600 }}>⚠ Truncated</span>
              )}
              <button
                onClick={() => onRemoveDoc(d.id)}
                aria-label={`Remove ${d.name}`}
                style={{ background: 'none', border: 'none', padding: 0, color: '#888780', fontSize: 12, lineHeight: 1 }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: 7, alignItems: 'flex-end', background: '#F7F5F0', borderRadius: 9, padding: '6px 9px', border: '0.5px solid rgba(0,0,0,0.1)' }}>
        <input
          ref={fileRef}
          type="file"
          multiple
          style={{ display: 'none' }}
          onChange={onFilesSelected}
          accept=".txt,.md,.csv,.json,.pdf,image/*"
        />
        <button
          onClick={() => fileRef.current?.click()}
          aria-label="Attach file"
          style={{ background: 'none', border: 'none', padding: '2px', color: '#888780', display: 'flex', alignItems: 'center', flexShrink: 0 }}
        >
          <i className="ti ti-paperclip" style={{ fontSize: 16 }} aria-hidden="true" />
        </button>

        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => onInput(e.target.value)}
          onKeyDown={onKeyDown}
          onInput={handleTextareaInput}
          placeholder={`Ask the ${agent.name}…`}
          rows={1}
          style={{ flex: 1, background: 'none', border: 'none', resize: 'none', fontSize: 13, color: '#1A1A18', lineHeight: 1.5, maxHeight: 90, overflowY: 'auto', fontFamily: 'inherit', padding: '2px 0' }}
        />

        <button
          onClick={onSend}
          disabled={!canSend}
          aria-label="Send message"
          style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', flexShrink: 0, background: canSend ? agent.color : '#D3D1C7', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <i className="ti ti-arrow-up" style={{ fontSize: 14 }} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
