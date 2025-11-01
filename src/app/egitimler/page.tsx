import type { Metadata } from 'next';
import { TrainingCard } from '@/components/TrainingCard';

export const metadata: Metadata = {
  title: 'Eğitimler',
  description: 'İZKA Okçuluk eğitim programları',
};

const trainings = [
  { title: 'Profesyonel Eğitim', desc: 'Kariyer hedefleyen sporcular için kapsamlı program.' },
  { title: 'Birebir Eğitim', desc: 'Kişiye özel hedefler ile yoğunlaşmış çalışma.' },
  { title: 'Yetişkin Dersleri', desc: 'Başlangıçtan ileri seviyeye güvenli ve keyifli dersler.' },
  { title: 'Milli Sporcularla Performans Artırma', desc: 'Elit sporcularla özel performans programları.' },
  { title: 'Yay Ayarı', desc: 'Ekipman analizi ve optimizasyonu.' },
  { title: 'Performans Takibi', desc: 'Veri odaklı antrenman ve gelişim analizi.' },
  { title: 'Okullarda Kulüp Saati', desc: 'Okullara yönelik tanıtım ve eğitim etkinlikleri.' },
  { title: 'Mental Koçluk', desc: 'Odaklanma, stres yönetimi ve yarışma psikolojisi.' },
  { title: 'Fizyoterapi Desteği', desc: 'Sakatlık önleme ve toparlanma desteği.' },
];

export default function TrainingsPage() {
  return (
    <section className="container-px mx-auto my-12">
      <h1 className="text-3xl font-bold mb-8">Eğitimler</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trainings.map((t) => (
          <TrainingCard key={t.title} title={t.title} description={t.desc} />
        ))}
      </div>
    </section>
  );
}



