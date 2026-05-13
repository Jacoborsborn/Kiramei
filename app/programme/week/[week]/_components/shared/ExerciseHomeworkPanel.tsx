import * as React from 'react'

interface Props {
  index: number
  searchTerms: string[]
  formCues: string[]
}

const stepCircle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  width: 17, height: 17, borderRadius: '50%', flexShrink: 0,
  background: 'var(--accent)', color: '#fff',
  fontSize: 8.5, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace',
}

const stepLabel: React.CSSProperties = {
  fontSize: 9, fontWeight: 700, letterSpacing: '0.11em',
  textTransform: 'uppercase', color: 'var(--ink-muted)',
}

const chip: React.CSSProperties = {
  display: 'inline-block',
  fontSize: 9, fontFamily: 'JetBrains Mono, monospace',
  color: 'var(--ink-soft)',
  background: 'rgba(31,27,22,0.07)',
  border: '1px solid var(--paper-edge)',
  borderRadius: 4, padding: '2px 5px',
  lineHeight: 1.5,
}

export function ExerciseHomeworkPanel({ index, searchTerms, formCues }: Props) {
  const pinterestUrl = `https://pinterest.com/search/pins/?q=${encodeURIComponent(searchTerms[0])}`

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 14,
      padding: '20px 14px', height: '100%',
    }}>
      <div>
        <p style={{
          fontSize: 8.5, fontWeight: 700, color: 'var(--ink-muted)',
          letterSpacing: '0.1em', marginBottom: 5,
        }}>
          {String(index + 1).padStart(2, '0')}
        </p>
        <p style={{
          fontSize: 9, fontWeight: 700, color: 'var(--accent)',
          letterSpacing: '0.13em', textTransform: 'uppercase',
        }}>
          YOUR TASK
        </p>
      </div>

      {/* Step 1 — search */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={stepCircle}>1</span>
          <span style={stepLabel}>Search for it</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {searchTerms.map(term => (
            <span key={term} style={chip}>{term}</span>
          ))}
        </div>
      </div>

      {/* Step 2 — Pinterest */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={stepCircle}>2</span>
          <span style={stepLabel}>Find a reference</span>
        </div>
        <a
          href={pinterestUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 10.5, color: 'var(--accent)',
            textDecoration: 'none', fontWeight: 600,
          }}
        >
          Browse on Pinterest →
        </a>
      </div>

      {/* Step 3 — form check */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={stepCircle}>3</span>
          <span style={stepLabel}>Watch for</span>
        </div>
        <ul style={{ margin: 0, padding: '0 0 0 13px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {formCues.map((cue, i) => (
            <li key={i} style={{ fontSize: 10.5, color: 'var(--ink)', lineHeight: 1.5 }}>{cue}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
