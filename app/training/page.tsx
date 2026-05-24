'use client'

import KmNavbar from '@/app/components/KmNavbar'
import KmFooter from '@/app/components/KmFooter'
import BuyButton from '@/app/components/BuyButton'

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

export default function TrainingPage() {
  return (
    <div className="km-page">
      <KmNavbar activePage="training" />

      <style>{`
        /* ── hero ── */
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
        .t-hero h1 { font-size: clamp(2.4rem, 4.8vw, 4rem); font-weight: 500; letter-spacing: -0.02em; line-height: 1.05; margin: 20px 0 20px; }
        .t-hero h1 em { font-style: italic; color: var(--accent); }
        .t-hero-lead { font-size: 17px; line-height: 1.7; color: var(--ink-soft); max-width: 480px; margin-bottom: 28px; }
        .t-buy-box { display: flex; gap: 24px; align-items: center; flex-wrap: wrap; padding: 20px 24px; background: var(--paper); border: 1.5px solid var(--ink); border-radius: 3px; position: relative; max-width: 520px; }
        .t-buy-box::before { content: ''; position: absolute; inset: 4px; border: 1px dashed var(--paper-edge); border-radius: 2px; pointer-events: none; }
        .t-buy-price { font-family: var(--serif); font-size: 40px; font-weight: 500; line-height: 1; }
        .t-buy-sub { font-family: var(--mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-muted); margin-top: 4px; }
        .t-cover { background: var(--paper); border: 1px solid var(--ink); padding: 32px; position: relative; box-shadow: 4px 4px 0 var(--ink); transform: rotate(-1.4deg); }
        .t-cover-eyebrow { font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em; color: var(--accent); text-transform: uppercase; margin-bottom: 18px; }
        .t-cover h3 { font-family: var(--serif); font-size: 28px; font-weight: 500; line-height: 1.05; letter-spacing: -0.02em; margin-bottom: 16px; }
        .t-cover-divider { width: 60px; height: 2px; background: var(--ink); margin: 14px 0; }
        .t-cover-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
        .t-cover-list li { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; color: var(--ink-soft); padding: 6px 0; border-bottom: 1px solid var(--paper-edge); }
        .t-cover-list li span { color: var(--accent); margin-right: 8px; }
        /* ── curriculum ── */
        .t-curriculum { padding: 80px 0; border-top: 1px solid var(--paper-edge); }
        .t-phases { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
        .t-phase { padding: 32px; border-right: 1px solid var(--paper-edge); border-bottom: 1px solid var(--paper-edge); }
        .t-phase:nth-child(2n) { border-right: none; }
        .t-phase:nth-child(3), .t-phase:nth-child(4) { border-bottom: none; }
        .t-phase-header { display: flex; align-items: baseline; gap: 16px; margin-bottom: 18px; }
        .t-phase-num { font-family: var(--mono); font-size: 11px; letter-spacing: 0.22em; color: var(--accent); flex-shrink: 0; }
        .t-phase-weeks { font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em; color: var(--ink-muted); }
        .t-phase h3 { font-family: var(--serif); font-size: 22px; font-weight: 500; margin-bottom: 16px; }
        .t-phase-topics { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
        .t-phase-topics li { font-size: 14px; line-height: 1.6; color: var(--ink-soft); padding-left: 16px; position: relative; }
        .t-phase-topics li::before { content: '—'; position: absolute; left: 0; color: var(--accent); }
        /* ── spotlight ── */
        .t-spot { padding: 80px 0; border-top: 1px solid var(--paper-edge); background: var(--paper-deep); }
        .t-spot-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
        .t-spot h2 { font-size: clamp(1.6rem, 2.8vw, 2.2rem); margin-bottom: 16px; }
        .t-spot-lead { font-size: 16px; line-height: 1.75; color: var(--ink-soft); margin-bottom: 28px; }
        .t-spot-detail { font-size: 14px; line-height: 1.7; color: var(--ink-soft); padding-left: 16px; border-left: 3px solid var(--accent); margin-bottom: 14px; }
        .t-mindmap { position: relative; background: var(--paper); border: 1px solid var(--paper-edge); padding: 32px; }
        .t-mindmap-inner { position: relative; height: 260px; }
        /* ── features ── */
        .t-features { padding: 80px 0; border-top: 1px solid var(--paper-edge); }
        .t-features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 48px; }
        .t-feature { padding: 28px; background: var(--paper); border: 1px solid var(--paper-edge); border-radius: 2px; }
        .t-feature-icon { width: 48px; height: 48px; margin-bottom: 18px; color: var(--ink); }
        .t-feature h3 { font-family: var(--serif); font-size: 20px; font-weight: 500; margin-bottom: 10px; }
        .t-feature p { font-size: 14px; line-height: 1.7; color: var(--ink-soft); }

        /* ══════════════════════════════════════════
           TOOLBOX SECTION
        ══════════════════════════════════════════ */
        .t-payoff { padding: 96px 0 40px; border-top: 1px solid var(--paper-edge); position: relative; }
        .t-payoff-intro { display: grid; grid-template-columns: 1.1fr 1fr; gap: 60px; align-items: end; margin-bottom: 70px; }
        .t-payoff-intro h2 { font-size: clamp(2rem, 3.6vw, 2.9rem); line-height: 1.08; margin-top: 14px; }
        .t-payoff-intro h2 em { font-style: italic; color: var(--accent); }
        .t-payoff-lead { font-size: 16px; line-height: 1.75; color: var(--ink-soft); max-width: 440px; }
        .t-payoff-pull { font-family: var(--hand); font-size: 26px; color: var(--margin-red); line-height: 1.15; transform: rotate(-1.2deg); display: inline-block; margin-top: 18px; }

        .t-tray { margin-top: 56px; background: var(--paper); border: 1.5px solid var(--ink); border-radius: 4px; position: relative; padding: 14px 14px 18px; box-shadow: 4px 6px 0 rgba(31,27,22,0.08); }
        .t-tray::before { content: ''; position: absolute; inset: 5px; border: 1px dashed var(--paper-edge); border-radius: 3px; pointer-events: none; }
        .t-tray-spine { position: absolute; top: -10px; left: 24px; background: var(--ink); color: var(--paper); font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em; padding: 4px 10px; text-transform: uppercase; }
        .t-tray-spine span { color: var(--accent-soft, #D27E62); }
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

        /* tool blocks */
        .t-tool { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; padding: 90px 0; border-top: 1px solid var(--paper-edge); position: relative; }
        .t-tool.reverse .t-tool-visual { order: 2; }
        .t-tool-tag { display: inline-flex; align-items: center; gap: 10px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent); margin-bottom: 16px; }
        .t-tool-tag .dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
        .t-tool-copy h3 { font-family: var(--serif); font-size: clamp(1.6rem, 2.4vw, 2.1rem); font-weight: 500; line-height: 1.1; letter-spacing: -0.01em; margin-bottom: 18px; }
        .t-tool-copy h3 em { font-style: italic; }
        .t-tool-copy p.body { font-size: 16px; line-height: 1.75; color: var(--ink-soft); max-width: 460px; }
        .t-tool-copy .bullets { list-style: none; margin: 18px 0 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
        .t-tool-copy .bullets li { font-size: 14px; line-height: 1.6; color: var(--ink-soft); padding-left: 22px; position: relative; }
        .t-tool-copy .bullets li::before { content: '✓'; position: absolute; left: 0; top: 0; font-family: var(--mono); font-size: 13px; color: var(--accent); font-weight: 600; }
        .t-tool-copy .hook { margin-top: 26px; display: inline-block; font-family: var(--hand); font-size: 26px; line-height: 1.15; color: var(--margin-red); transform: rotate(-1deg); }

        .t-tool--sage .t-tool-tag { color: var(--sage); }
        .t-tool--gold .t-tool-tag { color: var(--gold); }
        .t-tool--blue .t-tool-tag { color: #3D5A80; }
        .t-tool--red  .t-tool-tag { color: var(--margin-red); }
        .t-tool--sage .t-tool-copy .bullets li::before { color: var(--sage); }
        .t-tool--gold .t-tool-copy .bullets li::before { color: var(--gold); }
        .t-tool--blue .t-tool-copy .bullets li::before { color: #3D5A80; }
        .t-tool--red  .t-tool-copy .bullets li::before { color: var(--margin-red); }

        /* tool visuals */
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

        .tv-vault { position: relative; max-width: 520px; display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, auto); gap: 18px 16px; }
        .tv-vault::before { content: 'EXERCISE INDEX · A→Z'; position: absolute; top: -28px; left: 0; font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em; color: var(--margin-red); }
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

        /* ── quote / cta ── */
        .t-quote { padding: 80px 0; border-top: 1px solid var(--paper-edge); text-align: center; }
        .t-quote blockquote { font-family: var(--serif); font-size: clamp(1.4rem, 2.8vw, 2rem); font-weight: 400; font-style: italic; line-height: 1.55; color: var(--ink); max-width: 680px; margin: 0 auto; position: relative; }
        .t-quote blockquote::before { content: '"'; font-family: var(--serif); font-size: 80px; color: var(--accent); line-height: 0; vertical-align: -28px; margin-right: 4px; }
        .t-quote blockquote::after { content: '"'; font-family: var(--serif); font-size: 80px; color: var(--accent); line-height: 0; vertical-align: -28px; margin-left: 4px; }
        .t-quote-byline { font-family: var(--hand); font-size: 22px; color: var(--ink-muted); margin-top: 24px; }
        .t-cta { padding: 80px 0; border-top: 1px solid var(--paper-edge); text-align: center; }

        /* ── responsive ── */
        @media (max-width: 960px) {
          .t-payoff-intro { grid-template-columns: 1fr; gap: 28px; }
          .t-tray-items { grid-template-columns: repeat(5, 1fr); }
          .t-tray-item .tray-lbl { font-size: 13px; }
          .t-tool { grid-template-columns: 1fr; gap: 40px; padding: 60px 0; }
          .t-tool.reverse .t-tool-visual { order: 0; }
          .tv-receipt .receipt-stamp { right: 6px; }
          .tv-habit-margin { display: none; }
          .tv-vault-stamp { right: 0; bottom: -32px; }
        }
        @media (max-width: 860px) {
          .t-hero-grid { grid-template-columns: 1fr; }
          .t-cover { transform: none; margin: 0 auto; max-width: 400px; }
          .t-phases { grid-template-columns: 1fr; }
          .t-phase { border-right: none !important; }
          .t-phase:last-child { border-bottom: none; }
          .t-spot-grid { grid-template-columns: 1fr; }
          .t-features-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .t-tray-items { grid-template-columns: repeat(2, 1fr); }
          .t-tray-items::before { background-size: 50% 100%; }
          .tv-vault { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <main>
        {/* HERO */}
        <section className="t-hero">
          <div className="t-hero-bg" />
          <div className="km-container">
            <div className="t-hero-grid">
              <div style={{ position: 'relative' }}>
                <span className="eyebrow">Training Blueprint</span>
                <h1 className="t-hero" style={{ fontFamily: 'var(--serif)' }}>
                  Build your training brain.<br />
                  <em>Never buy a plan</em> again.
                </h1>
                <p className="t-hero-lead">
                  Not just a plan to follow — eight weeks that teach you exactly how training works, so you can build your own for life.
                </p>
                <div className="t-buy-box">
                  <div>
                    <div className="t-buy-price">£49.99</div>
                    <div className="t-buy-sub">one-time · instant access</div>
                  </div>
                  <BuyButton requireTerms product="training" label="Get the Programme →" />
                </div>
                <div style={{ display: 'flex', gap: 24, marginTop: 20 }}>
                  {[['Format', 'Interactive portal'], ['Length', '8 weeks'], ['Access', 'Yours forever']].map(([label, val]) => (
                    <div key={label}>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 4 }}>{label}</div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
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
                  <span className="hand" style={{ position: 'absolute', bottom: 16, right: 20, fontSize: 20, color: 'var(--margin-red)', transform: 'rotate(2deg)' }}>buy once ↗</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CURRICULUM */}
        <section className="t-curriculum">
          <div className="km-container">
            <div style={{ marginBottom: 48 }}>
              <span className="eyebrow">The curriculum</span>
              <h2 style={{ marginTop: 14, fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>Four phases. Every split. Total understanding.</h2>
              <p style={{ marginTop: 12, fontSize: 16, color: 'var(--ink-soft)', maxWidth: 560, lineHeight: 1.7 }}>Each phase builds on the last. You don&apos;t just train — you learn why the split works, what your body is adapting to, and how to read your own progress.</p>
            </div>
            <div className="t-phases">
              {PHASES.map(p => (
                <div key={p.num} className="t-phase">
                  <div className="t-phase-header">
                    <span className="t-phase-num">{p.num}</span>
                    <span className="t-phase-weeks">{p.weeks}</span>
                  </div>
                  <h3>{p.split}</h3>
                  <ul className="t-phase-topics">{p.topics.map(t => <li key={t}>{t}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WEEK 1 SPOTLIGHT */}
        <section className="t-spot">
          <div className="km-container">
            <div className="t-spot-grid">
              <div>
                <span className="eyebrow">Week 01 preview</span>
                <h2 style={{ marginTop: 14 }}>What the first week actually looks like.</h2>
                <p className="t-spot-lead">Week one opens with a 15-minute read: what full body training is, why it exists, and what you should feel for. Then three sessions. Then a short reflection. That&apos;s the rhythm every week follows.</p>
                <div className="t-spot-detail"><strong style={{ fontFamily: 'var(--serif)', fontWeight: 500 }}>The brief.</strong> A short chapter explains the science — progressive overload, RPE, how to pick your starting weight. Education before action.</div>
                <div className="t-spot-detail"><strong style={{ fontFamily: 'var(--serif)', fontWeight: 500 }}>The sessions.</strong> Three full-body workouts with hand-drawn exercise references, sets/reps, and form cues written in plain language.</div>
                <div className="t-spot-detail"><strong style={{ fontFamily: 'var(--serif)', fontWeight: 500 }}>The mind map.</strong> Each week closes with a concept map — how everything you just learned connects. You&apos;ll actually remember it.</div>
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
                <p className="hand" style={{ color: 'var(--margin-red)', fontSize: 18, marginTop: 14 }}>← the red one unlocks in week 2</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT'S INSIDE */}
        <section className="t-features">
          <div className="km-container">
            <span className="eyebrow">What&apos;s included</span>
            <h2 style={{ marginTop: 14, fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>Built to teach, not just to follow.</h2>
            <div className="t-features-grid">
              <div className="t-feature">
                <svg className="t-feature-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><rect x="6" y="6" width="36" height="36" rx="1" /><line x1="12" y1="18" x2="36" y2="18" /><line x1="12" y1="24" x2="30" y2="24" /><line x1="12" y1="30" x2="33" y2="30" /><path d="M32 12 L36 16 L28 24" strokeWidth="1.2" /></svg>
                <h3>Form notes, every exercise</h3>
                <p>Sketchy hand-drawn diagrams with cues written in plain English — not "engage your posterior chain", but what that actually means in the gym.</p>
              </div>
              <div className="t-feature">
                <svg className="t-feature-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><circle cx="24" cy="24" r="6" /><line x1="24" y1="6" x2="24" y2="14" /><line x1="24" y1="34" x2="24" y2="42" /><line x1="6" y1="24" x2="14" y2="24" /><line x1="34" y1="24" x2="42" y2="24" /><line x1="11" y1="11" x2="17" y2="17" /><line x1="31" y1="31" x2="37" y2="37" /><line x1="37" y1="11" x2="31" y2="17" /><line x1="17" y1="31" x2="11" y2="37" /></svg>
                <h3>Mind map, every week</h3>
                <p>A concept map at the end of each week showing how everything connects. Build the mental model, not just the muscle.</p>
              </div>
              <div className="t-feature">
                <svg className="t-feature-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M8 42 L8 10 L40 10" /><path d="M14 34 L20 20 L28 30 L34 16 L40 22" /><circle cx="40" cy="22" r="2" fill="currentColor" /></svg>
                <h3>Build-your-own template</h3>
                <p>Week eight ends with a blank programme template. By then you have everything you need to fill it yourself — and mean it.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            THE TOOLBOX — what you walk away with
        ═══════════════════════════════════════════ */}
        <section className="t-payoff">
          <div className="km-container">

            {/* Intro */}
            <div className="t-payoff-intro">
              <div>
                <span className="eyebrow">After week 08 · The toolbox</span>
                <h2>You don&apos;t just <em>finish</em> the programme.<br />You walk away with a toolbox.</h2>
                <span className="t-payoff-pull">five things that go home with you ↓</span>
              </div>
              <div>
                <p className="t-payoff-lead">Most fitness purchases expire the moment you stop opening the app. Not this one. Below is what you keep — the things that pay you back every month, every year, for the rest of your training life.</p>
              </div>
            </div>

            {/* Tray */}
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
                  <span className="tray-lbl">£2,350 / year saved</span>
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

            {/* ─── Tool 01 · The Template ─── */}
            <article className="t-tool t-tool--accent" id="tool-1">
              <div className="t-tool-visual">
                <div className="tv-template">
                  <div className="tv-template-head">
                    <div className="title"><span className="blank">_______</span>&apos;s Programme</div>
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
                <h3>A programme template <em>you</em> know how to fill in.</h3>
                <p className="body">Week eight closes with the same template every coach quietly uses behind the scenes. It&apos;s already laid out — splits, sets, reps, RPE, deload weeks. All that&apos;s left is your handwriting in the blanks.</p>
                <ul className="bullets">
                  <li>Print-ready PDF + editable Notion / Sheets version</li>
                  <li>4-, 6- and 8-week templates for every split you&apos;ve trained</li>
                  <li>Pre-filled deload logic so you don&apos;t burn out next cycle</li>
                </ul>
                <span className="hook">your name. your programme. your call.</span>
              </div>
            </article>

            {/* ─── Tool 02 · The Habit ─── */}
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
                  <span className="tv-habit-margin">you didn&apos;t<br />&ldquo;try&rdquo; — you<br />became.</span>
                </div>
              </div>
              <div className="t-tool-copy">
                <div className="t-tool-tag"><span className="dot" />Tool 02 · The Habit</div>
                <h3>56 days of showing up. <em>That&apos;s an identity</em>, not a streak.</h3>
                <p className="body">Behaviour scientists say a habit locks in somewhere between 30 and 66 days. By the time week eight closes, you&apos;ve crossed it without thinking about it. You&apos;re no longer the person who&apos;s &ldquo;trying to get into the gym&rdquo; — you&apos;re the person who trains.</p>
                <ul className="bullets">
                  <li>3 sessions a week, scheduled and tracked for you</li>
                  <li>Built-in rest days so the rhythm survives real life</li>
                  <li>Week-by-week reflections that make it impossible to drift</li>
                </ul>
                <span className="hook">identity beats motivation. every time.</span>
              </div>
            </article>

            {/* ─── Tool 03 · The Receipt ─── */}
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
                <h3>£200+ a month, gone. <em>For the rest of your training life.</em></h3>
                <p className="body">The average personal trainer charges £45 a session. A custom plan from a coach: £80–150, refreshed every few months. App subs nibble at it monthly. Learn it once, and the meter stops — for good.</p>
                <ul className="bullets">
                  <li>Replace recurring PT fees with self-coached cycles</li>
                  <li>No more &ldquo;starter plan&rdquo; purchases when motivation comes back</li>
                  <li>Compounds: year two, three, ten — same maths, same saving</li>
                </ul>
                <span className="hook">cheapest £49.99 you&apos;ll ever spend.</span>
              </div>
            </article>

            {/* ─── Tool 04 · The Glossary ─── */}
            <article className="t-tool t-tool--blue reverse" id="tool-4">
              <div className="t-tool-visual">
                <div className="tv-glossary">
                  <div className="tv-glossary-head">
                    <div className="lbl"><strong>Gym English.</strong> A pocket dictionary.</div>
                    <div className="num">A → Z · 40+ terms</div>
                  </div>
                  <ul className="tv-glossary-list">
                    {[
                      { term: 'RPE', ipa: '/ahr-pee-ee/ · n.', def: 'Rate of perceived effort, 1–10. How hard a set felt.', em: 'You\'ll log this every session.' },
                      { term: 'Hypertrophy', ipa: '/hy-per-troh-fee/ · n.', def: 'Muscle growth. Specifically: cell size increasing.', em: 'The reason you bother.' },
                      { term: 'Eccentric', ipa: '/ek-sen-trik/ · adj.', def: 'The lowering phase of a rep.', em: 'Where most of the growth actually happens.' },
                      { term: 'Deload', ipa: '/dee-lohd/ · n.', def: 'A planned easy week to let the body catch up.', em: 'Not weakness — strategy.' },
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
                <h3>Speak gym. Without faking it.</h3>
                <p className="body">Every chapter quietly teaches you the language coaches use — RPE, hypertrophy, eccentric, AMRAP, deload. Not as homework. As context, so the words land in your head with their meaning attached. By week four you read a programme and understand it.</p>
                <ul className="bullets">
                  <li>40+ terms defined in plain English, with examples</li>
                  <li>&ldquo;What does that actually mean in the gym?&rdquo; — always the next line</li>
                  <li>Searchable index you can scroll on your phone mid-set</li>
                </ul>
                <span className="hook">no more nodding. you actually know.</span>
              </div>
            </article>

            {/* ─── Tool 05 · Form Vault ─── */}
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
                <h3>Your hands have <em>done</em> twenty exercises. Properly.</h3>
                <p className="body">Hand-drawn breakdowns for every staple lift you&apos;ll meet for the rest of your life — squat, hinge, push, pull, carry, isolate. Each one with cues in plain English, common form faults to spot, and the muscle being trained highlighted. When someone re-racks next to you and asks what you&apos;re doing — you know.</p>
                <ul className="bullets">
                  <li>20+ exercises across full body, upper/lower and PPL</li>
                  <li>Muscle activation bars and step-by-step form cues</li>
                  <li>&ldquo;What it should feel like&rdquo; notes — and &ldquo;what it shouldn&apos;t&rdquo;</li>
                </ul>
                <span className="hook">you&apos;ve done these. you know what they feel like.</span>
              </div>
            </article>

            {/* Closer */}
            <div className="t-payoff-close">
              <div className="stamp-line">All five · yours forever</div>
              <h3>The £49.99 isn&apos;t for a programme.<br />It&apos;s for <em>this whole shelf</em>.</h3>
              <p>One purchase. Eight weeks. Five tools that work the rest of your life. The plan is the smallest thing you walk away with.</p>
            </div>

          </div>
        </section>

        {/* QUOTE */}
        <section className="t-quote">
          <div className="km-container">
            <blockquote>This isn&apos;t a programme you follow. It&apos;s a programme that teaches you to never need one.</blockquote>
            <p className="t-quote-byline">— Kira Mei</p>
          </div>
        </section>

        {/* CTA */}
        <section className="t-cta" style={{ background: 'var(--paper-deep)' }}>
          <div className="km-container-narrow">
            <span className="eyebrow">Ready when you are</span>
            <h2 style={{ marginTop: 18, fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 16 }}>
              Stop following. Start <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>understanding</em>.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--ink-soft)', marginBottom: 32 }}>One-time purchase. Eight weeks. A lifetime of understanding.</p>
            <div style={{ display: 'inline-flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <BuyButton requireTerms product="training" label="Get the Training Blueprint — £49.99" />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>No subscription · Instant access</span>
            </div>
          </div>
        </section>
      </main>

      <KmFooter />
    </div>
  )
}
