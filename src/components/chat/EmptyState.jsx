const PROMPTS = {
  research: [
    'Summarise the key research findings',
    'What gaps exist in the current research?',
    'What should we ask the Advisor persona?',
    'Find patterns across all four personas',
  ],
  behavioural: [
    'Run a cognitive audit on the end client journey',
    'Why are advisors failing in the settings area?',
    'What behavioural risks does the dead zones problem create?',
    'Build a motivation map for the Specialist persona',
  ],
  ux: [
    "Map the Advisor's primary flow as a Mermaid diagram",
    'Show all navigation dead ends in a flow diagram',
    'Diagram the category vs workflow conflict',
    "Map the Associate's document assignment workflow",
  ],
  ia: [
    'Propose a new top-level IA structure as a diagram',
    'Show two alternative nav models side by side',
    'How should we handle category vs workflow?',
    'Diagram an object-based IA for Vanilla',
  ],
  designer: [
    'Spec the AI/manual input component with all 5 states',
    'Design the Advisor empty state flow as a state diagram',
    'Spec the consolidated settings panel',
    'What states does the pending-review field need?',
  ],
};

export default function EmptyState({ agent, onPromptClick }) {
  const prompts = PROMPTS[agent.id] || [];

  return (
    <div style={{ textAlign: 'center', padding: '44px 18px' }}>
      <div style={{ width: 48, height: 48, borderRadius: '50%', background: agent.colorLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
        <i className={`ti ${agent.icon}`} style={{ fontSize: 22, color: agent.color }} aria-hidden="true" />
      </div>
      <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 5px', color: '#1A1A18' }}>{agent.name}</h3>
      <p style={{ fontSize: 12, color: '#888780', maxWidth: 340, margin: '0 auto 18px', lineHeight: 1.6 }}>
        {agent.description}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'center' }}>
        {prompts.map(p => (
          <button
            key={p}
            onClick={() => onPromptClick(p)}
            style={{ fontSize: 11, padding: '5px 10px', borderRadius: 18, background: 'white', border: '0.5px solid rgba(0,0,0,0.12)', color: '#444441' }}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
