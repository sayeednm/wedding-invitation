'use client'

import { motion } from 'framer-motion'
import { useMemo, useEffect, useState } from 'react'

type EffectType = 'petals' | 'stars' | 'leaves' | 'crystals' | 'sparks'

interface Props {
  type: EffectType
  color: string
  count?: number
}

// Deteksi mobile untuk kurangi jumlah partikel
function useParticleCount(base: number) {
  const [count, setCount] = useState(base)
  useEffect(() => {
    if (window.innerWidth < 768) setCount(Math.ceil(base * 0.5))
  }, [base])
  return count
}

// Style GPU-accelerated untuk semua partikel
const gpuStyle = { willChange: 'transform, opacity' }

function FallingPetals({ color, count }: { color: string; count: number }) {
  const n = useParticleCount(count)
  const petals = useMemo(() => Array.from({ length: n }, (_, i) => ({
    id: i,
    left: (i * 13 + 3) % 95,
    size: 6 + (i % 4) * 3,
    duration: 8 + (i % 5) * 2,
    delay: (i * 1.8) % 12,
    rotate: (i % 2 === 0) ? 360 : -360,
    drift: ((i % 3) - 1) * 40,
    opacity: 0.3 + (i % 3) * 0.15,
  })), [n])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      {petals.map(p => (
        <motion.div key={p.id}
          style={{ position: 'absolute', left: `${p.left}%`, top: -20, ...gpuStyle }}
          initial={{ y: -20, opacity: 0, rotate: 0, x: 0 }}
          animate={{ y: '105vh', opacity: [0, p.opacity, p.opacity, 0], rotate: p.rotate, x: [0, p.drift, 0, -p.drift, 0] }}
          transition={{
            y: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' },
            opacity: { duration: p.duration, delay: p.delay, repeat: Infinity, times: [0, 0.1, 0.85, 1] },
            rotate: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' },
            x: { duration: p.duration / 2, delay: p.delay, repeat: Infinity, ease: 'easeInOut' },
          }}>
          <svg width={p.size} height={p.size * 1.3} viewBox="0 0 10 13" fill="none">
            <path d="M5 1 Q9 3 8 7 Q7 11 5 12 Q3 11 2 7 Q1 3 5 1Z" fill={color} opacity="0.85"/>
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

function FallingStars({ color, count }: { color: string; count: number }) {
  const n = useParticleCount(count)
  const stars = useMemo(() => Array.from({ length: n }, (_, i) => ({
    id: i,
    left: (i * 11 + 5) % 95,
    size: 4 + (i % 3) * 3,
    duration: 6 + (i % 4) * 2,
    delay: (i * 1.5) % 10,
    opacity: 0.25 + (i % 3) * 0.15,
  })), [n])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      {stars.map(p => (
        <motion.div key={p.id}
          style={{ position: 'absolute', left: `${p.left}%`, top: -20, ...gpuStyle }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: '105vh', opacity: [0, p.opacity, p.opacity, 0] }}
          transition={{
            y: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' },
            opacity: { duration: p.duration, delay: p.delay, repeat: Infinity, times: [0, 0.1, 0.85, 1] },
          }}>
          <svg width={p.size} height={p.size} viewBox="0 0 12 12">
            <path d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z" fill={color} opacity="0.9"/>
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

function FallingLeaves({ color, count }: { color: string; count: number }) {
  const n = useParticleCount(count)
  const leaves = useMemo(() => Array.from({ length: n }, (_, i) => ({
    id: i,
    left: (i * 14 + 4) % 95,
    size: 8 + (i % 3) * 4,
    duration: 9 + (i % 4) * 2.5,
    delay: (i * 2) % 14,
    rotate: (i % 2 === 0) ? 270 : -270,
    drift: ((i % 3) - 1) * 50,
    opacity: 0.25 + (i % 3) * 0.12,
  })), [n])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      {leaves.map(p => (
        <motion.div key={p.id}
          style={{ position: 'absolute', left: `${p.left}%`, top: -20, ...gpuStyle }}
          initial={{ y: -20, opacity: 0, rotate: 0, x: 0 }}
          animate={{ y: '105vh', opacity: [0, p.opacity, p.opacity, 0], rotate: p.rotate, x: [0, p.drift, 0, -p.drift, 0] }}
          transition={{
            y: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' },
            opacity: { duration: p.duration, delay: p.delay, repeat: Infinity, times: [0, 0.1, 0.85, 1] },
            rotate: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' },
            x: { duration: p.duration / 2, delay: p.delay, repeat: Infinity, ease: 'easeInOut' },
          }}>
          <svg width={p.size} height={p.size * 1.2} viewBox="0 0 10 12" fill="none">
            <path d="M5 1 Q10 3 9 7 Q8 11 5 11 Q2 11 1 7 Q0 3 5 1Z" fill={color} opacity="0.8"/>
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

function FallingCrystals({ color, count }: { color: string; count: number }) {
  const n = useParticleCount(count)
  const crystals = useMemo(() => Array.from({ length: n }, (_, i) => ({
    id: i,
    left: (i * 12 + 6) % 95,
    size: 5 + (i % 3) * 3,
    duration: 7 + (i % 4) * 2,
    delay: (i * 1.6) % 11,
    opacity: 0.2 + (i % 3) * 0.12,
  })), [n])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      {crystals.map(p => (
        <motion.div key={p.id}
          style={{ position: 'absolute', left: `${p.left}%`, top: -20, ...gpuStyle }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{ y: '105vh', opacity: [0, p.opacity, p.opacity, 0], rotate: [0, 180, 360] }}
          transition={{
            y: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' },
            opacity: { duration: p.duration, delay: p.delay, repeat: Infinity, times: [0, 0.1, 0.85, 1] },
            rotate: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' },
          }}>
          <svg width={p.size} height={p.size * 1.5} viewBox="0 0 8 12" fill="none">
            <path d="M4 0 L8 4 L6 12 L2 12 L0 4 Z" fill={color} opacity="0.6"/>
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

function GoldSparks({ color, count }: { color: string; count: number }) {
  const n = useParticleCount(count)
  const sparks = useMemo(() => Array.from({ length: n }, (_, i) => ({
    id: i,
    left: (i * 15 + 2) % 95,
    size: 3 + (i % 3) * 2,
    duration: 5 + (i % 4) * 1.5,
    delay: (i * 1.2) % 9,
    opacity: 0.3 + (i % 3) * 0.2,
    drift: ((i % 5) - 2) * 30,
  })), [n])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      {sparks.map(p => (
        <motion.div key={p.id}
          style={{ position: 'absolute', left: `${p.left}%`, top: -10, ...gpuStyle }}
          initial={{ y: -10, opacity: 0, x: 0 }}
          animate={{ y: '105vh', opacity: [0, p.opacity, p.opacity, 0], x: [0, p.drift, 0] }}
          transition={{
            y: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' },
            opacity: { duration: p.duration, delay: p.delay, repeat: Infinity, times: [0, 0.08, 0.9, 1] },
            x: { duration: p.duration / 2, delay: p.delay, repeat: Infinity, ease: 'easeInOut' },
          }}>
          <svg width={p.size} height={p.size} viewBox="0 0 8 8">
            <path d="M4 0 L4.8 3.2 L8 4 L4.8 4.8 L4 8 L3.2 4.8 L0 4 L3.2 3.2 Z" fill={color} opacity="0.9"/>
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

export default function AmbientEffect({ type, color, count = 12 }: Props) {
  switch (type) {
    case 'petals':   return <FallingPetals color={color} count={count}/>
    case 'stars':    return <FallingStars color={color} count={count}/>
    case 'leaves':   return <FallingLeaves color={color} count={count}/>
    case 'crystals': return <FallingCrystals color={color} count={count}/>
    case 'sparks':   return <GoldSparks color={color} count={count}/>
  }
}
