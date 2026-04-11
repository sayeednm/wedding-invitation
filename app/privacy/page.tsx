import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi — Undangan Digital',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ background: '#080f0a', color: 'var(--cream)' }}>
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center"
        style={{ background: 'rgba(8,15,10,0.97)', borderBottom: '1px solid rgba(201,168,76,0.12)' }}>
        <Link href="/" className="font-script text-2xl" style={{ color: 'var(--gold)' }}>Undangan Digital</Link>
        <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">← Beranda</Link>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        <h1 className="font-serif-elegant text-4xl mb-2" style={{ color: 'var(--gold)' }}>Kebijakan Privasi</h1>
        <p className="text-gray-500 text-sm mb-10">Terakhir diperbarui: Januari 2026</p>

        <div className="space-y-8 text-gray-300" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17, lineHeight: 1.9 }}>
          <section>
            <h2 className="font-serif-elegant text-xl mb-3" style={{ color: 'var(--cream)' }}>1. Data yang Kami Kumpulkan</h2>
            <p>Kami mengumpulkan data yang Anda berikan saat mendaftar (email, nama) dan data undangan yang Anda buat (nama mempelai, tanggal, foto, dll).</p>
          </section>

          <section>
            <h2 className="font-serif-elegant text-xl mb-3" style={{ color: 'var(--cream)' }}>2. Penggunaan Data</h2>
            <p>Data Anda digunakan untuk menyediakan layanan undangan digital, memproses pembayaran, dan mengirimkan informasi terkait layanan. Kami tidak menjual data Anda kepada pihak ketiga.</p>
          </section>

          <section>
            <h2 className="font-serif-elegant text-xl mb-3" style={{ color: 'var(--cream)' }}>3. Penyimpanan Data</h2>
            <p>Data disimpan secara aman menggunakan Supabase dengan enkripsi standar industri. Foto yang diunggah disimpan di cloud storage yang aman.</p>
          </section>

          <section>
            <h2 className="font-serif-elegant text-xl mb-3" style={{ color: 'var(--cream)' }}>4. Cookies</h2>
            <p>Kami menggunakan cookies untuk menjaga sesi login Anda. Anda dapat menonaktifkan cookies di browser, namun beberapa fitur mungkin tidak berfungsi.</p>
          </section>

          <section>
            <h2 className="font-serif-elegant text-xl mb-3" style={{ color: 'var(--cream)' }}>5. Hak Pengguna</h2>
            <p>Anda berhak mengakses, mengubah, atau menghapus data pribadi Anda kapan saja dengan menghubungi kami.</p>
          </section>

          <section>
            <h2 className="font-serif-elegant text-xl mb-3" style={{ color: 'var(--cream)' }}>6. Kontak</h2>
            <p>Pertanyaan mengenai privasi dapat dikirimkan melalui WhatsApp atau email yang tertera di halaman utama.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
