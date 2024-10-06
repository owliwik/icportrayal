'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react'

interface LanguageContextType {
  language: 'en' | 'cn'
  switchLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'cn'>('cn')

  const switchLanguage = () => {
    setLanguage(language === 'en' ? 'cn' : 'en')
  }

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}