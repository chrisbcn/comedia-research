import researchSkillRaw from '../skills/research-analyst/SKILL.md?raw';
import behaviouralSkillRaw from '../skills/behavioural-strategist/SKILL.md?raw';
import uxSkillRaw from '../skills/ux-mapper/SKILL.md?raw';
import iaSkillRaw from '../skills/ia-architect/SKILL.md?raw';
import designerSkillRaw from '../skills/ux-designer/SKILL.md?raw';

function stripFrontmatter(md) {
  return md.replace(/^---[\s\S]*?---\n/, '').trim();
}

export const AGENTS = {
  research: {
    id: 'research',
    name: 'Research Analyst',
    shortName: 'Research',
    icon: 'ti-microscope',
    color: '#1D9E75',
    colorLight: '#E1F5EE',
    colorDark: '#085041',
    description: 'Analyses uploaded materials, surfaces findings, identifies gaps, suggests follow-up questions by persona.',
    systemPrompt: stripFrontmatter(researchSkillRaw),
  },
  behavioural: {
    id: 'behavioural',
    name: 'Behavioural Strategist',
    shortName: 'Behaviour',
    icon: 'ti-brain',
    color: '#534AB7',
    colorLight: '#EEEDFE',
    colorDark: '#26215C',
    description: 'Explains why users behave as they do. Applies COM-B, dual-process theory, and decision architecture to findings.',
    systemPrompt: stripFrontmatter(behaviouralSkillRaw),
  },
  ux: {
    id: 'ux',
    name: 'UX Mapper',
    shortName: 'UX',
    icon: 'ti-map-2',
    color: '#378ADD',
    colorLight: '#E6F1FB',
    colorDark: '#0C447C',
    description: 'Maps current-state flows, dead ends, persona friction. Produces Mermaid flow diagrams of existing navigation.',
    systemPrompt: stripFrontmatter(uxSkillRaw),
  },
  ia: {
    id: 'ia',
    name: 'IA Architect',
    shortName: 'IA',
    icon: 'ti-sitemap',
    color: '#D85A30',
    colorLight: '#FAECE7',
    colorDark: '#712B13',
    description: 'Proposes new IA structures with explicit reasoning. Generates Mermaid hierarchy diagrams. Makes decisions, not option menus.',
    systemPrompt: stripFrontmatter(iaSkillRaw),
  },
  designer: {
    id: 'designer',
    name: 'UX Designer',
    shortName: 'Design',
    icon: 'ti-vector-triangle',
    color: '#BA7517',
    colorLight: '#FAEEDA',
    colorDark: '#412402',
    description: 'Translates IA decisions into interaction specs: all component states, edge cases, empty states, handoff annotations.',
    systemPrompt: stripFrontmatter(designerSkillRaw),
  },
};
