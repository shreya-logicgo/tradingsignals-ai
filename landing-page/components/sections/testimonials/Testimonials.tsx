"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUpVariant } from "@/utils/animations";
import TestimonialCard from "./TestimonialCard";

import gradientBg from "@/assets/images/Gradient.png";
import ExchangePartners from "../crypto/Exchangepartners";
import Container from "@/components/common/container/Container";

/** Place MP4s in `public/videos/` as `1.mp4` … `4.mp4`. */
const TESTIMONIAL_VIDEOS = {
  v1: "/videos/1.mp4",
  v2: "/videos/2.mp4",
  v3: "/videos/3.mp4",
  v4: "/videos/4.mp4",
} as const;

export default function Testimonials() {
  const { t } = useTranslation();
  const [activePlaybackId, setActivePlaybackId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, {
    amount: 0.08,
    margin: "0px 0px -48px 0px",
  });

  /** When the block scrolls out of view, treat as no active player so every card pauses. */
  const effectiveActivePlaybackId = isSectionInView ? activePlaybackId : null;

  const quotes = t("testimonials.quotes", {
    returnObjects: true,
  }) as string[];

  // Left: videos 1 & 3 — Right: videos 2 & 4
  const leftCards = [
    { videoSrc: TESTIMONIAL_VIDEOS.v1, quote: quotes[0] },
    { videoSrc: TESTIMONIAL_VIDEOS.v3, quote: quotes[2] },
  ];

  const rightCards = [
    { videoSrc: TESTIMONIAL_VIDEOS.v2, quote: quotes[1] },
    { videoSrc: TESTIMONIAL_VIDEOS.v4, quote: quotes[3] },
  ];

  return (
    <motion.section
      ref={sectionRef}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="w-full relative overflow-hidden bg-transparent overflow-visible"
    >
      <ExchangePartners />

      {/* Radial depth glow */}
      <div className="absolute inset-x-0 -top-1/4 -bottom-1/4 z-0 pointer-events-none overflow-hidden select-none">
        <Image
          src={gradientBg}
          alt=""
          fill
          priority
          className="object-cover opacity-100 scale-150 translate-y-0 brightness-125 contrast-125 saturate-150 blur-0"
        />
      </div>

      <Container className="section-pb relative z-10 w-full ">
        <div
          id="testimonials"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-10 3xl:gap-12 scroll-mt-24 sm:scroll-mt-24 md:scroll-mt-22 lg:scroll-mt-30"
        >
          {/* LEFT COLUMN — videos 1 & 3 */}
          <div className="flex flex-col gap-4  xl:gap-10 3xl:gap-12 order-2 lg:order-1 w-full justify-between items-center">
            {leftCards.map((card, i) => {
              const playbackId = `left-${i}`;
              return (
                <motion.div
                  key={playbackId}
                  variants={fadeUpVariant}
                  className="w-full flex justify-center"
                >
                  <TestimonialCard
                    {...card}
                    playbackId={playbackId}
                    activePlaybackId={effectiveActivePlaybackId}
                    onVideoPlay={setActivePlaybackId}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* CENTER COLUMN — title & copy only (middle video commented out) */}
          <motion.div
            variants={fadeUpVariant}
            className="flex flex-col items-center justify-center text-center gap-1 md:gap-3 order-1 lg:order-2 md:col-span-2 lg:col-span-1 w-full mx-auto"
          >
            <div className="inline-flex items-center px-4 py-1.5 shadow-inner">
              <span className="text-[15px] font-mono tracking-widest uppercase text-vivid-cyan">
                {t("testimonials.title")}
              </span>
            </div>

            <h2 className="head-size font-medium leading-snug text-white font-hoves">
              {t("testimonials.heading")}
            </h2>

            <p className="desc-size text-white/65 leading-snug max-w-[400px] font-hoves">
              {t("testimonials.description")}
            </p>

            {/* Middle testimonial video — restore when needed (no poster / direct video like other cards)
            <div className="w-full flex justify-center mt-6 flex-1 text-start">
              <TestimonialCard
                videoSrc="/videos/…"
                quote={quotes[2]}
                playbackId="center"
                activePlaybackId={effectiveActivePlaybackId}
                onVideoPlay={setActivePlaybackId}
              />
            </div>
            */}
          </motion.div>

          {/* RIGHT COLUMN — videos 2 & 4 */}
          <div className="flex flex-col gap-4  xl:gap-10 3xl:gap-12 order-3 items-center w-full justify-between">
            {rightCards.map((card, i) => {
              const playbackId = `right-${i}`;
              return (
                <motion.div
                  key={playbackId}
                  variants={fadeUpVariant}
                  className="w-full flex justify-center"
                >
                  <TestimonialCard
                    {...card}
                    playbackId={playbackId}
                    activePlaybackId={effectiveActivePlaybackId}
                    onVideoPlay={setActivePlaybackId}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
