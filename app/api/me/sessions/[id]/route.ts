import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseServiceClient } from '@/lib/supabase-server'

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const all = req.nextUrl.searchParams.get('all') === 'true'
  const service = createSupabaseServiceClient()

  if (all) {
    await service
      .from('user_sessions')
      .delete()
      .eq('user_id', user.id)
      .neq('id', id)
  } else {
    await service
      .from('user_sessions')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)
  }

  return NextResponse.json({ ok: true })
}
