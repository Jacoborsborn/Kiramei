# Claude Design Brief — Kira Mei `/training` Landing Page Redesign

> Paste this entire document into Claude Design. It contains every piece of copy, structure, and visual direction needed. The output should be a single self-contained React page using inline `<style>` blocks (NOT Tailwind, NOT external CSS), matching the existing newspaper/zine aesthetic of kiramei.co.uk.

---

## 1. Context: what Kira Mei is

**Brand:** Kira Mei is a UK-based fitness education brand (kiramei.co.uk). The visual identity is **"editorial zine meets training notebook"** — cream paper, ink black, hand-drawn margin notes, polaroid photos, receipt-style typography, mono captions, serif headlines. Think Cereal magazine crossed with a marathon runner's bullet journal.

**Product being sold on this page:** *The Training Blueprint* — a £49.99 one-time digital programme. 8 weeks of training education aimed at **beginner women in fitness**.

**Audience:** Women, roughly 18–30, who have been to the gym a handful of times but feel lost. They don't know what RPE means, they're scared of the free-weights section, they've bought a programme or two and not finished them. They want to feel confident, capable, and *educated* — not coddled.

**The big idea:** This isn't a plan you follow once. It teaches you how training works so you can build your own programme for life. By week 8 you've completed all 8 weeks AND built your own programme.

---

## 2. Existing aesthetic system (MUST preserve)

The current site uses these CSS variables. Your design must use them — do NOT introduce a new palette.

```css
--paper: #F5EFE3              /* cream background */
--paper-deep: #ECE3D0         /* slightly darker cream */
--paper-edge: #D9CFB8         /* paper border / hairline */
--ink: #1F1B16                /* near-black for text */
--ink-soft: #4A4239           /* secondary text */
--ink-muted: #8A7F70          /* tertiary / mono captions */
--accent: #B8543A             /* terracotta — primary accent */
--accent-soft: #D27E62        /* lighter terracotta */
--sage: #7A8B6E               /* secondary accent (habit / nature) */
--gold: #B8923A               /* tertiary accent (value / money) */
--margin-red: #C26A5C         /* handwritten margin notes only */

--serif: 'Cormorant Garamond' or similar editorial serif
--sans:  'Inter' or system sans
--mono:  'JetBrains Mono' or similar
--hand:  'Caveat' or similar handwriting font
```

**Visual motifs to preserve and reuse:**
- Hand-drawn margin notes in red (`--margin-red`) at slight rotations (-2deg / +1deg)
- Polaroid photo frames with subtle rotation
- Receipt / ticket stub styling with dashed borders + perforated edges
- Mono uppercase eyebrows above each section ("THE METHOD ·", "TOOL 01 ·")
- Numbered phase markers in mono
- Dashed underlines, hand-drawn ticks, asterisks
- Slight paper-grain background texture (32px grid lines at low opacity)
- Stamps ("PAID IN FULL", "Built by me") with rotated borders

**Layout system:** Generous whitespace. 80–100px section padding. Two-column grids that collapse to single column under 860px. `.km-container` is max-width ~1100px centred.

---

## 3. Page structure (top → bottom)

The new page follows a **Problem → Agitate → Solution → Proof → Offer → Objections → CTA** narrative. Twelve sections in this order:

### Section 1 — Hero (Problem-led headline)

**Eyebrow:** `THE TRAINING BLUEPRINT · FOR BEGINNERS`

**Headline (rewrite, A/B-style — produce ALL THREE so the user can pick):**
- Option A: *"Complete eight weeks. Build your own programme. Never buy another one."*
- Option B: *"Eight weeks to stop guessing in the gym — and start writing your own programme."*
- Option C: *"The last training programme you'll ever need to buy."*

**Sub-headline:** *"Built for women who've been to the gym, felt lost, and want to actually understand what they're doing. By day 56 you'll have finished the programme — and written your own."*

**Right-side visual:** Keep the existing "cover" card (Training Blueprint, 4 phases listed, slight rotation). Add a small handwritten margin note: *"for beginners. read this first."*

**Price box:** £49.99 one-time. Underneath in mono: *"= £6.24 per week of training education"*. Add CTA: `Start Week One →`

**Trust strip below price:** `7-DAY REFUND · INSTANT ACCESS · YOURS FOREVER` (mono, small)

---

### Section 2 — Problem (Agitate)

