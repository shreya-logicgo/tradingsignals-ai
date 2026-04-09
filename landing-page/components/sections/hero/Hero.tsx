"use client";

import Image from "next/image";
import Container from "@/components/common/container/Container";
import HeroChart from "./HeroChart";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen pt-28 overflow-hidden">

      {/* Base */}
      <div className="absolute inset-0" style={{ background: "#010B1E" }} />

      {/* Top-center MAIN glow — big and bright */}
      <div
        className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,80,220,0.7) 0%, rgba(0,40,140,0.4) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Top-right accent */}
      <div
        className="absolute top-[-50px] right-[-50px] w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,60,200,0.5) 0%, transparent 65%)",
          filter: "blur(90px)",
        }}
      />

      {/* Left mid accent */}
      <div
        className="absolute top-[30%] left-[-200px] w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,50,180,0.4) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      {/* Bottom center glow */}
      <div
        className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,70,200,0.45) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <Container className="relative z-10 flex flex-col items-center text-center gap-6">

        {/* BADGE */}
        <div className="flex items-center gap-3 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
          <Image src="/avatars.png" alt="Users" width={120} height={32} className="h-7 w-auto" />
          <span className="text-[14px] text-gray-200 whitespace-nowrap">
            Used by over <span className="text-white font-medium">10,000+</span> traders
          </span>
        </div>

        {/* HEADING */}
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-white max-w-[800px]">
          Trade Smarter, Grow Faster <br />
          with Trading Signal Ai
        </h1>

        {/* SUBTEXT */}
        <p className="text-gray-400 text-base md:text-lg max-w-[620px]">
          Join Trading Signal Ai to get AI-powered signals for Forex, Crypto & the Indian Market—backed by real-time analysis and live results.
        </p>

        {/* CTA */}
        <div className="flex gap-4 mt-2">
          <button className="w-[199px] h-[52px] rounded-full border border-white bg-white text-black text-sm flex items-center justify-center hover:bg-white/10 transition">
            Start Trading Now
          </button>
          <button className="w-[199px] h-[52px] rounded-full bg-[#0012B8] text-white text-sm flex items-center justify-center shadow-lg hover:scale-105 transition">
            Check Our Channels
          </button>
        </div>

        {/* Chart */}
        <div className="w-full mt-8">
          <HeroChart />
        </div>

      </Container>
    </section>
  );
}