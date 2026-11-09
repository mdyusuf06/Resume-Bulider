import React from 'react';
import { ResumeData } from '@/types/resume';
import { ACCENT_COLOR_MAP, FONT_FAMILY_MAP } from '@/utils/themeUtils';

export default function ProfessionalTemplate({ data }: { data: ResumeData }) {
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

  const renderMainSection = (id: string) => {
    if (hidden.includes(id)) return null;

    // Check custom section
    if (id.startsWith('custom-')) {
      const custom = customSections.find((s) => s.id === id);
      if (!custom || !custom.items || custom.items.length === 0) return null;
      return (
        <div key={custom.id} className="mb-4 break-inside-avoid">
          <h3
            className={`text-xs font-bold uppercase tracking-wider ${theme.text} border-b-2 ${theme.border} pb-0.5 mb-2`}
          >
            {custom.title}
          </h3>
          {custom.items.map((item) => (
            <div key={item.id} className="mb-2.5 break-inside-avoid">
              <div className="flex justify-between items-baseline">
                <span className="font-semibold text-gray-900 text-xs">{item.title}</span>
                {item.date && <span className="text-[10px] text-gray-500">{item.date}</span>}
              </div>
              {item.subtitle && <div className={`text-[11px] font-medium ${theme.primary} mb-0.5`}>{item.subtitle}</div>}
              {item.description && (
                <p className="text-[11px] text-gray-700 whitespace-pre-line leading-relaxed">{item.description}</p>
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
            <h3
              className={`text-xs font-bold uppercase tracking-wider ${theme.text} border-b-2 ${theme.border} pb-0.5 mb-2.5`}
            >
              Work Experience
            </h3>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3 break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-gray-900 text-xs">{exp.position}</span>
                  {(exp.startDate || exp.endDate) && (
                    <span className="text-[11px] text-gray-500 font-medium">
                      {exp.startDate} {exp.startDate && exp.endDate && '–'} {exp.endDate}
                    </span>
                  )}
                </div>
                {(exp.company || exp.location) && (
                  <div className={`text-[11px] font-medium ${theme.primary} mb-1`}>
                    {exp.company} {exp.location && `| ${exp.location}`}
                  </div>
                )}
                {exp.description && (
                  <p className="text-[11px] text-gray-700 whitespace-pre-line leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" className="mb-4 break-inside-avoid">
            <h3
              className={`text-xs font-bold uppercase tracking-wider ${theme.text} border-b-2 ${theme.border} pb-0.5 mb-2.5`}
            >
              Key Projects
            </h3>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-2.5 break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-gray-900 text-xs">{proj.name}</span>
                  {proj.url && <span className={`text-[10px] ${theme.primary}`}>{proj.url}</span>}
                </div>
                {proj.technologies && <div className="text-[10px] text-gray-500 mb-0.5">{proj.technologies}</div>}
                {proj.description && (
                  <p className="text-[11px] text-gray-700 whitespace-pre-line leading-relaxed">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        );

      case 'achievements':
        if (!achievements || achievements.length === 0) return null;
        return (
          <div key="achievements" className="mb-4 break-inside-avoid">
            <h3
              className={`text-xs font-bold uppercase tracking-wider ${theme.text} border-b-2 ${theme.border} pb-0.5 mb-2`}
            >
              Honors & Achievements
            </h3>
            {achievements.map((ach) => (
              <div key={ach.id} className="mb-2 break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-gray-900 text-xs">{ach.title}</span>
                  {ach.date && <span className="text-[10px] text-gray-500">{ach.date}</span>}
                </div>
                {ach.issuer && <div className={`text-[10px] ${theme.primary}`}>{ach.issuer}</div>}
                {ach.description && <p className="text-[11px] text-gray-700 mt-0.5">{ach.description}</p>}
              </div>
            ))}
          </div>
        );

      case 'interests':
        if (!interests) return null;
        return (
          <div key="interests" className="mb-3 break-inside-avoid">
            <h3
              className={`text-xs font-bold uppercase tracking-wider ${theme.text} border-b-2 ${theme.border} pb-0.5 mb-1.5`}
            >
              Interests
            </h3>
            <p className="text-[11px] text-gray-700">{interests}</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`w-[210mm] min-h-[297mm] bg-white text-gray-800 text-sm ${fontClass} mx-auto box-border flex`}>
      {/* Left Sidebar (72mm) */}
      <div className="w-[72mm] bg-slate-100 p-6 flex flex-col gap-4 border-r border-slate-200 flex-shrink-0">
        <div>
          <h1 className="text-lg font-bold text-slate-900 leading-tight">{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.title && <p className={`text-xs font-medium ${theme.primary} mt-0.5`}>{personalInfo.title}</p>}
          {personalInfo.location && <p className="text-[11px] text-slate-500 mt-1">📍 {personalInfo.location}</p>}
        </div>

        {/* Contact info */}
        <div className="break-inside-avoid">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-600 border-b border-slate-300 pb-1 mb-2">
            Contact Details
          </h3>
          <div className="text-[11px] text-slate-700 space-y-1">
            {personalInfo.email && <div className="break-all">✉ {personalInfo.email}</div>}
            {personalInfo.phone && <div>☎ {personalInfo.phone}</div>}
            {personalInfo.website && <div className="break-all">🔗 {personalInfo.website}</div>}
            {personalInfo.linkedin && <div className="break-all">💼 {personalInfo.linkedin}</div>}
            {personalInfo.github && <div className="break-all">🐙 {personalInfo.github}</div>}
            {personalInfo.customFields?.map((cf) => cf.value && (
              <div key={cf.id} className="break-all">
                • {cf.label ? `${cf.label}: ` : ''}{cf.value}
              </div>
            ))}
          </div>
        </div>

        {/* Education in sidebar */}
        {!hidden.includes('education') && education && education.length > 0 && (
          <div className="break-inside-avoid">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-600 border-b border-slate-300 pb-1 mb-2">
              Education
            </h3>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2 text-[11px] break-inside-avoid">
                <div className="font-semibold text-slate-900">{edu.institution}</div>
                <div className="text-slate-700">{edu.degree}</div>
                <div className="text-slate-500 text-[10px]">
                  {edu.startDate} {edu.startDate && edu.endDate && '–'} {edu.endDate} {edu.gpa && `• GPA: ${edu.gpa}`}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills in sidebar */}
        {!hidden.includes('skills') && skills && (
          <div className="break-inside-avoid">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-600 border-b border-slate-300 pb-1 mb-2">
              Core Skills
            </h3>
            <p className="text-[11px] text-slate-700 leading-relaxed whitespace-pre-line">{skills}</p>
          </div>
        )}

        {/* Certifications in sidebar */}
        {!hidden.includes('certifications') && certifications && certifications.length > 0 && (
          <div className="break-inside-avoid">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-600 border-b border-slate-300 pb-1 mb-2">
              Certifications
            </h3>
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-1.5 text-[11px] break-inside-avoid">
                <div className="font-semibold text-slate-900">{cert.name}</div>
                <div className="text-slate-500 text-[10px] flex justify-between">
                  <span>{cert.issuer}</span>
                  <span>{cert.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages in sidebar */}
        {!hidden.includes('languages') && languages && languages.length > 0 && (
          <div className="break-inside-avoid">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-600 border-b border-slate-300 pb-1 mb-2">
              Languages
            </h3>
            <div className="space-y-1 text-[11px] text-slate-700">
              {languages.map((l) => (
                <div key={l.id} className="flex justify-between">
                  <span className="font-medium text-slate-900">{l.name}</span>
                  <span className="text-slate-500 text-[10px]">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content (138mm) */}
      <div className="flex-1 p-6">
        {personalInfo.summary && (
          <div className="mb-4 break-inside-avoid">
            <h3
              className={`text-xs font-bold uppercase tracking-wider ${theme.text} border-b-2 ${theme.border} pb-0.5 mb-2`}
            >
              Executive Profile
            </h3>
            <p className="text-[11px] text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Main column sections according to sectionOrder */}
        {sectionOrder.map((sectionId) => renderMainSection(sectionId))}
      </div>
    </div>
  );
}
