'use client'

import { useState } from 'react'
import type { PlanJSON, Exercise, Session, Recipe } from '@/lib/planEmail'
import { getWeeks } from '@/lib/planEmail'

type Tab = 'training' | 'nutrition' | 'recipes' | 'shopping'

export default function ProgrammeViewer({ plan, sentAt }: { plan: PlanJSON; sentAt: string }) {
  const [tab, setTab] = useState<Tab>('training')
  const [openExercise, setOpenExercise] = useState<Exercise | null>(null)
  const [openRecipe, setOpenRecipe] = useState<Recipe | null>(null)

  const weeks = getWeeks(plan)
  const tabs: { id: Tab; label: string }[] = [
    { id: 'training', label: 'Training' },
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'recipes', label: 'Recipes' },
    { id: 'shopping', label: 'Shopping List' },
  ]

  return (
    <div>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 10 }}>
        My Programme
      </p>
      <h1 className="font-display" style={{ fontSize: 38, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1, marginBottom: 8 }}>
        {plan.programme.title}
      </h1>
      <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 32 }}>
        {plan.programme.duration_weeks} weeks · {plan.training.days_per_week} days/week · {plan.training.split}
        {sentAt && <span style={{ marginLeft: 12, color: 'var(--ink-faint)' }}>Delivered {new Date(sentAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
      </p>

      {/* Personal note */}
      {plan.programme.personal_note && (
        <div style={{ borderLeft: '2px solid var(--sage)', paddingLeft: 20, marginBottom: 32 }}>
          <p style={{ fontSize: 15, fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.75 }}>
            {plan.programme.personal_note}
          </p>
          <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginTop: 8 }}>— Kira</p>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '8px 18px', borderRadius: 99,
              border: tab === t.id ? 'none' : '1px solid var(--border)',
              background: tab === t.id ? 'var(--ink)' : 'transparent',
              color: tab === t.id ? '#F8F6F1' : 'var(--ink-muted)',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              transition: 'all 0.15s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Training tab */}
      {tab === 'training' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {weeks.map(week => (
            <div key={week.week_number}>
              {weeks.length > 1 && (
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 16 }}>
                  Week {week.week_number}{week.week_theme ? ` — ${week.week_theme}` : ''}
                </p>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {(week.sessions ?? []).map((session, si) => (
                  <SessionCard key={si} session={session} onSelectExercise={setOpenExercise} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Nutrition tab */}
      {tab === 'nutrition' && (
        <div>
          {/* Macros */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
            {[
              { label: 'Calories', value: plan.nutrition.daily_calories, unit: 'kcal' },
              { label: 'Protein', value: plan.nutrition.protein_g, unit: 'g' },
              { label: 'Carbs', value: plan.nutrition.carbs_g, unit: 'g' },
              { label: 'Fats', value: plan.nutrition.fats_g, unit: 'g' },
            ].map(m => (
              <div key={m.label} style={{ background: '#FDFCF9', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 16px', textAlign: 'center' }}>
                <p className="font-display" style={{ fontSize: 28, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{m.value}</p>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
                  {m.label} <span style={{ color: 'var(--ink-faint)' }}>{m.unit}</span>
                </p>
              </div>
            ))}
          </div>

          {/* Meals */}
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 16 }}>
            Daily Meals
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {plan.nutrition.meals.map((meal, i) => (
              <div key={i} style={{
                background: '#FDFCF9', border: '1px solid var(--border)',
                borderRadius: i === 0 ? '12px 12px 0 0' : i === plan.nutrition.meals.length - 1 ? '0 0 12px 12px' : '0',
                padding: '16px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
              }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 3 }}>{meal.name}</p>
                  <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{meal.description}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{meal.calories} kcal</p>
                  <p style={{ fontSize: 12, color: 'var(--sage)' }}>{meal.protein_g}g protein</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recipes tab */}
      {tab === 'recipes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {plan.nutrition.recipes.map((recipe, i) => (
            <button
              key={i}
              onClick={() => setOpenRecipe(recipe)}
              style={{
                background: '#FDFCF9', border: '1px solid var(--border)',
                borderRadius: 12, padding: '20px', textAlign: 'left',
                cursor: 'pointer', width: '100%',
                transition: 'box-shadow 0.15s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{recipe.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--sage)', fontWeight: 500 }}>
                    {recipe.macros.calories} kcal · {recipe.macros.protein_g}g protein · {recipe.macros.carbs_g}g carbs · {recipe.macros.fats_g}g fats
                  </p>
                </div>
                <span style={{ fontSize: 18, color: 'var(--ink-muted)', marginTop: 2 }}>→</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Shopping list tab */}
      {tab === 'shopping' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
          {Object.entries(plan.shopping_list).map(([category, items]) => (
            <div key={category}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 12 }}>
                {category}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {items.map((item, i) => (
                  <p key={i} style={{ fontSize: 14, color: 'var(--ink)', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ color: 'var(--sage)', marginTop: 1, flexShrink: 0 }}>·</span>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Exercise detail modal */}
      {openExercise && (
        <Modal onClose={() => setOpenExercise(null)}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 12 }}>Exercise</p>
          <h2 className="font-display" style={{ fontSize: 28, fontWeight: 600, color: 'var(--ink)', marginBottom: 20 }}>{openExercise.name}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            <Stat label="Sets" value={String(openExercise.sets)} />
            <Stat label="Reps" value={openExercise.reps} />
            {openExercise.rest && <Stat label="Rest" value={openExercise.rest} />}
          </div>
          {openExercise.notes && (
            <div style={{ background: '#F4F2EE', borderRadius: 10, padding: '14px 16px' }}>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 6 }}>Notes</p>
              <p style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.65 }}>{openExercise.notes}</p>
            </div>
          )}
        </Modal>
      )}

      {/* Recipe detail modal */}
      {openRecipe && (
        <Modal onClose={() => setOpenRecipe(null)}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 12 }}>Recipe</p>
          <h2 className="font-display" style={{ fontSize: 26, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>{openRecipe.name}</h2>
          <p style={{ fontSize: 12, color: 'var(--sage)', fontWeight: 500, marginBottom: 20 }}>
            {openRecipe.macros.calories} kcal · {openRecipe.macros.protein_g}g protein · {openRecipe.macros.carbs_g}g carbs · {openRecipe.macros.fats_g}g fats
          </p>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 10 }}>Ingredients</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 20 }}>
            {openRecipe.ingredients.map((ing, i) => (
              <p key={i} style={{ fontSize: 14, color: 'var(--ink)', display: 'flex', gap: 8 }}>
                <span style={{ color: 'var(--sage)' }}>·</span>{ing}
              </p>
            ))}
          </div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 10 }}>Method</p>
          <p style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.75 }}>{openRecipe.method}</p>
        </Modal>
      )}
    </div>
  )
}

function SessionCard({ session, onSelectExercise }: { session: Session; onSelectExercise: (ex: Exercise) => void }) {
  return (
    <div style={{ background: '#FDFCF9', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)' }}>{session.day}</span>
          <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', marginTop: 2 }}>{session.label}</p>
        </div>
        <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{session.exercises.length} exercises</span>
      </div>
      <div>
        {session.exercises.map((ex, i) => (
          <button
            key={i}
            onClick={() => onSelectExercise(ex)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '13px 20px',
              background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.015)',
              borderTop: i === 0 ? 'none' : '1px solid var(--border)',
              border: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: 'none',
              cursor: 'pointer', textAlign: 'left',
              transition: 'background 0.1s',
            }}
          >
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)', marginBottom: 2 }}>{ex.name}</p>
              <p style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{ex.sets} sets · {ex.reps} reps{ex.rest ? ` · ${ex.rest} rest` : ''}</p>
            </div>
            <span style={{ fontSize: 12, color: 'var(--sage)', fontWeight: 600, marginLeft: 12 }}>Details →</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: '#F4F2EE', borderRadius: 10, padding: '12px 16px' }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 4 }}>{label}</p>
      <p style={{ fontSize: 18, fontWeight: 600, color: 'var(--ink)' }}>{value}</p>
    </div>
  )
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--paper)', borderRadius: '20px 20px 0 0',
          padding: '28px 24px 48px', width: '100%', maxWidth: 520,
          maxHeight: '85vh', overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 4 }}>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--ink-muted)', padding: 4 }}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
