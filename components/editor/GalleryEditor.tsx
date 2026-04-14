'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { compressImage } from '@/lib/imageCompress'
import type { GalleryPhoto } from '@/lib/types'

interface Props {
  invitationId: string
  initialPhotos: GalleryPhoto[]
  userId: string
  onPhotosChange?: (photos: GalleryPhoto[]) => void
}

export default function GalleryEditor({ invitationId, initialPhotos, userId, onPhotosChange }: Props) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(initialPhotos)

  function updatePhotos(newPhotos: GalleryPhoto[]) {
    setPhotos(newPhotos)
    onPhotosChange?.(newPhotos)
  }
  const [uploading, setUploading] = useState(false)

  const inputClass = "w-full px-3 py-2 rounded-xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none text-sm"
  const borderStyle = { borderColor: 'rgba(201,168,76,0.2)' }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true)
    const supabase = createClient()
    const newPhotos: GalleryPhoto[] = []

    for (const rawFile of files.slice(0, 20 - photos.length)) {
      const file = await compressImage(rawFile, 1600, 1600, 0.82)
      const path = `${userId}/${invitationId}/gallery-${Date.now()}-${Math.random().toString(36).slice(2)}`
      const { data, error } = await supabase.storage.from('wedding-photos').upload(path, file, { upsert: true })
      if (!error && data) {
        const { data: urlData } = supabase.storage.from('wedding-photos').getPublicUrl(data.path)
        const { data: photo } = await supabase.from('gallery').insert({
          invitation_id: invitationId,
          photo_url: urlData.publicUrl,
          sort_order: photos.length + newPhotos.length,
        }).select().single()
        if (photo) newPhotos.push(photo)
      }
    }
    if (newPhotos.length) updatePhotos([...photos, ...newPhotos])
    setUploading(false)
  }

  async function handleDelete(id: string) {
    const supabase = createClient()
    await supabase.from('gallery').delete().eq('id', id)
    updatePhotos(photos.filter(p => p.id !== id))
  }

  async function handleCaption(id: string, caption: string) {
    const supabase = createClient()
    await supabase.from('gallery').update({ caption }).eq('id', id)
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, caption } : p))
  }

  return (
    <div className="glass rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif-elegant text-lg" style={{ color: 'var(--gold)' }}>Galeri Foto</h3>
        <span className="text-xs text-gray-500">{photos.length}/20 foto</span>
      </div>

      {/* Upload */}
      {photos.length < 20 && (
        <div>
          <label className="block w-full py-3 rounded-xl border-2 border-dashed text-center text-sm text-gray-400 cursor-pointer hover:border-yellow-500/40 transition-colors"
            style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3"/>
                  <path d="M12 2 A10 10 0 0 1 22 12" stroke="#C9A84C" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                Mengkompresi & mengupload...
              </span>
            ) : '+ Upload Foto (maks 20)'}
            <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" disabled={uploading}/>
          </label>
        </div>
      )}

      {/* Grid preview */}
      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {photos.map(photo => (
            <div key={photo.id} className="relative group">
              <img src={photo.photo_url} alt="" className="w-full rounded-lg object-cover" style={{ aspectRatio: '1' }}/>
              <button onClick={() => handleDelete(photo.id)}
                className="absolute top-1 right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'rgba(239,68,68,0.9)', color: 'white' }}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
