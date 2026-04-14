'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Invitation } from '@/lib/types'
import { formatDate } from '@/lib/utils'

function useCountdown(eventDate: string | null) {
  const [days, setDays] = useState<number | null>(null)
  useEffect(() => {
    if (!eventDate) return
    const calc = () => {
      const diff = new Date(eventDate).getTime() - Date.now()
      setDays(diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0)
    }
    calc()
    const t = setInterval(calc, 60_000)
    return () => clearInterval(t)
  }, [eventDate])
  return days
}

export default function DashboardInvitationCard({ invitation }: { invitation: Invitation & { guestbook?: { attendance_status: string }[] } }) {
  const appUrl = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000')
  const shareUrl = `${appUrl}/v/${invitation.slug}`
  const [copied, setCopied] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const router = useRouter()
  const daysLeft = useCountdown(invitation.event_date)

  const hadirCount = invitation.guestbook?.filter(g => g.attendance_status === 'hadir').length || 0
  const totalRsvp = invitation.guestbook?.length || 0

  function copyLink() {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  async function handleDelete() {
    if (!confirmDelete) { setConfirmDelete(true); return }
    setDeleting(true)
    const supabase = createClient()
    await supabase.from('invitations').delete().eq('id', invitation.id)
    router.refresh()
  }

  async function exportCSV() {
    const supabase = createClient()
    const { data: guestbook } = await supabase
      .from('guestbook')
      .select('*')
      .eq('invitation_id', invitation.id)
      .order('created_at', { ascending: false })

    if (!guestbook?.length) return alert('Belum ada data RSVP')

    const header = 'Nama,Pesan,Kehadiran,Waktu'
    const rows = guestbook.map(g =>
      `"${g.guest_name}","${(g.message || '').replace(/"/g, '""')}","${g.attendance_status}","${new Date(g.created_at).toLocaleString('id-ID')}"`
    )
    const csv = [header, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `rsvp-${invitation.slug}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl overflow-hidden hover:scale-[1.01] transition-transform">
      {/* Preview thumbnail */}
      <div className="h-36 flex items-center justify-center relative"
        style={{ background: 'linear-gradient(135deg, #1B4332, #0D1B2A)' }}>
        <div className="text-center">
          <p className="font-script text-2xl" style={{ color: 'var(--gold)' }}>
            {invitation.groom_name || 'Mempelai Pria'}
          </p>
          <p className="text-xs text-gray-400 my-1">&amp;</p>
          <p className="font-script text-2xl" style={{ color: 'var(--gold)' }}>
            {invitation.bride_name || 'Mempelai Wanita'}
          </p>
        </div>
        <span className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full ${invitation.is_published ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
          {invitation.is_published ? 'Publik' : 'Draft'}
        </span>
        <button onClick={handleDelete} disabled={deleting}
          className="absolute top-3 left-3 text-xs px-2 py-1 rounded-full transition-all"
          style={{ background: confirmDelete ? 'rgba(239,68,68,0.3)' : 'rgba(0,0,0,0.3)', color: confirmDelete ? '#f87171' : '#6b7280' }}>
          {deleting ? '...' : confirmDelete ? 'Yakin?' : '✕'}
        </button>
        {daysLeft !== null && daysLeft > 0 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs"
            style={{ background: 'rgba(0,0,0,0.5)', color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.3)' }}>
            ⏳ {daysLeft} hari lagi
          </div>
        )}
        {daysLeft === 0 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs"
            style={{ background: 'rgba(0,0,0,0.5)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.3)' }}>
            🎉 Hari H!
          </div>
        )}
      </div>

      <div className="p-4">
        {invitation.event_date && (
          <p className="text-xs text-gray-400 mb-3">{formatDate(invitation.event_date)}</p>
        )}
        {totalRsvp > 0 && (
          <p className="text-xs mb-3" style={{ color: 'var(--gold)' }}>
            {hadirCount} hadir · {totalRsvp} total RSVP
          </p>
        )}
        <div className="flex gap-2">
          <Link href={`/dashboard/editor/${invitation.id}`}
            className="flex-1 py-2 rounded-lg text-xs text-center font-medium transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: '#0D1B2A' }}>
            Edit
          </Link>
          {invitation.is_published && (
            <Link href={`/v/${invitation.slug}`} target="_blank"
              className="flex-1 py-2 rounded-lg text-xs text-center font-medium border transition-all hover:bg-white/5"
              style={{ borderColor: 'rgba(201,168,76,0.3)', color: 'var(--gold)' }}>
              Lihat
            </Link>
          )}
        </div>
        {invitation.is_published && (
          <Link href={`/dashboard/guests/${invitation.id}`}
            className="block w-full mt-2 py-2 rounded-lg text-xs text-center font-medium border transition-all hover:bg-white/5"
            style={{ borderColor: 'rgba(37,211,102,0.3)', color: '#4ade80' }}>
            📋 Kelola Tamu &amp; Kirim Link
          </Link>
        )}
        {totalRsvp > 0 && (
          <button onClick={exportCSV}
            className="block w-full mt-2 py-2 rounded-lg text-xs text-center font-medium border transition-all hover:bg-white/5"
            style={{ borderColor: 'rgba(129,140,248,0.3)', color: '#818cf8' }}>
            ⬇ Export RSVP (.csv)
          </button>
        )}
        {invitation.is_published && (
          <div className="mt-2 flex items-center gap-2">
            <p className="text-xs text-gray-500 truncate flex-1">{shareUrl}</p>
            <button onClick={copyLink}
              className="text-xs px-2 py-1 rounded-lg transition-all hover:opacity-80 whitespace-nowrap"
              style={{ background: copied ? 'rgba(74,222,128,0.15)' : 'rgba(201,168,76,0.15)', color: copied ? '#4ade80' : 'var(--gold)' }}>
              {copied ? '✓ Disalin' : 'Salin'}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
