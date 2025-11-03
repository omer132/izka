import Link from 'next/link';

type TrainingCardProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export function TrainingCard({ title, description, icon }: TrainingCardProps) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 hover:border-izkaYellow/30 hover:from-white/10 hover:to-white/5 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-izkaYellow/10 hover:-translate-y-1">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-izkaYellow/0 to-izkaYellow/0 group-hover:from-izkaYellow/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
      
      <div className="relative z-10">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-izkaYellow/20 to-izkaYellow/10 border border-izkaYellow/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-izkaYellow/30 group-hover:to-izkaYellow/20 transition-transform duration-300">
          {icon || (
            <svg className="w-6 h-6 text-izkaYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-izkaYellow transition-colors duration-300">
          {title}
        </h3>
        <p className="text-white/70 text-sm leading-relaxed mb-5 group-hover:text-white/90 transition-colors duration-300">
          {description}
        </p>
        <div>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-izkaYellow/20 to-izkaYellow/10 border border-izkaYellow/40 px-5 py-2.5 text-izkaYellow font-semibold hover:from-izkaYellow hover:to-izkaYellow hover:text-black hover:border-izkaYellow transition-all duration-300 group-hover:shadow-lg group-hover:shadow-izkaYellow/20"
          >
            Detaylı Bilgi
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}



