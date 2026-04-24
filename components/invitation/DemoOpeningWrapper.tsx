'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import OpeningCover from './OpeningCover'
import type { Invitation } from '@/lib/types'

interface Props {
  invitation: Invitation
  accentColor: string
  bgFrom: string
  bgTo: string
  themeName: string
  withPhotos?: boolean
  CornerComponent?: React.ComponentType<{ color: string; position: 'tl'|'tr'|'bl'|'br'; size?: number; opacity?: number }>
  children: React.ReactNode
}

export default function DemoOpeningWrapper({ invitation, accentColor, bgFrom, bgTo, themeName, withPhotos = true, CornerComponent, children }: Props) {
  const [opened, setOpened] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  function togglePhotos() {
    router.push(withPhotos ? `${pathname}?photos=false` : pathname)
  }

  return (
    <>
      {!opened && (
        <OpeningCover
          invitation={invitation}
          onOpen={() => setOpened(true)}
          accentColor={accentColor}
          bgFrom={bgFrom}
          bgTo={bgTo}
          CornerComponent={CornerComponent}
        />
      )}

      {opened && (
        <>
          {/* Demo banner */}
          <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', borderBottom: `1px solid ${accentColor}30` }}>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: `${accentColor}20`, color: accentColor, border: `1px solid ${accentColor}40` }}>
                DEMO
              </span>
              <span className="text-xs text-gray-400 hidden sm:inline">{themeName}</span>
            </div>
            <div className="flex items-center gap-2">
              {/* Toggle foto */}
              <button onClick={togglePhotos}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all"
                style={{
                  background: withPhotos ? `${accentColor}20` : 'rgba(255,255,255,0.08)',
                  color: withPhotos ? accentColor : '#9ca3af',
                  border: `1px solid ${withPhotos ? accentColor + '40' : 'rgba(255,255,255,0.1)'}`,
                }}>
                📸 {withPhotos ? 'Dengan Foto' : 'Tanpa Foto'}
              </button>
                  <Link href="/register"
                className="px-4 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`, color: '#0a0a0a' }}>
                Buat Undanganmu →
              </Link>
            </div>
          </div>

          {/* Feature hint bar dihapus — dipindah ke section bawah */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ paddingTop: 44 }}>
            {children}

            {/* Demo CTA Section */}
            <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center"
              style={{ background: `linear-gradient(180deg, ${bgFrom}, ${bgTo})` }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="max-w-sm w-full">

                {/* Divider */}
                <div className="flex items-center gap-3 justify-center mb-10">
                  <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${accentColor}50)` }}/>
                  <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill={accentColor} opacity="0.7"/></svg>
                  <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${accentColor}50)` }}/>
                </div>

                <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: accentColor }}>Suka dengan tampilannya?</p>
                <h2 style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(36px, 10vw, 52px)', color: accentColor, lineHeight: 1.3, textShadow: `0 0 40px ${accentColor}40` }}
                  className="mb-6">
                  Buat Undanganmu
                </h2>

                <p className="text-sm text-gray-400 mb-4 leading-relaxed"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, fontStyle: 'italic' }}>
                  Undanganmu bisa dilengkapi dengan fitur eksklusif:
                </p>

                <div className="flex flex-col gap-2 mb-8 text-left">
                  {[
                    { icon: '🎵', text: 'Musik latar pilihan kamu' },
                    { icon: '🎬', text: 'Video prewedding' },
                    { icon: '📺', text: 'Link live streaming' },
                    { icon: '💌', text: 'Nama tamu personal di setiap link' },
                    { icon: '💸', text: 'Amplop digital & QRIS' },
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                      style={{ background: `${accentColor}08`, border: `1px solid ${accentColor}15` }}>
                      <span className="text-base">{f.icon}</span>
                      <span className="text-sm text-gray-300" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 15 }}>{f.text}</span>
                    </div>
                  ))}
                </div>

                <Link href="/register"
                  className="inline-block w-full py-4 rounded-full font-medium text-sm text-center transition-all hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`, color: '#0a0a0a', boxShadow: `0 0 30px ${accentColor}30`, letterSpacing: '0.05em' }}>
                  Mulai Buat Undangan — Rp 99.000
                </Link>

                <p className="mt-3 text-xs text-gray-500">Bayar sekali, pakai selamanya</p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </>
  )
}
