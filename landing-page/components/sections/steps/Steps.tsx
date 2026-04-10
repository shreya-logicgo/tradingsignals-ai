"use client";

import StepCard from "./StepCard";
import glowBars from "@/assets/images/glowBars.png";
import { Link, Layers, BarChart3 } from "lucide-react";

export default function Steps() {
    return (
        <section className="w-full py-32 bg-[#010B24] relative overflow-hidden">

            {/* ✅ SAME SIDE SPACING AS STRATEGIES */}
            <div
                className="w-full mx-auto relative"
                style={{
                    paddingLeft: "clamp(20px, 13vw, 250px)",
                    paddingRight: "clamp(20px, 13vw, 250px)",
                }}
            >

                {/* 🧩 MAIN LAYOUT CONTAINER */}
                <div className="relative w-full h-[520px]">

                    {/* 🧠 HEADING (CENTERED BETWEEN CARDS) */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-[70px]">
                        <div className="flex flex-col items-center gap-[10px] w-[380px] text-center">

                            <div className="px-[7px] py-[3px] rounded-full border border-white/20 text-xs text-white/70">
                                GETTING STARTED
                            </div>

                            <h2
                                className="text-[36px] leading-[35px]"
                                style={{ fontFamily: "var(--font-hoves)" }}
                            >
                                Start Trading in 3 Simple Steps
                            </h2>

                            <p className="text-[13px] text-white/60 top-[-5px] text-center text-balance max-w-[420px] mx-auto"
                             style={{ fontFamily: "var(--font-hoves)" }}                                
                             >
                                Get up and running in minutes.No <br />  complex setup required.
                            </p>
                        </div>
                    </div>

                    {/* 🧩 CARDS */}

                    {/* LEFT */}
                    <div className="absolute left-[-4%] top-[100px]">
                        <StepCard
                            step="Step 01"
                            Icon={Link}
                            title="Register & Connect"
                            description="Securely link your exchange account via API. We support Binance, Coinbase, Kraken, Bybit, OKX, and more. Your funds stay on your exchange."
                        />
                    </div>

                    {/* CENTER */}
                    <div className="absolute left-1/2 -translate-x-1/2  top-[280px]">
                        <StepCard
                            step="Step 02"
                            Icon={Layers}
                            title="Choose Signal Channels"
                            description="Select from 8 AI-powered strategies based on your risk tolerance and trading goals. Combine multiple strategies for diversification."
                        />
                    </div>

                    {/* RIGHT */}
                    <div className="absolute right-[-4%] top-[100px]">
                        <StepCard
                            step="Step 03"
                            Icon={BarChart3}
                            title="Trade & Monitor"
                            description="Execute trades automatically or manually. Track performance in real-time with our advanced analytics dashboard."
                        />
                    </div>

                </div>
            </div>
            
        </section>
    );
}