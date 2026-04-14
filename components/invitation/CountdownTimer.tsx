'use client'

import { useState, useEffect } from 'react'

interface Props {
  eventDate: string
  accentColor: string
}

export default function CountdownTimer({ eventDate, accentColor }: Props) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [passed, setPassed] = useState(false)

  useEffect(() => {
    function calc() {
      const diff = new Date(eventDate).getTime() - Date.now()
      if (diff <= 0) { setPassed(true); return }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [eventDate])

  if (passed) return (
    <p className="text-center text-sm py-4" style={{ color: accentColor, fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
      Semoga menjadi keluarga yang sakinah, mawaddah, warahmah 🤍
    </p>
  )

  const units = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ]

  return (
    <div className="px-6 py-6">
      <p className="text-xs tracking-widest uppercase mb-4 text-center" style={{ color: accentColor }}>Menuju Hari Bahagia</p>
      <div className="grid grid-cols-4 gap-2">
        {units.map(u => (
          <div key={u.label} className="text-center rounded-xl py-3"
            style={{ background: `${accentColor}12`, border: `1px solid ${accentColor}30` }}>
            <p className="text-2xl font-bold tabular-nums" style={{ color: accentColor, fontFamily: 'Cormorant Garamond, serif' }}>
              {String(u.value).padStart(2, '0')}
            </p>
            <p className="text-xs text-gray-400 mt-1">{u.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
