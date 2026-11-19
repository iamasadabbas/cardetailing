import { InquiryProvider } from "@/components/InquiryProvider";
import { MotionProvider } from "@/components/MotionProvider";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BrandIntroduction } from "@/components/BrandIntroduction";
import { Services } from "@/components/Services";
import { FeaturedVisual } from "@/components/FeaturedVisual";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Gallery } from "@/components/Gallery";
import { Packages } from "@/components/Packages";
import { Process } from "@/components/Process";
import { FAQ } from "@/components/FAQ";
import { ContactForm } from "@/components/ContactForm";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <MotionProvider>
    <InquiryProvider>
      <Header />
      <main id="main">
        <Hero />
        <BrandIntroduction />
        <Services />
        <FeaturedVisual />
        <WhyChooseUs />
        <Gallery />
        <Packages />
        <Process />
        <FAQ />
        <ContactForm />
        <FinalCTA />
      </main>
      <Footer />
      <RevealObserver />
    </InquiryProvider>
    </MotionProvider>
  );
}
