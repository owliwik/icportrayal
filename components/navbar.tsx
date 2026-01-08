'use client'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@nextui-org/theme'
import { supabase } from '@/lib/supabase/client'
import { useUser } from './context/UserContext'

const Navigation = () => {
  const pathname = usePathname()
  const currentSegment = pathname.split('/')[1]

  const { user, updateUser } = useUser()

  const navItems = [
    { label: 'Home', href: '/home', matches: ['home', 'news'] },
    { label: 'Activities', href: '/activities', matches: ['activities'] },
    { label: 'Artworks', href: '/artworks', matches: ['artworks'] },
    { label: 'Club', href: '/clubs', matches: ['clubs'] },
    { label: 'Resources', href: '/resources', matches: ['resources'] },
    { label: 'Alumni', href: '/alumni', matches: ['alumni'] },
    { label: 'About', href: '/about', matches: ['about'] },
  ]

  return (
    <Navbar className='fixed top-0 left-0 right-0 z-50' isBordered>
      <NavbarBrand>
        <Link href='/' className='text-2xl font-bold'>
          IC Portrayal
        </Link>
      </NavbarBrand>
      <NavbarContent className='flex gap-2 text-base font-medium' justify='center'>
        {navItems.map((item) => {
          const isActive =
            item.matches.includes(currentSegment) ||
            pathname.startsWith(`${item.href}/`)

          return (
            <NavbarItem key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn('nav-link', isActive && 'nav-link-active')}
              >
                {item.label}
              </Link>
            </NavbarItem>
          )
        })}
      </NavbarContent>
      <NavbarContent justify='end'>
        {user ? (
          <div className='flex gap-2'>
            <Button
              variant='light'
              color='danger'
              onPress={async () => {
                await supabase.auth.signOut()
                updateUser(undefined)
                console.log('LOG OUT')
              }}
            >
              退出登录
            </Button>
            <Link href='/home'>
              <Button variant='flat'>{user.user_metadata.display_name}</Button>
            </Link>
          </div>
        ) : (
          <div className='flex gap-2'>
            <Link href='/auth/login'>
              <Button variant='flat'>登录</Button>
            </Link>
            <Link href='/auth/signup'>
              <Button color='primary'>注册</Button>
            </Link>
          </div>
        )}
      </NavbarContent>
    </Navbar>
  )
}

export { Navigation }
