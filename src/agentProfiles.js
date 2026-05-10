// Structured profile data for each agent, drawn from their SKILL.md files.
// Displayed in the AgentProfileModal when the user clicks the info icon.

export const AGENT_PROFILES = {
  research: {
    role: 'Primary synthesis engine for the discovery phase',
    what: `Ingests raw research materials — interview transcripts, FullStory exports, heatmaps, NPS data, onboarding funnels, support tickets — and transforms them into typed, citable findings. Distinguishes evidence-backed facts from inferences, surfaces contradictions, and identifies gaps in the research corpus.

The Research Analyst approaches every body of evidence with three questions: what do we actually know, what are we inferring, and what don't we know yet? These categories are never conflated.`,
    why: `Without someone asking "but what does the research actually say?", design decisions drift toward assumption. The Research Analyst is the team's epistemic anchor — ensuring every structural proposal from the IA Architect and every intervention from the Behavioural Strategist is rooted in what users actually do, say, and fail to do.

In a 12-week engagement, research synthesis in weeks 1–2 sets the quality ceiling for everything that follows.`,
    sme: [
      'Affinity mapping — emergent theme grouping without pre-imposed categories',
      'Jobs to Be Done — what outcome is the user hiring this product to deliver?',
      'Kano model — separating must-haves, performance features, and delighters',
      'Opportunity scoring — mapping importance vs. satisfaction to find underserved needs',
      'Funnel and drop-off analysis — knowing where to look for the why behind the where',
      'Method triangulation — when two methods agree, confidence rises; when they conflict, that\'s the finding',
      'Research quality assessment — sample representativeness, recency, demand characteristics',
    ],
    outputs: ['FINDING', 'PATTERN', 'GAP', 'SYNTHESIS', 'FOLLOW-UP', 'CONTRADICTION'],
    outputNotes: {
      FINDING: 'Evidence-backed, citable. Includes persona tags, confidence level, and implication.',
      PATTERN: 'A finding that recurs across multiple users, sessions, or data sources.',
      GAP: 'Something the research doesn\'t answer that it needs to before a design decision can be made.',
      SYNTHESIS: 'A higher-order insight connecting multiple findings — the "so what" across the corpus.',
      'FOLLOW-UP': 'A specific question with persona, method, and rationale — not a vague "we should explore this".',
      CONTRADICTION: 'Two pieces of evidence that don\'t agree — surfaced explicitly, not averaged away.',
    },
    when: 'Weeks 1–2 of the engagement, and whenever new research materials arrive. Also when the team asks "what do we actually know?" before committing to a structural direction.',
  },

  behavioural: {
    role: 'Explains the why behind user behaviour through a behavioural science lens',
    what: `Applies frameworks from behavioural economics and cognitive psychology to explain why specific users, in specific contexts, make the specific choices they make — and what the design can do about it. The primary diagnostic tool is COM-B: does a user fail because of capability, motivation, or opportunity? The intervention is different in each case.

Estate planning is a high-anxiety, emotionally loaded domain. End clients face decisions about mortality and family conflict. Advisors face professional reputation risk in front of clients. These are not standard productivity tool problems — they require behavioural design as a structural consideration, not a UI enhancement.`,
    why: `Friction isn't always a usability problem. A flow that's perfectly clear can still fail if the user isn't motivated to complete it, or if decision anxiety causes them to abandon at a critical moment. The Behavioural Strategist prevents the team from solving the wrong problem — adding a clearer CTA when the real issue is loss aversion, or improving navigation when the real issue is cognitive overload.`,
    sme: [
      'COM-B model — Capability, Opportunity, Motivation as the diagnostic framework for behaviour change',
      'Dual-process theory — System 1 (fast, intuitive) vs System 2 (slow, deliberate); most product failures happen at the boundary',
      'Cognitive load theory — intrinsic, extraneous, and germane load; reducing the first two protects the third',
      'BJ Fogg\'s Behaviour Model — Motivation × Ability × Prompt; why prompts fail when the other two are low',
      'Loss aversion — losses feel ~2× as painful as equivalent gains feel good; critical in estate planning flows',
      'Present bias — users underweight future consequences; relevant to engagement and onboarding',
      'Default effects — the default is the most powerful design decision in any flow, never neutral',
      'Trust calibration — how users continuously update trust signals; transparency of AI outputs matters',
      'EAST framework — Easy, Attractive, Social, Timely; the Behavioural Insights Team\'s applied lens',
    ],
    outputs: ['BEHAVIOURAL-DIAGNOSIS', 'FRICTION-ANALYSIS', 'INTERVENTION', 'RISK-FLAG', 'COGNITIVE-AUDIT', 'MOTIVATION-MAP'],
    outputNotes: {
      'BEHAVIOURAL-DIAGNOSIS': 'Why a specific behaviour is occurring. Names the framework, mechanism, persona, and design implication.',
      'FRICTION-ANALYSIS': 'Systematic breakdown of what\'s creating resistance — not just where, but why.',
      INTERVENTION: 'A specific design change with an explicit behavioural mechanism. Includes implementation direction and risk.',
      'RISK-FLAG': 'A behavioural pattern that will undermine a proposed design decision if not addressed.',
      'COGNITIVE-AUDIT': 'Assessment of cognitive load across a flow or IA structure. Classifies by load type.',
      'MOTIVATION-MAP': 'Per-persona breakdown of what drives and blocks engagement with a specific task or area.',
    },
    when: 'When research findings need a "why". When friction can\'t be explained by usability alone. When designing flows that require behaviour change. When reviewing IA proposals for cognitive load and default effects.',
  },

  ux: {
    role: 'Maps the current state of Vanilla with precision — no editorialising, no solutions',
    what: `Documents the Vanilla application as it actually exists: navigation entry points, dead ends, persona journeys, settings distribution, and category-vs-workflow conflicts. Produces Mermaid flowcharts for every significant navigation flow and applies a consistent problem taxonomy to every friction point found.

The UX Mapper's discipline is restraint — documenting what is, not what should be. The moment it starts designing solutions it's doing the IA Architect's job without the full picture.`,
    why: `You can't design a good replacement for something you don't fully understand. The UX Mapper gives the IA Architect and Behavioural Strategist facts to build from rather than assumptions. It also creates the baseline against which every proposed IA structure can be evaluated: does this solve the friction points that were documented?`,
    sme: [
      'Entry point mapping — every place a user can begin a task, including shortcuts, deep links, and contextual entries',
      'Depth mapping — click depth from home to each key function; distinguishing necessary depth from unnecessary depth',
      'Orphan detection — screens reachable but not exitable cleanly, or with no logical parent',
      'Cross-navigation analysis — when users must cross primary sections to complete one task (reveals structural conflicts)',
      'Persona journey tracing — the real path each persona takes, not the designed intent',
      'Settings and configuration audit — global vs contextual, account vs user vs item level, duplicates and missing options',
      'Workflow vs category conflict identification — the core structural question for the Vanilla engagement',
    ],
    outputs: ['NAVIGATION-MAP', 'FRICTION-AUDIT', 'FLOW-DIAGRAM', 'DEAD-ZONE-INVENTORY', 'SETTINGS-AUDIT', 'CONFLICT-MAP'],
    outputNotes: {
      'NAVIGATION-MAP': 'Entry points, primary path, depth, persona access, and problems — for a section or flow.',
      'FRICTION-AUDIT': 'Prioritised catalogue of friction points with type (DEAD-END, PERSONA-MISMATCH, etc.) and severity.',
      'FLOW-DIAGRAM': 'Step-by-step Mermaid flowchart of a persona journey through the current product.',
      'DEAD-ZONE-INVENTORY': 'All locations where AI cannot populate content, leaving blank states with no guidance.',
      'SETTINGS-AUDIT': 'Full catalogue of settings locations classified by type; flags duplicates, orphans, and buried options.',
      'CONFLICT-MAP': 'Documentation of where category logic and workflow logic collide in the navigation.',
    },
    when: 'Early in the engagement to establish current-state baseline. Whenever a proposed design needs checking against what currently exists — "what are we changing from, exactly?"',
  },

  ia: {
    role: 'Makes structural decisions — not option menus',
    what: `Proposes new Information Architecture structures with explicit reasoning, clear tradeoffs, and a stated recommendation. Resolves the category-vs-workflow conflict in Vanilla's navigation. Designs the extensible top-level taxonomy that must accommodate estate planning now and tax, retirement, and investments later. Produces Mermaid hierarchy diagrams for every significant structural proposal.

The IA Architect's discipline is decisiveness — the team can override a recommendation, but it should never have to make the structural call itself.`,
    why: `A product's structure determines everything downstream: what developers build, what designers can specify, and what users experience. Structure made by default — through accumulated small decisions — produces the category-vs-workflow conflict that Vanilla currently has. The IA Architect ensures structural decisions are made consciously, with reasoning that future team members can understand and build from.`,
    sme: [
      'Content modelling — defining primary objects (Client, Matter, Document, Task) and their relationships before navigation',
      'Card sorting (open and closed) — validating taxonomies against user mental models',
      'Tree testing — validating findability of a proposed IA; knowing its limitations (it tests findability, not discoverability)',
      'Adaptive navigation — same structural skeleton, role-based entry points and defaults per persona',
      'Object-based IA — organising around primary entities rather than product areas; more durable for extension',
      'Namespace planning — structuring top-level taxonomy so new product areas slot in without restructuring',
      'Permission-aware navigation — IA structure that reads from roles/permissions rather than duplicating role logic',
      'Controlled vocabulary and labelling — navigation labels are structural decisions, not copy decisions',
    ],
    outputs: ['IA-STRUCTURE', 'NAV-MODEL', 'PROPOSAL', 'DECISION', 'TRADEOFF', 'EXTENSIBILITY-PLAN'],
    outputNotes: {
      'IA-STRUCTURE': 'A proposed top-level content model and navigation hierarchy with full structure documentation.',
      'NAV-MODEL': 'Detailed navigation design including levels, labels, and adaptive logic per persona.',
      PROPOSAL: 'Concrete recommendation with thesis, structure, persona logic, extensibility, tradeoffs, and build complexity.',
      DECISION: 'A resolved structural question — chosen direction, rationale, what it closes off, confidence level.',
      TRADEOFF: 'An honest account of what a structural choice costs or limits, presented without minimising.',
      'EXTENSIBILITY-PLAN': 'How the current IA accommodates tax, retirement, and investments without a structural rebuild.',
    },
    when: 'After the UX Mapper has established current state and the Research Analyst has surfaced key findings. When structural decisions need to be made, alternatives evaluated, or a previous direction needs revisiting with new evidence.',
  },

  designer: {
    role: 'Translates IA and research decisions into full interaction specifications',
    what: `Specifies the complete interaction logic for every component and flow the IA Architect defines — not just the happy path, but all states: default, hover, focus, loading, empty, error, disabled. Designs the universal AI/manual input pattern across its five states (AI-populated, manually-entered, pending-review, conflicted, AI-unavailable). Produces Figma-ready annotation content and developer handoff specs complete enough to build from without follow-up questions.

The UX Designer works one or two sprints ahead of development and operates from the IA Architect's structure — it does not invent structure independently.`,
    why: `A good IA means nothing if the interaction design creates decision anxiety, empty states that feel like dead ends, or AI outputs that users don't trust or understand. The UX Designer is where structural decisions become real, usable interfaces — and where structural problems that weren't visible in an IA diagram surface before development begins.`,
    sme: [
      'State modelling — enumerating every possible state before designing any of them',
      'Progressive disclosure — showing only what the user needs now; requires knowing what\'s primary vs rare',
      'Recognition over recall — users identify options rather than remember them; applies to navigation, labels, empty states',
      'Feedback and feedforward — feedback tells users what happened; feedforward tells them what will happen',
      'Error prevention over error recovery — the best error message is the one that never appears',
      'Component anatomy documentation — every part named, its behaviour defined, its states enumerated',
      'First-time user experience — empty state design as the beginning of a relationship, not a dead end',
      'The AI/manual input pattern — five states for every applicable field in the Vanilla application',
      'Interaction spec notation — describing behaviour in implementation-neutral language for developer handoff',
    ],
    outputs: ['COMPONENT-SPEC', 'FLOW-SPEC', 'EMPTY-STATE-DESIGN', 'ERROR-SPEC', 'ANNOTATION', 'HANDOFF-CHECKLIST'],
    outputNotes: {
      'COMPONENT-SPEC': 'Full anatomy, all states, interaction behaviour, accessibility, and open questions for a component.',
      'FLOW-SPEC': 'Step-by-step interaction design for a user flow — happy path, edge cases, error states, empty states.',
      'EMPTY-STATE-DESIGN': 'Design direction for zero-data and first-time states. Every empty state is an opportunity or a dead end.',
      'ERROR-SPEC': 'Error states, messages, and recovery paths. A spec without error states is not a spec.',
      ANNOTATION: 'Figma annotation content written as instructions to the developer, not descriptions of the design.',
      'HANDOFF-CHECKLIST': 'What a developer needs before they can build — if any item is missing, the spec is not done.',
    },
    when: 'After the IA Architect delivers a structure. When a component needs full state specification before development. When onboarding or first-time user flows need to be designed. When a Figma handoff needs annotation.',
  },
};
