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
  children: React.ReactNode
}

export default function DemoOpeningWrapper({ invitation, accentColor, bgFrom, bgTo, themeName, withPhotos = true, children }: Props) {
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ paddingTop: 40 }}>
            {children}
          </motion.div>
        </>
      )}
    </>
  )
}
