'use client'

const WEEKS = [
  { week: 1, split: 'Full Body',           phase: 'Foundations' },
  { week: 2, split: 'Full Body II',        phase: 'Foundations' },
  { week: 3, split: 'Upper / Lower',       phase: 'Specialisation' },
  { week: 4, split: 'Upper / Lower II',    phase: 'Specialisation' },
  { week: 5, split: 'Push Pull Legs',      phase: 'Refinement' },
  { week: 6, split: 'Push Pull Legs II',   phase: 'Refinement' },
  { week: 7, split: 'PPL Advanced',        phase: 'Independence' },
  { week: 8, split: 'Build Your Own',      phase: 'Final week' },
]

export default function ProgrammePreviewPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>
        Opens each week in a new tab. You must be signed in as a Supabase user — the founder cookie bypasses the access and unlock gates.
      </p>
      {WEEKS.map(({ week, split, phase }) => (
        <a
          key={week}
          href={`/programme/week/${week}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ldg-btn ldg-btn-ghost"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 20px', textDecoration: 'none',
            borderRadius: 8, border: '1px solid var(--paper-edge)',
            background: '#fff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, color: '#bbb', minWidth: 28 }}>
              W{week}
            </span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', margin: 0 }}>{split}</p>
              <p style={{ fontSize: 12, color: '#999', margin: 0 }}>{phase}</p>
            </div>
          </div>
          <span style={{ fontSize: 12, color: '#4A7C59', fontWeight: 600 }}>Open →</span>
        </a>
      ))}
    </div>
  )
}
