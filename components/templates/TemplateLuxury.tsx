'use client'

import type { Invitation } from '@/lib/types'
import { FlowerCorner } from '@/components/invitation/FlowerSVG'
import SplitLayout from '@/components/invitation/SplitLayout'
import { buildSections, PreviewMode } from './TemplateBase'

const goldHex = '#C9A84C'

export default function TemplateLuxury({ invitation, previewMode = false }: { invitation: Invitation; previewMode?: boolean }) {

  if (previewMode) {
    return <PreviewMode invitation={invitation} accent={goldHex} bgGradient="linear-gradient(180deg, #071a0e, #1B4332)" CornerComponent={FlowerCorner}/>
  }

  const sections = buildSections(invitation, {
    accent: goldHex,
    bgGradient: 'linear-gradient(180deg, #071a0e, #0f2d1a)',
    patternType: 'floral',
    CornerComponent: FlowerCorner,
    DividerIcon: ({ color }) => (
      <svg width="16" height="16" viewBox="0 0 16 16">
        <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" fill={color} opacity="0.8"/>
      </svg>
    ),
  })

  return (
    <SplitLayout
      invitation={invitation}
      sections={sections}
      accentColor={goldHex}
      bgGradient="linear-gradient(180deg, #071a0e, #1B4332)"
      patternType="floral"
    />
  )
}
