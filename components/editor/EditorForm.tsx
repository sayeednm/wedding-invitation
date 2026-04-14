'use client'

import { useState } from 'react'
import type { Invitation } from '@/lib/types'
import { createClient } from '@/lib/supabase/client'
import { compressImage } from '@/lib/imageCompress'
import DigitalGiftEditor from './DigitalGiftEditor'
import GalleryEditor from './GalleryEditor'
import CouplePhotoEditor from './CouplePhotoEditor'
import MusicPicker from './MusicPicker'

const templates = [
  { id: 'luxury', name: 'Luxury Gold', color: '#C9A84C' },
  { id: 'floral', name: 'Floral Romance', color: '#f472b6' },
  { id: 'midnight', name: 'Midnight Elegance', color: '#818cf8' },
  { id: 'royal', name: 'Royal Burgundy', color: '#C9A84C' },
  { id: 'rustic', name: 'Rustic Garden', color: '#8fad6a' },
  { id: 'celestial', name: 'Celestial Silver', color: '#C0C0C0' },
  { id: 'bali', name: 'Bali Tropical', color: '#e07b39' },
  { id: 'ivory', name: 'Minimalist Ivory', color: '#d4c5a9' },
]

interface Props {
  invitation: Invitation
  onSave: (updates: Partial<Invitation>) => Promise<void>
  onPreview?: (updates: Partial<Invitation>) => void
  saving: boolean
  userId: string
}

