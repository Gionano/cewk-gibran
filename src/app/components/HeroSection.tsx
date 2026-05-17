import { motion } from "motion/react";
import { Heart, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const heroImage = "/images/background-foto.jpeg";

export function HeroSection() {
  const scrollToGallery = () => {
    document.getElementById("kenangan")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={heroImage}
          alt="Annisa Zahra"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF9F5]/70 via-[#FFF9F5]/50 to-[#FFF9F5]/90" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-6"
        >
          <Heart className="w-12 h-12 mx-auto text-[#E8A0BF] fill-[#E8A0BF]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-['Dancing_Script'] text-[#4A3728] mb-4"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.2 }}
        >
          Selamat Ulang Tahun yang ke-24,
          <br />
          <span className="text-[#E8A0BF]">Annisa Zahra!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-['Lora'] text-[#8B7165] mb-10 italic"
          style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
        >
          Halaman ini khusus dibuat untuk merayakanmu
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToGallery}
          className="bg-[#E8A0BF] text-white px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-shadow font-['Playfair_Display'] tracking-wide"
        >
          Lihat Kenangan Kita
        </motion.button>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-[#E8A0BF]" />
        </motion.div>
      </div>
    </section>
  );
}
