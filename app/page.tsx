'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import PhoneMockup from '@/components/landing/PhoneMockup'

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0
        const step = Math.ceil(to / 60)
        const timer = setInterval(() => {
          start += step
          if (start >= to) { setCount(to); clearInterval(timer) }
          else setCount(start)
        }, 20)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [to])
  return <span ref={ref}>{count.toLocaleString('id-ID')}{suffix}</span>
}

// ── Star ornament ─────────────────────────────────────────────────────────────
function Star({ size = 16, color = '#C9A84C', opacity = 0.8 }: { size?: number; color?: string; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" fill={color} opacity={opacity}/>
    </svg>
  )
}

// ── Section reveal ────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  )
}

const gold = '#C9A84C'
const goldLight = '#E8C97A'

const features = [
  { icon: '✦', title: 'Nama Tamu Personal', desc: 'Setiap tamu menerima undangan dengan namanya sendiri via link unik — terasa eksklusif' },
  { icon: '🎨', title: '8 Tema Premium', desc: 'Luxury Gold, Midnight Elegance, Bali Tropical, dan 5 lainnya — semua dirancang detail' },
  { icon: '📸', title: 'Galeri Foto', desc: 'Upload hingga 20 foto prewedding yang ditampilkan elegan dengan animasi halus' },
  { icon: '🎵', title: '9 Lagu Preset', desc: 'Pilih dari koleksi lagu romantis siap pakai — A Thousand Years, Komang, Cinta Terakhir & lebih' },
  { icon: '🎬', title: 'Video Prewedding', desc: 'Embed video YouTube langsung di undangan, tamu bisa nonton tanpa keluar halaman' },
  { icon: '💌', title: 'Buku Tamu Digital', desc: 'Tamu kirim ucapan dan konfirmasi kehadiran — semua tercatat rapi di dashboard' },
  { icon: '💳', title: 'Amplop Digital', desc: 'Rekening bank & QRIS untuk hadiah pernikahan, praktis tanpa perlu transfer manual' },
  { icon: '💞', title: 'Love Story', desc: 'Ceritakan perjalanan cinta kalian dalam timeline yang indah dan mengharukan' },
  { icon: '📍', title: 'Navigasi Maps', desc: 'Tamu langsung bisa buka Google Maps ke lokasi akad & resepsi dengan satu klik' },
  { icon: '👗', title: 'Dresscode', desc: 'Informasikan kode berpakaian dengan tampilan warna yang elegan dan jelas' },
  { icon: '🔴', title: 'Live Streaming', desc: 'Bagikan link streaming untuk tamu yang tidak bisa hadir secara langsung' },
  { icon: '⏱', title: 'Hitung Mundur', desc: 'Countdown real-time menuju hari bahagiamu yang bikin tamu makin antusias' },
]

const steps = [
  { num: '01', title: 'Daftar & Bayar', desc: 'Buat akun gratis, aktifkan akses premium sekali bayar selamanya' },
  { num: '02', title: 'Pilih Tema', desc: 'Pilih dari 8 tema premium yang tersedia sesuai selera' },
  { num: '03', title: 'Isi Data', desc: 'Lengkapi data mempelai, foto, musik, dan semua detail acara' },
  { num: '04', title: 'Bagikan', desc: 'Publikasi dan kirim link personal ke setiap tamu undangan' },
]

const faqs = [
  { q: 'Apakah bisa diedit setelah dibuat?', a: 'Ya, kamu bisa edit kapan saja dan sebanyak apapun selama akun aktif.' },
  { q: 'Berapa lama undangan bisa diakses?', a: 'Undangan aktif selamanya selama akun kamu masih aktif.' },
  { q: 'Apakah bisa kirim ke banyak tamu?', a: 'Ya, satu undangan bisa disebar ke tamu tanpa batas dengan nama personal masing-masing.' },
  { q: 'Bagaimana jika belum punya foto prewedding?', a: 'Tidak masalah, kamu bisa isi data dulu dan upload foto belakangan.' },
  { q: 'Apakah ada biaya tambahan?', a: 'Tidak ada. Bayar sekali Rp 99.000, semua fitur langsung bisa digunakan.' },
  { q: 'Bagaimana cara kirim ke tamu?', a: 'Gunakan fitur Kelola Tamu untuk generate link personal per tamu dan kirim via WhatsApp.' },
]

