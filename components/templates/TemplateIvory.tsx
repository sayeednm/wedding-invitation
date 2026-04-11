'use client'

import type { Invitation } from '@/lib/types'
import SplitLayout from '@/components/invitation/SplitLayout'
import { IvoryCorner } from '@/components/invitation/OrnamentSVG'
import { buildSections, PreviewMode } from './TemplateBase'

const accent = '#d4c5a9'
const bg = 'linear-gradient(180deg, #0e0c0a 0%, #1a1714 30%, #252018 55%, #1a1714 80%, #0e0c0a 100%)'

export default function TemplateIvory({ invitation, previewMode = false }: { invitation: Invitation; previewMode?: boolean }) {
  if (previewMode) {
    return <PreviewMode invitation={invitation} accent={accent} bgGradient={bg} CornerComponent={IvoryCorner}/>
  }

  const sections = buildSections(invitation, {
    accent, bgGradient: bg, patternType: 'geometric', CornerComponent: IvoryCorner,
    DividerIcon: ({ color }) => (
      <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M7 1 L8 6 L13 7 L8 8 L7 13 L6 8 L1 7 L6 6 Z" stroke={color} strokeWidth="0.5" fill="none" opacity="0.5"/>
        <path d="M7 3 L7.8 6.2 L11 7 L7.8 7.8 L7 11 L6.2 7.8 L3 7 L6.2 6.2 Z" fill={color} opacity="0.6"/>
      </svg>
    ),
  })

  return (
    <SplitLayout
      invitation={invitation}
      sections={sections}
      accentColor={accent}
      bgGradient="linear-gradient(180deg, #0e0c0a, #252018)"
      patternType="geometric"
      CornerComponent={IvoryCorner}
    />
  )
}
