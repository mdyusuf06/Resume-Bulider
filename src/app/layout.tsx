import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Resume Builder — Offline-First & Live A4 Print',
  description: 'Client-side offline-capable resume builder with live A4 preview, drag-and-drop reordering, and native PDF printing.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-100 text-slate-900 selection:bg-blue-200">
        {children}
      </body>
    </html>
  );
}
