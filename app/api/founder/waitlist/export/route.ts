import { NextRequest } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'
import { verifySessionToken, COOKIE_NAME } from '@/lib/founder-auth'

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value ?? ''
  if (!verifySessionToken(token)) {
    return new Response('Unauthorized', { status: 401 })
  }

  const segment = req.nextUrl.searchParams.get('segment')
  const supabase = createSupabaseServiceClient()

  let query = supabase
    .from('kira_leads')
    .select('email, plan_selected, created_at')
    .eq('status', 'waitlist')
    .order('created_at', { ascending: false })

  if (segment && segment !== 'all') {
    query = query.ilike('plan_selected', `%${segment}%`)
  }

  const { data } = await query

  const rows = (data ?? []).map(r => [
    r.email,
    r.plan_selected ?? '',
    new Date(r.created_at as string).toISOString(),
  ])

  const csv = [
    'email,plan,joined_at',
    ...rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')),
  ].join('\n')

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="waitlist${segment ? '-' + segment : ''}.csv"`,
    },
  })
}
