import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Veronica Waeo — UI/UX Designer, System Analyst & Web Developer',
  description:
    'Personal portfolio of Veronica Waeo, an Informatics Engineering graduate from Sam Ratulangi University (GPA 3.91/4.00) specializing in UI/UX Design, System Analysis, and Web Development.',
  keywords: [
    'Veronica Waeo',
    'UI/UX Designer',
    'System Analyst',
    'Web Developer',
    'Informatics Engineering',
    'Sam Ratulangi University',
    'Portfolio',
    'Frontend Developer',
    'Next.js',
    'React',
  ],
  authors: [{ name: 'Veronica Waeo' }],
  creator: 'Veronica Waeo',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://veronicawaeo.dev',
    title: 'Veronica Waeo — UI/UX Designer, System Analyst & Web Developer',
    description:
      'Personal portfolio of Veronica Waeo, an Informatics Engineering graduate specializing in intuitive digital experiences, structured analysis, and modern web development.',
    siteName: 'Veronica Waeo Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veronica Waeo — UI/UX Designer, System Analyst & Web Developer',
    description:
      'Informatics Engineering graduate specializing in intuitive digital experiences, structured analysis, and modern web development.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-stone-50/30 text-stone-900 font-sans"
      >
        {children}
      </body>
    </html>
  );
}
