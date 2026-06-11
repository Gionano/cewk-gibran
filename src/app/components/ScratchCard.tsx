import { useRef, useEffect, useState, useCallback, type ReactNode } from "react";
import confetti from "canvas-confetti";

interface ScratchCardProps {
  width: number;
  height: number;
  coverGradient?: [string, string];
  coverText?: string;
  children: ReactNode;
  onReveal?: () => void;
}

export function ScratchCard({
  width,
  height,
  coverGradient = ["#E8A0BF", "#D4AF37"],
  coverText = "✨ Gosok Di Sini ✨",
  children,
  onReveal,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const revealedRef = useRef(false);

  // Draw the cover layer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas resolution for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Gradient background
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, coverGradient[0]);
    grad.addColorStop(1, coverGradient[1]);
    ctx.fillStyle = grad;

    // Rounded rectangle
    const r = 16;
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(width - r, 0);
    ctx.quadraticCurveTo(width, 0, width, r);
    ctx.lineTo(width, height - r);
    ctx.quadraticCurveTo(width, height, width - r, height);
    ctx.lineTo(r, height);
    ctx.quadraticCurveTo(0, height, 0, height - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.fill();

    // Shimmer pattern (diagonal lines)
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1;
    for (let i = -height; i < width + height; i += 12) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + height, height);
      ctx.stroke();
    }

    // Cover text
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = `600 ${Math.min(width / 14, 18)}px 'Playfair Display', serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(coverText, width / 2, height / 2);
  }, [width, height, coverGradient, coverText]);

  const getPos = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      const scaleX = width / rect.width;
      const scaleY = height / rect.height;

      if ("touches" in e) {
        const touch = e.touches[0];
        return {
          x: (touch.clientX - rect.left) * scaleX,
          y: (touch.clientY - rect.top) * scaleY,
        };
      }
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    },
    [width, height]
  );

  const scratch = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas || revealedRef.current) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x * dpr, y * dpr, 22 * dpr, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    },
    []
  );

  const checkReveal = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealedRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    const total = pixels.length / 4;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    if (transparent / total > 0.55) {
      revealedRef.current = true;
      setRevealed(true);
      onReveal?.();

      // Mini confetti burst
      const rect = canvas.getBoundingClientRect();
      const cx = (rect.left + rect.width / 2) / window.innerWidth;
      const cy = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { x: cx, y: cy },
        colors: ["#E8A0BF", "#D4AF37", "#FFD1DC", "#FAEBD7", "#F5D0C5"],
      });
    }
  }, [onReveal]);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (revealed) return;
    e.preventDefault();
    isDrawing.current = true;
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current || revealed) return;
    e.preventDefault();
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  };

  const handleEnd = () => {
    isDrawing.current = false;
    checkReveal();
  };

  return (
    <div
      ref={containerRef}
      className="relative select-none"
      style={{ width, height }}
    >
      {/* Reveal content underneath */}
      <div
        className={`absolute inset-0 rounded-2xl bg-[#FFF9F5] border-2 border-[#E8A0BF]/30 flex items-center justify-center p-4 text-center transition-all duration-500 ${
          revealed ? "shadow-xl" : "shadow-md"
        }`}
      >
        {children}
      </div>

      {/* Scratch canvas on top */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
          revealed ? "opacity-0 pointer-events-none" : "opacity-100 cursor-grab active:cursor-grabbing"
        }`}
        style={{ width, height, touchAction: "none" }}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      />
    </div>
  );
}
