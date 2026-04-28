'use client'

import type { Invitation } from '@/lib/types'
import { formatDate, formatTime } from '@/lib/utils'
import SectionReveal from '@/components/invitation/SectionReveal'
import CountdownTimer from '@/components/invitation/CountdownTimer'
import CoupleSection from '@/components/invitation/CoupleSection'
import DresscodeSection from '@/components/invitation/DresscodeSection'
import SplitLayout from '@/components/invitation/SplitLayout'
import GallerySection from '@/components/invitation/GallerySection'
import VideoSection from '@/components/invitation/VideoSection'
import LoveStorySection from '@/components/invitation/LoveStorySection'
import GuestbookSection from '@/components/invitation/GuestbookSection'
import DigitalGiftSection from '@/components/invitation/DigitalGiftSection'
import { FlowerCorner } from '@/components/invitation/FlowerSVG'
import PhotoFrame from '@/components/invitation/PhotoFrame'
import PhotoDecoration from '@/components/invitation/PhotoDecoration'
import CoupleSectionV2 from '@/components/invitation/CoupleSectionV2'
import WeddingGiftSection from '@/components/invitation/WeddingGiftSection'
import SaveDateButton from '@/components/invitation/SaveDateButton'
import type { ReactNode } from 'react'

interface ThemeConfig {
  accent: string
  accentVar?: string
  bgGradient: string
  patternType: 'floral' | 'geometric' | 'mandala' | 'vine'
  CornerComponent: React.ComponentType<{ color: string; position: 'tl'|'tr'|'bl'|'br'; size?: number; opacity?: number }>
  DividerIcon: React.ComponentType<{ color: string }>
}

interface Props {
  invitation: Invitation
  config: ThemeConfig
  previewMode?: boolean
}

export function SectionWrapper({ children, title, subtitle, bg, accent }: {
  children: ReactNode
  title?: string
  subtitle?: string
  bg: string
  accent: string
}) {
  return (
    <div className="min-h-screen md:min-h-screen flex flex-col justify-center px-6 md:px-10 py-12" style={{ background: bg }}>
      {(title || subtitle) && (
        <SectionReveal direction="blur" className="mb-8 text-center">
          {subtitle && <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: accent }}>{subtitle}</p>}
          {title && <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, color: 'white', fontWeight: 300 }}>{title}</h2>}
          <div className="flex items-center gap-3 justify-center mt-3">
            <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${accent}50)` }}/>
            <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill={accent} opacity="0.7"/></svg>
            <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${accent}50)` }}/>
          </div>
        </SectionReveal>
      )}
      {children}
    </div>
  )
}

export function EventCard({ title, date, time, location, mapsUrl, accent, CornerComponent, bg }: {
  title: string; date: string; time: string
  location?: string | null; mapsUrl?: string | null
  accent: string
  CornerComponent: React.ComponentType<{ color: string; position: 'tl'|'tr'|'bl'|'br'; size?: number; opacity?: number }>
  bg: string
}) {
  return (
    <SectionReveal direction="scale">
      <div className="rounded-2xl px-6 py-6 relative overflow-hidden" style={{ background: `${accent}08`, border: `1px solid ${accent}20` }}>
        <CornerComponent color={accent} position="tl" size={80} opacity={0.2}/>
        <CornerComponent color={accent} position="br" size={80} opacity={0.2}/>
        <div className="relative z-10 text-center">
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: accent }}>{title}</p>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: 'white', fontWeight: 300 }}>{date}</p>
          <p className="mt-1 text-sm" style={{ color: `${accent}cc`, fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
            Pukul {time} WIB
          </p>
          {location && <p className="mt-3 text-sm" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Cormorant Garamond, serif' }}>{location}</p>}
          {mapsUrl && (
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-full text-xs"
              style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}>
              📍 Buka Google Maps
            </a>
          )}
        </div>
      </div>
    </SectionReveal>
  )
}

