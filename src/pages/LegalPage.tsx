import { Link, useNavigate } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface LegalPageProps {
  title: string;
  children: React.ReactNode;
}

export default function LegalPage({ title, children }: LegalPageProps) {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-void text-white overflow-x-hidden">
      <Navbar onNavigate={(id) => navigate(`/#${id}`)} />
      <main className="relative z-10 pt-52 pb-24">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10">
          <Link
            to="/"
            className="inline-flex items-center gap-1 font-mono text-[10px] text-silver uppercase tracking-wider hover:text-plum transition-colors mb-8"
          >
            <ChevronLeft size={14} />
            Înapoi la pagina principală
          </Link>

          <h1
            className="font-grotesk font-medium text-white mb-10"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.0 }}
          >
            <span className="text-gradient-purple">{title}</span>
          </h1>

          <div
            className="font-grotesk font-light text-mist leading-relaxed space-y-5"
            style={{ fontSize: '15px', lineHeight: 1.8 }}
          >
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
