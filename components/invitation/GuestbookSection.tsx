'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { GuestbookEntry } from '@/lib/types'

interface Props {
  invitationId: string
  entries: GuestbookEntry[]
  templateId: string
}

const themeColors: Record<string, { accent: string; bg: string }> = {
  luxury: { accent: '#C9A84C', bg: 'rgba(201,168,76,0.1)' },
  floral: { accent: '#f9a8d4', bg: 'rgba(249,168,212,0.1)' },
  midnight: { accent: '#818cf8', bg: 'rgba(129,140,248,0.1)' },
}

export default function GuestbookSection({ invitationId, entries, templateId }: Props) {
  const theme = themeColors[templateId] || themeColors.luxury
  const [list, setList] = useState<GuestbookEntry[]>(entries)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir' | 'mungkin'>('hadir')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase.from('guestbook').insert({
      invitation_id: invitationId,
      guest_name: name,
      message,
      attendance_status: attendance,
    }).select().single()
    if (data) {
      setList(prev => [data, ...prev])
      setName('')
      setMessage('')
      setSent(true)
    }
    setLoading(false)
  }

  const inputClass = "w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-colors"
  const inputStyle = { background: 'rgba(255,255,255,0.05)', border: `1px solid ${theme.accent}30`, color: 'white' }

  return (
    <div className="px-6 py-8" style={{ background: 'rgba(0,0,0,0.3)' }}>
      <p className="text-xs tracking-widest uppercase mb-2 text-center" style={{ color: theme.accent }}>Buku Tamu</p>
      <h2 className="text-center mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: 'white' }}>
        Ucapan & Kehadiran
      </h2>

      {sent ? (
        <div className="text-center py-4 mb-6 rounded-xl" style={{ background: theme.bg }}>
          <p className="text-sm" style={{ color: theme.accent }}>Terima kasih atas ucapannya! 🙏</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 mb-8">
          <input value={name} onChange={e => setName(e.target.value)} required
            className={inputClass} style={inputStyle} placeholder="Nama Anda" />
          <textarea value={message} onChange={e => setMessage(e.target.value)} rows={3}
            className={inputClass} style={inputStyle} placeholder="Ucapan & doa untuk mempelai..." />

          {/* Konfirmasi kehadiran — tombol pilihan, bukan dropdown */}
          <div>
            <p className="text-xs text-gray-400 mb-2">Konfirmasi Kehadiran</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { val: 'hadir', label: '✓ Hadir' },
                { val: 'tidak_hadir', label: '✗ Tidak Hadir' },
                { val: 'mungkin', label: '? Mungkin' },
              ].map(opt => (
                <button key={opt.val} type="button"
                  onClick={() => setAttendance(opt.val as typeof attendance)}
                  className="py-2 rounded-xl text-xs font-medium transition-all"
                  style={{
                    background: attendance === opt.val ? `${theme.accent}25` : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${attendance === opt.val ? theme.accent : theme.accent + '20'}`,
                    color: attendance === opt.val ? theme.accent : 'rgba(255,255,255,0.5)',
                  }}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-2.5 rounded-full text-sm font-medium transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}cc)`, color: '#0D1B2A' }}>
            {loading ? 'Mengirim...' : 'Kirim Ucapan'}
          </button>
        </form>
      )}

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {list.map(entry => (
          <div key={entry.id} className="rounded-xl p-3" style={{ background: theme.bg }}>
            <div className="flex justify-between items-start mb-1">
              <p className="text-sm font-medium" style={{ color: theme.accent }}>{entry.guest_name}</p>
              <span className="text-xs text-gray-500">
                {entry.attendance_status === 'hadir' ? '✓ Hadir' : entry.attendance_status === 'tidak_hadir' ? '✗ Tidak' : '? Mungkin'}
              </span>
            </div>
            {entry.message && <p className="text-xs text-gray-300">{entry.message}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
