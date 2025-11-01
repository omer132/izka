import Link from 'next/link';

type TrainingCardProps = {
  title: string;
  description: string;
};

export function TrainingCard({ title, description }: TrainingCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition">
      <h3 className="text-lg font-semibold text-izkaYellow">{title}</h3>
      <p className="mt-2 text-white/80">{description}</p>
      <div className="mt-4">
        <Link
          href="/iletisim"
          className="inline-flex items-center rounded-md border border-izkaYellow/60 px-4 py-2 text-izkaYellow hover:bg-izkaYellow hover:text-black transition"
        >
          Detaylı Bilgi
        </Link>
      </div>
    </div>
  );
}



