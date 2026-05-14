import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createSupabaseServiceClient } from '@/lib/supabase-server'
import { verifySessionToken, COOKIE_NAME } from '@/lib/founder-auth'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req.cookies.get(COOKIE_NAME)?.value ?? ''
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const supabase = createSupabaseServiceClient()
  const { error } = await supabase
    .from('kira_products')
    .update({
      name:             body.name,
      blurb:            body.blurb,
      price_pence:      body.price_pence,
      stripe_price_id:  body.stripe_price_id,
      status:           body.status,
      banner_active:    body.banner_active,
      long_description: body.long_description,
      updated_at:       new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Revalidate the public product page and home
  revalidatePath('/')
  revalidatePath(`/${id}`)
  revalidatePath('/training')
  revalidatePath('/nutrition')
  revalidatePath('/bundle')

  return NextResponse.json({ ok: true })
}
