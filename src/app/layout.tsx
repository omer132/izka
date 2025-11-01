import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { RouteProgress } from '@/components/RouteProgress';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'İZKA Okçuluk – Profesyonel Okçuluk Eğitimi',
    template: '%s | İZKA Okçuluk',
  },
  description:
    'İZKA Okçuluk Kulübü – Profesyonel okçuluk eğitimi, milli sporcularla performans artırma, birebir eğitim ve daha fazlası.',
  openGraph: {
    title: 'İZKA Okçuluk – Profesyonel Okçuluk Eğitimi',
    description:
      'İZKA Okçuluk Kulübü – Profesyonel okçuluk eğitimi, milli sporcularla performans artırma, birebir eğitim ve daha fazlası.',
    type: 'website',
    url: 'https://www.example.com',
    siteName: 'İZKA Okçuluk',
  },
  metadataBase: new URL('https://www.example.com'),
};

export const viewport: Viewport = {
  themeColor: '#F2C100',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <RouteProgress />
        <div className="min-h-screen flex flex-col bg-izkaBlack text-white">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}



