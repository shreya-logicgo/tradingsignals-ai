"use client";
import { useTranslation } from "react-i18next";

// No image imports needed — logos are rendered as styled text/SVG inline
// matching the exact Figma design

const logos = [
  {
    name: "WunderTrading",
    render: () => (
      <span className="flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="9" height="9" rx="1.5" fill="rgba(255,255,255,0.6)" />
          <rect x="13" y="2" width="9" height="9" rx="1.5" fill="rgba(255,255,255,0.6)" />
          <rect x="2" y="13" width="9" height="9" rx="1.5" fill="rgba(255,255,255,0.6)" />
          <rect x="13" y="13" width="9" height="9" rx="1.5" fill="rgba(255,255,255,0.6)" />
        </svg>
        <span style={{ fontSize: "15px", fontWeight: 500, color: "rgba(255,255,255,0.55)", letterSpacing: "0.01em" }}>
          WunderTrading
        </span>
      </span>
    ),
  },
  {
    name: "Binance",
    render: () => (
      <span className="flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 3L14.5 5.5L9 11L6.5 8.5L12 3Z" fill="rgba(255,255,255,0.6)" />
          <path d="M16 7L18.5 9.5L9 19L6.5 16.5L16 7Z" fill="rgba(255,255,255,0.6)" />
          <path d="M5 10.5L7.5 13L5 15.5L2.5 13L5 10.5Z" fill="rgba(255,255,255,0.6)" />
          <path d="M19 10.5L21.5 13L19 15.5L16.5 13L19 10.5Z" fill="rgba(255,255,255,0.6)" />
          <path d="M12 16.5L14.5 19L12 21.5L9.5 19L12 16.5Z" fill="rgba(255,255,255,0.6)" />
        </svg>
        <span style={{ fontSize: "16px", fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.03em", textTransform: "uppercase" }}>
          BINANCE
        </span>
      </span>
    ),
  },
  {
    name: "TradersPost",
    render: () => (
      <span className="flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M3 17L9 11L13 15L21 7" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 7H21V11" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontSize: "15px", fontWeight: 600, color: "rgba(255,255,255,0.55)", letterSpacing: "0.01em" }}>
          TradersPost
        </span>
      </span>
    ),
  },
  {
    name: "Cboe",
    render: () => (
      <span className="flex items-center gap-1">
        <span style={{ fontSize: "16px", fontWeight: 600, color: "rgba(255,255,255,0.55)", letterSpacing: "0.02em" }}>
          C
        </span>
        <span style={{ fontSize: "11px", fontWeight: 400, color: "rgba(255,255,255,0.55)", position: "relative", top: "-3px" }}>
          ✦
        </span>
        <span style={{ fontSize: "16px", fontWeight: 600, color: "rgba(255,255,255,0.55)", letterSpacing: "0.02em" }}>
          boe
        </span>
      </span>
    ),
  },
  {
    name: "OpenAI",
    render: () => (
      <span className="flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M20.5 11.5C20.5 16.75 16.25 21 11 21C5.75 21 1.5 16.75 1.5 11.5C1.5 6.25 5.75 2 11 2C13.5 2 15.75 2.95 17.45 4.55" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="11" cy="11.5" r="3.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8"/>
        </svg>
        <span style={{ fontSize: "15px", fontWeight: 500, color: "rgba(255,255,255,0.55)", letterSpacing: "0.01em" }}>
          OpenAI
        </span>
      </span>
    ),
  },
  {
    name: "TradingView",
    render: () => (
      <span className="flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M2 18L8 12L12 16L22 6" stroke="rgba(255,255,255,0.6)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontSize: "15px", fontWeight: 600, color: "rgba(255,255,255,0.55)", letterSpacing: "0.01em" }}>
          TradingView
        </span>
      </span>
    ),
  },
  {
    name: "Barchart",
    render: () => (
      <span className="flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="14" width="4" height="8" rx="1" fill="rgba(255,255,255,0.6)" />
          <rect x="8" y="9" width="4" height="13" rx="1" fill="rgba(255,255,255,0.6)" />
          <rect x="14" y="5" width="4" height="17" rx="1" fill="rgba(255,255,255,0.6)" />
          <rect x="20" y="2" width="4" height="20" rx="1" fill="rgba(255,255,255,0.6)" />
        </svg>
        <span style={{ fontSize: "15px", fontWeight: 500, color: "rgba(255,255,255,0.55)", letterSpacing: "0.01em" }}>
          Barchart
        </span>
      </span>
    ),
  },
];

const allLogos = [...logos, ...logos, ...logos];

export default function TrustedLogos() {
  const { t } = useTranslation();

  return (
    <section className="w-full py-10 overflow-hidden relative">

      {/* Label */}
      <p
        className="text-center mb-6"
        style={{
          fontSize: "10px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.25)",
          fontWeight: 500,
        }}
      >
        {t("hero.integration")}
      </p>

      {/* Marquee strip — fixed height matching Figma (30px content + padding) */}
      <div className="relative" style={{ height: "44px" }}>

        {/* Left fade */}
        <div
          className="absolute left-0 top-0 h-full z-10 pointer-events-none"
          style={{
            width: "180px",
            background: "linear-gradient(to right, #010B24 20%, transparent 100%)",
          }}
        />

        {/* Right fade */}
        <div
          className="absolute right-0 top-0 h-full z-10 pointer-events-none"
          style={{
            width: "180px",
            background: "linear-gradient(to left, #010B24 20%, transparent 100%)",
          }}
        />

        {/* Scrolling track */}
        <div
          className="flex items-center absolute top-0 left-0"
          style={{
            gap: "64px",
            animation: "marquee 30s linear infinite",
            whiteSpace: "nowrap",
          }}
        >
          {allLogos.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center transition-all duration-300"
              style={{ height: "30px", opacity: 0.9 }}
            >
              {logo.render()}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}