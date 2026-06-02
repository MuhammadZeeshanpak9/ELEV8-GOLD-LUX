import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-[1]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ opacity: 0.85 }}
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dark gradient overlay for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, #050505 0%, transparent 50%, rgba(5,5,5,0.3) 100%)',
          }}
        />
        {/* Side vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 30%, rgba(5,5,5,0.6) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-16 lg:pb-24 px-6 lg:px-16">
        {/* Overline */}
        <div
          className={`flex items-center gap-3 mb-6 transition-all duration-1000 ${
            visible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <Sparkles className="w-4 h-4 text-gold-champagne" />
          <span className="text-xs font-light tracking-[0.3em] uppercase text-gold-muted">
            Coming Soon — 2026
          </span>
        </div>

        {/* Main Title */}
        <h1 className="font-display text-display-xl text-white mb-4">
          <span
            className={`block transition-all duration-1000 delay-200 ${
              visible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            ELEV8 LUX
          </span>
          <span
            className={`block text-gradient-gold transition-all duration-1000 delay-500 ${
              visible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            GODLY LIVING
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`max-w-xl text-base lg:text-lg font-light leading-relaxed text-gold-soft/80 mb-10 transition-all duration-1000 delay-700 ${
            visible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          Curating the world&apos;s most extraordinary experiences, residences,
          mobility, and opportunities into one luxury lifestyle ecosystem.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-wrap gap-4 transition-all duration-1000 delay-900 ${
            visible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          <a
            href="#inquiry"
            className="px-8 py-3.5 text-sm font-medium tracking-[0.12em] uppercase text-[#050505] bg-gold-champagne rounded-pill hover:bg-gold-soft transition-colors duration-400"
          >
            Join the Legacy
          </a>
          <a
            href="#vision"
            className="px-8 py-3.5 text-sm font-medium tracking-[0.12em] uppercase text-gold-champagne border border-gold-champagne/40 rounded-pill hover-gold-fill"
          >
            Explore the Vision
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-float">
        <span className="text-[10px] tracking-[0.3em] uppercase text-gold-muted/60">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 text-gold-muted/60" />
      </div>
    </section>
  );
}
