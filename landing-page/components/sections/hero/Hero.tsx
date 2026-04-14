"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Container from "@/components/common/container/Container";
import HeroChart from "./HeroChart";

import gradient1 from "@/assets/images/gradient_1_.png";
import gradient2 from "@/assets/images/gradient_2_.png";
import userslabel from "@/assets/images/avatars.png";
import ShineText from "@/components/common/ShineText";
import ShineButton from "@/components/common/ShineButton";

// ... particulates data ...
const PARTICLES = Array.from({ length: 90 }).map((_, i) => ({
  id: i,
  side: i % 2 === 0 ? "left" : "right",
  // Left starts near 0%, Right starts at 80px from the right edge
  left: i % 2 === 0 ? -10+ Math.random() * 20 : undefined,
  right: i % 2 !== 0 ? 400 + Math.random() * 150 : undefined,
  y: -15 + Math.random() * 1, // Constrained to the top of the section
  s: 1.5 + Math.random() * 3,
  o: 0.3 + Math.random() * 0.4,
  dur: 9 + Math.random() * 50,
  del: -(Math.random() * 8), // Widened negative delay for continuous flow
}));

export default function Hero() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full min-h-screen pt-30 md:pt-42  pb-16 overflow-hidden bg-[#010B24]">


      {/* ── Background Gradients ── */}
      <div className="absolute top-[-150px] right-[-5%] md:right-[-10px] w-full max-w-[1200px] pointer-events-none z-0 opacity-80">
        <Image src={gradient2} alt="" aria-hidden="true" className="w-full h-auto object-contain" priority />
      </div>

      <div className="absolute top-0 left-0 w-full md:w-[70%] lg:w-[55%] pointer-events-none z-0 opacity-70">
        <Image src={gradient1} alt="" aria-hidden="true" className="w-full h-auto object-contain" priority />
      </div>

      {/* ── Particles Layer ── */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {mounted && PARTICLES.map((p) => {
          const animName = p.side === "left" ? "particle-fall-left" : "particle-fall-right";
          return (
            <div
              key={p.id}
              aria-hidden="true"
              className="absolute rounded-full opacity-0"
              style={{
                left: p.left !== undefined ? `${p.left}%` : undefined,
                right: p.right !== undefined ? `${p.right}px` : undefined,
                top: `${p.y}%`,
                width: `${p.s}px`,
                height: `${p.s}px`,
                backgroundColor: `rgba(255,255,255,${p.o})`,
                animationName: animName,
                animationDuration: `${p.dur}s`,
                animationTimingFunction: "linear",
                animationDelay: `${p.del}s`,
                animationIterationCount: "infinite",
                willChange: "transform, opacity",
              }}
            />
          );
        })}
      </div>

      {/* ── Main content area ── */}
      <Container className="relative z-20 flex flex-col items-center text-center gap-6 md:gap-8">

        {/* Social Proof Badge — Localized */}
        <div className="flex items-center gap-2 md:gap-2.5 px-3 py-1.5 md:px-5 md:py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl mb-2 sm:mb-4 max-w-[90vw] sm:max-w-none">
          <Image
            src={userslabel}
            alt="TSAI Traders"
            width={100}
            height={28}
            className="h-4 md:h-6 w-auto shrink-0"
          />
          <span className="text-[10px] md:text-sm text-gray-300 leading-tight" style={{ fontFamily: "var(--font-hoves)" }}>
            {t("hero.users")}
          </span>
        </div>

        {/* HERO TITLE */}
        {/* <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-[50px]  leading-[1.2] md:leading-[1.1] text-white tracking-tight max-w-[650px]" style={{ fontFamily: "var(--font-hoves)" }}> */}

        <ShineText
          className="text-2xl sm:text-3xl md:text-5xl lg:text-[70px]"
          style={{ fontFamily: "var(--font-hoves)" }}
        >
          {t("hero.title")}
        </ShineText>
        {/* </h1> */}

        {/* SUPPORTING TEXT */}
        <p className="text-white sm:text-sm text-xs md:text-lg leading-relaxed max-w-[640px] px-2 md:px-0" style={{ fontFamily: "var(--font-hoves)" }}>
          {t("hero.description")}
        </p>

        {/* PRIMARY CTA — Localized */}
        {/* <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto px-10 sm:px-0">
          <button className="relative w-full sm:w-[180px] h-10 md:h-[48px] p-[2px] rounded-full overflow-hidden group transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,240,255,0.2)] cursor-pointer">
            <div className="absolute inset-[-1000%] animate-[rotate_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00F0FF_0%,#0012B8_50%,#00F0FF_100%)]" />
            <span
              className="relative flex items-center justify-center w-full h-full bg-[#010B24] rounded-full text-white text-sm md:text-[15px] font-medium transition-all duration-300 group-hover:bg-transparent group-hover:text-white backdrop-blur-3xl"
              style={{ fontFamily: "var(--font-hoves)" }}
            >
              {t("hero.cta")}
            </span>
          </button>
        </div> */}
        <ShineButton onClick={() => {}}>
          {t("starttoday.cta")}
        </ShineButton>



        {/* Product Visual (Chart/Dashboard) */}
        <div className="w-full mt-10 md:mt-16">
          <HeroChart />
        </div>

      </Container>
    </section>
  );
}