export default function EditorForm({ invitation, onSave, onPreview, saving, userId }: Props) {
  const [form, setForm] = useState({
    groom_name: invitation.groom_name || '',
    groom_full_name: invitation.groom_full_name || '',
    groom_father: invitation.groom_father || '',
    groom_mother: invitation.groom_mother || '',
    groom_instagram: invitation.groom_instagram || '',
    bride_name: invitation.bride_name || '',
    bride_full_name: invitation.bride_full_name || '',
    bride_father: invitation.bride_father || '',
    bride_mother: invitation.bride_mother || '',
    bride_instagram: invitation.bride_instagram || '',
    event_date: invitation.event_date ? invitation.event_date.slice(0, 16) : '',
    location_name: invitation.location_name || '',
    location_maps_url: invitation.location_maps_url || '',
    akad_date: invitation.akad_date ? invitation.akad_date.slice(0, 16) : '',
    akad_location: invitation.akad_location || '',
    akad_maps_url: invitation.akad_maps_url || '',
    music_url: invitation.music_url || '',
    opening_text: invitation.opening_text || '',
    quran_verse: invitation.quran_verse || '',
    quran_surah: invitation.quran_surah || '',
    dresscode_color: invitation.dresscode_color || '',
    dresscode_note: invitation.dresscode_note || '',
    dresscode_enabled: invitation.dresscode_enabled ?? false,
    template_id: invitation.template_id || 'luxury',
    cover_type: invitation.cover_type || 'gradient',
    silhouette_variant: invitation.silhouette_variant || 'standing',
    photo_frame: invitation.photo_frame || 'circle',
    photo_mode: invitation.photo_mode || 'single',
    video_url: invitation.video_url || '',
    love_story: invitation.love_story || '',
    live_streaming_url: invitation.live_streaming_url || '',
    slug: invitation.slug || '',
  })
  const [uploading, setUploading] = useState(false)
  const [slugStatus, setSlugStatus] = useState<'idle' | 'checking' | 'ok' | 'taken' | 'invalid'>('idle')
  const [slugTimer, setSlugTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    const updated = { ...form, [name]: value }
    setForm(updated)

    if (name === 'slug') {
      // Validate & check slug availability with debounce
      const cleaned = value.toLowerCase().replace(/[^a-z0-9-]/g, '')
      if (cleaned !== value) setForm(p => ({ ...p, slug: cleaned }))
      if (!cleaned || cleaned.length < 3) { setSlugStatus('invalid'); return }
      setSlugStatus('checking')
      if (slugTimer) clearTimeout(slugTimer)
      const t = setTimeout(async () => {
        const supabase = createClient()
        const { data } = await supabase
          .from('invitations')
          .select('id')
          .eq('slug', cleaned)
          .neq('id', invitation.id)
          .maybeSingle()
        setSlugStatus(data ? 'taken' : 'ok')
      }, 600)
      setSlugTimer(t)
      return
    }

    if (name === 'event_date' || name === 'akad_date') {
      onPreview?.({ [name]: value ? new Date(value).toISOString() : null })
    } else {
      onPreview?.({ [name]: value })
    }
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>, field: 'cover_photo_url' | 'couple_photo_url' | 'bride_photo_url' | 'groom_photo_url') {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const compressed = await compressImage(file, 1920, 1920, 0.85)
    const supabase = createClient()
    const path = `${userId}/${invitation.id}/${field}-${Date.now()}`
    const { data, error } = await supabase.storage.from('wedding-photos').upload(path, compressed, { upsert: true })
    if (!error && data) {
      const { data: urlData } = supabase.storage.from('wedding-photos').getPublicUrl(data.path)
      onPreview?.({ [field]: urlData.publicUrl })
      await onSave({ [field]: urlData.publicUrl })
    }
    setUploading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const updates = {
      ...form,
      event_date: form.event_date ? new Date(form.event_date).toISOString() : null,
      akad_date: form.akad_date ? new Date(form.akad_date).toISOString() : null,
      dresscode_color: form.dresscode_enabled ? form.dresscode_color : null,
      dresscode_note: form.dresscode_enabled ? form.dresscode_note : null,
    }
    // Update preview immediately with all fields
    onPreview?.(updates)
    await onSave(updates)
  }

  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 transition-colors text-sm"
  const borderStyle = { borderColor: 'rgba(201,168,76,0.2)' }
  const labelClass = "text-xs text-gray-400 block mb-1"

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Custom Slug */}
      <div className="glass rounded-2xl p-5 space-y-3">
        <h3 className="font-serif-elegant text-lg" style={{ color: 'var(--gold)' }}>Link Undangan</h3>
        <p className="text-xs text-gray-500">Kustomisasi link undanganmu agar mudah diingat</p>
        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm"
          style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${slugStatus === 'taken' ? 'rgba(239,68,68,0.4)' : slugStatus === 'ok' ? 'rgba(74,222,128,0.4)' : 'rgba(201,168,76,0.2)'}` }}>
          <span className="text-gray-500 text-xs whitespace-nowrap">/v/</span>
          <input name="slug" value={form.slug || ''} onChange={handleChange}
            className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
            placeholder="nama-mempelai" />
          {slugStatus === 'checking' && <span className="text-xs text-gray-500 flex-shrink-0">⏳</span>}
          {slugStatus === 'ok' && <span className="text-xs text-green-400 flex-shrink-0">✓ Tersedia</span>}
          {slugStatus === 'taken' && <span className="text-xs text-red-400 flex-shrink-0">✗ Sudah dipakai</span>}
          {slugStatus === 'invalid' && <span className="text-xs text-yellow-400 flex-shrink-0">Min. 3 karakter</span>}
        </div>
        <p className="text-xs text-gray-600">Hanya huruf kecil (a-z), angka, dan tanda hubung (-)</p>
      </div>

      {/* Template */}
      <div className="glass rounded-2xl p-5">
        <h3 className="font-serif-elegant text-lg mb-4" style={{ color: 'var(--gold)' }}>Pilih Tema</h3>
        <div className="grid grid-cols-4 gap-2">
          {templates.map(t => (
            <button key={t.id} type="button" onClick={() => {
                setForm(p => ({ ...p, template_id: t.id }))
                onPreview?.({ template_id: t.id })
                onSave({ template_id: t.id })
              }}
              className={`p-3 rounded-xl border text-xs text-center transition-all ${form.template_id === t.id ? 'border-yellow-500' : 'border-white/10 hover:border-white/20'}`}>
              <div className="w-6 h-6 rounded-full mx-auto mb-1" style={{ background: t.color }} />
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Couple Info */}
      <div className="glass rounded-2xl p-5 space-y-4">
        <h3 className="font-serif-elegant text-lg" style={{ color: 'var(--gold)' }}>Data Mempelai</h3>
        <div>
          <label className={labelClass}>Nama Panggilan Mempelai Pria</label>
          <input name="groom_name" value={form.groom_name} onChange={handleChange}
            className={inputClass} style={borderStyle} placeholder="Nama panggilan" />
        </div>
        <div>
          <label className={labelClass}>Nama Lengkap Mempelai Pria</label>
          <input name="groom_full_name" value={form.groom_full_name} onChange={handleChange}
            className={inputClass} style={borderStyle} placeholder="Nama lengkap" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Nama Ayah</label>
            <input name="groom_father" value={form.groom_father} onChange={handleChange}
              className={inputClass} style={borderStyle} placeholder="Nama ayah" />
          </div>
          <div>
            <label className={labelClass}>Nama Ibu</label>
            <input name="groom_mother" value={form.groom_mother} onChange={handleChange}
              className={inputClass} style={borderStyle} placeholder="Nama ibu" />
          </div>
        </div>
        <div>
          <label className={labelClass}>Instagram Mempelai Pria</label>
          <input name="groom_instagram" value={form.groom_instagram} onChange={handleChange}
            className={inputClass} style={borderStyle} placeholder="@username" />
        </div>

        <div className="border-t pt-4" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
          <label className={labelClass}>Nama Panggilan Mempelai Wanita</label>
          <input name="bride_name" value={form.bride_name} onChange={handleChange}
            className={inputClass} style={borderStyle} placeholder="Nama panggilan" />
        </div>
        <div>
          <label className={labelClass}>Nama Lengkap Mempelai Wanita</label>
          <input name="bride_full_name" value={form.bride_full_name} onChange={handleChange}
            className={inputClass} style={borderStyle} placeholder="Nama lengkap" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Nama Ayah</label>
            <input name="bride_father" value={form.bride_father} onChange={handleChange}
              className={inputClass} style={borderStyle} placeholder="Nama ayah" />
          </div>
          <div>
            <label className={labelClass}>Nama Ibu</label>
            <input name="bride_mother" value={form.bride_mother} onChange={handleChange}
              className={inputClass} style={borderStyle} placeholder="Nama ibu" />
          </div>
        </div>
        <div>
          <label className={labelClass}>Instagram Mempelai Wanita</label>
          <input name="bride_instagram" value={form.bride_instagram} onChange={handleChange}
            className={inputClass} style={borderStyle} placeholder="@username" />
        </div>
        <div>
          <label className={labelClass}>Kata Pembuka</label>
          <textarea name="opening_text" value={form.opening_text} onChange={handleChange} rows={3}
            className={inputClass} style={borderStyle} placeholder="Bismillahirrahmanirrahim..." />
        </div>
        <div>
          <label className={labelClass}>Ayat Al-Quran</label>
          <textarea name="quran_verse" value={form.quran_verse} onChange={handleChange} rows={3}
            className={inputClass} style={borderStyle} placeholder="Dan di antara tanda-tanda kekuasaan-Nya..." />
        </div>
        <div>
          <label className={labelClass}>Sumber Ayat</label>
          <input name="quran_surah" value={form.quran_surah} onChange={handleChange}
            className={inputClass} style={borderStyle} placeholder="QS. Ar-Rum: 21" />
        </div>
      </div>

      {/* Event */}
      <div className="glass rounded-2xl p-5 space-y-4">
        <h3 className="font-serif-elegant text-lg" style={{ color: 'var(--gold)' }}>Akad Nikah</h3>
        <div>
          <label className={labelClass}>Tanggal & Waktu Akad</label>
          <input type="datetime-local" name="akad_date" value={form.akad_date} onChange={handleChange}
            className={inputClass} style={borderStyle} />
        </div>
        <div>
          <label className={labelClass}>Lokasi Akad</label>
          <input name="akad_location" value={form.akad_location} onChange={handleChange}
            className={inputClass} style={borderStyle} placeholder="Masjid Al-Ikhlas, Jakarta" />
        </div>
        <div>
          <label className={labelClass}>Link Maps Akad</label>
          <input name="akad_maps_url" value={form.akad_maps_url} onChange={handleChange}
            className={inputClass} style={borderStyle} placeholder="https://maps.google.com/..." />
        </div>
      </div>

      {/* Resepsi */}
      <div className="glass rounded-2xl p-5 space-y-4">
        <h3 className="font-serif-elegant text-lg" style={{ color: 'var(--gold)' }}>Resepsi</h3>
        <div>
          <label className={labelClass}>Tanggal & Waktu Resepsi</label>
          <input type="datetime-local" name="event_date" value={form.event_date} onChange={handleChange}
            className={inputClass} style={borderStyle} />
        </div>
        <div>
          <label className={labelClass}>Nama Lokasi</label>
          <input name="location_name" value={form.location_name} onChange={handleChange}
            className={inputClass} style={borderStyle} placeholder="Gedung Serbaguna, Jakarta" />
        </div>
        <div>
          <label className={labelClass}>Link Google Maps</label>
          <input name="location_maps_url" value={form.location_maps_url} onChange={handleChange}
            className={inputClass} style={borderStyle} placeholder="https://maps.google.com/..." />
        </div>
      </div>

      {/* Dresscode */}
      <div className="glass rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif-elegant text-lg" style={{ color: 'var(--gold)' }}>Dresscode</h3>
          <button type="button"
            onClick={() => { setForm(p => ({ ...p, dresscode_enabled: !p.dresscode_enabled })); onPreview?.({ dresscode_enabled: !form.dresscode_enabled }) }}
            className="flex-shrink-0 relative inline-flex items-center rounded-full transition-colors"
            style={{ width: 44, height: 24, background: form.dresscode_enabled ? '#C9A84C' : '#4b5563' }}>
            <span className="absolute rounded-full bg-white transition-transform"
              style={{ width: 18, height: 18, transform: form.dresscode_enabled ? 'translateX(22px)' : 'translateX(3px)' }}/>
          </button>
        </div>
        {form.dresscode_enabled && (
          <>
            <div>
              <label className={labelClass}>Warna Dresscode (hex)</label>
              <div className="flex gap-3 items-center">
                <input type="color" name="dresscode_color" value={form.dresscode_color || '#C9A84C'} onChange={handleChange}
                  className="w-12 h-10 rounded-lg cursor-pointer border-0 bg-transparent" />
                <input name="dresscode_color" value={form.dresscode_color} onChange={handleChange}
                  className={inputClass} style={borderStyle} placeholder="#C9A84C" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Catatan Dresscode</label>
              <input name="dresscode_note" value={form.dresscode_note} onChange={handleChange}
                className={inputClass} style={borderStyle} placeholder="Kami berharap tamu mengenakan warna..." />
            </div>
          </>
        )}
      </div>

      {/* Media tambahan */}
      <div className="glass rounded-2xl p-5 space-y-4">
        <h3 className="font-serif-elegant text-lg" style={{ color: 'var(--gold)' }}>Media Tambahan</h3>
        <div>
          <label className={labelClass}>URL Video Prewedding (YouTube)</label>
          <input name="video_url" value={form.video_url} onChange={handleChange}
            className={inputClass} style={borderStyle} placeholder="https://youtube.com/watch?v=..." />
        </div>
        <div>
          <label className={labelClass}>URL Live Streaming</label>
          <input name="live_streaming_url" value={form.live_streaming_url} onChange={handleChange}
            className={inputClass} style={borderStyle} placeholder="https://youtube.com/live/..." />
        </div>
      </div>

      {/* Love Story */}
      <div className="glass rounded-2xl p-5 space-y-4">
        <h3 className="font-serif-elegant text-lg" style={{ color: 'var(--gold)' }}>Love Story</h3>
        <p className="text-xs text-gray-500">Format per baris: Judul|Tanggal|Cerita</p>
        <textarea name="love_story" value={form.love_story} onChange={handleChange} rows={5}
          className={inputClass} style={borderStyle}
          placeholder={"Pertama Bertemu|Januari 2020|Kami bertemu di...\nMulai Pacaran|Maret 2020|..."} />
      </div>

      {/* Media */}
      <div className="glass rounded-2xl p-5 space-y-4">
        <h3 className="font-serif-elegant text-lg" style={{ color: 'var(--gold)' }}>Cover & Foto</h3>

        {/* Cover type selector */}
        <div>
          <label className={labelClass}>Tipe Cover</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {[
              { id: 'gradient', label: 'Gradient', icon: '🎨' },
              { id: 'photo', label: 'Foto', icon: '📸' },
            ].map(opt => (
              <button key={opt.id} type="button"
                onClick={() => { setForm(p => ({ ...p, cover_type: opt.id as 'gradient'|'photo'|'pattern' })); onSave({ cover_type: opt.id as 'gradient'|'photo'|'pattern' }) }}
                className={`p-3 rounded-xl border text-xs text-center transition-all flex flex-col items-center gap-1 ${form.cover_type === opt.id || (!form.cover_type && opt.id === 'gradient') ? 'border-yellow-500 bg-yellow-500/10' : 'border-white/10 hover:border-white/20'}`}>
                <span className="text-lg">{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Photo upload */}
        {form.cover_type === 'photo' && (
          <div>
            <label className={labelClass}>Foto Cover</label>
            <input type="file" accept="image/*" onChange={e => handlePhotoUpload(e, 'cover_photo_url')}
              className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-medium cursor-pointer" />
          </div>
        )}

        {/* Mode foto */}
        <div>
          <label className={labelClass}>Mode Foto Mempelai</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {[
              { id: 'single', label: 'Satu Foto Berdua', icon: '👫' },
              { id: 'individual', label: 'Foto Individual', icon: '🧑‍🤝‍🧑' },
            ].map(opt => (
              <button key={opt.id} type="button"
                onClick={() => { setForm(p => ({ ...p, photo_mode: opt.id as 'single' | 'individual' })); onPreview?.({ photo_mode: opt.id as 'single'|'individual' }) }}
                className={`p-3 rounded-xl border text-xs text-center transition-all flex flex-col items-center gap-1 ${(form.photo_mode || 'single') === opt.id ? 'border-yellow-500 bg-yellow-500/10' : 'border-white/10 hover:border-white/20'}`}>
                <span className="text-lg">{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Foto berdua */}
        <div>
          <label className={labelClass}>Foto Berdua</label>
          <input type="file" accept="image/*" onChange={e => handlePhotoUpload(e, 'couple_photo_url')}
            className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-medium cursor-pointer" />
        </div>
        {(form.photo_mode || 'single') === 'individual' && (
          <>
            <div>
              <label className={labelClass}>Foto Individual Mempelai Wanita</label>
              <input type="file" accept="image/*" onChange={e => handlePhotoUpload(e, 'bride_photo_url')}
                className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-medium cursor-pointer" />
            </div>
            <div>
              <label className={labelClass}>Foto Individual Mempelai Pria</label>
              <input type="file" accept="image/*" onChange={e => handlePhotoUpload(e, 'groom_photo_url')}
                className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-medium cursor-pointer" />
            </div>
          </>
        )}

        {/* Frame foto */}
        <div>
          <label className={labelClass}>Bingkai Foto Pasangan</label>
          <div className="grid grid-cols-4 gap-2 mt-1">
            {[
              { id: 'circle', label: 'Lingkaran', icon: '⭕' },
              { id: 'oval', label: 'Oval', icon: '🥚' },
              { id: 'rounded', label: 'Kotak', icon: '🔲' },
              { id: 'hexagon', label: 'Heksagon', icon: '⬡' },
            ].map(opt => (
              <button key={opt.id} type="button"
                onClick={() => { setForm(p => ({ ...p, photo_frame: opt.id as 'circle'|'oval'|'rounded'|'hexagon'|'diamond' })); onPreview?.({ photo_frame: opt.id as 'circle'|'oval'|'rounded'|'hexagon'|'diamond' }) }}
                className={`p-2 rounded-xl border text-xs text-center transition-all flex flex-col items-center gap-1 ${form.photo_frame === opt.id ? 'border-yellow-500 bg-yellow-500/10' : 'border-white/10 hover:border-white/20'}`}>
                <span>{opt.icon}</span>
                <span className="text-xs">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className={labelClass}>URL Musik (MP3) — opsional, gunakan Music Picker di bawah</label>
          <input name="music_url" value={form.music_url} onChange={handleChange}
            className={inputClass} style={borderStyle} placeholder="https://..." />
        </div>
        {uploading && (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <div className="h-full rounded-full animate-pulse" style={{ background: 'var(--gold)', width: '60%' }} />
            </div>
            <p className="text-xs text-yellow-400 flex-shrink-0">Mengupload & mengkompresi foto...</p>
          </div>
        )}
      </div>

      <button type="submit" disabled={saving}
        className="w-full py-3 rounded-full font-medium transition-all hover:opacity-90 disabled:opacity-50"
        style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: '#0D1B2A' }}>
        {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
      </button>

      {/* Music Picker */}
      <MusicPicker
        currentUrl={form.music_url}
        userId={userId}
        invitationId={invitation.id}
        onSelect={(url) => {
          setForm(p => ({ ...p, music_url: url }))
          onPreview?.({ music_url: url })
          onSave({ music_url: url })
        }}
      />

      {/* Couple Photos Slideshow — tampil di kedua mode */}
      <CouplePhotoEditor
        invitationId={invitation.id}
        userId={userId}
        initialPhotos={(invitation as any).couple_photos || []}
        mode={(form.photo_mode || 'single') as 'single' | 'individual'}
        onPhotosChange={(photos) => onPreview?.({ couple_photos: photos })}
      />

      {/* Digital Gifts — outside form submit, managed independently */}
      <DigitalGiftEditor
        invitationId={invitation.id}
        initialGifts={invitation.digital_gifts || []}
        onGiftsChange={(gifts) => onPreview?.({ digital_gifts: gifts })}
      />

      {/* Gallery */}
      <GalleryEditor
        invitationId={invitation.id}
        initialPhotos={invitation.gallery || []}
        userId={userId}
        onPhotosChange={(photos) => onPreview?.({ gallery: photos })}
      />
    </form>
  )
}
