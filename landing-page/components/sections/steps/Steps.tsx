"use client";

import StepCard from "./StepCard";
import { Link2, Layers, BarChart3 } from "lucide-react";

export default function Steps() {
  return (
    <section
      className="w-full py-24 relative overflow-hidden"
      style={{ backgroundColor: "#010B24" }}
    >
      <div
        className="w-full mx-auto"
        style={{
          paddingLeft: "clamp(20px, 13vw, 250px)",
          paddingRight: "clamp(20px, 13vw, 250px)",
        }}
      >

        {/*
          Layout: 3-column grid
          Left col  → Step 01 card (top-aligned)
          Center col → heading + Step 02 card below
          Right col  → Step 03 card (top-aligned)
        */}
        <div
          className="grid w-full"
          style={{
            gridTemplateColumns: "300px 1fr 300px",
            gap: "20px",
            alignItems: "start",
          }}
        >

          {/* ── LEFT: Step 01 ── */}
          <div className="flex justify-start">
            <StepCard
              step="Step 01"
              Icon={Link2}
              title="Register & Connect"
              description="Securely link your exchange account via API. We support Binance, Coinbase, Kraken, Bybit, OKX, and more. Your funds stay on your exchange."
            />
          </div>

          {/* ── CENTER: Heading + Step 02 ── */}
          <div className="flex flex-col items-center" style={{ gap: "30px" }}>

            {/* Center text block */}
            <div
              className="flex flex-col items-center text-center"
              style={{ gap: "16px", maxWidth: "380px" }}
            >
              {/* Badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "5px 14px",
                  borderRadius: "40px",
                  border: "1px solid rgba(255,255,255,0.20)",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.10em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.65)",
                    fontFamily: "var(--font-hoves)",
                  }}
                >
                  Getting Started
                </span>
              </div>

              {/* Heading */}
              <h2
                style={{
                  fontSize: "clamp(36px, 3.5vw, 50px)",
                  fontWeight: 400,
                  lineHeight: "1.1",
                  color: "white",
                  fontFamily: "var(--font-hoves)",
                  textAlign: "center",
                }}
              >
                Start Trading in 3 Simple Steps
              </h2>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "1.5",
                  color: "rgba(255,255,255,0.60)",
                  fontFamily: "var(--font-hoves)",
                  textAlign: "center",
                }}
              >
                Get up and running in minutes. No complex setup required.
              </p>
            </div>

            {/* Step 02 card — centered below heading */}
            <StepCard
              step="Step 02"
              Icon={Layers}
              title="Choose Signal Channels"
              description="Select from 8 AI-powered strategies based on your risk tolerance and trading goals. Combine multiple strategies for diversification."
            />
          </div>

          {/* ── RIGHT: Step 03 ── */}
          <div className="flex justify-end">
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