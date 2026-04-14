'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { formatDate } from '@/lib/utils'

interface ArchivedInvitation {
  id: string
  slug: string
  groom_name: string | null
  bride_name: string | null
  event_date: string | null
  is_published: boolean
  created_at: string
}

export default function ArchivedClient({ invitations }: { invitations: ArchivedInvitation[] }) {
  const [list, setList] = useState(invitations)
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()

  async function restore(id: string) {
    setLoading(id)
    const supabase = createClient()
    await supabase.from('invitations').update({ is_archived: false }).eq('id', id)
    setList(prev => prev.filter(i => i.id !== id))
    setLoading(null)
    router.refresh()
  }

  async function deleteForever(id: string) {
    if (!confirm('Hapus permanen? Undangan tidak bisa dipulihkan.')) return
    setLoading(id)
    const supabase = createClient()
    await supabase.from('invitations').delete().eq('id', id)
    setList(prev => prev.filter(i => i.id !== id))
    setLoading(null)
  }

  if (!list.length) {
    return (
      <div className="glass rounded-2xl p-12 text-center opacity-50">
        <p className="font-script text-3xl mb-2" style={{ color: 'var(--gold)' }}>Tidak ada arsip</p>
        <p className="text-sm text-gray-400">Undangan yang diarsipkan akan muncul di sini</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {list.map(inv => (
        <div key={inv.id} className="glass rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-serif-elegant text-lg" style={{ color: 'var(--cream)' }}>
              {inv.groom_name || '—'} &amp; {inv.bride_name || '—'}
            </p>
            {inv.event_date && (
              <p className="text-xs text-gray-500 mt-0.5">{formatDate(inv.event_date)}</p>
            )}
            <span className={`text-xs mt-1 inline-block ${inv.is_published ? 'text-green-400' : 'text-gray-500'}`}>
              {inv.is_published ? 'Publik' : 'Draft'}
            </span>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button onClick={() => restore(inv.id)} disabled={loading === inv.id}
              className="px-3 py-1.5 rounded-lg text-xs transition-all hover:opacity-80 disabled:opacity-40"
              style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.2)' }}>
              {loading === inv.id ? '...' : '↩ Pulihkan'}
            </button>
            <button onClick={() => deleteForever(inv.id)} disabled={loading === inv.id}
              className="px-3 py-1.5 rounded-lg text-xs transition-all hover:opacity-80 disabled:opacity-40"
              style={{ background: 'rgba(239,68,68,0.12)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>
              🗑 Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