**Eyebrow:** `01 · IF THIS SOUNDS FAMILIAR`

**Headline:** *"You've already paid for the gym. So why does it still feel like everyone else got a manual you didn't?"*

**Three short pain-point cards in a row (each ~30 words):**

1. **"You've bought a plan before."** It sat in your Notes app. You did week one. Maybe week two. Then life happened and the PDF became another tab you'd close eventually.

2. **"You don't know the language."** RPE, hypertrophy, eccentric, deload. Other people throw these words around. You nod. You google them later, alone.

3. **"You're guessing at weights."** How heavy is heavy enough? When should it go up? You've been doing the same dumbbells for months because nobody told you the rules.

**Margin note (red, handwritten):** *"none of this is your fault."*

---

### Section 3 — Why this happens (deeper agitation)

**Eyebrow:** `02 · THE REAL PROBLEM`

**Headline:** *"The fitness industry doesn't want you to learn."*

**Body (two short paragraphs):**

> *Most programmes are designed to be **followed**, not understood. That's the business model: you buy a plan, you finish it, you buy the next one. £45 a session, £80 a refresh, £10 a month for an app, forever.*
>
> *Learning how training actually works — picking your own weights, building your own splits, knowing when to deload — would end that loop. So nobody teaches it.*

**Pull-quote (large serif):** *"You're not bad at the gym. You've just never been taught the gym."*

---

### Section 4 — Solution (the Blueprint, introduced)

**Eyebrow:** `03 · WHAT THIS IS`

**Headline:** *"Eight weeks. Four phases. One outcome: you finally understand."*

**Body:** *"Each week opens with a short chapter (~15 min read), then three sessions, then a reflection. By the end you've trained every major split — full body, upper/lower, push pull legs — and you know why each one exists."*

**Then: keep the existing 4-phase curriculum grid** (Phase 01 Full Body → 02 U/L → 03 PPL → 04 PPL Advanced). The visual treatment of this section is already strong — preserve it.

---

### Section 5 — Who this is for / not for (qualifier block)

**Eyebrow:** `04 · IS THIS YOU?`

**Two-column block (NOT a row of cards — paired columns with a vertical divider, like a checklist on torn notebook paper):**

**Left column — "This is for you if..."** (green ticks)
- You're a woman, new-ish to the gym, and you want to actually know what you're doing
- You've bought programmes before and never made it past week three
- You can train 3 times a week and you have access to a normal gym
- You want education, not just a calendar of exercises

