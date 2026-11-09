export interface CustomField {
  id: string;
  label: string;
  value: string;
}

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  customFields?: CustomField[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  technologies: string;
  url: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface CustomItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomItem[];
}

export type AccentColor = 'blue' | 'teal' | 'emerald' | 'indigo' | 'violet' | 'rose' | 'slate';
export type FontFamily = 'sans' | 'serif' | 'mono';

export interface ResumeSettings {
  accentColor: AccentColor;
  fontFamily: FontFamily;
  hiddenSections: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  languages: LanguageItem[];
  achievements: Achievement[];
  customSections: CustomSection[];
  skills: string;
  interests: string;
  sectionOrder: string[];
  settings: ResumeSettings;
}

export type TemplateName = 'minimal' | 'professional' | 'modern' | 'ats';
