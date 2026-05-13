'use client'

import { useState } from 'react'

const FIELD: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 6 }
const LABEL: React.CSSProperties = { fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)' }
const INPUT: React.CSSProperties = { padding: '10px 12px', border: '1.5px solid var(--paper-edge)', background: 'var(--paper)', fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink)', outline: 'none', width: '100%', boxSizing: 'border-box' }
const CARD: React.CSSProperties = { padding: '24px', background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)' }
const ROW: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }
const RESULT: React.CSSProperties = { marginTop: 20, borderTop: '1px solid var(--paper-edge)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }
const RROW: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }
const RL: React.CSSProperties = { fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)' }
const RV: React.CSSProperties = { fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500 }

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div style={FIELD}><label style={LABEL}>{label}</label>{children}</div>
}

// ── TDEE ──────────────────────────────────────────────────────────────────
export function TdeeTool() {
  const [sex, setSex] = useState<'female' | 'male'>('female')
  const [age, setAge] = useState(24)
  const [w, setW] = useState(65)
  const [h, setH] = useState(165)
  const [act, setAct] = useState(1.55)
  const bmr = sex === 'female' ? 10 * w + 6.25 * h - 5 * age - 161 : 10 * w + 6.25 * h - 5 * age + 5
  const tdee = Math.round(bmr * act)
  return (
    <div style={CARD}>
      <h4 style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500, marginBottom: 4 }}>Find your TDEE</h4>
      <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 18 }}>Mifflin–St Jeor formula. Within ~10% for most people.</p>
      <div style={ROW}>
        <Field label="Sex"><select style={INPUT} value={sex} onChange={e => setSex(e.target.value as 'female' | 'male')}><option value="female">Female</option><option value="male">Male</option></select></Field>
        <Field label="Age"><input style={INPUT} type="number" value={age} onChange={e => setAge(+e.target.value)} /></Field>
        <Field label="Weight (kg)"><input style={INPUT} type="number" value={w} onChange={e => setW(+e.target.value)} /></Field>
        <Field label="Height (cm)"><input style={INPUT} type="number" value={h} onChange={e => setH(+e.target.value)} /></Field>
      </div>
      <div style={{ marginTop: 14 }}>
        <Field label="Daily activity">
          <select style={INPUT} value={act} onChange={e => setAct(+e.target.value)}>
            <option value={1.2}>Sedentary — desk job, no walking</option>
            <option value={1.375}>Light — walking + 1–2 sessions/wk</option>
            <option value={1.55}>Moderate — 3–4 sessions/wk + active</option>
            <option value={1.725}>High — 5+ sessions + on feet all day</option>
          </select>
        </Field>
      </div>
      <div style={RESULT}>
        <div style={RROW}><span style={RL}>Your BMR</span><span style={{ ...RV, fontSize: 18 }}>{Math.round(bmr)} <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)' }}>kcal</span></span></div>
        <div style={RROW}><span style={RL}>Your TDEE</span><span style={{ ...RV, color: 'var(--accent)' }}>{tdee} <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)' }}>kcal/day</span></span></div>
      </div>
    </div>
  )
}

