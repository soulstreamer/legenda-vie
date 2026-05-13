import { useRef, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: 'Alex M.',
    role: 'Producător Muzical',
    rating: 5,
    text: 'Legenda Vie aduce o energie brută care transcende scena rap obișnuită. Fuziunea dintre filozofia samurai și poezia stradală creează ceva unic. Fiecare piesă lovește ca o lovitură de katana — precisă, puternică și de neuitat.',
    avatar: 'A',
  },
  {
    name: 'Maria S.',
    role: 'Prezentatoare Radio, Kiss FM',
    rating: 5,
    text: 'Urmăresc scena hip-hop românească de peste un deceniu, iar Legenda Vie se remarcă drept un artist autentic. Profunzimea lirică, calitatea producției și inconfundabila estetică samurai fac din fiecare lansare un eveniment. România avea nevoie de această voce.',
    avatar: 'M',
  },
  {
    name: 'Andrei K.',
    role: 'Revista Underground',
    rating: 5,
    text: 'Manuscris nu este doar un album — este un manifest. Legenda Vie construiește narațiuni care îmbină codurile străvechi ale războinicilor cu luptele vieții moderne. Marfa e și ea senzațională, fiecare piesă pare artă vestimentară. Respect pentru samurai.',
    avatar: 'A',
  },
];

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];

    // Section title animation
    const titleEl = section.querySelector('.section-title');
    if (titleEl) {
      gsap.fromTo(
        titleEl,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleEl,
            start: 'top 85%',
          },
        }
      );
    }

    // Card animations with stagger
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: 'power2.out',
              delay: i * 0.15,
            }
          );
        },
        once: true,
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32"
      style={{ background: '#0A0A0A', contentVisibility: 'auto' }}
    >
      {/* Neon line divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-deep-purple to-transparent opacity-60" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="section-title text-center mb-16 opacity-0">
          <span className="font-mono-label text-plum mb-4 block">Testimoniale</span>
          <h2
            className="font-grotesk font-medium text-white"
            style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
            }}
          >
            Ce spun <span className="text-gradient-purple">oamenii</span>
          </h2>
          <p
            className="font-grotesk font-light text-mist mt-6 max-w-lg mx-auto"
            style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', lineHeight: 1.6 }}
          >
            Voci din comunitate — artiști, critici și fani care rezonează cu spiritul samurai.
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative opacity-0"
            >
              <div
                className="relative h-full p-8 transition-all duration-500 hover:border-[rgba(155,89,182,0.4)] hover:shadow-[0_0_30px_rgba(75,0,130,0.15)]"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(75,0,130,0.2)',
                  borderRadius: '4px',
                }}
              >
                {/* Quote icon */}
                <Quote size={28} className="text-deep-purple mb-6 opacity-60" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} size={16} className="text-plum fill-plum" />
                  ))}
                </div>

                {/* Review text */}
                <p
                  className="font-grotesk font-light text-mist mb-8"
                  style={{ fontSize: '15px', lineHeight: 1.7 }}
                >
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-dim">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-grotesk font-semibold text-white text-sm"
                    style={{ background: 'linear-gradient(135deg, #4B0082, #7B2D8E)' }}
                  >
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-grotesk font-medium text-white text-sm">
                      {review.name}
                    </p>
                    <p className="font-mono text-[10px] text-silver tracking-wider uppercase">
                      {review.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
