'use client'

import type { Invitation } from '@/lib/types'
import SplitLayout from '@/components/invitation/SplitLayout'
import { CelestialCorner } from '@/components/invitation/OrnamentSVG'
import { buildSections, PreviewMode } from './TemplateBase'

const accent = '#C0C0C0'
const bg = 'linear-gradient(180deg, #020202 0%, #0a0a0a 30%, #111111 55%, #0a0a0a 80%, #020202 100%)'

export default function TemplateCelestial({ invitation, previewMode = false }: { invitation: Invitation; previewMode?: boolean }) {
  if (previewMode) {
    return <PreviewMode invitation={invitation} accent={accent} bgGradient={bg} CornerComponent={CelestialCorner}/>
  }

  const sections = buildSections(invitation, {
    accent, bgGradient: bg, patternType: 'mandala', CornerComponent: CelestialCorner,
    DividerIcon: ({ color }) => (
      <svg width="16" height="16" viewBox="0 0 16 16" suppressHydrationWarning>
        <line x1="8" y1="8" x2="15" y2="8" stroke={color} strokeWidth="1" opacity="0.6"/>
        <line x1="8" y1="8" x2="12.95" y2="12.95" stroke={color} strokeWidth="0.6" opacity="0.4"/>
        <line x1="8" y1="8" x2="8" y2="15" stroke={color} strokeWidth="1" opacity="0.6"/>
        <line x1="8" y1="8" x2="3.05" y2="12.95" stroke={color} strokeWidth="0.6" opacity="0.4"/>
        <line x1="8" y1="8" x2="1" y2="8" stroke={color} strokeWidth="1" opacity="0.6"/>
        <line x1="8" y1="8" x2="3.05" y2="3.05" stroke={color} strokeWidth="0.6" opacity="0.4"/>
        <line x1="8" y1="8" x2="8" y2="1" stroke={color} strokeWidth="1" opacity="0.6"/>
        <line x1="8" y1="8" x2="12.95" y2="3.05" stroke={color} strokeWidth="0.6" opacity="0.4"/>
        <circle cx="8" cy="8" r="2" fill={color} opacity="0.8"/>
      </svg>
    ),
  })

  return (
    <SplitLayout
      invitation={invitation}
      sections={sections}
      accentColor={accent}
      bgFrom="#020202"
      bgTo="#111111"
      patternType="mandala"
      CornerComponent={CelestialCorner}
    />
  )
}
