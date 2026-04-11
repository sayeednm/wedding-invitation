'use client'

import type { Invitation } from '@/lib/types'
import CoverPattern from './CoverPattern'
import PhotoSlideshow from './PhotoSlideshow'

interface Props {
  invitation: Invitation
  accentColor: string
  bgGradient: string
  patternType?: 'floral' | 'geometric' | 'mandala' | 'vine'
  children: React.ReactNode
}

export default function CoverBackground({ invitation, accentColor, bgGradient, patternType = 'floral', children }: Props) {
  const isPhoto = invitation.cover_type === 'photo' && invitation.cover_photo_url

  // Kumpulkan semua foto cover — cover_photo_url + foto dari galeri yang ditandai sebagai cover
  const coverPhotos: string[] = []
  if (invitation.cover_photo_url) coverPhotos.push(invitation.cover_photo_url)
  // Tambah foto dari galeri (maks 5 untuk slideshow)
  if (invitation.gallery?.length) {
    invitation.gallery.slice(0, 5).forEach(p => {
      if (p.photo_url && !coverPhotos.includes(p.photo_url)) coverPhotos.push(p.photo_url)
    })
  }

  const hasSlideshow = isPhoto && coverPhotos.length > 1

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 overflow-hidden"
      style={{ background: isPhoto ? (hasSlideshow ? 'transparent' : `url(${invitation.cover_photo_url}) center/cover`) : bgGradient }}>

      {/* Slideshow background */}
      {hasSlideshow && (
        <PhotoSlideshow
          photos={coverPhotos}
          interval={5000}
          className="absolute inset-0"
          style={{ zIndex: 0 }}
        />
      )}

      {/* Photo overlay */}
      {isPhoto && (
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.22) 50%, rgba(0,0,0,0.82) 100%)', zIndex: 1 }} />
      )}

      {/* Pattern dekoratif */}
      {!isPhoto && (
        <CoverPattern color={accentColor} pattern={patternType} />
      )}

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${accentColor}14 0%, transparent 65%)`, zIndex: 2 }} />

      {/* Content */}
      <div className="relative" style={{ zIndex: 3 }}>
        {children}
      </div>
    </div>
  )
}
