import React from 'react';
import { ResumeData } from '@/types/resume';
import { FONT_FAMILY_MAP } from '@/utils/themeUtils';

export default function ATSTemplate({ data }: { data: ResumeData }) {
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
  const fontClass = FONT_FAMILY_MAP[settings?.fontFamily || 'sans'];

  const renderSection = (id: string) => {
    if (hidden.includes(id)) return null;

    // Custom Section
    if (id.startsWith('custom-')) {
      const custom = customSections.find((s) => s.id === id);
      if (!custom || !custom.items || custom.items.length === 0) return null;
      return (
        <section key={custom.id} className="mb-4 break-inside-avoid">
          <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
            {custom.title}
          </h2>
          {custom.items.map((item) => (
            <article key={item.id} className="mb-2.5 break-inside-avoid">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-xs text-black">{item.title}</span>
                {item.date && <span className="text-xs text-black">{item.date}</span>}
              </div>
              {item.subtitle && <div className="text-xs italic text-black mb-0.5">{item.subtitle}</div>}
              {item.description && (
                <p className="text-xs text-black whitespace-pre-line leading-relaxed">{item.description}</p>
              )}
            </article>
          ))}
        </section>
      );
    }

    switch (id) {
      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <section key="experience" className="mb-4 break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
              Work Experience
            </h2>
            {experience.map((exp) => (
              <article key={exp.id} className="mb-3 break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-xs text-black">{exp.position}</span>
                  {(exp.startDate || exp.endDate) && (
                    <span className="text-xs text-black">
                      {exp.startDate} {exp.startDate && exp.endDate && '–'} {exp.endDate}
                    </span>
                  )}
                </div>
                {(exp.company || exp.location) && (
                  <div className="text-xs italic text-black mb-1">
                    {exp.company} {exp.location && `| ${exp.location}`}
                  </div>
                )}
                {exp.description && (
                  <p className="text-xs text-black whitespace-pre-line leading-relaxed pl-1">{exp.description}</p>
                )}
              </article>
            ))}
          </section>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <section key="education" className="mb-4 break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
              Education
            </h2>
            {education.map((edu) => (
              <article key={edu.id} className="mb-2.5 break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-xs text-black">{edu.institution}</span>
                  {(edu.startDate || edu.endDate) && (
                    <span className="text-xs text-black">
                      {edu.startDate} {edu.startDate && edu.endDate && '–'} {edu.endDate}
                    </span>
                  )}
                </div>
                {(edu.degree || edu.field || edu.gpa) && (
                  <div className="text-xs text-black">
                    {edu.degree} {edu.field && `in ${edu.field}`} {edu.gpa && `| GPA: ${edu.gpa}`}
                  </div>
                )}
                {edu.description && (
                  <p className="text-xs text-black mt-0.5 leading-relaxed pl-1">{edu.description}</p>
                )}
              </article>
            ))}
          </section>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <section key="projects" className="mb-4 break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
              Projects
            </h2>
            {projects.map((proj) => (
              <article key={proj.id} className="mb-2.5 break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-xs text-black">{proj.name}</span>
                  {proj.url && <span className="text-xs text-black">{proj.url}</span>}
                </div>
                {proj.technologies && (
                  <div className="text-xs italic text-black mb-0.5">Technologies: {proj.technologies}</div>
                )}
                {proj.description && (
                  <p className="text-xs text-black whitespace-pre-line leading-relaxed pl-1">{proj.description}</p>
                )}
              </article>
            ))}
          </section>
        );

      case 'skills':
        if (!skills) return null;
        return (
          <section key="skills" className="mb-4 break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
              Technical & Core Skills
            </h2>
            <p className="text-xs text-black leading-relaxed">{skills}</p>
          </section>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <section key="certifications" className="mb-4 break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
              Certifications
            </h2>
            <ul className="list-disc list-inside text-xs text-black space-y-1">
              {certifications.map((c) => (
                <li key={c.id}>
                  <strong>{c.name}</strong> – {c.issuer} {c.date && `(${c.date})`}
                </li>
              ))}
            </ul>
          </section>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <section key="languages" className="mb-4 break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
              Languages
            </h2>
            <p className="text-xs text-black">
              {languages.map((l, i) => (
                <span key={l.id}>
                  <strong>{l.name}</strong> ({l.proficiency})
                  {i < languages.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          </section>
        );

      case 'achievements':
        if (!achievements || achievements.length === 0) return null;
        return (
          <section key="achievements" className="mb-4 break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
              Honors & Awards
            </h2>
            {achievements.map((ach) => (
              <article key={ach.id} className="mb-2 break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-xs text-black">{ach.title}</span>
                  {ach.date && <span className="text-xs text-black">{ach.date}</span>}
                </div>
                {ach.issuer && <div className="text-xs italic text-black">{ach.issuer}</div>}
                {ach.description && <p className="text-xs text-black mt-0.5 pl-1">{ach.description}</p>}
              </article>
            ))}
          </section>
        );

      case 'interests':
        if (!interests) return null;
        return (
          <section key="interests" className="mb-3 break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
              Additional Information & Interests
            </h2>
            <p className="text-xs text-black">{interests}</p>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`w-[210mm] min-h-[297mm] p-12 bg-white text-black text-sm ${fontClass} mx-auto box-border`}>
      {/* ATS Header: Center-aligned or Left-aligned standard text with zero complex columns */}
      <header className="border-b-2 border-black pb-3 mb-4 text-center">
        <h1 className="text-2xl font-bold uppercase tracking-wide text-black">
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        {personalInfo.title && <div className="text-xs font-semibold text-black mt-0.5">{personalInfo.title}</div>}

        <div className="flex flex-wrap justify-center gap-x-3 gap-y-0.5 text-xs text-black mt-1.5">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.email && <span>| {personalInfo.email}</span>}
          {personalInfo.website && <span>| {personalInfo.website}</span>}
          {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>| {personalInfo.github}</span>}
          {personalInfo.customFields?.map((cf) => (
            <span key={cf.id}>
              | {cf.label}: {cf.value}
            </span>
          ))}
        </div>

        {personalInfo.summary && (
          <p className="text-xs text-black mt-2 text-left leading-relaxed">{personalInfo.summary}</p>
        )}
      </header>

      {/* Main Body */}
      <main>{sectionOrder.map((sectionId) => renderSection(sectionId))}</main>
    </div>
  );
}

