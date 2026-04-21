'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { DigitalGift } from '@/lib/types'

interface Props {
  invitationId: string
  initialGifts: DigitalGift[]
  onGiftsChange?: (gifts: DigitalGift[]) => void
}

const emptyGift = { bank_name: '', account_number: '', account_holder: '', qris_url: '' }

export default function DigitalGiftEditor({ invitationId, initialGifts, onGiftsChange }: Props) {
  const [gifts, setGifts] = useState<DigitalGift[]>(initialGifts)

  function updateGifts(newGifts: DigitalGift[]) {
    setGifts(newGifts)
    onGiftsChange?.(newGifts)
  }
  const [form, setForm] = useState(emptyGift)
  const [saving, setSaving] = useState(false)
  const [uploadingQris, setUploadingQris] = useState(false)

  const inputClass = "w-full px-3 py-2 rounded-xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 transition-colors text-sm"
  const borderStyle = { borderColor: 'rgba(201,168,76,0.2)' }
  const labelClass = "text-xs text-gray-400 block mb-1"

  async function handleAdd() {
    if (!form.bank_name && !form.account_number) return
    setSaving(true)
    const supabase = createClient()
    const { data } = await supabase.from('digital_gifts').insert({
      invitation_id: invitationId,
      ...form,
    }).select().single()
    if (data) setGifts(prev => { const next = [...prev, data]; onGiftsChange?.(next); return next })
    setForm(emptyGift)
    setSaving(false)
  }

  async function handleDelete(id: string) {
    const supabase = createClient()
    await supabase.from('digital_gifts').delete().eq('id', id)
    setGifts(prev => { const next = prev.filter(g => g.id !== id); onGiftsChange?.(next); return next })
  }

  async function handleQrisUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingQris(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'wedding-qris')
    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    const { url } = await res.json()
    if (url) setForm(prev => ({ ...prev, qris_url: url }))
    setUploadingQris(false)
  }

  return (
    <div className="glass rounded-2xl p-5 space-y-4">
      <h3 className="font-serif-elegant text-lg" style={{ color: 'var(--gold)' }}>Amplop Digital</h3>

      {/* Existing gifts */}
      {gifts.length > 0 && (
        <div className="space-y-2">
          {gifts.map(g => (
            <div key={g.id} className="flex items-center justify-between rounded-xl px-3 py-2"
              style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--gold)' }}>{g.bank_name}</p>
                <p className="text-xs text-gray-400">{g.account_number} · {g.account_holder}</p>
                {g.qris_url && <p className="text-xs text-gray-500">QRIS ✓</p>}
              </div>
              <button onClick={() => handleDelete(g.id)}
                className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded transition-colors">
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add new */}
      <div className="space-y-3 pt-2 border-t" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
        <p className="text-xs text-gray-500">Tambah rekening / QRIS</p>
        <div>
          <label className={labelClass}>Nama Bank</label>
          <input value={form.bank_name} onChange={e => setForm(p => ({ ...p, bank_name: e.target.value }))}
            className={inputClass} style={borderStyle} placeholder="BCA, Mandiri, BRI..." />
        </div>
        <div>
          <label className={labelClass}>Nomor Rekening</label>
          <input value={form.account_number} onChange={e => setForm(p => ({ ...p, account_number: e.target.value }))}
            className={inputClass} style={borderStyle} placeholder="1234567890" />
        </div>
        <div>
          <label className={labelClass}>Nama Pemilik</label>
          <input value={form.account_holder} onChange={e => setForm(p => ({ ...p, account_holder: e.target.value }))}
            className={inputClass} style={borderStyle} placeholder="Nama pemilik rekening" />
        </div>
        <div>
          <label className={labelClass}>Upload QRIS (opsional)</label>
          <input type="file" accept="image/*" onChange={handleQrisUpload}
            className="w-full text-sm text-gray-400 cursor-pointer" />
          {uploadingQris && <p className="text-xs text-yellow-400 mt-1">Mengupload QRIS...</p>}
          {form.qris_url && <p className="text-xs text-green-400 mt-1">✓ QRIS terupload</p>}
        </div>
        <button onClick={handleAdd} disabled={saving || (!form.bank_name && !form.account_number)}
          className="w-full py-2 rounded-full text-sm font-medium transition-all hover:opacity-90 disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: '#0D1B2A' }}>
          {saving ? 'Menyimpan...' : '+ Tambah Rekening'}
        </button>
      </div>
    </div>
  )
}
