import type { Metadata } from 'next'
import { headers } from 'next/headers'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: {
    default: 'Rocket Genie - Local Business Directory',
    template: '%s | Rocket Genie',
  },
  description: 'Find the best local businesses, services, and professionals in your city.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? ''
  // Payload admin has its own RootLayout with <html>/<body>; do not nest another document.
  const isPayloadAdmin = pathname.startsWith('/admin')

  if (isPayloadAdmin) {
    return <>{children}</>
  }

  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <Providers>
          {/* <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer /> */}
        </Providers>
      </body>
    </html>
  )
}
