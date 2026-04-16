'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Invitation } from '@/lib/types'
import { FlowerCorner } from './FlowerSVG'

interface Props {
  invitation: Invitation
  guestName?: string
  onOpen: () => void
  accentColor: string
  bgFrom: string
  bgTo: string
  CornerComponent?: React.ComponentType<{ color: string; position: 'tl'|'tr'|'bl'|'br'; size?: number; opacity?: number }>
}

function GoldParticles({ color }: { color: string }) {
  const particles = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: (i * 17 + 5) % 95,
    y: (i * 23 + 10) % 90,
    size: 2 + (i % 3) * 2,
    duration: 3 + (i % 4),
    delay: (i % 5) * 0.6,
  })), [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div key={p.id}
          style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [-10, 10, -10], opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}>
          <svg width={p.size} height={p.size} viewBox="0 0 8 8">
            <path d="M4 0 L4.8 3.2 L8 4 L4.8 4.8 L4 8 L3.2 4.8 L0 4 L3.2 3.2 Z" fill={color} opacity="0.8"/>
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

export default function OpeningCover({ invitation, guestName, onOpen, accentColor, bgFrom, bgTo, CornerComponent = FlowerCorner }: Props) {
  const [visible, setVisible] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(t)
  }, [])

  function handleOpen() {
    setVisible(false)
    setTimeout(onOpen, 700)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="opening"
          className="fixed inset-0 z-[100] overflow-hidden"
          style={{ background: `linear-gradient(160deg, ${bgFrom} 0%, ${bgTo} 60%, ${bgFrom} 100%)` }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06, filter: 'blur(6px)' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>

          <GoldParticles color={accentColor}/>

          {/* Light sweep */}
          <motion.div className="absolute inset-0 pointer-events-none"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 2.5, delay: 0.5, ease: 'easeInOut' }}
            style={{ background: `linear-gradient(90deg, transparent 0%, ${accentColor}08 40%, ${accentColor}20 50%, ${accentColor}08 60%, transparent 100%)`, width: '60%' }}/>

          <CornerComponent color={accentColor} position="tl" size={200} opacity={0.4}/>
          <CornerComponent color={accentColor} position="tr" size={200} opacity={0.4}/>
          <CornerComponent color={accentColor} position="bl" size={160} opacity={0.3}/>
          <CornerComponent color={accentColor} position="br" size={160} opacity={0.3}/>

          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${accentColor}15 0%, transparent 70%)` }}/>

          {showContent && (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">

              <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 13, fontStyle: 'italic', color: `${accentColor}80` }}>
                Bismillahirrahmanirrahim
              </motion.p>

              <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4 my-5 w-full max-w-xs">
                <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${accentColor})` }}/>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path d="M10 0 L11.8 8.2 L20 10 L11.8 11.8 L10 20 L8.2 11.8 L0 10 L8.2 8.2 Z" fill={accentColor} opacity="0.9"/>
                </svg>
                <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${accentColor})` }}/>
              </motion.div>

              <motion.p initial={{ opacity: 0, letterSpacing: '0.8em' }} animate={{ opacity: 1, letterSpacing: '0.4em' }}
                transition={{ duration: 1, delay: 0.4 }} className="text-xs uppercase mb-6"
                style={{ color: `${accentColor}90`, fontFamily: 'Montserrat, sans-serif' }}>
                Undangan Pernikahan
              </motion.p>

              <div className="mb-1" style={{ paddingBottom: '0.2em' }}>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(48px, 13vw, 72px)', color: accentColor, lineHeight: 1.4, textShadow: `0 0 80px ${accentColor}60` }}>
                  {invitation.groom_name || 'Mempelai Pria'}
                </motion.h1>
              </div>

              <motion.div initial={{ opacity: 0, scale: 0, rotate: -180 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.9, ease: [0.34, 1.56, 0.64, 1] }} className="my-2">
                <svg width="36" height="36" viewBox="0 0 36 36">
                  <path d="M18 2 L21 15 L34 18 L21 21 L18 34 L15 21 L2 18 L15 15 Z" fill={accentColor} opacity="0.85"/>
                  <circle cx="18" cy="18" r="4" fill={accentColor} opacity="0.5"/>
                </svg>
              </motion.div>

              <div className="mt-1" style={{ paddingBottom: '0.2em' }}>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                  style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(48px, 13vw, 72px)', color: accentColor, lineHeight: 1.4, textShadow: `0 0 80px ${accentColor}60` }}>
                  {invitation.bride_name || 'Mempelai Wanita'}
                </motion.h1>
              </div>

              <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4 my-5 w-full max-w-xs">
                <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${accentColor})` }}/>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path d="M10 0 L11.8 8.2 L20 10 L11.8 11.8 L10 20 L8.2 11.8 L0 10 L8.2 8.2 Z" fill={accentColor} opacity="0.9"/>
                </svg>
                <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${accentColor})` }}/>
              </motion.div>

              {invitation.event_date && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 15, color: `${accentColor}80`, fontStyle: 'italic' }}>
                  {new Date(invitation.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </motion.p>
              )}

              {guestName && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
                  className="mt-4 px-6 py-3 rounded-full"
                  style={{ background: `${accentColor}10`, border: `1px solid ${accentColor}25` }}>
                  <p className="text-xs text-gray-400 tracking-widest uppercase mb-0.5" style={{ fontFamily: 'Montserrat, sans-serif' }}>Kepada Yth.</p>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, color: 'white' }}>{guestName}</p>
                </motion.div>
              )}

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="mt-8">
                <motion.button onClick={handleOpen}
                  whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}
                  className="relative px-12 py-4 rounded-full text-sm font-medium overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${accentColor}cc, ${accentColor})`, color: '#0a0a0a', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.15em', boxShadow: `0 0 40px ${accentColor}40` }}>
                  <motion.div className="absolute inset-0"
                    style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)' }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}/>
                  <span className="relative z-10 uppercase tracking-widest text-xs font-semibold">Buka Undangan</span>
                </motion.button>
              </motion.div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
                className="mt-3 text-xs"
                style={{ color: `${accentColor}45`, fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
                Sentuh untuk membuka
              </motion.p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
