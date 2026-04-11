import { Brain, Link2, SlidersHorizontal, LineChart } from "lucide-react";
import FeatureCard from "./FeatureCard";


const features = [
  {
    icon: Brain,
    title: "AI-Powered Signals",
    description: "Advanced machine learning models analyze market patterns, sentiment, and on-chain data to generate high-probability trading signals.",
    gradient: "/images/gradient_3_.png",
  },
  {
    icon: Link2,
    title: "Multi-Exchange Integration",
    description: "Connect to Binance, Coinbase, Kraken, Bybit, OKX and more. Trade across all major exchanges from a single dashboard.",
    gradient: "/images/gradient_4_.png",
  },
  {
    icon: SlidersHorizontal,
    title: "Automation + Manual Trading",
    description: "Execute trades automatically or use our signals for manual trading. Full control over your trading style and risk management.",
    gradient: "/images/gradient_5_.png",
  },
  {
    icon: LineChart,
    title: "Real-Time Analytics",
    description: "Track performance, analyze trades, and optimize strategies with our comprehensive analytics dashboard and reporting tools.",
    gradient: "/images/gradient_6_.png",
  },
];

export default function Features() {
  return (
    <section className="w-full bg-[#010B24] py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        
        {/* Header Section — Mobile-first column, Desktop split row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 md:gap-12 lg:gap-20 mb-12 md:mb-16">
          
          {/* Left: Badge + Heading block */}
          <div className="flex flex-col items-start gap-4 md:gap-5">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 shadow-inner">
              <span className="text-[11px] font-mono font-medium tracking-widest uppercase text-white/50">
                Platform Features
              </span>
            </div>

            {/* Main Section Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-medium text-white leading-tight md:leading-[1.15] font-hoves max-w-[520px]">
              Everything You Need to Trade Profitably
            </h2>
          </div>

          {/* Right: Supporting brief */}
          <div className="lg:max-w-[420px] lg:mb-2 flex-shrink-0">
            <p className="text-[15px] md:text-base font-normal text-white/50 leading-relaxed font-hoves">
              A complete trading ecosystem built for modern crypto traders.
              From signals to execution to analytics.
            </p>
          </div>
        </div>

        {/* ── Asymmetrical Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-stretch">
          
          {/* Top Asymmetrical Row: 42% | 58% (Approx 5:7 columns) */}
          <div className="md:col-span-5 h-full">
            <FeatureCard {...features[0]} />
          </div>
          <div className="md:col-span-7 h-full">
            <FeatureCard {...features[1]} />
          </div>

          {/* Bottom Asymmetrical Row: 58% | 42% (Approx 7:5 columns) */}
          <div className="md:col-span-7 h-full">
            <FeatureCard {...features[2]} />
          </div>
          <div className="md:col-span-5 h-full">
            <FeatureCard {...features[3]} />
          </div>

        </div>
      </div>
      
      {/* Decorative background glow for depth */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-blue-600/5 blur-[120px] pointer-events-none" />
    </section>
  );
}