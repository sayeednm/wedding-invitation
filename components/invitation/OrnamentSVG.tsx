'use client'

import React from 'react'

// ─── SHARED WRAPPER ───────────────────────────────────────────────────────────
function Corner({ children, position, size = 160, opacity = 0.45 }: {
  children: React.ReactNode
  position: 'tl' | 'tr' | 'bl' | 'br'
  size?: number
  opacity?: number
}) {
  const style: React.CSSProperties = {
    position: 'absolute', width: size, height: size, opacity,
    pointerEvents: 'none', zIndex: 1,
    ...(position === 'tl' && { top: 0, left: 0 }),
    ...(position === 'tr' && { top: 0, right: 0 }),
    ...(position === 'bl' && { bottom: 0, left: 0 }),
    ...(position === 'br' && { bottom: 0, right: 0 }),
  }
  const flip: React.CSSProperties = {
    width: '100%', height: '100%',
    ...(position === 'tr' && { transform: 'scaleX(-1)' }),
    ...(position === 'bl' && { transform: 'scaleY(-1)' }),
    ...(position === 'br' && { transform: 'scale(-1,-1)' }),
  }
  return <div style={style}><div style={flip}>{children}</div></div>
}

// ─── FLORAL ROMANCE — Mawar mekar ─────────────────────────────────────────────
function RoseOrnamentSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Big rose */}
      <g transform="translate(12,12)">
        {[0,45,90,135,180,225,270,315].map((a,i) => (
          <ellipse key={i} cx="24" cy="24" rx="6" ry="13"
            fill={color} opacity={0.45}
            transform={`rotate(${a} 24 24) translate(0 -13)`} />
        ))}
        {[22,67,112,157,202,247].map((a,i) => (
          <ellipse key={i} cx="24" cy="24" rx="5" ry="10"
            fill={color} opacity={0.6}
            transform={`rotate(${a} 24 24) translate(0 -9)`} />
        ))}
        {[0,60,120,180,240,300].map((a,i) => (
          <ellipse key={i} cx="24" cy="24" rx="4" ry="7"
            fill={color} opacity={0.75}
            transform={`rotate(${a} 24 24) translate(0 -5)`} />
        ))}
        <circle cx="24" cy="24" r="6" fill={color} opacity="0.95" />
      </g>
      {/* Vines */}
      <path d="M36 36 Q60 50 95 30" stroke={color} strokeWidth="1.3" fill="none" opacity="0.4" strokeLinecap="round"/>
      <path d="M36 36 Q42 75 22 115" stroke={color} strokeWidth="1.3" fill="none" opacity="0.4" strokeLinecap="round"/>
      <path d="M36 36 Q80 75 75 125" stroke={color} strokeWidth="1" fill="none" opacity="0.3" strokeLinecap="round"/>
      {/* Leaves */}
      <path d="M52 48 Q64 36 76 48 Q64 60 52 48Z" fill={color} opacity="0.35"/>
      <path d="M30 72 Q18 60 26 48 Q38 60 30 72Z" fill={color} opacity="0.35"/>
      <path d="M58 92 Q72 82 76 96 Q63 102 58 92Z" fill={color} opacity="0.3"/>
      <path d="M42 110 Q30 100 36 88 Q48 98 42 110Z" fill={color} opacity="0.3"/>
      {/* Small rose 1 */}
      <g transform="translate(82,22)">
        {[0,60,120,180,240,300].map((a,i) => (
          <ellipse key={i} cx="10" cy="10" rx="3.5" ry="7"
            fill={color} opacity={0.5}
            transform={`rotate(${a} 10 10) translate(0 -6)`} />
        ))}
        <circle cx="10" cy="10" r="4" fill={color} opacity="0.85"/>
      </g>
      {/* Small rose 2 */}
      <g transform="translate(16,92)">
        {[0,60,120,180,240,300].map((a,i) => (
          <ellipse key={i} cx="9" cy="9" rx="3" ry="6"
            fill={color} opacity={0.45}
            transform={`rotate(${a} 9 9) translate(0 -5)`} />
        ))}
        <circle cx="9" cy="9" r="3.5" fill={color} opacity="0.8"/>
      </g>
      {/* Tiny buds */}
      <ellipse cx="68" cy="118" rx="3" ry="5" fill={color} opacity="0.35" transform="rotate(-20 68 118)"/>
      <ellipse cx="100" cy="55" rx="2.5" ry="4" fill={color} opacity="0.3" transform="rotate(15 100 55)"/>
      <circle cx="78" cy="72" r="2" fill={color} opacity="0.25"/>
      <circle cx="50" cy="130" r="1.5" fill={color} opacity="0.2"/>
    </svg>
  )
}

