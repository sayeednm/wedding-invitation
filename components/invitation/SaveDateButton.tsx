'use client'

import type { Invitation } from '@/lib/types'

interface Props {
  invitation: Invitation
  accentColor: string
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function toICSDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`
}

function toICSDateEnd(dateStr: string) {
  const d = new Date(dateStr)
  d.setHours(d.getHours() + 2)
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`
}

export default function SaveDateButton({ invitation, accentColor }: Props) {
  const { groom_name, bride_name, akad_date, akad_location, event_date, location_name } = invitation

  if (!akad_date && !event_date) return null

  function handleSave() {
    const title = `Pernikahan ${groom_name || ''} & ${bride_name || ''}`
    const events: string[] = []

    if (akad_date) {
      events.push([
        'BEGIN:VEVENT',
        `SUMMARY:Akad Nikah - ${title}`,
        `DTSTART:${toICSDate(akad_date)}`,
        `DTEND:${toICSDateEnd(akad_date)}`,
        `LOCATION:${akad_location || ''}`,
        `DESCRIPTION:Akad Nikah ${title}`,
        'END:VEVENT',
      ].join('\r\n'))
    }

    if (event_date) {
      events.push([
        'BEGIN:VEVENT',
        `SUMMARY:Resepsi - ${title}`,
        `DTSTART:${toICSDate(event_date)}`,
        `DTEND:${toICSDateEnd(event_date)}`,
        `LOCATION:${location_name || ''}`,
        `DESCRIPTION:Resepsi Pernikahan ${title}`,
        'END:VEVENT',
      ].join('\r\n'))
    }

    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'CALSCALE:GREGORIAN',
      ...events,
      'END:VCALENDAR',
    ].join('\r\n')

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `undangan-${groom_name || 'wedding'}-${bride_name || ''}.ics`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleSave}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium transition-all hover:opacity-80 active:scale-95"
      style={{ background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}30` }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
      Simpan Tanggal
    </button>
  )
}
