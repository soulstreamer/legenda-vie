import { useState, useEffect, useRef, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import Lenis from 'lenis';
import { CartProvider } from '@/context/CartContext';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import AboutArtist from './sections/AboutArtist';
import Shop from './sections/Shop';
import Reviews from './sections/Reviews';
import Contact from './sections/Contact';
import Store from './pages/Store';
import ProductDetail from './pages/ProductDetail';
import Confidentialitate from './pages/legal/Confidentialitate';
import LivrareSiRetur from './pages/legal/LivrareSiRetur';
import TermeniSiConditii from './pages/legal/TermeniSiConditii';
import PoliticaCookies from './pages/legal/PoliticaCookies';
import Anpc from './pages/legal/Anpc';
import SolutionareaLitigiilor from './pages/legal/SolutionareaLitigiilor';
import IntroScreen from './components/IntroScreen';

function HomePage() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -180 });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-void text-white overflow-x-hidden">
      <Navbar onNavigate={handleNavigate} />
      <main className="relative z-10">
        <Hero onNavigate={handleNavigate} />
        <AboutArtist />
        <Shop />
        <Reviews />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const [introDone, setIntroDone] = useState(() => sessionStorage.getItem('introShown') !== null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleIntroFinish = () => {
    sessionStorage.setItem('introShown', 'true');
    setIntroDone(true);
  };

  return (
    <CartProvider>
      {!introDone && <IntroScreen onFinish={handleIntroFinish} />}
      <div style={{ opacity: introDone ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <CustomCursor />
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/store" element={<Store />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/confidentialitate" element={<Confidentialitate />} />
        <Route path="/livrare-si-retur" element={<LivrareSiRetur />} />
        <Route path="/termeni-si-conditii" element={<TermeniSiConditii />} />
        <Route path="/politica-cookies" element={<PoliticaCookies />} />
        <Route path="/anpc" element={<Anpc />} />
        <Route path="/solutionarea-litigiilor" element={<SolutionareaLitigiilor />} />
      </Routes>
      </div>
    </CartProvider>
  );
}
