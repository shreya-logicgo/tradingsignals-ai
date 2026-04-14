"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import Container from "@/components/common/container/Container";
import HeroChart from "./HeroChart";

import gradient1 from "@/assets/images/gradient_1_.png";
import gradient2 from "@/assets/images/gradient_2_.png";
import userslabel from "@/assets/images/avatars.png";
import ShineText from "@/components/common/ShineText";
import ShineButton from "@/components/common/ShineButton";

const PARTICLES = [
  { id: 1, x: 83.7, y: 3.4, s: 1.4, o: 0.32, dur: 5.9, del: 3.4 },
  { id: 2, x: 92.3, y: 6.9, s: 1.6, o: 0.26, dur: 3.9, del: 2.5 },
  { id: 3, x: 62.9, y: 13.1, s: 2.0, o: 0.41, dur: 3.9, del: 2.9 },
  { id: 4, x: 89.5, y: 2.4, s: 2.2, o: 0.46, dur: 4.4, del: 0.8 },
  { id: 5, x: 94.5, y: 20.8, s: 1.1, o: 0.28, dur: 6.4, del: 3.0 },
  { id: 6, x: 89.4, y: 42.9, s: 1.8, o: 0.54, dur: 4.5, del: 2.8 },
  { id: 7, x: 90.2, y: 36.6, s: 2.3, o: 0.42, dur: 5.8, del: 0.2 },
  { id: 8, x: 69.7, y: 18.2, s: 1.1, o: 0.32, dur: 3.4, del: 1.4 },
  { id: 9, x: 83.6, y: 22.4, s: 1.6, o: 0.31, dur: 4.1, del: 4.7 },
  { id: 10, x: 84.0, y: 36.1, s: 1.3, o: 0.47, dur: 3.7, del: 1.9 },
  { id: 11, x: 95.6, y: 37.8, s: 1.8, o: 0.46, dur: 6.4, del: 3.9 },
  { id: 12, x: 69.8, y: 3.8, s: 1.5, o: 0.33, dur: 3.8, del: 4.7 },
  { id: 13, x: 91.8, y: 19.6, s: 2.0, o: 0.37, dur: 6.7, del: 2.3 },
  { id: 14, x: 71.0, y: 15.8, s: 1.8, o: 0.33, dur: 5.3, del: 4.5 },
  { id: 15, x: 75.6, y: 14.3, s: 2.5, o: 0.40, dur: 3.4, del: 0.2 },
  { id: 16, x: 65.7, y: 37.1, s: 2.2, o: 0.38, dur: 3.3, del: 1.9 },
  { id: 17, x: 95.9, y: 31.6, s: 2.5, o: 0.51, dur: 3.0, del: 3.6 },
  { id: 18, x: 85.2, y: 32.1, s: 1.4, o: 0.44, dur: 3.4, del: 2.2 },
  { id: 19, x: 77.4, y: 55.4, s: 2.3, o: 0.33, dur: 5.0, del: 0.9 },
  { id: 20, x: 93.0, y: 50.7, s: 1.4, o: 0.44, dur: 5.4, del: 0.8 },
  { id: 21, x: 87.9, y: 32.2, s: 2.2, o: 0.41, dur: 3.0, del: 1.6 },
  { id: 22, x: 62.7, y: 54.0, s: 2.3, o: 0.50, dur: 4.2, del: 0.3 },
  { id: 23, x: 91.9, y: 55.0, s: 1.1, o: 0.40, dur: 3.3, del: 3.8 },
  { id: 24, x: 88.0, y: 9.2, s: 1.7, o: 0.41, dur: 4.1, del: 4.4 },
  { id: 25, x: 76.4, y: 13.9, s: 1.8, o: 0.47, dur: 3.8, del: 1.6 },
  { id: 26, x: 95.8, y: 38.4, s: 1.7, o: 0.41, dur: 3.5, del: 1.1 },
  { id: 27, x: 73.5, y: 34.9, s: 1.3, o: 0.32, dur: 3.3, del: 3.2 },
  { id: 28, x: 69.8, y: 52.7, s: 2.3, o: 0.27, dur: 4.0, del: 3.3 },
  { id: 29, x: 69.3, y: 9.4, s: 2.4, o: 0.42, dur: 4.9, del: 3.9 },
  { id: 30, x: 89.5, y: 12.7, s: 1.1, o: 0.38, dur: 4.7, del: 2.3 },
  { id: 31, x: 28.2, y: 35.7, s: 2.5, o: 0.28, dur: 4.6, del: 1.7 },
  { id: 32, x: 33.0, y: 14.4, s: 1.3, o: 0.38, dur: 4.7, del: 1.4 },
  { id: 33, x: 11.0, y: 48.2, s: 1.7, o: 0.51, dur: 5.2, del: 0.3 },
  { id: 34, x: 38.0, y: 43.8, s: 2.5, o: 0.53, dur: 6.4, del: 0.8 },
  { id: 35, x: 19.5, y: 12.7, s: 1.6, o: 0.27, dur: 4.5, del: 4.9 },
  { id: 36, x: 11.5, y: 41.2, s: 1.7, o: 0.38, dur: 6.8, del: 5.0 },
  { id: 37, x: 22.0, y: 37.9, s: 1.2, o: 0.34, dur: 6.9, del: 2.9 },
  { id: 38, x: 21.5, y: 39.4, s: 1.1, o: 0.43, dur: 5.0, del: 4.3 },
  { id: 39, x: 7.7, y: 50.0, s: 1.1, o: 0.31, dur: 5.4, del: 3.4 },
  { id: 40, x: 10.5, y: 8.0, s: 2.3, o: 0.32, dur: 5.4, del: 3.1 },
  { id: 41, x: 17.1, y: 31.2, s: 1.8, o: 0.53, dur: 3.8, del: 3.6 },
  { id: 42, x: 10.6, y: 21.8, s: 2.0, o: 0.34, dur: 4.3, del: 3.8 },
  { id: 43, x: 4.6, y: 24.9, s: 2.5, o: 0.55, dur: 3.3, del: 1.1 },
  { id: 44, x: 11.5, y: 48.7, s: 2.3, o: 0.51, dur: 4.5, del: 0.8 },
  { id: 45, x: 32.0, y: 37.2, s: 1.9, o: 0.55, dur: 5.6, del: 0.0 },
  { id: 46, x: 31.4, y: 17.0, s: 2.0, o: 0.53, dur: 3.5, del: 0.6 },
  { id: 47, x: 5.9, y: 29.7, s: 1.4, o: 0.43, dur: 5.9, del: 1.0 },
  { id: 48, x: 24.8, y: 15.2, s: 1.7, o: 0.52, dur: 6.4, del: 0.5 },
  { id: 49, x: 17.2, y: 15.8, s: 1.0, o: 0.48, dur: 5.5, del: 1.3 },
  { id: 50, x: 28.7, y: 29.6, s: 1.6, o: 0.25, dur: 3.3, del: 4.4 },
] as const;

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full min-h-screen pt-30 md:pt-42 pb-16 overflow-hidden bg-[#010B24]">
      <style>{`
        @keyframes float-a { 0% { transform: translate(0,0); opacity: 0; } 12% { opacity: 1; } 100% { transform: translate(-3px, -26px); opacity: 0; } }
        @keyframes float-b { 0% { transform: translate(0,0); opacity: 0; } 12% { opacity: 1; } 100% { transform: translate(4px, -24px); opacity: 0; } }
        @keyframes float-c { 0% { transform: translate(0,0); opacity: 0; } 12% { opacity: 1; } 100% { transform: translate(3px, -28px); opacity: 0; } }

        /* ULTRA-SMOOTH LIQUID FLOW */
        @keyframes liquid-glide {
          0% { transform: translate(-15%, -15%) rotate(0deg); }
          33% { transform: translate(10%, -10%) rotate(5deg); }
          66% { transform: translate(-5%, 15%) rotate(-5deg); }
          100% { transform: translate(-15%, -15%) rotate(0deg); }
        }

        @keyframes liquid-glide-reverse {
          0% { transform: translate(10%, 10%) rotate(0deg); }
          50% { transform: translate(-15%, -5%) rotate(-8deg); }
          100% { transform: translate(10%, 10%) rotate(0deg); }
        }
      `}</style>

      {/* ── Top-Right Gradient Layer (Vivid Blue/Cyan Flow) ── */}
      <div className="absolute top-[-150px] right-[-5%] md:right-[-10px] w-full max-w-[1200px] pointer-events-none z-0 opacity-100 overflow-hidden">
        <Image src={gradient2} alt="" aria-hidden="true" className="w-full h-auto object-contain relative z-10" priority />
        
        <div 
          className="absolute inset-0 z-20"
          style={{
            WebkitMaskImage: `url(${gradient2.src})`,
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskImage: `url(${gradient2.src})`,
            maskSize: "contain",
          }}
        >
          {/* Base High-Intensity Cyan */}
          <div 
            className="absolute inset-[-60%] blur-[80px]"
            style={{
              background: "radial-gradient(circle at center, #00F0FF 0%, transparent 60%)",
              animation: "liquid-glide 6s ease-in-out infinite",
              mixBlendMode: "screen",
              opacity: 0.9
            }}
          />
          {/* High-Intensity Blue Drifting Over */}
          <div 
            className="absolute inset-[-60%] blur-[90px]"
            style={{
              background: "radial-gradient(circle at center, #0012B8 0%, transparent 60%)",
              animation: "liquid-glide-reverse 4s ease-in-out infinite",
              mixBlendMode: "screen",
              opacity: 0.85
            }}
          />
          {/* Vibrant Core Glow */}
          <div 
            className="absolute inset-[-20%] blur-[50px]"
            style={{
              background: "radial-gradient(circle at center, rgba(0, 18, 184, 0.4) 0%, transparent 70%)",
              mixBlendMode: "plus-lighter"
            }}
          />
        </div>
      </div>

      {/* ── Left Gradient Layer (Smooth Flow) ── */}
      <div className="absolute top-0 left-0 w-full md:w-[70%] lg:w-[55%] pointer-events-none z-0 opacity-90 overflow-hidden">
        <Image src={gradient1} alt="" aria-hidden="true" className="w-full h-auto object-contain relative z-10" priority />
        
        <div 
          className="absolute inset-0 z-20"
          style={{
            WebkitMaskImage: `url(${gradient1.src})`,
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskImage: `url(${gradient1.src})`,
            maskSize: "contain",
          }}
        >
          <div 
            className="absolute inset-[-60%] blur-[80px]"
            style={{
              background: "radial-gradient(circle at center, #0012B8 0%, #00F0FF 50%, transparent 80%)",
              animation: "liquid-glide 8s ease-in-out infinite",
              mixBlendMode: "screen",
              opacity: 0.8
            }}
          />
        </div>
      </div>

      {/* ── Particles Layer ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {PARTICLES.map((p, i) => {
          const anim = i % 3 === 0 ? "float-a" : i % 3 === 1 ? "float-b" : "float-c";
          return (
            <div
              key={p.id}
              aria-hidden="true"
              className="absolute rounded-full will-change-transform"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.s}px`,
                height: `${p.s}px`,
                backgroundColor: `rgba(255,255,255,${p.o})`,
                animation: `${anim} ${p.dur}s ease-in-out ${p.del}s infinite`,
              }}
            />
          );
        })}
      </div>

      <Container className="relative z-20 flex flex-col items-center text-center gap-6 md:gap-8">
        <div className="flex items-center gap-2.5 px-4 py-1.5 md:px-5 md:py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl mb-2 sm:mb-4">
          <Image src={userslabel} alt="TSAI Traders" width={100} height={28} className="h-5 md:h-6 w-auto" />
          <span className="text-[11px] md:text-sm text-gray-300 whitespace-nowrap" style={{ fontFamily: "var(--font-hoves)" }}>
            {t("hero.users")}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-[50px] leading-[1.2] md:leading-[1.1] text-white tracking-tight max-w-[650px]" style={{ fontFamily: "var(--font-hoves)" }}>
          {t("hero.title")}
        </ShineText>
        {/* </h1> */}

        <p className="text-white/80 text-sm md:text-lg leading-relaxed max-w-[640px] px-2 md:px-0" style={{ fontFamily: "var(--font-hoves)" }}>
          {t("hero.description")}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto px-10 sm:px-0">
          <button
            className="w-full sm:w-[160px] h-7 md:h-11 cursor-pointer rounded-full border border-white font-mono bg-transparent text-white text-sm md:text-[13px] flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-black"
            style={{ fontFamily: "var(--font-hoves)" }}
          >
            {t("hero.cta")}
          </button>
        </div> */}
        <ShineButton onClick={() => {}}>
          {t("starttoday.cta")}
        </ShineButton>


        <div className="w-full mt-10 md:mt-16">
          <HeroChart />
        </div>
      </Container>
    </section>
  );
}