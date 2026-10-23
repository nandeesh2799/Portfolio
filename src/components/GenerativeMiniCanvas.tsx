import React, { useRef, useEffect } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';

export const GenerativeMiniCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 300);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 200);

    const particles: { x: number; y: number; vx: number; vy: number; color: string; size: number }[] = [];
    const colors = ['#00F5FF', '#39FF88', '#A970FF', '#FF4FD8'];

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2 + 1,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.fillStyle = 'rgba(8, 11, 16, 0.2)';
      ctx.fillRect(0, 0, width, height);

      // Draw and connect particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Attract lightly to mouse
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          p.x += (dx / dist) * 0.4;
          p.y += (dy / dist) * 0.4;
        }

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 65) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 245, 255, ${1 - d / 65})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="hypr-window rounded-xl overflow-hidden flex flex-col font-mono text-xs w-full h-full min-h-[220px]">
      <div className="flex items-center justify-between px-3 py-1.5 bg-bg-secondary border-b border-bg-tertiary select-none">
        <div className="flex items-center gap-1.5 text-terminal-purple">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-[11px] text-slate-200">generative_canvas // live</span>
        </div>
        <span className="text-[10px] text-muted">HTML5 60FPS</span>
      </div>
      <div className="relative flex-1 bg-[#080B10] overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full cursor-crosshair block" />
        <div className="absolute bottom-2 left-2 pointer-events-none text-[9px] text-muted font-mono bg-bg-secondary/70 px-1.5 py-0.5 rounded">
          Hover to distort field
        </div>
      </div>
    </div>
  );
};
