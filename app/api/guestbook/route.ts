import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { rateLimit } from '@/lib/rateLimit'

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  // 5 submissions per 10 minutes per IP
  if (!rateLimit(`guestbook:${ip}`, 5, 10 * 60_000)) {
    return NextResponse.json({ error: 'Terlalu banyak permintaan. Coba lagi nanti.' }, { status: 429 })
  }

  try {
    const body = await req.json()
    const { invitation_id, guest_name, message, attendance_status } = body

    if (!invitation_id || !guest_name?.trim()) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 })
    }

    // Sanitize inputs
    const sanitizedName = guest_name.trim().slice(0, 100)
    const sanitizedMessage = (message || '').trim().slice(0, 500)
    const validStatus = ['hadir', 'tidak_hadir', 'mungkin'].includes(attendance_status)
      ? attendance_status
      : 'mungkin'

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Verify invitation is published
    const { data: inv } = await supabase
      .from('invitations')
      .select('id')
      .eq('id', invitation_id)
      .eq('is_published', true)
      .single()

    if (!inv) {
      return NextResponse.json({ error: 'Undangan tidak ditemukan' }, { status: 404 })
    }

    const { data, error } = await supabase
      .from('guestbook')
      .insert({ invitation_id, guest_name: sanitizedName, message: sanitizedMessage, attendance_status: validStatus })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ data })
  } catch (err) {
    console.error('Guestbook error:', err)
    return NextResponse.json({ error: 'Gagal mengirim ucapan' }, { status: 500 })
  }
}
