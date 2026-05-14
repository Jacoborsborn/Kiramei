import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import NutSidebar from './_components/NutSidebar'

export const metadata = { title: 'Nutrition Blueprint — Kira Mei' }

export default async function NutritionPortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login?redirect=/nutrition-portal')

  const { data: profile } = await supabase
    .from('profiles')
    .select('nutrition_access, programme_access, full_name, email')
    .eq('id', user.id)
    .single()

  if (!profile?.nutrition_access) redirect('/nutrition?gated=1')

  const firstName = profile.full_name?.split(' ')[0] || user.email?.split('@')[0] || 'there'
  const hasTraining = !!profile.programme_access

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', color: 'var(--ink)' }}>
      <NutSidebar firstName={firstName} userEmail={user.email ?? ''} hasTraining={hasTraining} />
      <main
        className="nutrition-main"
        style={{ minHeight: '100vh', padding: '48px 32px 80px', color: 'var(--ink)' }}
      >
        {children}
      </main>
      <style>{`
        @media (min-width: 880px) {
          .nutrition-sidebar { display: flex !important; }
          .nutrition-mobile-header { display: none !important; }
          .nutrition-main { margin-left: 236px !important; }
        }
      `}</style>
    </div>
  )
}
