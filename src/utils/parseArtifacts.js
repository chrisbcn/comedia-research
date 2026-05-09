import { ARTIFACT_TYPES } from '../artifactTypes.js';

const TYPES = Object.keys(ARTIFACT_TYPES).filter(t => t !== 'GENERAL');

// Sorted longest-first so e.g. BEHAVIOURAL-DIAGNOSIS matches before any shorter prefix.
const SORTED_TYPES = [...TYPES].sort((a, b) => b.length - a.length);

const TYPE_PATTERN = SORTED_TYPES.map(t => t.replace(/-/g, '\\-')).join('|');
const RE = new RegExp(`\\*\\*(${TYPE_PATTERN})(?::([^*\\n]+))?\\*\\*`, 'g');

export function parseArtifacts(text, agentId) {
  const out = [];
  let m;
  RE.lastIndex = 0;
  while ((m = RE.exec(text)) !== null) {
    const after = text.slice(m.index + m[0].length, m.index + m[0].length + 280);
    const snippet = after.split('\n').slice(0, 4).join('\n').trim();
    out.push({
      type: m[1],
      title: m[2]?.trim() || '',
      snippet,
      agentId,
      timestamp: new Date(),
      id: `a-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    });
    RE.lastIndex = m.index + m[0].length;
  }
  return out;
}
