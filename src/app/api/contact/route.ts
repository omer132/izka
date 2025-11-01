import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const name = String(data?.name || '').trim();
    const email = String(data?.email || '').trim();
    const phone = String(data?.phone || '').trim();
    const message = String(data?.message || '').trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Zorunlu alanlar eksik' },
        { status: 400 }
      );
    }

    // Future: integrate mail provider or CRM here
    // For now, just echo back success
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}



