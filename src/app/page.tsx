'use client';

import React from 'react';
import { ResumeProvider } from '@/context/ResumeContext';
import FormPane from '@/components/FormPane';
import PreviewPane from '@/components/PreviewPane';

export default function ResumeBuilderApp() {
  return (
    <ResumeProvider>
      <div className="resume-builder-root flex flex-col lg:flex-row w-screen h-screen overflow-hidden bg-slate-100">
        <FormPane />
        <PreviewPane />
      </div>
    </ResumeProvider>
  );
}
