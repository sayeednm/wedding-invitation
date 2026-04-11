import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { count: invitations } = await supabase
      .from('invitations')
      .select('*', { count: 'exact', head: true })
      .eq('is_published', true)

    const { count: guestbook } = await supabase
      .from('guestbook')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({
      invitations: (invitations || 0) + parseInt(process.env.STATS_BASE_INVITATIONS || '0'),
      guests: (guestbook || 0) + parseInt(process.env.STATS_BASE_GUESTS || '0'),
    }, {
      headers: { 'Cache-Control': 'public, s-maxage=300' }
    })
  } catch {
    return NextResponse.json({ invitations: 0, guests: 0 })
  }
}
