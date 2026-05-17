import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export function LoveLetterSection() {
  return (
    <section id="surat" className="py-20 px-6 bg-gradient-to-b from-[#FFF9F5] to-[#FFF0E6]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <Sparkles className="w-8 h-8 mx-auto text-[#D4AF37] mb-3" />
          <h2 className="font-['Dancing_Script'] text-[#4A3728]" style={{ fontSize: "2.5rem" }}>
            Surat Untukmu
          </h2>
        </motion.div>

        {/* Love letter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-[#E8A0BF]/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8A0BF]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#D4AF37]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative font-['Lora'] text-[#4A3728] space-y-4" style={{ lineHeight: 1.9 }}>
            <p className="italic text-[#8B7165]">Untuk Annisa Zahra tersayang,</p>
            <p>
              Di hari istimewamu ini, aku ingin kamu tahu betapa berartinya kamu dalam hidupku.
              Setiap hari bersamamu terasa seperti hadiah yang tak ternilai, dan aku bersyukur
              kepada Tuhan karena telah mempertemukan kita.
            </p>
            <p>
              Kamu adalah alasan mengapa aku bangun setiap pagi dengan senyuman. Kamu adalah
              rumah yang selalu aku rindukan, pelabuhan hati yang paling damai. Terima kasih
              telah menjadi partner terbaikku, sahabatku, dan cinta sejatiku.
            </p>
            <p>
              Di ulang tahunmu yang ke-24 ini, aku mendoakan semua kebahagiaan dunia untukmu.
              Semoga setiap mimpimu terwujud, setiap langkahmu diberkahi, dan setiap harimu
              dipenuhi tawa dan cinta.
            </p>
            <p className="text-right italic text-[#E8A0BF] mt-6">
              Dengan segenap cinta,
              <br />
              — Kekasihmu
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
