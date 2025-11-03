import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-8 sm:mt-12">
      <div className="container-px mx-auto py-6 sm:py-8 grid gap-4 sm:gap-6 md:grid-cols-3 items-center">
        <div className="text-white/70 text-xs sm:text-sm text-center md:text-left">
          © {new Date().getFullYear()} İZKA Okçuluk Kulübü
        </div>
        <div className="text-center">
          <span className="font-semibold text-white text-sm sm:text-base">Bizi Takip Edin</span>
          <div className="mt-2 flex justify-center gap-3">
            <Link
              href="https://www.instagram.com/izkaokculuk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </Link>
            <Link
              href="https://wa.me/905000000000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5 text-white"
                fill="currentColor"
              >
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.62-6.003C.122 5.281 5.403 0 12.057 0c3.19 0 6.167 1.243 8.413 3.49a11.82 11.82 0 013.492 8.41c-.003 6.653-5.284 11.935-11.938 11.935a11.9 11.9 0 01-6.002-1.62L.057 24zm6.597-3.807c1.735.995 3.27 1.591 5.392 1.593 5.448.003 9.886-4.431 9.889-9.879.002-2.64-1.03-5.122-2.902-6.993A9.825 9.825 0 0012.06 1.12C6.615 1.12 2.18 5.553 2.178 11c-.002 2.14.593 3.667 1.593 5.392l-.999 3.648 3.882-.847zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.867-2.03-.967-.272-.099-.469-.148-.666.15-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.666-1.611-.912-2.207-.24-.579-.487-.5-.666-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.193 1.872.117.571-.085 1.758-.718 2.006-1.41.248-.694.248-1.289.173-1.413z" />
              </svg>
            </Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
}



