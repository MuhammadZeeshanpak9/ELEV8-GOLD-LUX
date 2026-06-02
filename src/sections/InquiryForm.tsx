import { useEffect, useRef, useState } from 'react';
import { Mail, User, Phone, ChevronDown, Send, Check } from 'lucide-react';

const interests = [
  'Private Aviation',
  'Elite Real Estate',
  'Exotic Automotive',
  'Private Islands',
  'Wealth Management',
  'Full Ecosystem',
];

export default function InquiryForm() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
  });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="inquiry"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-40"
      style={{ zIndex: 2 }}
    >
      <div className="w-full px-6 lg:px-16">
        <div
          className={`max-w-2xl mx-auto transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-xs font-light tracking-[0.3em] uppercase text-gold-muted mb-4 block">
              Exclusive Access
            </span>
            <h2 className="text-display-md text-white mb-4">
              Join the <span className="text-gradient-gold">Legacy</span>
            </h2>
            <p className="text-sm lg:text-base font-light text-gold-soft/60 max-w-lg mx-auto">
              Membership is by invitation and application only. Express your
              interest to begin your journey into the extraordinary.
            </p>
          </div>

          {/* Form Card */}
          <div className="glass-luxury-strong rounded-2xl p-8 lg:p-12">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gold-champagne/10 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-gold-champagne" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-3">
                  Application Received
                </h3>
                <p className="text-sm font-light text-gold-soft/60 max-w-md mx-auto">
                  Your interest has been recorded. A member of our private
                  client team will reach out to you within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-muted" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-gold-champagne/20 rounded-xl text-white placeholder:text-gold-muted/50 focus:outline-none focus:border-gold-champagne/50 transition-colors duration-300 text-sm"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-muted" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-gold-champagne/20 rounded-xl text-white placeholder:text-gold-muted/50 focus:outline-none focus:border-gold-champagne/50 transition-colors duration-300 text-sm"
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-muted" />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-gold-champagne/20 rounded-xl text-white placeholder:text-gold-muted/50 focus:outline-none focus:border-gold-champagne/50 transition-colors duration-300 text-sm"
                  />
                </div>

                {/* Interest Dropdown */}
                <div className="relative">
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-muted pointer-events-none" />
                  <select
                    required
                    value={formData.interest}
                    onChange={(e) =>
                      setFormData({ ...formData, interest: e.target.value })
                    }
                    className="w-full px-4 py-4 bg-white/5 border border-gold-champagne/20 rounded-xl text-white focus:outline-none focus:border-gold-champagne/50 transition-colors duration-300 text-sm appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-[#1a1410]">
                      Select Area of Interest
                    </option>
                    {interests.map((interest) => (
                      <option
                        key={interest}
                        value={interest}
                        className="bg-[#1a1410]"
                      >
                        {interest}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-4 bg-gold-champagne text-[#050505] font-semibold tracking-[0.12em] uppercase rounded-pill hover:bg-gold-soft transition-colors duration-400 flex items-center justify-center gap-3 text-sm"
                >
                  <Send className="w-4 h-4" />
                  Submit Interest
                </button>

                <p className="text-center text-xs text-gold-muted/50 font-light">
                  All inquiries are handled with absolute discretion and
                  confidentiality.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
