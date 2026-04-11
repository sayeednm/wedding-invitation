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
    await handleSave({ is_published: !data.is_published })
    router.refresh()
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
      <div className="grid md:grid-cols-2 gap-6" style={{ height: 'calc(100vh - 160px)' }}>
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
