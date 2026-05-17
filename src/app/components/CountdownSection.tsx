import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Cake, Heart, Gift } from "lucide-react";

const TARGET_DATE = new Date("2026-06-28T00:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();
  if (diff <= 0) return null;
  return {
    hari: Math.floor(diff / (1000 * 60 * 60 * 24)),
    jam: Math.floor((diff / (1000 * 60 * 60)) % 24),
    menit: Math.floor((diff / (1000 * 60)) % 60),
    detik: Math.floor((diff / 1000) % 60),
  };
}

export function CountdownPage({ onOpen }: { onOpen: () => void }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const isReady = timeLeft === null;

  useEffect(() => {
    if (isReady) return;
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [isReady]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-[#FFF9F5] via-[#FFF0E6] to-[#FFF9F5] relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-[#E8A0BF]/10" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[250px] h-[250px] rounded-full bg-[#D4AF37]/10" />

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 1 }}
        className="mb-6"
      >
        <Cake className="w-16 h-16 mx-auto text-[#D4AF37]" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-['Dancing_Script'] text-[#4A3728] text-center mb-3"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.2 }}
      >
        {isReady ? (
          <>
            Selamat Ulang Tahun,
            <br />
            <span className="text-[#E8A0BF]">Annisa Zahra!</span>
          </>
        ) : (
          <>
            Ada Sesuatu yang Spesial
            <br />
            untuk <span className="text-[#E8A0BF]">Annisa Zahra</span>
          </>
        )}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="font-['Lora'] text-[#8B7165] italic text-center mb-10"
        style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)" }}
      >
        {isReady
          ? "Ada kejutan spesial yang menunggumu di dalam..."
          : "Kejutannya akan terbuka pada 28 Juni 2026..."}
      </motion.p>

      {timeLeft ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center gap-3 sm:gap-5 mb-12"
        >
          {Object.entries(timeLeft).map(([label, value]) => (
            <div
              key={label}
              className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 min-w-[72px] sm:min-w-[100px] border border-[#E8A0BF]/15 text-center"
            >
              <span
                className="block font-['Playfair_Display'] text-[#E8A0BF]"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
              >
                {String(value).padStart(2, "0")}
              </span>
              <span
                className="font-['Lora'] text-[#8B7165] capitalize"
                style={{ fontSize: "0.8rem" }}
              >
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      ) : (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: "spring" }}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpen}
          className="bg-[#E8A0BF] text-white px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow font-['Playfair_Display'] tracking-wide flex items-center gap-3 mb-12"
          style={{ fontSize: "1.1rem" }}
        >
          <Gift className="w-5 h-5" />
          Buka Kejutanmu
        </motion.button>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex items-center gap-2 text-[#C4A898]"
      >
        <Heart className="w-4 h-4 fill-[#E8A0BF] text-[#E8A0BF]" />
        <span className="font-['Lora'] italic" style={{ fontSize: "0.85rem" }}>
          Dibuat dengan sepenuh hati
        </span>
        <Heart className="w-4 h-4 fill-[#E8A0BF] text-[#E8A0BF]" />
      </motion.div>
    </div>
  );
}

export function useIsUnlocked() {
  const [unlocked, setUnlocked] = useState(false);
  const timeReached = new Date() >= TARGET_DATE;

  const open = () => {
    if (timeReached) setUnlocked(true);
  };

  return { unlocked, timeReached, open };
}