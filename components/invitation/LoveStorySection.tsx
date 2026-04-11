'use client'

import { motion } from 'framer-motion'

interface Props {
  story: string
  accentColor: string
}

export default function LoveStorySection({ story, accentColor }: Props) {
  // Parse story — format: "Judul|Tanggal|Cerita" per baris, dipisah newline
  // Atau kalau plain text, tampilkan langsung
  const lines = story.split('\n').filter(l => l.trim())
  const isStructured = lines.some(l => l.includes('|'))

  const events = isStructured
    ? lines.map(l => {
        const [title, date, desc] = l.split('|')
        return { title: title?.trim(), date: date?.trim(), desc: desc?.trim() }
      })
    : [{ title: 'Kisah Cinta Kami', date: '', desc: story }]

  return (
    <div className="px-6 py-8">
      <div className="text-center mb-8">
        <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: accentColor }}>Our Story</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, color: 'white' }}>Perjalanan Cinta</h2>
      </div>

      <div className="relative">
        {/* Garis timeline */}
        <div className="absolute left-4 top-0 bottom-0 w-px"
          style={{ background: `linear-gradient(to bottom, transparent, ${accentColor}50, transparent)` }}/>

        <div className="space-y-8">
          {events.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="pl-12 relative">
              {/* Dot */}
              <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full -translate-x-1/2"
                style={{ background: accentColor, boxShadow: `0 0 10px ${accentColor}80` }}/>

              {ev.title && (
                <p className="text-sm font-medium mb-1" style={{ color: accentColor, fontFamily: 'Cormorant Garamond, serif', fontSize: 16 }}>
                  {ev.title}
                </p>
              )}
              {ev.date && (
                <p className="text-xs text-gray-500 mb-2">{ev.date}</p>
              )}
              {ev.desc && (
                <p className="text-sm text-gray-300 leading-relaxed"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 14, fontStyle: 'italic' }}>
                  {ev.desc}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