// ─── MIDNIGHT — Bulan & bintang ───────────────────────────────────────────────
function MoonStarOrnamentSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Crescent moon */}
      <path d="M35 15 Q55 25 55 45 Q55 65 35 75 Q50 70 58 55 Q65 40 55 25 Q48 15 35 15Z"
        fill={color} opacity="0.6"/>
      {/* Large star */}
      <path d="M90 20 L93 32 L105 35 L93 38 L90 50 L87 38 L75 35 L87 32 Z"
        fill={color} opacity="0.8"/>
      {/* Medium stars */}
      <path d="M25 90 L27 98 L35 100 L27 102 L25 110 L23 102 L15 100 L23 98 Z"
        fill={color} opacity="0.6"/>
      <path d="M110 70 L112 76 L118 78 L112 80 L110 86 L108 80 L102 78 L108 76 Z"
        fill={color} opacity="0.55"/>
      {/* Small stars scattered */}
      {[[45,55,0.5],[70,90,0.4],[95,110,0.45],[120,40,0.4],[30,130,0.35],[80,130,0.3],[130,95,0.35],[55,115,0.3]].map(([x,y,o],i) => (
        <path key={i} d={`M${x} ${y} L${x+1.5} ${y+4} L${x+5} ${y+5} L${x+1.5} ${y+6} L${x} ${y+10} L${x-1.5} ${y+6} L${x-5} ${y+5} L${x-1.5} ${y+4} Z`}
          fill={color} opacity={o}/>
      ))}
      {/* Dots */}
      {[[60,30,1.5,0.3],[100,90,1,0.25],[40,105,1.5,0.25],[115,120,1,0.2]].map(([x,y,r,o],i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={color} opacity={o}/>
      ))}
      {/* Geometric lines */}
      <path d="M70 15 L75 25 L80 15" stroke={color} strokeWidth="0.8" fill="none" opacity="0.3"/>
      <path d="M15 55 L25 60 L15 65" stroke={color} strokeWidth="0.8" fill="none" opacity="0.3"/>
    </svg>
  )
}

// ─── ROYAL BURGUNDY — Mahkota & fleur-de-lis ──────────────────────────────────
function RoyalOrnamentSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Crown */}
      <path d="M10 50 L10 35 L25 45 L35 25 L45 45 L55 30 L55 50 Z"
        fill={color} opacity="0.6"/>
      <rect x="10" y="50" width="45" height="8" rx="2" fill={color} opacity="0.5"/>
      {/* Jewels on crown */}
      <circle cx="20" cy="47" r="3" fill={color} opacity="0.8"/>
      <circle cx="32" cy="44" r="3.5" fill={color} opacity="0.9"/>
      <circle cx="45" cy="47" r="3" fill={color} opacity="0.8"/>
      {/* Fleur-de-lis */}
      <g transform="translate(75,10)">
        <ellipse cx="12" cy="20" rx="4" ry="10" fill={color} opacity="0.55"/>
        <ellipse cx="6" cy="22" rx="4" ry="8" fill={color} opacity="0.5" transform="rotate(-30 6 22)"/>
        <ellipse cx="18" cy="22" rx="4" ry="8" fill={color} opacity="0.5" transform="rotate(30 18 22)"/>
        <rect x="10" y="28" width="4" height="8" rx="2" fill={color} opacity="0.5"/>
        <ellipse cx="12" cy="36" rx="6" ry="3" fill={color} opacity="0.45"/>
      </g>
      {/* Ornate border lines */}
      <path d="M5 65 Q40 80 75 65" stroke={color} strokeWidth="1" fill="none" opacity="0.35"/>
      <path d="M5 68 Q40 83 75 68" stroke={color} strokeWidth="0.5" fill="none" opacity="0.25"/>
      {/* Diamond shapes */}
      <path d="M20 85 L28 95 L20 105 L12 95 Z" fill={color} opacity="0.3"/>
      <path d="M50 100 L56 108 L50 116 L44 108 Z" fill={color} opacity="0.25"/>
      {/* Scroll ornament */}
      <path d="M5 120 Q20 110 35 120 Q50 130 65 120" stroke={color} strokeWidth="1.2" fill="none" opacity="0.4" strokeLinecap="round"/>
      <path d="M15 130 Q30 122 45 130" stroke={color} strokeWidth="0.8" fill="none" opacity="0.3" strokeLinecap="round"/>
      {/* Stars */}
      {[[90,55,0.4],[100,80,0.35],[85,105,0.3],[110,100,0.3]].map(([x,y,o],i) => (
        <path key={i} d={`M${x} ${y} L${x+1.5} ${y+4} L${x+5} ${y+5} L${x+1.5} ${y+6} L${x} ${y+10} L${x-1.5} ${y+6} L${x-5} ${y+5} L${x-1.5} ${y+4} Z`}
          fill={color} opacity={o}/>
      ))}
    </svg>
  )
}

