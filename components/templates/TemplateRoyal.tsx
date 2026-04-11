'use client'

import type { Invitation } from '@/lib/types'
import SplitLayout from '@/components/invitation/SplitLayout'
import { RoyalCorner } from '@/components/invitation/OrnamentSVG'
import { buildSections, PreviewMode } from './TemplateBase'

const accent = '#C9A84C'
const bg = 'linear-gradient(180deg, #0d0205 0%, #2d0a14 30%, #4a0e20 55%, #2d0a14 80%, #0d0205 100%)'

export default function TemplateRoyal({ invitation, previewMode = false }: { invitation: Invitation; previewMode?: boolean }) {
  if (previewMode) {
    return <PreviewMode invitation={invitation} accent={accent} bgGradient={bg} CornerComponent={RoyalCorner}/>
  }

  const sections = buildSections(invitation, {
    accent, bgGradient: bg, patternType: 'geometric', CornerComponent: RoyalCorner,
    DividerIcon: ({ color }) => (
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path d="M9 2 L9 5 L6 3 L8 6 L5 5 L7 8 L4 8 L7 10 L5 13 L8 12 L9 16 L10 12 L13 13 L11 10 L14 8 L11 8 L13 5 L10 6 L12 3 L9 5 Z" fill={color} opacity="0.8"/>
      </svg>
    ),
  })

  return (
    <SplitLayout
      invitation={invitation}
      sections={sections}
      accentColor={accent}
      bgGradient="linear-gradient(180deg, #0d0205, #4a0e20)"
      patternType="geometric"
      CornerComponent={RoyalCorner}
    />
  )
}
