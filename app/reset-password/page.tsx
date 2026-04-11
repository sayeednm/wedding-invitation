'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) { setError('Password tidak sama'); return }
    if (password.length < 6) { setError('Password minimal 6 karakter'); return }
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6"
      style={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1B4332 50%, #0D1B2A 100%)' }}>
      <div className="glass rounded-3xl p-8 w-full max-w-md text-center">
        <p className="font-script text-4xl mb-2" style={{ color: 'var(--gold)' }}>Password Baru</p>
        <p className="text-gray-400 text-sm mb-8" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16 }}>
          Buat password baru untuk akunmu
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
            placeholder="Password baru (min. 6 karakter)"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 transition-colors"
            style={{ borderColor: 'rgba(201,168,76,0.2)' }}/>
          <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required
            placeholder="Konfirmasi password"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 transition-colors"
            style={{ borderColor: 'rgba(201,168,76,0.2)' }}/>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-full font-medium transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: '#0D1B2A' }}>
            {loading ? 'Menyimpan...' : 'Simpan Password Baru'}
          </button>
        </form>
      </div>
    </div>
  )
}
