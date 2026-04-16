import Navbar from "@/components/common/navbar/Navbar";
import CTA from "@/components/sections/cta/CTA";
import Features from "@/components/sections/features/Features";
import Hero from "@/components/sections/hero/Hero";
import Strategies from "@/components/sections/strategies/Strategies";
import TrustedLogos from "@/components/sections/trusted/TrustedLogos";
import StartToday from "@/components/sections/starttoday/Starttoday";
import AmbientTradingSection from "@/components/ui/Ambienttradingsection";
import AmbientStatsStepsSection from "@/components/ui/AmbientStatsStepsSection";
import AmbientTestimonialsSection from "@/components/ui/AmbientTestimonialsSection";
import AmbientFAQCTASection from "@/components/ui/AmbientFAQCTASection";
import Container from "@/components/common/container/Container";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustedLogos />

      <section
        id="features"
        className="scroll-mt-18 sm:scroll-mt-6 md:scroll-mt-18 lg:scroll-mt-18"
      >
        <Container>

          <Features />
        </Container>
      </section>

      <section
        id="strategies"
        className="scroll-mt-14 sm:scroll-mt-14 md:scroll-mt-8 lg:scroll-mt-6"
      >
        {/* <Container></Container> */}
        <Strategies />
      </section>

      <AmbientStatsStepsSection />
      <AmbientTradingSection />

      <AmbientTestimonialsSection />
      <AmbientFAQCTASection />
      {/* <Container className="max-w-4xl mx-auto"> */}
      {/* <Container>
      </Container> */}
      <StartToday />
      {/* </Container> */}
    </main>
  );
}