// ── Macros ────────────────────────────────────────────────────────────────
export function MacrosTool() {
  const [tdee, setTdee] = useState(2200)
  const [w, setW] = useState(65)
  const [split, setSplit] = useState('balanced')
  const protein = Math.round(w * 2.0)
  const remaining = tdee - protein * 4
  const splits: Record<string, { c: number; f: number }> = { balanced: { c: 0.55, f: 0.45 }, highCarb: { c: 0.75, f: 0.25 }, lowCarb: { c: 0.3, f: 0.7 } }
  const s = splits[split]
  const carbs = Math.round((remaining * s.c) / 4)
  const fats = Math.round((remaining * s.f) / 9)
  return (
    <div style={CARD}>
      <h4 style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500, marginBottom: 4 }}>Split your macros</h4>
      <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 18 }}>Protein is the floor (2g/kg). Carbs and fats flex.</p>
      <div style={ROW}>
        <Field label="TDEE (kcal)"><input style={INPUT} type="number" value={tdee} onChange={e => setTdee(+e.target.value)} /></Field>
        <Field label="Bodyweight (kg)"><input style={INPUT} type="number" value={w} onChange={e => setW(+e.target.value)} /></Field>
      </div>
      <div style={{ marginTop: 14 }}>
        <Field label="Carb / fat preference">
          <select style={INPUT} value={split} onChange={e => setSplit(e.target.value)}>
            <option value="balanced">Balanced — 55% carbs of remainder</option>
            <option value="highCarb">Higher carb — fuels hard training</option>
            <option value="lowCarb">Lower carb — better for appetite</option>
          </select>
        </Field>
      </div>
      <div style={RESULT}>
        <div style={RROW}><span style={RL}>Protein</span><span style={{ ...RV, color: 'var(--accent)' }}>{protein}g</span></div>
        <div style={RROW}><span style={RL}>Carbs</span><span style={RV}>{carbs}g</span></div>
        <div style={RROW}><span style={RL}>Fats</span><span style={RV}>{fats}g</span></div>
      </div>
    </div>
  )
}

// ── Protein Compare ───────────────────────────────────────────────────────
export function ProteinCompareTool() {
  const sources = [
    { n: 'Eggs (4 large)', g: 24, kcal: 280, cost: 0.20, tone: 'wheat' },
    { n: 'Tinned tuna (150g)', g: 38, kcal: 165, cost: 0.55, tone: 'sage' },
    { n: 'Chicken thigh (150g)', g: 32, kcal: 230, cost: 0.70, tone: 'sage' },
    { n: 'Greek yog 0% (300g)', g: 30, kcal: 180, cost: 0.65, tone: 'cream' },
    { n: 'Cottage cheese (250g)', g: 28, kcal: 230, cost: 0.75, tone: 'cream' },
    { n: 'Firm tofu (180g)', g: 28, kcal: 220, cost: 0.80, tone: 'sage' },
  ]
  const cols: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1.4fr 56px 56px 48px', gap: 0 }
  const hdr: React.CSSProperties = { fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', padding: '8px 0', borderBottom: '1px solid var(--paper-edge)' }
  const cell: React.CSSProperties = { padding: '11px 0', borderBottom: '1px solid var(--paper-edge)', fontSize: 13 }
  return (
    <div style={CARD}>
      <h4 style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500, marginBottom: 4 }}>Compare protein sources</h4>
      <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 18 }}>Cost per ~30g of protein. UK supermarket pricing.</p>
      <div style={cols}>
        <div style={hdr}>Source</div>
        <div style={{ ...hdr, textAlign: 'right' }}>Protein</div>
        <div style={{ ...hdr, textAlign: 'right' }}>kcal</div>
        <div style={{ ...hdr, textAlign: 'right' }}>£</div>
        {sources.map((s, i) => (
          <>
            <div key={`n${i}`} style={{ ...cell, fontFamily: 'var(--serif)' }}>{s.n}</div>
            <div key={`g${i}`} style={{ ...cell, textAlign: 'right', fontFamily: 'var(--mono)', color: 'var(--accent)', fontWeight: 600 }}>{s.g}g</div>
            <div key={`k${i}`} style={{ ...cell, textAlign: 'right', fontFamily: 'var(--mono)', color: 'var(--ink-soft)' }}>{s.kcal}</div>
            <div key={`c${i}`} style={{ ...cell, textAlign: 'right', fontFamily: 'var(--mono)', color: 'var(--ink-soft)' }}>{s.cost.toFixed(2)}</div>
          </>
        ))}
      </div>
    </div>
  )
}

