import Navbar from "@/components/common/navbar/Navbar";
import NoiseOverlay from "@/components/NoiseOverlay";
import Categories from "@/components/sections/categories/Categories";
import CTA from "@/components/sections/cta/CTA";
import FAQ from "@/components/sections/faq/FAQ";
import Features from "@/components/sections/features/Features";
import Hero from "@/components/sections/hero/Hero";
import Stats from "@/components/sections/stats/Stats";
import Steps from "@/components/sections/steps/Steps";
import Strategies from "@/components/sections/strategies/Strategies";
import Testimonials from "@/components/sections/testimonials/Testimonials";
import Traders from "@/components/sections/traders/Traders";
import TrustedLogos from "@/components/sections/trusted/TrustedLogos";
import StartToday from "@/components/sections/starttoday/Starttoday";
import Container from "@/components/common/container/Container";
import noiseTexture from "@/assets/images/texture.png"; 


export default function Home() {
  return (
    <main>
      <div
        className="absolute inset-0 z-[999] pointer-events-none opacity-50"
        style={{
          backgroundImage: `url(${noiseTexture.src})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '900px 900px'
        }}
      />
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

      {/* <Steps /> */}
      <Stats />
      <Categories />
      <Traders />

      <section
        id="testimonials"
        className="scroll-mt-6 sm:scroll-mt-6 md:scroll-mt-8 lg:scroll-mt-6"
      >
        <Testimonials />
      </section>

      <section
        id="faq"
        className="scroll-mt-18 sm:scroll-mt-18 md:scroll-mt-18 lg:scroll-mt-16"
      >
        <FAQ />
      </section>

      <CTA />
      {/* <Container className="max-w-4xl mx-auto"> */}
      {/* <Container>
      </Container> */}
      <StartToday />
      {/* </Container> */}
    </main>
  );
}