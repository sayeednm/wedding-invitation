'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  photos: string[]
  interval?: number // ms
  className?: string
  style?: React.CSSProperties
}

export default function PhotoSlideshow({ photos, interval = 4000, className = '', style }: Props) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (photos.length <= 1) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % photos.length)
    }, interval)
    return () => clearInterval(timer)
  }, [photos.length, interval])

  if (!photos.length) return null

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      <AnimatePresence mode="sync">
        <motion.img
          key={current}
          src={photos[current]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {/* Dots indicator dihapus — tampilan lebih bersih */}
    </div>
  )
}
