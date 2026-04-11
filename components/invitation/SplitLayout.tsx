'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Invitation } from '@/lib/types'
import { FlowerCorner } from './FlowerSVG'
import FloatingParticles from './FloatingParticles'
import CoverPattern from './CoverPattern'

interface Section {
  id: string
  label: string
  content: React.ReactNode
}

interface Props {
  invitation: Invitation
  sections: Section[]
  accentColor: string
  bgGradient: string
  patternType?: 'floral' | 'geometric' | 'mandala' | 'vine'
  CornerComponent?: React.ComponentType<{ color: string; position: 'tl'|'tr'|'bl'|'br'; size?: number; opacity?: number }>
}

function CoverPanel({ invitation, accentColor, bgGradient, patternType = 'floral', CornerComponent = FlowerCorner }: {
  invitation: Invitation
  accentColor: string
  bgGradient: string
  patternType?: 'floral' | 'geometric' | 'mandala' | 'vine'
  CornerComponent?: React.ComponentType<{ color: string; position: 'tl'|'tr'|'bl'|'br'; size?: number; opacity?: number }>
}) {
  const isPhoto = invitation.cover_type === 'photo' && invitation.cover_photo_url

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: isPhoto ? `url(${invitation.cover_photo_url}) center/cover` : bgGradient }}>

      {isPhoto && (
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.7) 100%)' }}/>
      )}

      {!isPhoto && <CoverPattern color={accentColor} pattern={patternType}/>}

      <FloatingParticles color={accentColor} type="star" count={6}/>

      <CornerComponent color={accentColor} position="tl" size={160} opacity={0.4}/>
      <CornerComponent color={accentColor} position="tr" size={160} opacity={0.4}/>
      <CornerComponent color={accentColor} position="bl" size={130} opacity={0.3}/>
      <CornerComponent color={accentColor} position="br" size={130} opacity={0.3}/>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${accentColor}12 0%, transparent 65%)` }}/>

      {/* Content */}
      <div className="relative z-10 text-center px-8 flex flex-col items-center gap-3">
        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-xs tracking-[0.5em] uppercase"
          style={{ color: `${accentColor}90`, fontFamily: 'Montserrat, sans-serif' }}>
          The Wedding of
        </motion.p>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 w-full max-w-[180px]">
          <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${accentColor})` }}/>
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z" fill={accentColor}/>
          </svg>
          <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${accentColor})` }}/>
        </motion.div>

        {/* Nama — per kata reveal */}
        <div className="text-center">
          {[invitation.groom_name || 'Mempelai Pria', '&', invitation.bride_name || 'Mempelai Wanita'].map((word, wi) => (
            <div key={wi} className="overflow-hidden inline-block mx-1">
              <motion.span
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 + wi * 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'inline-block',
                  fontFamily: word === '&' ? 'Cormorant Garamond, serif' : 'Great Vibes, cursive',
                  fontSize: word === '&' ? 'clamp(18px, 4vw, 28px)' : 'clamp(32px, 7vw, 52px)',
                  color: accentColor,
                  lineHeight: 1.1,
                  textShadow: `0 0 40px ${accentColor}50`,
                  fontStyle: word === '&' ? 'italic' : 'normal',
                }}>
                {word}
              </motion.span>
            </div>
          ))}
        </div>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 w-full max-w-[180px]">
          <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${accentColor})` }}/>
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z" fill={accentColor}/>
          </svg>
          <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${accentColor})` }}/>
        </motion.div>

        {invitation.event_date && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 13, color: `${accentColor}70`, fontStyle: 'italic' }}>
            {new Date(invitation.event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </motion.p>
        )}
      </div>

      {/* Scroll hint */}
      <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <p className="text-xs tracking-widest" style={{ color: `${accentColor}40`, fontFamily: 'Montserrat, sans-serif', fontSize: 9 }}>SCROLL</p>
        <div className="w-px h-6" style={{ background: `linear-gradient(to bottom, ${accentColor}40, transparent)` }}/>
      </motion.div>
    </div>
  )
}

export default function SplitLayout({ invitation, sections, accentColor, bgGradient, patternType, CornerComponent }: Props) {
  const [activeSection, setActiveSection] = useState(0)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  // Track active section on scroll
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handler = () => {
      const scrollTop = el.scrollTop
      const height = el.clientHeight
      const idx = Math.round(scrollTop / height)
      setActiveSection(Math.min(idx, sections.length - 1))
    }
    el.addEventListener('scroll', handler, { passive: true })
    return () => el.removeEventListener('scroll', handler)
  }, [sections.length])

  function scrollTo(i: number) {
    const target = sectionRefs.current[i]
    if (!target) return
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* ── DESKTOP: Split layout ── */}
      <div className="hidden md:flex h-screen overflow-hidden" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        {/* LEFT — Fixed cover */}
        <div className="w-[45%] lg:w-1/2 h-full flex-shrink-0">
          <CoverPanel invitation={invitation} accentColor={accentColor} bgGradient={bgGradient} patternType={patternType} CornerComponent={CornerComponent}/>
        </div>

        {/* CENTER — Nav dots */}
        <div className="flex flex-col items-center justify-center gap-2 px-3 z-10">
          {sections.map((s, i) => (
            <button key={s.id} onClick={() => scrollTo(i)} className="transition-all hover:scale-125" title={s.label}>
              <motion.div animate={{ scale: activeSection === i ? 1.4 : 1, opacity: activeSection === i ? 1 : 0.35 }}
                className="rounded-full"
                style={{ width: activeSection === i ? 8 : 6, height: activeSection === i ? 8 : 6, background: accentColor }}/>
            </button>
          ))}
        </div>

        {/* RIGHT — Scrollable sections */}
        <div ref={scrollRef} className="flex-1 h-full overflow-y-auto hide-scrollbar"
          style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {sections.map((section, i) => (
            <div key={section.id} ref={el => { sectionRefs.current[i] = el }}
              className="min-h-screen flex flex-col justify-center">
              {section.content}
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE: Normal scroll layout ── */}
      <div className="md:hidden" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        {/* Cover mobile */}
        <div className="h-screen">
          <CoverPanel invitation={invitation} accentColor={accentColor} bgGradient={bgGradient} patternType={patternType} CornerComponent={CornerComponent}/>
        </div>
        {/* Sections scroll normal */}
        {sections.map(section => (
          <div key={section.id}>
            {section.content}
          </div>
        ))}
        {/* Padding bottom agar tidak tertutup floating buttons */}
        <div className="h-24"/>
      </div>
    </>
  )
}
