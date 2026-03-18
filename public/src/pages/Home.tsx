import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/home/HeroSection'
import ProcessSection from '../components/home/ProcessSection'
import PortfolioPreview from '../components/home/PortfolioPreview'
import TestimonialSection from '../components/home/TestimonialSection'
import ContactSection from '../components/home/ContactSection'

/**
 * Home — Oasis-style storytelling
 * Dark theme, section-based storytelling with smooth scroll
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProcessSection />
        <PortfolioPreview />
        <TestimonialSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
