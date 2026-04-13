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
    <section className="w-full bg-[#010B24] py-10 md:py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col gap-6 lg:gap-10">

          {/* ── Header ── */}
          <div className="flex flex-col items-center text-center gap-2 max-w-[500px] mx-auto">
            <div className="px-3.5 py-0.5 flex justify-center rounded-full border border-white/20 bg-white/5">
              <span
                className="text-[11px] font-mono tracking-widest uppercase text-white/70"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Blogs
              </span>
            </div>

            <h2
              className="font-medium text-3xl md:text-4xl text-white leading-tight"
              style={{ fontFamily: "var(--font-hoves)" }}
            >
              Latest News & Insights
            </h2>

            <p
              className="font-light text-sm md:text-base text-[#c7ccd2] leading-relaxed"
              style={{ fontFamily: "var(--font-hoves)" }}
            >
              Stay ahead of the curve with our expert analysis, trading guides,
              and major platform announcements.
            </p>
          </div>

          {/* ── Cards + CTA ── */}
          <div className="flex flex-col gap-12">

            {/* Grid — items-stretch makes all cards same height per row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 items-stretch">
              {posts.map((post, i) => (
                <div
                  key={i}
                  className="group flex flex-col cursor-pointer transition-transform duration-300 hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[460/300] rounded-2xl overflow-hidden shadow-2xl flex-shrink-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/*
                    Content — flex-col + justify-between
                    Top group: title + description
                    Bottom: View more — always aligned across all cards
                  */}
                  <div
                    className="flex flex-col flex-1 pt-6 justify-between gap-4"
                  >
                    {/* Top: title + description */}
                    <div className="flex flex-col gap-3">
                      <h3
                        className="text-xl text-white leading-tight line-clamp-2"
                        style={{ fontFamily: "var(--font-hoves)" }}
                      >
                        {post.title}
                      </h3>

                      <p
                        className="text-sm md:text-base text-[#c7ccd2] leading-relaxed line-clamp-3"
                        style={{ fontFamily: "var(--font-hoves)" }}
                      >
                        {post.description}
                      </p>
                    </div>

                    {/* Bottom: View more — pinned to bottom by justify-between */}
                    <span
                      className="text-sm text-white underline underline-offset-4 decoration-white/30 group-hover:decoration-white transition-all"
                      style={{ fontFamily: "var(--font-hoves)" }}
                    >
                      View more
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Learn More button */}
            <div className="flex justify-center mt-4">
              <button
                className="px-8 py-3 rounded-full cursor-pointer border border-white text-white text-sm font-medium transition-all duration-300 hover:bg-white hover:text-black"
                style={{ fontFamily: "var(--font-hoves)" }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}