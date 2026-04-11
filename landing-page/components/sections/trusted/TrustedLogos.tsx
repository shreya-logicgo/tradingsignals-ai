"use client";
import { useTranslation } from "react-i18next";

const logos = [
  {
    name: "WunderTrading",
    render: () => (
      <div className="flex items-center gap-2 group">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white/40 group-hover:text-white/60 transition-colors">
          <rect x="2" y="2" width="9" height="9" rx="1.5" fill="currentColor" />
          <rect x="13" y="2" width="9" height="9" rx="1.5" fill="currentColor" />
          <rect x="2" y="13" width="9" height="9" rx="1.5" fill="currentColor" />
          <rect x="13" y="13" width="9" height="9" rx="1.5" fill="currentColor" />
        </svg>
        <span className="text-[13px] md:text-[15px] font-medium text-white/40 group-hover:text-white/60 tracking-tight font-hoves transition-colors">
          WunderTrading
        </span>
      </div>
    ),
  },
  {
    name: "Binance",
    render: () => (
      <div className="flex items-center gap-2 group">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white/40 group-hover:text-white/60 transition-colors">
          <path d="M12 3L14.5 5.5L9 11L6.5 8.5L12 3Z" fill="currentColor" />
          <path d="M16 7L18.5 9.5L9 19L6.5 16.5L16 7Z" fill="currentColor" />
          <path d="M5 10.5L7.5 13L5 15.5L2.5 13L5 10.5Z" fill="currentColor" />
          <path d="M19 10.5L21.5 13L19 15.5L16.5 13L19 10.5Z" fill="currentColor" />
          <path d="M12 16.5L14.5 19L12 21.5L9.5 19L12 16.5Z" fill="currentColor" />
        </svg>
        <span className="text-[13px] md:text-base font-bold text-white/40 group-hover:text-white/60 tracking-wider uppercase font-hoves transition-colors">
          BINANCE
        </span>
      </div>
    ),
  },
  {
    name: "TradersPost",
    render: () => (
      <div className="flex items-center gap-2 group">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white/40 group-hover:text-white/60 transition-colors">
          <path d="M3 17L9 11L13 15L21 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 7H21V11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-[13px] md:text-[15px] font-semibold text-white/40 group-hover:text-white/60 tracking-tight font-hoves transition-colors">
          TradersPost
        </span>
      </div>
    ),
  },
  {
    name: "Cboe",
    render: () => (
      <div className="flex items-center gap-1 group">
        <span className="text-[14px] md:text-[16px] font-semibold text-white/40 group-hover:text-white/60 tracking-wide font-hoves transition-colors">C</span>
        <span className="text-[10px] md:text-[11px] font-normal text-white/40 group-hover:text-white/60 relative top-[-3px] transition-colors">✦</span>
        <span className="text-[14px] md:text-[16px] font-semibold text-white/40 group-hover:text-white/60 tracking-wide font-hoves transition-colors">boe</span>
      </div>
    ),
  },
  {
    name: "OpenAI",
    render: () => (
      <div className="flex items-center gap-2 group">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white/40 group-hover:text-white/60 transition-colors">
          <path d="M20.5 11.5C20.5 16.75 16.25 21 11 21C5.75 21 1.5 16.75 1.5 11.5C1.5 6.25 5.75 2 11 2C13.5 2 15.75 2.95 17.45 4.55" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="11" cy="11.5" r="3.5" stroke="currentColor" strokeWidth="1.8"/>
        </svg>
        <span className="text-[13px] md:text-[15px] font-medium text-white/40 group-hover:text-white/60 tracking-tight font-hoves transition-colors">OpenAI</span>
      </div>
    ),
  },
  {
    name: "TradingView",
    render: () => (
      <div className="flex items-center gap-2 group">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white/40 group-hover:text-white/60 transition-colors">
          <path d="M2 18L8 12L12 16L22 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-[13px] md:text-[15px] font-semibold text-white/40 group-hover:text-white/60 tracking-tight font-hoves transition-colors">TradingView</span>
      </div>
    ),
  },
  {
    name: "Barchart",
    render: () => (
      <div className="flex items-center gap-2 group">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white/40 group-hover:text-white/60 transition-colors">
          <rect x="2" y="14" width="4" height="8" rx="1" fill="currentColor" />
          <rect x="8" y="9" width="4" height="13" rx="1" fill="currentColor" />
          <rect x="14" y="5" width="4" height="17" rx="1" fill="currentColor" />
          <rect x="20" y="2" width="4" height="20" rx="1" fill="currentColor" />
        </svg>
        <span className="text-[13px] md:text-[15px] font-medium text-white/40 group-hover:text-white/60 tracking-tight font-hoves transition-colors">Barchart</span>
      </div>
    ),
  },
];

const allLogos = [...logos, ...logos, ...logos];

export default function TrustedLogos() {
  const { t } = useTranslation();

  return (
    <section className="w-full pt-4 pb-12 overflow-hidden relative border-b border-white/[0.03]">

      {/* Integrative Label */}
      <p className="text-center mb-8 text-[10px] md:text-xs font-mono tracking-[0.2em] md:tracking-[0.25em] uppercase text-white/20 font-medium">
        {t("hero.integration")}
      </p>

      {/* Dynamic Marquee Strip Container */}
      <div className="relative h-11 flex items-center">

        {/* Left Side Responsive Fade */}
        <div className="absolute left-0 top-0 h-full z-10 pointer-events-none w-16 sm:w-32 md:w-64 bg-gradient-to-r from-[#010B24] to-transparent" />

        {/* Right Side Responsive Fade */}
        <div className="absolute right-0 top-0 h-full z-10 pointer-events-none w-16 sm:w-32 md:w-64 bg-gradient-to-l from-[#010B24] to-transparent" />

        {/* Scrolling Animation Track — Triple-buffered list for seamless loop */}
        <div className="flex items-center absolute top-1/2 -translate-y-1/2 left-0 gap-10 sm:gap-14 md:gap-16 lg:gap-20 animate-marquee whitespace-nowrap will-change-transform">
          {allLogos.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center"
            >
              {logo.render()}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}