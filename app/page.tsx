'use client'

import KmNavbar from '@/app/components/KmNavbar'
import KmFooter from '@/app/components/KmFooter'
import BuyButton from '@/app/components/BuyButton'

/* ──────────────────────────────────────────────
   DATA
────────────────────────────────────────────── */

const PHASES = [
  {
    num: '01',
    weeks: 'Weeks 1–2',
    split: 'Full Body',
    topics: [
      'Why full body training first — building the baseline',
      'How to pick your starting weights and what RPE means',
      'Progressive overload: the only rule that matters',
    ],
  },
  {
    num: '02',
    weeks: 'Weeks 3–4',
    split: 'Upper / Lower',
    topics: [
      'Why the split changes and what your body has adapted to',
      'Muscle recovery — understanding how growth actually works',
      'RPE, effort and knowing when to push vs back off',
    ],
  },
  {
    num: '03',
    weeks: 'Weeks 5–6',
    split: 'Push Pull Legs',
    topics: [
      'Mind-muscle connection — why feeling the muscle matters',
      'Form cues and how to read your own body signals',
      'Volume: how much is enough, how much is too much',
    ],
  },
  {
    num: '04',
    weeks: 'Weeks 7–8',
    split: 'PPL Advanced',
    topics: [
      'The deload — what it is, why it works, when you need it',
      'What comes next after the programme ends',
      'How to build your own programme from this point forward',
    ],
  },
]

const PROBLEMS = [
  {
    title: 'You\u2019ve bought a plan before.',
    body: 'It sat in your Notes app. You did week one. Maybe week two. Then life happened and the PDF became another tab you\u2019d close eventually.',
  },
  {
    title: 'You don\u2019t know the language.',
    body: 'RPE, hypertrophy, eccentric, deload. Other people throw these words around. You nod. You google them later, alone.',
  },
  {
    title: 'You\u2019re guessing at weights.',
    body: 'How heavy is heavy enough? When should it go up? You\u2019ve been doing the same dumbbells for months because nobody told you the rules.',
  },
]

const FOR_YOU = [
  'You\u2019re a woman, new-ish to the gym, and you want to actually know what you\u2019re doing',
  'You\u2019ve bought programmes before and never made it past week three',
  'You can train 3 times a week and you have access to a normal gym',
  'You want education, not just a calendar of exercises',
]

const NOT_FOR_YOU = [
  'You\u2019re an advanced lifter looking for a peaking programme',
  'You want someone to text you daily and hold your hand',
  'You\u2019re looking for a 30-day quick fix or a \u201cshred\u201d',
  'You want a meal plan (that\u2019s the Nutrition Blueprint — different product)',
]

const TESTIMONIALS = [
  {
    name: 'Sophie R.',
    meta: '24 \u00b7 Manchester',
    rot: -1.6,
    quote:
      'I\u2019ve bought three programmes before this and never finished any of them. Eight weeks later I actually understand what I\u2019m doing in the gym. I built my own plan last week. Never thought I\u2019d say that.',
  },
  {
    name: 'Jade T.',
    meta: '22 \u00b7 London',
    rot: 1.2,
    quote:
      'Week 3 was when it clicked. I stopped just following the exercises and started actually understanding them. Worth every penny.',
  },
  {
    name: 'Chloe M.',
    meta: '27 \u00b7 Leeds',
    rot: -0.8,
    quote:
      'I used to feel embarrassed in the free-weights section. Now I walk in, do my session, and leave. That\u2019s it. That\u2019s the whole change. It\u2019s everything.',
  },
]

const MATHS_ROWS = [
  { what: '1 PT session (one-off)', cost: '\u00a345', here: '\u00a349.99' },
  { what: 'Custom plan (one refresh)', cost: '\u00a380', here: '\u00a349.99' },
  { what: 'Programme app (1 year)', cost: '\u00a3120+', here: '\u00a349.99' },
]

const FAQS = [
  {
    q: 'I\u2019ve literally never trained before. Is this for me?',
    a: 'Yes — this is built for beginners. Phase 01 starts you on full-body training with the lightest possible curve. The chapter teaches you what each lift is before you do it. If you can walk into a gym, you can do week one.',
  },
  {
    q: 'I\u2019ve trained for six months. Am I past this?',
    a: 'Probably not. Most people who\u2019ve trained for under two years are still guessing — about weights, splits, recovery. The education is what\u2019s missing, not the reps. If you can already write your own programme from scratch, this isn\u2019t for you.',
  },
  {
    q: 'Do I need a full gym? Can I do it at home?',
    a: 'You need a normal commercial gym (a barbell, dumbbells, a few machines). It\u2019s not designed for home / dumbbell-only training. If your gym has a squat rack and a bench, you\u2019re fine.',
  },
  {
    q: 'How much time per week?',
    a: 'Three sessions of 45–60 minutes, plus about 20 minutes of reading. Total: ~3 hours a week. Sessions are designed for real life, not \u201celite athlete\u201d schedules.',
  },
  {
    q: 'What\u2019s the difference between this and free YouTube content?',
    a: 'YouTube teaches one thing at a time. This teaches you a system across 56 days, in order, with a template at the end. You can absolutely learn this from free content — most people don\u2019t, because there\u2019s no structure and no end-point.',
  },
  {
    q: 'Do I get lifetime access? Updates?',
    a: 'Yes — you keep the programme forever, and every future update is free. No subscription. No \u201cpremium tier\u201d later.',
  },
  {
    q: 'What if I\u2019m on my period / sick / can\u2019t train one week?',
    a: 'The programme is self-paced. Each week unlocks when you\u2019re ready. Miss a week, pick it up Monday. Nothing is locked behind a calendar.',
  },
  {
    q: 'What if I don\u2019t love it?',
    a: 'Email me within 14 days, full refund — provided you haven’t unlocked Week 3 yet. (Unlocking Week 3 means you’ve worked through Weeks 1 and 2, which is enough material that a refund stops being fair on either side.) No forms, no questions otherwise. You keep nothing, you owe nothing.',
  },
]

/* ──────────────────────────────────────────────
   PAGE
────────────────────────────────────────────── */

