'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { presetSongs } from '@/lib/presetMusic'

interface Props {
  currentUrl: string
  onSelect: (url: string) => void
  userId: string
  invitationId: string
}

export default function MusicPicker({ currentUrl, onSelect, userId, invitationId }: Props) {
  const [uploading, setUploading] = useState(false)
  const [playing, setPlaying] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  function togglePlay(url: string) {
    if (!url) return
    if (playing === url) {
      audioRef.current?.pause()
      setPlaying(null)
    } else {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      const audio = new Audio(url)
      audio.play().catch(() => {})
      audio.onended = () => setPlaying(null)
      audioRef.current = audio
      setPlaying(url)
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.name.match(/\.(mp3|ogg|wav|m4a)$/i)) {
      alert('Hanya file MP3, OGG, WAV, atau M4A yang didukung')
      return
    }
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'wedding-music')
    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    const { url } = await res.json()
    if (url) onSelect(url)
    setUploading(false)
  }

  const genres = [...new Set(presetSongs.map(s => s.genre))]
  const availableSongs = presetSongs.filter(s => s.url)

  return (
    <div className="glass rounded-2xl p-5 space-y-4">
      <h3 className="font-serif-elegant text-lg" style={{ color: 'var(--gold)' }}>Musik Latar</h3>

      {/* Status lagu aktif */}
      {currentUrl && (
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
          style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
          <button onClick={() => togglePlay(currentUrl)}
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(201,168,76,0.2)', color: 'var(--gold)' }}>
            {playing === currentUrl ? '⏸' : '▶'}
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400 truncate">
              {presetSongs.find(s => s.url === currentUrl)?.title || 'Lagu custom'}
            </p>
            <p className="text-xs" style={{ color: 'var(--gold)' }}>✓ Aktif</p>
          </div>
          <button onClick={() => onSelect('')} className="text-xs text-red-400 hover:text-red-300">Hapus</button>
        </div>
      )}

      {/* Upload lagu sendiri */}
      <div>
        <p className="text-xs text-gray-400 mb-2">Upload lagu sendiri (MP3)</p>
        <label className="block w-full py-2.5 rounded-xl border-2 border-dashed text-center text-xs text-gray-400 cursor-pointer hover:border-yellow-500/40 transition-colors"
          style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
          {uploading ? '⏳ Mengupload...' : '🎵 Pilih file MP3'}
          <input type="file" accept=".mp3,.ogg,.wav,.m4a" onChange={handleUpload} className="hidden" disabled={uploading}/>
        </label>
      </div>

      {/* Lagu preset */}
      {availableSongs.length > 0 ? (
        <div>
          <p className="text-xs text-gray-400 mb-2">Atau pilih dari koleksi kami</p>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {genres.map(genre => {
              const songs = availableSongs.filter(s => s.genre === genre)
              if (!songs.length) return null
              return (
                <div key={genre}>
                  <p className="text-xs text-gray-600 mb-1 px-1">{genre}</p>
                  {songs.map(song => (
                    <div key={song.id}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all hover:bg-white/5"
                      style={{ background: currentUrl === song.url ? 'rgba(201,168,76,0.1)' : 'transparent', border: currentUrl === song.url ? '1px solid rgba(201,168,76,0.3)' : '1px solid transparent' }}>
                      <button onClick={() => togglePlay(song.url)}
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                        style={{ background: 'rgba(255,255,255,0.08)', color: 'white' }}>
                        {playing === song.url ? '⏸' : '▶'}
                      </button>
                      <div className="flex-1 min-w-0" onClick={() => onSelect(song.url)}>
                        <p className="text-xs font-medium truncate" style={{ color: 'var(--cream)' }}>{song.title}</p>
                        <p className="text-xs text-gray-500 truncate">{song.artist}</p>
                      </div>
                      {song.duration && <p className="text-xs text-gray-600 flex-shrink-0">{song.duration}</p>}
                      {currentUrl === song.url && <span style={{ color: 'var(--gold)', fontSize: 10 }}>✓</span>}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <p className="text-xs text-gray-500">Koleksi lagu preset belum tersedia</p>
          <p className="text-xs text-gray-600 mt-1">Upload lagu sendiri di atas</p>
        </div>
      )}
    </div>
  )
}
