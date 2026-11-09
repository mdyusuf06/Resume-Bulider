import React from 'react';
import { ResumeData } from '@/types/resume';
import { ACCENT_COLOR_MAP, FONT_FAMILY_MAP } from '@/utils/themeUtils';

export default function ModernTemplate({ data }: { data: ResumeData }) {
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
  const theme = ACCENT_COLOR_MAP[settings?.accentColor || 'teal'];
  const fontClass = FONT_FAMILY_MAP[settings?.fontFamily || 'sans'];

  const renderSection = (id: string) => {
    if (hidden.includes(id)) return null;

    // Check custom section
    if (id.startsWith('custom-')) {
      const custom = customSections.find((s) => s.id === id);
      if (!custom || !custom.items || custom.items.length === 0) return null;
      return (
        <div key={custom.id} className="mb-4 break-inside-avoid">
          <div className="flex items-center gap-2 mb-2">
            <span className={`w-2.5 h-2.5 rounded-full ${theme.bg}`}></span>
            <h3 className={`text-xs font-bold tracking-wide ${theme.text} uppercase`}>{custom.title}</h3>
          </div>
          {custom.items.map((item) => (
            <div key={item.id} className={`mb-2 pl-3.5 border-l-2 ${theme.border} break-inside-avoid`}>
              <div className="flex justify-between items-baseline">
                <span className="font-semibold text-gray-900 text-xs">{item.title}</span>
                {item.date && <span className="text-[10px] text-gray-500">{item.date}</span>}
              </div>
              {item.subtitle && <div className={`text-[10px] font-medium ${theme.primary} mb-0.5`}>{item.subtitle}</div>}
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
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2.5 h-2.5 rounded-full ${theme.bg}`}></span>
              <h3 className={`text-xs font-bold tracking-wide ${theme.text} uppercase`}>Experience</h3>
            </div>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3 pl-3.5 border-l-2 border-slate-200 break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-gray-900 text-xs">{exp.position}</span>
                  {(exp.startDate || exp.endDate) && (
                    <span
                      className={`text-[10px] ${theme.badgeText} ${theme.badgeBg} px-2 py-0.5 rounded font-medium border border-slate-200`}
                    >
                      {exp.startDate} {exp.startDate && exp.endDate && '–'} {exp.endDate}
                    </span>
                  )}
                </div>
                {(exp.company || exp.location) && (
                  <div className="text-[11px] text-gray-600 mb-1">
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </div>
                )}
                {exp.description && (
                  <p className="text-[11px] text-gray-700 whitespace-pre-line leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" className="mb-4 break-inside-avoid">
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2.5 h-2.5 rounded-full ${theme.bg}`}></span>
              <h3 className={`text-xs font-bold tracking-wide ${theme.text} uppercase`}>Education</h3>
            </div>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2 pl-3.5 border-l-2 border-slate-200 break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-gray-900 text-xs">{edu.institution}</span>
                  {(edu.startDate || edu.endDate) && (
                    <span
                      className={`text-[10px] ${theme.badgeText} ${theme.badgeBg} px-2 py-0.5 rounded font-medium border border-slate-200`}
                    >
                      {edu.startDate} {edu.startDate && edu.endDate && '–'} {edu.endDate}
                    </span>
                  )}
                </div>
                {(edu.degree || edu.field || edu.gpa) && (
                  <div className="text-[11px] text-gray-600">
                    {edu.degree} {edu.field && `in ${edu.field}`} {edu.gpa && `• GPA: ${edu.gpa}`}
                  </div>
                )}
                {edu.description && <p className="text-[11px] text-gray-700 mt-0.5 leading-relaxed">{edu.description}</p>}
              </div>
            ))}
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" className="mb-4 break-inside-avoid">
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2.5 h-2.5 rounded-full ${theme.bg}`}></span>
              <h3 className={`text-xs font-bold tracking-wide ${theme.text} uppercase`}>Projects</h3>
            </div>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-2 pl-3.5 border-l-2 border-slate-200 break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-gray-900 text-xs">{proj.name}</span>
                  {proj.url && <span className={`text-[10px] ${theme.primary} underline`}>{proj.url}</span>}
                </div>
                {proj.technologies && <div className={`text-[10px] ${theme.primary} font-medium mb-0.5`}>{proj.technologies}</div>}
                {proj.description && (
                  <p className="text-[11px] text-gray-700 whitespace-pre-line leading-relaxed">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" className="mb-4 break-inside-avoid">
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2.5 h-2.5 rounded-full ${theme.bg}`}></span>
              <h3 className={`text-xs font-bold tracking-wide ${theme.text} uppercase`}>Certifications</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 pl-3.5">
              {certifications.map((c) => (
                <div key={c.id} className="bg-slate-50 border border-slate-200 rounded p-2 text-xs break-inside-avoid">
                  <div className="font-semibold text-gray-900 text-[11px]">{c.name}</div>
                  <div className="text-gray-500 text-[10px] flex justify-between mt-0.5">
                    <span>{c.issuer}</span>
                    <span>{c.date}</span>
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
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2.5 h-2.5 rounded-full ${theme.bg}`}></span>
              <h3 className={`text-xs font-bold tracking-wide ${theme.text} uppercase`}>Achievements & Honors</h3>
            </div>
            {achievements.map((ach) => (
              <div key={ach.id} className="mb-2 pl-3.5 border-l-2 border-slate-200 break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-gray-900 text-xs">{ach.title}</span>
                  {ach.date && <span className="text-[10px] text-gray-500">{ach.date}</span>}
                </div>
                {ach.issuer && <div className={`text-[11px] ${theme.primary}`}>{ach.issuer}</div>}
                {ach.description && <p className="text-[11px] text-gray-700 mt-0.5">{ach.description}</p>}
              </div>
            ))}
          </div>
        );

      case 'skills':
        if (!skills) return null;
        return (
          <div key="skills" className="mb-4 break-inside-avoid">
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2.5 h-2.5 rounded-full ${theme.bg}`}></span>
              <h3 className={`text-xs font-bold tracking-wide ${theme.text} uppercase`}>Core Skills</h3>
            </div>
            <div className="flex flex-wrap gap-1 pl-3.5">
              {skills.split(',').map((s, idx) => {
                const trimmed = s.trim();
                if (!trimmed) return null;
                return (
                  <span
                    key={idx}
                    className={`${theme.badgeBg} ${theme.badgeText} text-[11px] px-2 py-0.5 rounded border border-slate-200 font-medium`}
                  >
                    {trimmed}
                  </span>
                );
              })}
            </div>
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" className="mb-4 break-inside-avoid">
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2.5 h-2.5 rounded-full ${theme.bg}`}></span>
              <h3 className={`text-xs font-bold tracking-wide ${theme.text} uppercase`}>Languages</h3>
            </div>
            <div className="flex flex-wrap gap-2 pl-3.5 text-xs">
              {languages.map((l) => (
                <div key={l.id} className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-[11px]">
                  <span className="font-semibold text-gray-900">{l.name}</span>
                  {l.proficiency && <span className="text-slate-500 ml-1.5 text-[10px]">({l.proficiency})</span>}
                </div>
              ))}
            </div>
          </div>
        );

      case 'interests':
        if (!interests) return null;
        return (
          <div key="interests" className="mb-3 break-inside-avoid">
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${theme.bg}`}></span>
              <h3 className={`text-xs font-bold tracking-wide ${theme.text} uppercase`}>Interests</h3>
            </div>
            <p className="text-[11px] text-gray-700 pl-3.5 leading-relaxed">{interests}</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`w-[210mm] min-h-[297mm] bg-white text-gray-800 text-sm ${fontClass} mx-auto box-border flex flex-col justify-between shadow-xs`}>
      <div>
        {/* Modern Accent Header */}
        <div className={`bg-gradient-to-r ${theme.gradient} text-white p-7 mb-4`}>
          <div className="flex justify-between items-baseline flex-wrap gap-1">
            <h1 className="text-2xl font-black tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.title && <span className="text-xs font-medium text-white/90">{personalInfo.title}</span>}
          </div>
          <div className="flex flex-wrap gap-x-3.5 gap-y-1 text-[11px] text-white/80 mt-2">
            {personalInfo.email && <span>✉ {personalInfo.email}</span>}
            {personalInfo.phone && <span>☎ {personalInfo.phone}</span>}
            {personalInfo.location && <span>📍 {personalInfo.location}</span>}
            {personalInfo.website && <span>🔗 {personalInfo.website}</span>}
            {personalInfo.linkedin && <span>💼 {personalInfo.linkedin}</span>}
            {personalInfo.github && <span>🐙 {personalInfo.github}</span>}
            {personalInfo.customFields?.map((cf) => cf.value && (
              <span key={cf.id}>
                • {cf.label ? `${cf.label}: ` : ''}{cf.value}
              </span>
            ))}
          </div>
          {personalInfo.summary && (
            <p className="text-[11px] text-white/90 mt-2.5 pt-2 border-t border-white/20 leading-relaxed">
              {personalInfo.summary}
            </p>
          )}
        </div>

        {/* Content Body */}
        <div className="px-7 pb-6">
          {sectionOrder.map((sectionId) => renderSection(sectionId))}
        </div>
      </div>
    </div>
  );
}
