import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Balloon {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
}

const COLORS = ["#E8A0BF", "#F5E6D3", "#FFD700", "#FFC0CB", "#D4A574"];

export function FloatingBalloons() {
  const [balloons] = useState<Balloon[]>(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 15,
      size: 20 + Math.random() * 20,
      color: COLORS[i % COLORS.length],
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full opacity-20"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size * 1.2,
            backgroundColor: b.color,
            borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
          }}
          initial={{ y: "110vh" }}
          animate={{ y: "-20vh" }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
