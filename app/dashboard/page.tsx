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
    .order('created_at', { ascending: false })

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

      {/* Invitations Grid */}
      {profile?.is_premium ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-400 text-sm">{invitations?.length || 0} undangan dibuat</p>
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
