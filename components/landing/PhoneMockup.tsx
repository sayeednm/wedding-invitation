'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface ThemePreview {
  id: string
  name: string
  bg: string
  accent: string
  label?: string
}

interface Props {
  theme: ThemePreview
  index: number
}

function StarSVG({ color, size = 12 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z" fill={color} opacity="0.85"/>
    </svg>
  )
}

// Mini preview undangan di dalam HP
function InvitationPreviewMini({ bg, accent }: { bg: string; accent: string }) {
  // Pre-computed values for Math.cos/sin to avoid hydration errors
  // angles: 0, 60, 120, 180, 240, 300 degrees
  const pts = [
    { cx: 12, cy: 0 },
    { cx: 6, cy: 10.39 },
    { cx: -6, cy: 10.39 },
    { cx: -12, cy: 0 },
    { cx: -6, cy: -10.39 },
    { cx: 6, cy: -10.39 },
  ]
  return (
    <div className="w-full h-full flex flex-col items-center overflow-hidden" style={{ background: bg }}>
      {/* Cover area */}
      <div className="w-full flex-1 flex flex-col items-center justify-center px-3 py-4 relative"
        style={{ background: bg }}>
        {/* Ornamen sudut kecil */}
        <div className="absolute top-0 left-0 w-8 h-8 opacity-30">
          <svg viewBox="0 0 32 32" fill="none">
            <circle cx="0" cy="0" r="20" stroke={accent} strokeWidth="0.5"/>
            {pts.map((p, i) => (
              <ellipse key={i} cx={p.cx} cy={p.cy}
                rx="3" ry="6" fill={accent} opacity="0.4"
                transform={`rotate(${i*60} ${p.cx} ${p.cy})`}/>
            ))}
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-8 h-8 opacity-30" style={{ transform: 'scaleX(-1)' }}>
          <svg viewBox="0 0 32 32" fill="none">
            <circle cx="0" cy="0" r="20" stroke={accent} strokeWidth="0.5"/>
            {pts.map((p, i) => (
              <ellipse key={i} cx={p.cx} cy={p.cy}
                rx="3" ry="6" fill={accent} opacity="0.4"
                transform={`rotate(${i*60} ${p.cx} ${p.cy})`}/>
            ))}
          </svg>
        </div>

        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at center, ${accent}18 0%, transparent 70%)` }}/>

        <p className="text-center relative z-10" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 5, letterSpacing: '0.3em', color: `${accent}80`, textTransform: 'uppercase', marginBottom: 4 }}>
          Undangan Pernikahan
        </p>

        {/* Garis ornamen */}
        <div className="flex items-center gap-1 mb-1 relative z-10" style={{ width: 60 }}>
          <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${accent})` }}/>
          <StarSVG color={accent} size={6}/>
          <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${accent})` }}/>
        </div>

        <p className="relative z-10" style={{ fontFamily: 'Great Vibes, cursive', fontSize: 18, color: accent, lineHeight: 1.1, textShadow: `0 0 10px ${accent}60` }}>
          Budi
        </p>
        <p className="relative z-10" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 7, color: `${accent}80`, fontStyle: 'italic', margin: '2px 0' }}>&amp;</p>
        <p className="relative z-10" style={{ fontFamily: 'Great Vibes, cursive', fontSize: 18, color: accent, lineHeight: 1.1, textShadow: `0 0 10px ${accent}60` }}>
          Sari
        </p>

        <div className="flex items-center gap-1 mt-1 relative z-10" style={{ width: 60 }}>
          <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${accent})` }}/>
          <StarSVG color={accent} size={6}/>
          <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${accent})` }}/>
        </div>

        <p className="mt-2 relative z-10" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 6, color: `${accent}60`, fontStyle: 'italic' }}>
          12 Desember 2026
        </p>
      </div>

      {/* Bottom section preview */}
      <div className="w-full px-3 py-2" style={{ background: `${accent}08`, borderTop: `1px solid ${accent}15` }}>
        <div className="flex justify-center gap-1 mb-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded" style={{ width: 20, height: 14, background: `${accent}20`, border: `1px solid ${accent}15` }}/>
          ))}
        </div>
        <div className="h-px w-full mb-1" style={{ background: `${accent}15` }}/>
        <div className="flex justify-center">
          <div className="rounded-full px-3 py-0.5 text-center" style={{ background: `${accent}20`, border: `1px solid ${accent}25` }}>
            <p style={{ fontSize: 5, color: accent, fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.1em' }}>BUKA UNDANGAN</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PhoneMockup({ theme, index }: Props) {
  return (
    <Link href={`/demo/${theme.id}`} target="_blank">
      <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="flex flex-col items-center gap-3 cursor-pointer group">

      {/* Phone frame */}
      <div className="relative" style={{ width: 120, height: 240 }}>
        {/* Outer frame */}
        <div className="absolute inset-0 rounded-[22px] shadow-2xl"
          style={{
            background: 'linear-gradient(145deg, #2a2a2a, #1a1a1a)',
            border: '2px solid #333',
            boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${theme.accent}20`,
          }}/>

        {/* Screen bezel */}
        <div className="absolute inset-[3px] rounded-[20px] overflow-hidden"
          style={{ background: '#000' }}>

          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
            style={{ width: 36, height: 8, background: '#1a1a1a', borderRadius: '0 0 8px 8px' }}/>

          {/* Screen content */}
          <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 18 }}>
            <InvitationPreviewMini bg={theme.bg} accent={theme.accent}/>
          </div>
        </div>

        {/* Side button */}
        <div className="absolute right-[-3px] top-16 w-1 h-8 rounded-r-sm"
          style={{ background: '#2a2a2a' }}/>
        <div className="absolute left-[-3px] top-14 w-1 h-6 rounded-l-sm"
          style={{ background: '#2a2a2a' }}/>
        <div className="absolute left-[-3px] top-22 w-1 h-6 rounded-l-sm"
          style={{ background: '#2a2a2a' }}/>

        {/* Screen glow on hover */}
        <motion.div
          className="absolute inset-[3px] rounded-[20px] pointer-events-none"
          style={{ boxShadow: `inset 0 0 20px ${theme.accent}00` }}
          whileHover={{ boxShadow: `inset 0 0 20px ${theme.accent}15` }}/>
      </div>

      {/* Label */}
      <div className="text-center">
        <p className="text-sm font-medium" style={{ color: 'var(--cream)' }}>{theme.name}</p>
        <p className="text-xs mt-1" style={{ color: `${theme.accent}70` }}>Klik untuk lihat contoh</p>
      </div>
    </motion.div>
    </Link>
  )
}
