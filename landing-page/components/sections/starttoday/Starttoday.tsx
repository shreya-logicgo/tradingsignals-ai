"use client";

import startTodayBack from "@/assets/images/start-today-back.png";
import { useTranslation } from "react-i18next";

export default function StartToday() {
    const { t } = useTranslation();

    return (
        <section className="bg-[#0a0e1a] py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div
                    className="relative rounded-2xl overflow-hidden px-8 py-14 text-center min-h-[300px]"
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
                        <span className="inline-flex items-center px-5 py-1.5 rounded-full border border-white/25 text-white/80 text-xs font-medium tracking-[0.18em] uppercase">
                            {t("starttoday.badge")}
                        </span>

                        <h2 className="text-white text-3xl sm:text-[2.6rem] font-semibold leading-tight">
                            {t("starttoday.heading")}
                        </h2>

                        <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-sm">
                            {t("starttoday.description")}
                        </p>

                        <button
                            className="mt-2 px-8 py-2.5 rounded-full border border-white/40 text-white text-sm font-medium
                         hover:bg-white hover:text-[#060d1f] transition-all duration-200 cursor-pointer"
                        >
                            {t("starttoday.cta")}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}