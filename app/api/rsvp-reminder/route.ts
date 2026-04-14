import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createAdmin } from '@supabase/supabase-js'

// POST /api/rsvp-reminder — kirim reminder ke pemilik undangan
// Body: { invitationId: string }
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { invitationId } = await req.json()
    if (!invitationId) return NextResponse.json({ error: 'invitationId required' }, { status: 400 })

    const admin = createAdmin(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Verify ownership
    const { data: invitation } = await admin
      .from('invitations')
      .select('id, slug, groom_name, bride_name, event_date, user_id')
      .eq('id', invitationId)
      .eq('user_id', user.id)
      .single()

    if (!invitation) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    // Get guests who haven't responded
    const { data: guests } = await admin
      .from('guests')
      .select('name')
      .eq('invitation_id', invitationId)

    const { data: guestbook } = await admin
      .from('guestbook')
      .select('guest_name')
      .eq('invitation_id', invitationId)

    const respondedNames = new Set((guestbook || []).map(g => g.guest_name.toLowerCase()))
    const notResponded = (guests || []).filter(g => !respondedNames.has(g.name.toLowerCase()))

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) return NextResponse.json({ error: 'Email not configured' }, { status: 500 })

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://undangandigital.com'
    const eventDate = invitation.event_date
      ? new Date(invitation.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
      : ''

    const guestListHtml = notResponded.length > 0
      ? `<p style="color:#9ca3af;font-size:14px;margin-bottom:8px;">Tamu yang belum konfirmasi (${notResponded.length} orang):</p>
         <ul style="color:#d1d5db;font-size:13px;padding-left:16px;">${notResponded.slice(0, 20).map(g => `<li>${g.name}</li>`).join('')}${notResponded.length > 20 ? `<li>...dan ${notResponded.length - 20} lainnya</li>` : ''}</ul>`
      : `<p style="color:#4ade80;font-size:14px;">Semua tamu sudah konfirmasi kehadiran! 🎉</p>`

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${resendApiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Undangan Digital <onboarding@resend.dev>',
        to: user.email,
        subject: `📊 Rekap RSVP — ${invitation.groom_name} & ${invitation.bride_name}`,
        html: `
          <div style="font-family:Georgia,serif;max-width:500px;margin:0 auto;padding:24px;background:#0D1B2A;color:#FDF8F0;border-radius:12px;">
            <h2 style="color:#C9A84C;font-size:22px;margin-bottom:4px;">Rekap RSVP Undangan</h2>
            <p style="color:#9ca3af;font-size:14px;margin-bottom:20px;">${invitation.groom_name} & ${invitation.bride_name}${eventDate ? ` · ${eventDate}` : ''}</p>
            <div style="background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:16px;margin-bottom:16px;">
              <p style="font-size:14px;color:#d1d5db;margin:0 0 4px;">Total tamu terdaftar: <strong style="color:#C9A84C">${guests?.length || 0}</strong></p>
              <p style="font-size:14px;color:#d1d5db;margin:0 0 12px;">Sudah konfirmasi: <strong style="color:#4ade80">${guestbook?.length || 0}</strong></p>
              ${guestListHtml}
            </div>
            <a href="${appUrl}/dashboard/guests/${invitation.id}"
               style="display:inline-block;background:linear-gradient(135deg,#C9A84C,#E8C97A);color:#0D1B2A;padding:10px 20px;border-radius:20px;text-decoration:none;font-size:14px;font-weight:bold;">
              Kelola Tamu
            </a>
          </div>
        `,
      }),
    })

    return NextResponse.json({ ok: true, notResponded: notResponded.length })
  } catch (err) {
    console.error('RSVP reminder error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
