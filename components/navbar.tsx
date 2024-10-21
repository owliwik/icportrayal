'use client'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/navbar'
import { Button } from '@nextui-org/button'
import { MdLanguage } from 'react-icons/md'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@nextui-org/theme'
import { useProfile } from './ProfileContext'
import { useLanguage } from './LanguageContext'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

const Navigation = () => {
  const current = usePathname().split('/')[1]
  //const { profile, updateProfile } = useProfile()
  const [user, setUser] = useState('')
  const { switchLanguage } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      const userData = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session?.user.id)
        .single()

      //console.log('USERDATA: ' + userData.data.name)
      if (userData.data) {
        setUser(userData.data.name)
      }
    })
  })

  // useEffect(() => {
  //   const run = async () => {
  //     const { data, error } = await supabase.auth.getUser()

  //     if (data.user?.email) {
  //       setUser(data.user.email)
  //     }
  //   }

  //   run()
  // })

  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <Link href='/'>
          <p className='text-2xl font-bold'>IC Portrayal</p>
        </Link>
      </NavbarBrand>
      <NavbarContent
        className='flex gap-4 text-large font-light'
        justify='center'
      >
        <NavbarItem className='text-size-inherit'>
          <Link
            href='/home'
            className={cn('py-2 px-4 rounded-[1000rem]', 'nav-link')}
          >
            主页
          </Link>
        </NavbarItem>
        <NavbarItem className='text-size-inherit'>
          <Link
            href='/community'
            className={cn('py-2 px-4 rounded-[1000rem]', 'nav-link')}
          >
            社区论坛
          </Link>
        </NavbarItem>
        <NavbarItem className='text-size-inherit'>
          <Link
            href='/clubs'
            className={cn('py-2 px-4 rounded-[1000rem]', 'nav-link')}
          >
            社团
          </Link>
        </NavbarItem>
        <NavbarItem className='text-size-inherit'>
          <Link
            href='/about'
            className={cn('py-2 px-4 rounded-[1000rem]', 'nav-link')}
          >
            关于我们
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        {user ? (
          <div className='flex gap-2'>
            <Button
              variant='light'
              color='danger'
              onClick={async () => {
                await supabase.auth.signOut()
                setUser('')
                router.refresh()
              }}
            >
              退出登录
            </Button>
            <Link href='/home'>
              <Button variant='flat'>{user}</Button>
            </Link>
          </div>
        ) : (
          <Link href='/auth/login'>
            <Button variant='flat'>登入</Button>
          </Link>
        )}

        
      </NavbarContent>
    </Navbar>
  )
}

export { Navigation }
