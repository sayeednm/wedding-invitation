'use client'

import type { Invitation } from '@/lib/types'
import SplitLayout from '@/components/invitation/SplitLayout'
import { RusticCorner } from '@/components/invitation/OrnamentSVG'
import { buildSections, PreviewMode } from './TemplateBase'

const accent = '#a3c47a'
const bg = 'linear-gradient(180deg, #0f0a05 0%, #1e1408 30%, #2d1f0e 55%, #1e1408 80%, #0f0a05 100%)'

export default function TemplateRustic({ invitation, previewMode = false }: { invitation: Invitation; previewMode?: boolean }) {
  if (previewMode) {
    return <PreviewMode invitation={invitation} accent={accent} bgGradient={bg} CornerComponent={RusticCorner}/>
  }

  const sections = buildSections(invitation, {
    accent, bgGradient: bg, patternType: 'vine', CornerComponent: RusticCorner,
    DividerIcon: ({ color }) => (
      <svg width="20" height="12" viewBox="0 0 20 12">
        <path d="M10 6 Q5 0 0 3 Q5 6 0 9 Q5 6 10 6 Q15 0 20 3 Q15 6 20 9 Q15 6 10 6Z" fill={color} opacity="0.7"/>
      </svg>
    ),
  })

  return (
    <SplitLayout
      invitation={invitation}
      sections={sections}
      accentColor={accent}
      bgGradient="linear-gradient(180deg, #0f0a05, #2d1f0e)"
      patternType="vine"
      CornerComponent={RusticCorner}
    />
  )
}
