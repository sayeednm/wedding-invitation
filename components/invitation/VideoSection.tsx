'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  videoUrl: string
  accentColor: string
}

function getYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
  return match ? match[1] : null
}

export default function VideoSection({ videoUrl, accentColor }: Props) {
  const youtubeId = getYoutubeId(videoUrl)
  const [loaded, setLoaded] = useState(false)
  const thumbUrl = youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="px-4 py-8">
      <div className="text-center mb-6">
        <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: accentColor }}>Video</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, color: 'white' }}>Video Prewedding</h2>
      </div>

      <div className="rounded-2xl overflow-hidden relative cursor-pointer"
        style={{ border: `1px solid ${accentColor}25`, aspectRatio: '16/9' }}
        onClick={() => setLoaded(true)}>

        {youtubeId && !loaded ? (
          /* Thumbnail + play button — lazy load iframe */
          <>
            {thumbUrl && (
              <img
                src={thumbUrl}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.4)' }}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
                style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)` }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#0a0a0a">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
              </motion.div>
            </div>
            <p className="absolute bottom-3 left-0 right-0 text-center text-xs text-white/60">
              Tap untuk memutar video
            </p>
          </>
        ) : youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&autoplay=1`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video Prewedding"
          />
        ) : (
          <video src={videoUrl} controls className="w-full h-full object-cover" />
        )}
      </div>
    </motion.div>
  )
}