export function buildSections(invitation: Invitation, config: ThemeConfig) {
  const { accent, bgGradient, CornerComponent } = config
  const bg = bgGradient

  return [
    // 1. Pembuka — ayat Quran saja
    {
      id: 'opening', label: 'Pembuka',
      content: (
        <SectionWrapper bg={bg} accent={accent}>
          <div className="text-center space-y-6">
            {invitation.quran_verse && (
              <SectionReveal direction="scale">
                <div className="rounded-2xl px-5 py-5 relative overflow-hidden" style={{ background: `${accent}08`, border: `1px solid ${accent}18` }}>
                  <CornerComponent color={accent} position="tl" size={80} opacity={0.2}/>
                  <CornerComponent color={accent} position="br" size={80} opacity={0.2}/>
                  <p className="relative z-10" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(12px, 3vw, 15px)', fontStyle: 'italic', color: 'rgba(255,255,255,0.62)', lineHeight: 1.9 }}>
                    "{invitation.quran_verse}"
                  </p>
                  {invitation.quran_surah && (
                    <p className="relative z-10 mt-2 text-xs tracking-widest" style={{ color: `${accent}80` }}>— {invitation.quran_surah}</p>
                  )}
                </div>
              </SectionReveal>
            )}
          </div>
        </SectionWrapper>
      ),
    },

    // 2. Mempelai — opening text di atas foto
    {
      id: 'couple', label: 'Mempelai',
      content: (
        <SectionWrapper bg={bg} accent={accent}>
          {invitation.opening_text && (
            <SectionReveal direction="blur" className="mb-6">
              {(() => {
                const lines = invitation.opening_text.split('\n').filter(Boolean)
                const first = lines[0]
                const rest = lines.slice(1).join('\n').trim()
                return (
                  <>
                    <p className="text-center mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(14px, 3.5vw, 18px)', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
                      {first}
                    </p>
                    {rest && (
                      <p className="text-center" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(12px, 3vw, 15px)', fontStyle: 'italic', color: 'rgba(255,255,255,0.65)', lineHeight: 1.9 }}>
                        {rest}
                      </p>
                    )}
                  </>
                )
              })()}
            </SectionReveal>
          )}
          <CoupleSectionV2 invitation={invitation} accentColor={accent}/>
        </SectionWrapper>
      ),
    },

    // 3. Acara
    {
      id: 'event', label: 'Acara',
      content: (
        <SectionWrapper bg={bg} accent={accent} subtitle="Detail Acara" title="Hari Bahagia">
          <div className="space-y-4">
            {invitation.akad_date && (
              <EventCard title="Akad Nikah" date={formatDate(invitation.akad_date)} time={formatTime(invitation.akad_date)}
                location={invitation.akad_location} mapsUrl={invitation.akad_maps_url} accent={accent} CornerComponent={CornerComponent} bg={bg}/>
            )}
            {invitation.event_date && (
              <EventCard title="Resepsi Pernikahan" date={formatDate(invitation.event_date)} time={formatTime(invitation.event_date)}
                location={invitation.location_name} mapsUrl={invitation.location_maps_url} accent={accent} CornerComponent={CornerComponent} bg={bg}/>
            )}
            {invitation.event_date && (
              <SectionReveal direction="fade" delay={0.2}>
                <CountdownTimer eventDate={invitation.event_date} accentColor={accent}/>
              </SectionReveal>
            )}
            <SectionReveal direction="fade" delay={0.3}>
              <div className="flex justify-center mt-4">
                <SaveDateButton invitation={invitation} accentColor={accent}/>
              </div>
            </SectionReveal>
          </div>
        </SectionWrapper>
      ),
    },

    // 4. Love Story
    ...(invitation.love_story ? [{
      id: 'lovestory', label: 'Love Story',
      content: <SectionWrapper bg={bg} accent={accent}><LoveStorySection story={invitation.love_story} accentColor={accent}/></SectionWrapper>,
    }] : []),

    // 5. Galeri
    ...(invitation.gallery?.length ? [{
      id: 'gallery', label: 'Galeri',
      content: <SectionWrapper bg={bg} accent={accent} subtitle="Galeri" title="Momen Berharga"><GallerySection photos={invitation.gallery!} accentColor={accent}/></SectionWrapper>,
    }] : []),

    // 6. Video
    ...(invitation.video_url ? [{
      id: 'video', label: 'Video',
      content: <SectionWrapper bg={bg} accent={accent}><VideoSection videoUrl={invitation.video_url} accentColor={accent}/></SectionWrapper>,
    }] : []),

    // 7. Dresscode
    ...(invitation.dresscode_enabled && invitation.dresscode_color ? [{
      id: 'dresscode', label: 'Dresscode',
      content: (
        <SectionWrapper bg={bg} accent={accent} subtitle="Dresscode" title="Kode Berpakaian">
          <SectionReveal direction="scale"><DresscodeSection color={invitation.dresscode_color} note={invitation.dresscode_note} accentColor={accent}/></SectionReveal>
        </SectionWrapper>
      ),
    }] : []),

    // 8. Wedding Gift
    ...(invitation.digital_gifts?.length || invitation.gift_address ? [{
      id: 'gift', label: 'Wedding Gift',
      content: (
        <SectionWrapper bg={bg} accent={accent}>
          <WeddingGiftSection gifts={invitation.digital_gifts || []} accentColor={accent} invitation={invitation}/>
        </SectionWrapper>
      ),
    }] : []),

    // 9. Live Streaming
    ...(invitation.live_streaming_url ? [{
      id: 'live', label: 'Live',
      content: (
        <SectionWrapper bg={bg} accent={accent} subtitle="Live Streaming" title="Saksikan Secara Online">
          <SectionReveal direction="scale">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16 }}>
                Tidak bisa hadir? Saksikan momen bahagia kami secara langsung
              </p>
              <a href={invitation.live_streaming_url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-sm"
                style={{ background: `linear-gradient(135deg, ${accent}cc, ${accent})`, color: '#0a0a0a', boxShadow: `0 0 30px ${accent}30` }}>
                🔴 Tonton Live Streaming
              </a>
            </div>
          </SectionReveal>
        </SectionWrapper>
      ),
    }] : []),

    // 10. RSVP
    {
      id: 'rsvp', label: 'RSVP',
      content: <SectionWrapper bg={bg} accent={accent}><GuestbookSection invitationId={invitation.id} entries={invitation.guestbook || []} templateId={invitation.template_id}/></SectionWrapper>,
    },

    // 11. Penutup — Terima Kasih
    {
      id: 'closing', label: 'Penutup',
      content: (
        <SectionWrapper bg={bg} accent={accent}>
          <SectionReveal direction="scale">
            <div className="text-center px-4 py-4">
              {/* Foto pasangan — ambil yang tersedia */}
              {(() => {
                const photo =
                  invitation.couple_photo_url ||
                  invitation.couple_photos?.find(p => p.person === 'couple')?.photo_url ||
                  invitation.couple_photos?.[0]?.photo_url ||
                  invitation.bride_photo_url ||
                  invitation.groom_photo_url ||
                  invitation.cover_photo_url
                if (!photo) return null
                return (
                  <div className="flex justify-center mb-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden"
                      style={{ border: `2px solid ${accent}`, boxShadow: `0 0 20px ${accent}25` }}>
                      <img
                        src={photo}
                        alt="Foto pasangan"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )
              })()}

              {/* Judul */}
              <h2 style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(28px, 8vw, 42px)', color: accent, lineHeight: 1.4, paddingBottom: '0.1em', textShadow: `0 0 30px ${accent}40` }}>
                Terima Kasih
              </h2>

              {/* Teks ucapan */}
              <p className="mt-4 mb-6 leading-relaxed"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(13px, 3.5vw, 16px)', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', maxWidth: 300, margin: '16px auto 20px' }}>
                Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.
              </p>

              {/* Wassalam */}
              <p className="font-medium mb-6 text-center w-full"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(12px, 3vw, 15px)', color: `${accent}cc` }}>
                Wassalamu'alaikum warahmatullahi wabarakatuh
              </p>

              {/* Divider */}
              <div className="flex items-center gap-3 justify-center mb-4">
                <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${accent}50)` }}/>
                <svg width="10" height="10" viewBox="0 0 10 10">
                  <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill={accent} opacity="0.7"/>
                </svg>
                <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${accent}50)` }}/>
              </div>

              {/* Nama mempelai */}
              <p className="text-sm mb-1 text-center w-full" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Cormorant Garamond, serif' }}>
                Kami Yang Berbahagia
              </p>
              <p className="text-center w-full" style={{ fontFamily: 'Great Vibes, cursive', fontSize: 32, color: accent, lineHeight: 1.4, paddingBottom: '0.1em', textShadow: `0 0 20px ${accent}40` }}>
                {invitation.groom_name || 'Mempelai Pria'} &amp; {invitation.bride_name || 'Mempelai Wanita'}
              </p>
            </div>
          </SectionReveal>
        </SectionWrapper>
      ),
    },
  ]
}

