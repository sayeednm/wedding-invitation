'use client'

interface Props {
  color: string
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  size?: number
}

export default function FloralOrnament({ color, position, size = 120 }: Props) {
  const posStyle: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    opacity: 0.35,
    pointerEvents: 'none',
    ...(position === 'top-left' && { top: 0, left: 0 }),
    ...(position === 'top-right' && { top: 0, right: 0, transform: 'scaleX(-1)' }),
    ...(position === 'bottom-left' && { bottom: 0, left: 0, transform: 'scaleY(-1)' }),
    ...(position === 'bottom-right' && { bottom: 0, right: 0, transform: 'scale(-1)' }),
  }

  return (
    <div style={posStyle}>
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main flower */}
        <circle cx="20" cy="20" r="8" fill={color} opacity="0.6" />
        {/* Petals */}
        <ellipse cx="20" cy="8" rx="4" ry="7" fill={color} opacity="0.5" />
        <ellipse cx="20" cy="32" rx="4" ry="7" fill={color} opacity="0.5" />
        <ellipse cx="8" cy="20" rx="7" ry="4" fill={color} opacity="0.5" />
        <ellipse cx="32" cy="20" rx="7" ry="4" fill={color} opacity="0.5" />
        <ellipse cx="11" cy="11" rx="4" ry="7" fill={color} opacity="0.4" transform="rotate(-45 11 11)" />
        <ellipse cx="29" cy="11" rx="4" ry="7" fill={color} opacity="0.4" transform="rotate(45 29 11)" />
        {/* Stem */}
        <path d="M28 28 Q50 50 80 30" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M28 28 Q40 70 20 90" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
        {/* Small flower 2 */}
        <circle cx="80" cy="30" r="5" fill={color} opacity="0.5" />
        <ellipse cx="80" cy="22" rx="3" ry="5" fill={color} opacity="0.4" />
        <ellipse cx="80" cy="38" rx="3" ry="5" fill={color} opacity="0.4" />
        <ellipse cx="72" cy="30" rx="5" ry="3" fill={color} opacity="0.4" />
        <ellipse cx="88" cy="30" rx="5" ry="3" fill={color} opacity="0.4" />
        {/* Small flower 3 */}
        <circle cx="20" cy="90" r="5" fill={color} opacity="0.5" />
        <ellipse cx="20" cy="82" rx="3" ry="5" fill={color} opacity="0.4" />
        <ellipse cx="20" cy="98" rx="3" ry="5" fill={color} opacity="0.4" />
        <ellipse cx="12" cy="90" rx="5" ry="3" fill={color} opacity="0.4" />
        <ellipse cx="28" cy="90" rx="5" ry="3" fill={color} opacity="0.4" />
        {/* Leaves */}
        <ellipse cx="45" cy="42" rx="8" ry="4" fill={color} opacity="0.3" transform="rotate(-30 45 42)" />
        <ellipse cx="35" cy="60" rx="8" ry="4" fill={color} opacity="0.3" transform="rotate(-60 35 60)" />
        {/* Dots */}
        <circle cx="60" cy="55" r="2" fill={color} opacity="0.3" />
        <circle cx="50" cy="70" r="1.5" fill={color} opacity="0.25" />
        <circle cx="70" cy="50" r="1.5" fill={color} opacity="0.25" />
      </svg>
    </div>
  )
}
