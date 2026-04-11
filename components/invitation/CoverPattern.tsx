'use client'

import { motion } from 'framer-motion'

// Pattern dekoratif elegan sebagai background cover
// Setiap tema punya pattern berbeda

interface Props {
  color: string
  pattern: 'floral' | 'geometric' | 'mandala' | 'vine'
}

function FloralPattern({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 600" preserveAspectRatio="xMidYMid slice" fill="none">
      {/* Sudut kiri atas */}
      <g opacity="0.18" suppressHydrationWarning>
        <circle cx="0" cy="0" r="80" stroke={color} strokeWidth="0.8"/>
        <circle cx="0" cy="0" r="55" stroke={color} strokeWidth="0.6"/>
        {[0,45,90,135,180,225,270,315].map((a,i) => (
          <ellipse key={i} cx={40*Math.cos(a*Math.PI/180)} cy={40*Math.sin(a*Math.PI/180)}
            rx="12" ry="20" fill={color} opacity="0.4"
            transform={`rotate(${a} ${40*Math.cos(a*Math.PI/180)} ${40*Math.sin(a*Math.PI/180)})`}/>
        ))}
        <circle cx="0" cy="0" r="12" fill={color} opacity="0.5"/>
      </g>
      {/* Sudut kanan atas */}
      <g transform="translate(320,0)" opacity="0.18" suppressHydrationWarning>
        <circle cx="0" cy="0" r="80" stroke={color} strokeWidth="0.8"/>
        <circle cx="0" cy="0" r="55" stroke={color} strokeWidth="0.6"/>
        {[0,45,90,135,180,225,270,315].map((a,i) => (
          <ellipse key={i} cx={40*Math.cos(a*Math.PI/180)} cy={40*Math.sin(a*Math.PI/180)}
            rx="12" ry="20" fill={color} opacity="0.4"
            transform={`rotate(${a} ${40*Math.cos(a*Math.PI/180)} ${40*Math.sin(a*Math.PI/180)})`}/>
        ))}
        <circle cx="0" cy="0" r="12" fill={color} opacity="0.5"/>
      </g>
      {/* Sudut kiri bawah */}
      <g transform="translate(0,600)" opacity="0.18" suppressHydrationWarning>
        <circle cx="0" cy="0" r="80" stroke={color} strokeWidth="0.8"/>
        {[0,45,90,135,180,225,270,315].map((a,i) => (
          <ellipse key={i} cx={40*Math.cos(a*Math.PI/180)} cy={40*Math.sin(a*Math.PI/180)}
            rx="12" ry="20" fill={color} opacity="0.4"
            transform={`rotate(${a} ${40*Math.cos(a*Math.PI/180)} ${40*Math.sin(a*Math.PI/180)})`}/>
        ))}
        <circle cx="0" cy="0" r="12" fill={color} opacity="0.5"/>
      </g>
      {/* Sudut kanan bawah */}
      <g transform="translate(320,600)" opacity="0.18" suppressHydrationWarning>
        <circle cx="0" cy="0" r="80" stroke={color} strokeWidth="0.8"/>
        {[0,45,90,135,180,225,270,315].map((a,i) => (
          <ellipse key={i} cx={40*Math.cos(a*Math.PI/180)} cy={40*Math.sin(a*Math.PI/180)}
            rx="12" ry="20" fill={color} opacity="0.4"
            transform={`rotate(${a} ${40*Math.cos(a*Math.PI/180)} ${40*Math.sin(a*Math.PI/180)})`}/>
        ))}
        <circle cx="0" cy="0" r="12" fill={color} opacity="0.5"/>
      </g>
      {/* Garis border elegan */}
      <rect x="12" y="12" width="296" height="576" stroke={color} strokeWidth="0.6" opacity="0.12" rx="2"/>
      <rect x="20" y="20" width="280" height="560" stroke={color} strokeWidth="0.4" opacity="0.08" rx="2"/>
      {/* Ornamen tengah kecil */}
      <g transform="translate(160,300)" opacity="0.08">
        {[0,45,90,135,180,225,270,315].map((a,i) => (
          <ellipse key={i} cx={25*Math.cos(a*Math.PI/180)} cy={25*Math.sin(a*Math.PI/180)}
            rx="6" ry="12" fill={color} opacity="0.5"
            transform={`rotate(${a} ${25*Math.cos(a*Math.PI/180)} ${25*Math.sin(a*Math.PI/180)})`}/>
        ))}
        <circle cx="0" cy="0" r="7" fill={color} opacity="0.6"/>
      </g>
    </svg>
  )
}

