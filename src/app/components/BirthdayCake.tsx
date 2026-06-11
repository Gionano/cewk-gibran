import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";

/* ── Types ───────────────────────────────────────────── */

interface BirthdayCakeProps {
  onAllCandlesBlownOut: () => void;
}

/* ── Candle Component ────────────────────────────────── */

function Candle({
  lit,
  onClick,
  delay,
}: {
  lit: boolean;
  onClick: () => void;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring" }}
      className="flex flex-col items-center cursor-pointer"
      onClick={onClick}
      style={{ width: 32 }}
    >
      {/* Flame + smoke area */}
      <div className="relative h-10 flex items-end justify-center">
        <AnimatePresence mode="wait">
          {lit ? (
            /* Flame */
            <motion.div
              key="flame"
              className="absolute bottom-0"
              exit={{ opacity: 0, scale: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Outer glow */}
              <motion.div
                className="absolute -inset-3 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,200,50,0.35) 0%, transparent 70%)",
                }}
                animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
              {/* Outer flame */}
              <motion.div
                className="rounded-full"
                style={{
                  width: 14,
                  height: 22,
                  background:
                    "linear-gradient(to top, #ff6b00, #ff9500, #ffc800)",
                  borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                  filter: "blur(0.5px)",
                }}
                animate={{
                  scaleX: [1, 0.85, 1.1, 0.9, 1],
                  scaleY: [1, 1.1, 0.9, 1.05, 1],
                  rotate: [-2, 3, -3, 2, -2],
                }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Inner flame (blue core) */}
              <motion.div
                className="absolute bottom-[1px] left-1/2 -translate-x-1/2"
                style={{
                  width: 6,
                  height: 10,
                  background: "linear-gradient(to top, #4dabf7, #ffd43b)",
                  borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                }}
                animate={{ scaleY: [1, 1.15, 0.9, 1] }}
                transition={{ duration: 0.4, repeat: Infinity }}
              />
            </motion.div>
          ) : (
            /* Smoke puff after blowing out */
            <motion.div
              key="smoke"
              className="absolute bottom-0 flex flex-col items-center"
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 0, y: -25 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <div
                className="rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  background: "rgba(180,180,180,0.5)",
                  filter: "blur(3px)",
                }}
              />
              <div
                className="rounded-full mt-[-2px]"
                style={{
                  width: 5,
                  height: 5,
                  background: "rgba(200,200,200,0.4)",
                  filter: "blur(2px)",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Candle stick */}
      <div className="relative">
        <div
          className="rounded-sm mx-auto"
          style={{
            width: 8,
            height: 40,
            background: "linear-gradient(135deg, #FFD1DC 0%, #E8A0BF 50%, #d48dac 100%)",
            boxShadow: "inset -2px 0 3px rgba(0,0,0,0.1)",
          }}
        />
        {/* Candle stripes */}
        <div
          className="absolute top-[8px] left-0 right-0 h-[2px]"
          style={{ background: "rgba(255,255,255,0.4)" }}
        />
        <div
          className="absolute top-[20px] left-0 right-0 h-[2px]"
          style={{ background: "rgba(255,255,255,0.4)" }}
        />
        <div
          className="absolute top-[32px] left-0 right-0 h-[2px]"
          style={{ background: "rgba(255,255,255,0.4)" }}
        />
        {/* Wick */}
        <div
          className="absolute -top-[3px] left-1/2 -translate-x-1/2"
          style={{
            width: 2,
            height: 6,
            background: lit ? "#333" : "#666",
            borderRadius: 1,
          }}
        />
      </div>
    </motion.div>
  );
}

/* ── Drip Component ──────────────────────────────────── */

