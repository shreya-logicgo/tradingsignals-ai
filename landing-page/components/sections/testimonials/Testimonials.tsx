"use client";

import TestimonialCard from "./TestimonialCard";
import Image from "next/image";
import img1 from "@/assets/images/testimonial-1.jpg";
import img2 from "@/assets/images/testimonial-2.jpg";
import img3 from "@/assets/images/testimonial-3.jpg";
import img4 from "@/assets/images/testimonial-4.jpg";
import img5 from "@/assets/images/testimonial-5.jpg";

const leftCards = [
  {
    image: img1,
    quote:
      '"Trading Signals AI has been a game-changer for me as a beginner in the world of crypto trading. Before joining, I was hesitant to explore into the market, fearing I\'d make costly mistakes."',
  },
  {
    image: img2,
    quote:
      '"Their platform is intuitive and user-friendly, and their signals provide clear entry and exit points, making it easy for beginners like me to follow."',
  },
];

const rightCards = [
  {
    image: img4,
    quote:
      '"With Trading Signals AI, I found a welcoming community and a wealth of resources to guide me on my trading journey."',
  },
  {
    image: img5,
    quote:
      '"Trading Signals AI has been a game-changer for me as a beginner in the world of crypto trading. Before joining, I was hesitant to explore into the market, fearing I\'d make costly mistakes."',
  },
];

export default function Testimonials() {
  return (
    <section className="w-full relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-[#0028ff40] via-[#0012b826] via-[#000a5014] to-transparent">
      {/* Radial depth glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[600px] blur-[60px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(37,99,235,0.15) 40%, rgba(1,6,26,0) 70%)"
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-start">
          
          {/* ── CENTER / HEADING (Top on Mobile, Middle on Desktop) ── */}
          <div className="flex flex-col items-center text-center gap-6 lg:mt-10 order-1 lg:order-2 md:col-span-2 lg:col-span-1">
            {/* Badge */}
            <div className="px-3.5 py-1 flex justify-center rounded-full border border-white/20 bg-white/5">
              <span className="text-[11px] font-mono tracking-widest uppercase text-white/70"style={{ fontFamily: "var(--font-mono)" }}>
                Testimonials
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-medium leading-tight text-white font-hoves"style={{ fontFamily: "var(--font-hoves)" }}>
              Trusted by 1k+ <br className="hidden md:block" /> Traders
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-white/65 leading-relaxed font-hoves max-w-xs"style={{ fontFamily: "var(--font-hoves)" }}>
              Real results from real traders using Trading Signals AI
            </p>

            {/* Featured Testimonial Card */}
            <div className="w-full mt-4"style={{ fontFamily: "var(--font-hoves)" }}>
              <TestimonialCard
                image={img3}
                quote="Trading Signals AI has transformed my trading experience. The platform is user-friendly, and the signals are accurate and timely. I've seen a significant improvement in my trading performance since I started using it."
              />
            </div>
          </div>

          {/* ── LEFT COLUMN (Second on Mobile, First on Desktop) ── */}
          <div className="flex flex-col gap-8 md:gap-12 order-2 lg:order-1">
            {leftCards.map((card, i) => (
              <TestimonialCard key={i} {...card} />
            ))}
          </div>

          {/* ── RIGHT COLUMN (Third on Mobile, Third on Desktop) ── */}
          <div className="flex flex-col gap-8 md:gap-12 order-3">
            {rightCards.map((card, i) => (
              <TestimonialCard key={i} {...card} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
