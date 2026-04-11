'use client'

import type { Invitation } from '@/lib/types'
import SplitLayout from '@/components/invitation/SplitLayout'
import { MoonStarCorner } from '@/components/invitation/OrnamentSVG'
import { buildSections, PreviewMode } from './TemplateBase'

const accent = '#818cf8'
const bg = 'linear-gradient(180deg, #010409 0%, #0a0f1e 30%, #0f172a 55%, #0a0f1e 80%, #010409 100%)'

export default function TemplateMidnight({ invitation, previewMode = false }: { invitation: Invitation; previewMode?: boolean }) {
  if (previewMode) {
    return <PreviewMode invitation={invitation} accent={accent} bgGradient={bg} CornerComponent={MoonStarCorner}/>
  }

  const sections = buildSections(invitation, {
    accent, bgGradient: bg, patternType: 'mandala', CornerComponent: MoonStarCorner,
    DividerIcon: ({ color }) => (
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path d="M9 1 Q12 6 17 9 Q12 12 9 17 Q6 12 1 9 Q6 6 9 1Z" fill={color} opacity="0.7"/>
      </svg>
    ),
  })

  return (
    <SplitLayout
      invitation={invitation}
      sections={sections}
      accentColor={accent}
      bgFrom="#010409"
      bgTo="#0f172a"
      patternType="mandala"
      CornerComponent={MoonStarCorner}
    />
  )
}
