import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import EditorClient from '@/components/editor/EditorClient'
import { generateSlug } from '@/lib/utils'

export default async function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  if (!profile?.is_premium) redirect('/dashboard')

  let invitation = null

  if (id === 'new') {
    // Create a new blank invitation
    const slug = generateSlug('mempelai', 'pria')
    const { data, error } = await supabase.from('invitations').insert({
      user_id: user.id,
      slug,
      template_id: 'luxury',
      bride_name: '',
      groom_name: '',
    }).select().single()

    if (error) redirect('/dashboard')
    invitation = data
    redirect(`/dashboard/editor/${data.id}`)
  } else {
    const { data } = await supabase
      .from('invitations')
      .select('*, digital_gifts(*), gallery(*), couple_photos(*)')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (!data) redirect('/dashboard')
    invitation = data
  }

  return <EditorClient invitation={invitation} userId={user.id} />
}
