import { redirect } from 'next/navigation'
import { createSupabaseServerClient, createSupabaseServiceClient } from '@/lib/supabase-server'
import PortalNav from './_components/PortalNav'

export const metadata = { title: 'Client Portal — Kira Mei' }

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const service = createSupabaseServiceClient()
  const { data: lead } = await service
    .from('kira_leads')
    .select('name, plan_selected')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  const firstName = lead?.name?.split(' ')[0] ?? user.email?.split('@')[0] ?? 'Client'
  const isPro = lead?.plan_selected === 'bundle'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <PortalNav firstName={firstName} isPro={isPro} userEmail={user.email ?? ''} />
      <main style={{ flex: 1, maxWidth: 900, width: '100%', margin: '0 auto', padding: '40px 24px 80px' }}>
        {children}
      </main>
    </div>
  )
}
