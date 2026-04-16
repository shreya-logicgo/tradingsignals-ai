"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import TestimonialCard from "./TestimonialCard";

import img1 from "@/assets/images/testimonial-1.jpg";
import img2 from "@/assets/images/testimonial-2.jpg";
import img3 from "@/assets/images/testimonial-3.jpg";
import img4 from "@/assets/images/testimonial-4.jpg";
import img5 from "@/assets/images/testimonial-5.jpg";
import gradientBg from "@/assets/images/Gradient.png";

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
    <section className="w-full relative py-16 md:py-24 bg-transparent overflow-visible">
      
      {/* Refined Smoky Gradient Background */}
      <div className="absolute inset-x-0 -top-1/4 -bottom-1/4 z-0 pointer-events-none overflow-hidden select-none">
  <Image
    src={gradientBg}
    alt=""
    fill
    priority
    className="object-cover opacity-100 scale-150 translate-y-0 brightness-125 contrast-125 saturate-150 blur-0"
  />
</div>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8 md:gap-12">

          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-between gap-8 order-2 lg:order-1 items-center lg:items-start">
            {leftCards.map((card, i) => (
              <TestimonialCard key={i} {...card} />
            ))}
          </div>

          {/* CENTER COLUMN */}
          <div className="flex flex-col items-center text-center gap-4 order-1 lg:order-2 flex-1 max-w-[440px]">

            <div className="px-3.5 py-1 flex justify-center rounded-full border border-white/20 bg-white/5">
              <span
                className="text-[11px] font-mono tracking-widest uppercase text-white/70"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("testimonials.title")}
              </span>
            </div>

            <h2
              className="text-3xl md:text-4xl font-medium leading-tight text-white font-hoves"
            >
              {t("testimonials.heading")}
            </h2>

            <p
              className="text-sm md:text-base text-white/65 leading-relaxed max-w-xs font-hoves"
            >
              {t("testimonials.description")}
            </p>

            <div className="w-full max-w-[440px] mx-auto flex-1 flex flex-col mt-2">
              <div className="flex-1">
                <TestimonialCard
                  image={img3}
                  quote={quotes[2]}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col justify-between gap-8 order-3 items-center lg:items-start">
            {rightCards.map((card, i) => (
              <TestimonialCard key={i} {...card} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
 