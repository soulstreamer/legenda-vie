import { useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, Send, Clock, Building2, FileText } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const triggers: ScrollTrigger[] = [];

    const items = content.querySelectorAll('.contact-animate');
    items.forEach((item, i) => {
      const st = ScrollTrigger.create({
        trigger: item,
        start: 'top 88%',
        onEnter: () => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power2.out',
              delay: i * 0.1,
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
      id="contact"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32"
      style={{ background: '#050505', contentVisibility: 'auto' }}
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-deep-purple to-transparent opacity-60" />

      <div ref={contentRef} className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="contact-animate text-center mb-16 opacity-0">
          <span className="font-mono-label text-plum mb-4 block">Contactează-ne</span>
          <h2
            className="font-grotesk font-medium text-white"
            style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
            }}
          >
            <span className="text-gradient-purple">Contact</span>
          </h2>
          <p
            className="font-grotesk font-light text-mist mt-6 max-w-lg mx-auto"
            style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', lineHeight: 1.6 }}
          >
            Pentru comenzi, colaborări sau întrebări — suntem aici pentru tine.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="flex flex-col gap-8">
            {/* Google Map */}
            <div className="contact-animate opacity-0 w-full overflow-hidden" style={{ borderRadius: '4px', border: '1px solid rgba(75,0,130,0.2)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.123!2d26.043!3d44.427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f8e8e8e8e8e8%3A0x123456789abcdef!2sStrada%20Tolbei%2C%20Bucure%C8%99ti!5e0!3m2!1sro!2sro!4v1699900000000"
                width="100%"
                height="320"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(0.8)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Locație Hartă"
              />
            </div>

            {/* Company info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className="contact-animate opacity-0 p-5 transition-all duration-400 hover:border-[rgba(155,89,182,0.4)]"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(75,0,130,0.2)',
                  borderRadius: '4px',
                }}
              >
                <Building2 size={20} className="text-plum mb-3" />
                <p className="font-mono text-[10px] text-silver uppercase tracking-wider mb-1">Companie</p>
                <p className="font-grotesk font-medium text-white text-sm">XPLICIT APPAREL S.R.L</p>
              </div>

              <div
                className="contact-animate opacity-0 p-5 transition-all duration-400 hover:border-[rgba(155,89,182,0.4)]"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(75,0,130,0.2)',
                  borderRadius: '4px',
                }}
              >
                <FileText size={20} className="text-plum mb-3" />
                <p className="font-mono text-[10px] text-silver uppercase tracking-wider mb-1">C.I.F. / Reg. Com.</p>
                <p className="font-grotesk font-medium text-white text-sm">C.I.F: 52137320</p>
                <p className="font-grotesk font-medium text-white text-xs mt-1">J2025050849009</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                className="contact-animate opacity-0 p-5 transition-all duration-400 hover:border-[rgba(155,89,182,0.4)]"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(75,0,130,0.2)',
                  borderRadius: '4px',
                }}
              >
                <MapPin size={20} className="text-plum mb-3" />
                <p className="font-mono text-[10px] text-silver uppercase tracking-wider mb-1">Adresă</p>
                <p className="font-grotesk font-medium text-white text-sm">București, Sector 6</p>
                <p className="font-grotesk font-light text-mist text-xs mt-1">Str. Tolbei, Nr. 3, Bl. C50, Sc. A, Ap. 11</p>
              </div>

              <div
                className="contact-animate opacity-0 p-5 transition-all duration-400 hover:border-[rgba(155,89,182,0.4)] sm:col-span-2"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(75,0,130,0.2)',
                  borderRadius: '4px',
                }}
              >
                <Phone size={20} className="text-plum mb-3" />
                <p className="font-mono text-[10px] text-silver uppercase tracking-wider mb-1">Telefon</p>
                <div className="flex flex-col gap-1">
                  <a href="tel:+40751306600" className="font-grotesk font-medium text-white text-sm hover:text-plum transition-colors">
                    0751 306 600
                  </a>
                  <a href="tel:+407255446428" className="font-grotesk font-medium text-white text-sm hover:text-plum transition-colors">
                    0725 446 428
                  </a>
                </div>
                <a
                  href="tel:+40751306600"
                  className="inline-flex items-center gap-2 mt-3 font-mono text-[10px] text-white bg-gradient-to-r from-deep-purple to-imperial-purple px-4 py-2 transition-all duration-300 hover:shadow-[0_0_16px_rgba(75,0,130,0.5)]"
                >
                  <Phone size={12} />
                  Sună acum
                </a>
              </div>
            </div>

            <div
              className="contact-animate opacity-0 p-5 transition-all duration-400 hover:border-[rgba(155,89,182,0.4)]"
              style={{
                background: '#111111',
                border: '1px solid rgba(75,0,130,0.2)',
                borderRadius: '4px',
              }}
            >
              <Mail size={20} className="text-plum mb-3" />
              <p className="font-mono text-[10px] text-silver uppercase tracking-wider mb-1">Email</p>
              <a href="mailto:comenzi@xplicit.ro" className="font-grotesk font-medium text-white text-sm hover:text-plum transition-colors">
                comenzi@xplicit.ro
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div
            className="contact-animate opacity-0 p-8 lg:p-10"
            style={{
              background: '#111111',
              border: '1px solid rgba(75,0,130,0.2)',
              borderRadius: '4px',
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Send size={18} className="text-plum" />
              <h3 className="font-grotesk font-medium text-white text-xl">Trimite un mesaj</h3>
            </div>

            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] text-silver uppercase tracking-wider">Nume</label>
                  <input
                    type="text"
                    placeholder="Numele tău"
                    className="w-full px-4 py-3 bg-void text-white font-grotesk text-sm placeholder:text-dim outline-none transition-all duration-300 focus:border-plum"
                    style={{
                      border: '1px solid #444',
                      borderRadius: '4px',
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] text-silver uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 bg-void text-white font-grotesk text-sm placeholder:text-dim outline-none transition-all duration-300 focus:border-plum"
                    style={{
                      border: '1px solid #444',
                      borderRadius: '4px',
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-silver uppercase tracking-wider">Subiect</label>
                <input
                  type="text"
                  placeholder="Comandă / Colaborare / Altceva"
                  className="w-full px-4 py-3 bg-void text-white font-grotesk text-sm placeholder:text-dim outline-none transition-all duration-300 focus:border-plum"
                  style={{
                    border: '1px solid #444',
                    borderRadius: '4px',
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-silver uppercase tracking-wider">Mesaj</label>
                <textarea
                  rows={5}
                  placeholder="Mesajul tău..."
                  className="w-full px-4 py-3 bg-void text-white font-grotesk text-sm placeholder:text-dim outline-none transition-all duration-300 focus:border-plum resize-none"
                  style={{
                    border: '1px solid #444',
                    borderRadius: '4px',
                  }}
                />
              </div>

              <button type="submit" className="btn-primary mt-2 w-full sm:w-auto self-start">
                <Send size={16} />
                Trimite mesaj
              </button>
            </form>

            <div className="flex items-center gap-2 mt-6 pt-6 border-t border-dim">
              <Clock size={14} className="text-silver" />
              <p className="font-mono text-[10px] text-silver tracking-wider">
                De obicei răspundem în 24-48 de ore
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
