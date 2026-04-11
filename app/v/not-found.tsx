import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: 'linear-gradient(180deg, #0D1B2A, #1B4332)' }}>
      <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: 48, color: 'var(--gold)' }}>
        Undangan Tidak Ditemukan
      </p>
      <p className="text-gray-400 text-sm mt-3 mb-8" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        Link undangan ini tidak valid atau belum dipublikasikan.
      </p>
      <Link href="/"
        className="px-6 py-3 rounded-full text-sm font-medium transition-all hover:opacity-90"
        style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: '#0D1B2A' }}>
        Kembali ke Beranda
      </Link>
    </div>
  )
}
