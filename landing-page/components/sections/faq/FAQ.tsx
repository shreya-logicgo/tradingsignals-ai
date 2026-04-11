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
    <section className="w-full bg-[#010B24] py-16 md:py-24 relative overflow-hidden">
      {/* Outer container — responsive horizontal padding */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-center gap-12 lg:gap-16">
          
          {/* ── Header Block ── */}
          <div className="flex flex-col items-center text-center gap-6 max-w-[619px]">
            {/* Badge */}
            <div className="px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5">
              <span className="text-[11px] font-mono tracking-widest uppercase text-white/70">
                FAQ
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-hoves font-medium text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              Frequently Asked Questions
            </h2>

            {/* Subtext */}
            <p className="font-hoves font-light text-sm md:text-base text-[#C7CCD2] leading-relaxed max-w-[500px]">
              Everything you need to know about Trading Signals AI
            </p>
          </div>

          {/* ── FAQ Accordion List ── */}
          <div className="w-full max-w-3xl flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}