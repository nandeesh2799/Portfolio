export type ThemeMode = 'matrix' | 'cyberpunk' | 'creative';

export interface Project {
  id: string;
  title: string;
  category: string;
  tech: string[];
  description: string;
  keyFeatures: string[];
  repoUrl?: string;
  badge?: string;
  iconName: string;
  metrics?: { label: string; value: string };
}

export interface SkillGroup {
  category: string;
  icon: string;
  skills: string[];
}

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  status: string;
}

export interface AchievementItem {
  title: string;
  year: string;
  event: string;
  description: string;
}
