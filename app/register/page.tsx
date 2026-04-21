'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback` }
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4"
        style={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1B4332 50%, #0D1B2A 100%)' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-8 w-full max-w-md text-center">
          <div className="text-5xl mb-4">✉️</div>
          <h2 className="font-serif-elegant text-2xl mb-2" style={{ color: 'var(--cream)' }}>Cek Email Anda</h2>
          <p className="text-gray-400 text-sm">Kami telah mengirim link konfirmasi ke <strong className="text-white">{email}</strong>. Silakan cek inbox Anda.</p>
          <Link href="/login" className="block mt-6 text-sm hover:underline" style={{ color: 'var(--gold)' }}>Kembali ke halaman masuk</Link>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1B4332 50%, #0D1B2A 100%)' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="font-script text-3xl" style={{ color: 'var(--gold)' }}>Undangan Digital</Link>
          <h1 className="font-serif-elegant text-2xl mt-3" style={{ color: 'var(--cream)' }}>Buat Akun Baru</h1>
          <p className="text-gray-400 text-sm mt-1">Mulai perjalanan undangan digitalmu</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 block mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 transition-colors"
              style={{ borderColor: 'rgba(201,168,76,0.2)' }} placeholder="email@contoh.com" />
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 transition-colors"
              style={{ borderColor: 'rgba(201,168,76,0.2)' }} placeholder="Minimal 6 karakter" />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-full font-medium transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: '#0D1B2A' }}>
            {loading ? 'Memproses...' : 'Daftar Sekarang'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Sudah punya akun?{' '}
          <Link href="/login" className="hover:underline" style={{ color: 'var(--gold)' }}>Masuk di sini</Link>
        </p>
      </motion.div>
    </main>
  )
}
