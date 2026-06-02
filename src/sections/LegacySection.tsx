import { useEffect, useRef, useState } from 'react';
import { Gem, Shield, TrendingUp, Users, Award, Crown } from 'lucide-react';

const legacyStats = [
  { icon: Gem, value: '$2B+', label: 'Assets Under curation' },
  { icon: Users, value: '500+', label: 'Founding Members' },
  { icon: Shield, value: '40+', label: 'Countries served' },
  { icon: Award, value: '15', label: 'Years of Excellence' },
];

const legacyPillars = [
  {
    icon: TrendingUp,
    title: 'Wealth Engineering',
    description:
      'Sophisticated strategies for wealth preservation, growth, and generational transfer.',
  },
  {
    icon: Shield,
    title: 'Legacy Protection',
    description:
      'Comprehensive structures ensuring your legacy endures for generations to come.',
  },
  {
    icon: Crown,
    title: 'Prestige Network',
    description:
      'An exclusive circle of visionaries, leaders, and changemakers shaping the world.',
  },
];

export default function LegacySection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="legacy"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-40"
      style={{ zIndex: 2 }}
    >
      <div className="w-full px-6 lg:px-16">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 lg:mb-24 transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-xs font-light tracking-[0.3em] uppercase text-gold-muted mb-4 block">
            Wealth & Legacy
          </span>
          <h2 className="text-display-md text-white mb-6">
            Build Your{' '}
            <span className="text-gradient-gold">Legacy</span>
          </h2>
          <p className="text-base lg:text-lg font-light leading-relaxed text-gold-soft/70">
            True wealth is not measured in possessions, but in the impact you
            leave behind. ELEV8 provides the infrastructure for lasting
            prosperity — engineered for the visionaries who shape tomorrow.
          </p>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20 transition-all duration-1000 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {legacyStats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl border border-gold-champagne/10 hover:border-gold-champagne/30 transition-colors duration-500"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <stat.icon className="w-6 h-6 text-gold-champagne mx-auto mb-4" />
              <div className="text-3xl lg:text-4xl font-display font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-xs tracking-[0.15em] uppercase text-gold-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {legacyPillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className={`glass-luxury rounded-xl p-8 group hover:border-gold-champagne/30 transition-all duration-700 ${
                visible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${400 + i * 150}ms` }}
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
