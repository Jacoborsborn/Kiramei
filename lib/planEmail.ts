export type Exercise = {
  name: string
  sets: number
  reps: string
  rest?: string
  notes?: string
}

export type Session = {
  day: string
  label: string
  exercises: Exercise[]
}

export type MealItem = {
  name: string
  description: string
  calories: number
  protein_g: number
}

export type Recipe = {
  name: string
  ingredients: string[]
  method: string
  macros: { calories: number; protein_g: number; carbs_g: number; fats_g: number }
}

export type Week = {
  week_number: number
  week_theme?: string
  sessions: Session[]
}

export type PlanJSON = {
  client: { name: string; age: number; gender: string; weight_kg?: number }
  programme: { title: string; personal_note: string; duration_weeks: number }
  training: {
    days_per_week: number
    split: string
    weeks?: Week[]       // Claude outputs this structure
    sessions?: Session[] // flat fallback
  }
  nutrition: {
    daily_calories: number
    protein_g: number
    carbs_g: number
    fats_g: number
    meals: MealItem[]
    recipes: Recipe[]
  }
  shopping_list: Record<string, string[]>
  check_in: { schedule: string; metrics: string[] }
}

// Returns a flat session list regardless of whether weeks or sessions is used
export function getSessions(plan: PlanJSON): Session[] {
  if (plan.training.weeks?.length) {
    return plan.training.weeks.flatMap(w => w.sessions ?? [])
  }
  return plan.training.sessions ?? []
}

export function getWeeks(plan: PlanJSON): Week[] {
  if (plan.training.weeks?.length) return plan.training.weeks
  // Wrap flat sessions in a single week for consistent rendering
  return [{ week_number: 1, sessions: plan.training.sessions ?? [] }]
}

