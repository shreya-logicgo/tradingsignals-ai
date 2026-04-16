"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Container from "@/components/common/container/Container";
import HeroChart from "./HeroChart";
import { motion } from "framer-motion";
import { staggerContainer, fadeUpVariant } from "@/utils/animations";

import gradient1 from "@/assets/images/gradient_1_.png";
import gradient2 from "@/assets/images/gradient_2_.png";
import userslabel from "@/assets/images/avatars.png";
import ShineText from "@/components/common/ShineText";
import ShineButton from "@/components/common/ShineButton";
import GetAccessButton from "@/components/common/GetAccessButton";


// ... particulates data ...
const PARTICLES = Array.from({ length: 111 }).map((_, i) => ({
  id: i,
  side: i % 2 === 0 ? "left" : "right",
  // Left starts near 0%, Right starts at 80px from the right edge
  left: i % 2 === 0 ? -10 + Math.random() * 20 : undefined,
  right: i % 2 !== 0 ? 400 + Math.random() * 150 : undefined,
  y: -15 + Math.random() * 1, // Constrained to the top of the section
  s: 1.5 + Math.random() * 3,
  o: 0.3 + Math.random() * 0.4,
  dur: 7 + Math.random() * 50,
  del: -(Math.random() * 8), // Widened negative delay for continuous flow
}));

export default function Hero() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
              background: "radial-gradient(circle at center, var(--color-vivid-cyan) 0%, transparent 60%)",
              animation: "liquid-glide 6s ease-in-out infinite",
              mixBlendMode: "screen",
              opacity: 0.9
            }}
          />
          {/* High-Intensity Blue Drifting Over */}
          <div
            className="absolute inset-[-60%] blur-[90px]"
            style={{
              background: "radial-gradient(circle at center, var(--color-dark-blue) 0%, transparent 60%)",
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
              background: "radial-gradient(circle at center, var(--color-dark-blue) 0%, var(--color-vivid-cyan) 50%, transparent 80%)",
              animation: "liquid-glide 8s ease-in-out infinite",
              mixBlendMode: "screen",
              opacity: 0.8
            }}
          />
        </div>
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

      <Container className="relative z-20 flex flex-col items-center text-center px-0">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col items-center gap-6 md:gap-8 w-full"
        >
          {/* Social Proof Badge — Localized */}
          <motion.div variants={fadeUpVariant} className="flex items-center gap-2 md:gap-2.5 px-3 py-1.5 md:px-5 md:py-2.5  uppercase mb-2 sm:mb-4 max-w-[90vw] sm:max-w-none">
            <Image
              src={userslabel}
              alt="TSAI Traders"
              width={100}
              height={28}
              className="h-4 md:h-6 w-auto shrink-0"
            />
            <span className="text-[10px] md:text-sm text-white leading-tight font-hoves">
              {t("hero.users")}
            </span>
          </motion.div>

          {/* HERO TITLE */}
          <motion.div variants={fadeUpVariant} className="w-full flex justify-center">
            <ShineText
              className="text-2xl sm:text-3xl md:text-5xl lg:text-[70px] max-w-[1200px] font-hoves"
            >
              {t("hero.title")}
            </ShineText>
          </motion.div>

          {/* SUPPORTING TEXT */}
          <motion.p variants={fadeUpVariant} className="text-white sm:text-sm text-xs md:text-lg leading-relaxed max-w-[640px] px-2 md:px-0 font-hoves" >
            {t("hero.description")}
          </motion.p>

          <motion.div variants={fadeUpVariant}>
            <GetAccessButton onClick={() => {}}>
              {t("hero.cta")}
            </GetAccessButton>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="w-full mt-10 md:mt-16">
            <HeroChart />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}