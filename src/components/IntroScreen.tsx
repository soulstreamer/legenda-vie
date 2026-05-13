import { useEffect, useState } from 'react';

interface IntroScreenProps {
  onFinish: () => void;
}

export default function IntroScreen({ onFinish }: IntroScreenProps) {
  const [phase, setPhase] = useState<'enter' | 'visible' | 'exit'>('enter');

  useEffect(() => {
    requestAnimationFrame(() => setPhase('visible'));

    const exitTimer = setTimeout(() => setPhase('exit'), 4000);
    const removeTimer = setTimeout(() => onFinish(), 4800);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  return (
    <div
      className="fixed inset-0 z-[99998] flex flex-col items-center justify-center bg-void transition-opacity duration-1000"
      style={{ opacity: phase === 'enter' ? 0 : phase === 'exit' ? 0 : 1 }}
    >
      <img
        src="/assets/samurailogo.png"
        alt="Samurai"
        className="w-[200px] sm:w-[280px] lg:w-[400px] h-auto object-contain"
        style={{
          filter: 'drop-shadow(0 0 30px rgba(155,89,182,0.6)) drop-shadow(0 0 60px rgba(75,0,130,0.4))',
        }}
      />

      <div className="text-center mt-6">
        <h1
          className="font-grotesk font-bold text-white"
          style={{ fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '-0.03em' }}
        >
          LEGENDĂ
          <br />
          <span className="text-gradient-purple">VIE</span>
        </h1>
      </div>
    </div>
  );
}
