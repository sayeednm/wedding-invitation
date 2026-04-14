'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { GalleryPhoto } from '@/lib/types'

interface Props {
  photos: GalleryPhoto[]
  accentColor: string
}

export default function GallerySection({ photos, accentColor }: Props) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [direction, setDirection] = useState(0)
  const touchStartX = useRef(0)

  if (!photos.length) return null

  function navigate(dir: number) {
    if (selectedIdx === null) return
    setDirection(dir)
    setSelectedIdx((selectedIdx + dir + photos.length) % photos.length)
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') navigate(1)
    if (e.key === 'ArrowLeft') navigate(-1)
    if (e.key === 'Escape') setSelectedIdx(null)
  }

  const selected = selectedIdx !== null ? photos[selectedIdx] : null

  return (
    <div className="px-4 py-8">
      <div className="text-center mb-6">
        <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: accentColor }}>Galeri</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, color: 'white' }}>Momen Berharga</h2>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => { setDirection(0); setSelectedIdx(i) }}
            className="relative cursor-pointer overflow-hidden rounded-lg"
            style={{ aspectRatio: '1', border: `1px solid ${accentColor}20` }}>
            <img
              src={photo.photo_url}
              alt={photo.caption || ''}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
              style={{ background: `${accentColor}25` }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
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
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.95)' }}
            onClick={() => setSelectedIdx(null)}
            onKeyDown={handleKeyDown}
            tabIndex={0}>

            {/* Prev */}
            {photos.length > 1 && (
              <button
                onClick={e => { e.stopPropagation(); navigate(-1) }}
                className="absolute left-3 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
                ‹
              </button>
            )}

            <motion.div
              key={selectedIdx}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative max-w-sm w-full mx-14">
              <img
                src={selected.photo_url}
                alt={selected.caption || ''}
                className="w-full rounded-2xl"
                style={{ maxHeight: '75vh', objectFit: 'contain' }}
              />
              {selected.caption && (
                <p className="text-center mt-3 text-sm text-gray-300"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
                  {selected.caption}
                </p>
              )}
              {/* Counter */}
              <p className="text-center mt-2 text-xs text-gray-500">
                {(selectedIdx ?? 0) + 1} / {photos.length}
              </p>
            </motion.div>

            {/* Next */}
            {photos.length > 1 && (
              <button
                onClick={e => { e.stopPropagation(); navigate(1) }}
                className="absolute right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
                ›
              </button>
            )}

            {/* Close */}
            <button
              onClick={() => setSelectedIdx(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all hover:scale-110"
              style={{ background: accentColor, color: '#0a0a0a' }}>
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
