export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Experience {
  id: string;
  position: string;
  organization: string;
  period: string;
  type: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  year: number;
  category: string;
  categoryFilter: string;
  description: string;
  technologies: string[];
  highlight?: string;
  imageUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
}

export interface ProjectGalleryImage {
  src: string;
  alt: string;
  caption: string;
  aspectRatio: string;
}

export interface ProjectDetail {
  role: string;
  problem: string;
  goal: string;
  contribution: string;
  gallery: ProjectGalleryImage[];
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: string[];
}

export interface Organization {
  id: string;
  name: string;
  role: string;
  period: string;
  description: string;
  contributions: string[];
}

export interface VolunteerActivity {
  id: string;
  title: string;
  organization: string;
  role: string;
  period: string;
  description: string;
}

export interface PersonalInfo {
  name: string;
  firstName: string;
  tagline: string;
  description: string;
  email: string;
  location: string;
  availability: string;
  cvPath: string;
  socialLinks: SocialLink[];
  stats: Stat[];
}
