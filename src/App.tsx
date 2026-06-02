import GlobalEliteConstellation from './sections/GlobalEliteConstellation';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import CountdownSection from './sections/CountdownSection';
import VisionSection from './sections/VisionSection';
import EcosystemSection from './sections/EcosystemSection';
import LegacySection from './sections/LegacySection';
import InquiryForm from './sections/InquiryForm';
import Footer from './sections/Footer';
import ReturnButton from './sections/ReturnButton';

function App() {
  return (
    <div className="relative min-h-screen bg-void">
      {/* Layer 0: Three.js Constellation Background (fixed, z-index 0) */}
      <GlobalEliteConstellation />

      {/* Layer 1: Navigation (fixed, z-index 50) */}
      <Navigation />

      {/* Layer 2: Content (z-index 1+, scrolls over background) */}
      <div className="relative" style={{ zIndex: 1 }}>
        {/* Hero Section */}
        <HeroSection />

        {/* Scrollable Content Sections */}
        <div className="relative bg-void/80" style={{ zIndex: 2 }}>
          {/* Gradient transition from hero to content */}
          <div
            className="h-32 w-full"
            style={{
              background:
                'linear-gradient(to bottom, transparent, #050505)',
            }}
          />

          <CountdownSection />
          <VisionSection />
          <EcosystemSection />
          <LegacySection />
          <InquiryForm />
          <Footer />
        </div>
      </div>

      {/* Return to Top Button */}
      <ReturnButton />
    </div>
  );
}

export default App;
