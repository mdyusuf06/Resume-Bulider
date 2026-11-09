'use client';

import React, { useRef, useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { exportJSON, importJSON, triggerPrint } from '@/utils/fileUtils';
import { AccentColor, FontFamily } from '@/types/resume';
import { ACCENT_COLOR_MAP } from '@/utils/themeUtils';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const DEFAULT_SECTION_LABELS: Record<string, string> = {
  experience: '💼 Work Experience',
  education: '🎓 Education & Degrees',
  projects: '🚀 Key Projects',
  skills: '🛠 Skills & Expertise',
  certifications: '📜 Certifications & Licenses',
  languages: '🌐 Languages',
  achievements: '🏆 Honors & Achievements',
  interests: '🎨 Interests & Hobbies',
};

function SortableItem({
  id,
  label,
  isHidden,
  onToggle,
  onDelete,
}: {
  id: string;
  label: string;
  isHidden: boolean;
  onToggle: () => void;
  onDelete?: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between border rounded px-2.5 py-1.5 mb-1 text-xs select-none shadow-2xs transition-colors ${
        isHidden
          ? 'bg-gray-100 border-gray-200 text-gray-400 opacity-60'
          : 'bg-white border-slate-200 text-slate-800'
      }`}
    >
      <div className="flex items-center gap-2 cursor-grab active:cursor-grabbing flex-1" {...attributes} {...listeners}>
        <span className="text-slate-400 font-mono text-sm">⋮⋮</span>
        <span className={`text-[11px] font-semibold ${isHidden ? 'line-through text-gray-400' : 'text-slate-800'}`}>
          {label}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onToggle}
          className={`text-xs px-1.5 py-0.5 rounded border transition-colors ${
            isHidden
              ? 'bg-gray-200 text-gray-600 border-gray-300'
              : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
          }`}
          title={isHidden ? 'Show section on resume' : 'Hide section from resume'}
        >
          {isHidden ? 'Hidden' : 'Visible'}
        </button>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="text-slate-400 hover:text-red-600 font-bold px-1 text-sm leading-none"
            title="Delete this custom section"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
}

export default function FormPane() {
  const {
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
  } = useResume();

  const fileRef = useRef<HTMLInputElement>(null);
  const [newSectionTitle, setNewSectionTitle] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = data.sectionOrder.indexOf(active.id as string);
      const newIndex = data.sectionOrder.indexOf(over.id as string);
      setSectionOrder(arrayMove(data.sectionOrder, oldIndex, newIndex));
    }
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const parsed = await importJSON(file);
      loadData(parsed);
    } catch {
      alert('Invalid resume JSON format or corrupted file.');
    }
    e.target.value = '';
  }

  function handleCreateCustomSection(e: React.FormEvent) {
    e.preventDefault();
    if (!newSectionTitle.trim()) return;
    addCustomSection(newSectionTitle.trim());
    setNewSectionTitle('');
  }

  const hidden = data.settings?.hiddenSections || [];

  const inp =
    'w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors';
  const label = 'block text-[11px] font-medium text-gray-700 mb-0.5';
  const sectionCard = 'bg-white border border-gray-200 rounded-lg p-3 mb-3.5 shadow-2xs';
  const sectionHeader =
    'text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center justify-between border-b border-gray-100 pb-1';

  return (
    <div className="no-print w-full lg:w-[480px] xl:w-[500px] h-screen overflow-y-auto bg-slate-50 border-r border-gray-200 p-3 sm:p-4 flex-shrink-0">
      {/* App Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div>
          <h1 className="text-base sm:text-lg font-black tracking-tight text-gray-900 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
            Resume Builder
          </h1>
          <p className="text-[10px] text-gray-500">100% Optional Fields • ATS-Friendly • A4 PDF</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={loadSampleData}
            className="text-[10px] font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 px-2 py-1 rounded border border-blue-200 transition-colors"
            title="Load sample content"
          >
            Sample Data
          </button>
          <button
            onClick={clearData}
            className="text-[10px] font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 px-2 py-1 rounded border border-gray-200 transition-colors"
            title="Clear all fields"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Main Action Bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-2.5 mb-3.5 shadow-2xs flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] font-semibold text-gray-700 block mb-1">Resume Template:</label>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value as 'minimal' | 'professional' | 'modern' | 'ats')}
              className="w-full border border-gray-300 rounded px-2 py-1 text-xs font-medium bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="ats">⭐ ATS Standard (High ATS Score)</option>
              <option value="minimal">Minimal (Classic & Clean)</option>
              <option value="professional">Professional (Sidebar & Two-Tone)</option>
              <option value="modern">Modern (Accent Colors & Badges)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-700 block mb-1">Font Typography:</label>
            <select
              value={data.settings?.fontFamily || 'sans'}
              onChange={(e) => setFontFamily(e.target.value as FontFamily)}
              className="w-full border border-gray-300 rounded px-2 py-1 text-xs font-medium bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="sans">Clean Modern (Sans-Serif)</option>
              <option value="serif">Classic Academic (Serif)</option>
              <option value="mono">Technical / Code (Monospace)</option>
            </select>
          </div>
        </div>

        {/* Accent Color Palette */}
        <div>
          <label className="text-[11px] font-semibold text-gray-700 block mb-1">Accent Theme Color:</label>
          <div className="flex items-center gap-1.5 flex-wrap">
            {(Object.keys(ACCENT_COLOR_MAP) as AccentColor[]).map((colorKey) => {
              const c = ACCENT_COLOR_MAP[colorKey];
              const isSelected = (data.settings?.accentColor || 'blue') === colorKey;
              return (
                <button
                  key={colorKey}
                  type="button"
                  onClick={() => setAccentColor(colorKey)}
                  className={`w-5 h-5 rounded-full transition-transform ${
                    isSelected ? 'scale-125 ring-2 ring-offset-1 ring-blue-500' : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={`Select ${colorKey} theme`}
                />
              );
            })}
          </div>
        </div>

        {/* Print & File Actions */}
        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-gray-100">
          <button
            onClick={triggerPrint}
            className="col-span-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-1.5 px-2 rounded shadow-2xs flex items-center justify-center gap-1 transition-colors"
          >
            <span>🖨️</span> Export PDF
          </button>
          <button
            onClick={() => exportJSON(data)}
            className="bg-slate-700 hover:bg-slate-800 text-white text-xs py-1.5 px-2 rounded font-medium shadow-2xs flex items-center justify-center gap-1 transition-colors"
            title="Download full resume data as JSON"
          >
            <span>💾</span> Save JSON
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs py-1.5 px-2 rounded font-medium shadow-2xs flex items-center justify-center gap-1 transition-colors"
            title="Restore resume data from JSON file"
          >
            <span>📂</span> Load JSON
          </button>
          <input ref={fileRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
        </div>
      </div>

      {/* Drag-and-Drop & Visibility Section Manager */}
      <div className={sectionCard}>
        <div className={sectionHeader}>
          <span>Arrange & Toggle Sections</span>
          <span className="text-[10px] text-gray-400 font-normal">drag or hide</span>
        </div>
        <p className="text-[10px] text-gray-500 mb-2">
          Click <strong>Visible / Hidden</strong> to toggle any section on or off your resume.
        </p>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={data.sectionOrder} strategy={verticalListSortingStrategy}>
            {data.sectionOrder.map((id) => {
              const isCustom = id.startsWith('custom-');
              const customSec = isCustom ? data.customSections?.find((s) => s.id === id) : null;
              const labelText = isCustom
                ? `📝 ${customSec?.title || 'Custom Section'}`
                : DEFAULT_SECTION_LABELS[id] || id;

              return (
                <SortableItem
                  key={id}
                  id={id}
                  label={labelText}
                  isHidden={hidden.includes(id)}
                  onToggle={() => toggleSectionVisibility(id)}
                  onDelete={isCustom ? () => removeCustomSection(id) : undefined}
                />
              );
            })}
          </SortableContext>
        </DndContext>

        {/* Add Custom Section Form */}
        <form onSubmit={handleCreateCustomSection} className="mt-3 pt-2 border-t border-gray-100 flex gap-1.5">
          <input
            className={inp + ' text-xs'}
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            placeholder="New section title (e.g. Publications, Volunteering, Patents)..."
          />
          <button
            type="submit"
            className="bg-slate-800 hover:bg-slate-900 text-white text-xs px-2.5 py-1 rounded font-medium whitespace-nowrap transition-colors"
          >
            + Add Section
          </button>
        </form>
      </div>

      {/* Personal Info Form */}
      <div className={sectionCard}>
        <div className={sectionHeader}>
          <span>Personal & Contact Info</span>
          <button
            type="button"
            onClick={addCustomField}
            className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 normal-case"
          >
            + Add Custom Detail
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className={label}>Full Name</label>
            <input
              className={inp}
              value={data.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
              placeholder="e.g. Alex Morgan"
            />
          </div>
          <div>
            <label className={label}>Professional Title / Role</label>
            <input
              className={inp}
              value={data.personalInfo.title}
              onChange={(e) => updatePersonalInfo('title', e.target.value)}
              placeholder="e.g. Senior Software Engineer"
            />
          </div>
          <div>
            <label className={label}>Email Address</label>
            <input
              className={inp}
              value={data.personalInfo.email}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
              placeholder="alex@example.com"
            />
          </div>
          <div>
            <label className={label}>Phone Number</label>
            <input
              className={inp}
              value={data.personalInfo.phone}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div>
            <label className={label}>Location / City</label>
            <input
              className={inp}
              value={data.personalInfo.location}
              onChange={(e) => updatePersonalInfo('location', e.target.value)}
              placeholder="San Francisco, CA"
            />
          </div>
          <div>
            <label className={label}>Portfolio / Website</label>
            <input
              className={inp}
              value={data.personalInfo.website}
              onChange={(e) => updatePersonalInfo('website', e.target.value)}
              placeholder="https://alexmorgan.dev"
            />
          </div>
          <div>
            <label className={label}>LinkedIn</label>
            <input
              className={inp}
              value={data.personalInfo.linkedin}
              onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
              placeholder="linkedin.com/in/alexmorgan"
            />
          </div>
          <div>
            <label className={label}>GitHub / Repo</label>
            <input
              className={inp}
              value={data.personalInfo.github}
              onChange={(e) => updatePersonalInfo('github', e.target.value)}
              placeholder="github.com/alexmorgan"
            />
          </div>

          {/* User Custom Fields in Personal Info */}
          {data.personalInfo.customFields?.map((cf) => (
            <div key={cf.id} className="col-span-2 flex items-center gap-1.5 bg-slate-50 p-1.5 rounded border border-slate-200">
              <input
                className={inp + ' w-1/3'}
                value={cf.label}
                onChange={(e) => updateCustomField(cf.id, 'label', e.target.value)}
                placeholder="Field Name (e.g. Clearance, Visa)"
              />
              <input
                className={inp + ' flex-1'}
                value={cf.value}
                onChange={(e) => updateCustomField(cf.id, 'value', e.target.value)}
                placeholder="Value (e.g. Top Secret, US Citizen)"
              />
              <button
                type="button"
                onClick={() => removeCustomField(cf.id)}
                className="text-slate-400 hover:text-red-600 font-bold px-1 text-base leading-none"
                title="Remove detail"
              >
                &times;
              </button>
            </div>
          ))}

          <div className="col-span-2">
            <label className={label}>Summary / Objective</label>
            <textarea
              className={inp + ' h-16 resize-none leading-relaxed'}
              value={data.personalInfo.summary}
              onChange={(e) => updatePersonalInfo('summary', e.target.value)}
              placeholder="Brief summary of your background, technical depth, and impact..."
            />
          </div>
        </div>
      </div>

      {/* Experience Form */}
      <div className={sectionCard}>
        <div className={sectionHeader}>
          <span>Work Experience</span>
          <button
            type="button"
            onClick={addExperience}
            className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 normal-case"
          >
            + Add Position
          </button>
        </div>
        {data.experience.length === 0 && (
          <p className="text-[11px] text-gray-400 italic">No experience added. Click &apos;+ Add Position&apos; to add one.</p>
        )}
        {data.experience.map((exp, i) => (
          <div key={exp.id} className="bg-slate-50 border border-slate-200 rounded p-2.5 mb-2 relative">
            <button
              type="button"
              onClick={() => removeExperience(i)}
              className="absolute top-1.5 right-2 text-slate-400 hover:text-red-600 font-bold text-base leading-none"
              title="Delete Position"
            >
              &times;
            </button>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2">
                <label className={label}>Job Title</label>
                <input
                  className={inp}
                  value={exp.position}
                  onChange={(e) => updateExperience(i, 'position', e.target.value)}
                  placeholder="Senior Frontend Engineer"
                />
              </div>
              <div className="col-span-2">
                <label className={label}>Company</label>
                <input
                  className={inp}
                  value={exp.company}
                  onChange={(e) => updateExperience(i, 'company', e.target.value)}
                  placeholder="Acme Corp"
                />
              </div>
              <div>
                <label className={label}>Start Date</label>
                <input
                  className={inp}
                  value={exp.startDate}
                  onChange={(e) => updateExperience(i, 'startDate', e.target.value)}
                  placeholder="Mar 2022"
                />
              </div>
              <div>
                <label className={label}>End Date</label>
                <input
                  className={inp}
                  value={exp.endDate}
                  onChange={(e) => updateExperience(i, 'endDate', e.target.value)}
                  placeholder="Present"
                />
              </div>
              <div className="col-span-2">
                <label className={label}>Location</label>
                <input
                  className={inp}
                  value={exp.location}
                  onChange={(e) => updateExperience(i, 'location', e.target.value)}
                  placeholder="San Francisco, CA (or Remote)"
                />
              </div>
              <div className="col-span-2">
                <label className={label}>Achievements & Bullet Points</label>
                <textarea
                  className={inp + ' h-20 resize-none leading-relaxed'}
                  value={exp.description}
                  onChange={(e) => updateExperience(i, 'description', e.target.value)}
                  placeholder="• Developed high-throughput systems..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Education Form */}
      <div className={sectionCard}>
        <div className={sectionHeader}>
          <span>Education & Degrees</span>
          <button
            type="button"
            onClick={addEducation}
            className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 normal-case"
          >
            + Add Education
          </button>
        </div>
        {data.education.length === 0 && (
          <p className="text-[11px] text-gray-400 italic">No education added. Click &apos;+ Add Education&apos; to add one.</p>
        )}
        {data.education.map((edu, i) => (
          <div key={edu.id} className="bg-slate-50 border border-slate-200 rounded p-2.5 mb-2 relative">
            <button
              type="button"
              onClick={() => removeEducation(i)}
              className="absolute top-1.5 right-2 text-slate-400 hover:text-red-600 font-bold text-base leading-none"
              title="Delete Education"
            >
              &times;
            </button>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2">
                <label className={label}>Institution</label>
                <input
                  className={inp}
                  value={edu.institution}
                  onChange={(e) => updateEducation(i, 'institution', e.target.value)}
                  placeholder="UC Berkeley"
                />
              </div>
              <div>
                <label className={label}>Degree</label>
                <input
                  className={inp}
                  value={edu.degree}
                  onChange={(e) => updateEducation(i, 'degree', e.target.value)}
                  placeholder="B.S."
                />
              </div>
              <div>
                <label className={label}>Field of Study</label>
                <input
                  className={inp}
                  value={edu.field}
                  onChange={(e) => updateEducation(i, 'field', e.target.value)}
                  placeholder="Computer Science"
                />
              </div>
              <div>
                <label className={label}>Start Date</label>
                <input
                  className={inp}
                  value={edu.startDate}
                  onChange={(e) => updateEducation(i, 'startDate', e.target.value)}
                  placeholder="2015"
                />
              </div>
              <div>
                <label className={label}>End Date</label>
                <input
                  className={inp}
                  value={edu.endDate}
                  onChange={(e) => updateEducation(i, 'endDate', e.target.value)}
                  placeholder="2019"
                />
              </div>
              <div className="col-span-2">
                <label className={label}>GPA / Honors</label>
                <input
                  className={inp}
                  value={edu.gpa}
                  onChange={(e) => updateEducation(i, 'gpa', e.target.value)}
                  placeholder="3.85 / 4.0"
                />
              </div>
              <div className="col-span-2">
                <label className={label}>Details</label>
                <textarea
                  className={inp + ' h-12 resize-none leading-relaxed'}
                  value={edu.description}
                  onChange={(e) => updateEducation(i, 'description', e.target.value)}
                  placeholder="Dean's List, relevant coursework..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Projects Form */}
      <div className={sectionCard}>
        <div className={sectionHeader}>
          <span>Key Projects</span>
          <button
            type="button"
            onClick={addProject}
            className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 normal-case"
          >
            + Add Project
          </button>
        </div>
        {data.projects.length === 0 && (
          <p className="text-[11px] text-gray-400 italic">No projects added. Click &apos;+ Add Project&apos; to add one.</p>
        )}
        {data.projects.map((proj, i) => (
          <div key={proj.id} className="bg-slate-50 border border-slate-200 rounded p-2.5 mb-2 relative">
            <button
              type="button"
              onClick={() => removeProject(i)}
              className="absolute top-1.5 right-2 text-slate-400 hover:text-red-600 font-bold text-base leading-none"
              title="Delete Project"
            >
              &times;
            </button>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2">
                <label className={label}>Project Name</label>
                <input
                  className={inp}
                  value={proj.name}
                  onChange={(e) => updateProject(i, 'name', e.target.value)}
                  placeholder="CloudPulse Observability"
                />
              </div>
              <div>
                <label className={label}>Technologies</label>
                <input
                  className={inp}
                  value={proj.technologies}
                  onChange={(e) => updateProject(i, 'technologies', e.target.value)}
                  placeholder="Next.js, TypeScript, Go"
                />
              </div>
              <div>
                <label className={label}>Project Link</label>
                <input
                  className={inp}
                  value={proj.url}
                  onChange={(e) => updateProject(i, 'url', e.target.value)}
                  placeholder="github.com/alexmorgan/cloudpulse"
                />
              </div>
              <div className="col-span-2">
                <label className={label}>Description</label>
                <textarea
                  className={inp + ' h-16 resize-none leading-relaxed'}
                  value={proj.description}
                  onChange={(e) => updateProject(i, 'description', e.target.value)}
                  placeholder="Highlights, problems solved, metrics..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User Custom Sections Form */}
      {data.customSections?.map((custom) => (
        <div key={custom.id} className={sectionCard}>
          <div className={sectionHeader}>
            <div className="flex items-center gap-1.5 flex-1 mr-2">
              <span className="text-slate-400 font-normal">📝</span>
              <input
                className="font-bold text-xs text-gray-900 border-b border-dashed border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent flex-1"
                value={custom.title}
                onChange={(e) => updateCustomSectionTitle(custom.id, e.target.value)}
                placeholder="Section Title..."
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => addCustomItem(custom.id)}
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 normal-case"
              >
                + Add Entry
              </button>
              <button
                type="button"
                onClick={() => removeCustomSection(custom.id)}
                className="text-[11px] text-red-500 hover:text-red-700 normal-case"
                title="Remove entire custom section"
              >
                Remove
              </button>
            </div>
          </div>

          {custom.items.length === 0 && (
            <p className="text-[11px] text-gray-400 italic">No entries yet. Click &apos;+ Add Entry&apos; to add one.</p>
          )}

          {custom.items.map((item, itemIdx) => (
            <div key={item.id} className="bg-slate-50 border border-slate-200 rounded p-2.5 mb-2 relative">
              <button
                type="button"
                onClick={() => removeCustomItem(custom.id, itemIdx)}
                className="absolute top-1.5 right-2 text-slate-400 hover:text-red-600 font-bold text-base leading-none"
                title="Delete Entry"
              >
                &times;
              </button>
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                  <label className={label}>Title / Role / Topic</label>
                  <input
                    className={inp}
                    value={item.title}
                    onChange={(e) => updateCustomItem(custom.id, itemIdx, 'title', e.target.value)}
                    placeholder="e.g. Lead Researcher, Keynote Speaker, Patent Name"
                  />
                </div>
                <div>
                  <label className={label}>Organization / Subtitle</label>
                  <input
                    className={inp}
                    value={item.subtitle}
                    onChange={(e) => updateCustomItem(custom.id, itemIdx, 'subtitle', e.target.value)}
                    placeholder="e.g. Conference, Journal, Foundation"
                  />
                </div>
                <div>
                  <label className={label}>Date / Period</label>
                  <input
                    className={inp}
                    value={item.date}
                    onChange={(e) => updateCustomItem(custom.id, itemIdx, 'date', e.target.value)}
                    placeholder="e.g. 2023, Summer 2022"
                  />
                </div>
                <div className="col-span-2">
                  <label className={label}>Description / Details</label>
                  <textarea
                    className={inp + ' h-14 resize-none leading-relaxed'}
                    value={item.description}
                    onChange={(e) => updateCustomItem(custom.id, itemIdx, 'description', e.target.value)}
                    placeholder="Details, impact, notes..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Certifications Form */}
      <div className={sectionCard}>
        <div className={sectionHeader}>
          <span>Certifications & Licensures</span>
          <button
            type="button"
            onClick={addCertification}
            className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 normal-case"
          >
            + Add Certificate
          </button>
        </div>
        {data.certifications.length === 0 && (
          <p className="text-[11px] text-gray-400 italic">No certifications added. Click &apos;+ Add Certificate&apos; to add one.</p>
        )}
        {data.certifications.map((cert, i) => (
          <div key={cert.id} className="bg-slate-50 border border-slate-200 rounded p-2.5 mb-2 relative">
            <button
              type="button"
              onClick={() => removeCertification(i)}
              className="absolute top-1.5 right-2 text-slate-400 hover:text-red-600 font-bold text-base leading-none"
              title="Delete Certificate"
            >
              &times;
            </button>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2">
                <label className={label}>Certificate Name</label>
                <input
                  className={inp}
                  value={cert.name}
                  onChange={(e) => updateCertification(i, 'name', e.target.value)}
                  placeholder="AWS Solutions Architect"
                />
              </div>
              <div>
                <label className={label}>Issuer</label>
                <input
                  className={inp}
                  value={cert.issuer}
                  onChange={(e) => updateCertification(i, 'issuer', e.target.value)}
                  placeholder="Amazon Web Services"
                />
              </div>
              <div>
                <label className={label}>Date / Year</label>
                <input
                  className={inp}
                  value={cert.date}
                  onChange={(e) => updateCertification(i, 'date', e.target.value)}
                  placeholder="2023"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Languages Form */}
      <div className={sectionCard}>
        <div className={sectionHeader}>
          <span>Languages</span>
          <button
            type="button"
            onClick={addLanguage}
            className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 normal-case"
          >
            + Add Language
          </button>
        </div>
        {data.languages.length === 0 && (
          <p className="text-[11px] text-gray-400 italic">No languages added.</p>
        )}
        {data.languages.map((l, i) => (
          <div key={l.id} className="flex items-center gap-2 mb-2">
            <input
              className={inp + ' flex-1'}
              value={l.name}
              onChange={(e) => updateLanguage(i, 'name', e.target.value)}
              placeholder="e.g. English, French, Spanish"
            />
            <select
              className={inp + ' w-36'}
              value={l.proficiency}
              onChange={(e) => updateLanguage(i, 'proficiency', e.target.value)}
            >
              <option value="Native / Bilingual">Native / Bilingual</option>
              <option value="Fluent">Fluent</option>
              <option value="Professional Working">Professional Working</option>
              <option value="Conversational">Conversational</option>
              <option value="Elementary / Basic">Elementary / Basic</option>
            </select>
            <button
              type="button"
              onClick={() => removeLanguage(i)}
              className="text-slate-400 hover:text-red-600 font-bold text-base px-1 leading-none"
              title="Delete Language"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Achievements Form */}
      <div className={sectionCard}>
        <div className={sectionHeader}>
          <span>Honors & Achievements</span>
          <button
            type="button"
            onClick={addAchievement}
            className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 normal-case"
          >
            + Add Award
          </button>
        </div>
        {data.achievements.length === 0 && (
          <p className="text-[11px] text-gray-400 italic">No achievements added.</p>
        )}
        {data.achievements.map((ach, i) => (
          <div key={ach.id} className="bg-slate-50 border border-slate-200 rounded p-2.5 mb-2 relative">
            <button
              type="button"
              onClick={() => removeAchievement(i)}
              className="absolute top-1.5 right-2 text-slate-400 hover:text-red-600 font-bold text-base leading-none"
              title="Delete Award"
            >
              &times;
            </button>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2">
                <label className={label}>Award / Honor Title</label>
                <input
                  className={inp}
                  value={ach.title}
                  onChange={(e) => updateAchievement(i, 'title', e.target.value)}
                  placeholder="1st Place Winner – Hackathon"
                />
              </div>
              <div>
                <label className={label}>Issuer</label>
                <input
                  className={inp}
                  value={ach.issuer}
                  onChange={(e) => updateAchievement(i, 'issuer', e.target.value)}
                  placeholder="TechCrunch Disrupt"
                />
              </div>
              <div>
                <label className={label}>Date</label>
                <input
                  className={inp}
                  value={ach.date}
                  onChange={(e) => updateAchievement(i, 'date', e.target.value)}
                  placeholder="2023"
                />
              </div>
              <div className="col-span-2">
                <label className={label}>Description</label>
                <textarea
                  className={inp + ' h-12 resize-none leading-relaxed'}
                  value={ach.description}
                  onChange={(e) => updateAchievement(i, 'description', e.target.value)}
                  placeholder="Details and impact..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skills Form */}
      <div className={sectionCard}>
        <div className={sectionHeader}>
          <span>Skills & Competencies</span>
        </div>
        <label className={label}>Comma-separated skills (Leave blank if not wanted)</label>
        <textarea
          className={inp + ' h-18 resize-none leading-relaxed'}
          value={data.skills}
          onChange={(e) => updateSkills(e.target.value)}
          placeholder="TypeScript, React, Next.js, Node.js, Python, PostgreSQL, Docker..."
        />
      </div>

      {/* Interests Form */}
      <div className={sectionCard}>
        <div className={sectionHeader}>
          <span>Interests & Hobbies</span>
        </div>
        <label className={label}>Interests (Leave blank if not wanted)</label>
        <textarea
          className={inp + ' h-14 resize-none leading-relaxed'}
          value={data.interests}
          onChange={(e) => updateInterests(e.target.value)}
          placeholder="Open Source, Robotics, Cycling, Chess, Photography..."
        />
      </div>
    </div>
  );
}
