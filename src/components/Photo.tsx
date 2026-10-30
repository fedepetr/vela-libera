"use client";

import { useEffect, useRef, useState } from "react";

export default function Photo({
  src,
  alt,
  label,
  className = "",
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
}) {
  const [errore, setErrore] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth === 0) {
      setErrore(true);
    }
  }, []);

  if (errore) {
    return (
      <div className={`overflow-hidden bg-gradient-to-br from-slate-700 via-sky-800 to-slate-900 ${className}`}>
        <div className="relative w-full h-full">
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="w-4 h-4 text-white/70 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 6h18v12H3V6z"
              />
              <circle cx="9" cy="10" r="1.5" />
            </svg>
            <span className="text-[11px] leading-tight font-medium text-white/80 whitespace-pre-line">
              {label}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={`object-cover ${className}`}
      onError={() => setErrore(true)}
    />
  );
}
