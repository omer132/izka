import Image from 'next/image';

type AthleteCardProps = {
  name: string;
  title: string;
  achievements: string[];
  imageUrl?: string;
};

export function AthleteCard({ name, title, achievements, imageUrl }: AthleteCardProps) {
  return (
    <div className="group relative mx-auto w-full max-w-6xl rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] transition-all duration-500 hover:border-izkaYellow/30 hover:shadow-2xl hover:shadow-izkaYellow/10">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Görsel Bölümü - Sol veya Üst */}
        <div className="relative h-64 md:h-auto min-h-[300px] sm:min-h-[400px] overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority
            />
          ) : (
            <Image
              src="/izka.png"
              alt="İZKA Logo"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          )}
          {/* Gradient Overlay - daha açık */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30 md:from-black/30 md:via-black/10 md:to-transparent" />
          
          {/* İçerik - Görsel üzerinde */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 z-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
              {name}
            </h3>
            <p className="text-white/90 text-base sm:text-lg font-medium drop-shadow-md">
              {title}
            </p>
          </div>
          
          {/* Hover efekti */}
          <div className="absolute inset-0 bg-izkaYellow/0 group-hover:bg-izkaYellow/5 transition-colors duration-500" />
        </div>
        
        {/* Bilgiler Bölümü - Sağ veya Alt */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] p-4 sm:p-6 md:p-8 flex flex-col justify-center">
          <div className="mb-4 sm:mb-6">
            <h4 className="text-izkaYellow font-semibold text-xs sm:text-sm uppercase tracking-wide mb-3 sm:mb-4">
              Başarılar
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {achievements.map((a, i) => (
                <li key={i} className="flex items-start gap-2 sm:gap-3 group/item">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-izkaYellow flex-shrink-0 group-hover/item:scale-125 transition-transform" />
                  <span className="text-white/90 text-sm sm:text-base leading-relaxed group-hover/item:text-white transition-colors">
                    {a}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Alt kısım dekorasyon */}
          <div className="mt-auto pt-6 border-t border-white/10">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <svg className="w-4 h-4 text-izkaYellow" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Profesyonel Antrenör</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



