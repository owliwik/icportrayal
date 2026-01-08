// ClubCard.tsx
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
  const [imageError, setImageError] = useState(false)
  
  // 统一使用默认图片
  const imageUrl = '/default-club.jpg'

  return (
    <>
      <div
        className={cn(
          'group flex flex-col bg-white rounded-lg overflow-hidden transition-all border border-gray-200',
          'hover:cursor-pointer hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5',
          'active:scale-[0.98]'
        )}
        onClick={() => setModalOpened(true)}
      >
        <div className='h-28 relative overflow-hidden'>
          {!imageError ? (
            <Image
              src={imageUrl}
              alt={`${club.name} 社团封面`}
              fill
              className="object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
              <div className="text-2xl text-gray-400 font-bold">
                {club.name.charAt(0)}
              </div>
            </div>
          )}
          <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent' />
          <div className='absolute bottom-0 left-0 right-0 p-4 z-10'>
            <div className='text-lg font-bold text-white drop-shadow-md line-clamp-1'>
              {club.name}
            </div>
            <div className='text-slate-200 text-sm drop-shadow-md line-clamp-1'>
              {club.aliasName || club.type || '校园社团'}
            </div>
          </div>
        </div>

        <div className='flex-1 p-3 relative min-h-[60px]'>
          <div className='text-xs mb-1 line-clamp-1'>
            社长: {club.leaders?.[0] || '未指定'}
          </div>
          <div className='text-xs text-slate-500 line-clamp-1'>
            {club.isOfficial ? '正式社团' : '兴趣小组'}
            {club.activityPlace && ` • ${club.activityPlace}`}
          </div>

          <Button
            onPress={() => setModalOpened(true)}
            size='sm'
            className='absolute top-[50%] translate-y-[-50%] right-3 rounded-full flex justify-center items-center bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors'
            isIconOnly
          >
            <FaRegPaperPlane className="text-sm" />
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