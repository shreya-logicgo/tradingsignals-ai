"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { staggerContainer, fadeUpVariant } from "@/utils/animations";
import TestimonialCard from "./TestimonialCard";

import img1 from "@/assets/images/testimonial-1.jpg";
import img2 from "@/assets/images/testimonial-2.jpg";
import img3 from "@/assets/images/testimonial-3.jpg";
import img4 from "@/assets/images/testimonial-4.jpg";
import img5 from "@/assets/images/testimonial-5.jpg";
import gradientBg from "@/assets/images/Gradient.png";
import ExchangePartners from "../crypto/Exchangepartners";
import Container from "@/components/common/container/Container";

export default function Testimonials() {
  const { t } = useTranslation();

  const quotes = t("testimonials.quotes", {
    returnObjects: true,
  }) as string[];

  const leftCards = [
    { image: img1, quote: quotes[0] },
    { image: img2, quote: quotes[1] },
  ];

  const rightCards = [
    { image: img4, quote: quotes[3] },
    { image: img5, quote: quotes[4] },
  ];

  return (
    <motion.section
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
          {/* LEFT COLUMN - Stacked cards */}
          <div className="flex flex-col gap-4  xl:gap-10 3xl:gap-12 order-2 lg:order-1 w-full justify-between items-center">
            {leftCards.map((card, i) => (
              <motion.div
                key={i}
                variants={fadeUpVariant}
                className="w-full flex justify-center"
              >
                <TestimonialCard {...card} />
              </motion.div>
            ))}
          </div>

          {/* CENTER COLUMN - Title, text, and main card */}
          <motion.div
            variants={fadeUpVariant}
            className="flex flex-col items-center text-center gap-1 md:gap-3 order-1 lg:order-2 md:col-span-2 lg:col-span-1 w-full mx-auto"
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

            <div className="w-full flex justify-center mt-6 flex-1 text-start">
              <TestimonialCard image={img3} quote={quotes[2]} />
            </div>
          </motion.div>

          {/* RIGHT COLUMN - Stacked cards */}
          <div className="flex flex-col gap-4  xl:gap-10 3xl:gap-12 order-3 items-center w-full justify-between">
            {rightCards.map((card, i) => (
              <motion.div
                key={i}
                variants={fadeUpVariant}
                className="w-full flex justify-center"
              >
                <TestimonialCard {...card} />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
