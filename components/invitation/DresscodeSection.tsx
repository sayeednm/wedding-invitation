'use client'

import { motion } from 'framer-motion'

interface Props {
  color: string
  note?: string | null
  accentColor: string
}

export default function DresscodeSection({ color, note, accentColor }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="px-6 py-8" style={{ background: 'rgba(0,0,0,0.2)' }}>
      <p className="text-xs tracking-[0.4em] uppercase mb-2 text-center" style={{ color: accentColor }}>Dresscode</p>
      <h2 className="text-center mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: 'white' }}>
        Kode Berpakaian
      </h2>

      {/* Color swatch */}
      <div className="flex justify-center mb-4">
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-full border-4 shadow-lg"
            style={{ background: color, borderColor: `${accentColor}40`, boxShadow: `0 0 20px ${color}44` }} />
          <p className="text-xs text-gray-400 font-mono">{color}</p>
        </div>
      </div>

      {note && (
        <p className="text-center text-sm text-gray-300 mt-3 leading-relaxed"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
          {note}
        </p>
      )}
    </motion.div>
  )
}
