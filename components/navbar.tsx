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

const Navigation = () => {
  const current = usePathname().split('/')[1]
  const { profile, updateProfile } = useProfile()
  const { switchLanguage } = useLanguage()
  const router = useRouter()

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
        {profile ? (
          <div className='flex gap-2'>
            <Button
              variant='light'
              color='danger'
              onClick={async () => {
                await fetch('/api/auth/logout', { method: 'GET' })
                updateProfile(null)
              }}
            >
              Sign Out
            </Button>
            <Link href='/home'>
              <Button variant='flat'>{profile.name}</Button>
            </Link>
          </div>
        ) : (
          <Link href='/auth/login'>
            <Button variant='flat'>Sign In</Button>
          </Link>
        )}

        {/* <Button
          isIconOnly
          variant='flat'
          color='secondary'
          onClick={() => switchLanguage()}
          className='text-lg'
        >
          <MdLanguage />
        </Button> */}
      </NavbarContent>
    </Navbar>
  )
}

export { Navigation }
