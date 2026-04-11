'use client'

import { motion } from 'framer-motion'
import type { Invitation } from '@/lib/types'
import PhotoFrame, { OvalFrame } from './PhotoFrame'
import PhotoDecoration from './PhotoDecoration'
import PhotoSlideshow from './PhotoSlideshow'

interface Props {
  invitation: Invitation
  accentColor: string
}

function PersonCard({ name, fullName, father, mother, instagram, photoUrl, photoUrls, role, accentColor, templateId, frame, delay }: {
  name: string | null
  fullName: string | null
  father: string | null
  mother: string | null
  instagram: string | null
  photoUrl: string | null
  photoUrls?: string[]
  role: string
  accentColor: string
  templateId: string
  frame: string
  delay: number
}) {
  const allPhotos = photoUrls?.length ? photoUrls : (photoUrl ? [photoUrl] : [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="text-center py-8 px-6">

      {/* Foto individual / slideshow */}
      {allPhotos.length > 0 && (
        <div className="flex justify-center mb-5">
          <div className="relative inline-flex items-center justify-center">
            <PhotoDecoration accentColor={accentColor} templateId={templateId} size={160} frame={frame}/>
            <div className="relative z-10">
              {allPhotos.length > 1 ? (
                <div style={{
                  width: frame === 'oval' ? Math.round(160 * 0.82) : 160,
                  height: 160,
                  borderRadius: frame === 'circle' || frame === 'oval' ? '50%' : frame === 'rounded' ? 24 : 0,
                  overflow: 'hidden',
                  border: `2px solid ${accentColor}`,
                  boxShadow: `0 0 30px ${accentColor}30`,
                  clipPath: frame === 'hexagon' ? 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)' :
                            frame === 'diamond' ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' : undefined,
                }}>
                  <PhotoSlideshow photos={allPhotos} interval={3500} className="w-full h-full"/>
                </div>
              ) : (
                <PhotoFrame
                  src={allPhotos[0]}
                  frame={frame as 'circle'|'oval'|'rounded'|'hexagon'|'diamond'}
                  size={160}
                  accentColor={accentColor}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Nama script */}
      <motion.h2
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ fontFamily: 'Great Vibes, cursive', fontSize: 38, color: accentColor, lineHeight: 1.2, textShadow: `0 0 30px ${accentColor}40` }}>
        {name || role}
      </motion.h2>

      {/* Nama lengkap */}
      {fullName && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: delay + 0.35 }}
          className="mt-1 text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'Montserrat, sans-serif' }}>
          {fullName}
        </motion.p>
      )}

      {/* Orang tua */}
      {(father || mother) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: delay + 0.45 }}
          className="mt-3">
          <p className="text-xs text-gray-500 mb-1">
            {role === 'Mempelai Wanita' ? 'Putri' : 'Putra'} dari
          </p>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Cormorant Garamond, serif', fontSize: 15 }}>
            {[father, mother].filter(Boolean).join(' & ')}
          </p>
        </motion.div>
      )}

      {/* Instagram */}
      {instagram && (
        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.55 }}
          href={`https://instagram.com/${instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-3 px-4 py-1.5 rounded-full text-xs transition-all hover:opacity-80"
          style={{ background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}25` }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          @{instagram.replace('@', '')}
        </motion.a>
      )}
    </motion.div>
  )
}

export default function CoupleSectionV2({ invitation, accentColor }: Props) {
  const frame = invitation.photo_frame || 'circle'
  const isIndividual = invitation.photo_mode === 'individual'

  // Mode satu foto berdua
  if (!isIndividual) {
    const couplePhotos = invitation.couple_photos?.filter(p => p.person === 'couple').map(p => p.photo_url) || []
    const allCouplePhotos = couplePhotos.length > 0 ? couplePhotos : (invitation.couple_photo_url ? [invitation.couple_photo_url] : [])

    return (
      <div className="text-center py-8 px-6">
        {allCouplePhotos.length > 0 && (
          <div className="flex justify-center mb-6">
            <div className="relative inline-flex items-center justify-center">
              <PhotoDecoration accentColor={accentColor} templateId={invitation.template_id} size={180} frame={frame}/>
              <div className="relative z-10" style={{ width: 180, height: 180 }}>
                {allCouplePhotos.length > 1 ? (
                  <PhotoSlideshow
                    photos={allCouplePhotos}
                    interval={4000}
                    className="w-full h-full"
                    style={{ borderRadius: frame === 'circle' ? '50%' : '12px', border: `2px solid ${accentColor}`, overflow: 'hidden' }}
                  />
                ) : (
                  <PhotoFrame src={allCouplePhotos[0]} frame={frame as 'circle'|'rounded'|'hexagon'|'diamond'} size={180} accentColor={accentColor}/>
                )}
              </div>
            </div>
          </div>
        )}
        <h2 style={{ fontFamily: 'Great Vibes, cursive', fontSize: 38, color: accentColor, lineHeight: 1.2 }}>
          {invitation.groom_name || 'Mempelai Pria'}
        </h2>
        <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: 28, color: `${accentColor}80`, margin: '4px 0' }}>&amp;</p>
        <h2 style={{ fontFamily: 'Great Vibes, cursive', fontSize: 38, color: accentColor, lineHeight: 1.2 }}>
          {invitation.bride_name || 'Mempelai Wanita'}
        </h2>
        {/* Info orang tua */}
        <div className="mt-6 space-y-4">
          {(invitation.groom_father || invitation.groom_mother) && (
            <div>
              <p className="text-xs text-gray-500">Putra dari</p>
              <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Cormorant Garamond, serif', fontSize: 15 }}>
                {[invitation.groom_father, invitation.groom_mother].filter(Boolean).join(' & ')}
              </p>
            </div>
          )}
          {(invitation.bride_father || invitation.bride_mother) && (
            <div>
              <p className="text-xs text-gray-500">Putri dari</p>
              <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Cormorant Garamond, serif', fontSize: 15 }}>
                {[invitation.bride_father, invitation.bride_mother].filter(Boolean).join(' & ')}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Mode foto individual
  return (
    <div>
      {/* Wanita */}
      <PersonCard
        name={invitation.bride_name}
        fullName={invitation.bride_full_name}
        father={invitation.bride_father}
        mother={invitation.bride_mother}
        instagram={invitation.bride_instagram}
        photoUrl={invitation.bride_photo_url || invitation.couple_photo_url}
        photoUrls={invitation.couple_photos?.filter(p => p.person === 'bride').map(p => p.photo_url)}
        role="Mempelai Wanita"
        accentColor={accentColor}
        templateId={invitation.template_id}
        frame={frame}
        delay={0}
      />

      {/* Simbol & */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-center py-2">
        <span style={{ fontFamily: 'Great Vibes, cursive', fontSize: 48, color: accentColor, opacity: 0.7 }}>&amp;</span>
      </motion.div>

      {/* Pria */}
      <PersonCard
        name={invitation.groom_name}
        fullName={invitation.groom_full_name}
        father={invitation.groom_father}
        mother={invitation.groom_mother}
        instagram={invitation.groom_instagram}
        photoUrl={invitation.groom_photo_url || invitation.couple_photo_url}
        photoUrls={invitation.couple_photos?.filter(p => p.person === 'groom').map(p => p.photo_url)}
        role="Mempelai Pria"
        accentColor={accentColor}
        templateId={invitation.template_id}
        frame={frame}
        delay={0.1}
      />
    </div>
  )
}
