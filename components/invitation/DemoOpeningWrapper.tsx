'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import OpeningCover from './OpeningCover'
import type { Invitation } from '@/lib/types'

interface Props {
  invitation: Invitation
  accentColor: string
  bgFrom: string
  bgTo: string
  themeName: string
  children: React.ReactNode
}

export default function DemoOpeningWrapper({ invitation, accentColor, bgFrom, bgTo, themeName, children }: Props) {
  const [opened, setOpened] = useState(false)

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
              <span className="text-xs text-gray-400">{themeName}</span>
            </div>
            <Link href="/register"
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`, color: '#0a0a0a' }}>
              Buat Undanganmu →
            </Link>
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
