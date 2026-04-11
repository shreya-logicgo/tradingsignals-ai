"use client";

import Image from "next/image";
import blog1 from "@/assets/images/blog-1.jpg";
import blog2 from "@/assets/images/blog-2.jpg";
import blog3 from "@/assets/images/blog-3.jpg";

const posts = [
  {
    image: blog1,
    title: "2026 AI Trading Strategies for NVDA: Chart & AI Analytics Guide",
    description:
      "Discover how AI-powered analytics are reshaping trading strategies for NVDA in 2026, with real chart breakdowns and signal analysis.",
  },
  {
    image: blog2,
    title: "How to Trade XAUUSD Breakouts Using ATR and AI-empowered Tr...",
    description:
      "Learn how to identify high-probability XAUUSD breakout setups using ATR volatility filters combined with AI signal confirmation.",
  },
  {
    image: blog3,
    title: "PR News: Automate Trading Ideas in Seconds: TradeOS Launches...",
    description:
      "TradeOS introduces a new automation layer that converts raw trading ideas into executable strategies in seconds using AI.",
  },
];

export default function CTA() {
  return (
    <section className="w-full bg-[#010B24] py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col gap-12 lg:gap-16">
          
          {/* ── Header ── */}
          <div className="flex flex-col items-center text-center gap-6 max-w-[500px] mx-auto">
            {/* Badge */}
            <div className="px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5">
              <span className="text-[11px] font-mono tracking-widest uppercase text-white/70">
                Blogs
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-hoves font-medium text-3xl md:text-4xl text-white leading-tight">
              Latest News & Insights
            </h2>

            {/* Subtext */}
            <p className="font-hoves font-light text-sm md:text-base text-[#c7ccd2] leading-relaxed">
              Stay ahead of the curve with our expert analysis, trading guides, and major platform announcements.
            </p>
          </div>

          {/* ── Cards + CTA ── */}
          <div className="flex flex-col gap-12">
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
              {posts.map((post, i) => (
                <div
                  key={i}
                  className="group flex flex-col gap-6 cursor-pointer transition-transform duration-300 hover:-translate-y-2"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[460/300] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Text content */}
                  <div className="flex flex-col gap-4">
                    <h3 className="font-hoves font-medium text-xl text-white leading-tight">
                      {post.title}
                    </h3>
                    <p className="font-hoves font-normal text-sm md:text-base text-[#c7ccd2] leading-relaxed">
                      {post.description}
                    </p>

                    {/* View more link */}
                    <div className="mt-auto">
                      <span className="text-sm text-white font-hoves underline underline-offset-4 decoration-white/30 group-hover:decoration-white transition-all">
                        View more
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Learn More button */}
            <div className="flex justify-center mt-4">
              <button className="px-8 py-3 rounded-full border border-white text-white text-sm font-medium font-hoves transition-all duration-300 hover:bg-white hover:text-black">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}