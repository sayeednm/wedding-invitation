'use client'

import type { Invitation } from '@/lib/types'

interface Props {
  invitation: Invitation
  accentColor: string
}

function toGCalDate(dateStr: string) {
  const d = new Date(dateStr)
  const pad = (n: number) => String(n).padStart(2, '0')
  const start = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`
  const end = new Date(d.getTime() + 2 * 60 * 60 * 1000)
  const endStr = `${end.getFullYear()}${pad(end.getMonth() + 1)}${pad(end.getDate())}T${pad(end.getHours())}${pad(end.getMinutes())}00`
  return `${start}/${endStr}`
}

function openGCal(title: string, dateStr: string, location: string | null, description: string) {
  const url = new URL('https://calendar.google.com/calendar/render')
  url.searchParams.set('action', 'TEMPLATE')
  url.searchParams.set('text', title)
  url.searchParams.set('dates', toGCalDate(dateStr))
  url.searchParams.set('details', description)
  if (location) url.searchParams.set('location', location)
  window.open(url.toString(), '_blank')
}

export default function SaveDateButton({ invitation, accentColor }: Props) {
  const { groom_name, bride_name, akad_date, akad_location, event_date, location_name } = invitation
  const couple = `${groom_name || ''} & ${bride_name || ''}`

  if (!akad_date && !event_date) return null

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {akad_date && (
        <button
          onClick={() => openGCal(`Akad Nikah — ${couple}`, akad_date, akad_location, `Akad Nikah ${couple}`)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all hover:opacity-80 active:scale-95"
          style={{ background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}30` }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Simpan Akad
        </button>
      )}
      {event_date && (
        <button
          onClick={() => openGCal(`Resepsi — ${couple}`, event_date, location_name, `Resepsi Pernikahan ${couple}`)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all hover:opacity-80 active:scale-95"
          style={{ background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}30` }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Simpan Resepsi
        </button>
      )}
    </div>
  )
}
