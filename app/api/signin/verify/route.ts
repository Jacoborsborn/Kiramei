import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token) {
    return NextResponse.redirect(new URL('/signin?error=missing_token', req.url))
  }

  const supabase = createSupabaseServiceClient()

  const { data: row } = await supabase
    .from('magic_link_tokens')
    .select('user_id, expires_at, used_at')
    .eq('token', token)
    .single()

  if (!row) {
    return NextResponse.redirect(new URL('/signin?error=invalid_token', req.url))
  }
  if (row.used_at) {
    return NextResponse.redirect(new URL('/signin?error=token_used', req.url))
  }
  if (new Date(row.expires_at) < new Date()) {
    return NextResponse.redirect(new URL('/signin?error=token_expired', req.url))
  }

  await supabase
    .from('magic_link_tokens')
    .update({ used_at: new Date().toISOString() })
    .eq('user_id', row.user_id)
    .eq('token', token)

  await supabase
    .from('profiles')
    .update({ email_verified_at: new Date().toISOString() })
    .eq('id', row.user_id)
    .is('email_verified_at', null)

  const { data: authUser } = await supabase.auth.admin.getUserById(row.user_id)
  if (!authUser?.user?.email) {
    return NextResponse.redirect(new URL('/signin?error=user_not_found', req.url))
  }

  const { data: linkData } = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email: authUser.user.email,
  })

  if (!linkData?.properties?.action_link) {
    return NextResponse.redirect(new URL('/signin?error=link_failed', req.url))
  }

  return NextResponse.redirect(linkData.properties.action_link)
}
