'use client'

import { useState, useEffect } from 'react'
import { type PlanJSON } from '@/lib/planEmail'
import StudioPreview from './StudioPreview'

const STUDIO_SECRET = process.env.NEXT_PUBLIC_STUDIO_SECRET ?? ''

type Lead = { id: string; name: string; email: string; plan_selected: string; status: string }

type Props = { onClose: () => void }

export default function Studio({ onClose }: Props) {
  const [visible, setVisible] = useState(false)
  const [leads, setLeads] = useState<Lead[]>([])
  const [selectedLead, setSelectedLead] = useState<string>('')
  const [jsonText, setJsonText] = useState('')
  const [parsedPlan, setParsedPlan] = useState<PlanJSON | null>(null)
  const [parseError, setParseError] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    fetch('/api/kira/studio/leads', {
      headers: { 'x-studio-secret': STUDIO_SECRET },
    })
      .then(r => r.ok ? r.json() : [])
      .then(setLeads)
      .catch(() => {})
  }, [])

  function handleJsonChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value
    setJsonText(text)
    setSent(false)
    if (!text.trim()) {
      setParsedPlan(null)
      setParseError('')
      return
    }
    try {
      const parsed = JSON.parse(text) as PlanJSON
      setParsedPlan(parsed)
      setParseError('')
    } catch {
      setParsedPlan(null)
      setParseError('Invalid JSON — check your structure.')
    }
  }

  async function handleSend() {
    if (!selectedLead || !parsedPlan) return
    setSending(true)
    try {
      const res = await fetch('/api/kira/studio/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-studio-secret': STUDIO_SECRET,
        },
        body: JSON.stringify({ lead_id: selectedLead, plan: parsedPlan }),
      })
      if (res.ok) {
        setSent(true)
        setLeads(prev => prev.map(l => l.id === selectedLead ? { ...l, status: 'accepted' } : l))
      }
    } finally {
      setSending(false)
    }
  }

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  const selectedLeadObj = leads.find(l => l.id === selectedLead)
  const canSend = !!selectedLead && !!parsedPlan && !sending

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'var(--paper)',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s cubic-bezier(0.32,0,0.15,1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px',
        height: 56,
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span className="font-display" style={{ fontSize: 22, fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>Studio</span>
          <span style={{ width: 1, height: 16, background: 'var(--border)' }} />
          <span style={{ fontSize: 12, color: 'var(--ink-faint)', letterSpacing: '0.06em' }}>Kira Mei</span>
        </div>
        <button
          onClick={handleClose}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--ink-muted)', fontSize: 20, lineHeight: 1,
            padding: '8px 10px', borderRadius: 8,
            fontFamily: 'DM Sans, sans-serif',
          }}
          aria-label="Close Studio"
        >
          ×
        </button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>

        {/* Left — inputs */}
        <div
          className="notebook-bg"
          style={{
            borderRight: '1px solid var(--border)',
            overflowY: 'auto',
            padding: '32px 28px 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
          }}
        >
          {/* Client selector */}
          <div>
            <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sage)', display: 'block', marginBottom: 10 }}>
              Select client
            </label>
            <select
              className="kira-input"
              value={selectedLead}
              onChange={e => { setSelectedLead(e.target.value); setSent(false) }}
            >
              <option value="">Choose a paid client…</option>
              {leads.map(l => (
                <option key={l.id} value={l.id}>
                  {l.name} — {l.email} ({l.plan_selected})
                </option>
              ))}
            </select>
            {leads.length === 0 && (
              <p style={{ fontSize: 12, color: 'var(--ink-faint)', marginTop: 8 }}>No paid or accepted leads yet.</p>
            )}
          </div>

          {/* JSON input */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sage)' }}>
              Programme JSON
            </label>
            <textarea
              className="kira-input"
              value={jsonText}
              onChange={handleJsonChange}
              placeholder={`{\n  "client": { "name": "Jane Smith", ... },\n  "programme": { "title": "Your 8-Week Reset", ... },\n  ...\n}`}
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: 12,
                lineHeight: 1.6,
                minHeight: 320,
                flex: 1,
                resize: 'vertical',
                borderColor: parseError ? '#C0392B' : undefined,
              }}
            />
            {parseError && (
              <p style={{ fontSize: 12, color: '#C0392B' }}>{parseError}</p>
            )}
          </div>

          {/* Send */}
          <div>
            <button
              onClick={handleSend}
              disabled={!canSend}
              style={{
                width: '100%',
                padding: '15px',
                background: sent ? 'var(--sage)' : !canSend ? 'var(--border)' : 'var(--ink)',
                color: !canSend ? 'var(--ink-faint)' : '#F8F6F1',
                border: 'none',
                borderRadius: 99,
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 15,
                fontWeight: 600,
                cursor: canSend ? 'pointer' : 'not-allowed',
                letterSpacing: '0.04em',
                transition: 'all 0.2s',
              }}
            >
              {sent
                ? `✓ Sent to ${selectedLeadObj?.name.split(' ')[0]}.`
                : sending
                  ? 'Sending…'
                  : 'Send Programme →'}
            </button>
            {!selectedLead && (
              <p style={{ fontSize: 11, color: 'var(--ink-faint)', textAlign: 'center', marginTop: 10 }}>Select a client to enable</p>
            )}
          </div>
        </div>

        {/* Right — preview */}
        <div style={{ overflowY: 'auto', background: 'var(--surface)' }}>
          <StudioPreview
            plan={parsedPlan}
            parseError={parseError}
            onUpdate={updated => {
              setParsedPlan(updated)
              setJsonText(JSON.stringify(updated, null, 2))
            }}
          />
        </div>
      </div>

      {/* Mobile note */}
      <style>{`
        @media (max-width: 768px) {
          .studio-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
