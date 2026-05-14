import { NextRequest, NextResponse } from 'next/server'
import {
  buildCartAbandonedEmail,
  buildWeekCompleteEmail,
  buildWeekInactiveEmail,
  buildWeek4MilestoneEmail,
  buildGraduationEmail,
  buildPostCompletionCheckinEmail,
} from '@/app/lib/email-upsell-templates'
import {
  buildTrainingEmail,
  buildNutritionEmail,
  buildBundleEmail,
  buildActivationEmail,
} from '@/app/lib/emailTemplates'

// Dev-only preview: renders any email template as HTML in the browser.
// Usage: GET /api/email/preview/week-complete?week=3
// Protected — only accessible when NEXT_PUBLIC_APP_ENV !== 'production',
// or when a valid PREVIEW_SECRET is passed as ?secret=<value>.

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://kiramei.co.uk'
const DUMMY_UNSUB = `${BASE}/api/email/unsubscribe?uid=preview&sig=preview`

function guard(req: NextRequest): boolean {
  if (process.env.NEXT_PUBLIC_APP_ENV !== 'production') return true
  const secret = process.env.EMAIL_PREVIEW_SECRET
  return !!secret && req.nextUrl.searchParams.get('secret') === secret
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ template: string }> },
) {
  if (!guard(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { template } = await params
  const q = req.nextUrl.searchParams
  const week = parseInt(q.get('week') ?? '1', 10)

  let html: string

  switch (template) {
    case 'cart-abandoned':
      html = buildCartAbandonedEmail('Alex', 'Training Blueprint', `${BASE}/training`, DUMMY_UNSUB)
      break

    case 'week-complete':
      html = buildWeekCompleteEmail('Alex', week || 2, `${BASE}/programme/week/${(week || 2) + 1}`)
      break

    case 'week-inactive':
      html = buildWeekInactiveEmail('Alex', week || 3, `${BASE}/programme/week/${week || 3}`)
      break

    case 'week-4-halfway':
      html = buildWeek4MilestoneEmail('Alex', `${BASE}/programme/week/5`)
      break

    case 'week-8-graduation':
      html = buildGraduationEmail('Alex', {
        rerunUrl:        `${BASE}/programme/week/1`,
        advancedPlanUrl: `${BASE}/advanced-plan`,
        referUrl:        `${BASE}/r/KM7B3X`,
        referralCode:    'KM7B3X',
        unsubscribeUrl:  DUMMY_UNSUB,
      })
      break

    case 'post-completion-30d':
      html = buildPostCompletionCheckinEmail('Alex', 'KM7B3X', `${BASE}/r/KM7B3X`, DUMMY_UNSUB)
      break

    case 'training-receipt':
      html = buildTrainingEmail('Alex', `${BASE}/login`)
      break

    case 'nutrition-receipt':
      html = buildNutritionEmail('Alex', `${BASE}/login`)
      break

    case 'bundle-receipt':
      html = buildBundleEmail('Alex', `${BASE}/login`)
      break

    case 'activation':
      html = buildActivationEmail('Alex', `${BASE}/activate?token=preview`)
      break

    default:
      return NextResponse.json({
        error: 'Unknown template',
        available: [
          'cart-abandoned', 'week-complete?week=2', 'week-inactive?week=3',
          'week-4-halfway', 'week-8-graduation', 'post-completion-30d',
          'training-receipt', 'nutrition-receipt', 'bundle-receipt', 'activation',
        ],
      }, { status: 404 })
  }

  return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } })
}