// ─── RUSTIC GARDEN — Pakis & ranting ──────────────────────────────────────────
function RusticOrnamentSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main fern branch */}
      <path d="M15 140 Q40 100 30 60 Q25 30 45 15" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round"/>
      {/* Fern leaves left */}
      {[[30,120,-40],[32,105,-50],[30,90,-45],[28,75,-40],[26,60,-35]].map(([x,y,r],i) => (
        <ellipse key={i} cx={x} cy={y} rx="12" ry="5"
          fill={color} opacity={0.3 + i*0.02}
          transform={`rotate(${r} ${x} ${y})`}/>
      ))}
      {/* Fern leaves right */}
      {[[38,115,30],[40,100,35],[38,85,30],[36,70,25]].map(([x,y,r],i) => (
        <ellipse key={i} cx={x} cy={y} rx="10" ry="4"
          fill={color} opacity={0.25 + i*0.02}
          transform={`rotate(${r} ${x} ${y})`}/>
      ))}
      {/* Wild flower 1 */}
      <g transform="translate(55,18)">
        {[0,72,144,216,288].map((a,i) => (
          <ellipse key={i} cx="12" cy="12" rx="4" ry="9"
            fill={color} opacity="0.45"
            transform={`rotate(${a} 12 12) translate(0 -8)`}/>
        ))}
        <circle cx="12" cy="12" r="5" fill={color} opacity="0.8"/>
      </g>
      {/* Wild flower 2 */}
      <g transform="translate(85,55)">
        {[0,72,144,216,288].map((a,i) => (
          <ellipse key={i} cx="9" cy="9" rx="3" ry="7"
            fill={color} opacity="0.4"
            transform={`rotate(${a} 9 9) translate(0 -6)`}/>
        ))}
        <circle cx="9" cy="9" r="4" fill={color} opacity="0.75"/>
      </g>
      {/* Berries */}
      {[[70,90,3,0.4],[80,105,2.5,0.35],[65,115,2,0.3],[90,80,2,0.3]].map(([x,y,r,o],i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={color} opacity={o}/>
      ))}
      {/* Twigs */}
      <path d="M45 15 Q60 25 55 40" stroke={color} strokeWidth="1" fill="none" opacity="0.35" strokeLinecap="round"/>
      <path d="M55 40 Q75 35 80 50" stroke={color} strokeWidth="1" fill="none" opacity="0.3" strokeLinecap="round"/>
      <path d="M80 50 Q100 45 105 65" stroke={color} strokeWidth="0.8" fill="none" opacity="0.25" strokeLinecap="round"/>
      {/* Leaf cluster */}
      <path d="M95 70 Q108 60 115 72 Q108 82 95 70Z" fill={color} opacity="0.3"/>
      <path d="M100 85 Q115 78 118 92 Q108 96 100 85Z" fill={color} opacity="0.25"/>
    </svg>
  )
}

