'use client'

import { useState, useRef, useEffect } from 'react'

export default function MusicPlayer({ url }: { url: string }) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Auto-play attempt on mount
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => {})
  }, [])

  function toggle() {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play()
      setPlaying(true)
    }
  }

  // Only support direct audio URLs (not YouTube)
  if (!url.match(/\.(mp3|ogg|wav|m4a)(\?.*)?$/i)) return null

  return (
    <>
      <audio ref={audioRef} src={url} loop />
      <button onClick={toggle}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: '#0D1B2A' }}
        aria-label={playing ? 'Pause musik' : 'Play musik'}>
        {playing ? '⏸' : '▶'}
      </button>
    </>
  )
}
