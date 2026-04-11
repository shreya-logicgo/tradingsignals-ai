"use client";

import { useTranslation } from "react-i18next";
import StepCard from "./StepCard";
import { Link2, Layers, BarChart3 } from "lucide-react";

interface StepData {
  title: string;
  desc: string;
}

export default function Steps() {
  const { t } = useTranslation();

  // Fetching the steps array from common.json
  const stepsData = t("gettingStarted.stepsList", { returnObjects: true }) as StepData[];
  const stepPrefix = t("gettingStarted.stepbadge");

  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden bg-[#010B24]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/*
          Triptych Layout for Large Screens:
          Col 1 | Col 2   | Col 3
          S1    | Heading | S3
                | S2      |
        */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-x-12 lg:gap-y-0 items-start">
          
          {/* ── HEADING (Center on Desktop, Top on Mobile) ── */}
          <div className="lg:col-start-2 lg:row-start-1 flex flex-col items-center text-center lg:pt-14 mb-8 lg:mb-0 order-1">
            {/* Badge — Localized */}
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6">
              <span className="text-[11px] font-mono tracking-widest uppercase text-white/50">
                {t("gettingStarted.title")}
              </span>
            </div>

            {/* Heading — Localized */}
            <h2 className="text-4xl md:text-[40px] font-medium leading-tight md:leading-[1.1] text-white font-hoves mb-6 lg:max-w-md">
              {t("gettingStarted.heading")}
            </h2>

            {/* Subtitle — Localized */}
            <p className="text-sm md:text-base font-light leading-relaxed text-[#c7ccd2] font-hoves max-w-[280px]">
              {t("gettingStarted.description")}
            </p>
          </div>

          {/* ── STEP 01 — Localized ── */}
          {stepsData[0] && (
            <div className="lg:col-start-1 lg:row-start-1 flex justify-center lg:justify-start order-2 lg:order-1 lg:pt-4">
              <StepCard
                step={`${stepPrefix} 01`}
                Icon={Link2}
                title={stepsData[0].title}
                description={stepsData[0].desc}
              />
            </div>
          )}

          {/* ── STEP 03 — Localized ── */}
          {stepsData[2] && (
            <div className="lg:col-start-3 lg:row-start-1 flex justify-center lg:justify-end order-4 lg:order-3 lg:pt-4">
              <StepCard
                step={`${stepPrefix} 03`}
                Icon={BarChart3}
                title={stepsData[2].title}
                description={stepsData[2].desc}
              />
            </div>
          )}

          {/* ── STEP 02 — Localized ── */}
          {stepsData[1] && (
            <div className="lg:col-start-2 lg:row-start-2 flex justify-center pt-8 lg:pt-24 order-3 lg:order-4">
              <StepCard
                step={`${stepPrefix} 02`}
                Icon={Layers}
                title={stepsData[1].title}
                description={stepsData[1].desc}
              />
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
