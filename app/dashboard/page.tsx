import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import DashboardInvitationCard from '@/components/dashboard/DashboardInvitationCard'
import PaymentButton from '@/components/dashboard/PaymentButton'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const { data: invitations } = await supabase
    .from('invitations')
    .select('*, guestbook(attendance_status)')
    .eq('user_id', user.id)
    .eq('is_archived', false)
    .order('created_at', { ascending: false })

  const { data: archivedInvitations } = await supabase
    .from('invitations')
    .select('id')
    .eq('user_id', user.id)
    .eq('is_archived', true)

  // Global stats across all invitations
  const totalRsvp = invitations?.reduce((sum, inv) => sum + (inv.guestbook?.length || 0), 0) || 0
  const totalHadir = invitations?.reduce((sum, inv) =>
    sum + (inv.guestbook?.filter((g: { attendance_status: string }) => g.attendance_status === 'hadir').length || 0), 0) || 0

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm tracking-widest uppercase mb-1" style={{ color: 'var(--gold)' }}>Dashboard</p>
        <h1 className="font-serif-elegant text-3xl" style={{ color: 'var(--cream)' }}>Undangan Saya</h1>
      </div>

      {/* Premium Banner */}
      {!profile?.is_premium && (
        <div className="glass rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(201,168,76,0.3)' }}>
          <div>
            <h2 className="font-serif-elegant text-xl mb-1" style={{ color: 'var(--gold)' }}>Aktifkan Akses Premium</h2>
            <p className="text-gray-400 text-sm">Bayar sekali, buat undangan selamanya. Hanya Rp 99.000</p>
          </div>
          <PaymentButton userId={user.id} userEmail={user.email!} />
        </div>
      )}

      {/* Global Stats */}
      {profile?.is_premium && (invitations?.length || 0) > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass rounded-2xl p-4 text-center">
            <p className="text-2xl font-serif-elegant" style={{ color: 'var(--gold)' }}>{invitations?.length || 0}</p>
            <p className="text-xs text-gray-500 mt-1">Undangan</p>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <p className="text-2xl font-serif-elegant text-green-400">{totalHadir}</p>
            <p className="text-xs text-gray-500 mt-1">Konfirmasi Hadir</p>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <p className="text-2xl font-serif-elegant" style={{ color: 'var(--gold)' }}>{totalRsvp}</p>
            <p className="text-xs text-gray-500 mt-1">Total RSVP</p>
          </div>
        </div>
      )}

      {/* Invitations Grid */}
      {profile?.is_premium ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <p className="text-gray-400 text-sm">{invitations?.length || 0} undangan aktif</p>
              {(archivedInvitations?.length || 0) > 0 && (
                <Link href="/dashboard/archived" className="text-xs text-gray-600 hover:text-gray-400 transition-colors underline">
                  {archivedInvitations?.length} diarsipkan
                </Link>
              )}
            </div>
            <Link href="/dashboard/editor/new"
              className="px-5 py-2 rounded-full text-sm font-medium transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: '#0D1B2A' }}>
              + Buat Undangan
            </Link>
          </div>

          {invitations && invitations.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {invitations.map(inv => (
                <DashboardInvitationCard key={inv.id} invitation={inv} />
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl p-12 text-center">
              <p className="font-script text-4xl mb-3" style={{ color: 'var(--gold)' }}>Belum ada undangan</p>
              <p className="text-gray-400 text-sm mb-6">Mulai buat undangan pertamamu sekarang</p>
              <Link href="/dashboard/editor/new"
                className="px-6 py-3 rounded-full text-sm font-medium transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: '#0D1B2A' }}>
                Buat Undangan Pertama
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="glass rounded-2xl p-12 text-center opacity-50">
          <p className="font-serif-elegant text-xl" style={{ color: 'var(--cream)' }}>Aktifkan premium untuk mulai membuat undangan</p>
        </div>
      )}
    </div>
  )
}
