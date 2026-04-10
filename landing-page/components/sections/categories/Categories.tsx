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
    <section
      className="w-full"
      style={{ backgroundColor: "#010B24", paddingTop: "10px", paddingBottom: "10px" }}
    >
      {/* Outer wrapper — same horizontal padding as Features */}
      <div
        className="w-full mx-auto"
        style={{
          paddingLeft: "clamp(20px, 13vw, 250px)",
          paddingRight: "clamp(20px, 13vw, 250px)",
        }}
      >
        {/* Main content container */}
        <div
          className="flex flex-col"
          style={{
            maxWidth: "1420px",
            paddingTop: "50px",
            paddingBottom: "120px",
            gap: "0px",
          }}
        >
          {/* ── Header Block ── */}
          <div
            className="flex flex-row items-start justify-between"
          >
            {/* Left: Badge + Heading */}
            <div
              className="flex flex-col"
              style={{ maxWidth: "439px", gap: "7px" }}
            >
              {/* Badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  alignItems: "center",
                  padding: "5px 14px",
                  borderRadius: "40px",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "#C7CCD2",
                  }}
                >
                  Trading Channels
                </span>
              </div>

              {/* Heading */}
              <h2
                style={{
                  fontSize: "36px",
                  lineHeight: "40px",
                  fontFamily: "var(--font-hoves)",
                  color: "#FFFFFF",
                  margin: 0,
                }}
              >
                Trade with Purpose,
                <br />
                Not Guesswork
              </h2>
            </div>

            {/* Right: Description */}
            <div
              className="flex flex-col"
              style={{ maxWidth: "540px", gap: "10px", alignSelf: "flex-start", paddingTop: "4px" }}
            >
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "1.7",
                  color: "rgba(255,255,255,0.65)",
                  fontFamily: "var(--font-hoves)",
                  margin: 45,
                  textAlign: "end",
                  marginRight: "-5px"
                }}
              >
                Structured strategies powered by AI, designed to capture <br />
                opportunities across volatility, trends, and market momentum.
              </p>
            </div>
          </div>

          {/* ── Cards Grid ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              width: "100%",
            }}
          >
            {categories.map((cat) => (
              <CategoryCard key={cat.title} {...cat} />
            ))}
          </div>

          {/* ── Explore Button ── */}
          <div className="flex justify-center">
            <button
              style={{
                width: "80px",
                height: "6px",
                padding: "19px 24px",
                marginTop: "35px",
                borderRadius: "40px",
                border: "1px solid #FFFFFF",
                background: "transparent",
                color: "#FFFFFF",
                fontSize: "12px",
                fontFamily: "var(--font-hoves)",
                cursor: "pointer",
                transition: "background 0.2s ease, border-color 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget;
                btn.style.background =
                  "linear-gradient(90deg, #2563eb, #06b6d4)";
                btn.style.borderColor = "transparent";
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget;
                btn.style.background = "transparent";
                btn.style.borderColor = "#FFFFFF";
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