// ── Meal Prep ─────────────────────────────────────────────────────────────
export function MealPrepTool() {
  const [protein, setProtein] = useState('chicken-thigh')
  const [carb, setCarb] = useState('rice')
  const [veg, setVeg] = useState('roasted-tray')
  const [sauce, setSauce] = useState('tahini-lemon')
  const label = (s: string) => s.replace(/-/g, ' ')
  return (
    <div style={CARD}>
      <h4 style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500, marginBottom: 4 }}>Build your Sunday prep</h4>
      <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 18 }}>Four components. Ninety minutes. Four days of meals.</p>
      <div style={ROW}>
        <Field label="Protein">
          <select style={INPUT} value={protein} onChange={e => setProtein(e.target.value)}>
            <option value="chicken-thigh">12 chicken thighs</option>
            <option value="beef-mince">800g beef mince bolognese</option>
            <option value="tofu">2 blocks marinated tofu</option>
            <option value="eggs">15 hard-boiled eggs</option>
          </select>
        </Field>
        <Field label="Carb">
          <select style={INPUT} value={carb} onChange={e => setCarb(e.target.value)}>
            <option value="rice">1kg dry rice</option>
            <option value="potato">2kg roast potatoes</option>
            <option value="pasta">500g pasta</option>
            <option value="quinoa">500g quinoa</option>
          </select>
        </Field>
        <Field label="Vegetables">
          <select style={INPUT} value={veg} onChange={e => setVeg(e.target.value)}>
            <option value="roasted-tray">Roasted: sweet potato, broccoli, peppers</option>
            <option value="steamed">Steamed: broccoli + green beans</option>
            <option value="raw">Salad mix + slaw</option>
            <option value="frozen">Frozen mix, ready to heat</option>
          </select>
        </Field>
        <Field label="Sauce">
          <select style={INPUT} value={sauce} onChange={e => setSauce(e.target.value)}>
            <option value="tahini-lemon">Tahini lemon</option>
            <option value="hot-honey">Hot honey yogurt</option>
            <option value="chimichurri">Green chimichurri</option>
            <option value="peanut">Spicy peanut</option>
          </select>
        </Field>
      </div>
      <div style={{ ...RESULT, marginTop: 16 }}>
        <p style={{ fontSize: 14, color: 'var(--ink-soft)', fontStyle: 'italic', lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--ink)' }}>{label(protein)}</strong> with <strong style={{ color: 'var(--ink)' }}>{label(carb)}</strong>, plus <strong style={{ color: 'var(--ink)' }}>{label(veg)}</strong>, finished with <strong style={{ color: 'var(--accent)' }}>{label(sauce)}</strong>. Start with the protein — it takes the longest.
        </p>
      </div>
    </div>
  )
}

// ── Deficit ───────────────────────────────────────────────────────────────
export function DeficitTool() {
  const [tdee, setTdee] = useState(2200)
  const [pct, setPct] = useState(0.17)
  const deficit = Math.round(tdee * pct)
  const cut = tdee - deficit
  const weeklyLoss = (deficit * 7 / 7700).toFixed(2)
  return (
    <div style={CARD}>
      <h4 style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500, marginBottom: 4 }}>Calculate your cut</h4>
      <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 18 }}>Modest is sustainable. Aggressive is regret.</p>
      <div style={ROW}>
        <Field label="Maintenance TDEE"><input style={INPUT} type="number" value={tdee} onChange={e => setTdee(+e.target.value)} /></Field>
        <Field label="Deficit %">
          <select style={INPUT} value={pct} onChange={e => setPct(+e.target.value)}>
            <option value={0.10}>−10% — gentle, almost no hunger</option>
            <option value={0.15}>−15% — recommended</option>
            <option value={0.20}>−20% — aggressive (cap)</option>
          </select>
        </Field>
      </div>
      <div style={RESULT}>
        <div style={RROW}><span style={RL}>Daily deficit</span><span style={{ ...RV, fontSize: 18 }}>−{deficit} kcal</span></div>
        <div style={RROW}><span style={RL}>Cut calories</span><span style={{ ...RV, color: 'var(--accent)' }}>{cut} kcal/day</span></div>
        <div style={RROW}><span style={RL}>Expected loss</span><span style={{ ...RV, fontSize: 18 }}>~{weeklyLoss}kg/wk</span></div>
      </div>
    </div>
  )
}

