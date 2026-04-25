import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

function extractPublicId(url: string): string | null {
  try {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-z]+)?$/)
    return match ? match[1] : null
  } catch {
    return null
  }
}

export async function DELETE() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const admin = createAdmin(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Ambil semua URL foto milik user sebelum hapus
    try {
      const { data: invitations } = await admin
        .from('invitations')
        .select('cover_photo_url, groom_photo_url, bride_photo_url, couple_photo_url, gallery(photo_url), couple_photos(photo_url)')
        .eq('user_id', user.id)

      if (invitations?.length) {
        const urls: string[] = []
        for (const inv of invitations) {
          if (inv.cover_photo_url) urls.push(inv.cover_photo_url)
          if (inv.groom_photo_url) urls.push(inv.groom_photo_url)
          if (inv.bride_photo_url) urls.push(inv.bride_photo_url)
          if (inv.couple_photo_url) urls.push(inv.couple_photo_url)
          inv.gallery?.forEach((g: { photo_url: string }) => urls.push(g.photo_url))
          inv.couple_photos?.forEach((p: { photo_url: string }) => urls.push(p.photo_url))
        }

        const publicIds = urls.map(extractPublicId).filter(Boolean) as string[]
        if (publicIds.length) {
          await cloudinary.api.delete_resources(publicIds).catch(() => {})
        }
      }
    } catch {
      // Cloudinary cleanup gagal — lanjut hapus akun tetap jalan
    }

    const { error } = await admin.auth.admin.deleteUser(user.id)
    if (error) throw error

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Delete account error:', err)
    return NextResponse.json({ error: 'Gagal menghapus akun' }, { status: 500 })
  }
}
