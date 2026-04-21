import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kira Mei — Online Personal Training',
  description: 'Custom programmes for people 40+ who are serious about results. No fluff, no fads.',
  openGraph: {
    title: 'Kira Mei — Online Personal Training',
    description: 'Custom programmes for people 40+ who are serious about results.',
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
