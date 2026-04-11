"use client";

import { useTranslation } from "react-i18next";
import FAQItem from "./FAQItem";

interface FAQData {
  q: string;
  a: string;
}

export default function FAQ() {
  const { t } = useTranslation();

  // FAQ questions from common.json
  const questions = t("faq.questions", { returnObjects: true }) as FAQData[];

  return (
    <section className="w-full bg-[#010B24] py-16 md:py-24 relative overflow-hidden">
      {/* Outer container — Localized px-6 md:px-12 lg:px-24 */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-center gap-12 lg:gap-16">
          
          {/* ── Header Block — Localized ── */}
          <div className="flex flex-col items-center text-center gap-6 max-w-[619px]">
            {/* Badge */}
            <div className="px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5">
              <span className="text-[11px] font-mono tracking-widest uppercase text-white/70">
                {t("faq.badge")}
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-hoves font-medium text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              {t("faq.title")}
            </h2>

            {/* Subtext */}
            <p className="font-hoves font-light text-sm md:text-base text-[#C7CCD2] leading-relaxed max-w-[500px]">
              {t("faq.description")}
            </p>
          </div>

          {/* ── FAQ Accordion List — Localized ── */}
          <div className="w-full max-w-3xl flex flex-col gap-4">
            {questions.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

