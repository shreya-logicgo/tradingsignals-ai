"use client";

import { useState } from "react";
import TraderFeatureCard from "./TraderFeatureCard";

/* ── Inline SVG icons ── */
const ShieldIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const EyeIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ChartIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const ZapIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const allCards = [
  {
    icon: <ShieldIcon />,
    title: "Bank-Level Security",
    description: "Your API keys are encrypted with AES-256. We never have withdrawal access to your funds.",
  },
  {
    icon: <EyeIcon />,
    title: "Full Transparency",
    description: "Real-time performance tracking. See every trade, every P&L, every detail. No hidden fees.",
  },
  {
    icon: <ChartIcon />,
    title: "Advanced Analytics",
    description: "Detailed reports, trade history, and performance metrics to optimize your strategy.",
  },
  {
    icon: <ZapIcon />,
    title: "Instant Execution",
    description: "Sub-second trade execution ensures you never miss an opportunity in fast markets.",
  },
];

export default function Traders() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;
  const canPrev = startIndex > 0;
  const canNext = startIndex + visibleCount < allCards.length;

  const visibleCards = allCards.slice(startIndex, startIndex + visibleCount);

  return (
    <section
      className="w-full relative overflow-hidden pb-4"
      style={{ backgroundColor: "#010B24", textAlign: "center"}}
    >
      {/* Inner wrapper */}
      <div
        className="w-full mx-auto"
        style={{
          paddingLeft: "clamp(20px, 13vw, 250px)",
          paddingRight: "clamp(20px, 13vw, 250px)",
        }}
      >
        <div
          style={{
            maxWidth: "1420px",
            display: "flex",
            flexDirection: "column",
            gap: "60px",
          }}
        >
          {/* ── Header block ── */}
          <div
            style={{
              maxWidth: "521px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "30px",
            }}
          >
            {/* Badge */}
            <div
              style={{
                padding: "5px 14px",
                borderRadius: "40px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Why Choose Us
              </span>
            </div>

            {/* Heading */}
            <h2
              style={{
                fontFamily: "var(--font-hoves)",
                fontWeight: 500,
                fontSize: "40px",
                lineHeight: "1.2",
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              Built for Serious Traders
            </h2>

            {/* Subtext */}
            <p
              style={{
                fontSize: "16px",
                color: "rgba(199,204,210,1)",
                lineHeight: "1.5",
                maxWidth: "480px",
                margin: 0,
                fontFamily: "var(--font-hoves)",
              }}
            >
              We obsess over the details so you can focus on what matters: profitable trading.
            </p>
          </div>

          {/* ── Cards row + connecting line ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ position: "relative" }}>

              {/* Cards */}
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  width: "100%",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {visibleCards.map((card, i) => (
                  <TraderFeatureCard key={startIndex + i} {...card} />
                ))}
              </div>
            </div>

            {/* ── Navigation arrows ── */}
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
              <button
                onClick={() => setStartIndex((p) => Math.max(0, p - 1))}
                disabled={!canPrev}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: canPrev ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: canPrev ? "pointer" : "not-allowed",
                  color: canPrev ? "#fff" : "rgba(255,255,255,0.3)",
                  transition: "background 0.2s",
                }}
              >
                <ChevronLeft />
              </button>
              <button
                onClick={() => setStartIndex((p) => Math.min(allCards.length - visibleCount, p + 1))}
                disabled={!canNext}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: canNext ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: canNext ? "pointer" : "not-allowed",
                  color: canNext ? "#fff" : "rgba(255,255,255,0.3)",
                  transition: "background 0.2s",
                }}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}