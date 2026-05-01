import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kira Mei — Digital Fitness Education',
  description: 'Buy this once. Never buy a plan again. 8 weeks of training and nutrition education by Kira Mei.',
  openGraph: {
    title: 'Kira Mei — Digital Fitness Education',
    description: 'Buy this once. Never buy a plan again.',
    url: 'https://kiramei.co.uk',
    siteName: 'Kira Mei',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
