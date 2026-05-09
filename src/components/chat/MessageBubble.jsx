import { marked } from 'marked';
import { ARTIFACT_TYPES } from '../../artifactTypes.js';
import { extractMermaidBlocks, stripMermaidBlocks } from '../../utils/extractMermaid.js';
import MermaidDiagram from '../diagrams/MermaidDiagram.jsx';

const PERSONA_COLORS = {
  ADVISOR:      { bg: '#E1F5EE', color: '#085041' },
  ASSOCIATE:    { bg: '#E6F1FB', color: '#0C447C' },
  SPECIALIST:   { bg: '#EEEDFE', color: '#3C3489' },
  'END CLIENT': { bg: '#FAEEDA', color: '#633806' },
  ALL:          { bg: '#F1EFE8', color: '#444441' },
};

const PERSONA_TAGS = Object.keys(PERSONA_COLORS);
const ARTIFACT_TYPE_KEYS = Object.keys(ARTIFACT_TYPES).filter(t => t !== 'GENERAL');

// Sorted longest-first to avoid partial matches
const SORTED_TYPES = [...ARTIFACT_TYPE_KEYS].sort((a, b) => b.length - a.length);

function preprocessForMarked(text) {
  // Replace artifact type labels with HTML before markdown parsing so marked
  // doesn't strip the bold wrapper and we can inject coloured chips.
  let out = text;
  for (const type of SORTED_TYPES) {
    const ti = ARTIFACT_TYPES[type];
    const escaped = type.replace(/-/g, '\\-');
    const re = new RegExp(`\\*\\*(${escaped})(?::([^*\\n]+))?\\*\\*`, 'g');
    out = out.replace(re, (_, _type, title) => {
      const label = ti.label.toUpperCase();
      const titlePart = title
        ? `<span style="font-size:12px;font-weight:500;color:${ti.color};margin-left:4px">${title.trim()}</span>`
        : '';
      return `<span class="artifact-chip" style="display:inline-flex;align-items:center;gap:4px;background:${ti.bg};border-radius:4px;padding:2px 7px;margin:3px 0;border:0.5px solid ${ti.color}40"><span style="font-size:10px;font-weight:700;color:${ti.color};letter-spacing:0.05em">${label}</span>${titlePart}</span>`;
    });
  }
  return out;
}

function renderMarkdown(raw) {
  const processed = preprocessForMarked(raw);
  return marked.parse(processed, { breaks: true, gfm: true });
}

export default function MessageBubble({ message, agentConfig, savedIds, onSave }) {
  const isUser = message.role === 'user';

  const diagrams = !isUser && message.content
    ? extractMermaidBlocks(message.content)
    : [];

  const displayText = message.content
    ? stripMermaidBlocks(message.content)
    : '';

  const personaTags = !isUser && message.content
    ? PERSONA_TAGS.filter(t => message.content.includes(`[${t}]`))
    : [];

  const bubbleStyle = {
    background: isUser ? '#F1EFE8' : 'white',
    border: '0.5px solid rgba(0,0,0,0.1)',
    borderRadius: isUser ? '11px 11px 3px 11px' : '3px 11px 11px 11px',
    padding: '9px 13px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: isUser ? 'row-reverse' : 'row', gap: 9, marginBottom: 14, alignItems: 'flex-start' }}>
      {!isUser && (
        <div style={{ width: 26, height: 26, borderRadius: '50%', flexShrink: 0, marginTop: 2, background: agentConfig.colorLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <i className={`ti ${agentConfig.icon}`} style={{ fontSize: 13, color: agentConfig.color }} aria-hidden="true" />
        </div>
      )}

      <div style={{ maxWidth: '86%', minWidth: 0 }}>
        <div style={bubbleStyle}>
          {!isUser && personaTags.length > 0 && (
            <div style={{ marginBottom: 5, display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {personaTags.map(t => {
                const { bg, color } = PERSONA_COLORS[t] || PERSONA_COLORS.ALL;
                return (
                  <span key={t} style={{ display: 'inline-block', fontSize: 10, fontWeight: 500, padding: '1px 5px', borderRadius: 4, background: bg, color, border: `0.5px solid ${color}25` }}>
                    {t}
                  </span>
                );
              })}
            </div>
          )}

          {message.isLoading ? (
            <div style={{ display: 'flex', gap: 4, padding: '4px 0' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: agentConfig.color, animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
              ))}
            </div>
          ) : (
            <div
              className="message-body"
              style={{ fontSize: 13, lineHeight: 1.6, color: '#1A1A18' }}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(displayText) }}
            />
          )}

          {message.file && (
            <div style={{ marginTop: 7, padding: '5px 9px', background: '#F1EFE8', borderRadius: 5, fontSize: 11, color: '#5F5E5A', display: 'flex', alignItems: 'center', gap: 5 }}>
              <i className="ti ti-file-text" style={{ fontSize: 13 }} aria-hidden="true" />
              {message.file}
            </div>
          )}
        </div>

        {diagrams.length > 0 && (
          <div style={{ marginTop: 7 }}>
            {diagrams.map(b => (
              <MermaidDiagram
                key={b.id}
                code={b.code}
                title={b.title}
                option={b.option}
                diagramType={b.diagramType}
                isSaved={savedIds.has(b.id)}
                onSave={() => onSave({ ...b, agentId: agentConfig.id, timestamp: new Date() })}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
