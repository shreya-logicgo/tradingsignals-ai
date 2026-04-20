"use client";


import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import NoiseOverlay from "@/components/NoiseOverlay";

// ── Types ──────────────────────────────────────────────────────────────────

interface StatConfig {
  prefix?: string;
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  delay: number;
}

interface OdometerDigitProps {
  digit: string;
  animating: boolean;
  duration: number;
  delay: number;
}

// ── Easing ─────────────────────────────────────────────────────────────────

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// ── OdometerDigit: single rolling column ───────────────────────────────────

function OdometerDigit({ digit, animating, duration, delay }: OdometerDigitProps) {
  const reelRef = useRef<HTMLSpanElement>(null);
  const colRef = useRef<HTMLSpanElement>(null);

  // 1. Create a "long" reel to simulate fast scrolling. 
  // We repeat 0-9 three times, then add the final digit at the very end.
  const baseDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const longReel = [...baseDigits, ...baseDigits, ...baseDigits, digit];
  const totalSteps = longReel.length - 1;

  useEffect(() => {
    if (!animating || !reelRef.current) return;

    const reel = reelRef.current;
    // Get the height of a single digit
    const itemH = colRef.current 
      ? colRef.current.getBoundingClientRect().height 
      : 0;

    // Use a timer to handle the stagger delay
    const timeout = setTimeout(() => {
      // 2. Apply a high-performance CSS transition for the "fast" look
      reel.style.transition = `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;
      reel.style.transform = `translateY(-${totalSteps * itemH}px)`;
    }, delay);

    return () => clearTimeout(timeout);
  }, [animating, delay, duration, totalSteps]);

  return (
    <span
      ref={colRef}
      style={{
        display: "inline-block",
        height: "1.08em", // Matches line-height exactly
        overflow: "hidden",
        verticalAlign: "bottom",
      }}
    >
      <span
        ref={reelRef}
        style={{
          display: "flex",
          flexDirection: "column",
          willChange: "transform",
          transform: "translateY(0)", // Start at first digit (0)
        }}
      >
        {longReel.map((d, i) => (
          <span
            key={i}
            style={{ 
              height: "1.08em", 
              lineHeight: "1.08em", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center" 
            }}
          >
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

// ── StatNumber: builds the full animated number ─────────────────────────────

interface StatNumberProps {
  prefix?: string;
  value: number;
  suffix?: string;
  decimals?: number;
  animating: boolean;
  staggerDelay: number;
  duration: number;
}

function StatNumber({
  prefix,
  value,
  suffix,
  decimals = 0,
  animating,
  staggerDelay,
  duration,
}: StatNumberProps) {
  const [bouncing, setBouncing] = useState(false);
  const [glowing, setGlowing] = useState(false);

  useEffect(() => {
    if (!animating) return;

    // Start glow
    const glowTimer = setTimeout(() => setGlowing(true), staggerDelay);

    // Bounce on finish
    const bounceTimer = setTimeout(() => {
      setGlowing(false);
      setBouncing(true);
      setTimeout(() => setBouncing(false), 500);
    }, staggerDelay + duration);

    return () => {
      clearTimeout(glowTimer);
      clearTimeout(bounceTimer);
    };
  }, [animating, staggerDelay, duration]);

  const formatted =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();

  const displayStr = (prefix ?? "") + formatted + (suffix ?? "");

  // Per-digit delay — later characters spin faster for a cascade feel
  let digitIndex = 0;

  return (
    <motion.div
      animate={
        bouncing
          ? { scale: [1, 1.1, 0.96, 1] }
          : { scale: 1 }
      }
      transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ display: "flex", alignItems: "baseline", position: "relative" }}
    >
      {/* Glow halo */}
      <motion.div
        animate={{ opacity: glowing ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          inset: -10,
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(99,102,241,0.4) 0%, transparent 70%)",
          borderRadius: 12,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Characters */}
      <span
        className="font-hoves"
        style={{
          fontSize: "clamp(36px, 6vw, 54px)",
          fontWeight: 300,
          color: "#ffffff",
          letterSpacing: "-1.5px",
          lineHeight: 1.05,
          display: "flex",
          alignItems: "baseline",
          position: "relative",
          zIndex: 1,
          
        }}
      >
        {displayStr.split("").map((ch, i) => {
          if (/\d/.test(ch)) {
            const currentDigitIndex = digitIndex++;
            const digitDelay = staggerDelay + currentDigitIndex * 20;
            return (
              <OdometerDigit
                key={i}
                digit={ch}
                animating={animating}
                duration={duration}
                delay={digitDelay}
              />
            );
          }
          return (
            <span
              key={i}
              style={{ opacity: ch === "$" || ch === "+" ? 0.75 : 1 }}
            >
              {ch}
            </span>
          );
        })}
      </span>
    </motion.div>
  );
}

// ── Main Stats Section ──────────────────────────────────────────────────────

const ANIMATION_DURATION = 1700; // ms

export default function Stats() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Intersection Observer — trigger once on scroll into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── Scroll-based parallax ────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const mouseTranslateY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const relativeY = e.clientY / window.innerHeight - 0.5;
      mouseTranslateY.set(relativeY * 300);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseTranslateY]);

  const scrollTranslateY = useTransform(scrollYProgress, [0, 1], [-400, 400]);
  const combinedY = useTransform(
    [scrollTranslateY, mouseTranslateY],
    ([scroll, mouse]) => (scroll as number) + (mouse as number)
  );
  const smoothY = useSpring(combinedY, { stiffness: 80, damping: 30, mass: 0.4 });

  // ── Stat definitions ─────────────────────────────────────────────────────
  const stats: StatConfig[] = [
    {
      value: 1250,
      suffix: "+",
      label: t("stats.registeredUsers"),
      delay: 0,
    },
    {
      prefix: "$",
      value: 4.5,
      suffix: "M",
      decimals: 1,
      label: t("stats.aum"),
      delay: ANIMATION_DURATION * 0.1,
    },
    {
      prefix: "$",
      value: 12,
      suffix: "M",
      label: t("stats.totalPnl"),
      delay: ANIMATION_DURATION * 0.2,
    },
  ];

  return (
    <section
      className="relative h-auto overflow-visible pt-6 pb-6 bg-transparent"
      ref={sectionRef}
    >
      <NoiseOverlay />

      {/* GlowBar parallax image */}
      {/* <motion.div
        className="absolute md:-top-[25rem] -top-[20rem] mx-auto inset-0 pointer-events-none lg:h-[150vh] lg:max-w-300 h-[120vh] max-w-200"
        style={{ zIndex: 5, y: smoothY }}
      >
        <Image
          src={glowBar}
          alt=""
          fill
          sizes="100vw"
          style={{ mixBlendMode: "screen" }}
          priority
        />
      </motion.div> */}

      {/* Stats Content */}
      <div
        className="flex flex-col md:flex-row items-center justify-center pt-20"
        style={{ zIndex: 2, position: "relative" }}
      >
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex flex-col md:flex-row items-center">
            {/* Divider */}
            {i > 0 && (
              <div className="w-16 h-[1px] md:w-[1px]  my-6 md:my-0 md:mx-[60px] shrink-0" />
            )}

            {/* Stat block */}
            <div className="flex flex-col items-center text-center">
              <StatNumber
                prefix={stat.prefix}
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
                animating={hasAnimated}
                staggerDelay={stat.delay}
                duration={ANIMATION_DURATION}
              />

              <span className="text-xs md:text-[14px] text-white/55 mt-2 md:mt-[10px] whitespace-nowrap font-hoves">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}