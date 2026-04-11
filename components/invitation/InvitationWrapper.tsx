'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import OpeningCover from './OpeningCover'
import type { Invitation } from '@/lib/types'

interface Props {
  invitation: Invitation
  guestName?: string
  accentColor: string
  bgFrom: string
  bgTo: string
  CornerComponent?: React.ComponentType<{ color: string; position: 'tl'|'tr'|'bl'|'br'; size?: number; opacity?: number }>
  children: React.ReactNode
}

export default function InvitationWrapper({ invitation, guestName, accentColor, bgFrom, bgTo, CornerComponent, children }: Props) {
  // 3 fase: 'cover' → 'transitioning' → 'open'
  const [phase, setPhase] = useState<'cover' | 'transitioning' | 'open'>('cover')

  function handleOpen() {
    // Mulai transisi tirai
    setPhase('transitioning')
    // Setelah tirai selesai membuka (800ms), tampilkan konten
    setTimeout(() => setPhase('open'), 800)
  }

  return (
    <>
      {/* Opening cover — tampil saat cover atau transitioning */}
      {phase !== 'open' && (
        <OpeningCover
          invitation={invitation}
          guestName={guestName}
          onOpen={handleOpen}
          accentColor={accentColor}
          bgFrom={bgFrom}
          bgTo={bgTo}
          CornerComponent={CornerComponent}
        />
      )}

      {/* Konten undangan — hanya render setelah tirai selesai */}
      {phase === 'open' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}>
          {children}
        </motion.div>
      )}
    </>
  )
}
