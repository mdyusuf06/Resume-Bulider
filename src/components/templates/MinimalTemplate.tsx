import React from 'react';
import { ResumeData } from '@/types/resume';
import { ACCENT_COLOR_MAP, FONT_FAMILY_MAP } from '@/utils/themeUtils';

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  const {
    personalInfo,
    education = [],
    experience = [],
    projects = [],
    certifications = [],
    languages = [],
    achievements = [],
    customSections = [],
    skills = '',
    interests = '',
    sectionOrder = [],
    settings,
  } = data;

  const hidden = settings?.hiddenSections || [];
  const theme = ACCENT_COLOR_MAP[settings?.accentColor || 'blue'];
  const fontClass = FONT_FAMILY_MAP[settings?.fontFamily || 'sans'];

  const renderSection = (id: string) => {
    if (hidden.includes(id)) return null;

    // Check custom section
    if (id.startsWith('custom-')) {
      const custom = customSections.find((s) => s.id === id);
      if (!custom || !custom.items || custom.items.length === 0) return null;
      return (
        <div key={custom.id} className="mb-4 break-inside-avoid">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-300 pb-0.5 mb-2">
            {custom.title}
          </h3>
          {custom.items.map((item) => (
            <div key={item.id} className="mb-2.5 break-inside-avoid">
              <div className="flex justify-between items-baseline">
                <span className="font-semibold text-gray-900">{item.title}</span>
                {item.date && <span className="text-xs text-gray-500">{item.date}</span>}
              </div>
              {item.subtitle && <div className="text-xs text-gray-600 mb-0.5">{item.subtitle}</div>}
              {item.description && (
                <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      );
    }

    switch (id) {
      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" className="mb-4 break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-300 pb-0.5 mb-2">
              Experience
            </h3>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3 break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-gray-900">{exp.position}</span>
                  {(exp.startDate || exp.endDate) && (
                    <span className="text-xs text-gray-500">
                      {exp.startDate} {exp.startDate && exp.endDate && '–'} {exp.endDate}
                    </span>
                  )}
                </div>
                {(exp.company || exp.location) && (
                  <div className="text-xs text-gray-600 mb-1">
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </div>
                )}
                {exp.description && (
                  <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" className="mb-4 break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-300 pb-0.5 mb-2">
              Education
            </h3>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2 break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-gray-900">{edu.institution}</span>
                  {(edu.startDate || edu.endDate) && (
                    <span className="text-xs text-gray-500">
                      {edu.startDate} {edu.startDate && edu.endDate && '–'} {edu.endDate}
                    </span>
                  )}
                </div>
                {(edu.degree || edu.field || edu.gpa) && (
                  <div className="text-xs text-gray-600">
                    {edu.degree} {edu.field && `in ${edu.field}`} {edu.gpa && `• GPA: ${edu.gpa}`}
                  </div>
                )}
                {edu.description && <p className="text-xs text-gray-700 mt-0.5 leading-relaxed">{edu.description}</p>}
              </div>
            ))}
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" className="mb-4 break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-300 pb-0.5 mb-2">
              Projects
            </h3>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-2.5 break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-gray-900">{proj.name}</span>
                  {proj.url && <span className="text-xs text-gray-500">{proj.url}</span>}
                </div>
                {proj.technologies && <div className="text-xs text-gray-600 font-medium mb-0.5">{proj.technologies}</div>}
                {proj.description && (
                  <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" className="mb-4 break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-300 pb-0.5 mb-2">
              Certifications & Licensures
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-xs break-inside-avoid">
                  <div className="font-semibold text-gray-900">{cert.name}</div>
                  <div className="text-gray-500 flex justify-between">
                    <span>{cert.issuer}</span>
                    <span>{cert.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'achievements':
        if (!achievements || achievements.length === 0) return null;
        return (
          <div key="achievements" className="mb-4 break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-300 pb-0.5 mb-2">
              Honors & Achievements
            </h3>
            {achievements.map((ach) => (
              <div key={ach.id} className="mb-2 break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-gray-900 text-xs">{ach.title}</span>
                  {ach.date && <span className="text-xs text-gray-500">{ach.date}</span>}
                </div>
                {ach.issuer && <div className="text-xs text-gray-600">{ach.issuer}</div>}
                {ach.description && <p className="text-xs text-gray-700 mt-0.5">{ach.description}</p>}
              </div>
            ))}
          </div>
        );

      case 'skills':
        if (!skills) return null;
        return (
          <div key="skills" className="mb-4 break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-300 pb-0.5 mb-1.5">
              Skills & Expertise
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed">{skills}</p>
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" className="mb-4 break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-300 pb-0.5 mb-1.5">
              Languages
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-700">
              {languages.map((l) => (
                <span key={l.id}>
                  <strong className="font-medium text-gray-900">{l.name}</strong>
                  {l.proficiency && ` (${l.proficiency})`}
                </span>
              ))}
            </div>
          </div>
        );

      case 'interests':
        if (!interests) return null;
        return (
          <div key="interests" className="mb-4 break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-300 pb-0.5 mb-1.5">
              Interests & Activities
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed">{interests}</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`w-[210mm] min-h-[297mm] p-12 bg-white text-gray-800 text-sm ${fontClass} mx-auto box-border flex flex-col justify-between`}>
      <div>
        {/* Header */}
        <div className="border-b border-gray-300 pb-3 mb-4">
          <div className="flex justify-between items-baseline flex-wrap gap-1">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.title && <span className={`text-sm font-medium ${theme.primary}`}>{personalInfo.title}</span>}
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-gray-600 mt-1.5">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
            {personalInfo.website && <span>• {personalInfo.website}</span>}
            {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
            {personalInfo.github && <span>• {personalInfo.github}</span>}
            {personalInfo.customFields?.map((cf) => cf.value && (
              <span key={cf.id}>
                • {cf.label ? `${cf.label}: ` : ''}{cf.value}
              </span>
            ))}
          </div>
          {personalInfo.summary && (
            <p className="text-xs text-gray-700 mt-2 leading-relaxed">{personalInfo.summary}</p>
          )}
        </div>

        {/* Dynamic Sections in order */}
        {sectionOrder.map((sectionId) => renderSection(sectionId))}
      </div>
    </div>
  );
}
