'use client'

import { useState, useRef, useEffect } from 'react'

export default function MusicPlayer({ url }: { url: string }) {
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onCanPlay = () => setReady(true)
    audio.addEventListener('canplay', onCanPlay)
    // Auto-play attempt on mount
    audio.play().then(() => setPlaying(true)).catch(() => {})
    return () => audio.removeEventListener('canplay', onCanPlay)
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

  if (!url.match(/\.(mp3|ogg|wav|m4a)(\?.*)?$/i)) return null

  return (
    <>
      <audio ref={audioRef} src={url} loop />
      {/* Sejajar dengan ShareButton di bottom-6 left-6 */}
      <button onClick={toggle}
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: '#0D1B2A', opacity: ready || playing ? 1 : 0.6 }}
        aria-label={playing ? 'Pause musik' : 'Play musik'}
        title={playing ? 'Pause musik' : 'Play musik'}>
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21"/>
          </svg>
        )}
      </button>
    </>
  )
}
