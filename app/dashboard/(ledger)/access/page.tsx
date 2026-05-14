import { createSupabaseServiceClient } from '@/lib/supabase-server'
import AccessClient from './AccessClient'

export const revalidate = 60

export default async function AccessPage() {
  const supabase = createSupabaseServiceClient()

  const [{ data: config }, { data: notes }, { data: loginHistory }] = await Promise.all([
    supabase.from('kira_founder_config').select('*').eq('id', 1).single(),
    supabase.from('kira_founder_notes').select('*').eq('id', 1).single(),
    supabase.from('kira_founder_logins').select('*').order('ts', { ascending: false }).limit(20),
  ])

  return (
    <AccessClient
      clickCount={config?.click_count ?? 3}
      notes={notes?.body ?? ''}
      loginHistory={loginHistory ?? []}
    />
  )
}
