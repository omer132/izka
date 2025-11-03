import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { AthleteCard } from '@/components/AthleteCard';
import { InstagramSection } from '@/components/InstagramSection';
import { AboutSection } from '@/components/AboutSection';

export const metadata: Metadata = {
  title: 'Ana Sayfa',
  description: 'İZKA Okçuluk – Profesyonel okçuluk eğitimi ve sporcu başarıları',
};

export default function Page() {
  return (
    <>
      <Hero />
      <section id="antrenorlerimiz" className="container-px mx-auto my-4 sm:my-6 md:my-8 py-4 sm:py-6 scroll-mt-16">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
            <span className="text-izkaYellow">Antrenörlerimiz</span>
          </h2>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Deneyimli ve başarılı antrenörlerimizle tanışın
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6">
          <AthleteCard
            name="Yasemin Ecem Anagöz"
            title="Antrenör"
            imageUrl="/WhatsApp Image 2025-11-01 at 13.27.04.jpeg"
            achievements={[
              '5× Avrupa Şampiyonu',
              '9× Dünya Madalyası',
              'Dünya’da Yılın En İyi Sporcusu',
              '2× Akdeniz Oyunları Şampiyonluğu',
              'Türkiye Rekortmeni',
              'RX Dünya Rekoru',
            ]}
          />
          <AthleteCard
            name="Egemen Uslu"
            title="Antrenör"
            imageUrl="/WhatsApp Image 2025-11-01 at 13.26.42.jpeg"
            achievements={[
              'Milli Takım Sporcusu',
              '5× Türkiye Şampiyonu',
              '20× Takım Madalyası',
              '5× Mix Takım Madalyası',
            ]}
          />
        </div>
      </section>
      <AboutSection />
      <InstagramSection />
    </>
  );
}



