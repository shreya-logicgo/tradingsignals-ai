import FAQItem from "./FAQItem";

const faqs = [
  {
    question: "What is Trading Signals AI?",
    answer:
      "Trading Signals AI is an AI-powered trading platform that provides structured signal channels, real-time analytics, and portfolio tracking — all within a single unified dashboard. It helps traders make data-driven decisions instead of relying on guesswork.",
  },
  {
    question: "What are signal channels?",
    answer:
      "Trading Signals AI is an AI-powered trading platform that provides structured signal channels, real-time analytics, and portfolio tracking — all within a single unified dashboard. It helps traders make data-driven decisions instead of relying on guesswork.",
  },
  {
    question: "Can I automate my trades?",
    answer:
      "Trading Signals AI is an AI-powered trading platform that provides structured signal channels, real-time analytics, and portfolio tracking — all within a single unified dashboard. It helps traders make data-driven decisions instead of relying on guesswork.",
  },
  {
    question: "Is the platform suitable for beginners?",
    answer:
      "Trading Signals AI is an AI-powered trading platform that provides structured signal channels, real-time analytics, and portfolio tracking — all within a single unified dashboard. It helps traders make data-driven decisions instead of relying on guesswork.",
  },
  {
    question: "Are performance results transparent?",
    answer:
      "Trading Signals AI is an AI-powered trading platform that provides structured signal channels, real-time analytics, and portfolio tracking — all within a single unified dashboard. It helps traders make data-driven decisions instead of relying on guesswork.",
  },
  {
    question: "Is my account secure?",
    answer:
      "Trading Signals AI is an AI-powered trading platform that provides structured signal channels, real-time analytics, and portfolio tracking — all within a single unified dashboard. It helps traders make data-driven decisions instead of relying on guesswork.",
  },
];

export default function FAQ() {
  return (
    <section className="w-full bg-[#010B24] pt-5 md:py-5 relative overflow-hidden">
      {/* Outer container — responsive horizontal padding */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-center gap-12 lg:gap-16">
          
          {/* ── Header Block ── */}
          <div className="flex flex-col items-center text-center gap-6 max-w-[619px]">
            {/* Badge */}
            <div className="px-3.5 py-0.5 flex justify-center rounded-full border border-white/20 bg-white/5">
              <span className="text-[11px] font-mono tracking-widest uppercase text-white/70">
                FAQ
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-hoves font-medium text-3xl md:text-4xl lg:text-5xl text-white leading-tight"style={{ fontFamily: "var(--font-hoves)" }}>
              Frequently Asked Questions
            </h2>

            {/* Subtext */}
            <p className="font-hoves font-light text-sm md:text-base text-[#C7CCD2] leading-relaxed max-w-[500px]"style={{ fontFamily: "var(--font-hoves)" }}>
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
