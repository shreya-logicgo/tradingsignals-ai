"use client";

import { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen((p) => !p)}
      style={{
        width: "100%",
        padding: isOpen ? "20px" : "0px 20px",
        borderRadius: "15px",
        background: isOpen
          ? "rgba(255,255,255,0.07)"
          : "rgba(255,255,255,0.05)",
        border: isOpen
          ? "1px solid rgba(255,255,255,0.15)"
          : "1px solid rgba(255,255,255,0.10)",
        cursor: "pointer",
        transition: "background 0.25s ease, border-color 0.25s ease",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (!isOpen) {
          (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.08)";
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.2)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isOpen) {
          (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)";
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.10)";
        }
      }}
    >
      {/* Question row */}
      <div
        style={{
          height: "62px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-hoves)",
            fontSize: "16px",
            color: "#FFFFFF",
            lineHeight: 1.3,
          }}
        >
          {question}
        </span>

        {/* +/× icon */}
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "transform 0.25s ease",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="7" y1="1" x2="7" y2="13" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="1" y1="7" x2="13" y2="7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Answer — shown only when open */}
      {isOpen && (
        <div
          style={{
            paddingBottom: "4px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-hoves)",
              fontSize: "14px",
              color: "rgba(199,204,210,1)",
              lineHeight: "1.6",
              margin: 0,
            }}
          >
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}