"use client";

import StepCard from "./StepCard";
import { Link2, Layers, BarChart3 } from "lucide-react";

export default function Steps() {
  return (
    <section className="w-full py-10 md:py-14 relative overflow-hidden bg-[#010B24]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-x-12 lg:gap-y-0 items-start">
          
          {/* ── HEADING (Center on Desktop, Top on Mobile) ── */}
          <div className="lg:col-start-2 lg:row-start-1 flex flex-col items-center text-center lg:pt-14 mb-8 lg:mb-0 order-1">
            {/* Badge */}
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6">
              <span className="text-[11px] font-mono tracking-widest uppercase text-white/50">
                Getting Started
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-[40px] font-medium leading-tight md:leading-[1.1] text-white font-hoves mb-2 lg:max-w-md"style={{ fontFamily: "var(--font-hoves)" }}>
              Start Trading in 3 Simple Steps
            </h2>

            {/* Subtitle */}
            <p className="text-sm md:text-base font-light leading-relaxed text-[#c7ccd2] font-hoves max-w-[280px]"style={{ fontFamily: "var(--font-hoves)" }}>
              Get up and running in minutes. No complex setup required.
            </p>
          </div>

          {/* ── STEP 01 (Left on Desktop, After Heading on Mobile) ── */}
          <div className="lg:col-start-1 lg:row-start-1 flex justify-center lg:justify-start order-2 lg:order-1 lg:pt-4">
            <StepCard
              step="Step 01"
              Icon={Link2}
              title="Register & Connect"
              description="Securely link your exchange account via API. We support Binance, Coinbase, Kraken, Bybit, OKX, and more. Your funds stay on your exchange."
            />
          </div>

          {/* ── STEP 03 (Right on Desktop) ── */}
          <div className="lg:col-start-3 lg:row-start-1 flex justify-center lg:justify-end order-4 lg:order-3 lg:pt-4">
            <StepCard
              step="Step 03"
              Icon={BarChart3}
              title="Trade & Monitor"
              description="Execute trades automatically or manually. Track performance in real-time with our advanced analytics dashboard."
            />
          </div>

          {/* ── STEP 02 (Below Heading on Desktop) ── */}
          <div className="lg:col-start-2 lg:row-start-2 flex justify-center pt-8 lg:pt-24 order-3 lg:order-4">
            <StepCard
              step="Step 02"
              Icon={Layers}
              title="Choose Signal Channels"
              description="Select from 8 AI-powered strategies based on your risk tolerance and trading goals. Combine multiple strategies for diversification."
            />
          </div>

        </div>
      </div>
    </section>
  );
}
