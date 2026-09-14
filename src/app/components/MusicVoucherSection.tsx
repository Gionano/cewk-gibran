import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Music, Gift, Play, Pause, Disc } from "lucide-react";
import { ScratchCard } from "./ScratchCard";

/* ── Data ────────────────────────────────────────────── */

interface TapeData {
  id: number;
  title: string;
  spotifyId: string;
  color: string;
  labelColor: string;
  voucherTitle: string;
  voucherEmoji: string;
  voucherText: string;
}

const tapes: TapeData[] = [
  {
    id: 1,
    title: "Always",
    spotifyId: "2LlOeW5rVcvl3QcPNPcDus",
    color: "#E8A0BF",
    labelColor: "#FFF9F5",
    voucherTitle: "Kupon Makan Malam",
    voucherEmoji: "🍽️",
    voucherText: "Kupon Dinner Date Romantis — Dibayarin!\nBerlaku selamanya ❤️",
  },
  {
    id: 2,
    title: "Jatuh Suka",
    spotifyId: "6PqWdGIYq5xdLaa4zCZfRp",
    color: "#D4AF37",
    labelColor: "#FFF9F5",
    voucherTitle: "Kupon Jalan Malam",
    voucherEmoji: "🌙",
    voucherText: "Kupon Deep Talk & Gelato Malam\nKapan pun kamu mau 🌙",
  },
  {
    id: 3,
    title: "Sewindu",
    spotifyId: "0nXXgjpcisM0bheuDZHAub",
    color: "#F5D0C5",
    labelColor: "#4A3728",
    voucherTitle: "Kupon Peluk Gratis",
    voucherEmoji: "🤗",
    voucherText: "Kupon Peluk 10 Detik\n(Bisa diperpanjang tanpa batas!) 🤗",
  },
  {
    id: 4,
    title: "Love Me Harder",
    spotifyId: "5J4ZkQpzMUFojo1CtAZYpn",
    color: "#C4A898",
    labelColor: "#FFF9F5",
    voucherTitle: "Kupon Film Date",
    voucherEmoji: "🎬",
    voucherText: "Kupon Nonton Film Bareng\nKamu yang pilih filmnya 🎬",
  },
  {
    id: 5,
    title: "Brooklyn Baby",
    spotifyId: "1NZs6n6hl8UuMaX0UC0YTz",
    color: "#8B7165",
    labelColor: "#FFF9F5",
    voucherTitle: "Kupon Bebas Pilih",
    voucherEmoji: "✨",
    voucherText: "Kupon Bebas Minta Apa Saja!\nSatu permintaan khusus untukmu ✨",
  },
];

/* ── Cassette Tape Visual ───────────────────────────── */

