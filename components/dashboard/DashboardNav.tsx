'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/lib/types'

export default function DashboardNav({ profile }: { profile: Profile | null }) {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center"
      style={{ background: 'rgba(13,27,42,0.97)', borderBottom: '1px solid rgba(201,168,76,0.15)', backdropFilter: 'blur(12px)' }}>
      <Link href="/dashboard" className="font-script text-2xl" style={{ color: 'var(--gold)' }}>
        Undangan Digital
      </Link>
      <div className="flex items-center gap-4">
        {profile?.is_premium && (
          <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.3)' }}>
            ✦ Premium
          </span>
        )}
        <span className="text-sm text-gray-400 hidden md:block">{profile?.email}</span>
        <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-white transition-colors">
          Keluar
        </button>
      </div>
    </nav>
  )
}
