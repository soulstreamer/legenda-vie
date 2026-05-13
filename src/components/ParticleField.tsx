import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
}

interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  width: number;
  color: string;
  trail: number;
  splashProgress: number;
  splashX: number;
  splashY: number;
}

interface LightningBolt {
  active: boolean;
  points: { x: number; y: number }[];
  opacity: number;
  life: number;
  maxLife: number;
  branches: { points: { x: number; y: number }[]; opacity: number }[];
  flashIntensity: number;
}

const RAIN_COLORS = [
  'rgba(0, 210, 220,',
  'rgba(0, 180, 210,',
  'rgba(30, 150, 230,',
  'rgba(0, 230, 200,',
  'rgba(80, 190, 240,',
];

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rainRef = useRef<RainDrop[]>([]);
  const lightningRef = useRef<LightningBolt[]>([]);
  const rafRef = useRef<number>(0);
  const scrollRef = useRef(0);
  const lastLightningRef = useRef(0);
  const nextIntervalRef = useRef(3000);

  const generateLightningPoints = useCallback((
    startX: number, startY: number,
    endX: number, endY: number,
    roughness: number,
    depth: number
  ): { x: number; y: number }[] => {
    if (depth === 0) return [{ x: startX, y: startY }, { x: endX, y: endY }];
    const midX = (startX + endX) / 2 + (Math.random() - 0.5) * roughness;
    const midY = (startY + endY) / 2 + (Math.random() - 0.5) * roughness * 0.3;
    return [
      ...generateLightningPoints(startX, startY, midX, midY, roughness * 0.6, depth - 1),
      ...generateLightningPoints(midX, midY, endX, endY, roughness * 0.6, depth - 1).slice(1),
    ];
  }, []);

  const spawnLightning = useCallback((canvas: HTMLCanvasElement) => {
    const startX = Math.random() * canvas.width;
    const endX = startX + (Math.random() - 0.5) * 300;
    const endY = canvas.height * (0.3 + Math.random() * 0.5);
    const points = generateLightningPoints(startX, -20, endX, endY, 180, 6);
    const branchCount = Math.floor(Math.random() * 3) + 1;
    const branches = [];
    for (let b = 0; b < branchCount; b++) {
      const branchStart = Math.floor(points.length * (0.2 + Math.random() * 0.5));
      if (branchStart >= points.length) continue;
      const bp = points[branchStart];
      const bEndX = bp.x + (Math.random() - 0.5) * 200;
      const bEndY = bp.y + Math.random() * 200;
      const branchPts = generateLightningPoints(bp.x, bp.y, bEndX, bEndY, 80, 4);
      branches.push({ points: branchPts, opacity: 0.4 + Math.random() * 0.3 });
    }
    const maxLife = 8 + Math.floor(Math.random() * 10);
    lightningRef.current.push({ active: true, points, opacity: 0.9 + Math.random() * 0.1, life: maxLife, maxLife, branches, flashIntensity: 0.12 + Math.random() * 0.1 });
  }, [generateLightningPoints]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    particlesRef.current = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      speedY: -(Math.random() * 0.3 + 0.2),
      speedX: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.4 + 0.2,
    }));

    rainRef.current = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 14 + 6,
      speed: Math.random() * 4.5 + 2.5,
      opacity: Math.random() * 0.16 + 0.03,
      width: Math.random() * 0.8 + 0.25,
      color: RAIN_COLORS[Math.floor(Math.random() * RAIN_COLORS.length)],
      trail: Math.random() * 0.4 + 0.3,
      splashProgress: -1,
      splashX: 0,
      splashY: 0,
    }));

    window.addEventListener('scroll', () => { scrollRef.current = window.scrollY; }, { passive: true });

    const drawLightning = (points: { x: number; y: number }[], alpha: number, width: number) => {
      if (points.length < 2) return;
      ctx.save();
      // Outer glow
      ctx.strokeStyle = `rgba(180, 220, 255, ${alpha * 0.2})`;
      ctx.lineWidth = width * 5;
      ctx.shadowBlur = 24;
      ctx.shadowColor = 'rgba(150, 200, 255, 0.6)';
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
      ctx.stroke();
      // Mid glow
      ctx.strokeStyle = `rgba(160, 200, 255, ${alpha * 0.6})`;
      ctx.lineWidth = width * 2.5;
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
      ctx.stroke();
      // Bright core
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.lineWidth = width;
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(200, 230, 255, 1)';
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ambient particles
      particlesRef.current.forEach((p) => {
        p.y += p.speedY + scrollRef.current * 0.003;
        p.x += p.speedX;
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(155, 89, 182, ${p.opacity})`;
        ctx.fill();
      });

      // Rain
      rainRef.current.forEach((drop) => {
        if (drop.splashProgress >= 0) {
          drop.splashProgress += 0.12;
          if (drop.splashProgress > 1) {
            drop.splashProgress = -1;
            drop.x = Math.random() * canvas.width;
            drop.y = -drop.length;
            drop.opacity = Math.random() * 0.16 + 0.03;
          } else {
            const r = drop.splashProgress * 7;
            const splashAlpha = drop.opacity * (1 - drop.splashProgress) * 2.5;
            ctx.save();
            ctx.strokeStyle = `${drop.color}${splashAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.ellipse(drop.splashX, drop.splashY, r * 2, r * 0.5, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
          return;
        }
        drop.y += drop.speed;
        drop.x += drop.speed * 0.07;
        if (drop.y > canvas.height) {
          drop.splashProgress = 0;
          drop.splashX = drop.x;
          drop.splashY = canvas.height - 2;
        }
        if (drop.x > canvas.width) drop.x = 0;

        const grad = ctx.createLinearGradient(drop.x, drop.y - drop.length, drop.x + drop.length * 0.07, drop.y);
        grad.addColorStop(0, `${drop.color}0)`);
        grad.addColorStop(drop.trail, `${drop.color}${drop.opacity * 0.4})`);
        grad.addColorStop(1, `${drop.color}${drop.opacity})`);

        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth = drop.width;
        ctx.lineCap = 'round';
        if (drop.opacity > 0.1) { ctx.shadowBlur = 5; ctx.shadowColor = `${drop.color}0.5)`; }
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y - drop.length);
        ctx.lineTo(drop.x + drop.length * 0.07, drop.y);
        ctx.stroke();
        ctx.restore();
      });

      // Lightning
      const now = Date.now();
      if (now - lastLightningRef.current > nextIntervalRef.current && lightningRef.current.length < 3) {
        lastLightningRef.current = now;
        nextIntervalRef.current = 2500 + Math.random() * 4000;
        spawnLightning(canvas);
        if (Math.random() < 0.35) {
          setTimeout(() => spawnLightning(canvas), 80 + Math.random() * 150);
        }
      }

      lightningRef.current = lightningRef.current.filter((bolt) => {
        if (!bolt.active) return false;
        bolt.life--;
        if (bolt.life <= 0) return false;
        const lifeRatio = bolt.life / bolt.maxLife;
        const flicker = Math.random() < 0.4 ? Math.random() * 0.6 : 1.0;
        const alpha = bolt.opacity * lifeRatio * flicker;
        if (alpha > 0.05) {
          if (lifeRatio > 0.65) {
            ctx.save();
            ctx.fillStyle = `rgba(180, 210, 255, ${bolt.flashIntensity * lifeRatio * flicker * 0.4})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
          }
          drawLightning(bolt.points, alpha, 1.5);
          bolt.branches.forEach((branch) => drawLightning(branch.points, alpha * branch.opacity * 0.7, 0.8));
        }
        return true;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [spawnLightning]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}
    />
  );
}
