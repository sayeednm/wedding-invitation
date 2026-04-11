'use client'

import { motion } from 'framer-motion'
import type { Invitation } from '@/lib/types'

interface Props {
  invitation: Invitation
  accentColor: string
}

export default function CoupleSection({ invitation, accentColor }: Props) {
  const fade = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } }

  return (
    <div className="px-6 py-10">
      <motion.p {...fade} className="text-xs tracking-[0.4em] uppercase mb-2 text-center" style={{ color: accentColor }}>
        Mempelai
      </motion.p>
      <motion.div {...fade} className="flex items-center gap-3 justify-center mb-8">
        <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${accentColor})` }} />
        <span style={{ color: accentColor, fontSize: 10 }}>✦</span>
        <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${accentColor})` }} />
      </motion.div>

      <div className="space-y-8">
        {/* Groom */}
        <motion.div {...fade} className="text-center rounded-2xl p-5"
          style={{ background: `${accentColor}08`, border: `1px solid ${accentColor}20` }}>
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: `${accentColor}99` }}>Mempelai Pria</p>
          <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: 36, color: accentColor, lineHeight: 1.2 }}>
            {invitation.groom_name || 'Mempelai Pria'}
          </p>
          {invitation.groom_full_name && (
            <p className="mt-1 text-sm" style={{ fontFamily: 'Cormorant Garamond, serif', color: 'rgba(255,255,255,0.8)' }}>
              {invitation.groom_full_name}
            </p>
          )}
          {(invitation.groom_father || invitation.groom_mother) && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1">Putra dari</p>
              <p className="text-sm" style={{ fontFamily: 'Cormorant Garamond, serif', color: 'rgba(255,255,255,0.75)' }}>
                {invitation.groom_father}{invitation.groom_father && invitation.groom_mother ? ' & ' : ''}{invitation.groom_mother}
              </p>
            </div>
          )}
          {invitation.groom_instagram && (
            <p className="mt-2 text-xs" style={{ color: `${accentColor}80` }}>
              @{invitation.groom_instagram.replace('@', '')}
            </p>
          )}
        </motion.div>

        {/* Divider */}
        <div className="flex justify-center">
          <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: 32, color: accentColor }}>&amp;</p>
        </div>

        {/* Bride */}
        <motion.div {...fade} className="text-center rounded-2xl p-5"
          style={{ background: `${accentColor}08`, border: `1px solid ${accentColor}20` }}>
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: `${accentColor}99` }}>Mempelai Wanita</p>
          <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: 36, color: accentColor, lineHeight: 1.2 }}>
            {invitation.bride_name || 'Mempelai Wanita'}
          </p>
          {invitation.bride_full_name && (
            <p className="mt-1 text-sm" style={{ fontFamily: 'Cormorant Garamond, serif', color: 'rgba(255,255,255,0.8)' }}>
              {invitation.bride_full_name}
            </p>
          )}
          {(invitation.bride_father || invitation.bride_mother) && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1">Putri dari</p>
              <p className="text-sm" style={{ fontFamily: 'Cormorant Garamond, serif', color: 'rgba(255,255,255,0.75)' }}>
                {invitation.bride_father}{invitation.bride_father && invitation.bride_mother ? ' & ' : ''}{invitation.bride_mother}
              </p>
            </div>
          )}
          {invitation.bride_instagram && (
            <p className="mt-2 text-xs" style={{ color: `${accentColor}80` }}>
              @{invitation.bride_instagram.replace('@', '')}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  )
}
