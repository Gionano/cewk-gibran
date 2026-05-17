import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircleHeart, Send } from "lucide-react";

interface Message {
  id: number;
  name: string;
  message: string;
  date: string;
}

const initialMessages: Message[] = [
  { id: 1, name: "Mama & Papa", message: "Selamat ulang tahun nak! Semoga selalu diberi kesehatan, kebahagiaan, dan kesuksesan. Kami sangat bangga padamu.", date: "15 Juni 2026" },
  { id: 2, name: "Dina", message: "Happy birthday bestie! Semoga tahun ini lebih indah dari tahun-tahun sebelumnya. Love you so much!", date: "16 Juni 2026" },
  { id: 3, name: "Rizky", message: "Met ultah Annisa! Semoga semua wish-mu terkabul ya. Stay awesome!", date: "17 Juni 2026" },
];

export function GuestbookSection() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setMessages((prev) => [
      {
        id: Date.now(),
        name: name.trim(),
        message: message.trim(),
        date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      },
      ...prev,
    ]);
    setName("");
    setMessage("");
  };

  return (
    <section id="ucapan" className="py-20 px-6 bg-white/50">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <MessageCircleHeart className="w-8 h-8 mx-auto text-[#D4AF37] mb-3" />
          <h2 className="font-['Dancing_Script'] text-[#4A3728]" style={{ fontSize: "2.5rem" }}>
            Ucapan & Doa
          </h2>
          <p className="font-['Lora'] text-[#8B7165] mt-2 italic">
            Tinggalkan pesan dan doa terbaikmu untuk Annisa
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-10 border border-[#E8A0BF]/20"
        >
          <input
            type="text"
            placeholder="Nama kamu"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 px-5 py-3 rounded-xl bg-[#FFF9F5] border border-[#E8A0BF]/20 focus:border-[#E8A0BF] focus:ring-2 focus:ring-[#E8A0BF]/20 outline-none transition font-['Lora'] text-[#4A3728] placeholder:text-[#C4A898]"
          />
          <textarea
            placeholder="Tulis ucapan dan doamu di sini..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full mb-4 px-5 py-3 rounded-xl bg-[#FFF9F5] border border-[#E8A0BF]/20 focus:border-[#E8A0BF] focus:ring-2 focus:ring-[#E8A0BF]/20 outline-none transition font-['Lora'] text-[#4A3728] placeholder:text-[#C4A898] resize-none"
          />
          <button
            type="submit"
            className="bg-[#E8A0BF] text-white px-6 py-3 rounded-full hover:bg-[#D98CB0] transition-colors flex items-center gap-2 mx-auto font-['Playfair_Display']"
          >
            <Send className="w-4 h-4" />
            Kirim Ucapan
          </button>
        </motion.form>

        {/* Messages */}
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8A0BF]/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-['Playfair_Display'] text-[#4A3728]">{msg.name}</span>
                  <span className="text-[#C4A898] font-['Lora']" style={{ fontSize: "0.8rem" }}>
                    {msg.date}
                  </span>
                </div>
                <p className="font-['Lora'] text-[#8B7165]">{msg.message}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
