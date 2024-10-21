'use client'

import { useState } from 'react'
import { Club } from '@/lib/types/club'
import { Button } from '@nextui-org/button'
import { FaRegPaperPlane } from 'react-icons/fa6'
import { DetailsModal } from './DetailsModal'
import Image from 'next/image'
import { cn } from '@nextui-org/theme'

export const ClubCard = (club: Club) => {
  const [modalOpened, setModalOpened] = useState(false)
  const profileImageURL = club.profileImageID
    ? `/api/clubs/profile-images/${club.profileImageID}`
    : `/${club.type}.jpg`

  return (
    <>
      <div
        className={cn(
          'group flex flex-col bg-white rounded-md overflow-hidden transition-all border-[1.2px]',
          'hover:cursor-pointer'
        )}
      >
        <div className='h-28 relative overflow-hidden'>
          <Image
            width='500'
            height='500'
            loading='lazy'
            className='absolute w-full h-full object-cover transition-all duration-400 ease-in-out group-hover:scale-105 group-hover:brightness-90'
            src={profileImageURL}
            alt=''
            onError={(event) => {
              event.currentTarget.onerror = null
              event.currentTarget.src = '/default.jpg'
            }}
          />
          <div className='m-4 absolute z-10'>
            <div className='text-xl'>{club.name}</div>
            <div className='text-slate-500'>
              {club.aliasName || 'An IC Club'}
            </div>
          </div>
        </div>

        <div className='flex-1 p-4 relative'>
          <div className=''>
            社长: {club.leaders[0]} {club.leaders[1]}
          </div>
          <div className='text-slate-400'>
            {club.isOfficial ? '正式社团' : '兴趣小组'}
          </div>

          <Button
            onClick={() => setModalOpened(true)}
            size='sm'
            className='py-5 absolute top-[50%] translate-y-[-50%] right-6 rounded-[100rem] flex justify-center items-center text-xl bg-blue-100 text-blue-500'
          >
            <FaRegPaperPlane />
          </Button>
        </div>
      </div>

      <DetailsModal
        club={club}
        isOpened={modalOpened}
        setOpened={setModalOpened}
      />
    </>
  )
}
