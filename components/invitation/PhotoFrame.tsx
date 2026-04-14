'use client'

interface Props {
  src: string
  alt?: string
  frame?: 'circle' | 'oval' | 'rounded' | 'hexagon' | 'diamond' | null
  size?: number
  accentColor?: string
}

export default function PhotoFrame({ src, alt = '', frame = 'circle', size = 192, accentColor = '#C9A84C' }: Props) {
  const s = size

  if (frame === 'oval') {
    const w = Math.round(s * 0.78)
    const h = s
    return (
      <div className="relative flex items-center justify-center" style={{ width: w, height: h }}>
        <div className="absolute" style={{ inset: -8, borderRadius: '50%', border: `1px solid ${accentColor}20` }}/>
        <div className="absolute" style={{ inset: -3, borderRadius: '50%', border: `1px solid ${accentColor}35` }}/>
        <div style={{ width: w, height: h, borderRadius: '50%', overflow: 'hidden', border: `2px solid ${accentColor}`, boxShadow: `0 0 30px ${accentColor}30, 0 8px 32px rgba(0,0,0,0.4)` }}>
          <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}/>
        </div>
      </div>
    )
  }

  if (frame === 'hexagon') {
    return (
      <div className="relative flex items-center justify-center" style={{ width: s, height: s }}>
        <svg width={s} height={s} viewBox="0 0 100 100" className="absolute inset-0">
          <defs>
            <clipPath id="hex-clip">
              <polygon points="50,2 93,26 93,74 50,98 7,74 7,26"/>
            </clipPath>
          </defs>
          <polygon points="50,2 93,26 93,74 50,98 7,74 7,26"
            fill="none" stroke={accentColor} strokeWidth="1.5" opacity="0.6"/>
          <polygon points="50,6 89,28 89,72 50,94 11,72 11,28"
            fill="none" stroke={accentColor} strokeWidth="0.5" opacity="0.3"/>
        </svg>
        <div style={{ width: s * 0.86, height: s * 0.86, clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)', overflow: 'hidden' }}>
          <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        </div>
      </div>
    )
  }

  if (frame === 'diamond') {
    return (
      <div className="relative flex items-center justify-center" style={{ width: s, height: s }}>
        <svg width={s} height={s} viewBox="0 0 100 100" className="absolute inset-0">
          <defs>
            <clipPath id="diamond-clip">
              <polygon points="50,2 98,50 50,98 2,50"/>
            </clipPath>
          </defs>
          <polygon points="50,2 98,50 50,98 2,50"
            fill="none" stroke={accentColor} strokeWidth="1.5" opacity="0.6"/>
          <polygon points="50,8 92,50 50,92 8,50"
            fill="none" stroke={accentColor} strokeWidth="0.5" opacity="0.3"/>
        </svg>
        <div style={{ width: s * 0.88, height: s * 0.88, clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', overflow: 'hidden' }}>
          <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        </div>
      </div>
    )
  }

  if (frame === 'rounded') {
    return (
      <div className="relative" style={{ width: s, height: s }}>
        <div className="overflow-hidden" style={{ width: s, height: s, borderRadius: s * 0.15, border: `2px solid ${accentColor}`, boxShadow: `0 0 30px ${accentColor}30` }}>
          <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        </div>
        {/* Corner ornaments */}
        {[['0,0','0'], [`${s-16},0`,'90'], ['0,'+`${s-16}`,'-90'], [`${s-16},${s-16}`,'180']].map(([pos, rot], i) => {
          const [x, y] = pos.split(',').map(Number)
          return (
            <svg key={i} width="16" height="16" viewBox="0 0 16 16" className="absolute"
              style={{ left: x, top: y, transform: `rotate(${rot}deg)` }}>
              <path d="M0 0 L8 0 M0 0 L0 8" stroke={accentColor} strokeWidth="1.5" fill="none" opacity="0.7"/>
            </svg>
          )
        })}
      </div>
    )
  }

  // Default: circle
  return (
    <div className="relative" style={{ width: s, height: s }}>
      <div className="rounded-full overflow-hidden" style={{ width: s, height: s, border: `2px solid ${accentColor}`, boxShadow: `0 0 30px ${accentColor}30` }}>
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
      </div>
      <div className="absolute rounded-full" style={{ inset: -8, border: `1px solid ${accentColor}25` }}/>
      <div className="absolute rounded-full" style={{ inset: -16, border: `1px solid ${accentColor}12` }}/>
    </div>
  )
}

// Oval frame — lonjong seperti di referensi
export function OvalFrame({ src, alt = '', size = 192, accentColor = '#C9A84C' }: Omit<Props, 'frame'>) {
  const w = size * 0.78
  const h = size
  return (
    <div className="relative flex items-center justify-center" style={{ width: w, height: h }}>
      {/* Outer oval border */}
      <div className="absolute" style={{
        inset: -10,
        borderRadius: '50%',
        border: `1px solid ${accentColor}20`,
      }}/>
      <div className="absolute" style={{
        inset: -4,
        borderRadius: '50%',
        border: `1px solid ${accentColor}35`,
      }}/>
      {/* Photo */}
      <div style={{
        width: w,
        height: h,
        borderRadius: '50%',
        overflow: 'hidden',
        border: `2px solid ${accentColor}`,
        boxShadow: `0 0 30px ${accentColor}30, 0 8px 32px rgba(0,0,0,0.4)`,
      }}>
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}/>
      </div>
    </div>
  )
}
