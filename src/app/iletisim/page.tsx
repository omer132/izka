import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'İZKA Okçuluk ile iletişime geçin',
};

export default function ContactPage() {
  return (
    <section className="container-px mx-auto my-12 grid gap-10 lg:grid-cols-2">
      <div>
        <h1 className="text-3xl font-bold mb-4">İletişim</h1>
        <p className="text-white/80 mb-6">
          Aşağıdaki formu doldurarak bize ulaşabilirsiniz. Alternatif olarak WhatsApp ya da Instagram üzerinden de yazabilirsiniz.
        </p>
        <ContactForm />
      </div>
      <div>
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10">
          <iframe
            title="İZKA Okçuluk Spor Kulübü Konum"
            src="https://www.google.com/maps?q=%C4%B0ZKA%20OK%C3%87ULUK%20SPOR%20KUL%C3%9CB%C3%9C%2C%20Atat%C3%BCrk%2C%20909.%20Sk.%2016%20A%2C%2035030%20Bornova%2F%C4%B0zmir&output=embed"
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}