export default function Page() {
  return (
    <div className="km-page">
      <KmNavbar activePage="training" />

      <style>{`
        /* ════════════════════════════════════════
           HERO
        ════════════════════════════════════════ */
        .t-hero { padding: 60px 0 50px; position: relative; }
        .t-hero-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(to right, rgba(201,214,226,0.28) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(201,214,226,0.28) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
          mask-image: linear-gradient(to bottom, black 60%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent);
        }
        .t-hero-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 60px; align-items: center; position: relative; }
        .t-hero h1 { font-family: var(--serif); font-size: clamp(2.4rem, 4.6vw, 3.8rem); font-weight: 500; letter-spacing: -0.02em; line-height: 1.05; margin: 20px 0 22px; }
        .t-hero h1 em { font-style: italic; color: var(--accent); }
        .t-hero-lead { font-size: 17px; line-height: 1.7; color: var(--ink-soft); max-width: 500px; margin-bottom: 28px; }
        .t-buy-box { display: flex; gap: 24px; align-items: center; flex-wrap: wrap; padding: 20px 24px; background: var(--paper); border: 1.5px solid var(--ink); border-radius: 3px; position: relative; max-width: 540px; }
        .t-buy-box::before { content: ''; position: absolute; inset: 4px; border: 1px dashed var(--paper-edge); border-radius: 2px; pointer-events: none; }
        .t-buy-price { font-family: var(--serif); font-size: 40px; font-weight: 500; line-height: 1; }
        .t-buy-sub { font-family: var(--mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-muted); margin-top: 6px; }
        .t-trust { margin-top: 18px; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-muted); }
        .t-trust span { color: var(--paper-edge); margin: 0 8px; }

        .t-cover-wrap { position: relative; }
        .t-cover { background: var(--paper); border: 1px solid var(--ink); padding: 32px; position: relative; box-shadow: 4px 4px 0 var(--ink); transform: rotate(-1.4deg); }
        .t-cover-eyebrow { font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em; color: var(--accent); text-transform: uppercase; margin-bottom: 18px; }
        .t-cover h3 { font-family: var(--serif); font-size: 28px; font-weight: 500; line-height: 1.05; letter-spacing: -0.02em; margin-bottom: 16px; }
        .t-cover-divider { width: 60px; height: 2px; background: var(--ink); margin: 14px 0; }
        .t-cover-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
        .t-cover-list li { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; color: var(--ink-soft); padding: 6px 0; border-bottom: 1px solid var(--paper-edge); }
        .t-cover-list li span { color: var(--accent); margin-right: 8px; }
        .t-cover-margin {
          position: absolute; top: -22px; right: -10px;
          font-family: var(--hand); font-size: 22px; color: var(--margin-red);
          transform: rotate(4deg); line-height: 1.1; text-align: right;
          max-width: 180px;
        }

        /* ════════════════════════════════════════
           PROBLEM (Section 2)
        ════════════════════════════════════════ */
        .prob-section { padding: 90px 0 70px; border-top: 1px solid var(--paper-edge); position: relative; }
        .prob-head { max-width: 760px; margin-bottom: 56px; }
        .prob-head h2 { font-family: var(--serif); font-size: clamp(1.9rem, 3.4vw, 2.6rem); font-weight: 500; line-height: 1.12; letter-spacing: -0.015em; margin-top: 14px; }
        .prob-head h2 em { font-style: italic; color: var(--accent); }
        .prob-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; position: relative; }
        .prob-card { background: var(--paper); border: 1px solid var(--paper-edge); padding: 28px 26px 30px; position: relative; }
        .prob-card::before {
          content: ''; position: absolute; left: 26px; top: 26px;
          width: 22px; height: 1.5px; background: var(--accent);
        }
        .prob-card .num { font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em; color: var(--ink-muted); text-transform: uppercase; margin-bottom: 32px; display: block; }
        .prob-card h3 { font-family: var(--serif); font-style: italic; font-size: 22px; font-weight: 500; line-height: 1.2; margin-bottom: 14px; letter-spacing: -0.01em; }
        .prob-card p { font-size: 15px; line-height: 1.7; color: var(--ink-soft); }
        .prob-margin {
          position: absolute; right: 0; bottom: -34px;
          font-family: var(--hand); font-size: 28px; color: var(--margin-red);
          transform: rotate(-2deg);
        }

        /* ════════════════════════════════════════
           WHY (Section 3) — deep agitation
        ════════════════════════════════════════ */
        .why-section { padding: 100px 0; border-top: 1px solid var(--paper-edge); background: var(--paper-deep); }
        .why-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 70px; align-items: start; }
        .why-grid h2 { font-family: var(--serif); font-size: clamp(2rem, 3.6vw, 2.9rem); font-weight: 500; line-height: 1.08; letter-spacing: -0.02em; margin-top: 14px; }
        .why-grid h2 em { font-style: italic; color: var(--accent); }
        .why-body p { font-size: 16px; line-height: 1.8; color: var(--ink-soft); margin-bottom: 18px; font-style: italic; }
        .why-body p strong { font-style: normal; color: var(--ink); font-weight: 600; }
        .why-pull {
          margin-top: 48px; padding: 36px 0 0;
          border-top: 1.5px dashed var(--paper-edge);
        }
        .why-pull blockquote {
          font-family: var(--serif); font-size: clamp(1.5rem, 2.8vw, 2.2rem);
          font-weight: 400; font-style: italic; line-height: 1.4;
          color: var(--ink); max-width: 720px; margin: 0; position: relative;
          padding-left: 28px;
        }
        .why-pull blockquote::before {
          content: ''; position: absolute; left: 0; top: 8px; bottom: 8px;
          width: 3px; background: var(--accent);
        }

        /* ════════════════════════════════════════
           SOLUTION INTRO (Section 4)
        ════════════════════════════════════════ */
        .t-solution { padding: 90px 0 50px; border-top: 1px solid var(--paper-edge); }
        .t-solution-head { max-width: 760px; margin-bottom: 12px; }
        .t-solution-head h2 { font-family: var(--serif); font-size: clamp(1.9rem, 3.4vw, 2.6rem); font-weight: 500; line-height: 1.1; letter-spacing: -0.015em; margin-top: 14px; }
        .t-solution-head h2 em { font-style: italic; color: var(--accent); }
        .t-solution-head p { margin-top: 16px; font-size: 16px; line-height: 1.75; color: var(--ink-soft); max-width: 620px; }

        /* CURRICULUM (preserved) */
        .t-curriculum { padding: 40px 0 80px; }
        .t-phases { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-top: 1px solid var(--paper-edge); }
        .t-phase { padding: 32px; border-right: 1px solid var(--paper-edge); border-bottom: 1px solid var(--paper-edge); }
        .t-phase:nth-child(2n) { border-right: none; }
        .t-phase:nth-child(3), .t-phase:nth-child(4) { border-bottom: none; }
        .t-phase-header { display: flex; align-items: baseline; gap: 16px; margin-bottom: 18px; }
        .t-phase-num { font-family: var(--mono); font-size: 11px; letter-spacing: 0.22em; color: var(--accent); flex-shrink: 0; }
        .t-phase-weeks { font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em; color: var(--ink-muted); }
        .t-phase h3 { font-family: var(--serif); font-size: 22px; font-weight: 500; margin-bottom: 16px; }
        .t-phase-topics { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
        .t-phase-topics li { font-size: 14px; line-height: 1.6; color: var(--ink-soft); padding-left: 16px; position: relative; }
        .t-phase-topics li::before { content: '\u2014'; position: absolute; left: 0; color: var(--accent); }

        /* ════════════════════════════════════════
           QUALIFIER (Section 5) — for / not for
        ════════════════════════════════════════ */
        .qual-section { padding: 100px 0; border-top: 1px solid var(--paper-edge); position: relative; }
        .qual-head { max-width: 760px; margin-bottom: 56px; }
        .qual-head h2 { font-family: var(--serif); font-size: clamp(1.9rem, 3.4vw, 2.6rem); font-weight: 500; line-height: 1.12; letter-spacing: -0.015em; margin-top: 14px; }
        .qual-head h2 em { font-style: italic; color: var(--accent); }
        .qual-cols {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0;
          background: var(--paper);
          border: 1px solid var(--paper-edge);
          position: relative;
        }
        .qual-cols::before {
          content: ''; position: absolute; left: 50%; top: 24px; bottom: 24px;
          width: 1px; border-left: 1.5px dashed var(--paper-edge);
        }
        .qual-col { padding: 36px 40px 40px; }
        .qual-col h3 {
          font-family: var(--serif); font-style: italic; font-size: 20px;
          font-weight: 500; margin-bottom: 22px; letter-spacing: -0.005em;
        }
        .qual-col h3 .lbl {
          display: block; font-family: var(--mono); font-style: normal;
          font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--ink-muted); margin-bottom: 6px;
        }
        .qual-col--yes h3 .lbl { color: var(--sage); }
        .qual-col--no  h3 .lbl { color: var(--margin-red); }
        .qual-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px; }
        .qual-list li {
          position: relative; padding-left: 32px;
          font-size: 15px; line-height: 1.6; color: var(--ink-soft);
        }
        .qual-list li::before {
          position: absolute; left: 0; top: 0; width: 22px; height: 22px;
          font-family: var(--mono); font-size: 13px; font-weight: 700;
          display: inline-flex; align-items: center; justify-content: center;
          border-radius: 50%;
        }
        .qual-col--yes .qual-list li::before {
          content: '\u2713';
          color: var(--sage); border: 1.5px solid var(--sage);
          background: rgba(122,139,110,0.08);
        }
        .qual-col--no .qual-list li::before {
          content: '\u2715';
          color: var(--margin-red); border: 1.5px solid var(--margin-red);
          background: rgba(194,106,92,0.06);
        }

        /* ════════════════════════════════════════
           WEEK 1 SPOTLIGHT (preserved, hook added)
        ════════════════════════════════════════ */
        .t-spot { padding: 90px 0; border-top: 1px solid var(--paper-edge); background: var(--paper-deep); }
        .t-spot-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
        .t-spot h2 { font-family: var(--serif); font-size: clamp(1.8rem, 3.2vw, 2.4rem); font-weight: 500; line-height: 1.1; margin-bottom: 16px; }
        .t-spot-lead { font-size: 16px; line-height: 1.75; color: var(--ink-soft); margin-bottom: 24px; }
        .t-spot-detail { font-size: 14px; line-height: 1.7; color: var(--ink-soft); padding-left: 16px; border-left: 3px solid var(--accent); margin-bottom: 14px; }
        .t-spot-hook {
          margin-bottom: 28px; padding: 18px 22px;
          background: var(--paper); border: 1px solid var(--paper-edge);
          border-left: 3px solid var(--margin-red);
        }
        .t-spot-hook strong {
          display: block; font-family: var(--serif); font-size: 16px;
          font-weight: 600; margin-bottom: 6px; letter-spacing: -0.005em;
        }
        .t-spot-hook p { font-size: 14.5px; line-height: 1.65; color: var(--ink-soft); font-style: italic; margin: 0; }
        .t-mindmap { position: relative; background: var(--paper); border: 1px solid var(--paper-edge); padding: 32px; }
        .t-mindmap-inner { position: relative; height: 260px; }
        .t-mindmap-hand { font-family: var(--hand); color: var(--margin-red); font-size: 18px; margin-top: 14px; display: block; }

        /* ════════════════════════════════════════
           TOOLBOX (preserved structure — copy rewritten)
        ════════════════════════════════════════ */
        .t-payoff { padding: 96px 0 40px; border-top: 1px solid var(--paper-edge); position: relative; }
        .t-payoff-intro { display: grid; grid-template-columns: 1.1fr 1fr; gap: 60px; align-items: end; margin-bottom: 70px; }
        .t-payoff-intro h2 { font-family: var(--serif); font-weight: 500; font-size: clamp(2rem, 3.6vw, 2.9rem); line-height: 1.08; letter-spacing: -0.02em; margin-top: 14px; }
        .t-payoff-intro h2 em { font-style: italic; color: var(--accent); }
        .t-payoff-lead { font-size: 16px; line-height: 1.75; color: var(--ink-soft); max-width: 440px; }
        .t-payoff-pull { font-family: var(--hand); font-size: 26px; color: var(--margin-red); line-height: 1.15; transform: rotate(-1.2deg); display: inline-block; margin-top: 18px; }

        .t-tray { margin-top: 56px; background: var(--paper); border: 1.5px solid var(--ink); border-radius: 4px; position: relative; padding: 14px 14px 18px; box-shadow: 4px 6px 0 rgba(31,27,22,0.08); }
        .t-tray::before { content: ''; position: absolute; inset: 5px; border: 1px dashed var(--paper-edge); border-radius: 3px; pointer-events: none; }
        .t-tray-spine { position: absolute; top: -10px; left: 24px; background: var(--ink); color: var(--paper); font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em; padding: 4px 10px; text-transform: uppercase; }
        .t-tray-spine span { color: var(--accent-soft); }
        .t-tray-items { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; position: relative; }
        .t-tray-items::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(to right, var(--paper-edge) 1px, transparent 1px); background-size: calc(100%/5) 100%; pointer-events: none; opacity: 0.6; }
        .t-tray-item { display: flex; flex-direction: column; align-items: flex-start; padding: 18px 16px 22px; position: relative; text-decoration: none; transition: background 0.2s ease; cursor: pointer; }
        .t-tray-item:hover { background: var(--paper-deep); }
        .t-tray-item .tray-num { font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em; color: var(--ink-muted); margin-bottom: 14px; }
        .t-tray-item .tray-icon { width: 38px; height: 38px; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; }
        .t-tray-item .tray-lbl { font-family: var(--serif); font-size: 15px; font-weight: 500; line-height: 1.2; color: var(--ink); margin-bottom: 6px; }
        .t-tray-item .tray-sub { font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; color: var(--ink-muted); text-transform: uppercase; }
        .t-tray-item[data-tint="accent"] .tray-icon { color: var(--accent); }
        .t-tray-item[data-tint="sage"]   .tray-icon { color: var(--sage); }
        .t-tray-item[data-tint="gold"]   .tray-icon { color: var(--gold); }
        .t-tray-item[data-tint="blue"]   .tray-icon { color: #3D5A80; }
        .t-tray-item[data-tint="red"]    .tray-icon { color: var(--margin-red); }
        .t-tray-item .tray-bar { position: absolute; left: 16px; right: 16px; bottom: 8px; height: 3px; border-radius: 2px; opacity: 0.85; }
        .t-tray-item[data-tint="accent"] .tray-bar { background: var(--accent); }
        .t-tray-item[data-tint="sage"]   .tray-bar { background: var(--sage); }
        .t-tray-item[data-tint="gold"]   .tray-bar { background: var(--gold); }
        .t-tray-item[data-tint="blue"]   .tray-bar { background: #3D5A80; }
        .t-tray-item[data-tint="red"]    .tray-bar { background: var(--margin-red); }

        .t-tool { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; padding: 90px 0; border-top: 1px solid var(--paper-edge); position: relative; }
        .t-tool.reverse .t-tool-visual { order: 2; }
        .t-tool-tag { display: inline-flex; align-items: center; gap: 10px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent); margin-bottom: 16px; }
        .t-tool-tag .dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
        .t-tool-copy h3 { font-family: var(--serif); font-size: clamp(1.6rem, 2.4vw, 2.1rem); font-weight: 500; line-height: 1.1; letter-spacing: -0.01em; margin-bottom: 18px; }
        .t-tool-copy h3 em { font-style: italic; }
        .t-tool-copy p.body { font-size: 16px; line-height: 1.75; color: var(--ink-soft); max-width: 460px; }
        .t-tool-copy .bullets { list-style: none; margin: 18px 0 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
        .t-tool-copy .bullets li { font-size: 14px; line-height: 1.6; color: var(--ink-soft); padding-left: 22px; position: relative; }
        .t-tool-copy .bullets li::before { content: '\u2713'; position: absolute; left: 0; top: 0; font-family: var(--mono); font-size: 13px; color: var(--accent); font-weight: 600; }
        .t-tool-copy .hook { margin-top: 26px; display: inline-block; font-family: var(--hand); font-size: 26px; line-height: 1.15; color: var(--margin-red); transform: rotate(-1deg); }
        .t-tool--sage .t-tool-tag { color: var(--sage); }
        .t-tool--gold .t-tool-tag { color: var(--gold); }
        .t-tool--blue .t-tool-tag { color: #3D5A80; }
        .t-tool--red  .t-tool-tag { color: var(--margin-red); }
        .t-tool--sage .t-tool-copy .bullets li::before { color: var(--sage); }
        .t-tool--gold .t-tool-copy .bullets li::before { color: var(--gold); }
        .t-tool--blue .t-tool-copy .bullets li::before { color: #3D5A80; }
        .t-tool--red  .t-tool-copy .bullets li::before { color: var(--margin-red); }

        /* TOOL VISUAL: TEMPLATE */
        .tv-template { background: var(--paper); border: 1px solid var(--ink); box-shadow: 6px 6px 0 var(--paper-deep), 6px 6px 0 1px var(--ink); transform: rotate(-1.5deg); padding: 22px 24px 28px; position: relative; max-width: 440px; }
        .tv-template::after { content: ''; position: absolute; top: -10px; left: 28%; width: 72px; height: 16px; background: rgba(184,146,58,0.22); border: 1px solid rgba(184,146,58,0.3); transform: rotate(-3deg); }
        .tv-template-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 14px; }
        .tv-template-head .title { font-family: var(--hand); font-size: 26px; color: var(--ink); line-height: 1; }
        .tv-template-head .title .blank { color: var(--margin-red); border-bottom: 1.5px dashed var(--margin-red); padding-bottom: 2px; }
        .tv-template-head .week-lbl { font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em; color: var(--ink-muted); text-transform: uppercase; }
        .tv-template-rule { height: 1px; background: var(--ink); opacity: 0.18; margin: 4px 0 14px; }
        .tv-template-table { width: 100%; border-collapse: collapse; }
        .tv-template-table th { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-muted); text-align: left; padding: 6px 4px; border-bottom: 1px solid var(--paper-edge); font-weight: 500; }
        .tv-template-table td { font-family: var(--sans); font-size: 12px; padding: 9px 4px; border-bottom: 1px dashed var(--paper-edge); color: var(--ink-soft); vertical-align: top; }
        .tv-template-table td.day { font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em; color: var(--ink); text-transform: uppercase; width: 56px; }
        .tv-template-table td.fill { font-family: var(--hand); color: var(--accent); font-size: 18px; line-height: 1; padding-top: 11px; }
        .tv-template-table td.empty { color: var(--ink-muted); font-style: italic; }
        .tv-template-foot { display: flex; justify-content: space-between; align-items: center; margin-top: 14px; }
        .tv-template-foot .stamp { font-family: var(--mono); font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); border: 1.5px solid var(--accent); padding: 4px 8px; background: rgba(184,84,58,0.06); transform: rotate(-2deg); }
        .tv-template-foot .sign { font-family: var(--hand); font-size: 22px; color: var(--ink); line-height: 1; }

        /* TOOL VISUAL: HABIT */
        .tv-habit { background: var(--paper); border: 1px solid var(--paper-edge); padding: 28px 30px 26px; position: relative; max-width: 460px; box-shadow: 0 12px 24px -16px rgba(31,27,22,0.18); }
        .tv-habit-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 18px; }
        .tv-habit-head .lbl { font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--sage); }
        .tv-habit-head .lbl strong { color: var(--ink); }
        .tv-habit-head .key { font-family: var(--mono); font-size: 9px; letter-spacing: 0.14em; color: var(--ink-muted); text-transform: uppercase; display: flex; align-items: center; gap: 6px; }
        .tv-habit-head .key i { display: inline-block; width: 9px; height: 9px; background: var(--sage); border-radius: 1px; }
        .tv-habit-grid { display: grid; grid-template-columns: 36px repeat(7, 1fr); gap: 6px; }
        .tv-habit-grid .colhd { font-family: var(--mono); font-size: 9px; color: var(--ink-muted); text-align: center; letter-spacing: 0.1em; }
        .tv-habit-grid .rowhd { font-family: var(--mono); font-size: 9px; color: var(--ink-muted); letter-spacing: 0.1em; padding-top: 6px; }
        .tv-habit-grid .cell { aspect-ratio: 1; border-radius: 2px; background: var(--paper-deep); border: 1px solid var(--paper-edge); position: relative; }
        .tv-habit-grid .cell.s1 { background: rgba(122,139,110,0.32); border-color: rgba(122,139,110,0.4); }
        .tv-habit-grid .cell.s2 { background: rgba(122,139,110,0.62); border-color: rgba(122,139,110,0.7); }
        .tv-habit-grid .cell.s3 { background: var(--sage); border-color: var(--sage); }
        .tv-habit-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 22px; padding-top: 20px; border-top: 1px solid var(--paper-edge); }
        .tv-habit-stats .stat .v { font-family: var(--serif); font-size: 28px; font-weight: 500; color: var(--sage); letter-spacing: -0.01em; line-height: 1; }
        .tv-habit-stats .stat .l { font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-muted); margin-top: 6px; }
        .tv-habit-margin { position: absolute; right: -10px; top: 16px; font-family: var(--hand); font-size: 22px; color: var(--margin-red); transform: rotate(8deg); }

        /* TOOL VISUAL: RECEIPT */
        .tv-receipt { width: 100%; max-width: 380px; background: #FBF7EE; font-family: var(--mono); font-size: 12px; color: var(--ink); padding: 28px 26px 38px; position: relative; filter: drop-shadow(2px 4px 0 rgba(31,27,22,0.06)) drop-shadow(0 18px 24px rgba(31,27,22,0.12)); --tooth: 8px; -webkit-mask: radial-gradient(circle var(--tooth) at var(--tooth) 0, transparent 98%, #000 100%) 0 0/calc(var(--tooth)*2) var(--tooth) repeat-x, radial-gradient(circle var(--tooth) at var(--tooth) 100%, transparent 98%, #000 100%) 0 100%/calc(var(--tooth)*2) var(--tooth) repeat-x, linear-gradient(#000 0 0); -webkit-mask-composite: source-over; mask: radial-gradient(circle var(--tooth) at var(--tooth) 0, transparent 98%, #000 100%) 0 0/calc(var(--tooth)*2) var(--tooth) repeat-x, radial-gradient(circle var(--tooth) at var(--tooth) 100%, transparent 98%, #000 100%) 0 100%/calc(var(--tooth)*2) var(--tooth) repeat-x, linear-gradient(#000 0 0); transform: rotate(1.2deg); }
        .tv-receipt h4 { font-family: var(--mono); font-size: 11px; letter-spacing: 0.24em; text-align: center; margin: 4px 0 2px; font-weight: 700; }
        .tv-receipt .sub { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.2em; text-align: center; color: var(--ink-muted); margin-bottom: 14px; }
        .tv-receipt .dash { border-top: 1.5px dashed var(--ink); opacity: 0.55; margin: 10px 0; }
        .tv-receipt .meta { display: flex; justify-content: space-between; font-size: 10.5px; letter-spacing: 0.08em; color: var(--ink-soft); }
        .tv-receipt .meta + .meta { margin-top: 3px; }
        .tv-receipt .section-hd { font-size: 10px; letter-spacing: 0.22em; text-align: center; color: var(--ink-muted); margin: 4px 0; }
        .tv-receipt ul.lines { list-style: none; margin: 0; padding: 0; }
        .tv-receipt ul.lines li { display: grid; grid-template-columns: 1fr auto; gap: 6px; padding: 4px 0; font-size: 11.5px; line-height: 1.35; }
        .tv-receipt ul.lines li .nm { color: var(--ink); }
        .tv-receipt ul.lines li .qt { display: block; font-size: 9.5px; color: var(--ink-muted); letter-spacing: 0.06em; margin-top: 1px; }
        .tv-receipt ul.lines li .pr { color: var(--ink); white-space: nowrap; }
        .tv-receipt .total { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; font-size: 12px; font-weight: 600; }
        .tv-receipt .total .lbl-stack { display: flex; flex-direction: column; line-height: 1.05; }
        .tv-receipt .total .lbl-stack small { font-size: 8.5px; font-weight: 500; letter-spacing: 0.18em; color: var(--ink-muted); margin-top: 2px; }
        .tv-receipt .saved { display: flex; justify-content: space-between; font-size: 18px; font-weight: 700; color: var(--gold); margin: 8px 0 4px; }
        .tv-receipt .receipt-stamp { position: absolute; right: -22px; bottom: 14px; font-family: var(--mono); font-size: 10px; font-weight: 700; letter-spacing: 0.22em; color: var(--gold); border: 2.5px solid var(--gold); padding: 8px 12px; background: rgba(251,247,238,0.95); transform: rotate(-12deg); text-align: center; line-height: 1.2; box-shadow: 0 4px 10px -6px rgba(31,27,22,0.18); }
        .tv-receipt .receipt-stamp small { display: block; font-size: 8px; letter-spacing: 0.16em; opacity: 0.75; margin-top: 2px; }
        .tv-receipt .footnote { font-size: 9px; letter-spacing: 0.08em; color: var(--ink-muted); text-align: center; margin-top: 10px; }
        .tv-receipt .barcode { display: flex; gap: 1.5px; justify-content: center; margin-top: 14px; }
        .tv-receipt .barcode i { display: block; width: 2px; height: 28px; background: var(--ink); }
        .tv-receipt .barcode i:nth-child(3n) { height: 24px; width: 1px; }
        .tv-receipt .barcode i:nth-child(5n) { height: 30px; width: 3px; }
        .tv-receipt .barcode i:nth-child(7n) { height: 22px; }

        /* TOOL VISUAL: GLOSSARY */
        .tv-glossary { background: var(--paper); border: 1px solid var(--paper-edge); position: relative; max-width: 460px; box-shadow: 0 14px 28px -18px rgba(31,27,22,0.2); background-image: linear-gradient(to bottom, transparent 31px, rgba(201,214,226,0.55) 31px, rgba(201,214,226,0.55) 32px, transparent 32px); background-size: 100% 32px; padding-top: 6px; }
        .tv-glossary::before { content: ''; position: absolute; left: 38px; top: 0; bottom: 0; width: 1.5px; background: rgba(194,106,92,0.4); }
        .tv-glossary-head { display: flex; justify-content: space-between; align-items: baseline; padding: 18px 24px 8px 56px; }
        .tv-glossary-head .lbl { font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: #3D5A80; }
        .tv-glossary-head .lbl strong { color: var(--ink); }
        .tv-glossary-head .num { font-family: var(--mono); font-size: 9px; letter-spacing: 0.16em; color: var(--ink-muted); }
        .tv-glossary-list { list-style: none; margin: 0; padding: 0 24px 22px 56px; }
        .tv-glossary-list li { padding: 6px 0; border-bottom: 1px dashed transparent; min-height: 32px; display: flex; flex-direction: column; justify-content: center; }
        .tv-glossary-list li .row { display: flex; gap: 10px; align-items: baseline; }
        .tv-glossary-list li .term { font-family: var(--serif); font-weight: 600; font-size: 15px; color: var(--ink); letter-spacing: -0.01em; flex-shrink: 0; }
        .tv-glossary-list li .ipa { font-family: var(--mono); font-size: 10px; letter-spacing: 0.06em; color: var(--ink-muted); }
        .tv-glossary-list li .def { font-size: 13px; color: var(--ink-soft); line-height: 1.4; }
        .tv-glossary-list li .def em { font-style: italic; color: #3D5A80; }
        .tv-glossary-margin { position: absolute; right: -8px; bottom: 18px; font-family: var(--hand); font-size: 22px; color: var(--margin-red); transform: rotate(-4deg); line-height: 1; }

        /* TOOL VISUAL: VAULT */
        .tv-vault { position: relative; max-width: 520px; display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, auto); gap: 18px 16px; }
        .tv-vault::before { content: 'EXERCISE INDEX \u00b7 A\u2192Z'; position: absolute; top: -28px; left: 0; font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em; color: var(--margin-red); }
        .tv-polaroid { background: #FBF7EE; padding: 8px 8px 22px; box-shadow: 0 1px 0 rgba(31,27,22,0.06), 0 14px 22px -16px rgba(31,27,22,0.25); display: flex; flex-direction: column; position: relative; }
        .tv-polaroid:nth-child(1) { transform: rotate(-2.4deg); }
        .tv-polaroid:nth-child(2) { transform: rotate(1.1deg); }
        .tv-polaroid:nth-child(3) { transform: rotate(-1deg); margin-top: 14px; }
        .tv-polaroid:nth-child(4) { transform: rotate(0.8deg); margin-top: -10px; }
        .tv-polaroid:nth-child(5) { transform: rotate(-1.6deg); }
        .tv-polaroid:nth-child(6) { transform: rotate(2.2deg); margin-top: 4px; }
        .tv-polaroid .pic { aspect-ratio: 1; background: var(--paper-deep); background-image: repeating-linear-gradient(135deg, rgba(31,27,22,0.05) 0, rgba(31,27,22,0.05) 1px, transparent 1px, transparent 12px); border: 1px solid var(--paper-edge); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
        .tv-polaroid .pic-lbl { font-family: var(--hand); font-size: 18px; color: var(--ink); text-align: center; line-height: 1.05; margin-top: 8px; }
        .tv-polaroid .pic-tag { position: absolute; top: 4px; right: 4px; font-family: var(--mono); font-size: 8px; letter-spacing: 0.14em; color: var(--margin-red); padding: 2px 5px; border: 1px solid var(--margin-red); background: rgba(194,106,92,0.06); }
        .tv-vault-stamp { position: absolute; right: -36px; bottom: -28px; transform: rotate(-8deg); font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em; color: var(--margin-red); border: 2px solid var(--margin-red); padding: 8px 12px; background: rgba(251,247,238,0.95); text-align: center; line-height: 1.3; box-shadow: 0 6px 14px -8px rgba(31,27,22,0.2); z-index: 3; }
        .tv-vault-stamp strong { display: block; font-size: 22px; font-family: var(--serif); letter-spacing: -0.01em; }

        .t-payoff-close { padding: 60px 0 90px; text-align: center; }
        .t-payoff-close .stamp-line { display: inline-flex; align-items: center; gap: 18px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.22em; color: var(--ink-muted); text-transform: uppercase; }
        .t-payoff-close .stamp-line::before, .t-payoff-close .stamp-line::after { content: ''; width: 60px; height: 1px; background: var(--ink); opacity: 0.2; }
        .t-payoff-close h3 { font-family: var(--serif); font-size: clamp(1.8rem, 3vw, 2.4rem); font-weight: 500; line-height: 1.15; max-width: 660px; margin: 18px auto 12px; }
        .t-payoff-close h3 em { font-style: italic; color: var(--accent); }
        .t-payoff-close p { font-size: 15px; color: var(--ink-soft); max-width: 520px; margin: 0 auto; line-height: 1.7; }

        /* ════════════════════════════════════════
           TESTIMONIALS (Section 8)
        ════════════════════════════════════════ */
        .tst-section { padding: 100px 0; border-top: 1px solid var(--paper-edge); position: relative; }
        .tst-head { max-width: 760px; margin-bottom: 64px; }
        .tst-head h2 { font-family: var(--serif); font-size: clamp(1.9rem, 3.4vw, 2.6rem); font-weight: 500; line-height: 1.1; letter-spacing: -0.015em; margin-top: 14px; }
        .tst-head h2 em { font-style: italic; color: var(--accent); }
        .tst-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 36px 28px; padding: 20px 0;
        }
        .tst-card {
          background: var(--paper); border: 1px solid var(--paper-edge);
          padding: 32px 28px 26px; position: relative;
          box-shadow: 0 10px 28px -18px rgba(31,27,22,0.25), 2px 2px 0 var(--paper-deep);
        }
        .tst-card::before {
          content: '\u201C';
          position: absolute; top: -8px; left: 14px;
          font-family: var(--serif); font-size: 70px; color: var(--accent);
          line-height: 1;
        }
        .tst-card blockquote {
          font-family: var(--serif); font-size: 17px; font-style: italic;
          font-weight: 400; line-height: 1.55; color: var(--ink);
          margin: 8px 0 22px; letter-spacing: -0.005em;
        }
        .tst-card .byline {
          padding-top: 18px; border-top: 1px dashed var(--paper-edge);
          font-family: var(--mono); font-size: 11px;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--ink-muted);
        }
        .tst-card .byline strong {
          display: block; color: var(--ink); font-weight: 600;
          letter-spacing: 0.16em; margin-bottom: 4px;
        }

        /* ════════════════════════════════════════
           RISK REVERSAL (Section 9) — coupon
        ════════════════════════════════════════ */
        .risk-section { padding: 90px 0; border-top: 1px solid var(--paper-edge); }
        .risk-coupon {
          background: var(--paper-deep);
          padding: 56px 64px 58px;
          position: relative;
          --tooth: 10px;
          -webkit-mask:
            radial-gradient(circle var(--tooth) at var(--tooth) 0, transparent 98%, #000 100%) 0 0/calc(var(--tooth)*2) var(--tooth) repeat-x,
            radial-gradient(circle var(--tooth) at var(--tooth) 100%, transparent 98%, #000 100%) 0 100%/calc(var(--tooth)*2) var(--tooth) repeat-x,
            radial-gradient(circle var(--tooth) at 0 var(--tooth), transparent 98%, #000 100%) 0 0/var(--tooth) calc(var(--tooth)*2) repeat-y,
            radial-gradient(circle var(--tooth) at 100% var(--tooth), transparent 98%, #000 100%) 100% 0/var(--tooth) calc(var(--tooth)*2) repeat-y,
            linear-gradient(#000 0 0);
          mask:
            radial-gradient(circle var(--tooth) at var(--tooth) 0, transparent 98%, #000 100%) 0 0/calc(var(--tooth)*2) var(--tooth) repeat-x,
            radial-gradient(circle var(--tooth) at var(--tooth) 100%, transparent 98%, #000 100%) 0 100%/calc(var(--tooth)*2) var(--tooth) repeat-x,
            radial-gradient(circle var(--tooth) at 0 var(--tooth), transparent 98%, #000 100%) 0 0/var(--tooth) calc(var(--tooth)*2) repeat-y,
            radial-gradient(circle var(--tooth) at 100% var(--tooth), transparent 98%, #000 100%) 100% 0/var(--tooth) calc(var(--tooth)*2) repeat-y,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: source-over;
        }
        .risk-coupon-inner {
          position: relative;
          border: 1.5px dashed var(--ink);
          padding: 44px 48px 48px;
        }
        .risk-coupon h2 {
          font-family: var(--serif); font-weight: 500;
          font-size: clamp(1.9rem, 3.4vw, 2.6rem);
          line-height: 1.1; letter-spacing: -0.015em;
          margin-top: 14px; max-width: 640px;
        }
        .risk-coupon h2 em { font-style: italic; color: var(--accent); }
        .risk-coupon p {
          font-family: var(--serif); font-style: italic;
          font-size: 17px; line-height: 1.7; color: var(--ink-soft);
          max-width: 640px; margin-top: 22px;
        }
        .risk-coupon p strong { font-style: normal; color: var(--ink); font-weight: 600; }
        .risk-fineprint {
          margin-top: 18px !important;
          padding: 16px 20px;
          border-top: 1px dashed var(--paper-edge);
          font-family: var(--serif);
          font-style: italic;
          font-size: 14.5px !important;
          line-height: 1.65 !important;
          color: var(--ink-muted) !important;
          max-width: 640px;
        }
        .risk-fineprint strong { font-style: normal; color: var(--ink-soft); font-weight: 600; }
        .risk-stamp {
          position: absolute; right: -10px; top: 24px;
          width: 130px; height: 130px; border-radius: 50%;
          border: 2.5px solid var(--accent);
          background: rgba(184,84,58,0.05);
          display: flex; align-items: center; justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 6px 16px -10px rgba(31,27,22,0.2);
        }
        .risk-stamp-inner {
          width: 110px; height: 110px; border-radius: 50%;
          border: 1px dashed var(--accent);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          font-family: var(--mono); color: var(--accent);
          letter-spacing: 0.2em; text-align: center; text-transform: uppercase;
        }
        .risk-stamp-inner .big {
          font-family: var(--serif); font-style: italic;
          font-size: 28px; letter-spacing: -0.01em;
          color: var(--accent); line-height: 1; margin-bottom: 2px;
        }
        .risk-stamp-inner .lbl { font-size: 8px; line-height: 1.3; max-width: 80px; }

        /* ════════════════════════════════════════
           PRICING MATHS (Section 10)
        ════════════════════════════════════════ */
        .maths-section { padding: 100px 0; border-top: 1px solid var(--paper-edge); }
        .maths-head { max-width: 760px; margin-bottom: 56px; }
        .maths-head h2 { font-family: var(--serif); font-size: clamp(1.9rem, 3.4vw, 2.6rem); font-weight: 500; line-height: 1.1; letter-spacing: -0.015em; margin-top: 14px; }
        .maths-head h2 em { font-style: italic; color: var(--accent); }
        .maths-invoice {
          background: var(--paper); border: 1.5px solid var(--ink);
          position: relative; max-width: 880px; margin: 0 auto;
          box-shadow: 6px 6px 0 var(--paper-deep), 6px 6px 0 1px var(--paper-edge);
        }
        .maths-invoice::before {
          content: ''; position: absolute; inset: 6px;
          border: 1px dashed var(--paper-edge); pointer-events: none;
        }
        .maths-invoice-head {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 18px 28px; border-bottom: 1.5px solid var(--ink);
          font-family: var(--mono); font-size: 10px;
          letter-spacing: 0.24em; text-transform: uppercase;
        }
        .maths-invoice-head .left { color: var(--ink); font-weight: 600; }
        .maths-invoice-head .right { color: var(--ink-muted); }
        .maths-table { width: 100%; border-collapse: collapse; }
        .maths-table th {
          font-family: var(--mono); font-size: 10px;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--ink-muted); padding: 18px 28px;
          text-align: left; border-bottom: 1px solid var(--paper-edge);
          font-weight: 500;
        }
        .maths-table th:nth-child(2), .maths-table th:nth-child(3) { text-align: right; }
        .maths-table td {
          padding: 22px 28px; vertical-align: baseline;
          border-bottom: 1px dashed var(--paper-edge);
        }
        .maths-table tr:last-child td { border-bottom: none; }
        .maths-table td.what {
          font-family: var(--serif); font-size: 18px;
          color: var(--ink); letter-spacing: -0.005em;
        }
        .maths-table td.cost {
          text-align: right; font-family: var(--mono); font-size: 15px;
          color: var(--ink-soft); text-decoration: line-through;
          text-decoration-color: var(--ink-muted);
        }
        .maths-table td.here {
          text-align: right; font-family: var(--serif); font-style: italic;
          font-size: 20px; color: var(--accent); font-weight: 500;
        }
        .maths-invoice-foot {
          padding: 24px 28px; border-top: 1.5px solid var(--ink);
          background: var(--paper-deep);
          font-family: var(--serif); font-style: italic;
          font-size: 17px; line-height: 1.6; color: var(--ink);
        }
        .maths-invoice-foot strong { font-style: normal; font-weight: 600; }

        /* ════════════════════════════════════════
           FAQ (Section 11)
        ════════════════════════════════════════ */
        .faq-section { padding: 100px 0; border-top: 1px solid var(--paper-edge); background: var(--paper-deep); }
        .faq-head { max-width: 760px; margin-bottom: 48px; }
        .faq-head h2 { font-family: var(--serif); font-size: clamp(1.9rem, 3.4vw, 2.6rem); font-weight: 500; line-height: 1.1; letter-spacing: -0.015em; margin-top: 14px; }
        .faq-head h2 em { font-style: italic; color: var(--accent); }
        .faq-list { max-width: 820px; margin: 0 auto; border-top: 1px solid var(--paper-edge); }
        .faq-item {
          border-bottom: 1px solid var(--paper-edge);
          background: var(--paper); transition: background 0.2s ease;
        }
        .faq-item[open] { background: var(--paper); }
        .faq-item summary {
          display: flex; align-items: baseline; gap: 22px;
          padding: 22px 28px; cursor: pointer; list-style: none;
          font-family: var(--serif); font-size: 19px; font-weight: 500;
          color: var(--ink); letter-spacing: -0.005em;
        }
        .faq-item summary::-webkit-details-marker { display: none; }
        .faq-item summary .qnum {
          font-family: var(--mono); font-size: 11px;
          letter-spacing: 0.22em; color: var(--accent);
          flex-shrink: 0; width: 28px;
        }
        .faq-item summary .qtxt { flex: 1; }
        .faq-item summary .toggle {
          font-family: var(--serif); font-size: 26px;
          color: var(--ink-muted); flex-shrink: 0; line-height: 1;
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .faq-item[open] summary .toggle { transform: rotate(45deg); color: var(--accent); }
        .faq-item .answer {
          padding: 0 28px 26px 78px;
          font-size: 15.5px; line-height: 1.75; color: var(--ink-soft);
        }

        /* ════════════════════════════════════════
           FINAL CTA (Section 12)
        ════════════════════════════════════════ */
        .t-cta { padding: 110px 0; border-top: 1px solid var(--paper-edge); background: var(--paper-deep); text-align: center; position: relative; }
        .t-cta h2 { font-family: var(--serif); font-size: clamp(2.2rem, 4.4vw, 3.4rem); font-weight: 500; line-height: 1.08; letter-spacing: -0.02em; margin-top: 18px; margin-bottom: 18px; }
        .t-cta h2 em { font-style: italic; color: var(--accent); }
        .t-cta-sub { font-family: var(--serif); font-style: italic; font-size: 18px; color: var(--ink-soft); margin-bottom: 36px; max-width: 560px; margin-left: auto; margin-right: auto; line-height: 1.6; }
        .t-cta-trust {
          margin-top: 22px; font-family: var(--mono);
          font-size: 11px; letter-spacing: 0.22em;
          color: var(--ink-muted); text-transform: uppercase;
        }
        .t-cta-trust span { color: var(--paper-edge); margin: 0 10px; }
        .t-cta-disclaimer {
          margin-top: 28px; max-width: 560px;
          margin-left: auto; margin-right: auto;
          font-family: var(--serif); font-style: italic;
          font-size: 12.5px; line-height: 1.6;
          color: var(--ink-muted);
          padding-top: 18px;
          border-top: 1px dashed var(--paper-edge);
        }
        .t-cta-margin {
          margin-top: 56px;
          font-family: var(--hand); font-size: 30px;
          color: var(--margin-red); transform: rotate(-2deg);
          display: inline-block; line-height: 1.1;
        }

        /* ════════════════════════════════════════
           RESPONSIVE
        ════════════════════════════════════════ */
        @media (max-width: 960px) {
          .t-payoff-intro { grid-template-columns: 1fr; gap: 28px; }
          .t-tray-items { grid-template-columns: repeat(5, 1fr); }
          .t-tray-item .tray-lbl { font-size: 13px; }
          .t-tool { grid-template-columns: 1fr; gap: 40px; padding: 60px 0; }
          .t-tool.reverse .t-tool-visual { order: 0; }
          .tv-receipt .receipt-stamp { right: 6px; }
          .tv-habit-margin { display: none; }
          .tv-vault-stamp { right: 0; bottom: -32px; }
          .why-grid { grid-template-columns: 1fr; gap: 32px; }
          .prob-grid { grid-template-columns: 1fr; gap: 20px; }
          .prob-margin { display: none; }
          .tst-grid { grid-template-columns: 1fr; gap: 24px; }
          .risk-stamp { right: 12px; top: 12px; width: 110px; height: 110px; }
          .risk-stamp-inner { width: 92px; height: 92px; }
          .risk-stamp-inner .big { font-size: 22px; }
          .risk-coupon { padding: 36px 28px; }
          .risk-coupon-inner { padding: 28px 28px 32px; }
        }
        @media (max-width: 860px) {
          .t-hero-grid { grid-template-columns: 1fr; }
          .t-cover { transform: none; margin: 0 auto; max-width: 420px; }
          .t-cover-margin { right: 0; }
          .t-phases { grid-template-columns: 1fr; }
          .t-phase { border-right: none !important; }
          .t-phase:last-child { border-bottom: none; }
          .t-spot-grid { grid-template-columns: 1fr; }
          .qual-cols { grid-template-columns: 1fr; }
          .qual-cols::before {
            left: 24px; right: 24px; top: 50%; bottom: auto;
            width: auto; height: 1px;
            border-left: none; border-top: 1.5px dashed var(--paper-edge);
          }
          .maths-table td.what { font-size: 16px; }
          .maths-table td.here { font-size: 17px; }
          .maths-table th, .maths-table td { padding-left: 20px; padding-right: 20px; }
          .maths-invoice-head { padding: 14px 20px; }
          .maths-invoice-foot { padding: 20px; font-size: 15px; }
          .faq-item summary { font-size: 17px; gap: 16px; padding: 18px 20px; }
          .faq-item .answer { padding: 0 20px 22px 60px; }
        }
        @media (max-width: 640px) {
          .t-tray-items { grid-template-columns: repeat(2, 1fr); }
          .t-tray-items::before { background-size: 50% 100%; }
          .tv-vault { grid-template-columns: repeat(2, 1fr); }
          .qual-col { padding: 28px 24px; }
          .maths-table td.cost { font-size: 13px; }
          .maths-table td.what { font-size: 15px; }
          .risk-stamp { display: none; }
        }

        /* ════════════════════════════════════════
           SECTION JUMP (between-section guide arrows)
        ════════════════════════════════════════ */
        html { scroll-behavior: smooth; }
        section[id^="sec-"] { scroll-margin-top: 80px; }
        .section-jump {
          position: relative;
          display: flex; justify-content: center;
          padding: 28px 0 24px;
          background: var(--paper);
        }
        .section-jump::before {
          content: ''; position: absolute;
          left: 50%; top: 0;
          width: 1px; height: 22px;
          background: var(--paper-edge);
          transform: translateX(-50%);
        }
        .section-jump a {
          font-family: var(--hand);
          font-size: 22px; line-height: 1;
          color: var(--margin-red);
          text-decoration: none;
          display: inline-flex; align-items: center; gap: 12px;
          padding: 10px 18px;
          transform: rotate(-1.2deg);
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .section-jump a .arrow {
          font-family: var(--mono); font-style: normal;
          font-size: 18px; font-weight: 600;
          color: var(--accent);
          transition: transform 0.2s ease;
          display: inline-block;
        }
        .section-jump a:hover { color: var(--accent); }
        .section-jump a:hover .arrow { transform: translateY(3px); }
        .section-jump a .dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: var(--paper-edge);
          display: inline-block;
        }
        @media (max-width: 640px) {
          .section-jump { padding: 22px 0 18px; }
          .section-jump a { font-size: 19px; gap: 10px; padding: 8px 14px; }
        }
      `}</style>

      <main>
        {/* ════════════════════════════════════════════════════════
            SECTION 1 · HERO
        ════════════════════════════════════════════════════════ */}
        <section className="t-hero" id="sec-hero">
          <div className="t-hero-bg" />
          <div className="km-container">
            <div className="t-hero-grid">
              <div style={{ position: 'relative' }}>
                <span className="eyebrow">The Training Blueprint · For Beginners</span>

                {/*
                  ── HEADLINE A/B/C (pick one, swap into the <h1> below) ─────
                    A · Learn how training actually works. Once. Then never buy a plan again.
                    B · You're already going to the gym. Spend eight weeks learning why — and never need a plan again.
                    C · Stop renting workouts. Learn it once. Own it forever.
                  ───────────────────────────────────────────────────────────
                */}
                <h1>
                  Learn how training actually works. <em>Once.</em>{' '}
                  Then never buy a plan again.
                </h1>

                <p className="t-hero-lead">
                  For women who&rsquo;ve been to the gym, felt lost, and want to actually understand what they&rsquo;re doing. Eight weeks of material that slots into the sessions you&rsquo;re already doing — about 30 minutes a day to learn the <em>why</em>. Not homework. Go at your pace, and keep it for life.
                </p>

                <div className="t-buy-box">
                  <div>
                    <div className="t-buy-price">&pound;49.99</div>
                    <div className="t-buy-sub">Once. Less than a single PT session — and it doesn&rsquo;t expire.</div>
                  </div>
                  <BuyButton requireTerms product="training" label="Start Week One →" />
                </div>

                <div className="t-trust">
                  14-day refund<span>·</span>Instant access<span>·</span>Yours forever
                </div>
              </div>

              <div className="t-cover-wrap">
                <div className="t-cover">
                  <div className="t-cover-eyebrow">Kira Mei · 2026</div>
                  <h3>Training Blueprint</h3>
                  <div className="t-cover-divider" />
                  <ul className="t-cover-list">
                    <li><span>01</span>Full Body — weeks 1–2</li>
                    <li><span>02</span>Upper / Lower — weeks 3–4</li>
                    <li><span>03</span>Push Pull Legs — weeks 5–6</li>
                    <li><span>04</span>PPL Advanced — weeks 7–8</li>
                  </ul>
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--paper-edge)' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>8 weeks · self-paced · progressive</span>
                  </div>
                </div>
                <span className="t-cover-margin">for beginners.<br />read this first.</span>
              </div>
            </div>
          </div>
        </section>

        <div className="section-jump">
          <a href="#sec-problem"><span className="arrow">↓</span> next <span className="dot" /> the problem</a>
        </div>

        {/* ════════════════════════════════════════════════════════
            SECTION 2 · PROBLEM (Agitate)
        ════════════════════════════════════════════════════════ */}
        <section className="prob-section" id="sec-problem">
          <div className="km-container">
            <div className="prob-head">
              <span className="eyebrow">01 · If this sounds familiar</span>
              <h2>
                You&rsquo;ve already paid for the gym. So why does it still feel like <em>everyone else got a manual</em>&nbsp;you didn&rsquo;t?
              </h2>
            </div>
            <div className="prob-grid">
              {PROBLEMS.map((p, i) => (
                <div key={p.title} className="prob-card">
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>&ldquo;{p.title}&rdquo;</h3>
                  <p>{p.body}</p>
                </div>
              ))}
              <span className="prob-margin">none of this is your fault.</span>
            </div>
          </div>
        </section>

        <div className="section-jump">
          <a href="#sec-why"><span className="arrow">↓</span> next <span className="dot" /> the real problem</a>
        </div>

        {/* ════════════════════════════════════════════════════════
            SECTION 3 · WHY (deeper agitation)
        ════════════════════════════════════════════════════════ */}
        <section className="why-section" id="sec-why">
          <div className="km-container">
            <div className="why-grid">
              <div>
                <span className="eyebrow">02 · The real problem</span>
                <h2>
                  The fitness industry <em>doesn&rsquo;t want</em> you to learn.
                </h2>
              </div>
              <div className="why-body">
                <p>
                  Most programmes are designed to be <strong>followed</strong>, not understood. That&rsquo;s the business model: you buy a plan, you finish it, you buy the next one. &pound;45 a session, &pound;80 a refresh, &pound;10 a month for an app, forever.
                </p>
                <p>
                  Learning how training actually works — picking your own weights, building your own splits, knowing when to deload — would end that loop. So nobody teaches it.
                </p>
              </div>
            </div>
            <div className="why-pull">
              <blockquote>
                You&rsquo;re not bad at the gym. You&rsquo;ve just never been taught the gym.
              </blockquote>
            </div>
          </div>
        </section>

        <div className="section-jump">
          <a href="#sec-solution"><span className="arrow">↓</span> next <span className="dot" /> what this is</a>
        </div>

        {/* ════════════════════════════════════════════════════════
            SECTION 4 · SOLUTION (intro + curriculum)
        ════════════════════════════════════════════════════════ */}
        <section className="t-solution" id="sec-solution">
          <div className="km-container">
            <div className="t-solution-head">
              <span className="eyebrow">03 · What this is</span>
              <h2>
                Eight weeks. Four phases. <em>One outcome:</em> you finally understand.
              </h2>
              <p>
                Each week opens with a short chapter (~15 min read), then three sessions, then a reflection. By the end you&rsquo;ve trained every major split — full body, upper/lower, push pull legs — and you know why each one exists.
              </p>
            </div>
          </div>
          <div className="t-curriculum">
            <div className="km-container">
              <div className="t-phases">
                {PHASES.map(p => (
                  <div key={p.num} className="t-phase">
                    <div className="t-phase-header">
                      <span className="t-phase-num">{p.num}</span>
                      <span className="t-phase-weeks">{p.weeks}</span>
                    </div>
                    <h3>{p.split}</h3>
                    <ul className="t-phase-topics">
                      {p.topics.map(t => <li key={t}>{t}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="section-jump">
          <a href="#sec-qualifier"><span className="arrow">↓</span> next <span className="dot" /> is this you?</a>
        </div>

        {/* ════════════════════════════════════════════════════════
            SECTION 5 · QUALIFIER (for / not for)
        ════════════════════════════════════════════════════════ */}
        <section className="qual-section" id="sec-qualifier">
          <div className="km-container">
            <div className="qual-head">
              <span className="eyebrow">04 · Is this you?</span>
              <h2>
                Honest answer time. <em>If both columns aren&rsquo;t a fit,</em> don&rsquo;t buy it.
              </h2>
            </div>
            <div className="qual-cols">
              <div className="qual-col qual-col--yes">
                <h3>
                  <span className="lbl">+ Yes, this is for you</span>
                  This is for you if&hellip;
                </h3>
                <ul className="qual-list">
                  {FOR_YOU.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div className="qual-col qual-col--no">
                <h3>
                  <span className="lbl">&ndash; No, skip this one</span>
                  This isn&rsquo;t for you if&hellip;
                </h3>
                <ul className="qual-list">
                  {NOT_FOR_YOU.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="section-jump">
          <a href="#sec-spotlight"><span className="arrow">↓</span> next <span className="dot" /> inside week one</a>
        </div>

        {/* ════════════════════════════════════════════════════════
            SECTION 6 · WEEK 01 SPOTLIGHT (preserved + hook added)
        ════════════════════════════════════════════════════════ */}
        <section className="t-spot" id="sec-spotlight">
          <div className="km-container">
            <div className="t-spot-grid">
              <div>
                <span className="eyebrow">05 · Week 01 preview</span>
                <h2>What the first week actually looks like.</h2>

                <div className="t-spot-hook">
                  <strong>A hook for week 2.</strong>
                  <p>
                    Week one ends with a single cue you can apply on Monday morning that changes how your bench feels. We tell you what we&rsquo;re going to teach in week two — and we mean it.
                  </p>
                </div>

                <p className="t-spot-lead">
                  Week one opens with a 15-minute read: what full body training is, why it exists, and what you should feel for. Then three sessions. Then a short reflection. That&rsquo;s the rhythm every week follows.
                </p>
                <div className="t-spot-detail">
                  <strong style={{ fontFamily: 'var(--serif)', fontWeight: 500 }}>The brief.</strong> A short chapter explains the science — progressive overload, RPE, how to pick your starting weight. Education before action.
                </div>
                <div className="t-spot-detail">
                  <strong style={{ fontFamily: 'var(--serif)', fontWeight: 500 }}>The sessions.</strong> Three full-body workouts with hand-drawn exercise references, sets/reps, and form cues written in plain language.
                </div>
                <div className="t-spot-detail">
                  <strong style={{ fontFamily: 'var(--serif)', fontWeight: 500 }}>The mind map.</strong> Each week closes with a concept map — how everything you just learned connects. You&rsquo;ll actually remember it.
                </div>
              </div>
              <div className="t-mindmap">
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Week 01 · Mind map</div>
                <div className="t-mindmap-inner">
                  <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', background: 'var(--ink)', color: 'var(--paper)', padding: '10px 16px', borderRadius: 2, fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 500, textAlign: 'center', zIndex: 2, whiteSpace: 'nowrap' }}>Full Body Training</div>
                  <div style={{ position: 'absolute', left: 12, top: 20, background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)', padding: '8px 12px', borderRadius: 2, fontSize: 13, color: 'var(--ink-soft)' }}>Progressive Overload</div>
                  <div style={{ position: 'absolute', right: 12, top: 20, background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)', padding: '8px 12px', borderRadius: 2, fontSize: 13, color: 'var(--ink-soft)' }}>RPE Scale</div>
                  <div style={{ position: 'absolute', left: 12, bottom: 20, background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)', padding: '8px 12px', borderRadius: 2, fontSize: 13, color: 'var(--ink-soft)' }}>Starting Weights</div>
                  <div style={{ position: 'absolute', right: 12, bottom: 20, background: 'rgba(184,84,58,0.08)', border: '1.5px solid var(--accent)', padding: '8px 12px', borderRadius: 2, fontSize: 13, color: 'var(--accent)' }}>Recovery</div>
                  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 300 260">
                    <line x1="150" y1="130" x2="75" y2="50" stroke="var(--paper-edge)" strokeWidth="1.5" />
                    <line x1="150" y1="130" x2="225" y2="50" stroke="var(--paper-edge)" strokeWidth="1.5" />
                    <line x1="150" y1="130" x2="75" y2="210" stroke="var(--paper-edge)" strokeWidth="1.5" />
                    <line x1="150" y1="130" x2="225" y2="210" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 3" />
                  </svg>
                </div>
                <span className="t-mindmap-hand">&larr; the red one unlocks in week 2</span>
              </div>
            </div>
          </div>
        </section>

        <div className="section-jump">
          <a href="#sec-toolbox"><span className="arrow">↓</span> next <span className="dot" /> the toolbox</a>
        </div>

        {/* ════════════════════════════════════════════════════════
            SECTION 7 · THE TOOLBOX (preserved structure, rewritten copy)
        ════════════════════════════════════════════════════════ */}
        <section className="t-payoff" id="sec-toolbox">
          <div className="km-container">

            <div className="t-payoff-intro">
              <div>
                <span className="eyebrow">06 · After week 08 — The toolbox</span>
                <h2>
                  You don&rsquo;t just <em>finish</em> the programme.<br />
                  You walk away with a toolbox.
                </h2>
                <span className="t-payoff-pull">five things that go home with you ↓</span>
              </div>
              <div>
                <p className="t-payoff-lead">
                  Most fitness purchases expire the moment you stop opening the app. Not this one. Below is what you keep — the things that pay you back every month, every year, for the rest of your training life.
                </p>
              </div>
            </div>

            {/* TRAY */}
            <div className="t-tray">
              <div className="t-tray-spine">The Toolbox · <span>5 ITEMS · YOURS FOREVER</span></div>
              <div className="t-tray-items">
                <a className="t-tray-item" href="#tool-1" data-tint="accent">
                  <span className="tray-num">01</span>
                  <span className="tray-icon">
                    <svg viewBox="0 0 40 40" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="28" height="32" rx="1"/><line x1="11" y1="11" x2="29" y2="11"/><line x1="11" y1="17" x2="24" y2="17"/><line x1="11" y1="23" x2="26" y2="23"/><line x1="11" y1="29" x2="20" y2="29"/></svg>
                  </span>
                  <span className="tray-lbl">Your own programme</span>
                  <span className="tray-sub">template + know-how</span>
                  <span className="tray-bar" />
                </a>
                <a className="t-tray-item" href="#tool-2" data-tint="sage">
                  <span className="tray-num">02</span>
                  <span className="tray-icon">
                    <svg viewBox="0 0 40 40" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="9" width="30" height="26" rx="1"/><line x1="5" y1="16" x2="35" y2="16"/><line x1="13" y1="4" x2="13" y2="12"/><line x1="27" y1="4" x2="27" y2="12"/><rect x="11" y="20" width="4" height="4" fill="currentColor" stroke="none"/><rect x="18" y="20" width="4" height="4" fill="currentColor" stroke="none"/><rect x="25" y="20" width="4" height="4" fill="currentColor" stroke="none"/><rect x="11" y="27" width="4" height="4" fill="currentColor" stroke="none"/><rect x="18" y="27" width="4" height="4" fill="currentColor" stroke="none"/></svg>
                  </span>
                  <span className="tray-lbl">A real habit</span>
                  <span className="tray-sub">56 days, installed</span>
                  <span className="tray-bar" />
                </a>
                <a className="t-tray-item" href="#tool-3" data-tint="gold">
                  <span className="tray-num">03</span>
                  <span className="tray-icon">
                    <svg viewBox="0 0 40 40" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 4 L31 4 L31 36 L26 33 L22 36 L18 33 L14 36 L9 33 Z"/><line x1="14" y1="13" x2="26" y2="13"/><line x1="14" y1="19" x2="26" y2="19"/><line x1="14" y1="25" x2="22" y2="25"/></svg>
                  </span>
                  <span className="tray-lbl">£2,404 / year saved</span>
                  <span className="tray-sub">vs. PT + plans</span>
                  <span className="tray-bar" />
                </a>
                <a className="t-tray-item" href="#tool-4" data-tint="blue">
                  <span className="tray-num">04</span>
                  <span className="tray-icon">
                    <svg viewBox="0 0 40 40" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 8 C 14 5, 6 5, 5 8 L 5 32 C 6 29, 14 29, 20 32"/><path d="M20 8 C 26 5, 34 5, 35 8 L 35 32 C 34 29, 26 29, 20 32"/><line x1="20" y1="8" x2="20" y2="32"/></svg>
                  </span>
                  <span className="tray-lbl">Gym language</span>
                  <span className="tray-sub">fluent, no faking</span>
                  <span className="tray-bar" />
                </a>
                <a className="t-tray-item" href="#tool-5" data-tint="red">
                  <span className="tray-num">05</span>
                  <span className="tray-icon">
                    <svg viewBox="0 0 40 40" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="20" r="3"/><circle cx="34" cy="20" r="3"/><rect x="9" y="17" width="4" height="6"/><rect x="27" y="17" width="4" height="6"/><line x1="13" y1="20" x2="27" y2="20" strokeWidth="2"/></svg>
                  </span>
                  <span className="tray-lbl">Exercise library</span>
                  <span className="tray-sub">20+ moves, owned</span>
                  <span className="tray-bar" />
                </a>
              </div>
            </div>

            {/* TOOL 01 · TEMPLATE */}
            <article className="t-tool t-tool--accent" id="tool-1">
              <div className="t-tool-visual">
                <div className="tv-template">
                  <div className="tv-template-head">
                    <div className="title"><span className="blank">_______</span>&rsquo;s Programme</div>
                    <div className="week-lbl">Wk 01 / Built by you</div>
                  </div>
                  <div className="tv-template-rule" />
                  <table className="tv-template-table">
                    <thead><tr><th>Day</th><th>Lift / Movement</th><th>Sets × Reps</th><th>RPE</th></tr></thead>
                    <tbody>
                      <tr><td className="day">Mon</td><td className="fill">Back Squat</td><td className="fill">4 × 6</td><td className="fill">7</td></tr>
                      <tr><td className="day">Tue</td><td className="fill">Bench + Row</td><td className="fill">3 × 8</td><td className="fill">8</td></tr>
                      <tr><td className="day">Wed</td><td className="empty">rest / walk</td><td>—</td><td>—</td></tr>
                      <tr><td className="day">Thu</td><td className="fill">RDL + Pull-up</td><td className="fill">3 × 8</td><td className="fill">8</td></tr>
                      <tr><td className="day">Fri</td><td className="fill">OHP + Curls</td><td className="fill">3 × 10</td><td className="fill">8</td></tr>
                    </tbody>
                  </table>
                  <div className="tv-template-foot">
                    <span className="stamp">Built by me</span>
                    <span className="sign">— signed, ___</span>
                  </div>
                </div>
              </div>
              <div className="t-tool-copy">
                <div className="t-tool-tag"><span className="dot" />Tool 01 · The Template</div>
                <h3>A blank programme template <em>you finally know how to fill in.</em></h3>
                <p className="body">
                  Week eight ends with the same blank template every coach uses behind the scenes. Splits, sets, reps, RPE, deload weeks — all laid out. The only thing missing is your handwriting. Because by now, you can write it.
                </p>
                <ul className="bullets">
                  <li>Print-ready PDF + editable Notion / Sheets version</li>
                  <li>4-, 6- and 8-week templates for every split you&rsquo;ve trained</li>
                  <li>Pre-filled deload logic so you don&rsquo;t burn out next cycle</li>
                </ul>
                <span className="hook">your name. your programme. your call.</span>
              </div>
            </article>

            {/* TOOL 02 · HABIT */}
            <article className="t-tool t-tool--sage reverse" id="tool-2">
              <div className="t-tool-visual">
                <div className="tv-habit">
                  <div className="tv-habit-head">
                    <div className="lbl"><strong>56 days.</strong>&nbsp; Habit installed.</div>
                    <div className="key">trained <i /></div>
                  </div>
                  <div className="tv-habit-grid">
                    <span className="colhd" /><span className="colhd">M</span><span className="colhd">T</span><span className="colhd">W</span><span className="colhd">T</span><span className="colhd">F</span><span className="colhd">S</span><span className="colhd">S</span>
                    <span className="rowhd">w1</span><span className="cell s2" /><span className="cell" /><span className="cell s2" /><span className="cell" /><span className="cell s1" /><span className="cell" /><span className="cell" />
                    <span className="rowhd">w2</span><span className="cell s2" /><span className="cell" /><span className="cell s2" /><span className="cell" /><span className="cell s2" /><span className="cell" /><span className="cell" />
                    <span className="rowhd">w3</span><span className="cell s2" /><span className="cell s1" /><span className="cell" /><span className="cell s2" /><span className="cell" /><span className="cell s2" /><span className="cell" />
                    <span className="rowhd">w4</span><span className="cell s2" /><span className="cell" /><span className="cell s3" /><span className="cell" /><span className="cell s3" /><span className="cell s1" /><span className="cell" />
                    <span className="rowhd">w5</span><span className="cell s3" /><span className="cell" /><span className="cell s3" /><span className="cell s1" /><span className="cell s3" /><span className="cell" /><span className="cell" />
                    <span className="rowhd">w6</span><span className="cell s3" /><span className="cell" /><span className="cell s3" /><span className="cell" /><span className="cell s3" /><span className="cell" /><span className="cell" />
                    <span className="rowhd">w7</span><span className="cell s3" /><span className="cell" /><span className="cell s3" /><span className="cell s1" /><span className="cell s3" /><span className="cell s2" /><span className="cell" />
                    <span className="rowhd">w8</span><span className="cell s3" /><span className="cell" /><span className="cell s3" /><span className="cell" /><span className="cell s3" /><span className="cell" /><span className="cell" />
                  </div>
                  <div className="tv-habit-stats">
                    <div className="stat"><div className="v">24</div><div className="l">Sessions</div></div>
                    <div className="stat"><div className="v">56</div><div className="l">Days</div></div>
                    <div className="stat"><div className="v">3×/wk</div><div className="l">Rhythm</div></div>
                  </div>
                  <span className="tv-habit-margin">you didn&rsquo;t<br />&ldquo;try&rdquo; — you<br />became.</span>
                </div>
              </div>
              <div className="t-tool-copy">
                <div className="t-tool-tag"><span className="dot" />Tool 02 · The Habit</div>
                <h3>Fifty-six days of showing up. <em>That&rsquo;s an identity,</em> not a streak.</h3>
                <p className="body">
                  Behaviour research says habits lock in between 30 and 66 days. By week eight you&rsquo;ve crossed it without thinking. You&rsquo;re no longer &ldquo;trying to get into the gym&rdquo; — you&rsquo;re someone who trains. That doesn&rsquo;t unlearn itself.
                </p>
                <ul className="bullets">
                  <li>3 sessions a week, scheduled and tracked</li>
                  <li>Built-in rest days so the rhythm survives real life</li>
                  <li>Weekly reflections that make drifting impossible</li>
                </ul>
                <span className="hook">identity beats motivation. every time.</span>
              </div>
            </article>

            {/* TOOL 03 · RECEIPT */}
            <article className="t-tool t-tool--gold" id="tool-3">
              <div className="t-tool-visual">
                <div className="tv-receipt">
                  <h4>KIRA MEI · LONDON</h4>
                  <div className="sub">— TRAINING BLUEPRINT —</div>
                  <div className="dash" />
                  <div className="meta"><span>Cashier:</span><span>K. Mei</span></div>
                  <div className="meta"><span>Date:</span><span>8 weeks later</span></div>
                  <div className="meta"><span>Receipt #:</span><span>0001 / forever</span></div>
                  <div className="dash" />
                  <div className="section-hd">— WHAT YOU WOULD HAVE PAID —</div>
                  <div className="dash" />
                  <ul className="lines">
                    <li><span><span className="nm">PT sessions</span><span className="qt">48 wks × 1/wk @ £45</span></span><span className="pr">£2,160.00</span></li>
                    <li><span><span className="nm">Custom plan refresh</span><span className="qt">2 × £80</span></span><span className="pr">£&nbsp;&nbsp;160.00</span></li>
                    <li><span><span className="nm">Programme app fees</span><span className="qt">12 mo × ~£7</span></span><span className="pr">£&nbsp;&nbsp;&nbsp;84.00</span></li>
                    <li><span><span className="nm">&ldquo;Form check&rdquo; 1-off</span><span className="qt">1 × £50</span></span><span className="pr">£&nbsp;&nbsp;&nbsp;50.00</span></li>
                  </ul>
                  <div className="dash" />
                  <div className="total"><span className="lbl-stack">SUBTOTAL<small>/ YEAR</small></span><span>£2,454.00</span></div>
                  <div className="meta"><span>You paid</span><span>£&nbsp;&nbsp;&nbsp;49.99</span></div>
                  <div className="dash" />
                  <div className="saved"><span>YOU SAVED</span><span>£2,404.01</span></div>
                  <div className="dash" />
                  <div className="footnote">* year one. compounds every year after.</div>
                  <div className="barcode">{Array.from({ length: 28 }).map((_, i) => <i key={i} />)}</div>
                  <div className="receipt-stamp">PAID<br />IN FULL<small>ONCE.</small></div>
                </div>
              </div>
              <div className="t-tool-copy">
                <div className="t-tool-tag"><span className="dot" />Tool 03 · The Receipt</div>
                <h3>&pound;200+ a month, gone — <em>for the rest of your training life.</em></h3>
                <p className="body">
                  PTs charge &pound;45 a session. Custom plans cost &pound;80–150 every few months. App subs nibble at it monthly. Learn how training works once, and the meter stops. Forever.
                </p>
                <ul className="bullets">
                  <li>Replace recurring PT fees with self-coached cycles</li>
                  <li>No more &lsquo;starter plan&rsquo; purchases when motivation comes back</li>
                  <li>Compounds — year two, three, ten — same maths, same saving</li>
                </ul>
                <span className="hook">the cheapest &pound;49.99 you&rsquo;ll ever spend.</span>
              </div>
            </article>

            {/* TOOL 04 · GLOSSARY */}
            <article className="t-tool t-tool--blue reverse" id="tool-4">
              <div className="t-tool-visual">
                <div className="tv-glossary">
                  <div className="tv-glossary-head">
                    <div className="lbl"><strong>Gym English.</strong> A pocket dictionary.</div>
                    <div className="num">A → Z · 40+ terms</div>
                  </div>
                  <ul className="tv-glossary-list">
                    {[
                      { term: 'RPE', ipa: '/ahr-pee-ee/ · n.', def: 'Rate of perceived effort, 1\u201310. How hard a set felt.', em: 'You\u2019ll log this every session.' },
                      { term: 'Hypertrophy', ipa: '/hy-per-troh-fee/ · n.', def: 'Muscle growth. Specifically: cell size increasing.', em: 'The reason you bother.' },
                      { term: 'Eccentric', ipa: '/ek-sen-trik/ · adj.', def: 'The lowering phase of a rep.', em: 'Where most of the growth actually happens.' },
                      { term: 'Deload', ipa: '/dee-lohd/ · n.', def: 'A planned easy week to let the body catch up.', em: 'Not weakness \u2014 strategy.' },
                      { term: 'AMRAP', ipa: '/am-rap/ · n.', def: 'As Many Reps As Possible.', em: 'Saved for the last set, never the first.' },
                    ].map(g => (
                      <li key={g.term}>
                        <div className="row"><span className="term">{g.term}</span><span className="ipa">{g.ipa}</span></div>
                        <div className="def">{g.def} <em>{g.em}</em></div>
                      </li>
                    ))}
                  </ul>
                  <span className="tv-glossary-margin">fluent ↗<br />by wk 4.</span>
                </div>
              </div>
              <div className="t-tool-copy">
                <div className="t-tool-tag"><span className="dot" />Tool 04 · The Glossary</div>
                <h3>Speak gym. <em>Without faking it.</em></h3>
                <p className="body">
                  Every chapter quietly teaches you the language coaches use — RPE, hypertrophy, eccentric, AMRAP, deload. Not as homework. As context. By week four you read any programme online and actually understand it.
                </p>
                <ul className="bullets">
                  <li>40+ terms defined in plain English with examples</li>
                  <li>&ldquo;What does that mean in the gym?&rdquo; — always the next line</li>
                  <li>Searchable on your phone mid-set</li>
                </ul>
                <span className="hook">no more nodding. you actually know.</span>
              </div>
            </article>

            {/* TOOL 05 · FORM VAULT */}
            <article className="t-tool t-tool--red" id="tool-5">
              <div className="t-tool-visual">
                <div className="tv-vault">
                  {[
                    { label: 'Back Squat', phase: 'PHASE 03' },
                    { label: 'Bench Press', phase: 'PHASE 01' },
                    { label: 'RDL', phase: 'PHASE 02' },
                    { label: 'Pull-up', phase: 'PHASE 03' },
                    { label: 'OHP', phase: 'PHASE 04' },
                    { label: 'Barbell Row', phase: 'PHASE 02' },
                  ].map(p => (
                    <div key={p.label} className="tv-polaroid">
                      <div className="pic">
                        <span className="pic-tag">{p.phase}</span>
                        <svg viewBox="0 0 80 80" width="100%" height="100%">
                          <line x1="14" y1="68" x2="66" y2="68" stroke="#E6DFCE" strokeWidth="1.2"/>
                          <circle cx="40" cy="30" r="6" fill="rgba(31,27,22,0.15)"/>
                          <path d="M40 36 Q 36 46 36 54 L 34 64 L 38 64 L 40 56 L 42 64 L 46 64 L 44 54 Q 44 46 40 36 Z" fill="rgba(31,27,22,0.15)"/>
                          <line x1="32" y1="42" x2="20" y2="38" stroke="rgba(184,84,58,0.5)" strokeWidth="2.5"/>
                          <line x1="48" y1="42" x2="60" y2="38" stroke="rgba(184,84,58,0.5)" strokeWidth="2.5"/>
                          <line x1="14" y1="38" x2="66" y2="38" stroke="rgba(31,27,22,0.4)" strokeWidth="2"/>
                        </svg>
                      </div>
                      <span className="pic-lbl">{p.label}</span>
                    </div>
                  ))}
                  <div className="tv-vault-stamp"><strong>20+</strong>exercises<br />examined</div>
                </div>
              </div>
              <div className="t-tool-copy">
                <div className="t-tool-tag"><span className="dot" />Tool 05 · The Form Vault</div>
                <h3>Your hands have done twenty exercises. <em>Properly.</em></h3>
                <p className="body">
                  Hand-drawn breakdowns for every staple lift — squat, hinge, push, pull, carry, isolate. Cues in plain English. Common form faults. The muscle being trained. When someone re-racks next to you and asks what you&rsquo;re doing, you can answer.
                </p>
                <ul className="bullets">
                  <li>20+ exercises across full body, upper/lower and PPL</li>
                  <li>Muscle activation diagrams and step-by-step cues</li>
                  <li>&ldquo;What it should feel like&rdquo; notes — and what it shouldn&rsquo;t</li>
                </ul>
                <span className="hook">you&rsquo;ve done these. you know what they feel like.</span>
              </div>
            </article>

            <div className="t-payoff-close">
              <div className="stamp-line">All five · yours forever</div>
              <h3>The &pound;49.99 isn&rsquo;t for a programme.<br />It&rsquo;s for <em>this whole shelf</em>.</h3>
              <p>One purchase. Eight weeks. Five tools that work the rest of your life. The plan is the smallest thing you walk away with.</p>
            </div>

          </div>
        </section>

        <div className="section-jump">
          <a href="#sec-testimonials"><span className="arrow">↓</span> next <span className="dot" /> real women, real outcomes</a>
        </div>

        {/* ════════════════════════════════════════════════════════
            SECTION 8 · TESTIMONIALS
        ════════════════════════════════════════════════════════ */}
        <section className="tst-section" id="sec-testimonials">
          <div className="km-container">
            <div className="tst-head">
              <span className="eyebrow">07 · From real women</span>
              <h2>
                Eight weeks. <em>Three real outcomes.</em>
              </h2>
            </div>
            <div className="tst-grid">
              {TESTIMONIALS.map(t => (
                <figure
                  key={t.name}
                  className="tst-card"
                  style={{ transform: `rotate(${t.rot}deg)` }}
                >
                  <blockquote>{t.quote}</blockquote>
                  <figcaption className="byline">
                    <strong>{t.name}</strong>
                    {t.meta}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <div className="section-jump">
          <a href="#sec-refund"><span className="arrow">↓</span> next <span className="dot" /> no-risk refund</a>
        </div>

        {/* ════════════════════════════════════════════════════════
            SECTION 9 · RISK REVERSAL (coupon)
        ════════════════════════════════════════════════════════ */}
        <section className="risk-section" id="sec-refund">
          <div className="km-container">
            <div className="risk-coupon">
              <div className="risk-coupon-inner">
                <span className="eyebrow">08 · No risk</span>
                <h2>
                  Try Week 1. <em>And Week 2.</em> Then decide.
                </h2>
                <p>
                  You have <strong>14 days</strong> from purchase to work through Week 1 — and Week 2 if you move fast. If by then it hasn&rsquo;t changed how you train, email <strong>hello@kiramei.co.uk</strong> and I&rsquo;ll refund every penny. No forms. No questions. No &lsquo;please tell us why you&rsquo;re leaving&rsquo; survey. Just back to your card.
                </p>
                <p className="risk-fineprint">
                  <strong>One honest condition:</strong> unlocking Week 3 ends the refund window early. By then you&rsquo;ve absorbed enough of the material that it wouldn&rsquo;t be fair on either of us. We&rsquo;re trusting each other.
                </p>
                <div className="risk-stamp">
                  <div className="risk-stamp-inner">
                    <span className="big">14&#8209;day</span>
                    <span className="lbl">Refund<br />until Week 3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-jump">
          <a href="#sec-maths"><span className="arrow">↓</span> next <span className="dot" /> the maths</a>
        </div>

        {/* ════════════════════════════════════════════════════════
            SECTION 10 · PRICING MATHS
        ════════════════════════════════════════════════════════ */}
        <section className="maths-section" id="sec-maths">
          <div className="km-container">
            <div className="maths-head">
              <span className="eyebrow">09 · The maths</span>
              <h2>
                &pound;49.99 once. That&rsquo;s &pound;6.24 per week of training education. <em>Less than a coffee.</em>
              </h2>
            </div>
            <div className="maths-invoice">
              <div className="maths-invoice-head">
                <span className="left">Invoice · Training education</span>
                <span className="right">Kira Mei · 2026</span>
              </div>
              <table className="maths-table">
                <thead>
                  <tr>
                    <th>What you&rsquo;d pay elsewhere</th>
                    <th>Their price</th>
                    <th>What this costs</th>
                  </tr>
                </thead>
                <tbody>
                  {MATHS_ROWS.map(r => (
                    <tr key={r.what}>
                      <td className="what">{r.what}</td>
                      <td className="cost">{r.cost}</td>
                      <td className="here">{r.here}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="maths-invoice-foot">
                <strong>One purchase. Eight weeks.</strong> Eight years from now — same &pound;49.99. Compounds the second you stop buying anything else.
              </div>
            </div>
          </div>
        </section>

        <div className="section-jump">
          <a href="#sec-faq"><span className="arrow">↓</span> next <span className="dot" /> your questions</a>
        </div>

        {/* ════════════════════════════════════════════════════════
            SECTION 11 · FAQ
        ════════════════════════════════════════════════════════ */}
        <section className="faq-section" id="sec-faq">
          <div className="km-container">
            <div className="faq-head">
              <span className="eyebrow">10 · Questions you&rsquo;re probably asking</span>
              <h2>
                Real answers. <em>No fluff.</em>
              </h2>
            </div>
            <div className="faq-list">
              {FAQS.map((f, i) => (
                <details key={f.q} className="faq-item" open={i === 0}>
                  <summary>
                    <span className="qnum">{String(i + 1).padStart(2, '0')}</span>
                    <span className="qtxt">{f.q}</span>
                    <span className="toggle">+</span>
                  </summary>
                  <div className="answer">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <div className="section-jump">
          <a href="#sec-cta"><span className="arrow">↓</span> next <span className="dot" /> ready when you are</a>
        </div>

        {/* ════════════════════════════════════════════════════════
            SECTION 12 · FINAL CTA
        ════════════════════════════════════════════════════════ */}
        <section className="t-cta" id="sec-cta">
          <div className="km-container-narrow">
            <span className="eyebrow">Ready when you are</span>
            <h2>
              Stop following. Start <em>understanding</em>.
            </h2>
            <p className="t-cta-sub">
              Eight weeks. &pound;49.99 once. A 14-day refund if it doesn&rsquo;t change how you train.
            </p>
            <div style={{ display: 'inline-flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <BuyButton requireTerms product="training" label={'Get the Training Blueprint — £49.99 →'} />
            </div>
            <div className="t-cta-trust">
              Instant access<span>·</span>No subscription<span>·</span>14-day refund
            </div>
            <p className="t-cta-disclaimer">
              Educational fitness content, not medical advice. Speak to a qualified professional before starting any new training programme — especially if you&rsquo;re pregnant, postpartum, recovering from injury, or managing a medical condition. For ages 18+.
            </p>
            <div>
              <span className="t-cta-margin">see you on the other side of week one.</span>
            </div>
          </div>
        </section>
      </main>

      <KmFooter />
    </div>
  )
}
