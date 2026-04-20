"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
  AnimatePresence,
} from "framer-motion";

import glowBar1 from "@/assets/images/glowBar1.png";
import glowBar2 from "@/assets/images/glowBar2.png";

import NoiseOverlay from "@/components/NoiseOverlay";
import Steps from "../steps/Steps";
import RocketParticles from "./RocketParticles";

export default function Stats() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const leftRocketEmitterOneRef = useRef<HTMLDivElement>(null);
  const leftRocketEmitterTwoRef = useRef<HTMLDivElement>(null);
  const rightRocketEmitterOneRef = useRef<HTMLDivElement>(null);
  const rightRocketEmitterTwoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsRef, { once: true, amount: 0.5 });

  const [leftRocketPhase, setLeftRocketPhase] = useState<
    "launch" | "return" | "idle"
  >("launch");
  const [rightRocketPhase, setRightRocketPhase] = useState<
    "launch" | "return" | "idle"
  >("launch");
  const [showParticles, setShowParticles] = useState(true);
  const [isFadingParticles, setIsFadingParticles] = useState(false);

  // Scroll animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const mouseTranslateY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const relativeY = e.clientY / window.innerHeight - 0.5;
      mouseTranslateY.set(relativeY * 120);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseTranslateY]);

  const scrollTranslateY = useTransform(scrollYProgress, [0, 1], [-120, 120]);

  const combinedY = useTransform(
    [scrollTranslateY, mouseTranslateY],
    ([scroll, mouse]) => (scroll as number) + (mouse as number)
  );

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
      ref={sectionRef}
      className="w-full relative pb-16 lg:pb-30 lg:pt-30 overflow-hidden"
    >
      <Steps />
      <NoiseOverlay />

      {/* ───────── Rockets + Particles ───────── */}
      <motion.div
        className="absolute top-0 inset-0 mx-auto pointer-events-none lg:max-w-300 max-w-200"
        style={{ y: smoothY }}
      >
        <div className="relative h-full">
          {/* LEFT ROCKET */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-full max-w-24 sm:max-w-35 lg:max-w-40 xl:max-w-50 z-10 flex items-end"
            animate={
              isInView && leftRocketPhase === "launch"
                ? {
                    x: [0, -1, 1, -1, 1, 0],
                    y: ["0%", "-150%"],
                  }
                : leftRocketPhase === "return"
                ? {
                    x: [0, -0.5, 0.5, -0.5, 0.5, 0],
                    y: ["150%", "0%"],
                    filter: ["blur(8px)", "blur(0px)"],
                  }
                : {}
            }
            transition={
              leftRocketPhase === "launch"
                ? {
                    x: {
                      duration: 0.4,
                      ease: "easeInOut",
                      repeat: 3,
                      repeatType: "reverse",
                    },
                    y: {
                      duration: 5,
                      ease: [0.25, 0.1, 0.25, 1],
                      delay: 1.2,
                    },
                  }
                : leftRocketPhase === "return"
                ? {
                    x: {
                      duration: 0.4,
                      ease: "easeInOut",
                      repeat: 3,
                      repeatType: "reverse",
                    },
                    y: {
                      duration: 4,
                      ease: [0.25, 0.1, 0.25, 1],
                    },
                    filter: {
                      duration: 4,
                      ease: "easeOut",
                    },
                  }
                : {}
            }
            onAnimationComplete={() => {
              if (leftRocketPhase === "launch") {
                setLeftRocketPhase("return");
              } else if (leftRocketPhase === "return") {
                setLeftRocketPhase("idle");
                // Start fading particles when both rockets are idle
                if (rightRocketPhase === "idle") {
                  setIsFadingParticles(true);
                  // Actually remove particles after fade animation completes
                  setTimeout(() => {
                    setShowParticles(false);
                  }, 2000); // Match this with the fade duration
                }
              }
            }}
          >
            <div className="max-h-65 sm:max-h-75 lg:max-h-120 xl:max-h-150 mb-28 md:mb-60 lg:mb-50 relative w-full h-full">
              <div
                ref={leftRocketEmitterOneRef}
                className="absolute top-80 w-2 h-2 left-16"
              />
              <div
                ref={leftRocketEmitterTwoRef}
                className="absolute top-90 w-2 h-2 right-15"
              />
              <Image
                src={glowBar1}
                alt=""
                fill
                sizes="100vw"
                className="max-h-150"
                style={{ mixBlendMode: "screen" }}
                priority
              />
            </div>
            
          </motion.div>

          {/* RIGHT ROCKET */}
          <motion.div
            className="absolute right-0 w-full h-full max-w-24 sm:max-w-35 lg:max-w-40 xl:max-w-50 z-10 flex items-end"
            animate={
              isInView && rightRocketPhase === "launch"
                ? {
                    x: [0, 1, -1, 1, -1, 0],
                    y: ["0%", "-140%"],
                  }
                : rightRocketPhase === "return"
                ? {
                    x: [0, 0.5, -0.5, 0.5, -0.5, 0],
                    y: ["140%", "0%"],
                    filter: ["blur(8px)", "blur(0px)"],
                  }
                : {}
            }
            transition={
              rightRocketPhase === "launch"
                ? {
                    x: {
                      duration: 0.4,
                      ease: "easeInOut",
                      repeat: 3,
                      repeatType: "reverse",
                      delay: 0.1,
                    },
                    y: {
                      duration: 5,
                      ease: [0.25, 0.1, 0.25, 1],
                      delay: 1.3,
                    },
                  }
                : rightRocketPhase === "return"
                ? {
                    x: {
                      duration: 0.4,
                      ease: "easeInOut",
                      repeat: 3,
                      repeatType: "reverse",
                      delay: 0.1,
                    },
                    y: {
                      duration: 4,
                      ease: [0.25, 0.1, 0.25, 1],
                    },
                    filter: {
                      duration: 4,
                      ease: "easeOut",
                    },
                  }
                : {}
            }
            onAnimationComplete={() => {
              if (rightRocketPhase === "launch") {
                setRightRocketPhase("return");
              } else if (rightRocketPhase === "return") {
                setRightRocketPhase("idle");
                // Start fading particles when both rockets are idle
                if (leftRocketPhase === "idle") {
                  setIsFadingParticles(true);
                  // Actually remove particles after fade animation completes
                  setTimeout(() => {
                    setShowParticles(false);
                  }, 2000); // Match this with the fade duration
                }
              }
            }}
          >
            <div className="max-h-65 sm:max-h-75 lg:max-h-120 xl:max-h-150 mb-18 md:mb-45 lg:mb-18 relative w-full h-full">
              <div
                ref={rightRocketEmitterOneRef}
                className="absolute top-80 w-2 h-2 right-25"
              />
              <div
                ref={rightRocketEmitterTwoRef}
                className="absolute top-90 w-2 h-2 left-16"
              />
              <Image
                src={glowBar2}
                alt=""
                fill
                sizes="100vw"
                className="max-h-150"
                style={{ mixBlendMode: "screen" }}
                priority
              />
            </div>
          </motion.div>

          <AnimatePresence>
            {showParticles && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: isFadingParticles ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
              >
                <RocketParticles anchorRef={leftRocketEmitterOneRef} />
                <RocketParticles anchorRef={leftRocketEmitterTwoRef} />
                <RocketParticles anchorRef={rightRocketEmitterOneRef} />
                <RocketParticles anchorRef={rightRocketEmitterTwoRef} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ───────── Stats Content ───────── */}
      <div
        ref={statsRef}
        className="flex flex-col md:flex-row items-center justify-center pt-20 relative z-20"
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="flex flex-col md:flex-row items-center"
          >
            {i > 0 && (
              <div className="w-16 h-[1px] md:w-[1px] md:h-[44px] my-6 md:my-0 md:mx-[60px] shrink-0 bg-white/20" />
            )}

            <div className="flex flex-col items-center text-center">
              <span
                className="text-4xl md:text-[50px] text-white tracking-[-0.5px] leading-[1.1]"
                style={{ fontFamily: "var(--font-hoves)" }}
              >
                {stat.number}
              </span>

              <span
                className="text-xs md:text-[14px] text-white/70 mt-2 md:mt-[10px] whitespace-nowrap"
                style={{ fontFamily: "var(--font-hoves)" }}
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
