"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { staggerContainer, fadeUpVariant } from "@/utils/animations";
import FAQItem from "./FAQItem";

interface FAQData {
  q: string;
  a: string;
}

export default function FAQ() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const questions = t("faq.questions", { returnObjects: true }) as FAQData[];

  const filteredQuestions = questions.filter(
    (faq) =>
      faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="w-full bg-transparent section-pt section-pb relative overflow-hidden">
      {/* Outer container — responsive horizontal padding */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="flex flex-col items-center gap-10 lg:gap-12">
          {/* ── Header Block — Localized ── */}
          <motion.div
            variants={fadeUpVariant}
            className="flex flex-col items-center text-center gap-3 max-w-[619px]"
          >
            {/* Badge */}
            <div className="px-3.5 py-0.5 flex justify-center  backdrop-blur-md">
              <span className="text-[15px] font-mono tracking-widest uppercase text-vivid-cyan">
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

          {/* ── Search Bar ── */}
          <motion.div
            variants={fadeUpVariant}
            className="w-full max-w-md relative group"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
              <Search className="w-4 h-4 text-[#C7CCD2] group-focus-within:text-white transition-colors" />
            </div>
            <input
              type="text"
              placeholder={t("faq.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-12 text-white text-sm placeholder:text-[#C7CCD2]/50 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all duration-300 backdrop-blur-md"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-4 flex items-center text-[#C7CCD2] hover:text-white transition-colors z-10"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>

          {/* ── Questions List ── */}
          <div className="w-full max-w-2xl flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((faq) => (
                  <motion.div 
                    key={faq.q} 
                    layout
                    variants={fadeUpVariant}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <FAQItem question={faq.q} answer={faq.a} />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  key="no-results"
                  layout
                  variants={fadeUpVariant}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="text-center py-10"
                >
                  <p className="text-[#C7CCD2] font-hoves">
                    {t("faq.noResults", { query: searchTerm })}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
