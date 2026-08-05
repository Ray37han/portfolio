import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://rhrayhan.me'),
  title: 'Rakibul Hasan Rayhan — Full-Stack Developer',
  description:
    'CSE student at RUET and full-stack developer building calm, useful products with MERN, Flutter, and modern web technologies.',
  keywords: [
    'Full Stack Developer', 'MERN Stack', 'React', 'Next.js',
    'Node.js', 'MongoDB', 'Flutter', 'Bangladesh', 'RUET', 'CSE',
    'Rakibul Hasan Rayhan', 'rhrayhan',
  ],
  authors: [{ name: 'Rakibul Hasan Rayhan', url: 'https://rhrayhan.me' }],
  creator: 'Rakibul Hasan Rayhan',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://rhrayhan.me' },

  openGraph: {
    type: 'website',
    url: 'https://rhrayhan.me',
    siteName: 'Rakibul Hasan Rayhan',
    title: 'Rakibul Hasan Rayhan — Full-Stack Developer',
    description:
      'Full-stack developer building scalable digital products with MERN, Flutter, and modern web tech. CSE @ RUET, Bangladesh.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rakibul Hasan Rayhan — Full-Stack Developer',
      },
    ],
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    site: '@rhrayhan',
    creator: '@rhrayhan',
    title: 'Rakibul Hasan Rayhan — Full-Stack Developer',
    description:
      'Full-stack developer building scalable digital products with MERN, Flutter, and modern web tech.',
    images: ['/og-image.png'],
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
