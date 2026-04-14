'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import type { Invitation } from '@/lib/types'
import EditorForm from './EditorForm'
import InvitationPreview from './InvitationPreview'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface Props {
  invitation: Invitation
  userId: string
}

export default function EditorClient({ invitation, userId }: Props) {
  const [data, setData] = useState<Invitation>(invitation)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [mobilePreview, setMobilePreview] = useState(false)
  const router = useRouter()

  async function handleSave(updates: Partial<Invitation>) {
    setSaving(true)
    // Update preview immediately
    setData(prev => ({ ...prev, ...updates }))
    const supabase = createClient()
    const { data: updated } = await supabase
      .from('invitations')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', invitation.id)
      .select()
      .single()

    if (updated) {
      // Merge dengan data relasi yang sudah ada — jangan timpa gallery, digital_gifts, dll
      setData(prev => ({
        ...prev,
        ...updated,
        gallery: prev.gallery,
        digital_gifts: prev.digital_gifts,
        guestbook: prev.guestbook,
        couple_photos: prev.couple_photos,
      }))
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
    setSaving(false)
  }

  async function handlePublish() {
    // Validasi field wajib sebelum publish
    if (!data.groom_name || !data.bride_name) {
      alert('Lengkapi nama mempelai pria dan wanita sebelum publikasi.')
      return
    }
    if (!data.event_date && !data.akad_date) {
      alert('Lengkapi tanggal acara (akad atau resepsi) sebelum publikasi.')
      return
    }
    if (!data.location_name && !data.akad_location) {
      alert('Lengkapi lokasi acara sebelum publikasi.')
      return
    }
    if (!data.is_published) {
      const ok = confirm('Publikasi undangan? Undangan akan bisa diakses oleh siapapun yang punya link.')
      if (!ok) return
    }
    await handleSave({ is_published: !data.is_published })
    router.refresh()
  }

  async function handleDuplicate() {
    const ok = confirm('Duplikasi undangan ini? Semua data akan disalin ke undangan baru.')
    if (!ok) return
    const supabase = createClient()
    const newSlug = `${data.slug}-copy-${Date.now().toString(36)}`
    const { data: newInv } = await supabase
      .from('invitations')
      .insert({
        user_id: userId,
        slug: newSlug,
        template_id: data.template_id,
        bride_name: data.bride_name,
        groom_name: data.groom_name,
        groom_full_name: data.groom_full_name,
        groom_father: data.groom_father,
        groom_mother: data.groom_mother,
        groom_instagram: data.groom_instagram,
        bride_full_name: data.bride_full_name,
        bride_father: data.bride_father,
        bride_mother: data.bride_mother,
        bride_instagram: data.bride_instagram,
        event_date: data.event_date,
        location_name: data.location_name,
        location_maps_url: data.location_maps_url,
        akad_date: data.akad_date,
        akad_location: data.akad_location,
        akad_maps_url: data.akad_maps_url,
        music_url: data.music_url,
        cover_photo_url: data.cover_photo_url,
        couple_photo_url: data.couple_photo_url,
        opening_text: data.opening_text,
        quran_verse: data.quran_verse,
        quran_surah: data.quran_surah,
        dresscode_enabled: data.dresscode_enabled,
        dresscode_color: data.dresscode_color,
        dresscode_note: data.dresscode_note,
        cover_type: data.cover_type,
        silhouette_variant: data.silhouette_variant,
        photo_frame: data.photo_frame,
        photo_mode: data.photo_mode,
        video_url: data.video_url,
        love_story: data.love_story,
        live_streaming_url: data.live_streaming_url,
        is_published: false,
      })
      .select()
      .single()
    if (newInv) {
      router.push(`/dashboard/editor/${newInv.id}`)
    }
  }

  return (
    <div>
      {/* Editor Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <p className="text-sm tracking-widest uppercase mb-1" style={{ color: 'var(--gold)' }}>Editor</p>
          <h1 className="font-serif-elegant text-2xl" style={{ color: 'var(--cream)' }}>
            {data.groom_name || 'Mempelai Pria'} & {data.bride_name || 'Mempelai Wanita'}
          </h1>
        </div>
        <div className="flex gap-3 items-center">
          {saved && <span className="text-green-400 text-sm flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7 L5.5 10.5 L12 3" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Tersimpan
          </span>}
          {saving && <span className="text-yellow-400 text-sm flex items-center gap-1">
            <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="2" strokeDasharray="20" strokeDashoffset="10" opacity="0.3"/>
              <path d="M7 2 A5 5 0 0 1 12 7" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Menyimpan...
          </span>}
          <button onClick={() => setMobilePreview(!mobilePreview)}
            className="px-4 py-2 rounded-full text-sm border transition-all hover:bg-white/5 md:hidden"
            style={{ borderColor: 'rgba(201,168,76,0.3)', color: 'var(--gold)' }}>
            {mobilePreview ? 'Edit' : 'Preview'}
          </button>
          <button onClick={handlePublish}
            className="px-5 py-2 rounded-full text-sm font-medium border transition-all hover:bg-white/5"
            style={{ borderColor: 'rgba(201,168,76,0.3)', color: data.is_published ? '#4ade80' : 'var(--gold)' }}>
            {data.is_published ? '✓ Dipublikasi' : 'Publikasi'}
          </button>
          <button onClick={handleDuplicate} title="Duplikasi undangan"
            className="px-3 py-2 rounded-full text-sm border transition-all hover:bg-white/5"
            style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#9ca3af' }}>
            ⧉
          </button>
          {data.is_published && (
            <a href={`/v/${data.slug}`} target="_blank"
              className="px-5 py-2 rounded-full text-sm font-medium transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: '#0D1B2A' }}>
              Buka Link
            </a>
          )}
        </div>
      </div>

      {/* Split Screen */}
      <div className="grid md:grid-cols-2 gap-6" style={{ height: 'calc(100dvh - 160px)' }}>
        {/* Left: Form */}
        <div className={`overflow-y-auto pr-1 ${mobilePreview ? 'hidden md:block' : 'block'}`}>
        <EditorForm invitation={data} onSave={handleSave} onPreview={(updates) => setTimeout(() => setData(prev => ({ ...prev, ...updates })), 0)} saving={saving} userId={userId} />
        </div>

        {/* Right: Preview */}
        <div className={`${mobilePreview ? 'block' : 'hidden md:block'} flex items-start justify-center overflow-y-auto`}>
          <div className="sticky top-0 pt-2">
            <p className="text-xs text-center text-gray-500 mb-3 tracking-widest uppercase">Live Preview</p>
            {/* Mobile frame */}
            <div className="relative mx-auto" style={{ width: 300 }}>
              <div className="rounded-[2.5rem] overflow-hidden border-4 shadow-2xl"
                style={{ borderColor: 'rgba(201,168,76,0.4)', height: 580 }}>
                <div className="overflow-y-auto h-full">
                  <InvitationPreview invitation={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
