'use client'

import { motion } from 'framer-motion'

interface Props {
  color: string
  size?: number
  opacity?: number
  animate?: boolean
}

export function FlowerCorner({ color, position, size = 160, opacity = 0.5 }: {
  color: string
  position: 'tl' | 'tr' | 'bl' | 'br'
  size?: number
  opacity?: number
}) {
  const transforms = {
    tl: 'translate(0,0)',
    tr: 'translate(100%,0) scaleX(-1)',
    bl: 'translate(0,100%) scaleY(-1)',
    br: 'translate(100%,100%) scale(-1,-1)',
  }

  const posStyle: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    opacity,
    pointerEvents: 'none',
    zIndex: 1,
    ...(position === 'tl' && { top: 0, left: 0 }),
    ...(position === 'tr' && { top: 0, right: 0 }),
    ...(position === 'bl' && { bottom: 0, left: 0 }),
    ...(position === 'br' && { bottom: 0, right: 0 }),
  }

  const flipStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    ...(position === 'tr' && { transform: 'scaleX(-1)' }),
    ...(position === 'bl' && { transform: 'scaleY(-1)' }),
    ...(position === 'br' && { transform: 'scale(-1,-1)' }),
  }

  return (
    <div style={posStyle}>
      <svg style={flipStyle} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Large rose */}
        <g transform="translate(18,18)">
          {/* Outer petals */}
          <ellipse cx="22" cy="6" rx="5" ry="10" fill={color} opacity="0.5" transform="rotate(0 22 22)" />
          <ellipse cx="35" cy="10" rx="5" ry="10" fill={color} opacity="0.45" transform="rotate(40 22 22)" />
          <ellipse cx="38" cy="22" rx="5" ry="10" fill={color} opacity="0.45" transform="rotate(80 22 22)" />
          <ellipse cx="32" cy="34" rx="5" ry="10" fill={color} opacity="0.45" transform="rotate(120 22 22)" />
          <ellipse cx="22" cy="38" rx="5" ry="10" fill={color} opacity="0.5" transform="rotate(160 22 22)" />
          <ellipse cx="10" cy="34" rx="5" ry="10" fill={color} opacity="0.45" transform="rotate(200 22 22)" />
          <ellipse cx="6" cy="22" rx="5" ry="10" fill={color} opacity="0.45" transform="rotate(240 22 22)" />
          <ellipse cx="10" cy="10" rx="5" ry="10" fill={color} opacity="0.45" transform="rotate(280 22 22)" />
          {/* Inner petals */}
          <ellipse cx="22" cy="12" rx="4" ry="8" fill={color} opacity="0.65" transform="rotate(20 22 22)" />
          <ellipse cx="30" cy="16" rx="4" ry="8" fill={color} opacity="0.65" transform="rotate(60 22 22)" />
          <ellipse cx="32" cy="26" rx="4" ry="8" fill={color} opacity="0.65" transform="rotate(100 22 22)" />
          <ellipse cx="26" cy="32" rx="4" ry="8" fill={color} opacity="0.65" transform="rotate(140 22 22)" />
          <ellipse cx="16" cy="30" rx="4" ry="8" fill={color} opacity="0.65" transform="rotate(180 22 22)" />
          <ellipse cx="12" cy="22" rx="4" ry="8" fill={color} opacity="0.65" transform="rotate(220 22 22)" />
          {/* Center */}
          <circle cx="22" cy="22" r="7" fill={color} opacity="0.85" />
          <circle cx="22" cy="22" r="4" fill={color} opacity="1" />
        </g>

        {/* Stem curves */}
        <path d="M40 40 Q70 55 100 35" stroke={color} strokeWidth="1.2" fill="none" opacity="0.4" strokeLinecap="round" />
        <path d="M40 40 Q45 80 25 110" stroke={color} strokeWidth="1.2" fill="none" opacity="0.4" strokeLinecap="round" />
        <path d="M40 40 Q80 80 70 120" stroke={color} strokeWidth="1" fill="none" opacity="0.3" strokeLinecap="round" />

        {/* Leaf 1 */}
        <path d="M55 50 Q65 38 75 48 Q65 58 55 50Z" fill={color} opacity="0.35" />
        {/* Leaf 2 */}
        <path d="M35 75 Q22 65 28 52 Q40 62 35 75Z" fill={color} opacity="0.35" />
        {/* Leaf 3 */}
        <path d="M55 90 Q68 82 72 95 Q60 100 55 90Z" fill={color} opacity="0.3" />

        {/* Small flower 1 */}
        <g transform="translate(88,28)">
          <ellipse cx="10" cy="3" rx="3" ry="6" fill={color} opacity="0.5" transform="rotate(0 10 10)" />
          <ellipse cx="15" cy="5" rx="3" ry="6" fill={color} opacity="0.45" transform="rotate(60 10 10)" />
          <ellipse cx="17" cy="10" rx="3" ry="6" fill={color} opacity="0.45" transform="rotate(120 10 10)" />
          <ellipse cx="13" cy="16" rx="3" ry="6" fill={color} opacity="0.45" transform="rotate(180 10 10)" />
          <ellipse cx="7" cy="15" rx="3" ry="6" fill={color} opacity="0.45" transform="rotate(240 10 10)" />
          <ellipse cx="4" cy="10" rx="3" ry="6" fill={color} opacity="0.45" transform="rotate(300 10 10)" />
          <circle cx="10" cy="10" r="4" fill={color} opacity="0.8" />
        </g>

        {/* Small flower 2 */}
        <g transform="translate(18,95)">
          <ellipse cx="8" cy="2" rx="2.5" ry="5" fill={color} opacity="0.45" transform="rotate(0 8 8)" />
          <ellipse cx="13" cy="4" rx="2.5" ry="5" fill={color} opacity="0.4" transform="rotate(60 8 8)" />
          <ellipse cx="14" cy="9" rx="2.5" ry="5" fill={color} opacity="0.4" transform="rotate(120 8 8)" />
          <ellipse cx="10" cy="14" rx="2.5" ry="5" fill={color} opacity="0.4" transform="rotate(180 8 8)" />
          <ellipse cx="4" cy="12" rx="2.5" ry="5" fill={color} opacity="0.4" transform="rotate(240 8 8)" />
          <ellipse cx="2" cy="7" rx="2.5" ry="5" fill={color} opacity="0.4" transform="rotate(300 8 8)" />
          <circle cx="8" cy="8" r="3" fill={color} opacity="0.75" />
        </g>

        {/* Tiny flower 3 */}
        <g transform="translate(58,108)">
          <ellipse cx="6" cy="1" rx="2" ry="4" fill={color} opacity="0.4" transform="rotate(0 6 6)" />
          <ellipse cx="10" cy="3" rx="2" ry="4" fill={color} opacity="0.35" transform="rotate(72 6 6)" />
          <ellipse cx="10" cy="8" rx="2" ry="4" fill={color} opacity="0.35" transform="rotate(144 6 6)" />
          <ellipse cx="6" cy="11" rx="2" ry="4" fill={color} opacity="0.35" transform="rotate(216 6 6)" />
          <ellipse cx="2" cy="8" rx="2" ry="4" fill={color} opacity="0.35" transform="rotate(288 6 6)" />
          <circle cx="6" cy="6" r="2.5" fill={color} opacity="0.7" />
        </g>

        {/* Dots */}
        <circle cx="75" cy="70" r="1.5" fill={color} opacity="0.3" />
        <circle cx="85" cy="85" r="1" fill={color} opacity="0.25" />
        <circle cx="50" cy="130" r="1.5" fill={color} opacity="0.25" />
        <circle cx="100" cy="60" r="1" fill={color} opacity="0.2" />
      </svg>
    </div>
  )
}

export function FallingPetal({ color, delay, x }: { color: string; delay: number; x: number }) {
  // Fixed duration based on delay to avoid hydration mismatch
  const duration = 6 + (delay % 4)
  return (
    <motion.div
      initial={{ y: -20, x, opacity: 0, rotate: 0, scale: 0.5 }}
      animate={{ y: '110vh', opacity: [0, 0.8, 0.8, 0], rotate: 360, scale: [0.5, 1, 0.8] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
      style={{ position: 'fixed', top: 0, pointerEvents: 'none', zIndex: 60 }}>
      <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
        <ellipse cx="8" cy="10" rx="5" ry="9" fill={color} opacity="0.7" transform="rotate(15 8 10)" />
      </svg>
    </motion.div>
  )
}
