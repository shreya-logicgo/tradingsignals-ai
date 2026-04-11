import StrategyCard from "./StrategyCard";
import StrategyTabs from "./StrategyTabs";
import StrategyFilters from "./StrategyFilters";
import primeIcon from "@/assets/icons/tsai-prime.png";
import momentumIcon from "@/assets/icons/tsai-momentum.png";
import coreIcon from "@/assets/icons/tsai-core.png";
import altsIcon from "@/assets/icons/tsai-alts.png";
import flashIcon from "@/assets/icons/tsai-flash.png";
import systemIcon from "@/assets/icons/tsai-system.png";
import structIcon from "@/assets/icons/tsai-struct.png";
import assistIcon from "@/assets/icons/tsai-assist.png";
import volIcon from "@/assets/icons/tsai-vol.png";
import hybridIcon from "@/assets/icons/tsai-hybrid.png";

const strategies = [
  {
    icon: primeIcon,
    name: "TSAI Prime",
    description:
      "Advanced AI signals powered by deep market analysis and probability models.",
    roi: "+47.3%",
    price: "$149/mo",
  },
  {
    icon: momentumIcon,
    name: "TSAI Momentum",
    description: "Ride strong trends and capture powerful market expansions.",
    roi: "+38.6%",
    price: "$49/mo",
  },
  {
    icon: coreIcon,
    name: "TSAI Core",
    description:
      "Structured swing trades on major assets with high-probability setups.",
    roi: "+24.2%",
    price: "$49/mo",
  },
  {
    icon: altsIcon,
    name: "TSAI Alts",
    description:
      "AI-curated altcoin opportunities with strong momentum and liquidity.",
    roi: "+62.8%",
    price: "$49/mo",
  },
  {
    icon: flashIcon,
    name: "TSAI Flash",
    description: "Ultra-fast signals for scalping and breakout opportunities.",
    roi: "+31.4%",
    price: "$49/mo",
  },
  {
    icon: systemIcon,
    name: "TSAI System",
    description:
      "Automated signals generated continuously based on algorithmic conditions.",
    roi: "+28.9%",
    price: "$59/mo",
  },
  {
    icon: structIcon,
    name: "TSAI Struct",
    description:
      "Disciplined trading with controlled risk and balanced capital allocation.",
    roi: "+33.7%",
    price: "$79/mo",
  },
  {
    icon: assistIcon,
    name: "TSAI Assist",
    description:
      "Simple, guided signals designed for easy and confident execution.",
    roi: "+18.5%",
    price: "$39/mo",
  },
  {
    icon: volIcon,
    name: "TSAI Vol",
    description:
      "Specialized signals for volatile market conditions and high-momentum opportunities.",
    roi: "+31.4%",
    price: "$49/mo",
  },
  {
    icon: hybridIcon,
    name: "TSAI Hybrid",
    description:
      "Simple, guided signals designed for easy and confident execution.",
    roi: "+28.9%",
    price: "$59/mo",
  },
];

export default function Strategies() {
  return (
    <section className="w-full py-5" style={{ backgroundColor: "#010B24" }}>
      <div
        className="w-full mx-auto"
        style={{
          paddingLeft: "clamp(20px, 13vw, 250px)",
          paddingRight: "clamp(20px, 13vw, 250px)",
        }}
      >
        {/* Header */}
        <div
          className="flex flex-col items-center text-center mx-auto"
          style={{ maxWidth: "740px", gap: "30px", marginBottom: "35px" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "5px 5px",
              borderRadius: "40px",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 500,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "#C7CCD2",
              }}
            >
              AI Strategies
            </span>
          </div>

          <div className="flex flex-col items-center" style={{ gap: "16px" }}>
            <h2
              className="text-white font-medium leading-tight"
              style={{ fontSize: "clamp(32px, 3.5vw, 44px)" , fontFamily: "var(--font-hoves)" }}
            >
              Choose Your Trading Channels
            </h2>
            <p
              style={{
                fontSize: "14px",
                fontFamily: "var(--font-hoves)",
                color: "#C7CCD2",
                lineHeight: "1.7",
                maxWidth: "600px",
              }}

            >
              Access specialized AI-driven signal streams, each built for a
              specific strategy — from scalping and swing trading to momentum
              and automation.
            </p>
          </div>
        </div>

        <StrategyTabs />
        <StrategyFilters />

        {/* ✅ items-start stops grid from stretching cells */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-start"
          style={{ gap: "20px" }}
        >
          {strategies.map((s) => (
            <StrategyCard key={s.name} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}