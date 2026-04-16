import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Undangan Digital — Platform Undangan Pernikahan Premium',
    template: '%s — Undangan Digital',
  },
  description: 'Buat undangan pernikahan digital yang elegan dan tak terlupakan. 8 tema premium, galeri foto, musik, buku tamu, dan lebih banyak fitur. Mulai dari Rp 99.000.',
  keywords: ['undangan digital', 'undangan pernikahan', 'wedding invitation', 'undangan online', 'undangan nikah digital'],
  authors: [{ name: 'Undangan Digital' }],
  creator: 'Undangan Digital',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Undangan Digital',
    title: 'Undangan Digital — Platform Undangan Pernikahan Premium',
    description: 'Buat undangan pernikahan digital yang elegan. 8 tema premium, mulai Rp 99.000.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Undangan Digital',
    description: 'Platform undangan pernikahan digital premium Indonesia.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0D1B2A',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        {/* Preconnect untuk Google Fonts agar load lebih cepat */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