// ─── CELESTIAL SILVER — Kristal & snowflake ───────────────────────────────────
function CelestialOrnamentSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Large snowflake */}
      <g transform="translate(20,15)">
        {[0,30,60,90,120,150].map((a,i) => (
          <g key={i} transform={`rotate(${a} 22 22)`}>
            <line x1="22" y1="22" x2="22" y2="4" stroke={color} strokeWidth="1.2" opacity="0.6"/>
            <line x1="18" y1="10" x2="22" y2="4" stroke={color} strokeWidth="0.8" opacity="0.5"/>
            <line x1="26" y1="10" x2="22" y2="4" stroke={color} strokeWidth="0.8" opacity="0.5"/>
          </g>
        ))}
        <circle cx="22" cy="22" r="3" fill={color} opacity="0.8"/>
      </g>
      {/* Crystal shards */}
      <path d="M75 10 L80 25 L85 10 L82 28 L88 15 L80 30 L72 15 L78 28 Z"
        fill={color} opacity="0.4"/>
      {/* Medium snowflake */}
      <g transform="translate(90,50)">
        <line x1="12" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1" opacity="0.5"/>
        <line x1="12" y1="12" x2="19.07" y2="19.07" stroke={color} strokeWidth="1" opacity="0.5"/>
        <line x1="12" y1="12" x2="12" y2="22" stroke={color} strokeWidth="1" opacity="0.5"/>
        <line x1="12" y1="12" x2="4.93" y2="19.07" stroke={color} strokeWidth="1" opacity="0.5"/>
        <line x1="12" y1="12" x2="2" y2="12" stroke={color} strokeWidth="1" opacity="0.5"/>
        <line x1="12" y1="12" x2="4.93" y2="4.93" stroke={color} strokeWidth="1" opacity="0.5"/>
        <line x1="12" y1="12" x2="12" y2="2" stroke={color} strokeWidth="1" opacity="0.5"/>
        <line x1="12" y1="12" x2="19.07" y2="4.93" stroke={color} strokeWidth="1" opacity="0.5"/>
        <circle cx="12" cy="12" r="2.5" fill={color} opacity="0.7"/>
      </g>
      {/* Small snowflakes */}
      <g transform="translate(15,80)">
        <line x1="4" y1="4" x2="12" y2="4" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="4" y1="4" x2="8" y2="10.93" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="4" y1="4" x2="-4" y2="10.93" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="4" y1="4" x2="-4" y2="4" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="4" y1="4" x2="0" y2="-2.93" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="4" y1="4" x2="8" y2="-2.93" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <circle cx="4" cy="4" r="1.5" fill={color} opacity="0.6"/>
      </g>
      <g transform="translate(40,110)">
        <line x1="3" y1="3" x2="9" y2="3" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="3" y1="3" x2="6" y2="8.2" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="3" y1="3" x2="-3" y2="8.2" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="3" y1="3" x2="-3" y2="3" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="3" y1="3" x2="0" y2="-2.2" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="3" y1="3" x2="6" y2="-2.2" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <circle cx="3" cy="3" r="1.5" fill={color} opacity="0.6"/>
      </g>
      <g transform="translate(70,130)">
        <line x1="3.5" y1="3.5" x2="10.5" y2="3.5" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="3.5" y1="3.5" x2="7" y2="9.56" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="3.5" y1="3.5" x2="-3.5" y2="9.56" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="3.5" y1="3.5" x2="-3.5" y2="3.5" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="3.5" y1="3.5" x2="0" y2="-2.56" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="3.5" y1="3.5" x2="7" y2="-2.56" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <circle cx="3.5" cy="3.5" r="1.5" fill={color} opacity="0.6"/>
      </g>
      <g transform="translate(110,90)">
        <line x1="3" y1="3" x2="9" y2="3" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="3" y1="3" x2="6" y2="8.2" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="3" y1="3" x2="-3" y2="8.2" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="3" y1="3" x2="-3" y2="3" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="3" y1="3" x2="0" y2="-2.2" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="3" y1="3" x2="6" y2="-2.2" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <circle cx="3" cy="3" r="1.5" fill={color} opacity="0.6"/>
      </g>
      <g transform="translate(120,25)">
        <line x1="2.5" y1="2.5" x2="7.5" y2="2.5" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="2.5" y1="2.5" x2="5" y2="6.83" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="2.5" y1="2.5" x2="-2.5" y2="6.83" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="2.5" y1="2.5" x2="-2.5" y2="2.5" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="2.5" y1="2.5" x2="0" y2="-1.83" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <line x1="2.5" y1="2.5" x2="5" y2="-1.83" stroke={color} strokeWidth="0.8" opacity="0.45"/>
        <circle cx="2.5" cy="2.5" r="1.5" fill={color} opacity="0.6"/>
      </g>
      {/* Diamond gems */}
      <path d="M30 55 L36 62 L30 69 L24 62 Z" fill={color} opacity="0.35"/>
      <path d="M55 85 L60 91 L55 97 L50 91 Z" fill={color} opacity="0.3"/>
      <path d="M100 115 L104 120 L100 125 L96 120 Z" fill={color} opacity="0.3"/>
      {/* Geometric lines */}
      <path d="M5 45 L20 50 L5 55" stroke={color} strokeWidth="0.8" fill="none" opacity="0.3"/>
      <path d="M5 100 L18 105 L5 110" stroke={color} strokeWidth="0.8" fill="none" opacity="0.25"/>
      {/* Dots */}
      {[[45,35,1.5,0.3],[65,60,1,0.25],[85,85,1.5,0.25],[110,130,1,0.2]].map(([x,y,r,o],i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={color} opacity={o}/>
      ))}
    </svg>
  )
}

