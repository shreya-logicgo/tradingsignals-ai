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
    <section
      className="w-full py-10 md:py-16 relative overflow-hidden"
      style={{
        /* #010B24 for ~85% of the section, only a small bottom portion fades to #042b8d */
        background: "linear-gradient(180deg, #010B24 0%, #010B24 75%, #02164b 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center max-w-[740px] mx-auto mb-8 md:mb-12 gap-4 md:gap-6">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 shadow-inner">
            <span className="text-[11px] font-mono font-medium tracking-widest uppercase text-[#C7CCD2]">
              AI Strategies
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <h2 className="text-white font-hoves font-medium text-3xl md:text-4xl lg:text-5xl leading-tight"style={{ fontFamily: "var(--font-hoves)" }}>
              Choose Your Trading Channels
            </h2>
            <p className="font-hoves text-[15px] md:text-base text-[#C7CCD2] leading-relaxed max-w-[600px] opacity-80"style={{ fontFamily: "var(--font-hoves)" }}>
              Access specialized AI-driven signal streams, each built for a
              specific strategy — from scalping and swing trading to momentum
              and automation.
            </p>
          </div>
        </div>

        {/* Filters and Tabs */}
        <div className="flex flex-col gap-4 ">
          <StrategyTabs />
          <StrategyFilters />
        </div>

        {/* Strategies Grid — using h-full to normalize heights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 items-stretch">
          {strategies.map((s) => (
            <div key={s.name} className="flex">
              <StrategyCard {...s} />
            </div>
          ))}
        </div>
      </div>

      {/* Background Decorative Glow (Optional but premium) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/5 blur-[120px] pointer-events-none" />
    </section>
  );
}