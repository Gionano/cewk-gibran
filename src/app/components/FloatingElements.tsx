import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Balloon {
  id: number;
  x: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
}

export function FloatingElements() {
  const [balloons] = useState<Balloon[]>(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 12 + Math.random() * 10,
      color: ["#E8A0BF", "#F5D0C5", "#D4AF37", "#FFD1DC", "#FAEBD7"][i % 5],
      size: 20 + Math.random() * 20,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full opacity-15"
          style={{
            left: `${b.x}%`,
            bottom: -60,
            width: b.size,
            height: b.size * 1.2,
            backgroundColor: b.color,
            borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
          }}
          animate={{
            y: [0, -window.innerHeight - 200],
            x: [0, Math.sin(b.id) * 40, 0],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: "linear",
          }}
        />
      ))}
      {/* Sparkle dots */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-[#D4AF37]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}
