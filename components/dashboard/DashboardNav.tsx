'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/lib/types'

export default function DashboardNav({ profile }: { profile: Profile | null }) {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <nav className="fixed top-0 w-full z-50 px-4 md:px-6 py-4 flex justify-between items-center"
      style={{ background: 'rgba(13,27,42,0.97)', borderBottom: '1px solid rgba(201,168,76,0.15)', backdropFilter: 'blur(12px)' }}>
      <Link href="/dashboard" className="font-script text-2xl flex-shrink-0" style={{ color: 'var(--gold)' }}>
        Undangan Digital
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-4">
        {profile?.is_premium && (
          <span className="text-xs px-3 py-1 rounded-full flex-shrink-0"
            style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.3)' }}>
            ✦ Premium
          </span>
        )}
        <span className="text-sm text-gray-400 max-w-[180px] truncate">{profile?.email}</span>
        <Link href="/dashboard/profile" className="text-sm text-gray-400 hover:text-white transition-colors">
          Profil
        </Link>
        <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-white transition-colors">
          Keluar
        </button>
      </div>

      {/* Mobile hamburger */}
      <button onClick={() => setMenuOpen(o => !o)}
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors hover:bg-white/5"
        aria-label="Menu">
        {menuOpen ? (
          <span style={{ color: 'var(--gold)', fontSize: 20, lineHeight: 1 }}>✕</span>
        ) : (
          <div className="flex flex-col gap-1.5">
            <span className="block w-5 h-0.5" style={{ background: '#9ca3af' }} />
            <span className="block w-5 h-0.5" style={{ background: '#9ca3af' }} />
            <span className="block w-5 h-0.5" style={{ background: '#9ca3af' }} />
          </div>
        )}
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden py-3 px-4 flex flex-col gap-1"
          style={{ background: 'rgba(13,27,42,0.99)', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
          {profile?.is_premium && (
            <span className="text-xs px-3 py-1.5 rounded-full w-fit mb-1"
              style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.3)' }}>
              ✦ Premium
            </span>
          )}
          <p className="text-xs text-gray-500 px-1 truncate mb-1">{profile?.email}</p>
          <Link href="/dashboard" onClick={() => setMenuOpen(false)}
            className="text-sm text-gray-300 hover:text-white transition-colors py-2 px-1 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            Dashboard
          </Link>
          <Link href="/dashboard/profile" onClick={() => setMenuOpen(false)}
            className="text-sm text-gray-300 hover:text-white transition-colors py-2 px-1 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            Profil
          </Link>
          <Link href="/dashboard/archived" onClick={() => setMenuOpen(false)}
            className="text-sm text-gray-300 hover:text-white transition-colors py-2 px-1 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            Arsip
          </Link>
          <button onClick={() => { setMenuOpen(false); handleLogout() }}
            className="text-sm text-red-400 hover:text-red-300 transition-colors py-2 px-1 text-left">
            Keluar
          </button>
        </div>
      )}
    </nav>
  )
}
