'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6"
      style={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1B4332 50%, #0D1B2A 100%)' }}>
      <div className="glass rounded-3xl p-8 w-full max-w-md text-center">
        <p className="font-script text-4xl mb-2" style={{ color: 'var(--gold)' }}>Lupa Password</p>
        <p className="text-gray-400 text-sm mb-8" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16 }}>
          Masukkan email kamu dan kami akan kirim link reset password
        </p>

        {sent ? (
          <div className="py-6">
            <div className="text-4xl mb-4">📧</div>
            <p className="text-green-400 font-medium mb-2">Email terkirim!</p>
            <p className="text-gray-400 text-sm mb-6">Cek inbox kamu dan klik link reset password.</p>
            <Link href="/login" className="text-sm" style={{ color: 'var(--gold)' }}>← Kembali ke Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="Email kamu"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 transition-colors"
              style={{ borderColor: 'rgba(201,168,76,0.2)' }}
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-full font-medium transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: '#0D1B2A' }}>
              {loading ? 'Mengirim...' : 'Kirim Link Reset'}
            </button>
            <Link href="/login" className="block text-sm text-gray-400 hover:text-gray-300 transition-colors">
              ← Kembali ke Login
            </Link>
          </form>
        )}
      </div>
    </div>
  )
}
