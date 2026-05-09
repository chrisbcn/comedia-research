export function extractMermaidBlocks(text) {
  const blocks = [];
  const re = /```mermaid\n([\s\S]*?)```/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const code = m[1].trim();
    const hdr = code.match(
      /%%\s*(?:FLOW|IA|STATE):\s*([^|]+)\|?\s*(?:TYPE:\s*([^|]+))?\|?\s*(?:OPTION:\s*([^|\n]+))?\|?\s*(?:PERSONA:\s*([^\n]+))?/
    );
    blocks.push({
      code,
      title: hdr?.[1]?.trim() || 'Diagram',
      diagramType: hdr?.[2]?.trim() || 'GENERAL',
      option: hdr?.[3]?.trim() || null,
      persona: hdr?.[4]?.trim() || null,
      id: `d-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    });
  }
  return blocks;
}

export function stripMermaidBlocks(text) {
  return text.replace(/```mermaid\n[\s\S]*?```/g, '‹diagram›');
}
