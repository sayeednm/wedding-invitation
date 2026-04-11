'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { Guest, GuestbookEntry } from '@/lib/types'

interface Invitation {
  id: string
  slug: string
  groom_name: string | null
  bride_name: string | null
  is_published: boolean
}

interface Props {
  invitation: Invitation
  initialGuests: Guest[]
  rsvpStats: { hadir: number; tidak_hadir: number; mungkin: number; total: number }
}

export default function GuestListClient({ invitation, initialGuests, rsvpStats }: Props) {
  const [guests, setGuests] = useState<Guest[]>(initialGuests)
  const [newName, setNewName] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const [baseUrl, setBaseUrl] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => { setBaseUrl(window.location.origin) }, [])
  const inviteUrl = `${baseUrl}/v/${invitation.slug}`

  async function addGuest() {
    const name = newName.trim()
    if (!name) return
    setSaving(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('guests')
      .insert({ invitation_id: invitation.id, name })
      .select()
      .single()
    if (data) setGuests(prev => [...prev, data])
    setNewName('')
    setSaving(false)
  }

  async function removeGuest(id: string) {
    const supabase = createClient()
    await supabase.from('guests').delete().eq('id', id)
    setGuests(prev => prev.filter(g => g.id !== id))
  }

  function getGuestLink(name: string) {
    return `${inviteUrl}?to=${encodeURIComponent(name)}`
  }

  function copyLink(name: string) {
    navigator.clipboard.writeText(getGuestLink(name))
    setCopied(name)
    setTimeout(() => setCopied(null), 2000)
  }

  function shareWhatsApp(name: string) {
    const link = getGuestLink(name)
    const msg = `Kepada Yth. ${name},\n\nDengan penuh kebahagiaan, kami mengundang Anda untuk hadir di pernikahan kami.\n\n${invitation.groom_name} & ${invitation.bride_name}\n\nBuka undangan di sini:\n${link}`
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank')
  }

  function copyAllLinks() {
    if (!guests.length) return
    const lines = guests.map(g => `• ${g.name}: ${getGuestLink(g.name)}`).join('\n')
    const msg = `Daftar link undangan ${invitation.groom_name} & ${invitation.bride_name}:\n\n${lines}`
    navigator.clipboard.writeText(msg)
    setCopied('__all__')
    setTimeout(() => setCopied(null), 2000)
  }

  const inputClass = "flex-1 px-4 py-2.5 rounded-xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 transition-colors text-sm"

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard" className="text-xs text-gray-500 hover:text-gray-300 transition-colors mb-3 inline-block">
          ← Kembali ke Dashboard
        </Link>
        <p className="text-sm tracking-widest uppercase mb-1" style={{ color: 'var(--gold)' }}>Daftar Tamu</p>
        <h1 className="font-serif-elegant text-3xl" style={{ color: 'var(--cream)' }}>
          {invitation.groom_name} &amp; {invitation.bride_name}
        </h1>
      </div>

      {/* RSVP Stats */}
      <div className="glass rounded-2xl p-5 mb-6">
        <p className="text-xs text-gray-400 mb-3 tracking-widest uppercase">Rekap RSVP</p>
        <div className="grid grid-cols-4 gap-3 text-center">
          <div>
            <p className="text-2xl font-serif-elegant" style={{ color: 'var(--gold)' }}>{rsvpStats.total}</p>
            <p className="text-xs text-gray-500 mt-1">Total</p>
          </div>
          <div>
            <p className="text-2xl font-serif-elegant text-green-400">{rsvpStats.hadir}</p>
            <p className="text-xs text-gray-500 mt-1">Hadir</p>
          </div>
          <div>
            <p className="text-2xl font-serif-elegant text-red-400">{rsvpStats.tidak_hadir}</p>
            <p className="text-xs text-gray-500 mt-1">Tidak Hadir</p>
          </div>
          <div>
            <p className="text-2xl font-serif-elegant text-yellow-400">{rsvpStats.mungkin}</p>
            <p className="text-xs text-gray-500 mt-1">Mungkin</p>
          </div>
        </div>
      </div>

      {/* Link dasar */}
      <div className="glass rounded-2xl p-5 mb-6">
        <p className="text-xs text-gray-400 mb-2">Link undangan dasar</p>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-300 truncate flex-1 font-mono">{inviteUrl}</p>
          <button onClick={() => { navigator.clipboard.writeText(inviteUrl); setCopied('base'); setTimeout(() => setCopied(null), 2000) }}
            className="text-xs px-3 py-1.5 rounded-lg transition-all flex-shrink-0"
            style={{ background: copied === 'base' ? 'rgba(74,222,128,0.15)' : 'rgba(201,168,76,0.15)', color: copied === 'base' ? '#4ade80' : 'var(--gold)' }}>
            {copied === 'base' ? '✓ Disalin' : 'Salin'}
          </button>
        </div>
      </div>

      {/* Tambah tamu */}
      <div className="glass rounded-2xl p-5 mb-6">
        <h2 className="font-serif-elegant text-lg mb-4" style={{ color: 'var(--gold)' }}>Tambah Tamu</h2>
        <div className="flex gap-2">
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addGuest()}
            className={inputClass}
            style={{ borderColor: 'rgba(201,168,76,0.2)' }}
            placeholder="Nama tamu (contoh: Budi Santoso)"
            disabled={saving}
          />
          <button onClick={addGuest} disabled={saving}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-90 flex-shrink-0 disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: '#0D1B2A' }}>
            {saving ? '...' : '+ Tambah'}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">Tekan Enter untuk tambah cepat</p>
      </div>

      {/* Daftar tamu */}
      {guests.length > 0 && (
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif-elegant text-lg" style={{ color: 'var(--gold)' }}>
              {guests.length} Tamu
            </h2>
            <button onClick={copyAllLinks}
              className="text-xs px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
              style={{ background: copied === '__all__' ? 'rgba(74,222,128,0.15)' : 'rgba(37,211,102,0.15)', color: copied === '__all__' ? '#4ade80' : '#25d366', border: '1px solid rgba(37,211,102,0.3)' }}>
              {copied === '__all__' ? '✓ Disalin' : '📋 Salin Semua Link'}
            </button>
          </div>

          <div className="space-y-2">
            <AnimatePresence>
              {guests.map(guest => (
                <motion.div key={guest.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-2 p-3 rounded-xl"
                  style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.12)' }}>
                  <p className="flex-1 text-sm" style={{ color: 'var(--cream)' }}>{guest.name}</p>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button onClick={() => copyLink(guest.name)}
                      className="px-2.5 py-1.5 rounded-lg text-xs transition-all"
                      style={{ background: copied === guest.name ? 'rgba(74,222,128,0.15)' : 'rgba(201,168,76,0.12)', color: copied === guest.name ? '#4ade80' : 'var(--gold)' }}>
                      {copied === guest.name ? '✓' : '🔗'}
                    </button>
                    <button onClick={() => shareWhatsApp(guest.name)}
                      className="px-2.5 py-1.5 rounded-lg text-xs transition-all hover:opacity-80"
                      style={{ background: 'rgba(37,211,102,0.15)', color: '#25d366' }}>
                      WA
                    </button>
                    <button onClick={() => removeGuest(guest.id)}
                      className="px-2.5 py-1.5 rounded-lg text-xs transition-all hover:opacity-80"
                      style={{ background: 'rgba(239,68,68,0.12)', color: '#f87171' }}>
                      ✕
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {guests[0] && (
            <div className="mt-4 pt-4 border-t" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
              <p className="text-xs text-gray-500 mb-1">Contoh link untuk {guests[0].name}:</p>
              <p className="text-xs font-mono text-gray-400 break-all">{getGuestLink(guests[0].name)}</p>
            </div>
          )}
        </div>
      )}

      {guests.length === 0 && (
        <div className="glass rounded-2xl p-10 text-center opacity-50">
          <p className="font-script text-3xl mb-2" style={{ color: 'var(--gold)' }}>Belum ada tamu</p>
          <p className="text-sm text-gray-400">Tambahkan nama tamu di atas untuk generate link personal</p>
        </div>
      )}
    </div>
  )
}
