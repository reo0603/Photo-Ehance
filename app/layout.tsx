import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google" // Import Inter font

const inter = Inter({ subsets: ["latin"] }) // Initialize Inter font

export const metadata = {
  title: "PhotoEnhance AI",
  description: "Transform your photos with AI-powered enhancements.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {" "}
        {/* Apply Inter font to body */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
