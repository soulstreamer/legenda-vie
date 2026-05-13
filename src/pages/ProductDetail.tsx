import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { ShoppingBag, ChevronLeft, Minus, Plus, Check, Truck, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = products.find(p => p.id === id);

  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0]
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0]?.hex
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!product) return;
    setSelectedSize(product.sizes?.[0]);
    setSelectedColor(product.colors?.[0]?.hex);
    setQuantity(1);
    setActiveImage(0);
    setAdded(false);
  }, [id, product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="relative min-h-screen bg-void text-white overflow-x-hidden flex items-center justify-center">
        <div className="text-center">
          <p className="font-grotesk text-mist text-lg mb-4">Produs negăsit</p>
          <Link to="/store" className="btn-primary text-sm">
            Înapoi la magazin
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const isApparel = product.category === 'hoodies' || product.category === 'tshirts';

  return (
    <div className="relative min-h-screen bg-void text-white overflow-x-hidden">
      <Navbar onNavigate={(id) => navigate(`/#${id}`)} />

      <main className="relative z-10 pt-52 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {/* Breadcrumb */}
          <Link
            to="/store"
            className="inline-flex items-center gap-1 font-mono text-[10px] text-silver uppercase tracking-wider hover:text-plum transition-colors mb-8"
          >
            <ChevronLeft size={14} />
            Înapoi la magazin
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Images */}
            <div>
              <div
                className="aspect-[4/5] overflow-hidden mb-4"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(75,0,130,0.2)',
                  borderRadius: '4px',
                }}
              >
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className="w-20 h-20 overflow-hidden transition-all duration-300"
                      style={{
                        background: '#111111',
                        border: i === activeImage ? '2px solid #9B59B6' : '1px solid rgba(75,0,130,0.2)',
                        borderRadius: '4px',
                      }}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-mono text-[10px] text-plum uppercase tracking-wider mb-2">
                  {product.category}
                </p>
                <h1
                  className="font-grotesk font-medium text-white"
                  style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.03em', lineHeight: 1.0 }}
                >
                  {product.name}
                </h1>
                <p className="font-grotesk font-semibold text-2xl text-plum mt-4">
                  {product.price.toFixed(2).replace('.', ',')} Lei
                </p>
              </div>

              <p
                className="font-grotesk font-light text-mist"
                style={{ fontSize: '15px', lineHeight: 1.7 }}
              >
                {product.description}
              </p>

              <div className="w-full h-px bg-gradient-to-r from-deep-purple to-transparent opacity-40" />

              {/* Color selection */}
              {product.colors && (
                <div>
                  <p className="font-mono text-[10px] text-silver uppercase tracking-wider mb-3">
                    Culoare {selectedColor && (
                      <span className="text-white ml-1">
                        {product.colors.find(c => c.hex === selectedColor)?.name}
                      </span>
                    )}
                  </p>
                  <div className="flex gap-3">
                    {product.colors.map(color => (
                      <button
                        key={color.hex}
                        onClick={() => setSelectedColor(color.hex)}
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                          background: color.hex,
                          border: selectedColor === color.hex ? '2px solid #9B59B6' : '2px solid transparent',
                          boxShadow: selectedColor === color.hex ? '0 0 12px rgba(155,89,182,0.4)' : 'none',
                        }}
                      >
                        {selectedColor === color.hex && (
                          <Check size={16} className={color.hex === '#0a0a0a' || color.hex === '#1a1a3e' || color.hex === '#4a1a1a' || color.hex === '#3a3a3a' ? 'text-white' : 'text-black'} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size selection (apparel only) */}
              {isApparel && product.sizes && (
                <div>
                  <p className="font-mono text-[10px] text-silver uppercase tracking-wider mb-3">
                    Mărime: <span className="text-white">{selectedSize}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className="font-mono text-xs px-5 py-2 transition-all duration-300"
                        style={{
                          background: selectedSize === size ? 'linear-gradient(135deg, #4B0082, #7B2D8E)' : '#111111',
                          border: selectedSize === size ? '1px solid #9B59B6' : '1px solid rgba(75,0,130,0.2)',
                          color: selectedSize === size ? '#F5F0EB' : '#8899A6',
                          borderRadius: '4px',
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <p className="font-mono text-[10px] text-silver uppercase tracking-wider mb-3">Cantitate</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-2 bg-ink border border-[rgba(75,0,130,0.2)] hover:border-plum transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-grotesk text-white text-lg w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-2 bg-ink border border-[rgba(75,0,130,0.2)] hover:border-plum transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                className={`btn-primary w-full transition-all duration-300 ${
                  added ? 'bg-gradient-to-r from-green-600 to-green-500 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : ''
                }`}
              >
                {added ? (
                  <>
                    <Check size={18} />
                    Adăugat în coș!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    Adaugă în coș — {(product.price * quantity).toFixed(2).replace('.', ',')} Lei
                  </>
                )}
              </button>

              {/* Shipping info */}
              <div className="flex flex-col gap-3 p-4" style={{ background: '#111111', border: '1px solid rgba(75,0,130,0.2)', borderRadius: '4px' }}>
                <div className="flex items-center gap-3">
                  <Truck size={16} className="text-plum flex-shrink-0" />
                  <p className="font-mono text-[10px] text-silver tracking-wider">
                    Transport: <span className="text-white">19,99 Lei</span> — livrare în 2-5 zile lucrătoare
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Shield size={16} className="text-plum flex-shrink-0" />
                  <p className="font-mono text-[10px] text-silver tracking-wider">
                    Retur gratuit în 14 zile
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
