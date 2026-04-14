import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Simple admin stats endpoint — protected by ADMIN_SECRET env var
export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-admin-secret')
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const [
    { count: totalUsers },
    { count: premiumUsers },
    { count: totalInvitations },
    { count: publishedInvitations },
    { count: totalGuests },
    { count: totalRsvp },
    { count: totalOrders },
    { count: successOrders },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('is_premium', true),
    supabase.from('invitations').select('*', { count: 'exact', head: true }),
    supabase.from('invitations').select('*', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('guests').select('*', { count: 'exact', head: true }),
    supabase.from('guestbook').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'success'),
  ])

  // Recent signups (last 7 days)
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const { count: newUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', sevenDaysAgo)

  const revenue = (successOrders || 0) * 99000

  return NextResponse.json({
    users: { total: totalUsers, premium: premiumUsers, newLast7Days: newUsers },
    invitations: { total: totalInvitations, published: publishedInvitations },
    engagement: { guests: totalGuests, rsvp: totalRsvp },
    revenue: { orders: totalOrders, successOrders, totalRp: revenue },
  }, { headers: { 'Cache-Control': 'no-store' } })
}
