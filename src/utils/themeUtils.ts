import { AccentColor, FontFamily } from '@/types/resume';

export const ACCENT_COLOR_MAP: Record<
  AccentColor,
  {
    primary: string;
    text: string;
    bg: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    gradient: string;
    hex: string;
  }
> = {
  blue: {
    primary: 'text-blue-600',
    text: 'text-blue-900',
    bg: 'bg-blue-600',
    border: 'border-blue-600',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-800',
    gradient: 'from-blue-900 via-blue-800 to-blue-700',
    hex: '#2563eb',
  },
  teal: {
    primary: 'text-teal-600',
    text: 'text-teal-900',
    bg: 'bg-teal-600',
    border: 'border-teal-600',
    badgeBg: 'bg-teal-50',
    badgeText: 'text-teal-800',
    gradient: 'from-teal-900 via-teal-800 to-teal-700',
    hex: '#0d9488',
  },
  emerald: {
    primary: 'text-emerald-600',
    text: 'text-emerald-900',
    bg: 'bg-emerald-600',
    border: 'border-emerald-600',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-800',
    gradient: 'from-emerald-900 via-emerald-800 to-emerald-700',
    hex: '#059669',
  },
  indigo: {
    primary: 'text-indigo-600',
    text: 'text-indigo-900',
    bg: 'bg-indigo-600',
    border: 'border-indigo-600',
    badgeBg: 'bg-indigo-50',
    badgeText: 'text-indigo-800',
    gradient: 'from-indigo-900 via-indigo-800 to-indigo-700',
    hex: '#4f46e5',
  },
  violet: {
    primary: 'text-violet-600',
    text: 'text-violet-900',
    bg: 'bg-violet-600',
    border: 'border-violet-600',
    badgeBg: 'bg-violet-50',
    badgeText: 'text-violet-800',
    gradient: 'from-violet-900 via-violet-800 to-violet-700',
    hex: '#7c3aed',
  },
  rose: {
    primary: 'text-rose-600',
    text: 'text-rose-900',
    bg: 'bg-rose-600',
    border: 'border-rose-600',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-800',
    gradient: 'from-rose-900 via-rose-800 to-rose-700',
    hex: '#e11d48',
  },
  slate: {
    primary: 'text-slate-700',
    text: 'text-slate-900',
    bg: 'bg-slate-700',
    border: 'border-slate-700',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-800',
    gradient: 'from-slate-900 via-slate-800 to-slate-700',
    hex: '#334155',
  },
};

export const FONT_FAMILY_MAP: Record<FontFamily, string> = {
  sans: 'font-sans',
  serif: 'font-serif',
  mono: 'font-mono',
};

