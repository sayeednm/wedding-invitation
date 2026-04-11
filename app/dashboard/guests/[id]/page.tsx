import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import GuestListClient from '@/components/dashboard/GuestListClient'

export default async function GuestListPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: invitation } = await supabase
    .from('invitations')
    .select('id, slug, groom_name, bride_name, is_published')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!invitation) redirect('/dashboard')
  if (!invitation.is_published) redirect(`/dashboard/editor/${id}`)

  const [{ data: guests }, { data: guestbook }] = await Promise.all([
    supabase.from('guests').select('*').eq('invitation_id', id).order('created_at', { ascending: true }),
    supabase.from('guestbook').select('attendance_status').eq('invitation_id', id),
  ])

  const rsvpStats = {
    total: guestbook?.length || 0,
    hadir: guestbook?.filter(g => g.attendance_status === 'hadir').length || 0,
    tidak_hadir: guestbook?.filter(g => g.attendance_status === 'tidak_hadir').length || 0,
    mungkin: guestbook?.filter(g => g.attendance_status === 'mungkin').length || 0,
  }

  return (
    <GuestListClient
      invitation={invitation}
      initialGuests={guests || []}
      rsvpStats={rsvpStats}
    />
  )
}