**Right column — "This isn't for you if..."** (red crosses)
- You're an advanced lifter looking for a peaking programme
- You want someone to text you daily and hold your hand
- You're looking for a 30-day quick fix or a "shred"
- You want a meal plan (that's the Nutrition Blueprint — different product)

**Tone:** Honest, not aggressive. The "not for you" list builds trust by showing you'll turn business away.

---

### Section 6 — Week 1 spotlight (preserve existing section)

Keep the existing "What the first week actually looks like" section with the mind-map visual. Add **one new element** at the top of the copy column:

> **A hook for week 2.**
> *Week one ends with a single cue you can apply on Monday morning that changes how your bench feels. We tell you what we're going to teach in week two — and we mean it.*

This addresses the psychological "open loop" that keeps users moving from week 1 → week 2.

---

### Section 7 — The Toolbox (preserve, rewrite copy)

Keep the existing 5-item tray + 5 individual tool sections. **Rewrite the copy on each tool from notes-to-self fragments into complete buyer-facing benefit statements.** Each tool has: tag, headline, body (~50 words), 3 bullets, hook line.

**Tool 01 — The Template**
- Headline: *"A blank programme template you finally know how to fill in."*
- Body: *"Week eight ends with the same blank template every coach uses behind the scenes. Splits, sets, reps, RPE, deload weeks — all laid out. The only thing missing is your handwriting. Because by now, you can write it."*
- Bullets: (a) Print-ready PDF + editable Notion / Sheets version (b) 4-, 6- and 8-week templates for every split you've trained (c) Pre-filled deload logic so you don't burn out next cycle
- Hook: *"your name. your programme. your call."*

**Tool 02 — The Habit**
- Headline: *"Fifty-six days of showing up. That's an identity, not a streak."*
- Body: *"Behaviour research says habits lock in between 30 and 66 days. By week eight you've crossed it without thinking. You're no longer 'trying to get into the gym' — you're someone who trains. That doesn't unlearn itself."*
- Bullets: (a) 3 sessions a week, scheduled and tracked (b) Built-in rest days so the rhythm survives real life (c) Weekly reflections that make drifting impossible
- Hook: *"identity beats motivation. every time."*

**Tool 03 — The Receipt** (cost savings)
- Headline: *"£200+ a month, gone — for the rest of your training life."*
- Body: *"PTs charge £45 a session. Custom plans cost £80–150 every few months. App subs nibble at it monthly. Learn how training works once, and the meter stops. Forever."*
- Bullets: (a) Replace recurring PT fees with self-coached cycles (b) No more 'starter plan' purchases when motivation comes back (c) Compounds — year two, three, ten — same maths, same saving
- Hook: *"the cheapest £49.99 you'll ever spend."*

**Tool 04 — The Glossary**
- Headline: *"Speak gym. Without faking it."*
- Body: *"Every chapter quietly teaches you the language coaches use — RPE, hypertrophy, eccentric, AMRAP, deload. Not as homework. As context. By week four you read any programme online and actually understand it."*
- Bullets: (a) 40+ terms defined in plain English with examples (b) "What does that mean in the gym?" — always the next line (c) Searchable on your phone mid-set
- Hook: *"no more nodding. you actually know."*

**Tool 05 — The Form Vault**
- Headline: *"Your hands have done twenty exercises. Properly."*
- Body: *"Hand-drawn breakdowns for every staple lift — squat, hinge, push, pull, carry, isolate. Cues in plain English. Common form faults. The muscle being trained. When someone re-racks next to you and asks what you're doing, you can answer."*
- Bullets: (a) 20+ exercises across full body, upper/lower and PPL (b) Muscle activation diagrams and step-by-step cues (c) "What it should feel like" notes — and what it shouldn't
- Hook: *"you've done these. you know what they feel like."*

---

### Section 8 — Testimonials (NEW on this page, pulled from homepage)

**Eyebrow:** `05 · FROM REAL WOMEN`

**Headline:** *"Eight weeks. Three real outcomes."*

**Three testimonial cards** (use the existing testimonial card styling — paper, soft shadow, slight rotation, serif quote, mono name + location):

> **Sophie R. · 24 · Manchester**
> *"I've bought three programmes before this and never finished any of them. Eight weeks later I actually understand what I'm doing in the gym. I built my own plan last week. Never thought I'd say that."*

> **Jade T. · 22 · London**
> *"Week 3 was when it clicked. I stopped just following the exercises and started actually understanding them. Worth every penny."*

> **Chloe M. · 27 · Leeds**
> *"I used to feel embarrassed in the free-weights section. Now I walk in, do my session, and leave. That's it. That's the whole change. It's everything."*

(Note: Chloe's quote has been rewritten from the original nutrition one to fit the training context. Sophie's and Jade's are original.)

---

### Section 9 — Risk reversal (7-day refund block)

Distinctive section — looks like a torn-out ticket / coupon. Heavy `--paper-deep` background, dashed border on all four sides like a perforated coupon.

**Eyebrow:** `06 · NO RISK`

**Headline:** *"Try the first week. Don't love it? Email me."*

**Body:**
> *"You get the whole programme on day one. Open Week 1. Read the chapter. Train the three sessions. If you don't feel sharper in the gym by day 7 — email me at hello@kiramei.co.uk and I'll refund every penny. No forms. No questions. No 'please tell us why you're leaving' survey. Just back to your card."*

**Visual element:** A stamp graphic — circular or rectangular border — saying `7-DAY REFUND · NO QUESTIONS` rotated -8deg in the corner.

---

### Section 10 — Pricing reframe (the maths)

**Eyebrow:** `07 · THE MATHS`

**Headline:** *"£49.99 once. That's £6.24 per week of training education. Less than a coffee."*

**Three-column comparison (visual: like a receipt or invoice):**

| What you'd pay elsewhere | What it costs | What this costs |
|---|---|---|
| 1 PT session (one-off) | £45 | £49.99 |
| Custom plan (one refresh) | £80 | £49.99 |
| Programme app (1 year) | £120+ | £49.99 |

**Below the table:**
> *"One purchase. Eight weeks. Eight years from now — same £49.99. Compounds the second you stop buying anything else."*

---

### Section 11 — FAQ

**Eyebrow:** `08 · QUESTIONS YOU'RE PROBABLY ASKING`

**Headline:** *"Real answers. No fluff."*

**Eight Q&As in an accordion or stacked card list. Each answer 2–4 sentences max:**

1. **"I've literally never trained before. Is this for me?"**
   Yes — this is built for beginners. Phase 01 starts you on full-body training with the lightest possible curve. The chapter teaches you what each lift is *before* you do it. If you can walk into a gym, you can do week one.

2. **"I've trained for six months. Am I past this?"**
   Probably not. Most people who've trained for under two years are still guessing — about weights, splits, recovery. The education is what's missing, not the reps. If you can already write your own programme from scratch, this isn't for you.

3. **"Do I need a full gym? Can I do it at home?"**
   You need a normal commercial gym (a barbell, dumbbells, a few machines). It's not designed for home / dumbbell-only training. If your gym has a squat rack and a bench, you're fine.

4. **"How much time per week?"**
   Three sessions of 45–60 minutes, plus about 20 minutes of reading. Total: ~3 hours a week. Sessions are designed for real life, not "elite athlete" schedules.

5. **"What's the difference between this and free YouTube content?"**
   YouTube teaches one thing at a time. This teaches you a *system* across 56 days, in order, with a template at the end. You can absolutely learn this from free content — most people don't, because there's no structure and no end-point.

6. **"Do I get lifetime access? Updates?"**
   Yes — you keep the programme forever, and every future update is free. No subscription. No "premium tier" later.

7. **"What if I'm on my period / sick / can't train one week?"**
   The programme is self-paced. Each week unlocks when you're ready. Miss a week, pick it up Monday. Nothing is locked behind a calendar.

8. **"What if I don't love it?"**
   Email me within 7 days, full refund. No forms, no questions. You keep nothing, you owe nothing.

---

### Section 12 — Final CTA

Closing section, centred, with `--paper-deep` background.

**Eyebrow:** `READY WHEN YOU ARE`

**Headline:** *"Stop following. Start understanding."*

**Sub-headline:** *"Eight weeks. £49.99 once. A 7-day refund if it doesn't change how you train."*

**Primary CTA button:** `Get the Training Blueprint — £49.99 →`

**Below button (mono small):** `INSTANT ACCESS · NO SUBSCRIPTION · 7-DAY REFUND`

**Final margin note (red, handwritten, rotated):** *"see you on the other side of week one."*

---

## 4. Technical output requirements

- Output as a **single self-contained React component** (`'use client'` at top) returning JSX
- Import these existing components — do NOT redesign them:
  - `import KmNavbar from '@/app/components/KmNavbar'` (use `activePage="training"`)
  - `import KmFooter from '@/app/components/KmFooter'`
  - `import BuyButton from '@/app/components/BuyButton'` (used with `<BuyButton requireTerms product="training" label="..." />`)
- All styles via a single inline `<style>{`...`}</style>` block at the top of the component (matches the existing convention in `app/training/page.tsx`)
- Class names prefixed with `t-` to match the existing convention (or use new prefixes if introducing new section types — `prob-`, `qual-`, `faq-`, etc.)
- Use the CSS variables in section 2 — do NOT hardcode hex values
- Responsive breakpoints at 960px, 860px, 640px (match existing)
- All copy must be exactly as written in section 3 above — do not paraphrase
- Page wrapped in `<div className="km-page">` with `<main>` inside
- All sections wrapped in `<div className="km-container">` for max-width

---

## 5. What NOT to do

- Don't introduce a new font system, palette, or design language — preserve the zine/notebook aesthetic
- Don't use Tailwind or any utility-class system — inline `<style>` blocks only
- Don't add stock photography or illustrations beyond what the existing CSS-drawn elements support (polaroids, mind maps, receipts, stamps, hand-drawn SVG accents)
- Don't add motion / animations beyond subtle hover states
- Don't shorten the page — the long-form structure IS the conversion mechanism for a £49.99 cold-traffic offer
- Don't change the existing 4-phase curriculum section or the 5-tool Toolbox section's structure (only rewrite copy where specified)

---

## 6. Deliverable

Return the complete `page.tsx` file as a code block, ready to drop into `app/page.tsx` (this will become the new homepage). Length expected: ~900–1100 lines including styles.
