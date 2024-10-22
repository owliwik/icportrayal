'use client'

import '@/styles/globals.css'
import { Navigation } from '@/components/navbar'
import { LanguageProvider } from '@/components/LanguageContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='w-full min-h-[100vh] h-1 flex flex-col'>
        <LanguageProvider>
          <Navigation />
          <main className='flex-1 bg-[#F7F9FE] bg-opacity-80'>{children}</main>
        </LanguageProvider>
      </body>
    </html>
  )
}
