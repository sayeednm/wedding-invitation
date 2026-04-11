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

  return <GuestListClient invitation={invitation} />
}
