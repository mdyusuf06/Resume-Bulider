'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  ResumeData,
  TemplateName,
  Education,
  Experience,
  Project,
  Certification,
  LanguageItem,
  Achievement,
  CustomSection,
  CustomItem,
  CustomField,
  AccentColor,
  FontFamily,
  ResumeSettings,
} from '@/types/resume';

const generateId = () => Math.random().toString(36).substring(2, 9);

export const sampleResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Alex Morgan',
    title: 'Senior Full-Stack & Systems Engineer',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    website: 'https://alexmorgan.dev',
    linkedin: 'linkedin.com/in/alexmorgan',
    github: 'github.com/alexmorgan',
    summary: 'Senior Software Engineer with 6+ years specializing in distributed systems, high-concurrency cloud architectures, and modern web applications. Proven track record leading cross-functional teams, optimizing Core Web Vitals, and architecting privacy-first offline web engines.',
    customFields: [
      { id: 'cf-1', label: 'Clearance', value: 'Secret / Eligible' },
      { id: 'cf-2', label: 'Work Auth', value: 'US Citizen / Authorized' },
    ],
  },
  experience: [
    {
      id: 'exp-1',
      company: 'TechFlow Systems',
      position: 'Senior Frontend Engineer',
      startDate: 'Mar 2022',
      endDate: 'Present',
      location: 'San Francisco, CA',
      description: '• Architected Next.js micro-frontends serving 1.2M monthly active users with 99.98% uptime.\n• Reduced Core Web Vitals LCP by 42% through aggressive bundle splitting and Edge CDN caching.\n• Spearheaded internal design system in React, Tailwind CSS, and Storybook adopted across 6 product teams.',
    },
    {
      id: 'exp-2',
      company: 'Vanguard Labs',
      position: 'Software Engineer',
      startDate: 'Jul 2019',
      endDate: 'Feb 2022',
      location: 'Austin, TX',
      description: '• Developed high-throughput REST and GraphQL APIs using TypeScript, Node.js, and PostgreSQL.\n• Built real-time collaborative workspace canvas using WebSockets and client-side CRDTs.\n• Mentored 4 junior engineers and conducted over 80 technical interviews.',
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'B.S. in Computer Science',
      field: 'Software Engineering & Distributed Systems',
      startDate: '2015',
      endDate: '2019',
      gpa: '3.85 / 4.0',
      description: 'Dean\'s Honors List, President of Open Source Club, Undergraduate Research Fellow.',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'CloudPulse - Distributed Observability Platform',
      technologies: 'React, TypeScript, Go, Prometheus, Tailwind CSS',
      url: 'https://github.com/alexmorgan/cloudpulse',
      description: 'Engineered an interactive real-time tracing dashboard visualizing multi-region telemetry with sub-second queries and automated alert thresholds.',
    },
    {
      id: 'proj-2',
      name: 'Offline-First Note Engine',
      technologies: 'Next.js, IndexedDB, Web Workers, WASM',
      url: 'https://github.com/alexmorgan/offline-notes',
      description: 'Developed an encrypted local-first markdown note-taking PWA with conflict-free multi-tab sync and zero cloud dependencies.',
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      date: '2023',
      url: 'aws.amazon.com/verify/12345',
    },
    {
      id: 'cert-2',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Linux Foundation / CNCF',
      date: '2022',
      url: 'cncf.io/verify/67890',
    },
  ],
  languages: [
    { id: 'lang-1', name: 'English', proficiency: 'Native / Bilingual' },
    { id: 'lang-2', name: 'Spanish', proficiency: 'Professional Working' },
    { id: 'lang-3', name: 'German', proficiency: 'Elementary' },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: '1st Place Winner – Global FinTech Hackathon',
      issuer: 'TechCrunch Disrupt',
      date: '2023',
      description: 'Built a zero-knowledge proof decentralized identity verifier in 36 hours competing against 120+ teams.',
    },
    {
      id: 'ach-2',
      title: 'Top Open Source Contributor Award',
      issuer: 'OpenSource Initiative',
      date: '2021',
      description: 'Awarded for sustained core contributions to developer tooling and WebAssembly web runtimes.',
    },
  ],
  customSections: [
    {
      id: 'custom-1',
      title: 'Publications & Keynotes',
      items: [
        {
          id: 'item-1',
          title: 'Architecting Offline-First Web Applications with CRDTs',
          subtitle: 'JSConf North America',
          date: '2023',
          description: 'Keynote presentation explaining local-first data sync patterns and conflict-free replicated data types.',
        },
      ],
    },
  ],
  skills: 'TypeScript, JavaScript, React, Next.js, Node.js, Tailwind CSS, Python, Go, PostgreSQL, GraphQL, Docker, Kubernetes, AWS, CI/CD, Git, Jest, Playwright',
  interests: 'Open Source Software, Robotics, Distributed Systems, Cycling, Chess, Analog Photography',
  sectionOrder: [
    'experience',
    'education',
    'projects',
    'skills',
    'certifications',
    'languages',
    'achievements',
    'interests',
    'custom-1',
  ],
  settings: {
    accentColor: 'blue',
    fontFamily: 'sans',
    hiddenSections: [],
  },
};

