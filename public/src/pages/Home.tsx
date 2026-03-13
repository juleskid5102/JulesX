import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/home/HeroSection'
import ProcessSection from '../components/home/ProcessSection'
import PortfolioPreview from '../components/home/PortfolioPreview'
import ContactSection from '../components/home/ContactSection'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProcessSection />
        <PortfolioPreview />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
