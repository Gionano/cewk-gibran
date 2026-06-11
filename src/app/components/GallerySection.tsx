import { motion } from "motion/react";
import { Camera } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const photos = [
  { src: "/images/1.jpeg" },
  { src: "/images/2.jpeg" },
  { src: "/images/3.jpeg" },
  { src: "/images/4.jpeg" },
  { src: "/images/5.jpeg" },
  { src: "/images/6.jpeg" },
  { src: "/images/7.jpeg" },
  { src: "/images/8.jpeg" },
  { src: "/images/9.jpeg" },
  { src: "/images/10.jpeg" },
  { src: "/images/11.jpeg" },
  { src: "/images/12.jpeg" },
  { src: "/images/13.jpeg" },
  { src: "/images/14.jpeg" },
  { src: "/images/15.jpeg" },
  { src: "/images/16.jpeg" },
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
