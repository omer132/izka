import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { AthleteCard } from '@/components/AthleteCard';

export const metadata: Metadata = {
  title: 'Ana Sayfa',
  description: 'İZKA Okçuluk – Profesyonel okçuluk eğitimi ve sporcu başarıları',
};

export default function Page() {
  return (
    <>
      <Hero />
      <section className="container-px mx-auto my-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Öne Çıkan Antrenörler</h2>
        <div className="grid grid-cols-1 gap-6">
          <AthleteCard
            name="Yasemin Ecem Anagöz"
            title="Baş Antrenör"
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
    </>
  );
}



