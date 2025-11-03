"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/#antrenorlerimiz', label: 'Antrenörlerimiz', isAnchor: true, anchorId: 'antrenorlerimiz' },
  { href: '/#hakkimizda', label: 'Hakkımızda', isAnchor: true, anchorId: 'hakkimizda' },
  { href: '/#galeri', label: 'Galerimiz', isAnchor: true, anchorId: 'galeri' },
  { href: '/iletisim', label: 'İletişim' },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchorId: string) => {
    e.preventDefault();
    setIsMenuOpen(false); // Menüyü kapat
    
    // Eğer ana sayfadaysak, direkt scroll yap
    if (pathname === '/') {
      const element = document.getElementById(anchorId);
      if (element) {
        const offset = 80; // Navbar yüksekliği + biraz boşluk
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // Başka bir sayfadaysak, önce ana sayfaya git, sonra scroll yap
      router.push(`/#${anchorId}`);
      setTimeout(() => {
        const element = document.getElementById(anchorId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Menüyü kapat
  };
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/50 border-b border-white/10">
      <div className="container-px mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-semibold text-base sm:text-lg flex items-center gap-2">
            <Image src="/izka.png" alt="İZKA Logo" width={28} height={28} className="sm:w-8 sm:h-8" />
            <span className="hidden sm:inline"><span className="text-izkaYellow">İZKA</span> Okçuluk</span>
            <span className="sm:hidden"><span className="text-izkaYellow">İZKA</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => 
              l.isAnchor ? (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleAnchorClick(e, l.anchorId || '')}
                  className="text-white/80 hover:text-izkaYellow transition-all duration-300 relative group"
                >
                  {l.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-izkaYellow group-hover:w-full transition-all duration-300" />
                </a>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className={
                    pathname === l.href
                      ? 'text-izkaYellow'
                      : 'text-white/80 hover:text-white transition-colors'
                  }
                >
                  {l.label}
                </Link>
              )
            )}
          </nav>
          <div className="hidden md:block">
            <Link
              href="/iletisim"
              className="inline-flex items-center rounded-md bg-izkaYellow px-4 py-2 text-black font-semibold hover:brightness-95 transition"
            >
              Eğitime Başla
            </Link>
          </div>
          
          {/* Hamburger Menu Button - Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition"
            aria-label="Menü"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        <nav
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-2 border-t border-white/10">
            {links.map((l) => 
              l.isAnchor ? (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleAnchorClick(e, l.anchorId || '')}
                  className={`block px-4 py-2 rounded-md text-white/80 hover:text-izkaYellow hover:bg-white/5 transition-colors ${
                    pathname === l.href ? 'text-izkaYellow bg-white/5' : ''
                  }`}
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={handleLinkClick}
                  className={`block px-4 py-2 rounded-md transition-colors ${
                    pathname === l.href
                      ? 'text-izkaYellow bg-white/5'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {l.label}
                </Link>
              )
            )}
            <Link
              href="/iletisim"
              onClick={handleLinkClick}
              className="block mx-4 mt-4 px-4 py-2.5 rounded-md bg-izkaYellow text-black font-semibold text-center hover:brightness-95 transition"
            >
              Eğitime Başla
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}