export function PreviewMode({ invitation, accent, bgGradient, CornerComponent }: {
  invitation: Invitation
  accent: string
  bgGradient: string
  CornerComponent: React.ComponentType<{ color: string; position: 'tl'|'tr'|'bl'|'br'; size?: number; opacity?: number }>
}) {
  return (
    <div className="min-h-full text-center relative overflow-hidden" style={{ background: bgGradient, color: 'white', fontFamily: 'Montserrat, sans-serif' }}>
      <CornerComponent color={accent} position="tl" size={100} opacity={0.45}/>
      <CornerComponent color={accent} position="tr" size={100} opacity={0.45}/>
      <CornerComponent color={accent} position="bl" size={80} opacity={0.3}/>
      <CornerComponent color={accent} position="br" size={80} opacity={0.3}/>

      <div className="relative flex flex-col items-center justify-center px-6 py-12 overflow-hidden"
        style={{ minHeight: 320, background: invitation.cover_type === 'photo' && invitation.cover_photo_url ? `url(${invitation.cover_photo_url}) center/cover` : bgGradient }}>
        {invitation.cover_type === 'photo' && invitation.cover_photo_url && (
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.55)' }}/>
        )}
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at center, ${accent}12 0%, transparent 65%)` }}/>
        <div className="relative z-10 flex flex-col items-center gap-2">
          <p className="text-xs tracking-[0.4em] uppercase" style={{ color: `${accent}90` }}>The Wedding of</p>
          <div className="flex items-center gap-2 w-32">
            <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${accent})` }}/>
            <svg width="8" height="8" viewBox="0 0 8 8"><path d="M4 0 L5 3 L8 4 L5 5 L4 8 L3 5 L0 4 L3 3 Z" fill={accent}/></svg>
            <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${accent})` }}/>
          </div>
          <h1 style={{ fontFamily: 'Great Vibes, cursive', fontSize: 32, color: accent, lineHeight: 1.4, paddingBottom: '0.1em', textShadow: `0 0 30px ${accent}55` }}>
            {invitation.groom_name || 'Mempelai Pria'}
          </h1>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 13, color: `${accent}80`, fontStyle: 'italic' }}>&amp;</p>
          <h1 style={{ fontFamily: 'Great Vibes, cursive', fontSize: 32, color: accent, lineHeight: 1.4, paddingBottom: '0.1em', textShadow: `0 0 30px ${accent}55` }}>
            {invitation.bride_name || 'Mempelai Wanita'}
          </h1>
          <div className="flex items-center gap-2 w-32">
            <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${accent})` }}/>
            <svg width="8" height="8" viewBox="0 0 8 8"><path d="M4 0 L5 3 L8 4 L5 5 L4 8 L3 5 L0 4 L3 3 Z" fill={accent}/></svg>
            <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${accent})` }}/>
          </div>
          {invitation.event_date && (
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 11, color: `${accent}65`, fontStyle: 'italic' }}>
              {formatDate(invitation.event_date)}
            </p>
          )}
        </div>
      </div>

      {invitation.quran_verse && (
        <div className="mx-4 mb-4 rounded-xl px-4 py-4 relative overflow-hidden" style={{ background: `${accent}08`, border: `1px solid ${accent}18` }}>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 12, fontStyle: 'italic', color: 'rgba(255,255,255,0.62)', lineHeight: 1.9 }}>
            "{invitation.quran_verse}"
          </p>
          {invitation.quran_surah && (
            <p className="mt-2 text-xs tracking-widest" style={{ color: `${accent}80` }}>— {invitation.quran_surah}</p>
          )}
        </div>
      )}

      {(invitation.groom_name || invitation.bride_name) && (
        <div className="px-2 py-2">
          {invitation.opening_text && (
            <p className="text-center px-4 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 13, fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', lineHeight: 1.9 }}>
              {invitation.opening_text}
            </p>
          )}
          <CoupleSectionV2 invitation={invitation} accentColor={accent}/>
        </div>
      )}

      {(invitation.akad_date || invitation.event_date) && (
        <div className="px-4 py-4 space-y-3">
          {invitation.akad_date && (
            <div className="rounded-xl px-4 py-4 text-center" style={{ background: `${accent}08`, border: `1px solid ${accent}20` }}>
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: accent }}>Akad Nikah</p>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, color: 'white' }}>{formatDate(invitation.akad_date)}</p>
              <p className="text-xs mt-1" style={{ color: `${accent}cc`, fontFamily: 'Cormorant Garamond, serif' }}>Pukul {formatTime(invitation.akad_date)} WIB</p>
              {invitation.akad_location && (
                <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Cormorant Garamond, serif' }}>{invitation.akad_location}</p>
              )}
            </div>
          )}
          {invitation.event_date && (
            <div className="rounded-xl px-4 py-4 text-center" style={{ background: `${accent}08`, border: `1px solid ${accent}20` }}>
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: accent }}>Resepsi</p>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, color: 'white' }}>{formatDate(invitation.event_date)}</p>
              <p className="text-xs mt-1" style={{ color: `${accent}cc`, fontFamily: 'Cormorant Garamond, serif' }}>Pukul {formatTime(invitation.event_date)} WIB</p>
              {invitation.location_name && (
                <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Cormorant Garamond, serif' }}>{invitation.location_name}</p>
              )}
            </div>
          )}
          {invitation.event_date && <CountdownTimer eventDate={invitation.event_date} accentColor={accent}/>}
        </div>
      )}

      <CornerComponent color={accent} position="bl" size={100} opacity={0.35}/>
      <CornerComponent color={accent} position="br" size={100} opacity={0.35}/>

      {/* Galeri foto */}
      {invitation.gallery && invitation.gallery.length > 0 && (
        <div className="px-4 py-4">
          <p className="text-xs tracking-widest uppercase mb-3 text-center" style={{ color: accent }}>Galeri</p>
          <div className="grid grid-cols-3 gap-1.5">
            {invitation.gallery.slice(0, 6).map(photo => (
              <div key={photo.id} className="rounded-lg overflow-hidden" style={{ aspectRatio: '1' }}>
                <img src={photo.photo_url} alt="" className="w-full h-full object-cover"/>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Love Story */}
      {invitation.love_story && (
        <div className="px-4 py-4">
          <LoveStorySection story={invitation.love_story} accentColor={accent}/>
        </div>
      )}

      {/* Video */}
      {invitation.video_url && (
        <div className="px-4 py-2">
          <VideoSection videoUrl={invitation.video_url} accentColor={accent}/>
        </div>
      )}

      {/* Dresscode */}
      {invitation.dresscode_enabled && invitation.dresscode_color && (
        <div className="px-4 py-2">
          <DresscodeSection color={invitation.dresscode_color} note={invitation.dresscode_note} accentColor={accent}/>
        </div>
      )}

      {/* Amplop digital */}
      {invitation.digital_gifts && invitation.digital_gifts.length > 0 && (
        <div className="px-2">
          <WeddingGiftSection gifts={invitation.digital_gifts} accentColor={accent} invitation={invitation}/>
        </div>
      )}

      {/* Live Streaming */}
      {invitation.live_streaming_url && (
        <div className="px-4 py-4 text-center">
          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: accent }}>Live Streaming</p>
          <a href={invitation.live_streaming_url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs"
            style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}>
            🔴 Tonton Live Streaming
          </a>
        </div>
      )}

      {/* Buku Tamu — preview static */}
      <div className="px-4 py-4" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <p className="text-xs tracking-widest uppercase mb-1 text-center" style={{ color: accent }}>Ucapan &amp; RSVP</p>
        <h3 className="text-center mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, color: 'white' }}>Kirim Ucapan</h3>
        <div className="space-y-2 mb-3">
          <div className="w-full px-3 py-2 rounded-xl text-xs text-gray-500" style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${accent}20` }}>
            Nama Anda
          </div>
          <div className="w-full px-3 py-2 rounded-xl text-xs text-gray-500" style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${accent}20`, height: 48 }}>
            Ucapan &amp; doa untuk mempelai...
          </div>
          <div className="w-full px-3 py-2 rounded-xl text-xs text-gray-500" style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${accent}20` }}>
            ✓ Hadir
          </div>
        </div>
        <div className="w-full py-2 rounded-full text-xs text-center font-medium"
          style={{ background: `linear-gradient(135deg, ${accent}cc, ${accent})`, color: '#0a0a0a' }}>
          Kirim Ucapan
        </div>
        {/* Contoh ucapan */}
        {invitation.guestbook && invitation.guestbook.length > 0 && (
          <div className="mt-3 space-y-2">
            {invitation.guestbook.slice(0, 2).map(entry => (
              <div key={entry.id} className="rounded-xl p-3 text-left" style={{ background: `${accent}08` }}>
                <p className="text-xs font-medium" style={{ color: accent }}>{entry.guest_name}</p>
                {entry.message && <p className="text-xs text-gray-400 mt-0.5">{entry.message}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Penutup — Terima Kasih */}
      <div className="px-4 py-6 text-center">
        {(() => {
          const photo =
            invitation.couple_photo_url ||
            invitation.couple_photos?.find(p => p.person === 'couple')?.photo_url ||
            invitation.couple_photos?.[0]?.photo_url ||
            invitation.bride_photo_url ||
            invitation.groom_photo_url ||
            invitation.cover_photo_url
          return photo ? (
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden"
                style={{ border: `2px solid ${accent}`, boxShadow: `0 0 15px ${accent}25` }}>
                <img src={photo} alt="" className="w-full h-full object-cover"/>
              </div>
            </div>
          ) : null
        })()}
        <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: 28, color: accent, lineHeight: 1.4, paddingBottom: '0.1em' }}>
          Terima Kasih
        </p>
        <p className="mt-2 text-xs text-gray-400 italic" style={{ fontFamily: 'Cormorant Garamond, serif', lineHeight: 1.7 }}>
          Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir.
        </p>
        <p className="mt-3 text-xs" style={{ color: `${accent}cc`, fontFamily: 'Cormorant Garamond, serif' }}>
          Wassalamu'alaikum warahmatullahi wabarakatuh
        </p>
        <div className="flex items-center gap-2 justify-center my-3">
          <div className="h-px w-8" style={{ background: `linear-gradient(to right, transparent, ${accent}50)` }}/>
          <svg width="8" height="8" viewBox="0 0 10 10"><path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill={accent} opacity="0.7"/></svg>
          <div className="h-px w-8" style={{ background: `linear-gradient(to left, transparent, ${accent}50)` }}/>
        </div>
        <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Cormorant Garamond, serif' }}>Kami Yang Berbahagia</p>
        <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: 20, color: accent, lineHeight: 1.4, paddingBottom: '0.1em' }}>
          {invitation.groom_name || 'Mempelai Pria'} &amp; {invitation.bride_name || 'Mempelai Wanita'}
        </p>
      </div>
    </div>
  )
}
