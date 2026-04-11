import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan — Undangan Digital',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: '#080f0a', color: 'var(--cream)' }}>
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center"
        style={{ background: 'rgba(8,15,10,0.97)', borderBottom: '1px solid rgba(201,168,76,0.12)' }}>
        <Link href="/" className="font-script text-2xl" style={{ color: 'var(--gold)' }}>Undangan Digital</Link>
        <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">← Beranda</Link>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        <h1 className="font-serif-elegant text-4xl mb-2" style={{ color: 'var(--gold)' }}>Syarat &amp; Ketentuan</h1>
        <p className="text-gray-500 text-sm mb-10">Terakhir diperbarui: Januari 2026</p>

        <div className="space-y-8 text-gray-300" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17, lineHeight: 1.9 }}>
          <section>
            <h2 className="font-serif-elegant text-xl mb-3" style={{ color: 'var(--cream)' }}>1. Penerimaan Syarat</h2>
            <p>Dengan menggunakan layanan Undangan Digital, Anda menyetujui syarat dan ketentuan ini. Jika Anda tidak setuju, harap tidak menggunakan layanan kami.</p>
          </section>

          <section>
            <h2 className="font-serif-elegant text-xl mb-3" style={{ color: 'var(--cream)' }}>2. Layanan</h2>
            <p>Undangan Digital menyediakan platform pembuatan undangan pernikahan digital. Kami berhak mengubah, menangguhkan, atau menghentikan layanan kapan saja tanpa pemberitahuan sebelumnya.</p>
          </section>

          <section>
            <h2 className="font-serif-elegant text-xl mb-3" style={{ color: 'var(--cream)' }}>3. Pembayaran</h2>
            <p>Pembayaran bersifat sekali bayar dan tidak dapat dikembalikan setelah akun premium diaktifkan. Harga dapat berubah sewaktu-waktu dan akan diberitahukan sebelumnya.</p>
          </section>

          <section>
            <h2 className="font-serif-elegant text-xl mb-3" style={{ color: 'var(--cream)' }}>4. Konten Pengguna</h2>
            <p>Anda bertanggung jawab atas semua konten yang diunggah. Dilarang mengunggah konten yang melanggar hukum, mengandung SARA, atau melanggar hak cipta pihak lain.</p>
          </section>

          <section>
            <h2 className="font-serif-elegant text-xl mb-3" style={{ color: 'var(--cream)' }}>5. Masa Aktif</h2>
            <p>Undangan digital aktif selama akun Anda aktif. Kami berhak menonaktifkan akun yang melanggar ketentuan penggunaan.</p>
          </section>

          <section>
            <h2 className="font-serif-elegant text-xl mb-3" style={{ color: 'var(--cream)' }}>6. Batasan Tanggung Jawab</h2>
            <p>Undangan Digital tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari penggunaan layanan kami.</p>
          </section>

          <section>
            <h2 className="font-serif-elegant text-xl mb-3" style={{ color: 'var(--cream)' }}>7. Kontak</h2>
            <p>Pertanyaan mengenai syarat ini dapat dikirimkan melalui WhatsApp atau email yang tertera di halaman utama.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
