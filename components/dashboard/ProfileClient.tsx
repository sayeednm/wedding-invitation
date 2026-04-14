'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/lib/types'

interface Props {
  profile: Profile | null
  invitationCount: number
}

export default function ProfileClient({ profile, invitationCount }: Props) {
  const router = useRouter()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pwLoading, setPwLoading] = useState(false)
  const [pwMsg, setPwMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [deleting, setDeleting] = useState(false)

  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 transition-colors text-sm"
  const borderStyle = { borderColor: 'rgba(201,168,76,0.2)' }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setPwMsg({ type: 'error', text: 'Password tidak sama' })
      return
    }
    if (newPassword.length < 6) {
      setPwMsg({ type: 'error', text: 'Password minimal 6 karakter' })
      return
    }
    setPwLoading(true)
    setPwMsg(null)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) {
      setPwMsg({ type: 'error', text: error.message })
    } else {
      setPwMsg({ type: 'success', text: 'Password berhasil diubah' })
      setNewPassword('')
      setConfirmPassword('')
    }
    setPwLoading(false)
  }

  async function handleDeleteAccount() {
    if (deleteConfirm !== profile?.email) return
    setDeleting(true)
    // Call server action to delete account via service role
    const res = await fetch('/api/account/delete', { method: 'DELETE' })
    if (res.ok) {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push('/')
    } else {
      alert('Gagal menghapus akun. Coba lagi.')
      setDeleting(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-8">
        <Link href="/dashboard" className="text-xs text-gray-500 hover:text-gray-300 transition-colors mb-3 inline-block">
          ← Kembali ke Dashboard
        </Link>
        <p className="text-sm tracking-widest uppercase mb-1" style={{ color: 'var(--gold)' }}>Akun</p>
        <h1 className="font-serif-elegant text-3xl" style={{ color: 'var(--cream)' }}>Profil Saya</h1>
      </div>

      {/* Info akun */}
      <div className="glass rounded-2xl p-5 mb-6">
        <p className="text-xs text-gray-400 mb-3 tracking-widest uppercase">Informasi Akun</p>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Email</span>
            <span className="text-sm" style={{ color: 'var(--cream)' }}>{profile?.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Status</span>
            <span className="text-xs px-3 py-1 rounded-full"
              style={{ background: profile?.is_premium ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.05)', color: profile?.is_premium ? 'var(--gold)' : '#9ca3af', border: `1px solid ${profile?.is_premium ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.1)'}` }}>
              {profile?.is_premium ? '✦ Premium' : 'Gratis'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Undangan dibuat</span>
            <span className="text-sm" style={{ color: 'var(--cream)' }}>{invitationCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Bergabung</span>
            <span className="text-sm text-gray-400">
              {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
            </span>
          </div>
        </div>
      </div>

      {/* Ganti password */}
      <div className="glass rounded-2xl p-5 mb-6">
        <p className="text-xs text-gray-400 mb-4 tracking-widest uppercase">Ganti Password</p>
        <form onSubmit={handleChangePassword} className="space-y-3">
          <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
            className={inputClass} style={borderStyle} placeholder="Password baru (min. 6 karakter)" required />
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
            className={inputClass} style={borderStyle} placeholder="Konfirmasi password baru" required />
          {pwMsg && (
            <p className={`text-xs ${pwMsg.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{pwMsg.text}</p>
          )}
          <button type="submit" disabled={pwLoading}
            className="w-full py-2.5 rounded-full text-sm font-medium transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: '#0D1B2A' }}>
            {pwLoading ? 'Menyimpan...' : 'Simpan Password Baru'}
          </button>
        </form>
      </div>

      {/* Hapus akun */}
      <div className="glass rounded-2xl p-5" style={{ borderColor: 'rgba(239,68,68,0.2)' }}>
        <p className="text-xs text-red-400 mb-2 tracking-widest uppercase">Zona Berbahaya</p>
        <p className="text-sm text-gray-400 mb-4">Hapus akun secara permanen. Semua undangan, tamu, dan data akan dihapus dan tidak bisa dipulihkan.</p>
        <p className="text-xs text-gray-500 mb-2">Ketik email kamu untuk konfirmasi: <span className="text-gray-300">{profile?.email}</span></p>
        <input value={deleteConfirm} onChange={e => setDeleteConfirm(e.target.value)}
          className={inputClass} style={{ borderColor: 'rgba(239,68,68,0.2)' }} placeholder="Ketik email kamu" />
        <button
          onClick={handleDeleteAccount}
          disabled={deleteConfirm !== profile?.email || deleting}
          className="w-full mt-3 py-2.5 rounded-full text-sm font-medium transition-all disabled:opacity-30"
          style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>
          {deleting ? 'Menghapus...' : 'Hapus Akun Permanen'}
        </button>
      </div>
    </div>
  )
}
