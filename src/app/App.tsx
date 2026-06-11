import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Heart } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { FloatingElements } from "./components/FloatingElements";
import { HeroSection } from "./components/HeroSection";
import { CountdownPage, useIsUnlocked } from "./components/CountdownSection";
import { GallerySection } from "./components/GallerySection";
import { MusicVoucherSection } from "./components/MusicVoucherSection";
import { BirthdayCake } from "./components/BirthdayCake";

function Navbar() {
  const links = [
    { label: "Beranda", href: "#" },
    { label: "Kenangan", href: "#kenangan" },
    { label: "Hadiah", href: "#hadiah" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFF9F5]/80 backdrop-blur-md border-b border-[#E8A0BF]/15">
      <div className="max-w-5xl mx-auto flex items-center justify-center gap-8 py-3 px-6">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              if (link.href === "#") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="font-['Playfair_Display'] text-[#8B7165] hover:text-[#E8A0BF] transition-colors"
            style={{ fontSize: "0.9rem" }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="py-10 px-6 bg-[#FFF0E6] text-center">
      <Heart className="w-5 h-5 mx-auto text-[#E8A0BF] fill-[#E8A0BF] mb-2" />
      <p className="font-['Lora'] text-[#8B7165] italic" style={{ fontSize: "0.9rem" }}>
        Dibuat dengan sepenuh hati untuk Annisa Zahra
      </p>
      <p className="font-['Lora'] text-[#C4A898] mt-1" style={{ fontSize: "0.8rem" }}>
        &copy; 2026 — Selamanya milik kita
      </p>
    </footer>
  );
}

export default function App() {
  const { phase, showCake, open } = useIsUnlocked();
  const hasConfetti = useRef(false);

  useEffect(() => {
    if (phase !== "unlocked") return;
    if (hasConfetti.current) return;
    hasConfetti.current = true;
    // Burst confetti on unlock
    const end = Date.now() + 2000;
    const colors = ["#E8A0BF", "#D4AF37", "#FFD1DC", "#FAEBD7", "#F5D0C5"];
    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, [phase]);

  return (
    <div className="min-h-screen bg-[#FFF9F5]" style={{ fontFamily: "'Lora', serif" }}>
      <FloatingElements />
      <AnimatePresence mode="wait">
        {phase === "countdown" && (
          <CountdownPage key="countdown" onShowCake={showCake} />
        )}

        {phase === "cake" && (
          <BirthdayCake key="cake" onAllCandlesBlownOut={open} />
        )}

        {phase === "unlocked" && (
          <div key="main" className="min-h-screen bg-[#FFF9F5] overflow-x-hidden">
            <Navbar />
            <HeroSection />
            <GallerySection />
            <MusicVoucherSection />
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}