import { ImageResponse } from 'next/og'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'edge'
export const alt = 'Undangan Pernikahan'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('invitations')
    .select('groom_name, bride_name, event_date, cover_photo_url, template_id')
    .eq('slug', slug)
    .single()

  const gold = '#C9A84C'
  const groomName = data?.groom_name || 'Mempelai Pria'
  const brideName = data?.bride_name || 'Mempelai Wanita'
  const eventDate = data?.event_date
    ? new Date(data.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #071a0e 0%, #1B4332 50%, #0D1B2A 100%)',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Background photo */}
        {data?.cover_photo_url && (
          <img
            src={data.cover_photo_url}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25 }}
          />
        )}
        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />

        {/* Content */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <p style={{ fontSize: 18, color: gold, letterSpacing: '0.3em', textTransform: 'uppercase', margin: 0 }}>
            The Wedding of
          </p>
          <p style={{ fontSize: 80, color: gold, margin: 0, lineHeight: 1.1 }}>
            {groomName}
          </p>
          <p style={{ fontSize: 28, color: 'rgba(255,255,255,0.6)', margin: 0 }}>&amp;</p>
          <p style={{ fontSize: 80, color: gold, margin: 0, lineHeight: 1.1 }}>
            {brideName}
          </p>
          {eventDate && (
            <p style={{ fontSize: 22, color: 'rgba(255,255,255,0.55)', margin: '8px 0 0', letterSpacing: '0.1em' }}>
              {eventDate}
            </p>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24 }}>
            <div style={{ height: 1, width: 60, background: `linear-gradient(to right, transparent, ${gold})` }} />
            <p style={{ fontSize: 14, color: gold, margin: 0, letterSpacing: '0.2em' }}>UNDANGAN DIGITAL</p>
            <div style={{ height: 1, width: 60, background: `linear-gradient(to left, transparent, ${gold})` }} />
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
