import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ReturnButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full glass-luxury-strong border-gold-glow flex items-center justify-center text-gold-champagne hover:bg-gold-champagne hover:text-[#050505] transition-all duration-500 ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Return to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
