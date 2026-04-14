import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createAdmin } from '@supabase/supabase-js'

export async function DELETE() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Use service role to delete auth user (cascades to profiles + invitations via FK)
    const admin = createAdmin(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { error } = await admin.auth.admin.deleteUser(user.id)
    if (error) throw error

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Delete account error:', err)
    return NextResponse.json({ error: 'Gagal menghapus akun' }, { status: 500 })
  }
}
