import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ShoppingBag, ExternalLink, Shirt, Watch, LayoutGrid, Package, Disc3, Image } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products, categories } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

export default function Shop() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const triggers: ScrollTrigger[] = [];
    const items = content.querySelectorAll('.shop-animate');

    items.forEach((item, i) => {
      const st = ScrollTrigger.create({
        trigger: item,
        start: 'top 88%',
        onEnter: () => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: i * 0.12 }
          );
        },
        once: true,
      });
      triggers.push(st);
    });

    return () => triggers.forEach((st) => st.kill());
  }, [activeCategory]);

  return (
    <section
      id="shop"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32"
      style={{ background: '#0A0A0A', contentVisibility: 'auto' }}
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-deep-purple to-transparent opacity-60" />

      <div ref={contentRef} className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="shop-animate text-center mb-16 opacity-0">
          <span className="font-mono-label text-plum mb-4 block">Marfă</span>
          <h2
            className="font-grotesk font-medium text-white"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '-0.03em', lineHeight: 1.0 }}
          >
            Magazin <span className="text-gradient-purple">Samurai</span>
          </h2>
          <p
            className="font-grotesk font-light text-mist mt-6 max-w-lg mx-auto"
            style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', lineHeight: 1.6 }}
          >
            Poartă legenda. Marfă oficială inspirată de calea războinicului.
          </p>
        </div>

        {/* Offer banner */}
        <div className="shop-animate opacity-0 mb-12 overflow-hidden" style={{ borderRadius: '4px', border: '1px solid rgba(155,89,182,0.3)' }}>
          <div
            className="relative p-6 lg:p-8 flex flex-col lg:flex-row items-center gap-6"
            style={{ background: 'linear-gradient(135deg, rgba(75,0,130,0.2) 0%, rgba(10,10,10,0.8) 50%, rgba(75,0,130,0.15) 100%)' }}
          >
            <img
              src="/assets/samuraioferta.webp"
              alt="Ofertă Specială" loading="lazy"
              className="flex-shrink-0 w-40 sm:w-48 lg:w-64 h-auto object-contain animate-pulse-glow"
              style={{ filter: 'drop-shadow(0 0 12px rgba(155,89,182,0.4))' }}
            />
            <div className="flex-1 text-center lg:text-left">
              <h3 className="font-grotesk font-medium text-white text-xl lg:text-2xl mb-2">
                Ofertă Specială
              </h3>
              <p className="font-grotesk font-light text-mist" style={{ fontSize: '15px', lineHeight: 1.7 }}>
                La oricare <span className="text-plum font-semibold">2 produse textile</span> comandate,
                primești <span className="text-plum font-semibold">CD cadou</span>!
              </p>
              <p className="font-mono text-[10px] text-silver mt-2 tracking-wider">
                Ofertă valabilă în limita stocului disponibil
              </p>
            </div>
            <button
              onClick={() => navigate('/store?category=hoodies')}
              className="btn-primary text-sm whitespace-nowrap flex-shrink-0"
            >
              <ShoppingBag size={16} />
              Cumpără acum
            </button>
          </div>
        </div>

        {/* Category tabs */}
        <div className="shop-animate opacity-0 flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`font-mono text-xs uppercase tracking-[0.08em] px-5 py-2 transition-all duration-300 inline-flex items-center gap-2 ${
              activeCategory === 'all'
                ? 'text-white bg-gradient-to-r from-deep-purple to-imperial-purple'
                : 'text-silver border border-[rgba(75,0,130,0.2)] hover:border-plum hover:text-white'
            }`}
          >
            <LayoutGrid size={14} />
            Toate
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`font-mono text-xs uppercase tracking-[0.08em] px-5 py-2 transition-all duration-300 inline-flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'text-white bg-gradient-to-r from-deep-purple to-imperial-purple'
                  : 'text-silver border border-[rgba(75,0,130,0.2)] hover:border-plum hover:text-white'
              }`}
            >
              {cat.id === 'hoodies' && <Shirt size={14} />}
              {cat.id === 'tshirts' && <Shirt size={14} />}
              {cat.id === 'blouses' && <Shirt size={14} />}
              {cat.id === 'jackets' && <Shirt size={14} />}
              {cat.id === 'accessories' && <Watch size={14} />}
              {cat.id === 'mystery-box' && <Package size={14} />}
              {cat.id === 'albums' && <Disc3 size={14} />}
              {cat.id === 'artprints' && <Image size={14} />}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product grid — show 6 items (2 rows) on load */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {filtered.slice(0, 6).map((product, i) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className={`shop-animate ${i >= (isMobile ? 3 : 6) ? 'opacity-0' : ''} group cursor-pointer`}
            >
              <div className="overflow-hidden transition-all duration-500 bg-[#111111] border border-[rgba(75,0,130,0.2)] rounded-[4px] group-hover:border-plum group-hover:shadow-[0_0_20px_rgba(155,89,182,0.25)]">
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src={product.images[0]}
                    alt={product.name} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-plum/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-grotesk font-medium text-white text-sm">{product.name}</p>
                      <p className="font-mono text-[10px] text-silver mt-1 uppercase tracking-wider">{product.category}</p>
                    </div>
                    <span className="font-grotesk font-semibold text-plum text-sm whitespace-nowrap">
                      {product.price.toFixed(2).replace('.', ',')} Lei
                    </span>
                  </div>
                  <p className="font-grotesk font-light text-mist text-xs mt-3 line-clamp-2">
                    {product.shortDescription}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="shop-animate opacity-0 text-center">
          <button onClick={() => navigate('/store')} className="btn-primary group">
            <ExternalLink size={18} />
            <span>Magazin complet</span>
          </button>
          <p className="font-mono text-[10px] text-silver mt-4 tracking-wider">
            Checkout securizat · Livrare în întreaga lume
          </p>
        </div>
      </div>
    </section>
  );
}
