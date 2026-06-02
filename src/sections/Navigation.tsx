import { useEffect, useState } from 'react';
import { Crown, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Vision', href: '#vision' },
    { label: 'Aviation', href: '#aviation' },
    { label: 'Mobility', href: '#mobility' },
    { label: 'Residences', href: '#residences' },
    { label: 'Islands', href: '#islands' },
    { label: 'Legacy', href: '#legacy' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'glass-luxury-strong py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group"
        >
          <Crown className="w-7 h-7 text-gold-champagne transition-transform duration-500 group-hover:scale-110" />
          <span className="text-lg font-bold tracking-[0.15em] text-white uppercase">
            ELEV8
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-4 py-2 text-sm font-light tracking-[0.08em] text-gold-soft/70 hover:text-gold-champagne transition-colors duration-400 uppercase"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <a
            href="#inquiry"
            className="px-6 py-2.5 text-sm font-medium tracking-[0.1em] uppercase text-gold-champagne border border-gold-champagne/40 rounded-pill hover-gold-fill"
          >
            Reserve Priority
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-gold-champagne"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden glass-luxury-strong mt-3 mx-6 rounded-xl p-6">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-light tracking-[0.08em] text-gold-soft/70 hover:text-gold-champagne transition-colors uppercase py-2"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#inquiry"
              onClick={() => setMenuOpen(false)}
              className="mt-2 px-6 py-3 text-center text-sm font-medium tracking-[0.1em] uppercase text-gold-champagne border border-gold-champagne/40 rounded-pill hover-gold-fill"
            >
              Reserve Priority
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
