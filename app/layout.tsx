import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rayhan — Full-stack developer',
  description:
    'Rakibul Hasan Rayhan — Full-stack developer, CSE student, and builder of thoughtful digital products.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'MERN', 'Bangladesh', 'RUET', 'CSE'],
  authors: [{ name: 'Rakibul Hasan Rayhan' }],
  openGraph: {
    title: 'Rayhan — Full-stack developer',
    description: 'Building scalable digital products with the MERN stack.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0b0d12',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
