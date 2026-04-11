

import Navbar from "@/components/common/navbar/Navbar";
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
import glowBar from "@/assets/images/glowBars.png";
import StartToday from "@/components/sections/starttoday/Starttoday";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustedLogos />
      <Features />
      <Strategies />
      <Steps />
      <Stats />
      <Categories />
      <Traders />
      <Testimonials />
      <FAQ />
      <CTA />
      <StartToday/>
    </main>
  );
}