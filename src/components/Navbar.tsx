import { useEffect, useState, useCallback, Fragment } from 'react';
import { Link, useLocation } from 'react-router';
import { ShoppingBag, Menu, X } from 'lucide-react';
import CartDrawer from './CartDrawer';

interface NavbarProps {
  onNavigate: (id: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigate(id);
  }, [onNavigate]);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
      style={{
        height: 'clamp(120px, 12vw, 180px)',
        background: scrolled ? 'rgba(5,5,5,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(75,0,130,0.15)' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between px-6 lg:px-10">
        {/* Desktop left menu */}
        <div className="hidden md:flex items-center gap-8">
          {isHome && [{ label: 'Acasă', id: 'hero' }, { label: 'Artist', id: 'about' }, { label: 'Magazin', id: 'shop' }].map((item, i) => (
            <Fragment key={item.id}>
              {i > 0 && <span className="w-px h-3 bg-white/20" />}
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className="font-mono text-xs uppercase tracking-[0.08em] text-silver transition-all duration-300 hover:text-white hover:[text-shadow:0_0_12px_rgba(155,89,182,0.6)] relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-plum after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {item.label}
              </a>
            </Fragment>
          ))}
          {!isHome && (
            <>
              <Link
                to="/"
                className="font-mono text-xs uppercase tracking-[0.08em] text-silver transition-all duration-300 hover:text-white hover:[text-shadow:0_0_12px_rgba(155,89,182,0.6)] relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-plum after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                Acasă
              </Link>
              <span className="w-px h-3 bg-white/20" />
              <Link
                to="/store"
                className="font-mono text-xs uppercase tracking-[0.08em] text-silver transition-all duration-300 hover:text-white hover:[text-shadow:0_0_12px_rgba(155,89,182,0.6)] relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-plum after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                Magazin
              </Link>
            </>
          )}
        </div>

        {/* Desktop center logo */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
          {isHome ? (
            <a
              href="#hero"
              onClick={(e) => handleClick(e, 'hero')}
              className="block transition-all duration-300 hover:[filter:drop-shadow(0_0_24px_rgba(155,89,182,0.6))_drop-shadow(0_0_48px_rgba(75,0,130,0.5))]"
            >
              <img
                src="/assets/samurailogo.webp"
                alt="Samurai Clothing Logo"
                fetchPriority="high"
                style={{
                  height: '160px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 12px rgba(155,89,182,0.4)) drop-shadow(0 0 30px rgba(75,0,130,0.5))',
                }}
              />
              <div className="text-center -mt-1 relative inline-block w-full">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white">Ultimul Samurai</span>
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-[80%] h-[0.5px] bg-white/60" />
              </div>
            </a>
          ) : (
            <Link
              to="/"
              className="block transition-all duration-300 hover:[filter:drop-shadow(0_0_24px_rgba(155,89,182,0.6))_drop-shadow(0_0_48px_rgba(75,0,130,0.5))]"
            >
              <img
                src="/assets/samurailogo.webp"
                alt="Samurai Clothing Logo"
                fetchPriority="high"
                style={{
                  height: '160px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 12px rgba(155,89,182,0.4)) drop-shadow(0 0 30px rgba(75,0,130,0.5))',
                }}
              />
              <div className="text-center -mt-1 relative inline-block w-full">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white">Ultimul Samurai</span>
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-[80%] h-[0.5px] bg-white/60" />
              </div>
            </Link>
          )}
        </div>

        {/* Desktop right menu */}
        <div className="hidden md:flex items-center gap-6">
          {isHome && (
            <>
              <a
                href="#reviews"
                onClick={(e) => handleClick(e, 'reviews')}
                className="font-mono text-xs uppercase tracking-[0.08em] text-silver transition-all duration-300 hover:text-white hover:[text-shadow:0_0_12px_rgba(155,89,182,0.6)] relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-plum after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                Testimoniale
              </a>
              <span className="w-px h-3 bg-white/20" />
              <a
                href="#contact"
                onClick={(e) => handleClick(e, 'contact')}
                className="font-mono text-xs uppercase tracking-[0.08em] text-silver transition-all duration-300 hover:text-white hover:[text-shadow:0_0_12px_rgba(155,89,182,0.6)] relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-plum after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                Contact
              </a>
            </>
          )}
          <CartDrawer />
          <Link
            to="/store"
            className="font-mono text-xs uppercase tracking-[0.08em] text-white bg-gradient-to-r from-deep-purple to-imperial-purple px-5 py-2 transition-all duration-300 hover:shadow-[0_0_16px_rgba(75,0,130,0.5)] flex items-center gap-2"
          >
            <ShoppingBag size={14} />
            Magazin
          </Link>
        </div>

        {/* Mobile layout: logo left, cart+shop right */}
        <div className="md:hidden flex items-center justify-between w-full">
          {isHome ? (
            <a
              href="#hero"
              onClick={(e) => handleClick(e, 'hero')}
              className="transition-all duration-300 hover:[filter:drop-shadow(0_0_24px_rgba(155,89,182,0.6))_drop-shadow(0_0_48px_rgba(75,0,130,0.5))]"
            >
              <img
                src="/assets/samurailogo.webp"
                alt="Samurai Clothing Logo"
                style={{
                  height: '96px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 12px rgba(155,89,182,0.4)) drop-shadow(0 0 30px rgba(75,0,130,0.5))',
                }}
              />
            </a>
          ) : (
            <Link
              to="/"
              className="block transition-all duration-300 hover:[filter:drop-shadow(0_0_24px_rgba(155,89,182,0.6))_drop-shadow(0_0_48px_rgba(75,0,130,0.5))]"
            >
              <img
                src="/assets/samurailogo.webp"
                alt="Samurai Clothing Logo"
                style={{
                  height: '96px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 12px rgba(155,89,182,0.4)) drop-shadow(0 0 30px rgba(75,0,130,0.5))',
                }}
              />
            </Link>
          )}
          <div className="flex items-center gap-1">
            <Link
              to="/store"
              className="font-mono text-xs uppercase tracking-[0.08em] text-white bg-gradient-to-r from-deep-purple to-imperial-purple px-3 py-1.5 transition-all duration-300 hover:shadow-[0_0_16px_rgba(75,0,130,0.5)] flex items-center gap-1.5"
            >
              <ShoppingBag size={12} />
              Magazin
            </Link>
            <CartDrawer />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-silver hover:text-white transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 z-40 bg-void/95 backdrop-blur-md"
            style={{ top: 'clamp(120px, 12vw, 180px)' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <nav className="flex flex-col items-center justify-center gap-0 h-full" onClick={(e) => e.stopPropagation()}>
              {isHome ? (
                <>
                  <a
                    href="#hero"
                    onClick={(e) => { handleClick(e, 'hero'); setMobileMenuOpen(false); }}
                    className="font-grotesk text-2xl text-white hover:text-plum transition-colors py-5"
                  >
                    Acasă
                  </a>
                  <div className="w-24 h-px bg-gradient-to-r from-transparent via-plum to-transparent" />
                  <a
                    href="#about"
                    onClick={(e) => { handleClick(e, 'about'); setMobileMenuOpen(false); }}
                    className="font-grotesk text-2xl text-white hover:text-plum transition-colors py-5"
                  >
                    Artist
                  </a>
                  <div className="w-24 h-px bg-gradient-to-r from-transparent via-plum to-transparent" />
                  <Link
                    to="/store"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-grotesk text-2xl text-white hover:text-plum transition-colors py-5"
                  >
                    Magazin
                  </Link>
                  <div className="w-24 h-px bg-gradient-to-r from-transparent via-plum to-transparent" />
                  <a
                    href="#reviews"
                    onClick={(e) => { handleClick(e, 'reviews'); setMobileMenuOpen(false); }}
                    className="font-grotesk text-2xl text-white hover:text-plum transition-colors py-5"
                  >
                    Testimoniale
                  </a>
                  <div className="w-24 h-px bg-gradient-to-r from-transparent via-plum to-transparent" />
                  <a
                    href="#contact"
                    onClick={(e) => { handleClick(e, 'contact'); setMobileMenuOpen(false); }}
                    className="font-grotesk text-2xl text-white hover:text-plum transition-colors py-5"
                  >
                    Contact
                  </a>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-grotesk text-2xl text-white hover:text-plum transition-colors py-5"
                  >
                    Acasă
                  </Link>
                  <div className="w-24 h-px bg-gradient-to-r from-transparent via-plum to-transparent" />
                  <Link
                    to="/store"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-grotesk text-2xl text-white hover:text-plum transition-colors py-5"
                  >
                    Magazin
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
}
