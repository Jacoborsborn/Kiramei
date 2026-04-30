import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  try {
    const { lead_id, token, password } = await req.json()

    if (!lead_id || !token || !password || password.length < 8) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const supabase = createSupabaseServiceClient()

    // Verify token matches lead
    const { data: lead, error } = await supabase
      .from('kira_leads')
      .select('email, user_id, activation_token')
      .eq('id', lead_id)
      .single()

    if (error || !lead) {
      return NextResponse.json({ error: 'Invalid activation link' }, { status: 400 })
    }

    if (lead.activation_token !== token) {
      return NextResponse.json({ error: 'This activation link has expired or is invalid' }, { status: 400 })
    }

    const userId = lead.user_id as string
    if (!userId) {
      return NextResponse.json({ error: 'Account not found' }, { status: 400 })
    }

    // Set the user's password
    const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
      password,
    })

    if (updateError) {
      console.error('Password update error:', updateError)
      return NextResponse.json({ error: 'Failed to set password' }, { status: 500 })
    }

    // Clear activation token so link can't be reused
    await supabase
      .from('kira_leads')
      .update({ activation_token: null })
      .eq('id', lead_id)

    return NextResponse.json({ email: lead.email })
  } catch (err) {
    console.error('Activate error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
