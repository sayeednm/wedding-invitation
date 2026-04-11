'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

// Kelopak bunga SVG kecil
function Petal({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 10 14" fill="none">
      <path d="M5 1 Q9 4 8 8 Q7 12 5 13 Q3 12 2 8 Q1 4 5 1Z"
        fill={color} opacity="0.75" />
    </svg>
  )
}

// Bintang kecil
function StarParticle({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z"
        fill={color} opacity="0.7" />
    </svg>
  )
}

// Daun kecil
function LeafParticle({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 10 12" fill="none">
      <path d="M5 1 Q10 3 9 7 Q8 11 5 11 Q2 11 1 7 Q0 3 5 1Z"
        fill={color} opacity="0.6" />
      <path d="M5 1 L5 11" stroke={color} strokeWidth="0.5" opacity="0.4" />
    </svg>
  )
}

// Kristal kecil
function CrystalParticle({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 8 12" fill="none">
      <path d="M4 0 L8 4 L6 12 L2 12 L0 4 Z"
        fill={color} opacity="0.5" />
      <path d="M4 0 L8 4 M4 0 L0 4" stroke={color} strokeWidth="0.5" opacity="0.4" />
    </svg>
  )
}

type ParticleType = 'petal' | 'star' | 'leaf' | 'crystal'

interface Props {
  color: string
  type?: ParticleType
  count?: number
}

function ParticleShape({ type, color, size }: { type: ParticleType; color: string; size: number }) {
  switch (type) {
    case 'petal':   return <Petal color={color} size={size} />
    case 'star':    return <StarParticle color={color} size={size} />
    case 'leaf':    return <LeafParticle color={color} size={size} />
    case 'crystal': return <CrystalParticle color={color} size={size} />
  }
}

export default function FloatingParticles({ color, type = 'petal', count = 8 }: Props) {
  const particles = useMemo(() => (
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: 5 + (i * 11 + (i % 3) * 7) % 90,
      size: 6 + (i % 3) * 3,
      duration: 8 + (i % 4) * 3,
      delay: i * 1.2,
      rotate: (i % 2 === 0) ? 360 : -360,
      drift: (i % 2 === 0) ? 30 : -30,
    }))
  ), [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          style={{ position: 'absolute', left: `${p.left}%`, top: -20 }}
          initial={{ y: -20, opacity: 0, rotate: 0, x: 0 }}
          animate={{
            y: ['0vh', '105vh'],
            opacity: [0, 0.8, 0.8, 0],
            rotate: p.rotate,
            x: [0, p.drift, 0, -p.drift, 0],
          }}
          transition={{
            y: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' },
            opacity: { duration: p.duration, delay: p.delay, repeat: Infinity, times: [0, 0.1, 0.85, 1] },
            rotate: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' },
            x: { duration: p.duration / 2, delay: p.delay, repeat: Infinity, ease: 'easeInOut' },
          }}>
          <ParticleShape type={type} color={color} size={p.size} />
        </motion.div>
      ))}
    </div>
  )
}
