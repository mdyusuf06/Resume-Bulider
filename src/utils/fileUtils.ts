import { ResumeData } from '@/types/resume';

export function exportJSON(data: ResumeData) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'resume-data.json';
  a.click();
  URL.revokeObjectURL(url);
}

export function importJSON(file: File): Promise<ResumeData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (parsed.personalInfo && parsed.sectionOrder) {
          resolve(parsed as ResumeData);
        } else {
          reject(new Error('Invalid resume JSON format'));
        }
      } catch {
        reject(new Error('Failed to parse JSON'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

export function triggerPrint() {
  window.print();
}

