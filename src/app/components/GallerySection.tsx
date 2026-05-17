import { motion } from "motion/react";
import { Camera } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const photos = [
  { src: "https://images.unsplash.com/photo-1596476792213-b30b2dc0e7c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMHN1bnNldCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NjIzNzU2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", caption: "Sunset pertama kita bersama" },
  { src: "https://images.unsplash.com/photo-1671116810355-2498212d1e13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBoYXBweSUyMGRhdGUlMjByZXN0YXVyYW50fGVufDF8fHx8MTc3NjIzNzU2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", caption: "Dinner date yang tak terlupakan" },
  { src: "https://images.unsplash.com/photo-1750870799067-3ff68f7468b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBiZWFjaCUyMHJvbWFudGljJTIwd2Fsa3xlbnwxfHx8fDE3NzYyMzc1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", caption: "Jalan-jalan di pantai" },
  { src: "https://images.unsplash.com/photo-1630276740239-5d9c23d49531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBsYXVnaGluZyUyMHBpY25pYyUyMHBhcmt8ZW58MXx8fHwxNzc2MjM3NTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", caption: "Piknik di taman favorit" },
  { src: "https://images.unsplash.com/photo-1775204606627-95941b1f33f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjB0cmF2ZWwlMjBhZHZlbnR1cmUlMjBtb3VudGFpbnxlbnwxfHx8fDE3NzYyMzc1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", caption: "Petualangan kita ke gunung" },
  { src: "https://images.unsplash.com/photo-1758522490155-b338da47f09f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBjb3p5JTIwY29mZmVlJTIwbW9ybmluZ3xlbnwxfHx8fDE3NzYyMzc1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", caption: "Pagi yang hangat bersama kopi" },
  { src: "https://images.unsplash.com/photo-1775653618766-aac60cfb08ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBkYW5jaW5nJTIwbmlnaHQlMjByb21hbnRpY3xlbnwxfHx8fDE3NzYyMzc1Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", caption: "Dansa di malam hari" },
  { src: "https://images.unsplash.com/photo-1770582071210-dad5c6cf1c27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBnYXJkZW4lMjBmbG93ZXJzJTIwcm9tYW50aWN8ZW58MXx8fHwxNzc2MjM3NTY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", caption: "Di taman bunga bersama" },
];

export function GallerySection() {
  return (
    <section id="kenangan" className="py-20 px-6 bg-white/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <Camera className="w-8 h-8 mx-auto text-[#D4AF37] mb-3" />
          <h2 className="font-['Dancing_Script'] text-[#4A3728]" style={{ fontSize: "2.5rem" }}>
            Kenangan Kita
          </h2>
          <p className="font-['Lora'] text-[#8B7165] mt-2 italic">
            Setiap momen bersamamu adalah hadiah terindah
          </p>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <ImageWithFallback
                src={photo.src}
                alt={photo.caption}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white font-['Lora'] italic">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