const defaultSettings: ResumeSettings = {
  accentColor: 'blue',
  fontFamily: 'sans',
  hiddenSections: [],
};

const emptyResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
    customFields: [],
  },
  education: [],
  experience: [],
  projects: [],
  certifications: [],
  languages: [],
  achievements: [],
  customSections: [],
  skills: '',
  interests: '',
  sectionOrder: [
    'experience',
    'education',
    'projects',
    'skills',
    'certifications',
    'languages',
    'achievements',
    'interests',
  ],
  settings: defaultSettings,
};

interface ResumeContextType {
  data: ResumeData;
  template: TemplateName;
  setTemplate: (t: TemplateName) => void;
  updatePersonalInfo: (field: string, value: string) => void;
  // Custom Fields in Personal Info
  addCustomField: () => void;
  updateCustomField: (id: string, field: 'label' | 'value', value: string) => void;
  removeCustomField: (id: string) => void;
  // Education
  updateEducation: (index: number, field: string, value: string) => void;
  addEducation: () => void;
  removeEducation: (index: number) => void;
  // Experience
  updateExperience: (index: number, field: string, value: string) => void;
  addExperience: () => void;
  removeExperience: (index: number) => void;
  // Projects
  updateProject: (index: number, field: string, value: string) => void;
  addProject: () => void;
  removeProject: (index: number) => void;
  // Certifications
  updateCertification: (index: number, field: string, value: string) => void;
  addCertification: () => void;
  removeCertification: (index: number) => void;
  // Languages
  updateLanguage: (index: number, field: string, value: string) => void;
  addLanguage: () => void;
  removeLanguage: (index: number) => void;
  // Achievements
  updateAchievement: (index: number, field: string, value: string) => void;
  addAchievement: () => void;
  removeAchievement: (index: number) => void;
  // Custom Sections
  addCustomSection: (title: string) => void;
  removeCustomSection: (sectionId: string) => void;
  updateCustomSectionTitle: (sectionId: string, title: string) => void;
  addCustomItem: (sectionId: string) => void;
  updateCustomItem: (sectionId: string, itemIndex: number, field: keyof CustomItem, value: string) => void;
  removeCustomItem: (sectionId: string, itemIndex: number) => void;
  // Skills & Interests
  updateSkills: (value: string) => void;
  updateInterests: (value: string) => void;
  // Settings (Theme color, Font, Visibility)
  setAccentColor: (color: AccentColor) => void;
  setFontFamily: (font: FontFamily) => void;
  toggleSectionVisibility: (sectionId: string) => void;
  // Section Ordering & Data loaders
  setSectionOrder: (order: string[]) => void;
  loadData: (data: ResumeData) => void;
  loadSampleData: () => void;
  clearData: () => void;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

const STORAGE_KEY = 'offline_resume_builder_data_v4';
const TEMPLATE_KEY = 'offline_resume_builder_template_v4';

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ResumeData>(sampleResumeData);
  const [template, setTemplateState] = useState<TemplateName>('minimal');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      const savedTemplate = localStorage.getItem(TEMPLATE_KEY) as TemplateName;
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.personalInfo) {
          setData({
            ...emptyResumeData,
            ...parsed,
            personalInfo: {
              ...emptyResumeData.personalInfo,
              ...(parsed.personalInfo || {}),
              customFields: parsed.personalInfo?.customFields || [],
            },
            education: parsed.education || [],
            experience: parsed.experience || [],
            projects: parsed.projects || [],
            certifications: parsed.certifications || [],
            languages: parsed.languages || [],
            achievements: parsed.achievements || [],
            customSections: parsed.customSections || [],
            skills: parsed.skills || '',
            interests: parsed.interests || '',
            sectionOrder: parsed.sectionOrder || emptyResumeData.sectionOrder,
            settings: { ...defaultSettings, ...(parsed.settings || {}) },
          });
        }
      }
      if (savedTemplate && ['minimal', 'professional', 'modern', 'ats'].includes(savedTemplate)) {
        setTemplateState(savedTemplate);
      }
    } catch {
      // Fallback
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(TEMPLATE_KEY, template);
    } catch {
      // Ignore quota error
    }
  }, [data, template, isHydrated]);

  const setTemplate = useCallback((t: TemplateName) => {
    setTemplateState(t);
  }, []);

  const updatePersonalInfo = useCallback((field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  }, []);

  const addCustomField = useCallback(() => {
    setData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        customFields: [
          ...(prev.personalInfo.customFields || []),
          { id: generateId(), label: '', value: '' },
        ],
      },
    }));
  }, []);

  const updateCustomField = useCallback((id: string, field: 'label' | 'value', value: string) => {
    setData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        customFields: (prev.personalInfo.customFields || []).map((cf) =>
          cf.id === id ? { ...cf, [field]: value } : cf
        ),
      },
    }));
  }, []);

  const removeCustomField = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        customFields: (prev.personalInfo.customFields || []).filter((cf) => cf.id !== id),
      },
    }));
  }, []);

  // Education handlers
  const updateEducation = useCallback((index: number, field: string, value: string) => {
    setData((prev) => {
      const education = [...prev.education];
      education[index] = { ...education[index], [field]: value };
      return { ...prev, education };
    });
  }, []);

  const addEducation = useCallback(() => {
    setData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: generateId(),
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          gpa: '',
          description: '',
        },
      ],
    }));
  }, []);

  const removeEducation = useCallback((index: number) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  }, []);

  // Experience handlers
  const updateExperience = useCallback((index: number, field: string, value: string) => {
    setData((prev) => {
      const experience = [...prev.experience];
      experience[index] = { ...experience[index], [field]: value };
      return { ...prev, experience };
    });
  }, []);

  const addExperience = useCallback(() => {
    setData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: generateId(),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          location: '',
          description: '',
        },
      ],
    }));
  }, []);

  const removeExperience = useCallback((index: number) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  }, []);

  // Project handlers
  const updateProject = useCallback((index: number, field: string, value: string) => {
    setData((prev) => {
      const projects = [...prev.projects];
      projects[index] = { ...projects[index], [field]: value };
      return { ...prev, projects };
    });
  }, []);

  const addProject = useCallback(() => {
    setData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: generateId(),
          name: '',
          technologies: '',
          url: '',
          description: '',
        },
      ],
    }));
  }, []);

  const removeProject = useCallback((index: number) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  }, []);

  // Certification handlers
  const updateCertification = useCallback((index: number, field: string, value: string) => {
    setData((prev) => {
      const certifications = [...prev.certifications];
      certifications[index] = { ...certifications[index], [field]: value };
      return { ...prev, certifications };
    });
  }, []);

  const addCertification = useCallback(() => {
    setData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          id: generateId(),
          name: '',
          issuer: '',
          date: '',
          url: '',
        },
      ],
    }));
  }, []);

  const removeCertification = useCallback((index: number) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  }, []);

  // Language handlers
  const updateLanguage = useCallback((index: number, field: string, value: string) => {
    setData((prev) => {
      const languages = [...prev.languages];
      languages[index] = { ...languages[index], [field]: value };
      return { ...prev, languages };
    });
  }, []);

  const addLanguage = useCallback(() => {
    setData((prev) => ({
      ...prev,
      languages: [
        ...prev.languages,
        { id: generateId(), name: '', proficiency: 'Conversational' },
      ],
    }));
  }, []);

  const removeLanguage = useCallback((index: number) => {
    setData((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }));
  }, []);

  // Achievement handlers
  const updateAchievement = useCallback((index: number, field: string, value: string) => {
    setData((prev) => {
      const achievements = [...prev.achievements];
      achievements[index] = { ...achievements[index], [field]: value };
      return { ...prev, achievements };
    });
  }, []);

  const addAchievement = useCallback(() => {
    setData((prev) => ({
      ...prev,
      achievements: [
        ...prev.achievements,
        {
          id: generateId(),
          title: '',
          issuer: '',
          date: '',
          description: '',
        },
      ],
    }));
  }, []);

  const removeAchievement = useCallback((index: number) => {
    setData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  }, []);

  // Custom Section handlers
  const addCustomSection = useCallback((title: string) => {
    const newId = `custom-${generateId()}`;
    const newSection: CustomSection = {
      id: newId,
      title: title.trim() || 'Custom Section',
      items: [
        {
          id: generateId(),
          title: '',
          subtitle: '',
          date: '',
          description: '',
        },
      ],
    };
    setData((prev) => ({
      ...prev,
      customSections: [...prev.customSections, newSection],
      sectionOrder: [...prev.sectionOrder, newId],
    }));
  }, []);

  const removeCustomSection = useCallback((sectionId: string) => {
    setData((prev) => ({
      ...prev,
      customSections: prev.customSections.filter((s) => s.id !== sectionId),
      sectionOrder: prev.sectionOrder.filter((id) => id !== sectionId),
      settings: {
        ...prev.settings,
        hiddenSections: prev.settings.hiddenSections.filter((id) => id !== sectionId),
      },
    }));
  }, []);

  const updateCustomSectionTitle = useCallback((sectionId: string, title: string) => {
    setData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) =>
        s.id === sectionId ? { ...s, title } : s
      ),
    }));
  }, []);

  const addCustomItem = useCallback((sectionId: string) => {
    setData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              items: [
                ...s.items,
                {
                  id: generateId(),
                  title: '',
                  subtitle: '',
                  date: '',
                  description: '',
                },
              ],
            }
          : s
      ),
    }));
  }, []);

  const updateCustomItem = useCallback(
    (sectionId: string, itemIndex: number, field: keyof CustomItem, value: string) => {
      setData((prev) => ({
        ...prev,
        customSections: prev.customSections.map((s) => {
          if (s.id !== sectionId) return s;
          const items = [...s.items];
          items[itemIndex] = { ...items[itemIndex], [field]: value };
          return { ...s, items };
        }),
      }));
    },
    []
  );

  const removeCustomItem = useCallback((sectionId: string, itemIndex: number) => {
    setData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) =>
        s.id === sectionId
          ? { ...s, items: s.items.filter((_, i) => i !== itemIndex) }
          : s
      ),
    }));
  }, []);

  // Skills & Interests
  const updateSkills = useCallback((value: string) => {
    setData((prev) => ({ ...prev, skills: value }));
  }, []);

  const updateInterests = useCallback((value: string) => {
    setData((prev) => ({ ...prev, interests: value }));
  }, []);

  // Theme, Font & Visibility
  const setAccentColor = useCallback((accentColor: AccentColor) => {
    setData((prev) => ({
      ...prev,
      settings: { ...prev.settings, accentColor },
    }));
  }, []);

  const setFontFamily = useCallback((fontFamily: FontFamily) => {
    setData((prev) => ({
      ...prev,
      settings: { ...prev.settings, fontFamily },
    }));
  }, []);

  const toggleSectionVisibility = useCallback((sectionId: string) => {
    setData((prev) => {
      const isHidden = prev.settings.hiddenSections.includes(sectionId);
      const hiddenSections = isHidden
        ? prev.settings.hiddenSections.filter((id) => id !== sectionId)
        : [...prev.settings.hiddenSections, sectionId];
      return {
        ...prev,
        settings: { ...prev.settings, hiddenSections },
      };
    });
  }, []);

  const setSectionOrder = useCallback((order: string[]) => {
    setData((prev) => ({ ...prev, sectionOrder: order }));
  }, []);

  const loadData = useCallback((newData: ResumeData) => {
    setData({
      ...emptyResumeData,
      ...newData,
      personalInfo: {
        ...emptyResumeData.personalInfo,
        ...(newData.personalInfo || {}),
        customFields: newData.personalInfo?.customFields || [],
      },
      education: newData.education || [],
      experience: newData.experience || [],
      projects: newData.projects || [],
      certifications: newData.certifications || [],
      languages: newData.languages || [],
      achievements: newData.achievements || [],
      customSections: newData.customSections || [],
      skills: newData.skills || '',
      interests: newData.interests || '',
      sectionOrder: newData.sectionOrder || emptyResumeData.sectionOrder,
      settings: { ...defaultSettings, ...(newData.settings || {}) },
    });
  }, []);

  const loadSampleData = useCallback(() => {
    setData(sampleResumeData);
  }, []);

  const clearData = useCallback(() => {
    setData(emptyResumeData);
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        data,
        template,
        setTemplate,
        updatePersonalInfo,
        addCustomField,
        updateCustomField,
        removeCustomField,
        updateEducation,
        addEducation,
        removeEducation,
        updateExperience,
        addExperience,
        removeExperience,
        updateProject,
        addProject,
        removeProject,
        updateCertification,
        addCertification,
        removeCertification,
        updateLanguage,
        addLanguage,
        removeLanguage,
        updateAchievement,
        addAchievement,
        removeAchievement,
        addCustomSection,
        removeCustomSection,
        updateCustomSectionTitle,
        addCustomItem,
        updateCustomItem,
        removeCustomItem,
        updateSkills,
        updateInterests,
        setAccentColor,
        setFontFamily,
        toggleSectionVisibility,
        setSectionOrder,
        loadData,
        loadSampleData,
        clearData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
