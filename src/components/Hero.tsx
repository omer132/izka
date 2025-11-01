"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <section className="relative overflow-hidden">
      <div className="container-px mx-auto pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-28 lg:pb-32">
        <div
          className={
            'max-w-3xl animate-fadeInUp ' + (mounted ? 'opacity-100' : 'opacity-0')
          }
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            <span className="text-izkaYellow">İZKA Okçuluk</span> – Profesyonel Okçuluk Eğitimi
          </h1>
          <p className="mt-4 text-white/80 text-lg">
            Deneyimli antrenörler ve milli sporcularla performansınızı bir üst seviyeye taşıyın.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/iletisim"
              className="inline-flex justify-center rounded-md bg-izkaYellow px-6 py-3 text-black font-semibold hover:brightness-95 transition"
            >
              Eğitime Başla
            </Link>
            <Link
              href="https://wa.me/905000000000"
              target="_blank"
              className="inline-flex justify-center rounded-md border border-white/20 px-6 py-3 text-white hover:border-izkaYellow hover:text-izkaYellow transition"
            >
              Bize Ulaş
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(242,193,0,0.15),transparent_60%)]" />
    </section>
  );
}



