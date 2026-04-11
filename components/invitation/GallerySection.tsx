'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { GalleryPhoto } from '@/lib/types'

interface Props {
  photos: GalleryPhoto[]
  accentColor: string
}

export default function GallerySection({ photos, accentColor }: Props) {
  const [selected, setSelected] = useState<GalleryPhoto | null>(null)

  if (!photos.length) return null

  return (
    <div className="px-4 py-8">
      <div className="text-center mb-6">
        <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: accentColor }}>Galeri</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, color: 'white' }}>Momen Berharga</h2>
      </div>

      {/* Grid foto */}
      <div className="grid grid-cols-3 gap-1.5">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            onClick={() => setSelected(photo)}
            className="relative cursor-pointer overflow-hidden rounded-lg"
            style={{ aspectRatio: '1', border: `1px solid ${accentColor}20` }}>
            <img src={photo.photo_url} alt={photo.caption || ''} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"/>
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
              style={{ background: `${accentColor}25` }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="white" opacity="0.9">
                <path d="M10 0 L11.8 8.2 L20 10 L11.8 11.8 L10 20 L8.2 11.8 L0 10 L8.2 8.2 Z"/>
              </svg>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.92)' }}
            onClick={() => setSelected(null)}>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-sm w-full">
              <img src={selected.photo_url} alt={selected.caption || ''} className="w-full rounded-2xl"/>
              {selected.caption && (
                <p className="text-center mt-3 text-sm text-gray-300"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
                  {selected.caption}
                </p>
              )}
              <button onClick={() => setSelected(null)}
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm"
                style={{ background: accentColor, color: '#0a0a0a' }}>✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
