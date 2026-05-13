import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ShoppingBag, Play, ChevronDown, Youtube, Instagram, Music2, Facebook } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onNavigate: (id: string) => void;
}

export default function Hero({ onNavigate: _onNavigate }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bookContainerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const section = sectionRef.current;
    const textEl = textRef.current;
    if (!section || !textEl) return;

    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(
      textEl.querySelectorAll('.animate-item'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.15 }
    );

    return () => {
      tl.kill();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!bookContainerRef.current) return;
    const rect = bookContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateX(y * -12);
    setRotateY(x * 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col overflow-hidden"
      style={{ background: '#050505' }}
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero-bg.webp"
          alt=""
          className="w-full h-full object-cover opacity-60"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/70 via-[#050505]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 via-transparent to-[#050505]/20" />
      </div>

      <div
        className="absolute z-0 pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(75,0,130,0.15) 0%, transparent 70%)',
          top: '-10%',
          left: '-10%',
        }}
      />
      <div
        className="absolute z-0 pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(123,45,142,0.12) 0%, transparent 70%)',
          bottom: '-5%',
          right: '-5%',
        }}
      />

      <div className="flex-1 flex flex-col items-center justify-center">
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 lg:px-10 pt-24 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[70vh]">
          <div ref={textRef} className="flex flex-col gap-6 relative z-10 lg:z-auto">
            <div className="animate-item mt-8 lg:mt-12">
              <span className="font-mono-label text-plum">Artist Rap Român</span>
            </div>

            <h1
              className="animate-item font-grotesk font-bold text-white leading-[0.95]"
              style={{
                fontSize: 'clamp(48px, 9vw, 140px)',
                letterSpacing: '-0.04em',
              }}
            >
              LEGENDĂ
              <br />
              <span className="inline-block text-gradient-purple animate-text-glow relative after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-full after:bg-white/80 after:rounded-full">VIE</span>
            </h1>

            <p
              className="animate-item font-grotesk font-light text-mist max-w-lg"
              style={{
                fontSize: 'clamp(16px, 1.5vw, 20px)',
                lineHeight: 1.6,
              }}
            >
              Calea războinicului se împletește cu ritmurile străzii.
              O călătorie lirică prin onoare, luptă și triumf —
              unde spiritul străvechi al samuraiului se contopește cu cultura hip-hop modernă.
            </p>

            <div className="animate-item flex flex-wrap gap-4 mt-4">
              <button
                onClick={() => navigate('/store')}
                className="btn-primary group"
              >
                <ShoppingBag size={18} />
                <span>Mărfuri</span>
              </button>
              <a
                href="https://www.youtube.com/samurairomania"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost group"
              >
                <Play size={18} />
                <span>Ascultă acum</span>
              </a>
            </div>

            {/* Social icons */}
            <div className="animate-item flex items-center gap-4 mt-2">
              <a
                href="https://www.youtube.com/samurairomania"
                target="_blank"
                rel="noopener noreferrer"
                className="text-silver transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                aria-label="YouTube"
              >
                <Youtube size={22} />
              </a>
              <a
                href="https://www.instagram.com/samuraip13/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-silver transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                aria-label="Instagram"
              >
                <Instagram size={22} />
              </a>
              <a
                href="https://www.facebook.com/samurairomania"
                target="_blank"
                rel="noopener noreferrer"
                className="text-silver transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                aria-label="Facebook"
              >
                <Facebook size={22} />
              </a>
              <a
                href="https://open.spotify.com/artist/53NxLIQPf5FOH0309BMCzU"
                target="_blank"
                rel="noopener noreferrer"
                className="text-silver transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                aria-label="Spotify"
              >
                <Music2 size={22} />
              </a>
            </div>

            <div className="animate-item flex items-center gap-3 sm:gap-4 md:gap-8 mt-4">
              <div className="flex flex-col">
                <span className="font-grotesk font-semibold text-white text-base sm:text-lg md:text-2xl">50K+</span>
                <span className="font-mono-label text-silver mt-0.5 md:mt-1 text-[9px] sm:text-[10px] md:text-xs">Ascultători lunar</span>
              </div>
              <div className="w-px h-6 md:h-10 bg-dim" />
              <div className="flex flex-col">
                <span className="font-grotesk font-semibold text-white text-base sm:text-lg md:text-2xl">100+</span>
                <span className="font-mono-label text-silver mt-0.5 md:mt-1 text-[9px] sm:text-[10px] md:text-xs">Melodii lansate</span>
              </div>
              <div className="w-px h-6 md:h-10 bg-dim" />
              <div className="flex flex-col">
                <span className="font-grotesk font-semibold text-white text-base sm:text-lg md:text-2xl">11</span>
                <span className="font-mono-label text-silver mt-0.5 md:mt-1 text-[9px] sm:text-[10px] md:text-xs">Materiale</span>
              </div>
            </div>

          </div>

          <div
            ref={bookContainerRef}
            className="absolute inset-0 z-0 flex items-start justify-center pt-16 pointer-events-none
                       lg:relative lg:z-auto lg:items-center lg:justify-center lg:pt-0 lg:perspective-1200"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative preserve-3d animate-book-float opacity-70 lg:opacity-100">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-10">
                <span className="font-script text-plum opacity-80 hidden lg:block">Manuscris</span>
              </div>

              <div
                className="preserve-3d animate-book-rotate"
                style={{
                  transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                <img
                  src="/assets/book-isolated.webp"
                  alt="Manuscris Book"
                  fetchPriority="high"
                  className="w-[200px] sm:w-[280px] lg:w-[400px] h-auto object-contain"
                  style={{
                    filter: 'drop-shadow(0 0 30px rgba(75,0,130,0.4)) drop-shadow(0 20px 40px rgba(0,0,0,0.8))',
                  }}
                />
              </div>

              <div
                className="absolute inset-0 -z-10 blur-3xl opacity-40"
                style={{
                  background: 'radial-gradient(circle, rgba(75,0,130,0.5) 0%, transparent 70%)',
                  transform: 'scale(1.5)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="font-mono-label text-silver">Derulează</span>
          <ChevronDown size={16} className="text-plum" />
        </div>
      </div>
      </div>
    </section>
  );
}
