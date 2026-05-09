import { useState, useEffect, useCallback } from 'react';
import { AGENTS } from './agents.js';
import { extractMermaidBlocks } from './utils/extractMermaid.js';
import { parseArtifacts } from './utils/parseArtifacts.js';
import { readFiles } from './utils/fileReader.js';
import LeftSidebar from './components/layout/LeftSidebar.jsx';
import ChatPanel from './components/layout/ChatPanel.jsx';
import RightSidebar from './components/layout/RightSidebar.jsx';
import CompareModal from './components/diagrams/CompareModal.jsx';

const INITIAL_CONVOS = Object.fromEntries(Object.keys(AGENTS).map(id => [id, []]));

export default function App() {
  // Core state
  const [activeAgent, setActiveAgent] = useState('research');
  const [convos, setConvos] = useState(INITIAL_CONVOS);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState([]);

  // Library state
  const [artifacts, setArtifacts] = useState([]);
  const [diagrams, setDiagrams] = useState([]);
  const [savedIds, setSavedIds] = useState(new Set());

  // UI state
  const [rightTab, setRightTab] = useState('artifacts');
  const [artFilter, setArtFilter] = useState('ALL');
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [compareSelection, setCompareSel] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  // Load Mermaid from CDN once
  useEffect(() => {
    if (window.mermaid) return;
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
    s.onload = () => window.mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      securityLevel: 'loose',
      fontFamily: 'system-ui, sans-serif',
    });
    document.head.appendChild(s);
  }, []);

  const agent = AGENTS[activeAgent];
  const convo = convos[activeAgent];

  const saveDiagram = useCallback((d) => {
    if (savedIds.has(d.id)) return;
    setDiagrams(prev => [d, ...prev]);
    setSavedIds(prev => new Set([...prev, d.id]));
    setRightTab('diagrams');
  }, [savedIds]);

  function toggleCompare(id) {
    setCompareSel(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < 3 ? [...prev, id] : prev
    );
  }

  const send = useCallback(async () => {
    if ((!input.trim() && !uploadedDocs.length) || loading) return;

    const fileCtx = uploadedDocs.length
      ? `\n\n[MATERIALS: ${uploadedDocs.map(d => d.name).join(', ')}]\n${uploadedDocs.map(d => d.content ? `\n--- ${d.name} ---\n${d.content}` : '').join('')}`
      : '';

    const userMsg = {
      role: 'user',
      content: input.trim(),
      file: uploadedDocs.length ? uploadedDocs.map(d => d.name).join(', ') : null,
      id: Date.now(),
    };

    const loadingMsg = { role: 'assistant', content: '', isLoading: true, id: 'loading' };

    setConvos(prev => ({ ...prev, [activeAgent]: [...prev[activeAgent], userMsg, loadingMsg] }));
    setInput('');
    setLoading(true);

    try {
      const msgs = [
        ...convo.map(m => ({ role: m.role, content: m.content || '' })),
        { role: 'user', content: input.trim() + fileCtx },
      ];

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 8000,
          system: agent.systemPrompt,
          messages: msgs,
        }),
      });

      const data = await res.json();
      const txt = data.content?.find(b => b.type === 'text')?.text
        || (data.error ? `API error: ${data.error.message}` : 'No response — please try again.');

      const aMsg = { role: 'assistant', content: txt, agentId: activeAgent, id: Date.now() };

      setConvos(prev => ({
        ...prev,
        [activeAgent]: [...prev[activeAgent].filter(m => m.id !== 'loading'), aMsg],
      }));

      // Extract and store artifacts
      const newArts = parseArtifacts(txt, activeAgent);
      if (newArts.length) setArtifacts(prev => [...newArts, ...prev]);

      // Extract and auto-save diagrams
      const newDiags = extractMermaidBlocks(txt).map(b => ({
        ...b,
        agentId: activeAgent,
        timestamp: new Date(),
      }));
      if (newDiags.length) {
        setDiagrams(prev => [...newDiags, ...prev]);
        setSavedIds(prev => new Set([...prev, ...newDiags.map(d => d.id)]));
        setRightTab('diagrams');
      }
    } catch (err) {
      const errMsg = { role: 'assistant', content: `Connection error: ${err.message}. Please try again.`, id: Date.now() };
      setConvos(prev => ({
        ...prev,
        [activeAgent]: [...prev[activeAgent].filter(m => m.id !== 'loading'), errMsg],
      }));
    } finally {
      setLoading(false);
      setUploadedDocs([]);
    }
  }, [input, uploadedDocs, loading, activeAgent, convo, agent]);

  async function handleFilesSelected(e) {
    const promises = readFiles(e.target.files);
    const results = await Promise.all(promises);
    setUploadedDocs(prev => [...prev, ...results]);
    e.target.value = '';
  }

  function handleRemoveDoc(id) {
    setUploadedDocs(prev => prev.filter(d => d.id !== id));
  }

  function handleClearConvo() {
    setConvos(prev => ({ ...prev, [activeAgent]: [] }));
  }

  function handlePromptClick(prompt) {
    setInput(prompt);
  }

  function handleDigDeeper(artifact) {
    const agentId = artifact.agentId || activeAgent;
    setActiveAgent(agentId);
    setInput(`Tell me more about: ${artifact.title}`);
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', overflow: 'hidden' }}>
      <LeftSidebar
        activeAgent={activeAgent}
        convos={convos}
        artifacts={artifacts}
        diagrams={diagrams}
        onSelectAgent={setActiveAgent}
      />

      <ChatPanel
        agent={agent}
        messages={convo}
        input={input}
        loading={loading}
        uploadedDocs={uploadedDocs}
        savedIds={savedIds}
        onInput={setInput}
        onSend={send}
        onSaveDiagram={saveDiagram}
        onRemoveDoc={handleRemoveDoc}
        onFilesSelected={handleFilesSelected}
        onClearConvo={handleClearConvo}
        onPromptClick={handlePromptClick}
      />

      <RightSidebar
        artifacts={artifacts}
        diagrams={diagrams}
        rightTab={rightTab}
        onTabChange={setRightTab}
        artFilter={artFilter}
        onArtFilterChange={setArtFilter}
        selectedArtifact={selectedArtifact}
        onSelectArtifact={setSelectedArtifact}
        onCloseArtifact={() => setSelectedArtifact(null)}
        onDigDeeper={handleDigDeeper}
        compareSelection={compareSelection}
        onToggleCompare={toggleCompare}
        onCompare={() => setShowCompare(true)}
      />

      {showCompare && (
        <CompareModal
          diagrams={diagrams}
          selection={compareSelection}
          onClose={() => setShowCompare(false)}
        />
      )}
    </div>
  );
}
