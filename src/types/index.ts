export type AudienceFilterType = 'all' | 'fullstack' | 'ai' | 'creative';

export type ProjectCategory = 'Full Stack' | 'AI & GenAI' | 'Automation' | 'Mobile' | 'Machine Learning';

export type ProjectStatus = 'Production-Ready' | 'Active System' | 'Complete' | 'Prototype / MVP';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  audience: AudienceFilterType[];
  year: string;
  status: ProjectStatus;
  statusColor?: string;
  problem: string;
  users: string;
  contribution: string;
  tech: string[];
  architecture: string;
  features: string[];
  challenges: string;
  repoUrl: string;
  demoUrl?: string;
  featured: boolean;
  highlightStat?: { label: string; value: string };
  badge: string;
}

export interface Artwork {
  id: string;
  title: string;
  medium: string;
  category: 'paint' | 'sketch' | 'wall' | 'fabric';
  year: string;
  dimensions: string;
  description: string;
  image: string;
}

export interface SkillItem {
  name: string;
  context: string;
  highlight?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface EducationEntry {
  title: string;
  institution: string;
  period: string;
  location: string;
  details: string;
  statusBadge: string;
}

export interface CertificationEntry {
  title: string;
  issuer: string;
  year: string;
  description: string;
}

export interface AchievementEntry {
  title: string;
  event: string;
  year: string;
  rankBadge: string;
  description: string;
  category: 'hackathon' | 'contest' | 'volunteering';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    actionType: 'navigate' | 'modal' | 'download';
    target: string;
  };
}
