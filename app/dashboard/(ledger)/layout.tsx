import type { Metadata } from 'next'
import DashboardShell from './DashboardShell'
import '../../../site/shared.css'
import './ledger.css'

export const metadata: Metadata = {
  title: "Founder's Ledger — Kira Mei",
  robots: 'noindex, nofollow',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>
}
