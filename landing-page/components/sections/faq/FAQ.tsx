"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { staggerContainer, fadeUpVariant } from "@/utils/animations";
import FAQItem from "./FAQItem";

interface FAQData {
  q: string;
  a: string;
}

export default function FAQ() {
  const { t } = useTranslation();

  const questions = t("faq.questions", { returnObjects: true }) as FAQData[];

  return (
   <motion.section 
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="w-full bg-transparent pt-10 md:py-20 relative overflow-hidden">
      {/* Outer container — responsive horizontal padding */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="flex flex-col items-center gap-10 lg:gap-12">
          
          {/* ── Header Block — Localized ── */}
          <motion.div variants={fadeUpVariant} className="flex flex-col items-center text-center gap-3 max-w-[619px]">
            {/* Badge */}
            <div className="px-3.5 py-0.5 flex justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
              <span className="text-[11px] font-mono tracking-widest uppercase text-white/70">
                {t("faq.badge")}
              </span>
            </div>

            <h2 className="font-hoves font-medium text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              {t("faq.title")}
            </h2>

            <p className="font-hoves font-light text-sm md:text-base text-[#C7CCD2] leading-relaxed max-w-[500px]">
              {t("faq.description")}
            </p>
          </motion.div>

          <div className="w-full max-w-2xl flex flex-col gap-4">
            {questions.map((faq, i) => (
              <motion.div key={i} variants={fadeUpVariant}>
                <FAQItem question={faq.q} answer={faq.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}