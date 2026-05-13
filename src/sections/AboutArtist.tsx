import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutArtist() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.about-animate');
    const triggers: ScrollTrigger[] = [];

    items.forEach((item, i) => {
      const st = ScrollTrigger.create({
        trigger: item,
        start: 'top 88%',
        onEnter: () => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: i * 0.15 }
          );
        },
        once: true,
      });
      triggers.push(st);
    });

    return () => triggers.forEach(st => st.kill());
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32"
      style={{ background: '#050505', contentVisibility: 'auto' }}
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-deep-purple to-transparent opacity-60" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image card with pulsing white light */}
          <div className="about-animate opacity-0 flex justify-center">
            <div
              className="relative group"
              style={{ perspective: '800px' }}
            >
              {/* Pulsing white light glow */}
              <div
                className="absolute -inset-4 rounded-lg opacity-60 animate-pulse-glow-white"
                style={{
                  background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
              {/* Image card */}
              <div
                className="relative overflow-hidden"
                style={{
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '4px',
                  boxShadow: '0 0 40px rgba(255,255,255,0.08)',
                }}
              >
                <img
                  src="/assets/samuraiclub.jpg"
                  alt="Samurai — Legendă Vie"
                  className="w-[320px] sm:w-[400px] h-auto object-contain"
                  style={{
                    background: '#0A0A0A',
                    filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.1))',
                  }}
                />
                {/* Overlay shimmer */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right: Bio text */}
          <div className="flex flex-col gap-6">
            <div className="about-animate opacity-0">
              <span className="font-mono-label text-plum">Artist Spotlight</span>
            </div>

            <h2
              className="about-animate opacity-0 font-grotesk font-medium text-white"
              style={{ fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '-0.03em', lineHeight: 1.0 }}
            >
              <span className="text-gradient-purple">Samurai</span>
              <br />
              <span className="text-white" style={{ fontSize: 'clamp(18px, 2.5vw, 32px)' }}>
                Legendă Vie
              </span>
            </h2>

            <div className="about-animate opacity-0 w-12 h-0.5 bg-gradient-to-r from-plum to-deep-purple" />

            <p
              className="about-animate opacity-0 font-grotesk font-light text-mist"
              style={{ fontSize: '15px', lineHeight: 1.7 }}
            >
              Născut în Constanța, în anul revoluției, Samurai — supranumit de ascultători
              „Legendă Vie" — reprezintă label-ul Paranoia13 de peste 10 ani. Absolvent al
              facultății de Arte și Ilustrație din Coventry, UK, îmbină arta vizuală cu
              hip-hop-ul într-un mod unic. Din 2006 până astăzi, a conturat 11 materiale
              discografice (7 albume solo, 3 colaborări, 2 compilații), iar muzica lui
              străbate străzile României cu mesaje brute despre viață, luptă și triumf.
            </p>

            {/* Stats */}
            <div className="about-animate opacity-0 flex items-center gap-3 sm:gap-4 md:gap-8 mt-2">
              <div className="flex flex-col">
                <span className="font-grotesk font-semibold text-white text-sm sm:text-base md:text-xl">11</span>
                <span className="font-mono-label text-silver text-[9px] sm:text-[10px] md:text-xs">Materiale</span>
              </div>
              <div className="w-px h-5 md:h-8 bg-dim" />
              <div className="flex flex-col">
                <span className="font-grotesk font-semibold text-white text-sm sm:text-base md:text-xl">100+</span>
                <span className="font-mono-label text-silver text-[9px] sm:text-[10px] md:text-xs">Melodii</span>
              </div>
              <div className="w-px h-5 md:h-8 bg-dim" />
              <div className="flex flex-col">
                <span className="font-grotesk font-semibold text-white text-sm sm:text-base md:text-xl">10+</span>
                <span className="font-mono-label text-silver text-[9px] sm:text-[10px] md:text-xs">Ani Paranoia13</span>
              </div>
            </div>

            {/* Quote card */}
            <div
              className="about-animate opacity-0 relative p-6 mt-4 overflow-hidden"
              style={{
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '4px',
              }}
            >
              {/* Subtle white glow behind quote */}
              <div
                className="absolute -inset-10 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.06) 0%, transparent 60%)',
                }}
              />
              <div className="relative z-10">
                <p
                  className="font-grotesk font-light text-white"
                  style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.3, letterSpacing: '-0.02em' }}
                >
                  „Nu-s poet, dar plang foile"
                </p>
                <p className="font-mono text-[10px] text-silver mt-3 uppercase tracking-wider">
                  — Samurai, EP 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
