import { redirect } from 'next/navigation'
import { createSupabaseServerClient, createSupabaseServiceClient } from '@/lib/supabase-server'

type BodyComp = {
  frame_type: string | null
  body_fat_est: string | null
  hormonal_notes: string | null
  priority_areas: string | null
  measurements: Record<string, string> | null
  analysed_at: string | null
}

export default async function BodyCompPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const service = createSupabaseServiceClient()
  const { data: report } = await service
    .from('kira_body_comp')
    .select('*')
    .eq('user_id', user.id)
    .order('analysed_at', { ascending: false })
    .limit(1)
    .single() as { data: BodyComp | null }

  return (
    <div style={{ maxWidth: 680 }}>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 10 }}>
        Pro Feature
      </p>
      <h1 className="font-display" style={{ fontSize: 38, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1, marginBottom: 8 }}>
        Body Composition.
      </h1>

      {!report ? (
        <>
          <p style={{ fontSize: 15, color: 'var(--ink-muted)', marginBottom: 32 }}>
            Your body composition report is being prepared.
          </p>
          <div style={{ background: '#F4F2EE', borderRadius: 16, padding: '32px' }}>
            <p style={{ fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.7 }}>
              Once your assessment is complete, your full body composition analysis will appear here — including frame type, estimated body fat, hormonal considerations, and priority focus areas.
            </p>
          </div>
        </>
      ) : (
        <>
          {report.analysed_at && (
            <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 32 }}>
              Analysed {new Date(report.analysed_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {report.frame_type && (
              <ReportCard label="Frame Type" value={report.frame_type} />
            )}
            {report.body_fat_est && (
              <ReportCard label="Estimated Body Fat" value={report.body_fat_est} />
            )}
            {report.priority_areas && (
              <ReportCard label="Priority Focus Areas" value={report.priority_areas} />
            )}
            {report.hormonal_notes && (
              <div style={{ background: '#FDFCF9', border: '1px solid var(--border)', borderRadius: 16, padding: '24px' }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 12 }}>
                  Hormonal Considerations
                </p>
                <p style={{ fontSize: 15, color: 'var(--ink)', lineHeight: 1.75 }}>{report.hormonal_notes}</p>
              </div>
            )}

            {report.measurements && Object.keys(report.measurements).length > 0 && (
              <div style={{ background: '#FDFCF9', border: '1px solid var(--border)', borderRadius: 16, padding: '24px' }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 16 }}>
                  Measurements
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 16 }}>
                  {Object.entries(report.measurements).map(([key, val]) => (
                    <div key={key}>
                      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 4 }}>
                        {key}
                      </p>
                      <p style={{ fontSize: 18, fontWeight: 600, color: 'var(--ink)' }}>{val}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function ReportCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: '#FDFCF9', border: '1px solid var(--border)', borderRadius: 16, padding: '24px' }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 8 }}>
        {label}
      </p>
      <p className="font-display" style={{ fontSize: 22, fontWeight: 600, color: 'var(--ink)' }}>{value}</p>
    </div>
  )
}
