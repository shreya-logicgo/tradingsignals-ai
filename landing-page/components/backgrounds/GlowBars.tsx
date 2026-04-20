"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import glowBar from "@/assets/images/glowBars.png";
import { RefObject } from "react";

interface GlowBarsProps {
  targetRef: RefObject<HTMLDivElement | null>;
}

export default function GlowBars({ targetRef }: GlowBarsProps) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const yMove = useTransform(scrollYProgress, [0, 1], [-350, 450]);

  const smoothY = useSpring(yMove, {
    stiffness: 70,
    damping: 25,
    mass: 0.5,
  });

  return (
    <motion.div
      className="absolute inset-x-0 top-0 mx-auto h-[230vh] w-full max-w-[1400px] pointer-events-none z-[8]"
      style={{ y: smoothY }}
    >
      <Image
        src={glowBar}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-contain"
        style={{ mixBlendMode: "screen" }}
      />
    </motion.div>
  );
}