import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import TemplateLuxury from '@/components/templates/TemplateLuxury'
import TemplateFloral from '@/components/templates/TemplateFloral'
import TemplateMidnight from '@/components/templates/TemplateMidnight'
import TemplateRoyal from '@/components/templates/TemplateRoyal'
import TemplateRustic from '@/components/templates/TemplateRustic'
import TemplateCelestial from '@/components/templates/TemplateCelestial'
import TemplateBali from '@/components/templates/TemplateBali'
import TemplateIvory from '@/components/templates/TemplateIvory'
import { FlowerCorner } from '@/components/invitation/FlowerSVG'
import { RoseCorner, MoonStarCorner, RoyalCorner, RusticCorner, CelestialCorner, BaliCorner, IvoryCorner } from '@/components/invitation/OrnamentSVG'
import GuestbookSection from '@/components/invitation/GuestbookSection'
import DigitalGiftSection from '@/components/invitation/DigitalGiftSection'
import MusicPlayer from '@/components/invitation/MusicPlayer'
import InvitationWrapper from '@/components/invitation/InvitationWrapper'
import GallerySection from '@/components/invitation/GallerySection'
import VideoSection from '@/components/invitation/VideoSection'
import LoveStorySection from '@/components/invitation/LoveStorySection'
import AmbientEffect from '@/components/invitation/AmbientEffect'
import ShareButton from '@/components/invitation/ShareButton'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('invitations').select('groom_name, bride_name, event_date, cover_photo_url').eq('slug', slug).single()
  if (!data) return { title: 'Undangan Digital' }

  const title = `Undangan Pernikahan ${data.groom_name} & ${data.bride_name}`
  const description = `Anda diundang ke pernikahan ${data.groom_name} & ${data.bride_name}${data.event_date ? ` pada ${new Date(data.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}` : ''}. Buka undangan digital kami.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: data.cover_photo_url ? [{ url: data.cover_photo_url, width: 1200, height: 630 }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: data.cover_photo_url ? [data.cover_photo_url] : [],
    },
  }
}

export default async function InvitationPage({ params, searchParams }: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ to?: string }>
}) {
  const { slug } = await params
  const { to } = await searchParams
  const supabase = await createClient()

  const { data: invitation } = await supabase
    .from('invitations')
    .select('*, digital_gifts(*), guestbook(*), gallery(*), couple_photos(*)')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!invitation) notFound()

  const templateMap: Record<string, React.ComponentType<{ invitation: typeof invitation }>> = {
    luxury: TemplateLuxury,
    floral: TemplateFloral,
    midnight: TemplateMidnight,
    royal: TemplateRoyal,
    rustic: TemplateRustic,
    celestial: TemplateCelestial,
    bali: TemplateBali,
    ivory: TemplateIvory,
  }

  const TemplateComponent = templateMap[invitation.template_id as string] || TemplateLuxury

  const themeAccent: Record<string, { accent: string; bgFrom: string; bgTo: string; ambient: 'petals'|'stars'|'leaves'|'crystals'|'sparks'; corner: React.ComponentType<any> }> = {
    luxury:    { accent: '#C9A84C', bgFrom: '#071a0e', bgTo: '#1B4332', ambient: 'sparks',   corner: FlowerCorner },
    floral:    { accent: '#f9a8d4', bgFrom: '#0d0509', bgTo: '#3d1a2e', ambient: 'petals',   corner: RoseCorner },
    midnight:  { accent: '#818cf8', bgFrom: '#010409', bgTo: '#0f172a', ambient: 'stars',    corner: MoonStarCorner },
    royal:     { accent: '#C9A84C', bgFrom: '#0d0205', bgTo: '#4a0e20', ambient: 'sparks',   corner: RoyalCorner },
    rustic:    { accent: '#a3c47a', bgFrom: '#0f0a05', bgTo: '#2d1f0e', ambient: 'leaves',   corner: RusticCorner },
    celestial: { accent: '#C0C0C0', bgFrom: '#020202', bgTo: '#111111', ambient: 'crystals', corner: CelestialCorner },
    bali:      { accent: '#e07b39', bgFrom: '#0a0500', bgTo: '#2d1a00', ambient: 'petals',   corner: BaliCorner },
    ivory:     { accent: '#d4c5a9', bgFrom: '#0e0c0a', bgTo: '#252018', ambient: 'sparks',   corner: IvoryCorner },
  }

  const theme = themeAccent[invitation.template_id as string] || themeAccent.luxury

  return (
    <InvitationWrapper
      invitation={invitation}
      guestName={to}
      accentColor={theme.accent}
      bgFrom={theme.bgFrom}
      bgTo={theme.bgTo}
      CornerComponent={theme.corner}>
      <div className="relative">
        {invitation.music_url && <MusicPlayer url={invitation.music_url} />}
        <AmbientEffect type={theme.ambient} color={theme.accent} count={10}/>
        <ShareButton
          url={`${process.env.NEXT_PUBLIC_APP_URL || 'https://yourdomain.com'}/v/${invitation.slug}`}
          groomName={invitation.groom_name}
          brideName={invitation.bride_name}
          accentColor={theme.accent}
        />
        <TemplateComponent invitation={invitation} />
      </div>
    </InvitationWrapper>
  )
}
