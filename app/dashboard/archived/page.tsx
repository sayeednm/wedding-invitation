import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import ArchivedClient from '@/components/dashboard/ArchivedClient'

export default async function ArchivedPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: invitations } = await supabase
    .from('invitations')
    .select('id, slug, groom_name, bride_name, event_date, is_published, created_at')
    .eq('user_id', user.id)
    .eq('is_archived', true)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/dashboard" className="text-xs text-gray-500 hover:text-gray-300 transition-colors mb-3 inline-block">
          ← Kembali ke Dashboard
        </Link>
        <p className="text-sm tracking-widest uppercase mb-1" style={{ color: 'var(--gold)' }}>Arsip</p>
        <h1 className="font-serif-elegant text-3xl" style={{ color: 'var(--cream)' }}>Undangan Diarsipkan</h1>
      </div>
      <ArchivedClient invitations={invitations || []} />
    </div>
  )
}
