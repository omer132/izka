type AthleteCardProps = {
  name: string;
  title: string;
  achievements: string[];
  imageUrl?: string;
};

export function AthleteCard({ name, title, achievements, imageUrl }: AthleteCardProps) {
  return (
    <div className="group relative mx-auto w-full max-w-4xl rounded-2xl p-[1px] bg-gradient-to-b from-white/15 to-white/5 border border-white/10 transition duration-300 hover:from-izkaYellow/30 hover:to-transparent">
      <div className="rounded-2xl bg-white/5 backdrop-blur p-3 sm:p-6 transform transition duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.30)] group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)] group-hover:-translate-y-0.5 text-center relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out">
          <div className="absolute top-0 left-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
        </div>
        <div className="pointer-events-none absolute -top-16 -right-10 h-32 w-32 rounded-full bg-izkaYellow/10 blur-2xl opacity-0 group-hover:opacity-100 transition" />
          <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden ring-2 ring-transparent transition group-hover:ring-izkaYellow/60">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt={name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/izka.png" alt="İZKA Logo" className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105" />
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white">{name}</h3>
            <span className="text-[11px] leading-4 px-2 py-0.5 rounded-full bg-izkaYellow/20 text-izkaYellow border border-izkaYellow/30">Antrenör</span>
          </div>
          <p className="text-white/70 text-sm sm:text-base text-center">{title}</p>
        </div>
        <ul className="mt-4 space-y-1.5 text-white/80 text-sm sm:text-base flex flex-col items-center">
          {achievements.map((a, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 text-izkaYellow">•</span>
              <span className="transition-colors duration-200 group-hover:text-white text-center">{a}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}



