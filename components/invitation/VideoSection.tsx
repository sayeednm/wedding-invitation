'use client'

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

      <div className="rounded-2xl overflow-hidden relative"
        style={{ border: `1px solid ${accentColor}25`, aspectRatio: '16/9' }}>
        {youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video Prewedding"/>
        ) : (
          <video src={videoUrl} controls className="w-full h-full object-cover"/>
        )}
      </div>
    </motion.div>
  )
}
