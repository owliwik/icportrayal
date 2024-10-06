import { createContext } from 'react'

export const UserContext = createContext<{ uid?: string; profile?: any }>({
  uid: '',
  profile: null,
})
