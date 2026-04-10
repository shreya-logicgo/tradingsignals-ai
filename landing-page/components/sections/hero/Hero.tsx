"use client";

import Image from "next/image";
import Container from "@/components/common/container/Container";
import HeroChart from "./HeroChart";

import gradient1 from "@/assets/images/gradient_1_.png";
import gradient2 from "@/assets/images/gradient_2_.png";

export default function Hero() {
  return (
    <section
      className="relative w-full min-h-screen pt-28 overflow-hidden"
      style={{ backgroundColor: "#010B24" }}
    >

      {/* ── Gradient Layer 1: Wide teal sweep — top-right ── */}
      <Image
        src={gradient2}
        alt=""
        aria-hidden="true"
        className="
            absolute 
            top-[-120px] 
            right-[-10px] 
            w-[900px] 
            lg:w-[1200px]
            max-w-none 
            opacity-90 
            pointer-events-none 
            z-0 
            object-contain
          "
        priority
        quality={90}
      />

      {/* ── Gradient Layer 2: Blue/white beam — top-left ── */}
      <Image
        src={gradient1}
        alt=""
        aria-hidden="true"
        className="absolute top-0 left-0 w-[55%] h-auto opacity-75 pointer-events-none z-0 object-contain"
        priority
        quality={90}
      />

      {/* ── All content ── */}
      <Container className="relative z-10 flex flex-col items-center text-center gap-6">

        {/* BADGE */}
        <div className="flex items-center gap-3 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <Image
            src="/avatars.png"
            alt="Users"
            width={120}
            height={32}
            className="h-7 w-auto"
          />
          <span className="text-[14px] text-gray-200 whitespace-nowrap">
            Used by over{" "}
            <span className="text-white font-medium">10,000+</span> traders
          </span>
        </div>

        {/* HEADING */}
        <h1 className="text-[48px] md:text-[48px] lg:text-[48px] font-semibold leading-tight text-white max-w-[1200px]">
          Trade Smarter, Grow Faster <br />
          with Trading Signal Ai
        </h1>

        

        {/* SUBTEXT */}
        <p className="text-gray-400 text-base md:text-lg max-w-[620px]">
          Join Trading Signal Ai to get AI-powered signals for Forex, Crypto &
          the Indian Market—backed by real-time analysis and live results.
        </p>

        {/* CTA BUTTONS */}
        <div className="flex gap-4 mt-2">
          <button className="w-[199px] h-[52px] rounded-full border border-white/30 bg-transparent text-white text-sm flex items-center justify-center hover:bg-white/10 transition">
            Start Trading Now
          </button>
          <button className="w-[199px] h-[52px] rounded-full bg-[#0012B8] text-white text-sm flex items-center justify-center shadow-lg hover:scale-105 transition">
            Check Our Channels
          </button>
        </div>

        {/* CHART */}
        <div className="w-full mt-8">
          <HeroChart />
        </div>

      </Container>
    </section>
  );
}