function s(v: string | number) {
  return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function buildPlanEmail(plan: PlanJSON, leadName: string): string {
  const firstName = s(leadName.split(' ')[0])

  const macroCell = (label: string, value: number, unit: string) => `
    <td style="padding:16px;text-align:center;border-right:1px solid #E5E1D8;">
      <div style="font-size:22px;font-weight:700;color:#1A1916;font-family:Georgia,serif;">${value}</div>
      <div style="font-size:10px;color:#7A7870;text-transform:uppercase;letter-spacing:0.1em;margin-top:4px;">${label} <span style="color:#B5B0A6;">${unit}</span></div>
    </td>`

  const sectionHeader = (label: string) => `
    <tr><td style="padding:40px 0 16px;">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="font-size:10px;font-weight:700;color:#4A7C59;letter-spacing:0.14em;text-transform:uppercase;padding-bottom:8px;border-bottom:1.5px solid #4A7C59;width:auto;">${label}</td>
        <td style="border-bottom:1px solid #E5E1D8;"></td>
      </tr></table>
    </td></tr>`

  const weeks = getWeeks(plan)
  const sessionRows = weeks.flatMap(week => [
    weeks.length > 1 ? `<tr><td style="padding:8px 0 16px;font-size:12px;font-weight:700;color:#7A7870;letter-spacing:0.06em;text-transform:uppercase;">Week ${week.week_number}${week.week_theme ? ` — ${s(week.week_theme)}` : ''}</td></tr>` : '',
    ...(week.sessions ?? []).map(sess => `
    <tr><td style="padding:0 0 24px;">
      <div style="font-size:13px;font-weight:600;color:#4A7C59;margin-bottom:10px;letter-spacing:0.04em;">${s(sess.day)} — ${s(sess.label)}</div>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E5E1D8;border-radius:8px;overflow:hidden;">
        <tr style="background:#F2EFE8;">
          <td style="padding:8px 12px;font-size:10px;font-weight:700;color:#7A7870;text-transform:uppercase;letter-spacing:0.08em;">Exercise</td>
          <td style="padding:8px 12px;font-size:10px;font-weight:700;color:#7A7870;text-transform:uppercase;letter-spacing:0.08em;text-align:center;">Sets</td>
          <td style="padding:8px 12px;font-size:10px;font-weight:700;color:#7A7870;text-transform:uppercase;letter-spacing:0.08em;text-align:center;">Reps</td>
          <td style="padding:8px 12px;font-size:10px;font-weight:700;color:#7A7870;text-transform:uppercase;letter-spacing:0.08em;text-align:center;">Rest</td>
        </tr>
        ${sess.exercises.map((ex, i) => `
        <tr style="border-top:1px solid #E5E1D8;background:${i % 2 === 0 ? '#FFFFFF' : '#FAFAF8'}">
          <td style="padding:11px 12px;">
            <div style="font-size:14px;font-weight:500;color:#1A1916;">${s(ex.name)}</div>
            ${ex.notes ? `<div style="font-size:12px;color:#7A7870;margin-top:2px;">${s(ex.notes)}</div>` : ''}
          </td>
          <td style="padding:11px 12px;text-align:center;font-size:14px;color:#1A1916;">${ex.sets}</td>
          <td style="padding:11px 12px;text-align:center;font-size:14px;color:#1A1916;">${s(ex.reps)}</td>
          <td style="padding:11px 12px;text-align:center;font-size:13px;color:#7A7870;">${ex.rest ?? '—'}</td>
        </tr>`).join('')}
      </table>
    </td></tr>`)
  ]).join('')

  const mealRows = plan.nutrition.meals.map(m => `
    <tr style="border-bottom:1px solid #E5E1D8;">
      <td style="padding:12px 0;">
        <div style="font-size:14px;font-weight:600;color:#1A1916;">${s(m.name)}</div>
        <div style="font-size:13px;color:#7A7870;margin-top:2px;">${s(m.description)}</div>
      </td>
      <td style="padding:12px 0 12px 16px;text-align:right;white-space:nowrap;">
        <span style="font-size:13px;font-weight:600;color:#1A1916;">${m.calories} kcal</span>
        <span style="font-size:12px;color:#7A7870;margin-left:6px;">${m.protein_g}g protein</span>
      </td>
    </tr>`).join('')

  const recipeCards = plan.nutrition.recipes.slice(0, 2).map(r => `
    <tr><td style="padding:0 0 20px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E5E1D8;border-radius:10px;overflow:hidden;">
        <tr style="background:#F2EFE8;">
          <td style="padding:14px 16px;">
            <div style="font-size:15px;font-weight:600;color:#1A1916;">${s(r.name)}</div>
            <div style="font-size:11px;color:#4A7C59;margin-top:4px;">${r.macros.calories} kcal · ${r.macros.protein_g}g protein · ${r.macros.carbs_g}g carbs · ${r.macros.fats_g}g fats</div>
          </td>
        </tr>
        <tr><td style="padding:14px 16px;">
          <div style="font-size:12px;font-weight:700;color:#7A7870;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">Ingredients</div>
          ${r.ingredients.map(i => `<div style="font-size:13px;color:#1A1916;padding:2px 0;">· ${s(i)}</div>`).join('')}
          <div style="font-size:12px;font-weight:700;color:#7A7870;text-transform:uppercase;letter-spacing:0.08em;margin:14px 0 8px;">Method</div>
          <div style="font-size:13px;color:#1A1916;line-height:1.7;">${s(r.method)}</div>
        </td></tr>
      </table>
    </td></tr>`).join('')

  const shoppingCategories = Object.entries(plan.shopping_list).map(([cat, items]) => `
    <tr><td style="padding:0 0 20px;vertical-align:top;">
      <div style="font-size:11px;font-weight:700;color:#4A7C59;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">${s(cat)}</div>
      ${items.map(i => `<div style="font-size:13px;color:#1A1916;padding:3px 0;">· ${s(i)}</div>`).join('')}
    </td></tr>`).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title>Your programme is ready, ${firstName}.</title>
  <style>
    @media only screen and (max-width:600px){
      .outer{padding:0!important}
      .inner{padding:32px 20px!important}
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#ECEAE3;font-family:system-ui,-apple-system,'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" class="outer" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

        <!-- Pre-header spacer -->
        <tr><td style="font-size:0;line-height:0;color:#ECEAE3;">Built for you. Not a template.&nbsp;</td></tr>

        <!-- Main card -->
        <tr><td class="inner" style="background:#F8F6F1;border-radius:16px;padding:56px 48px;">
          <table width="100%" cellpadding="0" cellspacing="0">

            <!-- Name -->
            <tr><td style="padding-bottom:32px;">
              <div style="font-family:Georgia,'Cormorant Garamond',serif;font-size:56px;font-weight:600;color:#1A1916;line-height:1;letter-spacing:-0.01em;">${firstName}.</div>
            </td></tr>

            <!-- Personal note -->
            <tr><td style="padding-bottom:40px;">
              <div style="font-size:15px;line-height:1.8;color:#1A1916;font-style:italic;border-left:2px solid #4A7C59;padding-left:20px;">
                ${s(plan.programme.personal_note).replace(/\n/g, '<br>')}
              </div>
            </td></tr>

            <!-- Programme title -->
            <tr><td style="padding-bottom:8px;">
              <div style="font-size:11px;font-weight:700;color:#4A7C59;letter-spacing:0.14em;text-transform:uppercase;">Your programme</div>
            </td></tr>
            <tr><td style="padding-bottom:8px;">
              <div style="font-family:Georgia,'Cormorant Garamond',serif;font-size:36px;font-weight:600;color:#1A1916;line-height:1.1;">${s(plan.programme.title)}</div>
            </td></tr>
            <tr><td style="padding-bottom:40px;">
              <div style="font-size:13px;color:#7A7870;">${plan.programme.duration_weeks} weeks · ${plan.training.days_per_week} days per week · ${s(plan.training.split)}</div>
            </td></tr>

            <!-- Divider -->
            <tr><td style="padding-bottom:0;"><hr style="border:none;border-top:1px solid #E5E1D8;margin:0;"></td></tr>

            <!-- TRAINING -->
            ${sectionHeader('Training')}
            ${sessionRows}

            <!-- NUTRITION -->
            ${sectionHeader('Nutrition')}
            <tr><td style="padding-bottom:24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E5E1D8;border-radius:10px;overflow:hidden;">
                <tr>
                  ${macroCell('Calories', plan.nutrition.daily_calories, 'kcal')}
                  ${macroCell('Protein', plan.nutrition.protein_g, 'g')}
                  ${macroCell('Carbs', plan.nutrition.carbs_g, 'g')}
                  <td style="padding:16px;text-align:center;">
                    <div style="font-size:22px;font-weight:700;color:#1A1916;font-family:Georgia,serif;">${plan.nutrition.fats_g}</div>
                    <div style="font-size:10px;color:#7A7870;text-transform:uppercase;letter-spacing:0.1em;margin-top:4px;">Fats <span style="color:#B5B0A6;">g</span></div>
                  </td>
                </tr>
              </table>
            </td></tr>
            <tr><td>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${mealRows}
              </table>
            </td></tr>

            <!-- RECIPES -->
            ${sectionHeader('Recipes')}
            ${recipeCards}

            <!-- SHOPPING LIST -->
            ${sectionHeader('Shopping List')}
            <tr><td>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  ${Object.entries(plan.shopping_list).map(([cat, items]) => `
                  <td style="padding:0 24px 20px 0;vertical-align:top;width:${Math.floor(100 / Object.keys(plan.shopping_list).length)}%;">
                    <div style="font-size:11px;font-weight:700;color:#4A7C59;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">${s(cat)}</div>
                    ${items.map(i => `<div style="font-size:13px;color:#1A1916;padding:3px 0;">· ${s(i)}</div>`).join('')}
                  </td>`).join('')}
                </tr>
              </table>
            </td></tr>

            <!-- CHECK-IN -->
            ${sectionHeader('Check-ins')}
            <tr><td style="padding-bottom:48px;">
              <div style="font-size:14px;color:#1A1916;line-height:1.8;">
                Reply to this email every <strong>${s(plan.check_in.schedule)}</strong> with:
              </div>
              <div style="margin-top:12px;">
                ${plan.check_in.metrics.map(m => `<div style="font-size:13px;color:#7A7870;padding:4px 0;">· ${s(m)}</div>`).join('')}
              </div>
            </td></tr>

            <!-- Sign-off -->
            <tr><td style="border-top:1px solid #E5E1D8;padding-top:32px;">
              <div style="font-family:Georgia,'Cormorant Garamond',serif;font-size:22px;color:#1A1916;font-style:italic;">— Kira</div>
            </td></tr>

          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 0;text-align:center;">
          <div style="font-size:11px;color:#7A7870;letter-spacing:0.08em;">kiramei.co.uk · Online PT · Worldwide</div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}