// ── Surplus ───────────────────────────────────────────────────────────────
export function SurplusTool() {
  const [tdee, setTdee] = useState(2200)
  const [pct, setPct] = useState(0.12)
  const surplus = Math.round(tdee * pct)
  const build = tdee + surplus
  const monthly = ((surplus * 30) / 7700).toFixed(2)
  return (
    <div style={CARD}>
      <h4 style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500, marginBottom: 4 }}>Build your surplus</h4>
      <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 18 }}>Lean and slow. 0.25–0.5kg/month is the sweet spot.</p>
      <div style={ROW}>
        <Field label="Maintenance TDEE"><input style={INPUT} type="number" value={tdee} onChange={e => setTdee(+e.target.value)} /></Field>
        <Field label="Surplus %">
          <select style={INPUT} value={pct} onChange={e => setPct(+e.target.value)}>
            <option value={0.05}>+5% — recomp territory</option>
            <option value={0.10}>+10% — lean build</option>
            <option value={0.15}>+15% — standard build (cap)</option>
          </select>
        </Field>
      </div>
      <div style={RESULT}>
        <div style={RROW}><span style={RL}>Daily surplus</span><span style={{ ...RV, fontSize: 18 }}>+{surplus} kcal</span></div>
        <div style={RROW}><span style={RL}>Build calories</span><span style={{ ...RV, color: 'var(--accent)' }}>{build} kcal/day</span></div>
        <div style={RROW}><span style={RL}>Expected gain</span><span style={{ ...RV, fontSize: 18 }}>~{monthly}kg/mo</span></div>
      </div>
    </div>
  )
}

// ── Plan Builder ──────────────────────────────────────────────────────────
export function PlanBuilderTool() {
  const [phase, setPhase] = useState<'cut' | 'maintain' | 'build'>('cut')
  const [tdee, setTdee] = useState(2200)
  const [prepDay, setPrepDay] = useState('Sunday')
  const calories = phase === 'cut' ? Math.round(tdee * 0.85) : phase === 'build' ? Math.round(tdee * 1.12) : tdee
  return (
    <div style={CARD}>
      <h4 style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500, marginBottom: 4 }}>Your one-page plan</h4>
      <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 18 }}>Print it. Pin it. Run it for 12 weeks. Then re-check.</p>
      <div style={ROW}>
        <Field label="Phase (12 weeks)">
          <select style={INPUT} value={phase} onChange={e => setPhase(e.target.value as 'cut' | 'maintain' | 'build')}>
            <option value="cut">Cut — −15%</option>
            <option value="maintain">Maintain — hold</option>
            <option value="build">Build — +12%</option>
          </select>
        </Field>
        <Field label="Maintenance TDEE"><input style={INPUT} type="number" value={tdee} onChange={e => setTdee(+e.target.value)} /></Field>
      </div>
      <div style={{ marginTop: 14 }}>
        <Field label="Prep day">
          <select style={INPUT} value={prepDay} onChange={e => setPrepDay(e.target.value)}>
            <option>Sunday</option><option>Monday</option><option>Saturday</option><option>Wednesday</option>
          </select>
        </Field>
      </div>
      <div style={{ marginTop: 20, padding: '18px 20px', background: 'var(--paper)', border: '1.5px dashed var(--paper-edge)' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 14 }}>Your blueprint</p>
        <div style={RESULT}>
          <div style={RROW}><span style={RL}>Phase</span><span style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500, textTransform: 'uppercase', color: 'var(--accent)' }}>{phase}</span></div>
          <div style={RROW}><span style={RL}>Calories</span><span style={RV}>{calories} kcal</span></div>
          <div style={RROW}><span style={RL}>Prep day</span><span style={RV}>{prepDay}</span></div>
          <div style={RROW}><span style={RL}>Re-check</span><span style={{ fontFamily: 'var(--mono)', fontSize: 13 }}>12 weeks from today</span></div>
        </div>
      </div>
    </div>
  )
}
