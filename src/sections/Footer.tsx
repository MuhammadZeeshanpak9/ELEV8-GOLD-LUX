import { Instagram, Linkedin, Twitter, Mail, MapPin } from 'lucide-react';
import logoImg from '../Logo/Logo.png';

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:concierge@elev8lux.com', label: 'Email' },
];

const footerLinks = [
  { label: 'Vision', href: '#vision' },
  { label: 'Aviation', href: '#aviation' },
  { label: 'Mobility', href: '#mobility' },
  { label: 'Residences', href: '#residences' },
  { label: 'Islands', href: '#islands' },
  { label: 'Legacy', href: '#legacy' },
];

export default function Footer() {
  return (
    <footer
      className="relative w-full py-16 lg:py-24 overflow-hidden"
      style={{ zIndex: 2 }}
    >
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="text-[20vw] font-display font-bold text-white/[0.02] whitespace-nowrap"
          style={{ letterSpacing: '0.1em' }}
        >
          ELEV8
        </span>
      </div>

      <div className="relative w-full px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src={logoImg}
                alt="ELEV8 Logo"
                className="w-10 h-10 rounded-full object-cover border border-gold-champagne/40"
              />
              <span className="text-lg font-bold tracking-[0.15em] text-white uppercase">
                ELEV8
              </span>
            </div>
            <p className="text-sm font-light leading-relaxed text-gold-soft/50 max-w-xs mb-6">
              Curating the world&apos;s most extraordinary experiences,
              residences, mobility, and opportunities into one luxury lifestyle
              ecosystem.
            </p>
            <div className="flex items-center gap-2 text-xs text-gold-muted/50">
              <MapPin className="w-3 h-3" />
              <span>Global Headquarters — Dubai, UAE</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-gold-muted mb-6">
              Explore
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-light text-gold-soft/50 hover:text-gold-champagne transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-gold-muted mb-6">
              Connect
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-gold-champagne/20 flex items-center justify-center text-gold-muted hover:text-gold-champagne hover:border-gold-champagne/50 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="#inquiry"
                className="inline-block px-6 py-3 text-xs font-medium tracking-[0.12em] uppercase text-gold-champagne border border-gold-champagne/40 rounded-pill hover-gold-fill"
              >
                Reserve Priority Access
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gold-champagne/10 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gold-muted/40 font-light">
            &copy; {new Date().getFullYear()} ELEV8 Lux Godly Living. All
            rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-gold-muted/40 hover:text-gold-muted transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-gold-muted/40 hover:text-gold-muted transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-xs text-gold-muted/40 hover:text-gold-muted transition-colors duration-300"
            >
              Discretion Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