const testimonials = [
  { name: 'Rizky & Amara', date: 'Des 2025', text: 'Undangannya cantik banget! Banyak tamu yang tanya buat di mana. Prosesnya gampang, langsung jadi dalam 10 menit.', theme: 'Luxury Gold', initial: 'RA' },
  { name: 'Dimas & Putri', date: 'Jan 2026', text: 'Suka banget sama tema Midnight Elegance. Elegan dan modern. Fitur nama tamu personalnya keren, tamu jadi merasa spesial.', theme: 'Midnight', initial: 'DP' },
  { name: 'Fajar & Sari', date: 'Feb 2026', text: 'Worth it banget! Harga terjangkau tapi kualitasnya premium. Galeri foto dan love story-nya bikin undangan makin berkesan.', theme: 'Floral', initial: 'FS' },
]

const themes = [
  { id: 'luxury', name: 'Luxury Gold', bg: 'linear-gradient(135deg, #071a0e, #1B4332)', accent: '#C9A84C' },
  { id: 'floral', name: 'Floral Romance', bg: 'linear-gradient(135deg, #0d0509, #3d1a2e)', accent: '#f9a8d4' },
  { id: 'midnight', name: 'Midnight Elegance', bg: 'linear-gradient(135deg, #010409, #0f172a)', accent: '#818cf8' },
  { id: 'royal', name: 'Royal Burgundy', bg: 'linear-gradient(135deg, #0d0205, #4a0e20)', accent: '#C9A84C' },
  { id: 'rustic', name: 'Rustic Garden', bg: 'linear-gradient(135deg, #0f0a05, #2d1f0e)', accent: '#a3c47a' },
  { id: 'celestial', name: 'Celestial Silver', bg: 'linear-gradient(135deg, #020202, #111111)', accent: '#C0C0C0' },
  { id: 'bali', name: 'Bali Tropical', bg: 'linear-gradient(135deg, #0a0500, #2d1a00)', accent: '#e07b39' },
  { id: 'ivory', name: 'Minimalist Ivory', bg: 'linear-gradient(135deg, #0e0c0a, #252018)', accent: '#d4c5a9' },
]

