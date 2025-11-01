"use client";

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export function RouteProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setActive(true);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    // Hide after animation completes
    timeoutRef.current = window.setTimeout(() => setActive(false), 700);
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-0">
      <div
        className={
          active
            ? 'h-1 w-full origin-left animate-[route-progress_0.7s_ease-out_forwards]'
            : 'h-1 w-0'
        }
        style={{
          background:
            'linear-gradient(90deg, rgba(242,193,0,1) 0%, rgba(242,193,0,0.6) 50%, rgba(242,193,0,0.2) 100%)',
          boxShadow: '0 0 16px rgba(242,193,0,0.6)',
        }}
      />
    </div>
  );
}



