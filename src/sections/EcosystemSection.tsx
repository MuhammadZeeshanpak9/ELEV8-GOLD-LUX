import { useEffect, useRef, useState } from 'react';
import { Plane, Car, Home, Palmtree, ArrowRight } from 'lucide-react';

interface EcosystemItem {
  id: string;
  icon: React.ElementType;
  overline: string;
  title: string;
  highlight: string;
  description: string;
  features: string[];
  image: string;
  reverse?: boolean;
}

const ecosystemItems: EcosystemItem[] = [
  {
    id: 'aviation',
    icon: Plane,
    overline: 'Private Aviation',
    title: 'Private Aviation.',
    highlight: 'Redefined.',
    description:
      'Access a global fleet of private jets, from light aircraft for regional hops to ultra-long-range heavy jets for intercontinental journeys. Experience aviation without compromise — on your schedule, to your destinations, with unparalleled service.',
    features: [
      'Global Fleet Access',
      'On-Demand Charter',
      'Jet Card Programs',
      'VIP Concierge',
    ],
    image: '/images/aviation.jpg',
  },
  {
    id: 'mobility',
    icon: Car,
    overline: 'Exotic Mobility',
    title: 'Exotic Mobility.',
    highlight: 'Unmatched.',
    description:
      'From the rarest hypercars to bespoke luxury vehicles, our mobility ecosystem grants you access to machines that transcend transportation. These are rolling works of art — curated, delivered, and maintained to the highest standard.',
    features: [
      'Hypercar Acquisition',
      'Bespoke Collections',
      'Global Delivery',
      'White-Glove Service',
    ],
    image: '/images/mobility.jpg',
    reverse: true,
  },
  {
    id: 'residences',
    icon: Home,
    overline: 'Elite Real Estate',
    title: 'Elite Residences.',
    highlight: 'Exclusive.',
    description:
      'Discover architectural masterpieces in the world\'s most prestigious locations. From penthouses overlooking city skylines to oceanfront estates that redefine coastal living — each residence is a statement of success.',
    features: [
      'Global Portfolio',
      'Off-Market Deals',
      'Architectural Gems',
      'Investment Advisory',
    ],
    image: '/images/residence.jpg',
  },
  {
    id: 'islands',
    icon: Palmtree,
    overline: 'Private Islands',
    title: 'Private Islands.',
    highlight: 'Yours.',
    description:
      'Own your paradise. Our island division specializes in the acquisition and development of private islands across the Caribbean, Mediterranean, South Pacific, and beyond. From turnkey retreats to blank canvases — your sanctuary awaits.',
    features: [
      'Island Acquisition',
      'Resort Development',
      'Turnkey Ownership',
      'Private Yacht Access',
    ],
    image: '/images/island.jpg',
    reverse: true,
  },
];

function EcosystemCard({ item, index }: { item: EcosystemItem; index: number }) {
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id={item.id}
      ref={cardRef}
      className={`w-full py-16 lg:py-24 transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className={`flex flex-col ${
          item.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
        } gap-8 lg:gap-16 items-center`}
      >
        {/* Image */}
        <div className="w-full lg:w-3/5 relative group">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[300px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
            {/* Floating icon badge */}
            <div className="absolute top-6 left-6 p-3 rounded-full glass-luxury">
              <item.icon className="w-5 h-5 text-gold-champagne" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="w-full lg:w-2/5">
          <span className="text-xs font-light tracking-[0.3em] uppercase text-gold-muted mb-4 block">
            {item.overline}
          </span>
          <h3 className="text-3xl lg:text-4xl font-display font-bold text-white mb-2 leading-tight">
            {item.title}
          </h3>
          <h3 className="text-3xl lg:text-4xl font-display font-bold text-gradient-gold mb-6 leading-tight">
            {item.highlight}
          </h3>
          <p className="text-sm lg:text-base font-light leading-relaxed text-gold-soft/70 mb-8">
            {item.description}
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {item.features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 text-sm text-gold-soft/60"
              >
                <div className="w-1 h-1 rounded-full bg-gold-champagne" />
                {feature}
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#inquiry"
            className="inline-flex items-center gap-2 text-sm font-medium tracking-[0.1em] uppercase text-gold-champagne group/link"
          >
            Express Interest
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function EcosystemSection() {
  return (
    <section className="relative w-full px-6 lg:px-16" style={{ zIndex: 2 }}>
      {/* Section Intro */}
      <div className="py-16 lg:py-24 text-center">
        <span className="text-xs font-light tracking-[0.3em] uppercase text-gold-muted mb-4 block">
          The Ecosystem
        </span>
        <h2 className="text-display-md text-white mb-4">
          Beyond <span className="text-gradient-gold">Luxury</span>
        </h2>
        <p className="text-sm lg:text-base font-light text-gold-soft/60 max-w-2xl mx-auto">
          Five pillars of extraordinary living. One unified ecosystem designed
          for those who accept nothing less than the absolute best.
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gold-champagne/10 mb-8" />

      {/* Cards */}
      {ecosystemItems.map((item, i) => (
        <EcosystemCard key={item.id} item={item} index={i} />
      ))}
    </section>
  );
}
