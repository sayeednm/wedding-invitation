import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import RSVPClient from '@/components/dashboard/RSVPClient'

export default async function RSVPPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: invitation } = await supabase
    .from('invitations')
    .select('id, slug, groom_name, bride_name')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!invitation) redirect('/dashboard')

  const { data: guestbook } = await supabase
    .from('guestbook')
    .select('*')
    .eq('invitation_id', id)
    .order('created_at', { ascending: false })

  return <RSVPClient invitation={invitation} entries={guestbook || []} />
}