// ─── BALI TROPICAL — Kamboja & daun tropis ────────────────────────────────────
function BaliOrnamentSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Plumeria/kamboja */}
      <g transform="translate(8,8)">
        {[0,72,144,216,288].map((a,i) => (
          <ellipse key={i} cx="24" cy="24" rx="7" ry="14"
            fill={color} opacity="0.5"
            transform={`rotate(${a} 24 24) translate(0 -12)`}/>
        ))}
        <circle cx="24" cy="24" r="7" fill={color} opacity="0.85"/>
        <circle cx="24" cy="24" r="3" fill={color} opacity="1"/>
      </g>
      {/* Tropical leaves */}
      <path d="M40 40 Q70 20 90 45 Q70 55 40 40Z" fill={color} opacity="0.35"/>
      <path d="M35 55 Q20 80 40 95 Q50 75 35 55Z" fill={color} opacity="0.35"/>
      <path d="M55 70 Q85 55 100 80 Q80 88 55 70Z" fill={color} opacity="0.3"/>
      {/* Palm leaf veins */}
      <path d="M40 40 L90 45" stroke={color} strokeWidth="0.8" opacity="0.25"/>
      <path d="M35 55 L40 95" stroke={color} strokeWidth="0.8" opacity="0.25"/>
      {/* Small plumeria */}
      <g transform="translate(88,25)">
        {[0,72,144,216,288].map((a,i) => (
          <ellipse key={i} cx="11" cy="11" rx="4" ry="8"
            fill={color} opacity="0.45"
            transform={`rotate(${a} 11 11) translate(0 -7)`}/>
        ))}
        <circle cx="11" cy="11" r="4" fill={color} opacity="0.8"/>
      </g>
      {/* Hibiscus bud */}
      <g transform="translate(20,90)">
        {[0,60,120,180,240,300].map((a,i) => (
          <ellipse key={i} cx="10" cy="10" rx="3.5" ry="8"
            fill={color} opacity="0.4"
            transform={`rotate(${a} 10 10) translate(0 -6)`}/>
        ))}
        <circle cx="10" cy="10" r="4" fill={color} opacity="0.75"/>
      </g>
      {/* Vine */}
      <path d="M40 40 Q55 65 45 90 Q38 110 50 130" stroke={color} strokeWidth="1.2" fill="none" opacity="0.35" strokeLinecap="round"/>
      <path d="M90 45 Q110 60 105 85 Q100 105 115 120" stroke={color} strokeWidth="1" fill="none" opacity="0.3" strokeLinecap="round"/>
      {/* Dots */}
      {[[70,100,2,0.3],[85,115,1.5,0.25],[100,130,1.5,0.2]].map(([x,y,r,o],i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={color} opacity={o}/>
      ))}
    </svg>
  )
}

