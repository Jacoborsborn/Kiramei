import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import TemplatBuilder from './TemplateBuilder'
import ProgrammeSidebar from '@/app/programme/_components/ProgrammeSidebar'

export const metadata = { title: 'Build Your Plan — Kira Mei' }

export default async function TemplatePage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login?redirect=/template')

  const { data: profile } = await supabase
    .from('profiles')
    .select('template_access, programme_access, full_name, email')
    .eq('id', user.id)
    .single()

  if (!profile?.template_access && !profile?.programme_access) redirect('/')

  const firstName = profile?.full_name?.split(' ')[0] || user.email?.split('@')[0] || 'there'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', color: 'var(--ink)' }}>
      <ProgrammeSidebar firstName={firstName} userEmail={user.email ?? ''} />
      <main className="programme-main" style={{ minHeight: '100vh', padding: '48px 32px 80px' }}>
        <TemplatBuilder firstName={firstName} userEmail={profile?.email ?? user.email ?? undefined} />
      </main>
    </div>
  )
}
