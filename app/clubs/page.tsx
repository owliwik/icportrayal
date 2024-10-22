'use client'

import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { ClubGrid } from './ClubGrid'
import { useEffect, useState } from 'react'
import { Club } from '@/lib/types/club'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useUser } from '@/components/context/UserContext'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import Protection from '@/components/protection'

const Page = () => {
  const { user, updateUser } = useUser()
  const [clubs, setClubs] = useState<Club[]>()
  useEffect(() => {
    const run = async () => {
      const response = await supabase.from('clubs').select('*')
      console.log(response)
      if (response.data) {
        setClubs(response.data)
      }
    }
    run()
  }, [])

  return (
    <div className='w-full h-full flex flex-col items-center'>
      <div className='w-[60rem] flex justify-center my-16 relative'>
        <div className='text-4xl font-thin'>Our Clubs · 我们的社团</div>
        <div className='absolute right-0'>
          <Link href='/report'>
            <Button color='primary'>活动打卡</Button>
          </Link>
        </div>
      </div>

      {user ? (
        <ClubGrid clubs={clubs} />
      ) : (
        <Protection />
      )}
    </div>
  )
}

export default Page
