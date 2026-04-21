import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Endpoint ini dipanggil oleh Supabase Database Webhook
// saat ada insert baru di tabel guestbook
export async function POST(req: NextRequest) {
  try {
    // Verifikasi webhook secret
    const secret = req.headers.get('x-webhook-secret')
    if (secret !== process.env.WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const record = body.record // data guestbook baru

    if (!record) return NextResponse.json({ ok: true })

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Ambil data undangan dan email pemilik
    const { data: invitation } = await supabase
      .from('invitations')
      .select('groom_name, bride_name, slug, user_id')
      .eq('id', record.invitation_id)
      .single()

    if (!invitation) return NextResponse.json({ ok: true })

    const { data: profile } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', invitation.user_id)
      .single()

    if (!profile?.email) return NextResponse.json({ ok: true })

    // Kirim email via Resend (atau bisa pakai SMTP lain)
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.log('RESEND_API_KEY not set, skipping email')
      return NextResponse.json({ ok: true })
    }

    const attendanceText = {
      hadir: '✅ Hadir',
      tidak_hadir: '❌ Tidak Hadir',
      mungkin: '❓ Mungkin Hadir',
    }[record.attendance_status as string] || record.attendance_status

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Undangan Digital <noreply@undangandg.click>',
        to: profile.email,
        subject: `💌 Ucapan baru dari ${record.guest_name}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 500px; margin: 0 auto; padding: 24px; background: #0D1B2A; color: #FDF8F0; border-radius: 12px;">
            <h2 style="color: #C9A84C; font-size: 24px; margin-bottom: 4px;">Ucapan Baru Masuk</h2>
            <p style="color: #9ca3af; font-size: 14px; margin-bottom: 24px;">Undangan ${invitation.groom_name} & ${invitation.bride_name}</p>
            
            <div style="background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.2); border-radius: 8px; padding: 16px; margin-bottom: 16px;">
              <p style="font-size: 16px; font-weight: bold; color: #C9A84C; margin: 0 0 8px 0;">${record.guest_name}</p>
              <p style="font-size: 14px; color: #d1d5db; margin: 0 0 8px 0; font-style: italic;">"${record.message || '-'}"</p>
              <p style="font-size: 13px; color: #9ca3af; margin: 0;">Kehadiran: ${attendanceText}</p>
            </div>
            
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/v/${invitation.slug}" 
               style="display: inline-block; background: linear-gradient(135deg, #C9A84C, #E8C97A); color: #0D1B2A; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-size: 14px; font-weight: bold;">
              Lihat Undangan
            </a>
          </div>
        `,
      }),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Notify RSVP error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
