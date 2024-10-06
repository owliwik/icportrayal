import { createContext } from 'react'

export const LangContext = createContext<{ lang: 'cn' | 'en' }>({
  lang: 'cn'
})
