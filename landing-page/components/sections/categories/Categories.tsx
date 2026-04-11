"use client";

import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Scalping",
    description:
      "Fast-response strategies built to capture short-term price movements and volatility spikes with rapid execution.",
    tags: ["TSAI Vol", "TSAI Flash"],
  },
  {
    title: "Swing Trading",
    description:
      "Structured strategies focused on medium-term trends and high-probability opportunities across major and altcoin markets.",
    tags: ["TSAI Core", "TSAI Alts"],
  },
  {
    title: "AI Strategy",
    description:
      "Flagship AI-driven strategy analyzing market structure, sentiment, and volatility to identify dominant market setups.",
    tags: ["TSAI Prime"],
  },
  {
    title: "Low Risk",
    description:
      "Simplified trading signals designed for guided execution and controlled exposure, ideal for beginners and steady trading.",
    tags: ["TSAI Assist"],
  },
  {
    title: "High Risk High Reward",
    description:
      "Aggressive strategies targeting strong price expansions and high-momentum trading opportunities.",
    tags: ["TSAI Momentum", "TSAI Hybrid"],
  },
  {
    title: "Futures",
    description:
      "Advanced strategies focused on structured execution, systematic signals, and portfolio-level risk control.",
    tags: ["TSAI Struct", "TSAI System"],
  },
];

export default function Categories() {
  return (
    <section className="w-full bg-[#010B24] py-16 md:py-24">
      {/* Outer wrapper — responsive horizontal padding */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Main content container */}
        <div className="flex flex-col gap-12 lg:gap-16">

          {/* ── Header Block ── */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12">
            {/* Left: Badge + Heading */}
            <div className="flex flex-col gap-4 max-w-[439px]">
              {/* Badge */}
              <div className="inline-flex self-start items-center px-4 py-1.5 rounded-full border border-white/10">
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#C7CCD2]">
                  Trading Channels
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-normal leading-tight md:leading-[40px] font-hoves text-white" style={{ fontFamily: "var(--font-hoves)" }}>
                Trade with Purpose, Not Guesswork
              </h2>
            </div>

            {/* Right: Description */}
            <div className="max-w-[540px] lg:self-end">
              <p className="text-sm md:text-base leading-relaxed text-white/65 font-hoves lg:text-right" style={{ fontFamily: "var(--font-hoves)" }}>
                Structured strategies powered by AI, designed to capture
                opportunities across volatility, trends, and market momentum.
              </p>
            </div>
          </div>

          {/* ── Cards Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.title} {...cat} />
            ))}
          </div>

          {/* ── Explore Button ── */}
          <div className="flex justify-center ">
            <button
              className="w-[110px] h-[32px] rounded-full border border-white/30 bg-transparent text-white text-xs font-medium uppercase tracking-widest font-hoves flex items-center justify-center transition-all duration-300"
              style={{ fontFamily: "var(--font-hoves)" }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.background = "#FFFFFF";
                btn.style.color = "#000000";
                btn.style.borderColor = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.background = "transparent";
                btn.style.color = "#FFFFFF";
                btn.style.borderColor = "rgba(255,255,255,0.3)";
              }}
            >
              Explore
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
