"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Background image */}
      <div 
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(/arkaplan.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="w-full min-h-screen flex items-center pb-4 sm:pb-6">
        <div
          className={
            'relative w-full min-h-screen flex items-center animate-fadeInUp p-8 sm:p-12 lg:p-16 bg-cover bg-center bg-no-repeat ' + (mounted ? 'opacity-100' : 'opacity-0')
          }
          style={{ 
            backgroundImage: 'url(/arkaplan.png)',
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30 -z-10" />
          <div className="relative z-10 max-w-3xl ml-0 container-px pt-8 sm:pt-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            <span className="text-izkaYellow">İZKA Okçuluk</span> – Profesyonel Okçuluk Eğitimi
          </h1>
          <p className="mt-4 text-white/80 text-base sm:text-lg">
            Deneyimli antrenörler ve milli sporcularla performansınızı bir üst seviyeye taşıyın.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="https://wa.me/905061651179"
              target="_blank"
              className="inline-flex justify-center rounded-md border-2 border-izkaYellow px-5 py-2.5 sm:px-6 sm:py-3 text-izkaYellow hover:bg-izkaYellow hover:text-black transition text-sm sm:text-base"
            >
              Bize Ulaş
            </Link>
          </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(242,193,0,0.15),transparent_60%)]" />
    </section>
  );
}



