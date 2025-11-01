import type { Metadata } from 'next';
import { AthleteCard } from '@/components/AthleteCard';

export const metadata: Metadata = {
  title: 'Sporcular',
  description: 'İZKA sporcuları ve başarıları',
};

export default function AthletesPage() {
  return (
    <section className="container-px mx-auto my-12">
      <h1 className="text-3xl font-bold mb-8">Sporcular</h1>
      <div className="grid grid-cols-1 gap-6">
        <AthleteCard
          name="Yasemin Ecem Anagöz"
          title="Avrupa Şampiyonu – Olimpiyat Sporcusu"
          imageUrl="/WhatsApp Image 2025-11-01 at 13.27.04.jpeg"
          achievements={[
            '5× Avrupa Şampiyonu',
            '9× Dünya Madalyası',
            'Dünya’da Yılın En İyi Sporcusu Ödülü',
            '2× Akdeniz Oyunları Şampiyonluğu',
            'Türkiye Rekortmeni',
            'RX Dünya Rekoru',
          ]}
        />
        <AthleteCard
          name="Egemen Uslu"
          title="Türkiye Şampiyonu – Milli Sporcu"
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
  );
}



