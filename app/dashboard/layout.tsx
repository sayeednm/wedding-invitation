import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardNav from '@/components/dashboard/DashboardNav'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1B4332 50%, #0D1B2A 100%)' }}>
      <DashboardNav profile={profile} />
      <main className="pt-20 px-4 md:px-8 pb-16 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  )
}