function Drip({ left, height, delay }: { left: string; height: number; delay: number }) {
  return (
    <motion.div
      className="absolute"
      style={{ left, top: -2 }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
    >
      <div
        style={{
          width: 12,
          height,
          background: "linear-gradient(to bottom, #FFF9F5, #f5e6d8)",
          borderRadius: "0 0 6px 6px",
          transformOrigin: "top",
        }}
      />
      <div
        className="rounded-full mx-auto"
        style={{
          width: 14,
          height: 8,
          background: "#f5e6d8",
          marginTop: -1,
        }}
      />
    </motion.div>
  );
}

/* ── Main Cake Component ─────────────────────────────── */

export function BirthdayCake({ onAllCandlesBlownOut }: BirthdayCakeProps) {
  const [candles, setCandles] = useState([true, true, true]);
  const [allBlown, setAllBlown] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const blowCandle = (index: number) => {
    if (!candles[index] || allBlown) return;

    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);

    // Check if all candles are blown out
    if (newCandles.every((c) => !c)) {
      setAllBlown(true);

      // Big confetti burst
      const colors = ["#E8A0BF", "#D4AF37", "#FFD1DC", "#FAEBD7", "#F5D0C5"];
      const end = Date.now() + 2500;
      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 65,
          origin: { x: 0, y: 0.65 },
          colors,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 65,
          origin: { x: 1, y: 0.65 },
          colors,
        });
        confetti({
          particleCount: 4,
          angle: 90,
          spread: 100,
          origin: { x: 0.5, y: 0.4 },
          colors,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();

      // Show birthday message after a beat
      setTimeout(() => setShowMessage(true), 600);

      // Transition to main site
      setTimeout(() => onAllCandlesBlownOut(), 4000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-[#1a1118] via-[#2a1f25] to-[#1a1118] relative overflow-hidden"
    >
      {/* Ambient glow behind cake */}
      <div
        className="absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(232,160,191,0.12) 0%, transparent 70%)",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Instruction text */}
      <AnimatePresence>
        {!allBlown && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.5 }}
            className="font-['Lora'] text-[#E8A0BF]/80 italic text-center mb-10 z-10"
            style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)" }}
          >
            Make a wish & tiup lilinnya ✨
            <br />
            <span className="text-[#C4A898]/60" style={{ fontSize: "0.8rem" }}>
              (klik setiap lilin untuk meniupnya)
            </span>
          </motion.p>
        )}
      </AnimatePresence>

      {/* Birthday message after blowing */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="text-center mb-8 z-10"
          >
            <h1
              className="font-['Dancing_Script'] text-[#E8A0BF] mb-2"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.2 }}
            >
              Happy 18th Birthday!
            </h1>
            <p
              className="font-['Dancing_Script'] text-[#D4AF37]"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
            >
              Annisa Zahra ✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 3D Cake ── */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", damping: 18, stiffness: 100, delay: 0.2 }}
        className="relative z-10"
        style={{ perspective: 1000 }}
      >
        <div
          className="relative"
          style={{
            transform: "rotateX(8deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Candles */}
          <div className="flex justify-center gap-3 sm:gap-5 mb-[-4px] relative z-20">
            {candles.map((lit, i) => (
              <Candle
                key={i}
                lit={lit}
                onClick={() => blowCandle(i)}
                delay={0.4 + i * 0.15}
              />
            ))}
          </div>

          {/* ─── Top tier (small) ─── */}
          <motion.div
            className="relative mx-auto"
            style={{ width: 130 }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Top surface */}
            <div
              className="mx-auto rounded-full relative z-10"
              style={{
                width: 120,
                height: 24,
                background: "linear-gradient(135deg, #FFF9F5 0%, #f0ddd0 100%)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            />
            {/* Cake body with drips */}
            <div
              className="mx-auto relative"
              style={{
                width: 120,
                height: 50,
                background: "linear-gradient(180deg, #E8A0BF 0%, #d88aab 60%, #c97a9b 100%)",
                borderRadius: "0 0 4px 4px",
                boxShadow: "inset -8px 0 12px rgba(0,0,0,0.1), inset 8px 0 12px rgba(255,255,255,0.08)",
                marginTop: -2,
              }}
            >
              {/* Drips hanging from top edge */}
              <Drip left="10%" height={14} delay={0.8} />
              <Drip left="50%" height={18} delay={1.0} />
              <Drip left="78%" height={10} delay={1.2} />
            </div>
            {/* Bottom edge */}
            <div
              className="mx-auto rounded-full"
              style={{
                width: 124,
                height: 16,
                background: "linear-gradient(180deg, #d88aab, #c97a9b)",
                marginTop: -4,
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              }}
            />
          </motion.div>

          {/* ─── Middle tier ─── */}
          <motion.div
            className="relative mx-auto -mt-2"
            style={{ width: 190 }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            {/* Top surface */}
            <div
              className="mx-auto rounded-full relative z-10"
              style={{
                width: 180,
                height: 28,
                background: "linear-gradient(135deg, #FFF9F5 0%, #f0ddd0 100%)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              }}
            />
            {/* Cake body with drips */}
            <div
              className="mx-auto relative overflow-visible"
              style={{
                width: 180,
                height: 55,
                background: "linear-gradient(180deg, #FFD1DC 0%, #f0b8c8 60%, #e8a8b8 100%)",
                borderRadius: "0 0 4px 4px",
                boxShadow: "inset -10px 0 15px rgba(0,0,0,0.08), inset 10px 0 15px rgba(255,255,255,0.05)",
                marginTop: -2,
              }}
            >
              {/* Drips */}
              <Drip left="5%" height={20} delay={1.1} />
              <Drip left="28%" height={12} delay={1.3} />
              <Drip left="62%" height={22} delay={0.9} />
              <Drip left="85%" height={15} delay={1.4} />
              {/* Decorative ribbon */}
              <div
                className="absolute bottom-3 left-0 right-0"
                style={{
                  height: 6,
                  background: "linear-gradient(90deg, #D4AF37, #f0d060, #D4AF37)",
                  opacity: 0.7,
                }}
              />
            </div>
            {/* Bottom edge */}
            <div
              className="mx-auto rounded-full"
              style={{
                width: 184,
                height: 18,
                background: "linear-gradient(180deg, #f0b8c8, #e8a8b8)",
                marginTop: -4,
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            />
          </motion.div>

          {/* ─── Base tier (largest) ─── */}
          <motion.div
            className="relative mx-auto -mt-2"
            style={{ width: 260 }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* Top surface */}
            <div
              className="mx-auto rounded-full relative z-10"
              style={{
                width: 250,
                height: 32,
                background: "linear-gradient(135deg, #FFF9F5 0%, #f0ddd0 100%)",
                boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
              }}
            />
            {/* Cake body with drips */}
            <div
              className="mx-auto relative overflow-visible"
              style={{
                width: 250,
                height: 65,
                background: "linear-gradient(180deg, #FAEBD7 0%, #f0dcc4 60%, #e8d0b4 100%)",
                borderRadius: "0 0 6px 6px",
                boxShadow: "inset -12px 0 18px rgba(0,0,0,0.07), inset 12px 0 18px rgba(255,255,255,0.05)",
                marginTop: -2,
              }}
            >
              {/* Drips */}
              <Drip left="3%" height={24} delay={1.0} />
              <Drip left="18%" height={16} delay={1.5} />
              <Drip left="40%" height={22} delay={1.2} />
              <Drip left="68%" height={18} delay={1.3} />
              <Drip left="88%" height={14} delay={1.6} />
              {/* Decorative dots */}
              <div className="absolute top-4 left-0 right-0 flex justify-center gap-5">
                {Array.from({ length: 7 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="rounded-full"
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: i % 2 === 0 ? "#E8A0BF" : "#D4AF37",
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.08 }}
                  />
                ))}
              </div>
              {/* Gold ribbon */}
              <div
                className="absolute bottom-4 left-0 right-0"
                style={{
                  height: 6,
                  background: "linear-gradient(90deg, #D4AF37, #f0d060, #D4AF37)",
                  opacity: 0.6,
                }}
              />
            </div>
            {/* Bottom edge */}
            <div
              className="mx-auto rounded-full"
              style={{
                width: 256,
                height: 20,
                background: "linear-gradient(180deg, #f0dcc4, #e8d0b4)",
                marginTop: -4,
                boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
              }}
            />
          </motion.div>

          {/* ─── Cake plate ─── */}
          <motion.div
            className="mx-auto -mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div
              className="mx-auto rounded-full"
              style={{
                width: 300,
                height: 22,
                background: "linear-gradient(135deg, #f8f8f8 0%, #e0e0e0 50%, #d0d0d0 100%)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.8)",
              }}
            />
            {/* Plate rim */}
            <div
              className="mx-auto rounded-full"
              style={{
                width: 310,
                height: 10,
                background: "linear-gradient(180deg, #d8d8d8, #c0c0c0)",
                marginTop: -2,
                boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Sparkle particles around cake */}
      {Array.from({ length: 15 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            backgroundColor: ["#E8A0BF", "#D4AF37", "#FFD1DC"][i % 3],
          }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </motion.div>
  );
}
