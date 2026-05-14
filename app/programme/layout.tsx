import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import ProgrammeSidebar from './_components/ProgrammeSidebar'

export const metadata = { title: 'Training Blueprint — Kira Mei' }

export default async function ProgrammeLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    const headersList = await headers()
    const pathname = headersList.get('x-pathname') ?? '/programme'
    redirect(`/login?redirect=${encodeURIComponent(pathname)}`)
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('programme_access, full_name, email')
    .eq('id', user.id)
    .single()

  if (!profile?.programme_access) redirect('/pricing')

  const firstName = profile.full_name?.split(' ')[0] || user.email?.split('@')[0] || 'there'
  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', color: 'var(--ink)' }}>
      <ProgrammeSidebar firstName={firstName} userEmail={user.email ?? ''} />
      <main
        className="programme-main"
        style={{ minHeight: '100vh', padding: '48px 32px 80px' }}
      >
        {children}
      </main>
    </div>
  )
}
