"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import glowBar from "@/assets/images/glowBars.png";

export default function Stats() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  // 1. Scroll-based parallax calculation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // 2. Mouse-based vertical influence
  const mouseTranslateY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position (-0.5 to 0.5)
      const relativeY = (e.clientY / window.innerHeight) - 0.5;
      // Map to a ±60px range of vertical influence
      mouseTranslateY.set(relativeY * 120);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseTranslateY]);

  // Transform scroll progress to vertical offset (-120px to 120px)
  const scrollTranslateY = useTransform(scrollYProgress, [0, 1], [-120, 120]);

  // Combine scroll and mouse movement into one value
  const combinedY = useTransform(
    [scrollTranslateY, mouseTranslateY],
    ([scroll, mouse]) => (scroll as number) + (mouse as number)
  );

  // Apply spring smoothing for a premium feel
  const smoothY = useSpring(combinedY, {
    stiffness: 40,
    damping: 25,
    mass: 0.5,
  });

  const stats = [
    { number: "1,250+", label: t("stats.registeredUsers") },
    { number: "$4.5M", label: t("stats.aum") },
    { number: "$12M", label: t("stats.totalPnl") },
  ];

  return (
    <section
      className="w-full relative lg:py-30 bg-transparent"
      ref={sectionRef}
    >
      {/* ── GlowBar Image with Interactive Motion ── */}
      <motion.div
        className="absolute md:-top-90 -top-25 mx-auto inset-0 pointer-events-none lg:h-250 lg:max-w-300 h-150 max-w-200"
        style={{ 
          zIndex: 1,
          y: smoothY,
        }}
      >
        <Image
          src={glowBar}
          alt=""
          fill
          sizes="100vw"
          className=""
          style={{ mixBlendMode: "screen" }}
          priority
        />
      </motion.div>

      {/* ── Stats Content ── */}
      <div className="flex flex-col md:flex-row items-center justify-center pt-20" style={{ zIndex: 2, position: "relative" }}>
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex flex-col md:flex-row items-center">

            {/* Divider */}
            {i > 0 && (
              <div
                className="w-16 h-[1px] md:w-[1px] md:h-[44px] my-6 md:my-0 md:mx-[60px] shrink-0"
              />
            )}

            {/* Stat Block — Localized */}
            <div className="flex flex-col items-center text-center">
              <span
                className="text-4xl md:text-[50px] text-white tracking-[-0.5px] leading-[1.1] font-hoves"
              >
                {stat.number}
              </span>

              <span
                className="text-xs md:text-[14px] text-white/70 mt-2 md:mt-[10px] whitespace-nowrap font-hoves"
              >
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
