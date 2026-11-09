'use client';

import React, { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import MinimalTemplate from './templates/MinimalTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import ModernTemplate from './templates/ModernTemplate';
import ATSTemplate from './templates/ATSTemplate';

export default function PreviewPane() {
  const { data, template, setTemplate } = useResume();
  const [zoom, setZoom] = useState<number>(0.85);

  const renderTemplate = () => {
    switch (template) {
      case 'professional':
        return <ProfessionalTemplate data={data} />;
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'ats':
        return <ATSTemplate data={data} />;
      case 'minimal':
      default:
        return <MinimalTemplate data={data} />;
    }
  };

  return (
    <div className="preview-pane-wrapper flex-1 h-screen flex flex-col bg-slate-200 overflow-hidden relative">
      {/* Zoom / Toolbar Header (Hidden on Print) */}
      <div className="no-print h-12 bg-white/95 backdrop-blur border-b border-gray-300 px-3 sm:px-4 flex items-center justify-between text-xs text-gray-700 shadow-xs z-10">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-800 uppercase tracking-wider hidden sm:inline">
            Live Preview (A4)
          </span>
          <span className="text-gray-400 hidden sm:inline">|</span>
          <span className="capitalize font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            {template === 'ats' ? 'ATS-Optimized' : `${template} Template`}
          </span>
          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium hidden md:inline">
            ✓ ATS Parseable
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setZoom((z) => Math.max(0.4, Number((z - 0.1).toFixed(2))))}
            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 font-bold"
            title="Zoom Out"
          >
            -
          </button>
          <span className="w-10 sm:w-12 text-center font-mono font-medium text-[11px]">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(1.4, Number((z + 0.1).toFixed(2))))}
            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 font-bold"
            title="Zoom In"
          >
            +
          </button>
          <button
            onClick={() => setZoom(0.85)}
            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 hidden sm:inline"
          >
            Reset
          </button>
          <button
            onClick={() => setZoom(1.0)}
            className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded border border-blue-300 font-medium text-[11px]"
          >
            100%
          </button>
        </div>
      </div>

      {/* Scrollable Viewport with A4 preview */}
      <div className="preview-viewport flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start">
        <div
          className="print-container transition-transform origin-top shadow-2xl bg-white"
          style={{
            transform: `scale(${zoom})`,
            marginBottom: `${(zoom - 1) * 300}px`,
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}
