import { useEffect, useState } from 'react';
import { Timer } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2026-12-31T23:59:59').getTime();

    function calculateTimeLeft(): TimeLeft {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const el = document.getElementById('countdown');
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section
      id="countdown"
      className="relative w-full py-24 lg:py-32"
      style={{ zIndex: 2 }}
    >
      <div className="w-full px-6 lg:px-16">
        <div
          className={`glass-luxury rounded-2xl p-10 lg:p-16 max-w-5xl mx-auto transition-all duration-1000 ${
            visible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <Timer className="w-5 h-5 text-gold-champagne" />
            <span className="text-xs font-light tracking-[0.3em] uppercase text-gold-muted">
              Launching End of 2026
            </span>
          </div>

          <h2 className="text-center text-display-md text-white mb-4">
            The Wait for{' '}
            <span className="text-gradient-gold">Excellence</span>
          </h2>

          <p className="text-center text-sm font-light text-gold-soft/60 max-w-lg mx-auto mb-12 tracking-wide">
            An exclusive ecosystem is being curated for the select few who
            demand nothing less than extraordinary.
          </p>

          {/* Timer Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {timeBlocks.map((block) => (
              <div
                key={block.label}
                className="border-gold-glow rounded-xl p-6 lg:p-8 text-center"
              >
                <div className="text-4xl lg:text-6xl font-display font-bold text-gold-champagne mb-2 tabular-nums">
                  {String(block.value).padStart(2, '0')}
                </div>
                <div className="text-xs tracking-[0.2em] uppercase text-gold-muted">
                  {block.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