export default function HomePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [stats, setStats] = useState({ invitations: 0, guests: 0 })

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(d => setStats(d)).catch(() => {})
  }, [])

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: '#080f0a', color: 'var(--cream)' }}>

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center"
        style={{ background: 'rgba(8,15,10,0.95)', borderBottom: '1px solid rgba(201,168,76,0.12)', backdropFilter: 'blur(12px)' }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2">
          <Star size={14} color={gold}/>
          <span className="font-script text-2xl" style={{ color: gold }}>Undangan Digital</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-4 items-center">
          <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors hidden md:block">Masuk</Link>
          <Link href="/register"
            className="px-5 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${gold}, ${goldLight})`, color: '#080f0a', boxShadow: `0 0 20px ${gold}30` }}>
            Mulai Gratis
          </Link>
        </motion.div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }} transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, #1B4332, transparent)' }}/>
          <motion.div animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 11, repeat: Infinity }}
            className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, ${gold}22, transparent)` }}/>
          {/* Floating stars */}
          {[...Array(8)].map((_, i) => (
            <motion.div key={i} style={{ position: 'absolute', left: `${10 + i * 11}%`, top: `${15 + (i % 4) * 18}%` }}
              animate={{ y: [-8, 8, -8], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}>
              <Star size={8 + (i % 3) * 4} color={gold} opacity={0.4}/>
            </motion.div>
          ))}
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs tracking-widest uppercase"
            style={{ background: `${gold}12`, border: `1px solid ${gold}30`, color: gold }}>
            <Star size={10} color={gold}/> <span className="hidden sm:inline">Platform Undangan Digital Premium</span><span className="sm:hidden">Undangan Digital Premium</span> <Star size={10} color={gold}/>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-2">
            <motion.h1 initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif-elegant text-5xl md:text-7xl font-light leading-tight" style={{ color: 'var(--cream)' }}>
              Sekali Seumur Hidup,
            </motion.h1>
          </div>
          <div className="mb-8">
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}>
              <span className="font-script block" style={{ fontSize: 'clamp(48px, 10vw, 80px)', color: gold, lineHeight: 1.2, paddingBottom: '0.1em', textShadow: `0 0 80px ${gold}40` }}>
                Rayakan dengan Elegan
              </span>
            </motion.div>
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(15px, 4vw, 18px)' }}>
            Undangan digital premium dengan 8 tema eksklusif, musik latar, galeri foto, love story, dan nama tamu personal — semua dalam satu link. Mulai dari Rp 99.000, bayar sekali, pakai selamanya.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="flex gap-4 justify-center flex-wrap">
            <Link href="/register"
              className="px-8 py-4 rounded-full font-medium text-sm transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${gold}, ${goldLight})`, color: '#080f0a', boxShadow: `0 0 40px ${gold}35`, letterSpacing: '0.05em' }}>
              Buat Undangan Sekarang
            </Link>
            <Link href="#tema"
              className="px-8 py-4 rounded-full font-medium text-sm border transition-all hover:bg-white/5"
              style={{ borderColor: `${gold}40`, color: gold }}>
              Lihat Tema ↓
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="flex justify-center gap-6 md:gap-12 mt-16 pt-10 pb-4 border-t" style={{ borderColor: `${gold}15` }}>
            {[
              [stats.invitations > 0 ? stats.invitations : 1000, '+', 'Undangan Dibuat'],
              [stats.guests > 0 ? stats.guests : 50000, '+', 'Tamu Diundang'],
              [8, '', 'Tema Premium'],
            ].map(([val, suf, label]) => (
              <div key={String(label)} className="text-center">
                <p className="font-serif-elegant text-2xl md:text-3xl" style={{ color: gold }}>
                  <Counter to={Number(val)} suffix={String(suf)}/>
                </p>
                <p className="text-xs text-gray-500 mt-1 tracking-wider">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-10" style={{ background: `linear-gradient(to bottom, ${gold}50, transparent)` }}/>
        </motion.div>
      </section>

      {/* ── FITUR ── */}
      <section className="py-24 px-6" style={{ background: 'rgba(27,67,50,0.08)' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: gold }}>Fitur Lengkap</p>
            <h2 className="font-serif-elegant text-4xl md:text-5xl" style={{ color: 'var(--cream)' }}>
              Semua yang Kamu Butuhkan
            </h2>
            <p className="text-gray-400 mt-4 max-w-lg mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17 }}>
              Satu platform, semua fitur undangan digital premium tersedia
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.04}>
                <div className="rounded-2xl p-4 text-center hover:scale-[1.03] transition-transform group cursor-default"
                  style={{ background: `${gold}06`, border: `1px solid ${gold}15` }}>
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--cream)' }}>{f.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── KENAPA BERBEDA ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: gold }}>Kenapa Pilih Kami</p>
            <h2 className="font-serif-elegant text-4xl md:text-5xl" style={{ color: 'var(--cream)' }}>
              Sekali Bayar, 8 Tema Sekaligus
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17 }}>
              Bukan bayar per tema. Dengan Rp 99.000, kamu bebas pakai semua tema kapan saja — ganti sesuka hati sampai ketemu yang paling cocok.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🎨',
                title: 'Ganti Tema Bebas',
                desc: 'Coba Luxury Gold dulu, kurang cocok? Ganti ke Bali Tropical atau Midnight Elegance. Semua 8 tema bisa dicoba tanpa biaya tambahan.',
                highlight: '8 tema, 1 harga',
              },
              {
                icon: '♾️',
                title: 'Akses Selamanya',
                desc: 'Tidak ada langganan bulanan, tidak ada biaya perpanjangan. Bayar sekali, undangan tetap aktif dan bisa diedit kapan saja selamanya.',
                highlight: 'Tidak ada biaya tersembunyi',
              },
              {
                icon: '🚀',
                title: 'Langsung Jadi',
                desc: 'Isi data, pilih tema, upload foto — undangan siap dibagikan dalam hitungan menit. Tidak perlu desainer, tidak perlu coding.',
                highlight: 'Siap dalam 10 menit',
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="rounded-3xl p-7 h-full flex flex-col relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${gold}08, transparent)`, border: `1px solid ${gold}20` }}>
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none"
                    style={{ background: `${gold}08` }}/>
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-serif-elegant text-xl mb-3" style={{ color: 'var(--cream)' }}>{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed flex-1" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 15 }}>{item.desc}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full w-fit"
                    style={{ background: `${gold}15`, color: gold, border: `1px solid ${gold}25` }}>
                    <Star size={8} color={gold}/> {item.highlight}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMA ── */}
      <section id="tema" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: gold }}>Koleksi Tema</p>
            <h2 className="font-serif-elegant text-4xl md:text-5xl" style={{ color: 'var(--cream)' }}>
              8 Tema Premium
            </h2>
            <p className="text-gray-400 mt-4 max-w-lg mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17 }}>
              Setiap tema dirancang dengan detail untuk tampilan yang memukau
            </p>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
            {themes.map((t, i) => (
              <PhoneMockup key={t.id} theme={t} index={i}/>
            ))}
          </div>
          <Reveal className="text-center mt-12">
            <Link href="/register"
              className="inline-block px-8 py-3 rounded-full text-sm font-medium transition-all hover:scale-105"
              style={{ background: `${gold}15`, color: gold, border: `1px solid ${gold}30` }}>
              Coba Semua Tema →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── CARA KERJA ── */}
      <section className="py-24 px-6" style={{ background: 'rgba(27,67,50,0.08)' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: gold }}>Cara Kerja</p>
            <h2 className="font-serif-elegant text-4xl md:text-5xl" style={{ color: 'var(--cream)' }}>
              Mudah dalam 4 Langkah
            </h2>
          </Reveal>
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* Garis connector — hanya desktop */}
            <div className="hidden md:block absolute h-px"
              style={{
                top: 28,
                left: 'calc(12.5% + 28px)',
                right: 'calc(12.5% + 28px)',
                background: `linear-gradient(to right, ${gold}20, ${gold}50, ${gold}50, ${gold}20)`,
              }}/>
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.1} className="text-center relative">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 font-serif-elegant text-xl relative z-10"
                  style={{ background: '#080f0a', border: `1px solid ${gold}30`, color: gold }}>
                  {s.num}
                </div>
                <h3 className="font-serif-elegant text-lg mb-2" style={{ color: 'var(--cream)' }}>{s.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-24 px-6">
        <Reveal className="max-w-lg mx-auto text-center">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: gold }}>Harga</p>
          <h2 className="font-serif-elegant text-4xl md:text-5xl mb-4" style={{ color: 'var(--cream)' }}>
            Satu Kali Bayar
          </h2>
          <p className="text-gray-400 mb-10" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18 }}>
            Akses penuh ke semua fitur dan tema premium, selamanya
          </p>
          <div className="rounded-3xl p-8 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${gold}0a, transparent)`, border: `1px solid ${gold}25`, boxShadow: `0 0 60px ${gold}10` }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(circle at top, ${gold}08, transparent 60%)` }}/>
            <div className="relative z-10">
              <div className="mb-2">
                <span className="text-gray-400 line-through text-sm mr-2">Rp 299.000</span>
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80' }}>Harga Perkenalan</span>
              </div>
              <div className="mb-6">
                <span className="font-serif-elegant text-7xl font-light" style={{ color: gold }}>99K</span>
                <span className="text-gray-400 ml-2 text-sm">/ selamanya</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left">
                {['8 tema premium', '9 lagu preset', 'Galeri 20 foto', 'Video prewedding', 'Love story timeline', 'Buku tamu + RSVP', 'Amplop digital', 'Live streaming', 'Nama tamu personal', 'Revisi tanpa batas'].map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <Star size={8} color={gold}/> {f}
                  </div>
                ))}
              </div>
              <Link href="/register"
                className="block w-full py-4 rounded-full font-medium text-center transition-all hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${gold}, ${goldLight})`, color: '#080f0a', boxShadow: `0 0 30px ${gold}30`, letterSpacing: '0.05em' }}>
                Mulai Sekarang
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── TESTIMONI ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: gold }}>Testimoni</p>
            <h2 className="font-serif-elegant text-4xl" style={{ color: 'var(--cream)' }}>Kata Mereka</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="glass rounded-2xl p-6 h-full flex flex-col"
                  style={{ border: `1px solid ${gold}15` }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0"
                      style={{ background: `${gold}20`, color: gold }}>
                      {t.initial}
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--cream)' }}>{t.name}</p>
                      <p className="text-xs text-gray-500">{t.date} · {t.theme}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed flex-1"
                    style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 15, fontStyle: 'italic' }}>
                    "{t.text}"
                  </p>
                  <div className="flex gap-0.5 mt-4">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} style={{ color: gold, fontSize: 12 }}>★</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6" style={{ background: 'rgba(27,67,50,0.08)' }}>
        <div className="max-w-2xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: gold }}>FAQ</p>
            <h2 className="font-serif-elegant text-4xl" style={{ color: 'var(--cream)' }}>Pertanyaan Umum</h2>
          </Reveal>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${gold}15` }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-4 flex justify-between items-center text-left transition-colors hover:bg-white/3"
                    style={{ background: openFaq === i ? `${gold}08` : 'transparent' }}>
                    <span className="text-sm font-medium" style={{ color: 'var(--cream)' }}>{faq.q}</span>
                    <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                      style={{ color: gold, fontSize: 18, lineHeight: 1 }}>+</motion.span>
                  </button>
                  <motion.div initial={false} animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                    <p className="px-6 pb-4 text-sm text-gray-400 leading-relaxed"
                      style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 15 }}>{faq.a}</p>
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <Reveal className="max-w-3xl mx-auto text-center">
          <div className="flex items-center gap-4 justify-center mb-8">
            <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(to right, transparent, ${gold}50)` }}/>
            <Star size={20} color={gold}/>
            <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(to left, transparent, ${gold}50)` }}/>
          </div>
          <h2 className="font-script mb-4" style={{ fontSize: 'clamp(40px, 8vw, 68px)', color: gold, lineHeight: 1.2, textShadow: `0 0 60px ${gold}35` }}>
            Wujudkan Undangan Impianmu
          </h2>
          <p className="text-gray-400 mb-10" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18 }}>
            Bergabung dan buat undangan pernikahan digital yang tak terlupakan
          </p>
          <Link href="/register"
            className="inline-block px-12 py-4 rounded-full font-medium transition-all hover:scale-105 text-sm"
            style={{ background: `linear-gradient(135deg, ${gold}, ${goldLight})`, color: '#080f0a', boxShadow: `0 0 50px ${gold}40`, letterSpacing: '0.08em' }}>
            Daftar Gratis Sekarang
          </Link>
          <div className="flex items-center gap-4 justify-center mt-8">
            <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(to right, transparent, ${gold}50)` }}/>
            <Star size={20} color={gold}/>
            <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(to left, transparent, ${gold}50)` }}/>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6 border-t" style={{ borderColor: `${gold}12` }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Star size={12} color={gold}/>
              <span className="font-script text-2xl" style={{ color: gold }}>Undangan Digital</span>
            </div>
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              © 2026 · Dibuat dengan cinta untuk setiap momen spesial
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link href="/login" className="hover:text-gray-300 transition-colors">Masuk</Link>
              <Link href="/register" className="hover:text-gray-300 transition-colors">Daftar</Link>
              <Link href="/terms" className="hover:text-gray-300 transition-colors">Syarat</Link>
              <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privasi</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP FLOATING BUTTON ── */}
      <a href="https://wa.me/6285111214914?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20Undangan%20Digital"
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105"
        style={{ background: '#25d366', color: 'white', boxShadow: '0 4px 20px rgba(37,211,102,0.4)' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="hidden sm:inline text-sm font-medium">Tanya Admin</span>
      </a>
    </main>
  )
}