// ─── MINIMALIST IVORY — Art deco ──────────────────────────────────────────────
function IvoryOrnamentSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Art deco fan — pre-computed values */}
      <path d="M20 20 L20 -35" stroke={color} strokeWidth="0.8" opacity="0.25"/>
      <path d="M20 20 L34.3 -31.3" stroke={color} strokeWidth="0.8" opacity="0.27"/>
      <path d="M20 20 L54.3 -15.3" stroke={color} strokeWidth="1.2" opacity="0.29"/>
      <path d="M20 20 L75 20" stroke={color} strokeWidth="1.2" opacity="0.31"/>
      <path d="M20 20 L74.3 55.3" stroke={color} strokeWidth="0.8" opacity="0.33"/>
      <path d="M20 20 L54.3 55.3" stroke={color} strokeWidth="0.8" opacity="0.35"/>
      {/* Arc lines */}
      <path d="M20 20 Q55 20 75 55" stroke={color} strokeWidth="0.8" fill="none" opacity="0.3"/>
      <path d="M20 20 Q45 45 45 80" stroke={color} strokeWidth="0.8" fill="none" opacity="0.25"/>
      {/* Diamond grid */}
      <path d="M60 15 L70 25 L60 35 L50 25 Z" stroke={color} strokeWidth="0.8" fill="none" opacity="0.3"/>
      <path d="M80 30 L88 38 L80 46 L72 38 Z" stroke={color} strokeWidth="0.7" fill="none" opacity="0.25"/>
      {/* Thin elegant lines */}
      <line x1="5" y1="55" x2="45" y2="55" stroke={color} strokeWidth="0.8" opacity="0.3"/>
      <line x1="5" y1="58" x2="35" y2="58" stroke={color} strokeWidth="0.5" opacity="0.2"/>
      <line x1="55" y1="5" x2="55" y2="45" stroke={color} strokeWidth="0.8" opacity="0.3"/>
      <line x1="58" y1="5" x2="58" y2="35" stroke={color} strokeWidth="0.5" opacity="0.2"/>
      {/* Corner bracket */}
      <path d="M5 5 L5 30 M5 5 L30 5" stroke={color} strokeWidth="1.2" opacity="0.4" strokeLinecap="round"/>
      <path d="M10 10 L10 25 M10 10 L25 10" stroke={color} strokeWidth="0.6" opacity="0.25" strokeLinecap="round"/>
      {/* Dots pattern */}
      {[[70,70,1.5,0.25],[85,85,1,0.2],[100,100,1.5,0.2],[115,115,1,0.15],[80,110,1.5,0.2],[110,80,1,0.18]].map(([x,y,r,o],i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={color} opacity={o}/>
      ))}
      {/* Thin botanical line */}
      <path d="M40 70 Q60 55 80 70 Q100 85 120 70" stroke={color} strokeWidth="0.7" fill="none" opacity="0.2"/>
    </svg>
  )
}

// ─── EXPORTS ──────────────────────────────────────────────────────────────────
export function RoseCorner(props: { position: 'tl'|'tr'|'bl'|'br'; color: string; size?: number; opacity?: number }) {
  return <Corner {...props}><RoseOrnamentSVG color={props.color}/></Corner>
}
export function MoonStarCorner(props: { position: 'tl'|'tr'|'bl'|'br'; color: string; size?: number; opacity?: number }) {
  return <Corner {...props}><MoonStarOrnamentSVG color={props.color}/></Corner>
}
export function RoyalCorner(props: { position: 'tl'|'tr'|'bl'|'br'; color: string; size?: number; opacity?: number }) {
  return <Corner {...props}><RoyalOrnamentSVG color={props.color}/></Corner>
}
export function RusticCorner(props: { position: 'tl'|'tr'|'bl'|'br'; color: string; size?: number; opacity?: number }) {
  return <Corner {...props}><RusticOrnamentSVG color={props.color}/></Corner>
}
export function CelestialCorner(props: { position: 'tl'|'tr'|'bl'|'br'; color: string; size?: number; opacity?: number }) {
  return <Corner {...props}><CelestialOrnamentSVG color={props.color}/></Corner>
}
export function BaliCorner(props: { position: 'tl'|'tr'|'bl'|'br'; color: string; size?: number; opacity?: number }) {
  return <Corner {...props}><BaliOrnamentSVG color={props.color}/></Corner>
}
export function IvoryCorner(props: { position: 'tl'|'tr'|'bl'|'br'; color: string; size?: number; opacity?: number }) {
  return <Corner {...props}><IvoryOrnamentSVG color={props.color}/></Corner>
}
