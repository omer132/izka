"use client";

import { useEffect, useState, useRef } from 'react';

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="hakkimizda" 
      className={`container-px mx-auto my-8 sm:my-12 md:my-16 py-6 sm:py-8 md:py-12 scroll-mt-16 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            <span className="text-izkaYellow">Hakkımızda</span>
          </h2>
        </div>
        
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="prose prose-invert max-w-none">
            <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
              <strong className="text-izkaYellow">İZKA Okçuluk</strong>, <span className="text-izkaYellow font-bold">2025</span> yılında <span className="text-izkaYellow font-bold">İzmir</span>'de kurulmuş <span className="text-izkaYellow font-bold">yenilikçi</span> bir okçuluk kulübüdür.
            </p>
            
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
              Profesyonel antrenörlerimiz <strong className="text-white">Yasemin Ecem Anagöz</strong> ve <strong className="text-white">Egemen Uslu</strong> ile birlikte, modern eğitim teknikleri ve gelişmiş ekipmanlarla okçuluk sporunu her seviyede sevdirmeyi ve geliştirmeyi hedefliyoruz.
            </p>
            
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Kulübümüz, başlangıç seviyesinden profesyonel seviyeye kadar tüm sporculara hizmet vererek, okçuluk sporunu daha geniş kitlelere ulaştırmayı amaçlamaktadır.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

