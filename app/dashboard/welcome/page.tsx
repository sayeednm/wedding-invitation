'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const steps = [
  { num: '01', icon: '🎨', title: 'Pilih Tema', desc: 'Pilih dari 8 tema premium yang tersedia sesuai selera pernikahanmu' },
  { num: '02', icon: '✍️', title: 'Isi Data', desc: 'Lengkapi nama mempelai, tanggal, lokasi, foto, dan semua detail acara' },
  { num: '03', icon: '👁', title: 'Preview', desc: 'Lihat tampilan undangan secara real-time di panel kanan editor' },
  { num: '04', icon: '🚀', title: 'Publikasi & Bagikan', desc: 'Aktifkan undangan dan kirim link personal ke setiap tamu' },
]

export default function WelcomePage() {
  return (
    <div className="max-w-2xl mx-auto text-center py-8">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <p className="font-script text-5xl mb-3" style={{ color: 'var(--gold)' }}>Selamat Datang!</p>
        <h1 className="font-serif-elegant text-2xl mb-3" style={{ color: 'var(--cream)' }}>
          Akses Premium Kamu Sudah Aktif ✦
        </h1>
        <p className="text-gray-400 mb-10" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17 }}>
          Sekarang kamu bisa membuat undangan pernikahan digital yang tak terlupakan. Ikuti langkah berikut untuk memulai.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-10">
        {steps.map((s, i) => (
          <motion.div key={s.num}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="glass rounded-2xl p-5 text-left">
            <div className="text-2xl mb-3">{s.icon}</div>
            <p className="text-xs tracking-widest mb-1" style={{ color: 'var(--gold)' }}>{s.num}</p>
            <h3 className="font-serif-elegant text-lg mb-1" style={{ color: 'var(--cream)' }}>{s.title}</h3>
            <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
        <Link href="/dashboard/editor/new"
          className="inline-block px-10 py-4 rounded-full font-medium text-sm transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: '#0D1B2A', boxShadow: '0 0 30px rgba(201,168,76,0.3)' }}>
          ✦ Buat Undangan Pertamaku
        </Link>
        <p className="mt-4 text-xs text-gray-500">Atau <Link href="/dashboard" className="underline hover:text-gray-300">kembali ke dashboard</Link></p>
      </motion.div>
    </div>
  )
}
