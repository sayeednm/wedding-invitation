import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDemoInvitation } from '@/lib/demoData'
import TemplateLuxury from '@/components/templates/TemplateLuxury'
import TemplateFloral from '@/components/templates/TemplateFloral'
import TemplateMidnight from '@/components/templates/TemplateMidnight'
import TemplateRoyal from '@/components/templates/TemplateRoyal'
import TemplateRustic from '@/components/templates/TemplateRustic'
import TemplateCelestial from '@/components/templates/TemplateCelestial'
import TemplateBali from '@/components/templates/TemplateBali'
import TemplateIvory from '@/components/templates/TemplateIvory'
import MusicPlayer from '@/components/invitation/MusicPlayer'
import DemoOpeningWrapper from '@/components/invitation/DemoOpeningWrapper'
import AmbientEffect from '@/components/invitation/AmbientEffect'
import { FlowerCorner } from '@/components/invitation/FlowerSVG'
import { RoseCorner, CelestialCorner, BaliCorner, IvoryCorner, MoonStarCorner, RoyalCorner, RusticCorner } from '@/components/invitation/OrnamentSVG'

const validThemes = ['luxury', 'floral', 'midnight', 'royal', 'rustic', 'celestial', 'bali', 'ivory']

const themeConfig: Record<string, { accent: string; bgFrom: string; bgTo: string; name: string }> = {
  luxury:    { accent: '#C9A84C', bgFrom: '#071a0e', bgTo: '#1B4332', name: 'Luxury Gold' },
  floral:    { accent: '#f9a8d4', bgFrom: '#0d0509', bgTo: '#3d1a2e', name: 'Floral Romance' },
  midnight:  { accent: '#818cf8', bgFrom: '#010409', bgTo: '#0f172a', name: 'Midnight Elegance' },
  royal:     { accent: '#C9A84C', bgFrom: '#0d0205', bgTo: '#4a0e20', name: 'Royal Burgundy' },
  rustic:    { accent: '#a3c47a', bgFrom: '#0f0a05', bgTo: '#2d1f0e', name: 'Rustic Garden' },
  celestial: { accent: '#C0C0C0', bgFrom: '#020202', bgTo: '#111111', name: 'Celestial Silver' },
  bali:      { accent: '#e07b39', bgFrom: '#0a0500', bgTo: '#2d1a00', name: 'Bali Tropical' },
  ivory:     { accent: '#d4c5a9', bgFrom: '#0e0c0a', bgTo: '#252018', name: 'Minimalist Ivory' },
}

export async function generateMetadata({ params }: { params: Promise<{ theme: string }> }): Promise<Metadata> {
  const { theme } = await params
  const config = themeConfig[theme]
  if (!config) return { title: 'Demo Undangan' }
  return {
    title: `Demo Tema ${config.name} — Undangan Digital`,
    description: `Lihat contoh undangan digital tema ${config.name}. Rizky & Amara.`,
  }
}

export default async function DemoPage({ params, searchParams }: {
  params: Promise<{ theme: string }>
  searchParams: Promise<{ photos?: string }>
}) {
  const { theme } = await params
  const { photos } = await searchParams
  if (!validThemes.includes(theme)) notFound()

  const withPhotos = photos !== 'false'
  const invitation = getDemoInvitation(theme, withPhotos)
  const config = themeConfig[theme]

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

  const TemplateComponent = templateMap[theme]

  const cornerMap: Record<string, React.ComponentType<{ color: string; position: 'tl'|'tr'|'bl'|'br'; size?: number; opacity?: number }>> = {
    luxury:    FlowerCorner,
    floral:    RoseCorner,
    midnight:  MoonStarCorner,
    royal:     RoyalCorner,
    rustic:    RusticCorner,
    celestial: CelestialCorner,
    bali:      BaliCorner,
    ivory:     IvoryCorner,
  }

  const ambientMap: Record<string, 'petals'|'stars'|'leaves'|'crystals'|'sparks'> = {
    luxury:    'sparks',
    floral:    'petals',
    midnight:  'stars',
    royal:     'sparks',
    rustic:    'leaves',
    celestial: 'crystals',
    bali:      'petals',
    ivory:     'sparks',
  }

  return (
    <DemoOpeningWrapper
      invitation={invitation}
      accentColor={config.accent}
      bgFrom={config.bgFrom}
      bgTo={config.bgTo}
      themeName={config.name}
      withPhotos={withPhotos}
      CornerComponent={cornerMap[theme]}>
      <div className="relative">
        {invitation.music_url && <MusicPlayer url={invitation.music_url} />}
        <AmbientEffect type={ambientMap[theme]} color={config.accent} count={10}/>
        <TemplateComponent invitation={invitation} />
      </div>
    </DemoOpeningWrapper>
  )
}