function GeometricPattern({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 600" preserveAspectRatio="xMidYMid slice" fill="none">
      {/* Art deco geometric */}
      <rect x="8" y="8" width="304" height="584" stroke={color} strokeWidth="1" opacity="0.15" rx="1"/>
      <rect x="18" y="18" width="284" height="564" stroke={color} strokeWidth="0.5" opacity="0.1" rx="1"/>
      {/* Fan corners */}
      {[['0,0','0'], ['320,0','90'], ['0,600','-90'], ['320,600','180']].map(([pos, rot], i) => {
        const [x, y] = pos.split(',').map(Number)
        return (
          <g key={i} transform={`translate(${x},${y}) rotate(${rot})`} opacity="0.2">
            {[30,50,70,90,110].map((r, j) => (
              <path key={j} d={`M0 0 L${r} 0 A${r} ${r} 0 0 1 0 ${r} Z`}
                stroke={color} strokeWidth="0.7" fill="none" opacity={0.8 - j*0.12}/>
            ))}
            {[0,15,30,45,60,75,90].map((a, j) => (
              <line key={j} x1="0" y1="0" x2={110*Math.cos(a*Math.PI/180)} y2={110*Math.sin(a*Math.PI/180)}
                stroke={color} strokeWidth="0.5" opacity="0.4"/>
            ))}
          </g>
        )
      })}
      {/* Center diamond */}
      <path d="M160 270 L175 285 L160 300 L145 285 Z" stroke={color} strokeWidth="0.8" opacity="0.12"/>
      <path d="M160 260 L185 285 L160 310 L135 285 Z" stroke={color} strokeWidth="0.5" opacity="0.08"/>
    </svg>
  )
}

function VinePattern({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 600" preserveAspectRatio="xMidYMid slice" fill="none">
      {/* Vine border kiri */}
      <path d="M25 0 Q20 50 28 100 Q15 150 25 200 Q18 250 26 300 Q16 350 24 400 Q18 450 25 500 Q20 550 25 600"
        stroke={color} strokeWidth="1.2" opacity="0.2" strokeLinecap="round"/>
      {/* Daun-daun di vine kiri */}
      {[60,130,200,270,340,410,480].map((y, i) => (
        <g key={i} transform={`translate(25,${y})`} opacity="0.18">
          <path d={i%2===0 ? "M0 0 Q-18 -8 -22 -20 Q-10 -18 0 0Z" : "M0 0 Q18 -8 22 -20 Q10 -18 0 0Z"}
            fill={color}/>
          <path d={i%2===0 ? "M0 0 Q-14 5 -18 15 Q-8 12 0 0Z" : "M0 0 Q14 5 18 15 Q8 12 0 0Z"}
            fill={color} opacity="0.7"/>
        </g>
      ))}
      {/* Vine border kanan */}
      <path d="M295 0 Q300 50 292 100 Q305 150 295 200 Q302 250 294 300 Q304 350 296 400 Q302 450 295 500 Q300 550 295 600"
        stroke={color} strokeWidth="1.2" opacity="0.2" strokeLinecap="round"/>
      {[60,130,200,270,340,410,480].map((y, i) => (
        <g key={i} transform={`translate(295,${y})`} opacity="0.18">
          <path d={i%2===0 ? "M0 0 Q18 -8 22 -20 Q10 -18 0 0Z" : "M0 0 Q-18 -8 -22 -20 Q-10 -18 0 0Z"}
            fill={color}/>
          <path d={i%2===0 ? "M0 0 Q14 5 18 15 Q8 12 0 0Z" : "M0 0 Q-14 5 -18 15 Q-8 12 0 0Z"}
            fill={color} opacity="0.7"/>
        </g>
      ))}
      {/* Top & bottom horizontal vine */}
      <path d="M0 30 Q80 22 160 28 Q240 22 320 30" stroke={color} strokeWidth="1" opacity="0.15" strokeLinecap="round"/>
      <path d="M0 570 Q80 578 160 572 Q240 578 320 570" stroke={color} strokeWidth="1" opacity="0.15" strokeLinecap="round"/>
    </svg>
  )
}

function MandalaPattern({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 600" preserveAspectRatio="xMidYMid slice" fill="none">
      {/* Mandala di sudut */}
      {[[0,0], [320,0], [0,600], [320,600]].map(([cx, cy], i) => (
        <g key={i} transform={`translate(${cx},${cy})`} opacity="0.18">
          {[20,35,50,65].map((r, j) => (
            <circle key={j} cx="0" cy="0" r={r} stroke={color} strokeWidth="0.6" opacity={0.8-j*0.15}/>
          ))}
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((a, j) => (
            <g key={j} transform={`rotate(${a})`}>
              <ellipse cx="0" cy="-42" rx="4" ry="10" fill={color} opacity="0.35"/>
              <ellipse cx="0" cy="-28" rx="3" ry="7" fill={color} opacity="0.45"/>
            </g>
          ))}
          <circle cx="0" cy="0" r="8" fill={color} opacity="0.5"/>
        </g>
      ))}
      {/* Border tipis */}
      <rect x="10" y="10" width="300" height="580" stroke={color} strokeWidth="0.7" opacity="0.12" rx="2"/>
    </svg>
  )
}

export default function CoverPattern({ color, pattern }: Props) {
  switch (pattern) {
    case 'geometric': return <GeometricPattern color={color}/>
    case 'mandala':   return <MandalaPattern color={color}/>
    case 'vine':      return <VinePattern color={color}/>
    default:          return <FloralPattern color={color}/>
  }
}
