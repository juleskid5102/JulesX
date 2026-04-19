import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/home/HeroSection'
import CapabilitiesSection from '../components/home/CapabilitiesSection'
import PortfolioPreview from '../components/home/PortfolioPreview'
import DifferentiatorsSection from '../components/home/DifferentiatorsSection'
import ContactSection from '../components/home/ContactSection'

/**
 * Home — JulesX Editorial
 * "Curated Void" — warm cream palette, oversized typography,
 * dramatic white space, GSAP motion, gold accent touches.
 *
 * Flow: Hero → Capabilities → Portfolio → Performance & Tech → CTA
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CapabilitiesSection />
        <PortfolioPreview />
        <DifferentiatorsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
