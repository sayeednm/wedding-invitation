'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
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

const PAGE_SIZE = 20

const statusLabel: Record<string, { label: string; color: string }> = {
  hadir:        { label: '✅ Hadir',        color: '#4ade80' },
  tidak_hadir:  { label: '❌ Tidak Hadir',  color: '#f87171' },
  mungkin:      { label: '❓ Mungkin',      color: '#facc15' },
}

export default function RSVPClient({ invitation, entries }: Props) {
  const hadir       = entries.filter(e => e.attendance_status === 'hadir').length
  const tidakHadir  = entries.filter(e => e.attendance_status === 'tidak_hadir').length
  const mungkin     = entries.filter(e => e.attendance_status === 'mungkin').length
  const [filter, setFilter] = useState<'all' | 'hadir' | 'tidak_hadir' | 'mungkin'>('all')
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const filtered = entries.filter(e => {
    const matchFilter = filter === 'all' || e.attendance_status === filter
    const matchSearch = !search || e.guest_name.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function exportCSV() {
    if (!entries.length) return
    const header = 'Nama,Pesan,Kehadiran,Waktu'
    const rows = entries.map(g =>
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
        <div className="grid grid-cols-4 gap-3 text-center mb-4">
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
        {/* Visual bar */}
        {entries.length > 0 && (
          <div className="flex rounded-full overflow-hidden h-2 gap-0.5">
            {hadir > 0 && <div className="bg-green-400 transition-all" style={{ width: `${(hadir/entries.length)*100}%` }} />}
            {tidakHadir > 0 && <div className="bg-red-400 transition-all" style={{ width: `${(tidakHadir/entries.length)*100}%` }} />}
            {mungkin > 0 && <div className="bg-yellow-400 transition-all" style={{ width: `${(mungkin/entries.length)*100}%` }} />}
          </div>
        )}
      </div>

      {/* Filter & Search */}
      {entries.length > 0 && (
        <div className="glass rounded-2xl p-4 mb-4 flex flex-col gap-2">
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Cari nama tamu..."
            className="w-full px-3 py-1.5 rounded-lg bg-white/5 border text-sm text-white placeholder-gray-500 focus:outline-none"
            style={{ borderColor: 'rgba(201,168,76,0.2)' }}
          />
          <div className="flex flex-wrap gap-2 items-center">
            {(['all', 'hadir', 'tidak_hadir', 'mungkin'] as const).map(f => (
              <button key={f} onClick={() => { setFilter(f); setPage(1) }}
                className="px-3 py-1.5 rounded-lg text-xs transition-all"
                style={{
                  background: filter === f ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.05)',
                  color: filter === f ? 'var(--gold)' : '#9ca3af',
                  border: `1px solid ${filter === f ? 'rgba(201,168,76,0.4)' : 'transparent'}`,
                }}>
                {f === 'all' ? 'Semua' : f === 'hadir' ? '✅ Hadir' : f === 'tidak_hadir' ? '❌ Tidak' : '❓ Mungkin'}
              </button>
            ))}
            <button onClick={exportCSV}
              className="px-3 py-1.5 rounded-lg text-xs transition-all hover:opacity-80 ml-auto"
              style={{ background: 'rgba(129,140,248,0.12)', color: '#818cf8', border: '1px solid rgba(129,140,248,0.2)' }}>
              ⬇ Export CSV
            </button>
          </div>
        </div>
      )}

      {/* Entries */}
      {filtered.length === 0 ? (
        <div className="glass rounded-2xl p-10 text-center opacity-50">
          <p className="font-script text-3xl mb-2" style={{ color: 'var(--gold)' }}>
            {entries.length === 0 ? 'Belum ada ucapan' : 'Tidak ada hasil'}
          </p>
          <p className="text-sm text-gray-400">
            {entries.length === 0 ? 'Ucapan dari tamu akan muncul di sini' : 'Coba ubah filter atau kata kunci pencarian'}
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {paginated.map((entry, i) => {
              const status = statusLabel[entry.attendance_status] || { label: entry.attendance_status, color: '#9ca3af' }
              return (
                <motion.div key={entry.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="px-3 py-1.5 rounded-lg text-xs transition-all disabled:opacity-30"
                style={{ background: 'rgba(255,255,255,0.08)', color: '#9ca3af' }}>
                ← Prev
              </button>
              <span className="text-xs text-gray-400">{page} / {totalPages}</span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg text-xs transition-all disabled:opacity-30"
                style={{ background: 'rgba(255,255,255,0.08)', color: '#9ca3af' }}>
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
