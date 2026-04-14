'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { GuestbookEntry } from '@/lib/types'

interface Invitation {
  id: string
  slug: string
  groom_name: string | null
  bride_name: string | null
}

interface Props {
  invitation: Invitation
  entries: GuestbookEntry[]
}

const statusLabel: Record<string, { label: string; color: string }> = {
  hadir:        { label: '✅ Hadir',        color: '#4ade80' },
  tidak_hadir:  { label: '❌ Tidak Hadir',  color: '#f87171' },
  mungkin:      { label: '❓ Mungkin',      color: '#facc15' },
}

export default function RSVPClient({ invitation, entries }: Props) {
  const hadir       = entries.filter(e => e.attendance_status === 'hadir').length
  const tidakHadir  = entries.filter(e => e.attendance_status === 'tidak_hadir').length
  const mungkin     = entries.filter(e => e.attendance_status === 'mungkin').length

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard" className="text-xs text-gray-500 hover:text-gray-300 transition-colors mb-3 inline-block">
          ← Kembali ke Dashboard
        </Link>
        <p className="text-sm tracking-widest uppercase mb-1" style={{ color: 'var(--gold)' }}>Ucapan & RSVP</p>
        <h1 className="font-serif-elegant text-3xl" style={{ color: 'var(--cream)' }}>
          {invitation.groom_name} &amp; {invitation.bride_name}
        </h1>
      </div>

      {/* Stats */}
      <div className="glass rounded-2xl p-5 mb-6">
        <p className="text-xs text-gray-400 mb-3 tracking-widest uppercase">Rekap Kehadiran</p>
        <div className="grid grid-cols-4 gap-3 text-center">
          <div>
            <p className="text-2xl font-serif-elegant" style={{ color: 'var(--gold)' }}>{entries.length}</p>
            <p className="text-xs text-gray-500 mt-1">Total</p>
          </div>
          <div>
            <p className="text-2xl font-serif-elegant text-green-400">{hadir}</p>
            <p className="text-xs text-gray-500 mt-1">Hadir</p>
          </div>
          <div>
            <p className="text-2xl font-serif-elegant text-red-400">{tidakHadir}</p>
            <p className="text-xs text-gray-500 mt-1">Tidak Hadir</p>
          </div>
          <div>
            <p className="text-2xl font-serif-elegant text-yellow-400">{mungkin}</p>
            <p className="text-xs text-gray-500 mt-1">Mungkin</p>
          </div>
        </div>
      </div>

      {/* Entries */}
      {entries.length === 0 ? (
        <div className="glass rounded-2xl p-10 text-center opacity-50">
          <p className="font-script text-3xl mb-2" style={{ color: 'var(--gold)' }}>Belum ada ucapan</p>
          <p className="text-sm text-gray-400">Ucapan dari tamu akan muncul di sini</p>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((entry, i) => {
            const status = statusLabel[entry.attendance_status] || { label: entry.attendance_status, color: '#9ca3af' }
            return (
              <motion.div key={entry.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="glass rounded-2xl p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="font-medium text-sm" style={{ color: 'var(--cream)' }}>{entry.guest_name}</p>
                  <span className="text-xs flex-shrink-0" style={{ color: status.color }}>{status.label}</span>
                </div>
                {entry.message && (
                  <p className="text-sm text-gray-400 italic">"{entry.message}"</p>
                )}
                <p className="text-xs text-gray-600 mt-2">
                  {new Date(entry.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
