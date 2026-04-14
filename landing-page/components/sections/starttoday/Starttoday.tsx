"use client";

import startTodayBack from "@/assets/images/start-today-back.png";
import LuxuryGlowButton from "@/components/common/LuxuryGlowButton";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import PremiumGlowButton from "@/components/common/LuxuryGlowButton";
import ShineText from "@/components/common/ShineText";
import ShineButton from "@/components/common/ShineButton";
import React from 'react';
// import { motion } from 'framer-motion';

export default function StartToday() {
    const { t } = useTranslation();


const AnimatedLoginButton = () => {
  return (
    <button className="relative overflow-hidden rounded-full p-[1px] group outline-none active:scale-95 transition-transform duration-200 w-40">
      
      {/* 1. The Left-to-Right Moving Border Glow */}
      <motion.div
        className="absolute top-0 bottom-0 w-[200%] z-0 bg-gradient-to-r from-transparent via-white/70 to-transparent"
        initial={{ left: '-150%' }}
        animate={{ left: '100%' }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 2.5,
        }}
      />

      {/* 2. Inner Dark Container (The "Mask") 
          This sits on top of the moving gradient, blocking the center and 
          only allowing the 1px padding of the parent to reveal the moving light.
      */}
      <div className="relative z-10 flex h-full w-full items-center justify-center rounded-full bg-gray-950 px-6 py-2.5 shadow-2xl shadow-black/50">
        
        {/* Button Content */}
        <span className="flex items-center gap-2 text-sm font-medium tracking-wide text-[#e0e0e0] group-hover:text-white transition-colors duration-300">
          
          {/* Subtle Login Icon */}
          <svg 
            className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          
          Login
        </span>
      </div>
    </button>
  );
};

// export default AnimatedLoginButton;

    return (
        <section className="bg-[#0a0e1a] py-16 px-4">
            <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] mx-auto">
                <div
                    className="relative rounded-2xl overflow-hidden px-8 py-13 text-center min-h-[300px]"
                    style={{
                        backgroundImage: `url(${startTodayBack.src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Dark base layer so text stays readable */}
                    <div
                        className="absolute inset-0 -z-10 rounded-2xl"
                        style={{ background: "#060d1f" }}
                    />

                    <div className="relative flex flex-col items-center gap-5">
                        {/* Badge */}
                        <span className="inline-flex items-center px-5 py-1.5 rounded-full border border-white/25 text-white/80 text-xs xl:text-sm font-medium tracking-[0.18em] uppercase"
                            style={{ fontFamily: "var(--font-mono)" }}>
                            {t("starttoday.badge")}
                        </span>


                        <ShineText
                            className="text-2xl sm:text-3xl md:text-5xl lg:text-[50px]"
                            style={{ fontFamily: "var(--font-hoves)" }}
                        >
                            {t("starttoday.heading")}
                        </ShineText>


                        <p className="text-white/60 text-sm sm:text-base xl:text-lg 2xl:text-xl leading-relaxed max-w-sm xl:max-w-md 2xl:max-w-xl"
                            style={{ fontFamily: "var(--font-hoves)" }}>
                            {t("starttoday.description")}
                        </p>

                        <ShineButton onClick={() => { }}>
                            {t("starttoday.cta")}
                        </ShineButton>

                        {/* <AnimatedLoginButton/> */}

                    </div>
                </div>
            </div>
        </section>
    );
}