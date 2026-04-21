'use client'

import { type PlanJSON, getWeeks } from '@/lib/planEmail'

type Props = { plan: PlanJSON | null; parseError: string; onUpdate: (p: PlanJSON) => void }

export default function StudioPreview({ plan, parseError, onUpdate }: Props) {
  if (parseError) return (
    <div style={{ padding: 40 }}>
      <p style={{ fontSize: 13, color: '#C0392B', fontFamily: 'monospace', lineHeight: 1.6 }}>{parseError}</p>
    </div>
  )
  if (!plan) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 40, textAlign: 'center' }}>
      <p style={{ fontSize: 28, marginBottom: 12 }}>📋</p>
      <p style={{ fontSize: 14, color: 'var(--ink-faint)', lineHeight: 1.6 }}>Paste JSON → preview and edit here.</p>
    </div>
  )

  function up(patch: Partial<PlanJSON>) { onUpdate({ ...plan, ...patch } as PlanJSON) }

  return (
    <div style={{ padding: '32px 28px' }}>
      <EditHint />

      {/* Name */}
      <p className="font-display" style={{ fontSize: 48, fontWeight: 600, color: 'var(--ink)', lineHeight: 1, marginBottom: 20 }}>
        {plan.client.name.split(' ')[0]}.
      </p>

      {/* Personal note */}
      <div style={{ borderLeft: '2px solid var(--sage)', paddingLeft: 16, marginBottom: 32 }}>
        <E
          multiline
          value={plan.programme.personal_note}
          onChange={v => up({ programme: { ...plan.programme, personal_note: v } })}
          style={{ fontSize: 14, fontStyle: 'italic', color: 'var(--ink-muted)', lineHeight: 1.7, display: 'block' }}
        />
      </div>

      {/* Title */}
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 6 }}>Your programme</p>
      <E
        value={plan.programme.title}
        onChange={v => up({ programme: { ...plan.programme, title: v } })}
        className="font-display"
        style={{ fontSize: 28, fontWeight: 600, color: 'var(--ink)', display: 'block', marginBottom: 6 }}
      />
      <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 32 }}>
        <E value={plan.programme.duration_weeks} onChange={v => up({ programme: { ...plan.programme, duration_weeks: num(v) } })} /> weeks ·{' '}
        <E value={plan.training.days_per_week} onChange={v => up({ training: { ...plan.training, days_per_week: num(v) } })} /> days/week ·{' '}
        <E value={plan.training.split} onChange={v => up({ training: { ...plan.training, split: v } })} />
      </p>

      <Div label="Training" />
      {getWeeks(plan).map((week, wi) => (
        <div key={wi}>
          {getWeeks(plan).length > 1 && (
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16, marginTop: wi > 0 ? 28 : 0 }}>
              Week {week.week_number}{week.week_theme ? ` — ${week.week_theme}` : ''}
            </p>
          )}
          {(week.sessions ?? []).map((sess, si) => (
            <div key={si} style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--sage)', marginBottom: 8 }}>
                <E value={sess.day} onChange={v => upSessionInWeek(plan, up, wi, si, 'day', v)} /> — <E value={sess.label} onChange={v => upSessionInWeek(plan, up, wi, si, 'label', v)} />
              </p>
              <div className="paper-card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: 'var(--paper-warm)', borderBottom: '1px solid var(--border)' }}>
                      {['Exercise', 'Sets', 'Reps', 'Rest'].map(h => (
                        <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: 'var(--ink-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</th>
                      ))}
                      <th style={{ padding: '8px 8px', width: 32 }} />
                    </tr>
                  </thead>
                  <tbody>
                    {(sess.exercises ?? []).map((ex, ei) => (
                      <tr key={ei} style={{ borderTop: ei > 0 ? '1px solid var(--border)' : undefined }}>
                        <td style={{ padding: '10px 12px' }}>
                          <E value={ex.name} onChange={v => upExerciseInWeek(plan, up, wi, si, ei, 'name', v)} style={{ fontWeight: 500, color: 'var(--ink)' }} />
                          {ex.notes !== undefined && (
                            <E value={ex.notes} onChange={v => upExerciseInWeek(plan, up, wi, si, ei, 'notes', v)} style={{ fontSize: 11, color: 'var(--ink-muted)', display: 'block', marginTop: 2 }} />
                          )}
                        </td>
                        <td style={{ padding: '10px 12px' }}><E value={ex.sets} onChange={v => upExerciseInWeek(plan, up, wi, si, ei, 'sets', num(v))} /></td>
                        <td style={{ padding: '10px 12px' }}><E value={ex.reps} onChange={v => upExerciseInWeek(plan, up, wi, si, ei, 'reps', v)} /></td>
                        <td style={{ padding: '10px 12px', color: 'var(--ink-muted)' }}><E value={ex.rest ?? '—'} onChange={v => upExerciseInWeek(plan, up, wi, si, ei, 'rest', v === '—' ? undefined : v)} /></td>
                        <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                          <DelBtn onClick={() => delExerciseInWeek(plan, up, wi, si, ei)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button onClick={() => addExerciseInWeek(plan, up, wi, si)} style={addBtnStyle}>+ Add exercise</button>
              </div>
            </div>
          ))}
        </div>
      ))}
      <Div label="Nutrition" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', marginBottom: 20 }}>
        {([['Calories', 'daily_calories', 'kcal'], ['Protein', 'protein_g', 'g'], ['Carbs', 'carbs_g', 'g'], ['Fats', 'fats_g', 'g']] as [string, keyof typeof plan.nutrition, string][]).map(([label, key, unit]) => (
          <div key={label} style={{ padding: '14px 12px', textAlign: 'center', background: 'var(--surface)', borderRight: '1px solid var(--border)' }}>
            <div className="font-display" style={{ fontSize: 22, fontWeight: 600, color: 'var(--ink)' }}>
              <E value={plan.nutrition[key] as number} onChange={v => up({ nutrition: { ...plan.nutrition, [key]: num(v) } })} />
            </div>
            <div style={{ fontSize: 10, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 3 }}>{label} <span style={{ color: 'var(--ink-faint)' }}>{unit}</span></div>
          </div>
        ))}
      </div>
      {(plan.nutrition.meals ?? []).map((m, mi) => (
        <div key={mi} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '10px 0', borderBottom: '1px solid var(--border)', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <E value={m.name} onChange={v => upMeal(plan, up, mi, 'name', v)} style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }} />
            {' '}
            <E value={m.description} onChange={v => upMeal(plan, up, mi, 'description', v)} style={{ fontSize: 13, color: 'var(--ink-muted)' }} />
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', whiteSpace: 'nowrap' }}>
            <E value={m.calories} onChange={v => upMeal(plan, up, mi, 'calories', num(v))} style={{ fontSize: 12, color: 'var(--ink-muted)' }} /> kcal ·{' '}
            <E value={m.protein_g} onChange={v => upMeal(plan, up, mi, 'protein_g', num(v))} style={{ fontSize: 12, color: 'var(--ink-muted)' }} />g
            <DelBtn onClick={() => delMeal(plan, up, mi)} />
          </div>
        </div>
      ))}
      <button onClick={() => addMeal(plan, up)} style={addBtnStyle}>+ Add meal</button>

      <Div label="Recipes" />
      {(plan.nutrition.recipes ?? []).map((r, ri) => (
        <div key={ri} className="paper-card" style={{ padding: '16px 18px', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <E value={r.name} onChange={v => upRecipe(plan, up, ri, 'name', v)} style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }} />
            <DelBtn onClick={() => delRecipe(plan, up, ri)} />
          </div>
          <div style={{ fontSize: 11, color: 'var(--sage)', marginBottom: 10 }}>
            <E value={r.macros.calories} onChange={v => upRecipeMacro(plan, up, ri, 'calories', num(v))} /> kcal ·{' '}
            <E value={r.macros.protein_g} onChange={v => upRecipeMacro(plan, up, ri, 'protein_g', num(v))} />g protein ·{' '}
            <E value={r.macros.carbs_g} onChange={v => upRecipeMacro(plan, up, ri, 'carbs_g', num(v))} />g carbs ·{' '}
            <E value={r.macros.fats_g} onChange={v => upRecipeMacro(plan, up, ri, 'fats_g', num(v))} />g fats
          </div>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Ingredients</p>
          {(r.ingredients ?? []).map((ing, ii) => (
            <div key={ii} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 0' }}>
              <span style={{ color: 'var(--ink-faint)', fontSize: 12 }}>·</span>
              <E value={ing} onChange={v => upIngredient(plan, up, ri, ii, v)} style={{ fontSize: 13, color: 'var(--ink)', flex: 1 }} />
              <DelBtn onClick={() => delIngredient(plan, up, ri, ii)} />
            </div>
          ))}
          <button onClick={() => addIngredient(plan, up, ri)} style={addBtnStyle}>+ Add ingredient</button>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '12px 0 6px' }}>Method</p>
          <E multiline value={r.method} onChange={v => upRecipe(plan, up, ri, 'method', v)} style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.7, display: 'block' }} />
        </div>
      ))}
      <button onClick={() => addRecipe(plan, up)} style={addBtnStyle}>+ Add recipe</button>

      <Div label="Shopping List" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 20, marginBottom: 32 }}>
        {Object.entries(plan.shopping_list ?? {}).map(([cat, items]) => (
          <div key={cat}>
            <E value={cat} onChange={v => renameShoppingCat(plan, up, cat, v)} style={{ fontSize: 10, fontWeight: 700, color: 'var(--sage)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }} />
            {(items ?? []).map((item, ii) => (
              <div key={ii} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 0' }}>
                <span style={{ color: 'var(--ink-faint)', fontSize: 12 }}>·</span>
                <E value={item} onChange={v => upShoppingItem(plan, up, cat, ii, v)} style={{ fontSize: 13, color: 'var(--ink)', flex: 1 }} />
                <DelBtn onClick={() => delShoppingItem(plan, up, cat, ii)} />
              </div>
            ))}
            <button onClick={() => addShoppingItem(plan, up, cat)} style={addBtnStyle}>+ item</button>
          </div>
        ))}
      </div>

      <Div label="Check-ins" />
      <p style={{ fontSize: 14, color: 'var(--ink)', marginBottom: 8 }}>
        Every <E value={plan.check_in.schedule} onChange={v => up({ check_in: { ...plan.check_in, schedule: v } })} style={{ fontWeight: 600 }} />
      </p>
      {(plan.check_in.metrics ?? []).map((m, mi) => (
        <div key={mi} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 0' }}>
          <span style={{ color: 'var(--ink-faint)', fontSize: 12 }}>·</span>
          <E value={m} onChange={v => upMetric(plan, up, mi, v)} style={{ fontSize: 13, color: 'var(--ink-muted)', flex: 1 }} />
          <DelBtn onClick={() => delMetric(plan, up, mi)} />
        </div>
      ))}
      <button onClick={() => addMetric(plan, up)} style={addBtnStyle}>+ Add metric</button>

      <div style={{ marginTop: 40, paddingTop: 28, borderTop: '1px solid var(--border)' }}>
        <p className="font-display" style={{ fontSize: 20, fontStyle: 'italic', color: 'var(--ink)' }}>— Kira</p>
      </div>
    </div>
  )
}

