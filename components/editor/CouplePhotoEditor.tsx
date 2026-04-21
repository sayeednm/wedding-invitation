'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { compressImage } from '@/lib/imageCompress'

interface CouplePhoto {
  id: string
  photo_url: string
  person: 'groom' | 'bride' | 'couple'
  sort_order: number
}

interface Props {
  invitationId: string
  userId: string
  initialPhotos: CouplePhoto[]
  onPhotosChange?: (photos: CouplePhoto[]) => void
  mode?: 'single' | 'individual'
}

export default function CouplePhotoEditor({ invitationId, userId, initialPhotos, onPhotosChange, mode = 'individual' }: Props) {
  const [photos, setPhotos] = useState<CouplePhoto[]>(initialPhotos)
  const [uploading, setUploading] = useState<'groom' | 'bride' | 'couple' | null>(null)

  function updatePhotos(newPhotos: CouplePhoto[]) {
    setPhotos(newPhotos)
    onPhotosChange?.(newPhotos)
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>, person: 'groom' | 'bride' | 'couple') {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(person)
    const supabase = createClient()
    const newPhotos: CouplePhoto[] = []

    for (const rawFile of files.slice(0, 5)) {
      const file = await compressImage(rawFile, 1200, 1200, 0.85)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'wedding-couple')
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const { url } = await res.json()
      if (url) {
        const { data: photo } = await supabase.from('couple_photos').insert({
          invitation_id: invitationId,
          photo_url: url,
          person,
          sort_order: photos.filter(p => p.person === person).length + newPhotos.length,
        }).select().single()
        if (photo) newPhotos.push(photo as CouplePhoto)
      }
    }
    if (newPhotos.length) updatePhotos([...photos, ...newPhotos])
    setUploading(null)
  }

  async function handleDelete(id: string) {
    const supabase = createClient()
    await supabase.from('couple_photos').delete().eq('id', id)
    updatePhotos(photos.filter(p => p.id !== id))
  }

  const groomPhotos = photos.filter(p => p.person === 'groom')
  const bridePhotos = photos.filter(p => p.person === 'bride')
  const couplePhotos = photos.filter(p => p.person === 'couple')

  return (
    <div className="glass rounded-2xl p-5 space-y-5">
      <h3 className="font-serif-elegant text-lg" style={{ color: 'var(--gold)' }}>Foto Slideshow</h3>
      <p className="text-xs text-gray-500">Upload beberapa foto — akan berganti otomatis di undangan</p>

      {mode === 'single' ? (
        /* Mode berdua */
        <div>
          <label className="text-xs text-gray-400 block mb-1">Foto Berdua ({couplePhotos.length}/5)</label>
          {couplePhotos.length < 5 && (
            <label className="block w-full py-2.5 rounded-xl border-2 border-dashed text-center text-xs text-gray-400 cursor-pointer hover:border-yellow-500/40 transition-colors mb-2"
              style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
              {uploading === 'couple' ? 'Mengupload...' : '+ Tambah Foto Berdua'}
              <input type="file" accept="image/*" multiple onChange={e => handleUpload(e, 'couple')} className="hidden" disabled={!!uploading}/>
            </label>
          )}
          {couplePhotos.length > 0 && (
            <div className="grid grid-cols-4 gap-1.5">
              {couplePhotos.map(p => (
                <div key={p.id} className="relative group">
                  <img src={p.photo_url} alt="" className="w-full rounded-lg object-cover" style={{ aspectRatio: '1' }}/>
                  <button onClick={() => handleDelete(p.id)}
                    className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'rgba(239,68,68,0.9)', color: 'white', fontSize: 8 }}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Mode individual */
        <>
          {/* Foto Wanita */}
          <div>
            <label className="text-xs text-gray-400 block mb-1">Foto Mempelai Wanita ({bridePhotos.length}/5)</label>
            {bridePhotos.length < 5 && (
              <label className="block w-full py-2.5 rounded-xl border-2 border-dashed text-center text-xs text-gray-400 cursor-pointer hover:border-yellow-500/40 transition-colors mb-2"
                style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
                {uploading === 'bride' ? 'Mengupload...' : '+ Tambah Foto Wanita'}
                <input type="file" accept="image/*" multiple onChange={e => handleUpload(e, 'bride')} className="hidden" disabled={!!uploading}/>
              </label>
            )}
            {bridePhotos.length > 0 && (
              <div className="grid grid-cols-4 gap-1.5">
                {bridePhotos.map(p => (
                  <div key={p.id} className="relative group">
                    <img src={p.photo_url} alt="" className="w-full rounded-lg object-cover" style={{ aspectRatio: '1' }}/>
                    <button onClick={() => handleDelete(p.id)}
                      className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: 'rgba(239,68,68,0.9)', color: 'white', fontSize: 8 }}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Foto Pria */}
          <div>
            <label className="text-xs text-gray-400 block mb-1">Foto Mempelai Pria ({groomPhotos.length}/5)</label>
            {groomPhotos.length < 5 && (
              <label className="block w-full py-2.5 rounded-xl border-2 border-dashed text-center text-xs text-gray-400 cursor-pointer hover:border-yellow-500/40 transition-colors mb-2"
                style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
                {uploading === 'groom' ? 'Mengupload...' : '+ Tambah Foto Pria'}
                <input type="file" accept="image/*" multiple onChange={e => handleUpload(e, 'groom')} className="hidden" disabled={!!uploading}/>
              </label>
            )}
            {groomPhotos.length > 0 && (
              <div className="grid grid-cols-4 gap-1.5">
                {groomPhotos.map(p => (
                  <div key={p.id} className="relative group">
                    <img src={p.photo_url} alt="" className="w-full rounded-lg object-cover" style={{ aspectRatio: '1' }}/>
                    <button onClick={() => handleDelete(p.id)}
                      className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: 'rgba(239,68,68,0.9)', color: 'white', fontSize: 8 }}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
