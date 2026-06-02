import { useEffect, useRef, useState } from 'react';
import { Eye, Globe, Diamond, TrendingUp } from 'lucide-react';

const pillars = [
  {
    icon: Globe,
    title: 'Global Access',
    description:
      'Unrestricted entry to the world\'s most coveted destinations, events, and experiences.',
  },
  {
    icon: Diamond,
    title: 'Exclusivity',
    description:
      'Members-only privileges across aviation, real estate, automotive, and lifestyle.',
  },
  {
    icon: TrendingUp,
    title: 'Wealth Creation',
    description:
      'Strategic opportunities designed to elevate and preserve generational wealth.',
  },
  {
    icon: Eye,
    title: 'Curated Vision',
    description:
      'Every detail meticulously crafted for those who see beyond the ordinary.',
  },
];

export default function VisionSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-40"
      style={{ zIndex: 2 }}
    >
      <div className="w-full px-6 lg:px-16">
        {/* Section Header */}
        <div
          className={`max-w-3xl mb-16 lg:mb-24 transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-xs font-light tracking-[0.3em] uppercase text-gold-muted mb-4 block">
            The Vision
          </span>
          <h2 className="text-display-md text-white mb-6">
            Lux{' '}
            <span className="text-gradient-gold">Godly Living</span>
          </h2>
          <p className="text-base lg:text-lg font-light leading-relaxed text-gold-soft/70 max-w-2xl">
            ELEV8 represents more than luxury — it is the elevation of every
            aspect of life. From the moment you rise to the heights you achieve,
            we exist to ensure your journey is nothing short of divine. This is
            not a lifestyle. This is a legacy.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className={`glass-luxury rounded-xl p-8 group hover:border-gold-champagne/30 transition-all duration-700 ${
                visible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <div className="mb-6 p-3 rounded-lg bg-gold-champagne/10 w-fit group-hover:bg-gold-champagne/20 transition-colors duration-500">
                <pillar.icon className="w-6 h-6 text-gold-champagne" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 tracking-wide">
                {pillar.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-gold-soft/60">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
