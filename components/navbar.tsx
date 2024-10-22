'use client'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/navbar'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@nextui-org/theme'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useUser } from './context/UserContext'

const Navigation = () => {
  const current = usePathname().split('/')[1]
  
  const { user, updateUser } = useUser()
  const router = useRouter()

  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <a href='/'>
          <p className='text-2xl font-bold'>IC Portrayal</p>
        </a>
      </NavbarBrand>
      <NavbarContent
        className='flex gap-4 text-large font-light'
        justify='center'
      >
        <NavbarItem className='text-size-inherit'>
          <a
            href='/home'
            className={cn('py-2 px-4 rounded-[1000rem]', 'nav-link')}
          >
            主页
          </a>
        </NavbarItem>
        <NavbarItem className='text-size-inherit'>
          <a
            href='/community'
            className={cn('py-2 px-4 rounded-[1000rem]', 'nav-link')}
          >
            社区论坛
          </a>
        </NavbarItem>
        <NavbarItem className='text-size-inherit'>
          <a
            href='/clubs'
            className={cn('py-2 px-4 rounded-[1000rem]', 'nav-link')}
          >
            社团
          </a>
        </NavbarItem>
        <NavbarItem className='text-size-inherit'>
          <a
            href='/about'
            className={cn('py-2 px-4 rounded-[1000rem]', 'nav-link')}
          >
            关于我们
          </a>
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
                updateUser(undefined)
                console.log('LOG OUT')
              }}
            >
              退出登录
            </Button>
            <a href='/home'>
              <Button variant='flat'>{user.user_metadata.display_name}</Button>
            </a>
          </div>
        ) : (
          <a href='/auth/login'>
            <Button variant='flat'>登入</Button>
          </a>
        )}
        
      </NavbarContent>
    </Navbar>
  )
}

export { Navigation }
