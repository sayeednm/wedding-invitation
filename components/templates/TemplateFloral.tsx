'use client'

import type { Invitation } from '@/lib/types'
import SplitLayout from '@/components/invitation/SplitLayout'
import FloatingParticles from '@/components/invitation/FloatingParticles'
import { RoseCorner } from '@/components/invitation/OrnamentSVG'
import { buildSections, PreviewMode } from './TemplateBase'
import { motion } from 'framer-motion'
import { formatDate } from '@/lib/utils'

const accent = '#f9a8d4'
const bg = 'linear-gradient(180deg, #0d0509 0%, #2a0f1e 30%, #3d1a2e 55%, #2a0f1e 80%, #0d0509 100%)'

export default function TemplateFloral({ invitation, previewMode = false }: { invitation: Invitation; previewMode?: boolean }) {
  if (previewMode) {
    return <PreviewMode invitation={invitation} accent={accent} bgGradient={bg} CornerComponent={RoseCorner}/>
  }

  const sections = buildSections(invitation, {
    accent, bgGradient: bg, patternType: 'floral', CornerComponent: RoseCorner,
    DividerIcon: ({ color }) => (
      <svg width="20" height="20" viewBox="0 0 20 20">
        {[0,72,144,216,288].map((a,i) => (
          <ellipse key={i} cx="10" cy="10" rx="2.5" ry="5.5" fill={color} opacity="0.6"
            transform={`rotate(${a} 10 10) translate(0 -4.5)`}/>
        ))}
        <circle cx="10" cy="10" r="2.5" fill={color} opacity="0.9"/>
      </svg>
    ),
  })

  return (
    <SplitLayout
      invitation={invitation}
      sections={sections}
      accentColor={accent}
      bgGradient="linear-gradient(180deg, #0d0509, #3d1a2e)"
      patternType="floral"
      CornerComponent={RoseCorner}
    />
  )
}
