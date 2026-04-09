import { Brain, Link2, SlidersHorizontal, LineChart } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Signals",
    description:
      "Advanced machine learning models analyze market patterns, sentiment, and on-chain data to generate high-probability trading signals.",
    gradient: "/assets/images/gradent_3_.png",
  },
  {
    icon: Link2,
    title: "Multi-Exchange Integration",
    description:
      "Connect to Binance, Coinbase, Kraken, Bybit, OKX and more. Trade across all major exchanges from a single dashboard.",
    gradient: "/assets/images/gradent_6_.png",
  },
  {
    icon: SlidersHorizontal,
    title: "Automation + Manual Trading",
    description:
      "Execute trades automatically or use our signals for manual trading. Full control over your trading style and risk management.",
    gradient: "/assets/images/gradent_5_.png",
  },
  {
    icon: LineChart,
    title: "Real-Time Analytics",
    description:
      "Track performance, analyze trades, and optimize strategies with our comprehensive analytics dashboard and reporting tools.",
    gradient: "/assets/images/gradent_4_.png",
  },
];

export default function Features() {
  return (
    <section
      className="w-full py-24"
      style={{ backgroundColor: "#010B24" }}
    >
      {/*
        Figma: content starts at left: 250px on a 1920px canvas
        → paddingLeft/Right: 250px on large screens, scales down responsively
      */}
      <div
        className="w-full mx-auto"
        style={{
          paddingLeft: "clamp(20px, 13vw, 180px)",
          paddingRight: "clamp(20px, 13vw, 150px)",
        }}
      >

        {/* ── Header ── */}
        <div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between"
          style={{ gap: "40px", marginBottom: "48px" }}
        >
          {/* Left: badge + heading */}
          <div>
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "5px 14px",
                borderRadius: "40px",
                border: "1px solid rgba(255,255,255,0.20)",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                Platform Features
              </span>
            </div>

            {/* Heading */}
            <h2
              style={{
                fontSize: "clamp(32px, 3.5vw, 48px)",
                fontWeight: 600,
                color: "white",
                lineHeight: 1.15,
                maxWidth: "516px",
              }}
            >
              Everything You Need to Trade Profitably
            </h2>
          </div>

          {/* Right: description */}
          <p
            style={{
              fontSize: "18px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.65)",
              lineHeight: "1.6",
              maxWidth: "420px",
              flexShrink: 0,
            }}
          >
            A complete trading ecosystem built for modern crypto traders.
            From signals to execution to analytics.
          </p>
        </div>

        {/* ── Cards grid ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Row 1: 42% | 58% */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: "0 0 calc(42% - 10px)", minWidth: "280px", flexGrow: 1 }}>
              <FeatureCard {...features[0]} className="w-full" />
            </div>
            <div style={{ flex: "0 0 calc(58% - 10px)", minWidth: "280px", flexGrow: 1 }}>
              <FeatureCard {...features[1]} className="w-full" />
            </div>
          </div>

          {/* Row 2: 58% | 42% */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: "0 0 calc(58% - 10px)", minWidth: "280px", flexGrow: 1 }}>
              <FeatureCard {...features[2]} className="w-full" />
            </div>
            <div style={{ flex: "0 0 calc(42% - 10px)", minWidth: "280px", flexGrow: 1 }}>
              <FeatureCard {...features[3]} className="w-full" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}