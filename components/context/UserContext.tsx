'use client'

import { supabase } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

interface UserContextType {
  user?: User
  updateUser: (user?: User) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | undefined>()
  supabase.auth.onAuthStateChange((event, session) => {
    setUser(session?.user)
  })

  useEffect(() => {
    const data = localStorage.getItem('user')
    if (data) {
      setUser(JSON.parse(data))
    } else {
      updateUser(undefined)
    }
  }, [])

  const updateUser = (user?: User) => {
    setUser(user)
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
