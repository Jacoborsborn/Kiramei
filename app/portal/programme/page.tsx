import { redirect } from 'next/navigation'
import { createSupabaseServerClient, createSupabaseServiceClient } from '@/lib/supabase-server'
import ProgrammeViewer from './_components/ProgrammeViewer'
import type { PlanJSON } from '@/lib/planEmail'

export default async function ProgrammePage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const service = createSupabaseServiceClient()
  const { data: programme } = await service
    .from('kira_programmes')
    .select('programme, sent_at')
    .eq('user_id', user.id)
    .order('sent_at', { ascending: false })
    .limit(1)
    .single()

  if (!programme) {
    return (
      <div>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 10 }}>
          My Programme
        </p>
        <h1 className="font-display" style={{ fontSize: 38, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1, marginBottom: 24 }}>
          Not ready yet.
        </h1>
        <div style={{ background: '#F4F2EE', borderRadius: 16, padding: '32px' }}>
          <p style={{ fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.7 }}>
            Your programme is being prepared. You&apos;ll receive an email as soon as it&apos;s ready, and it will appear here automatically.
          </p>
        </div>
      </div>
    )
  }

  return <ProgrammeViewer plan={programme.programme as PlanJSON} sentAt={programme.sent_at} />
}