// ── Editable field ────────────────────────────────────────────────────────────

function E({ value, onChange, style, className, multiline }: {
  value: string | number
  onChange: (v: string) => void
  style?: React.CSSProperties
  className?: string
  multiline?: boolean
}) {
  return (
    <span
      contentEditable
      suppressContentEditableWarning
      className={className}
      onBlur={e => onChange(e.currentTarget.textContent ?? '')}
      onKeyDown={multiline ? undefined : e => { if (e.key === 'Enter') { e.preventDefault(); (e.currentTarget as HTMLElement).blur() } }}
      style={{
        outline: 'none',
        borderBottom: '1px dashed transparent',
        transition: 'border-color 0.15s',
        cursor: 'text',
        whiteSpace: multiline ? 'pre-wrap' : undefined,
        ...style,
      }}
      onFocus={e => (e.currentTarget.style.borderBottomColor = 'var(--sage)')}
      onBlurCapture={e => (e.currentTarget.style.borderBottomColor = 'transparent')}
    >
      {value}
    </span>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function num(v: string | number): number { const n = parseFloat(String(v)); return isNaN(n) ? 0 : n }

const addBtnStyle: React.CSSProperties = {
  background: 'none', border: 'none', cursor: 'pointer', fontSize: 12,
  color: 'var(--sage)', padding: '6px 0', fontFamily: 'DM Sans, sans-serif',
}

function DelBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-faint)', fontSize: 14, padding: '0 2px', lineHeight: 1, fontFamily: 'DM Sans, sans-serif' }}>×</button>
  )
}

