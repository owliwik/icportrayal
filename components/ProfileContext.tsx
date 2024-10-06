'use client'

import { Profile } from '@/lib/types/profile'
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

interface ProfileContextType {
  profile: Profile | null
  updateProfile: (profileData: Profile | null) => void
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const cachedProfile = localStorage.getItem('profile')
    if (cachedProfile) setProfile(JSON.parse(cachedProfile))
  }, [])

  const updateProfile = (profileData: Profile | null) => {
    setProfile(profileData)
    if (profileData) {
      localStorage.setItem('profile', JSON.stringify(profileData))
    } else {
      localStorage.removeItem('profile')
    }
  }

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}