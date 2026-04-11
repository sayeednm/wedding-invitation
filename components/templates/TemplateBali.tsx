'use client'

import type { Invitation } from '@/lib/types'
import SplitLayout from '@/components/invitation/SplitLayout'
import { BaliCorner } from '@/components/invitation/OrnamentSVG'
import { buildSections, PreviewMode } from './TemplateBase'

const accent = '#e07b39'
const bg = 'linear-gradient(180deg, #0a0500 0%, #1a0e00 30%, #2d1a00 55%, #1a0e00 80%, #0a0500 100%)'

export default function TemplateBali({ invitation, previewMode = false }: { invitation: Invitation; previewMode?: boolean }) {
  if (previewMode) {
    return <PreviewMode invitation={invitation} accent={accent} bgGradient={bg} CornerComponent={BaliCorner}/>
  }

  const sections = buildSections(invitation, {
    accent, bgGradient: bg, patternType: 'floral', CornerComponent: BaliCorner,
    DividerIcon: ({ color }) => (
      <svg width="20" height="20" viewBox="0 0 20 20">
        {[0,72,144,216,288].map((a,i) => (
          <ellipse key={i} cx="10" cy="10" rx="3" ry="7" fill={color} opacity="0.6"
            transform={`rotate(${a} 10 10) translate(0 -5.5)`}/>
        ))}
        <circle cx="10" cy="10" r="3" fill={color} opacity="0.9"/>
      </svg>
    ),
  })

  return (
    <SplitLayout
      invitation={invitation}
      sections={sections}
      accentColor={accent}
      bgGradient="linear-gradient(180deg, #0a0500, #2d1a00)"
      patternType="floral"
      CornerComponent={BaliCorner}
    />
  )
}
