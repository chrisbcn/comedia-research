import { useRef, useEffect } from 'react';
import MessageBubble from '../chat/MessageBubble.jsx';
import InputArea from '../chat/InputArea.jsx';
import EmptyState from '../chat/EmptyState.jsx';

export default function ChatPanel({
  agent,
  messages,
  input,
  loading,
  uploadedDocs,
  savedIds,
  onInput,
  onSend,
  onSaveDiagram,
  onRemoveDoc,
  onFilesSelected,
  onClearConvo,
  onPromptClick,
}) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      {/* Header */}
      <div style={{ padding: '9px 16px', background: 'white', borderBottom: '0.5px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: agent.colorLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <i className={`ti ${agent.icon}`} style={{ fontSize: 16, color: agent.color }} aria-hidden="true" />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1A1A18' }}>{agent.name}</h2>
          <p style={{ margin: 0, fontSize: 11, color: '#888780' }}>{agent.description}</p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={onClearConvo}
            aria-label="Clear conversation"
            style={{ marginLeft: 'auto', fontSize: 11, padding: '3px 8px', borderRadius: 5, background: 'none', border: '0.5px solid rgba(0,0,0,0.12)', color: '#888780', display: 'flex', alignItems: 'center', gap: 3 }}
          >
            <i className="ti ti-trash" style={{ fontSize: 12 }} aria-hidden="true" />
            Clear
          </button>
        )}
      </div>

      {/* Message list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px', background: '#F7F5F0' }}>
        {messages.length === 0 ? (
          <EmptyState agent={agent} onPromptClick={onPromptClick} />
        ) : (
          messages.map((m, i) => (
            <MessageBubble
              key={m.id || i}
              message={m}
              agentConfig={agent}
              savedIds={savedIds}
              onSave={onSaveDiagram}
            />
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <InputArea
        input={input}
        onInput={onInput}
        onKeyDown={handleKeyDown}
        onSend={onSend}
        loading={loading}
        agent={agent}
        uploadedDocs={uploadedDocs}
        onRemoveDoc={onRemoveDoc}
        onFilesSelected={onFilesSelected}
      />
    </div>
  );
}
