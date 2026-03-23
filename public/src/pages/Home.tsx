import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/home/HeroSection'
import AboutSection from '../components/home/AboutSection'
import PortfolioPreview from '../components/home/PortfolioPreview'
import DifferentiatorsSection from '../components/home/DifferentiatorsSection'
import ProcessSection from '../components/home/ProcessSection'
import ContactSection from '../components/home/ContactSection'

/**
 * Home — v3 Light & Elegant theme
 * Storytelling-driven with smooth scroll reveals
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <PortfolioPreview />
        <DifferentiatorsSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
