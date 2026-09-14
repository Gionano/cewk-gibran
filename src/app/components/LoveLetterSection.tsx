import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Mail, MailOpen } from "lucide-react";
import confetti from "canvas-confetti";

export function LoveLetterSection() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    setIsOpen(true);
    // Burst confetti when opening the letter
    const colors = ["#E8A0BF", "#D4AF37", "#FFD1DC", "#FAEBD7", "#F5D0C5"];
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors,
    });
  };

  return (
    <section id="surat" className="py-24 px-6 bg-gradient-to-b from-[#FFF9F5] via-[#FFF3EC] to-[#FFF9F5] relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-1/4 left-[-100px] w-72 h-72 rounded-full bg-[#E8A0BF]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-100px] w-80 h-80 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#E8A0BF]/15 text-[#E8A0BF] mb-3">
            <Sparkles className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <h2
            className="font-['Dancing_Script'] text-[#4A3728]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 3.2rem)" }}
          >
            Sepucuk Surat Untukmu
          </h2>
          <p className="font-['Lora'] text-[#8B7165] mt-2 italic" style={{ fontSize: "1rem" }}>
            Sebuah pesan tulus yang ditulis dari lubuk hati terdalam
          </p>
        </motion.div>

        {/* Interactive Envelope / Letter Container */}
        <div className="flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Closed Envelope View */
              <motion.div
                key="closed-envelope"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md flex flex-col items-center"
              >
                <div
                  onClick={handleOpenLetter}
                  className="group relative w-full cursor-pointer bg-gradient-to-br from-[#FFF5EE] to-[#FFEBE1] rounded-3xl p-8 border-2 border-[#E8A0BF]/30 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-center"
                >
                  {/* Decorative Stamp in corner */}
                  <div className="absolute top-5 right-5 border-2 border-dashed border-[#E8A0BF]/40 rounded-xl p-2 bg-white/70 shadow-sm flex flex-col items-center justify-center w-14 h-16 transform rotate-3">
                    <Heart className="w-5 h-5 text-[#E8A0BF] fill-[#E8A0BF] mb-1" />
                    <span className="font-['Playfair_Display'] text-[9px] text-[#8B7165] tracking-widest uppercase">
                      Special
                    </span>
                  </div>

                  {/* Envelope Front Design */}
                  <div className="py-8 flex flex-col items-center">
                    <motion.div
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="w-20 h-20 rounded-full bg-[#FFF9F5] border border-[#E8A0BF]/40 shadow-inner flex items-center justify-center mb-5"
                    >
                      <Mail className="w-10 h-10 text-[#E8A0BF]" />
                    </motion.div>

                    <h3 className="font-['Dancing_Script'] text-[#4A3728] font-bold" style={{ fontSize: "1.8rem" }}>
                      Untuk: Annisa Zahra ❤️
                    </h3>
                    <p className="font-['Lora'] text-[#8B7165] text-sm mt-1 italic">
                      Dari seseorang yang selalu mendoakanmu
                    </p>

                    {/* Wax Seal / Open Button */}
                    <div className="mt-8">
                      <span className="inline-flex items-center gap-2 bg-[#E8A0BF] text-white px-7 py-3 rounded-full font-['Playfair_Display'] text-sm tracking-wider shadow-md group-hover:bg-[#df8fae] group-hover:shadow-lg transition-all duration-200">
                        <Heart className="w-4 h-4 fill-white" />
                        Buka Surat
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-xs font-['Lora'] text-[#8B7165] italic flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Klik amplop di atas untuk membaca isi suratnya
                </p>
              </motion.div>
            ) : (
              /* Opened Letter View */
              <motion.div
                key="opened-letter"
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-12 md:p-16 border border-[#E8A0BF]/30 shadow-2xl relative overflow-hidden"
              >
                {/* Vintage Corner Decors */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#E8A0BF]/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                {/* Top Stamp / Date Header */}
                <div className="flex items-center justify-between border-b border-[#E8A0BF]/20 pb-5 mb-8">
                  <div className="flex items-center gap-2">
                    <MailOpen className="w-5 h-5 text-[#E8A0BF]" />
                    <span className="font-['Playfair_Display'] text-xs uppercase tracking-widest text-[#8B7165]">
                      Surat Istimewa Ulang Tahun
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-['Playfair_Display'] text-xs text-[#D4AF37] tracking-wider font-semibold">
                      Spesial ke-18 ✨
                    </span>
                  </div>
                </div>

                {/* Letter Body */}
                <div className="relative font-['Lora'] text-[#4A3728] space-y-5 leading-relaxed" style={{ lineHeight: 1.95 }}>
                  <p className="font-['Dancing_Script'] font-semibold text-[#E8A0BF]" style={{ fontSize: "1.6rem" }}>
                    Untuk Annisa Zahra tersayang,
                  </p>

                  <p className="text-[#4A3728]/90">
                    Di hari yang begitu istimewa ini, di usiamu yang ke-18 tahun, aku ingin kamu tahu betapa berartinya kehadiranmu dalam hidupku. Setiap detik yang kita lalui bersama adalah hadiah yang tak ternilai, dan aku sangat bersyukur pada Tuhan karena telah mempertemukan kita.
                  </p>

                  <p className="text-[#4A3728]/90">
                    Senyummu selalu berhasil membuat hari yang lelah menjadi tenang kembali. Kamu adalah tempat ternyaman untuk pulang, tempat di mana aku bisa menjadi diriku apa adanya. Terima kasih sudah menjadi sosok yang selalu hangat, pengertian, dan penuh ketulusan.
                  </p>

                  <p className="text-[#4A3728]/90">
                    Di lembaran hidupmu yang baru ini, aku mendoakan semua hal terbaik dan terindah untukmu. Semoga langkahmu selalu dimudahkan, setiap impian yang kamu simpan dalam hati perlahan terwujud, dan hari-harimu senantiasa dipenuhi tawa, kesehatan, dan keberkahan.
                  </p>

                  <p className="text-[#4A3728]/90">
                    Tetaplah menjadi Annisa yang ceria dan penuh cinta. Aku berjanji akan selalu ada di sini, menemani perjalananmu, menggenggam tanganmu, dan merayakan setiap kebahagiaan bersamamu.
                  </p>

                  {/* Sign off */}
                  <div className="pt-6 border-t border-[#E8A0BF]/20 text-right">
                    <p className="font-['Lora'] text-sm italic text-[#8B7165]">Dengan segenap kasih dan cinta,</p>
                    <p
                      className="font-['Dancing_Script'] text-[#E8A0BF] font-bold mt-1"
                      style={{ fontSize: "1.8rem" }}
                    >
                      — Yang selalu menyayangimu ❤️
                    </p>
                  </div>
                </div>

                {/* Fold Back Button */}
                <div className="mt-10 text-center">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-2 font-['Lora'] text-xs italic text-[#8B7165] hover:text-[#E8A0BF] transition-colors py-2 px-4 rounded-full border border-[#E8A0BF]/30 hover:border-[#E8A0BF] bg-white/70"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Lipat kembali surat
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
