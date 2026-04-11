'use client'

interface Props {
  accentColor: string
  templateId: string
  size: number
  frame?: string
}

export default function PhotoDecoration({ accentColor, templateId, size, frame = 'circle' }: Props) {
  // Ukuran SVG lebih besar dari foto
  const pad = size * 0.35
  const sw = frame === 'oval' ? Math.round(size * 0.82) + pad * 2 : size + pad * 2
  const sh = size + pad * 2
  const cx = sw / 2
  const cy = sh / 2
  // Radius ornamen — sedikit di luar bingkai foto
  const rx = (frame === 'oval' ? Math.round(size * 0.82) / 2 : size / 2) + pad * 0.55
  const ry = size / 2 + pad * 0.55

  const isFloral = ['floral', 'bali', 'luxury'].includes(templateId)
  const isRustic = templateId === 'rustic'
  const isMidnight = ['midnight', 'celestial'].includes(templateId)
  const isRoyal = templateId === 'royal'

  // 4 titik diagonal yang simetris mengikuti bentuk oval/circle
  const angle = 45 * Math.PI / 180
  const points = [
    { x: cx + rx * Math.cos(angle),  y: cy - ry * Math.sin(angle) },  // kanan atas
    { x: cx - rx * Math.cos(angle),  y: cy - ry * Math.sin(angle) },  // kiri atas
    { x: cx + rx * Math.cos(angle),  y: cy + ry * Math.sin(angle) },  // kanan bawah
    { x: cx - rx * Math.cos(angle),  y: cy + ry * Math.sin(angle) },  // kiri bawah
  ]

  function OrnamentAt({ x, y }: { x: number; y: number }) {
    if (isFloral) return (
      <g transform={`translate(${x},${y})`}>
        {[0,72,144,216,288].map((a,j) => (
          <ellipse key={j} cx="0" cy="0" rx="1.8" ry="4.5"
            fill={accentColor} opacity="0.4"
            transform={`rotate(${a}) translate(0 -3.5)`}/>
        ))}
        <circle cx="0" cy="0" r="2.2" fill={accentColor} opacity="0.55"/>
      </g>
    )
    if (isRustic) return (
      <g transform={`translate(${x},${y})`}>
        <ellipse cx="0" cy="-4" rx="2.5" ry="6" fill={accentColor} opacity="0.35"/>
        <line x1="0" y1="0" x2="0" y2="-7" stroke={accentColor} strokeWidth="0.5" opacity="0.3"/>
      </g>
    )
    if (isMidnight) return (
      <g transform={`translate(${x},${y})`}>
        <path d="M0 -5 L1.2 -1.2 L5 0 L1.2 1.2 L0 5 L-1.2 1.2 L-5 0 L-1.2 -1.2 Z"
          fill={accentColor} opacity="0.45"/>
      </g>
    )
    if (isRoyal) return (
      <g transform={`translate(${x},${y})`}>
        <path d="M0 -5 L3.5 0 L0 5 L-3.5 0 Z"
          stroke={accentColor} strokeWidth="0.8" fill="none" opacity="0.45"/>
        <circle cx="0" cy="0" r="1" fill={accentColor} opacity="0.4"/>
      </g>
    )
    // Default
    return (
      <g transform={`translate(${x},${y})`}>
        <path d="M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1 Z"
          fill={accentColor} opacity="0.4"/>
      </g>
    )
  }

  return (
    <svg
      width={sw}
      height={sh}
      viewBox={`0 0 ${sw} ${sh}`}
      fill="none"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ zIndex: 0 }}>

      {/* Ellipse tipis mengikuti bentuk foto */}
      <ellipse cx={cx} cy={cy} rx={rx + 4} ry={ry + 4}
        stroke={accentColor} strokeWidth="0.6" opacity="0.2"/>
      <ellipse cx={cx} cy={cy} rx={rx + 10} ry={ry + 10}
        stroke={accentColor} strokeWidth="0.4" opacity="0.1" strokeDasharray="3 6"/>

      {/* Ornamen di 4 titik diagonal — simetris */}
      {points.map((p, i) => <OrnamentAt key={i} x={p.x} y={p.y}/>)}

      {/* Garis pendek di 4 titik kardinal */}
      {[
        { x1: cx, y1: cy - ry - 2, x2: cx, y2: cy - ry + 5 },
        { x1: cx, y1: cy + ry - 5, x2: cx, y2: cy + ry + 2 },
        { x1: cx - rx - 2, y1: cy, x2: cx - rx + 5, y2: cy },
        { x1: cx + rx - 5, y1: cy, x2: cx + rx + 2, y2: cy },
      ].map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke={accentColor} strokeWidth="1" opacity="0.25"/>
      ))}
    </svg>
  )
}
