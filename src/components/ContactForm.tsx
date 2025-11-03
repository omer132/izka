"use client";

import { useState } from 'react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setFormState('submitting');
    setMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('İletim sırasında bir hata oluştu');
      setFormState('success');
      setMessage('Mesajınız alındı. En kısa sürede sizinle iletişime geçeceğiz.');
      form.reset();
    } catch (err: any) {
      setFormState('error');
      setMessage(err?.message ?? 'Bir hata oluştu');
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm text-white/80">Ad Soyad</label>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-izkaYellow"
            placeholder="Adınız"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-white/80">Telefon</label>
        <input
          type="tel"
          name="phone"
          className="mt-1 w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-izkaYellow"
          placeholder="05xx xxx xx xx"
        />
      </div>
      <div>
        <label className="block text-sm text-white/80">Mesaj</label>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-1 w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-izkaYellow"
          placeholder="Mesajınız"
        />
      </div>
      <button
        type="submit"
        disabled={formState === 'submitting'}
        className="rounded-md bg-izkaYellow px-6 py-3 text-black font-semibold hover:brightness-95 disabled:opacity-60"
      >
        {formState === 'submitting' ? 'Gönderiliyor…' : 'Mesaj Gönder'}
      </button>
      {message && (
        <p
          className={
            'text-sm mt-2 ' +
            (formState === 'success' ? 'text-green-400' : 'text-red-400')
          }
        >
          {message}
        </p>
      )}
    </form>
  );
}



