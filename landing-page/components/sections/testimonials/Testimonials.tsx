"use client";

import { useTranslation } from "react-i18next";
import TestimonialCard from "./TestimonialCard";
import img1 from "@/assets/images/testimonial-1.jpg";
import img2 from "@/assets/images/testimonial-2.jpg";
import img3 from "@/assets/images/testimonial-3.jpg";
import img4 from "@/assets/images/testimonial-4.jpg";
import img5 from "@/assets/images/testimonial-5.jpg";

export default function Testimonials() {
  const { t } = useTranslation();

  // Testimonial quotes from common.json
  const quotes = t("testimonials.quotes", { returnObjects: true }) as string[];

  const leftCards = [
    { image: img1, quote: quotes[0] },
    { image: img2, quote: quotes[1] },
  ];

  const rightCards = [
    { image: img4, quote: quotes[3] },
    { image: img5, quote: quotes[4] },
  ];

  return (
    <section className="w-full relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-[#0028ff40] via-[#0012b826] via-[#000a5014] to-transparent">

      {/* Radial depth glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[600px] blur-[60px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(37,99,235,0.15) 40%, rgba(1,6,26,0) 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">

        {/*
          KEY FIX: use items-stretch on the grid so all 3 columns are
          the same height, then use justify-between inside each column
          so top and bottom cards align across columns.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-stretch">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col justify-between gap-8 order-2 lg:order-1">
            {leftCards.map((card, i) => (
              <TestimonialCard key={i} {...card} />
            ))}
          </div>

          {/* ── CENTER: Heading + featured card ── */}
          <div className="flex flex-col items-center text-center gap-4 order-1 lg:order-2 md:col-span-2 lg:col-span-1">

            {/* Badge */}
            <div className="px-3.5 py-1 flex justify-center rounded-full border border-white/20 bg-white/5">
              <span
                className="text-[11px] font-mono tracking-widest uppercase text-white/70"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("testimonials.title")}
              </span>
            </div>

            {/* Heading */}
            <h2
              className="text-3xl md:text-4xl font-medium leading-tight text-white"
              style={{ fontFamily: "var(--font-hoves)" }}
            >
              {t("testimonials.heading")}
            </h2>

            {/* Subtext */}
            <p
              className="text-sm md:text-base text-white/65 leading-relaxed max-w-xs"
              style={{ fontFamily: "var(--font-hoves)" }}
            >
              {t("testimonials.description")}
            </p>

            {/* Featured card — flex-1 makes it grow to fill remaining height */}
            <div className="w-full flex-1 flex flex-col mt-2">
              <div className="flex-1">
                <TestimonialCard
                  image={img3}
                  quote={quotes[2]}
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col justify-between gap-8 order-3">
            {rightCards.map((card, i) => (
              <TestimonialCard key={i} {...card} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}