import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Arborist Planner',
  description: 'Job tracker with email integration and lead management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="et">
      <body>{children}</body>
    </html>
  )
}