function EditHint() {
  return <p style={{ fontSize: 11, color: 'var(--ink-faint)', marginBottom: 24, letterSpacing: '0.04em' }}>Click any field to edit · Press Enter or click away to confirm</p>
}

function Div({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '28px 0 16px' }}>
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sage)', whiteSpace: 'nowrap', borderBottom: '1.5px solid var(--sage)', paddingBottom: 3 }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
    </div>
  )
}

// ── Immutable updaters ────────────────────────────────────────────────────────

type U = (p: Partial<PlanJSON>) => void

function upWeeks(p: PlanJSON, up: U, weeks: ReturnType<typeof getWeeks>) {
  if (p.training.weeks) up({ training: { ...p.training, weeks } })
  else up({ training: { ...p.training, sessions: weeks[0]?.sessions ?? [] } })
}
function upSessionInWeek(p: PlanJSON, up: U, wi: number, si: number, key: 'day' | 'label', v: string) {
  const weeks = getWeeks(p).map((w, i) => i !== wi ? w : { ...w, sessions: w.sessions.map((s, j) => j === si ? { ...s, [key]: v } : s) })
  upWeeks(p, up, weeks)
}
function upExerciseInWeek(p: PlanJSON, up: U, wi: number, si: number, ei: number, key: string, v: string | number | undefined) {
  const weeks = getWeeks(p).map((w, i) => i !== wi ? w : {
    ...w, sessions: w.sessions.map((s, j) => j !== si ? s : { ...s, exercises: s.exercises.map((ex, k) => k === ei ? { ...ex, [key]: v } : ex) })
  })
  upWeeks(p, up, weeks)
}
function delExerciseInWeek(p: PlanJSON, up: U, wi: number, si: number, ei: number) {
  const weeks = getWeeks(p).map((w, i) => i !== wi ? w : {
    ...w, sessions: w.sessions.map((s, j) => j !== si ? s : { ...s, exercises: s.exercises.filter((_, k) => k !== ei) })
  })
  upWeeks(p, up, weeks)
}
function addExerciseInWeek(p: PlanJSON, up: U, wi: number, si: number) {
  const weeks = getWeeks(p).map((w, i) => i !== wi ? w : {
    ...w, sessions: w.sessions.map((s, j) => j !== si ? s : { ...s, exercises: [...s.exercises, { name: 'New exercise', sets: 3, reps: '10', rest: '60s', notes: '' }] })
  })
  upWeeks(p, up, weeks)
}
function upMeal(p: PlanJSON, up: U, mi: number, key: string, v: string | number) {
  up({ nutrition: { ...p.nutrition, meals: p.nutrition.meals.map((m, i) => i === mi ? { ...m, [key]: v } : m) } })
}
function delMeal(p: PlanJSON, up: U, mi: number) {
  up({ nutrition: { ...p.nutrition, meals: p.nutrition.meals.filter((_, i) => i !== mi) } })
}
function addMeal(p: PlanJSON, up: U) {
  up({ nutrition: { ...p.nutrition, meals: [...p.nutrition.meals, { name: 'Meal', description: 'Description', calories: 400, protein_g: 30 }] } })
}
function upRecipe(p: PlanJSON, up: U, ri: number, key: 'name' | 'method', v: string) {
  up({ nutrition: { ...p.nutrition, recipes: p.nutrition.recipes.map((r, i) => i === ri ? { ...r, [key]: v } : r) } })
}
function upRecipeMacro(p: PlanJSON, up: U, ri: number, key: string, v: number) {
  up({ nutrition: { ...p.nutrition, recipes: p.nutrition.recipes.map((r, i) => i === ri ? { ...r, macros: { ...r.macros, [key]: v } } : r) } })
}
function delRecipe(p: PlanJSON, up: U, ri: number) {
  up({ nutrition: { ...p.nutrition, recipes: p.nutrition.recipes.filter((_, i) => i !== ri) } })
}
function addRecipe(p: PlanJSON, up: U) {
  up({ nutrition: { ...p.nutrition, recipes: [...p.nutrition.recipes, { name: 'New recipe', ingredients: ['Ingredient'], method: 'Method.', macros: { calories: 400, protein_g: 30, carbs_g: 40, fats_g: 10 } }] } })
}
function upIngredient(p: PlanJSON, up: U, ri: number, ii: number, v: string) {
  up({ nutrition: { ...p.nutrition, recipes: p.nutrition.recipes.map((r, i) => i !== ri ? r : { ...r, ingredients: r.ingredients.map((ing, j) => j === ii ? v : ing) }) } })
}
function delIngredient(p: PlanJSON, up: U, ri: number, ii: number) {
  up({ nutrition: { ...p.nutrition, recipes: p.nutrition.recipes.map((r, i) => i !== ri ? r : { ...r, ingredients: r.ingredients.filter((_, j) => j !== ii) }) } })
}
function addIngredient(p: PlanJSON, up: U, ri: number) {
  up({ nutrition: { ...p.nutrition, recipes: p.nutrition.recipes.map((r, i) => i !== ri ? r : { ...r, ingredients: [...r.ingredients, 'New ingredient'] }) } })
}
function renameShoppingCat(p: PlanJSON, up: U, oldCat: string, newCat: string) {
  const entries = Object.entries(p.shopping_list)
  const updated = Object.fromEntries(entries.map(([k, v]) => [k === oldCat ? newCat : k, v]))
  up({ shopping_list: updated })
}
function upShoppingItem(p: PlanJSON, up: U, cat: string, ii: number, v: string) {
  up({ shopping_list: { ...p.shopping_list, [cat]: p.shopping_list[cat].map((item, i) => i === ii ? v : item) } })
}
function delShoppingItem(p: PlanJSON, up: U, cat: string, ii: number) {
  up({ shopping_list: { ...p.shopping_list, [cat]: p.shopping_list[cat].filter((_, i) => i !== ii) } })
}
function addShoppingItem(p: PlanJSON, up: U, cat: string) {
  up({ shopping_list: { ...p.shopping_list, [cat]: [...p.shopping_list[cat], 'New item'] } })
}
function upMetric(p: PlanJSON, up: U, mi: number, v: string) {
  up({ check_in: { ...p.check_in, metrics: p.check_in.metrics.map((m, i) => i === mi ? v : m) } })
}
function delMetric(p: PlanJSON, up: U, mi: number) {
  up({ check_in: { ...p.check_in, metrics: p.check_in.metrics.filter((_, i) => i !== mi) } })
}
function addMetric(p: PlanJSON, up: U) {
  up({ check_in: { ...p.check_in, metrics: [...p.check_in.metrics, 'New metric'] } })
}
