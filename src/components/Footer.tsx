import { Instagram, Youtube, Music2, Facebook } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router';

function AnimatedTextLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let glowPhase = 0;

    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      glowPhase = elapsed;

      const text = container.querySelector('.legend-text') as HTMLSpanElement | null;
      if (text) {
        const floatY = Math.sin(elapsed * 1.1) * 6;
        text.style.transform = `translateY(${floatY * 0.5}px)`;
        text.style.opacity = `${0.7 + Math.sin(glowPhase * 0.8) * 0.3}`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center mb-4">
      <h2
        className="legend-text font-grotesk font-bold text-center"
        style={{
          fontSize: 'clamp(48px, 8vw, 120px)',
          letterSpacing: '0.12em',
          zIndex: 1,
          textShadow: '0 0 30px rgba(155,89,182,0.4), 0 0 60px rgba(75,0,130,0.3)',
        }}
      >
        <span className="text-white">LEGENDĂ </span>
        <span className="text-plum">VIE</span>
      </h2>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-void border-t border-[rgba(75,0,130,0.2)]">
      <div className="max-w-[1400px] mx-auto pt-4 pb-10 px-6 lg:px-10">
        <AnimatedTextLogo />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-deep-purple to-transparent mb-10 opacity-60" />

        {/* Legal links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
          <Link to="/confidentialitate" className="font-mono text-[10px] text-silver uppercase tracking-wider hover:text-plum transition-colors">
            Confidențialitate
          </Link>
          <Link to="/livrare-si-retur" className="font-mono text-[10px] text-silver uppercase tracking-wider hover:text-plum transition-colors">
            Livrare și Retur
          </Link>
          <Link to="/termeni-si-conditii" className="font-mono text-[10px] text-silver uppercase tracking-wider hover:text-plum transition-colors">
            Termeni și Condiții
          </Link>
          <Link to="/politica-cookies" className="font-mono text-[10px] text-silver uppercase tracking-wider hover:text-plum transition-colors">
            Politica de Cookies
          </Link>
          <Link to="/anpc" className="font-mono text-[10px] text-silver uppercase tracking-wider hover:text-plum transition-colors">
            ANPC
          </Link>
          <Link to="/solutionarea-litigiilor" className="font-mono text-[10px] text-silver uppercase tracking-wider hover:text-plum transition-colors">
            Soluționarea Litigiilor
          </Link>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-mono text-[11px] text-silver tracking-wider">
            © 2025 XPLICIT APPAREL S.R.L — Toate drepturile rezervate
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://www.facebook.com/samurairomania"
              target="_blank"
              rel="noopener noreferrer"
              className="text-silver transition-all duration-300 hover:text-plum hover:drop-shadow-[0_0_8px_rgba(155,89,182,0.5)]"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/samuraip13/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-silver transition-all duration-300 hover:text-plum hover:drop-shadow-[0_0_8px_rgba(155,89,182,0.5)]"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.youtube.com/samurairomania"
              target="_blank"
              rel="noopener noreferrer"
              className="text-silver transition-all duration-300 hover:text-plum hover:drop-shadow-[0_0_8px_rgba(155,89,182,0.5)]"
              aria-label="YouTube"
            >
              <Youtube size={20} />
            </a>
            <a
              href="https://open.spotify.com/artist/53NxLIQPf5FOH0309BMCzU"
              target="_blank"
              rel="noopener noreferrer"
              className="text-silver transition-all duration-300 hover:text-plum hover:drop-shadow-[0_0_8px_rgba(155,89,182,0.5)]"
              aria-label="Spotify"
            >
              <Music2 size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
