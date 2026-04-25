import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/home/HeroSection'
import HorizontalGallery from '../components/home/HorizontalGallery'
import CapabilitiesSection from '../components/home/CapabilitiesSection'
import DifferentiatorsSection from '../components/home/DifferentiatorsSection'
import ContactSection from '../components/home/ContactSection'

/**
 * Home — JulesX "The Living Portfolio"
 * 
 * Flow: Hero (browser mockup) → HorizontalGallery (GSAP scroll) 
 *       → Capabilities (hover-reveal) → Differentiators → CTA
 * 
 * Removed PortfolioPreview — replaced by HorizontalGallery for WOW factor.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HorizontalGallery />
        <CapabilitiesSection />
        <DifferentiatorsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
