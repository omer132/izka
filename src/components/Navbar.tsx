"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const links = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/egitimler', label: 'Eğitimler' },
  { href: '/iletisim', label: 'İletişim' },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/50 border-b border-white/10">
      <div className="container-px mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-semibold text-lg flex items-center gap-2">
            <Image src="/izka.png" alt="İZKA Logo" width={32} height={32} />
            <span><span className="text-izkaYellow">İZKA</span> Okçuluk</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={
                  pathname === l.href
                    ? 'text-izkaYellow'
                    : 'text-white/80 hover:text-white'
                }
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block">
            <Link
              href="/iletisim"
              className="inline-flex items-center rounded-md bg-izkaYellow px-4 py-2 text-black font-semibold hover:brightness-95 transition"
            >
              Eğitime Başla
            </Link>
          </div>
        </div>
        <nav className="md:hidden">
          <div className="flex justify-center gap-5 py-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={
                  pathname === l.href
                    ? 'text-izkaYellow text-sm'
                    : 'text-white/80 hover:text-white text-sm'
                }
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}