function CassetteTape({
  tape,
  isInPlayer,
  isPlaying,
  onClick,
  mini = false,
  isSelected = false,
}: {
  tape: TapeData;
  isInPlayer?: boolean;
  isPlaying?: boolean;
  onClick?: () => void;
  mini?: boolean;
  isSelected?: boolean;
}) {
  const size = mini ? { w: 140, h: 90 } : { w: 280, h: 180 };

  return (
    <motion.div
      onClick={onClick}
      whileHover={mini ? { scale: 1.06, rotate: -1.5 } : undefined}
      whileTap={mini ? { scale: 0.97 } : undefined}
      className={`relative rounded-xl overflow-hidden shadow-lg ${
        mini ? "cursor-pointer" : ""
      } ${isSelected && mini ? "ring-2 ring-[#E8A0BF] ring-offset-2 ring-offset-[#FFF9F5]" : ""}`}
      style={{
        width: size.w,
        height: size.h,
        backgroundColor: "#4A3728",
        flexShrink: 0,
      }}
    >
      {/* Tape body top edge detail */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: tape.color }}
      />

      {/* Label sticker */}
      <div
        className="absolute rounded-lg flex items-center justify-center"
        style={{
          top: mini ? 8 : 14,
          left: mini ? 12 : 24,
          right: mini ? 12 : 24,
          height: mini ? 28 : 48,
          backgroundColor: tape.labelColor,
          border: `1.5px solid ${tape.color}`,
        }}
      >
        <span
          className="font-['Dancing_Script'] font-semibold truncate px-2"
          style={{
            fontSize: mini ? "0.7rem" : "1rem",
            color: tape.labelColor === "#FFF9F5" ? tape.color : tape.labelColor,
          }}
        >
          🎵 {tape.title}
        </span>
      </div>

      {/* Tape reels */}
      <div
        className="absolute flex items-center justify-center gap-1"
        style={{
          bottom: mini ? 14 : 28,
          left: 0,
          right: 0,
        }}
      >
        {/* Left reel */}
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={
            isPlaying
              ? { duration: 2, repeat: Infinity, ease: "linear" }
              : { duration: 0.3 }
          }
          className="rounded-full border-[3px] flex items-center justify-center"
          style={{
            width: mini ? 22 : 44,
            height: mini ? 22 : 44,
            borderColor: "#D4AF37",
            backgroundColor: "#3a2a1d",
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: mini ? 6 : 12,
              height: mini ? 6 : 12,
              backgroundColor: "#D4AF37",
            }}
          />
        </motion.div>

        {/* Tape strip between reels */}
        <div
          className="rounded-sm"
          style={{
            width: mini ? 30 : 60,
            height: mini ? 3 : 5,
            background: `linear-gradient(90deg, #D4AF37, #C4A898, #D4AF37)`,
          }}
        />

        {/* Right reel */}
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={
            isPlaying
              ? { duration: 3, repeat: Infinity, ease: "linear" }
              : { duration: 0.3 }
          }
          className="rounded-full border-[3px] flex items-center justify-center"
          style={{
            width: mini ? 22 : 44,
            height: mini ? 22 : 44,
            borderColor: "#D4AF37",
            backgroundColor: "#3a2a1d",
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: mini ? 6 : 12,
              height: mini ? 6 : 12,
              backgroundColor: "#D4AF37",
            }}
          />
        </motion.div>
      </div>

      {/* Screw holes */}
      {!mini && (
        <>
          <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-[#6b5445]" />
          <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#6b5445]" />
          <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-[#6b5445]" />
          <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-[#6b5445]" />
        </>
      )}
    </motion.div>
  );
}

/* ── Main Section ───────────────────────────────────── */

export function MusicVoucherSection() {
  const [selectedTape, setSelectedTape] = useState<TapeData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVoucher, setShowVoucher] = useState(false);
  const [showSpotify, setShowSpotify] = useState(false);
  const [revealedTapes, setRevealedTapes] = useState<Set<number>>(new Set());
  const playTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // When a tape is selected, reset state
  const handleSelectTape = (tape: TapeData) => {
    if (selectedTape?.id === tape.id) return;
    setIsPlaying(false);
    setShowVoucher(false);
    setShowSpotify(false);
    setSelectedTape(tape);
    if (playTimeoutRef.current) clearTimeout(playTimeoutRef.current);
  };

  // Play/pause toggle
  const togglePlay = () => {
    if (!selectedTape) return;

    if (isPlaying) {
      setIsPlaying(false);
      if (playTimeoutRef.current) clearTimeout(playTimeoutRef.current);
    } else {
      setIsPlaying(true);
      // After 1.5 seconds of playing, reveal the voucher AND the Spotify embed
      playTimeoutRef.current = setTimeout(() => {
        setShowVoucher(true);
        setShowSpotify(true);
      }, 1500);
    }
  };

  const handleVoucherReveal = (tapeId: number) => {
    setRevealedTapes((prev) => new Set(prev).add(tapeId));
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (playTimeoutRef.current) clearTimeout(playTimeoutRef.current);
    };
  }, []);

  return (
    <section
      id="hadiah"
      className="py-20 px-6 bg-gradient-to-b from-[#FFF9F5] to-[#FFF0E6]"
    >
      <div className="max-w-5xl mx-auto">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <Gift className="w-8 h-8 mx-auto text-[#D4AF37] mb-3" />
          <h2
            className="font-['Dancing_Script'] text-[#4A3728]"
            style={{ fontSize: "2.5rem" }}
          >
            Hadiah Spesial
          </h2>
          <p className="font-['Lora'] text-[#8B7165] mt-2 italic">
            Pilih kaset kenangan, putar lagunya, dan gosok kuponmu!
          </p>
        </motion.div>

        {/* ── Player + Voucher Area ── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center lg:items-start justify-center">
          {/* Left: Cassette Player */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-6 w-full max-w-[340px]"
          >
            {/* Player deck */}
            <div className="relative bg-[#3a2a1d] rounded-2xl p-5 shadow-2xl border border-[#6b5445] w-full">
              {/* Player header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <Disc className="w-4 h-4 text-[#D4AF37]" />
                  <span
                    className="font-['Playfair_Display'] text-[#D4AF37] tracking-wider uppercase"
                    style={{ fontSize: "0.65rem" }}
                  >
                    Retro Player
                  </span>
                </div>
                {/* LED indicator */}
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      isPlaying
                        ? "bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]"
                        : "bg-[#6b5445]"
                    }`}
                  />
                  <span
                    className="font-['Playfair_Display'] text-[#8B7165]"
                    style={{ fontSize: "0.6rem" }}
                  >
                    {isPlaying ? "PLAYING" : selectedTape ? "READY" : "EMPTY"}
                  </span>
                </div>
              </div>

              {/* Cassette slot */}
              <div className="bg-[#2a1e14] rounded-xl p-4 min-h-[200px] flex items-center justify-center border border-[#4A3728]">
                <AnimatePresence mode="wait">
                  {selectedTape ? (
                    <motion.div
                      key={selectedTape.id}
                      initial={{ x: -120, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 120, opacity: 0 }}
                      transition={{ type: "spring", damping: 20, stiffness: 200 }}
                      className="w-full"
                    >
                      <iframe
                        data-testid="embed-iframe"
                        style={{ borderRadius: "12px" }}
                        src={`https://open.spotify.com/embed/track/${selectedTape.spotifyId}?utm_source=generator`}
                        width="100%"
                        height="352"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="shadow-sm"
                      ></iframe>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center"
                    >
                      <Music className="w-10 h-10 text-[#6b5445] mx-auto mb-2" />
                      <p
                        className="font-['Lora'] text-[#6b5445] italic"
                        style={{ fontSize: "0.85rem" }}
                      >
                        Pilih kaset dari bawah...
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center mt-4 gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  disabled={!selectedTape}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    selectedTape
                      ? "bg-[#E8A0BF] text-white shadow-lg hover:shadow-xl"
                      : "bg-[#4A3728] text-[#6b5445] cursor-not-allowed"
                  }`}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </motion.button>
              </div>

            </div>

            {/* Tape rack / selector */}
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {tapes.map((tape) => (
                <CassetteTape
                  key={tape.id}
                  tape={tape}
                  mini
                  isSelected={selectedTape?.id === tape.id}
                  onClick={() => handleSelectTape(tape)}
                />
              ))}
            </div>
          </motion.div>

          {/* Right: Voucher reveal area */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-center gap-6 min-w-[300px] lg:pt-8"
          >
            <AnimatePresence mode="wait">
              {showVoucher && selectedTape ? (
                <motion.div
                  key={`voucher-${selectedTape.id}`}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ type: "spring", damping: 20, stiffness: 200 }}
                  className="flex flex-col items-center gap-4"
                >
                  {/* Voucher label */}
                  <div className="text-center">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span style={{ fontSize: "2.5rem" }}>
                        {selectedTape.voucherEmoji}
                      </span>
                    </motion.div>
                    <h3
                      className="font-['Dancing_Script'] text-[#4A3728] mt-1"
                      style={{ fontSize: "1.5rem" }}
                    >
                      {selectedTape.voucherTitle}
                    </h3>
                    <p
                      className="font-['Lora'] text-[#8B7165] italic mt-1"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {revealedTapes.has(selectedTape.id)
                        ? "Kupon sudah terbuka! 🎉"
                        : "Gosok kartu di bawah untuk membuka hadiahmu!"}
                    </p>
                  </div>

                  {/* Scratch card */}
                  <ScratchCard
                    key={`scratch-${selectedTape.id}`}
                    width={280}
                    height={180}
                    coverGradient={[selectedTape.color, "#D4AF37"]}
                    onReveal={() => handleVoucherReveal(selectedTape.id)}
                  >
                    <div className="flex flex-col items-center justify-center gap-2 p-3 text-center">
                      <span style={{ fontSize: "2rem" }}>
                        {selectedTape.voucherEmoji}
                      </span>
                      <p
                        className="font-['Dancing_Script'] text-[#4A3728] font-semibold"
                        style={{
                          fontSize: "1.1rem",
                          whiteSpace: "pre-line",
                          lineHeight: 1.5,
                        }}
                      >
                        {selectedTape.voucherText}
                      </p>
                    </div>
                  </ScratchCard>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16 px-8"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Gift className="w-16 h-16 text-[#E8A0BF]/30 mb-4" />
                  </motion.div>
                  <p
                    className="font-['Lora'] text-[#C4A898] italic text-center"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {selectedTape
                      ? "Tekan tombol Play untuk memutar kaset..."
                      : "Pilih kaset lalu tekan Play untuk membuka hadiah!"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress: show which vouchers have been revealed */}
            {revealedTapes.size > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 mt-2"
              >
                <span
                  className="font-['Lora'] text-[#8B7165]"
                  style={{ fontSize: "0.75rem" }}
                >
                  Kupon terbuka:
                </span>
                {tapes.map((t) => (
                  <div
                    key={t.id}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all ${
                      revealedTapes.has(t.id)
                        ? "bg-[#E8A0BF] text-white shadow-sm"
                        : "bg-[#E8A0BF]/15 text-[#C4A898]"
                    }`}
                  >
                    {revealedTapes.has(t.id) ? "✓" : t.id}
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
