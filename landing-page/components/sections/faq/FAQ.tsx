import FAQItem from "./FAQItem";

const faqs = [
  {
    question: "What is Trading Signals AI?",
    answer:
      "Trading Signals AI is a platform that provides AI-powered trading signals and strategies for crypto markets. It analyzes market patterns, sentiment, and on-chain data to generate high-probability trade setups across multiple exchanges.",
  },
  {
    question: "What are signal channels?",
    answer:
      "Signal channels are curated trading strategies grouped by risk profile and style — including Scalping, Swing Trading, AI Strategy, Low Risk, High Risk High Reward, and Futures. Each channel delivers real-time trade alerts with entry, target, and stop-loss levels.",
  },
  {
    question: "Can I automate my trades?",
    answer:
      "Yes. Trading Signals AI supports full automation via API connections to major exchanges like Binance, Coinbase, Kraken, Bybit, and OKX. You can also choose to receive signals and execute manually — full control is always yours.",
  },
  {
    question: "Is the platform suitable for beginners?",
    answer:
      "Absolutely. We offer dedicated low-risk channels and guided execution features designed specifically for beginners. The platform provides clear entry and exit points with controlled exposure so you can learn while you trade.",
  },
  {
    question: "Are performance results transparent?",
    answer:
      "Yes. Every trade, P&L result, and performance metric is publicly visible on our dashboard. We believe in full transparency — no hidden fees, no selective reporting, and no inflated win rates.",
  },
  {
    question: "Is my account secure?",
    answer:
      "Your security is our top priority. API keys are encrypted with AES-256, and we never have withdrawal access to your funds. Your assets always stay on your exchange — we only interact with trading permissions.",
  },
];

export default function FAQ() {
  return (
    <section
      className="w-full relative overflow-hidden py-5"
      style={{ backgroundColor: "#010B24" }}
    >
      <div
        className="w-full mx-auto"
        style={{
          paddingLeft: "clamp(20px, 13vw, 250px)",
          paddingRight: "clamp(20px, 13vw, 250px)",
        }}
      >
        <div
          style={{
            maxWidth: "1420px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "60px",
          }}
        >
          {/* ── Header ── */}
          <div
            style={{
              maxWidth: "619px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "30px",
            }}
          >
            {/* Badge */}
            <div
              style={{
                padding: "5px 14px",
                borderRadius: "40px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                FAQ
              </span>
            </div>

            {/* Heading */}
            <h2
              style={{
                fontFamily: "var(--font-hoves)",
                fontWeight: 500,
                fontSize: "40px",
                lineHeight: "1.2",
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              Frequently Asked Questions
            </h2>

            {/* Subtext */}
            <p
              style={{
                fontFamily: "var(--font-hoves)",
                fontSize: "16px",
                color: "rgba(199,204,210,1)",
                lineHeight: "1.5",
                maxWidth: "500px",
                margin: 0,
              }}
            >
              Everything you need to know about Trading Signals AI
            </p>
          </div>

          {/* ── FAQ Accordion List ── */}
          <div
            style={{
              width: "750px",
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}