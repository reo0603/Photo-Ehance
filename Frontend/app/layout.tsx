import type { Metadata } from 'next'
import Head from 'next/head'
import './globals.css'

export const metadata: Metadata = {
  title: 'Photo Enhance',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel='icon' type='image/png' href='/placeholder-logo.png' />
      </Head>
      <body>{children}</body>
    </html>
  )
}
