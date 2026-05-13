import { useRef, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { ShoppingBag, ChevronRight, Shirt, Watch, LayoutGrid, Package, Disc3, Image } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { categories, products } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

export default function Store() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>(searchParams.get('category') || 'all');
  const navigate = useNavigate();

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.store-animate');
    const triggers: ScrollTrigger[] = [];

    items.forEach((item, i) => {
      const st = ScrollTrigger.create({
        trigger: item,
        start: 'top 88%',
        onEnter: () => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: i * 0.08 }
          );
        },
        once: true,
      });
      triggers.push(st);
    });

    return () => triggers.forEach(st => st.kill());
  }, [activeCategory]);

  return (
    <div className="relative min-h-screen bg-void text-white overflow-x-hidden">
      <Navbar onNavigate={(id) => navigate(`/#${id}`)} />

      <main ref={sectionRef} className="relative z-10 pt-52 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {/* Header */}
          <div className="store-animate text-center mb-12 opacity-0">
            <span className="font-mono-label text-plum mb-4 block">Marfă Oficială</span>
            <h1
              className="font-grotesk font-medium text-white"
              style={{ fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '-0.03em', lineHeight: 1.0 }}
            >
              Magazin <span className="text-gradient-purple">Samurai</span>
            </h1>
            <p className="font-grotesk font-light text-mist mt-6 max-w-lg mx-auto" style={{ fontSize: 'clamp(16px, 1.5vw, 18px)' }}>
              Poartă legenda. Marfă oficială inspirată de calea războinicului.
            </p>
          </div>

          {/* Category tabs */}
          <div className="store-animate opacity-0 flex flex-wrap justify-center gap-3 mb-12">
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

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((product, i) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className={`store-animate ${i >= 3 ? 'opacity-0' : ''} group block`}
              >
                <div
                  className="overflow-hidden mb-4 transition-all duration-500 bg-[#111111] border border-[rgba(75,0,130,0.2)] rounded-[4px] group-hover:border-plum group-hover:shadow-[0_0_20px_rgba(155,89,182,0.25)]"
                >
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
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
                    <div className="flex items-center gap-1 mt-4 text-plum font-mono text-[10px] uppercase tracking-wider transition-all duration-300 group-hover:gap-2">
                      <span>Vezi produsul</span>
                      <ChevronRight size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <ShoppingBag size={48} className="mx-auto mb-4 text-dim" />
              <p className="font-grotesk text-mist">Nu sunt produse în această categorie.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
