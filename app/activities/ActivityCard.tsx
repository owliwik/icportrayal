// app/activities/ActivityCard.tsx
'use client'

import { useState } from 'react'
import { Activity } from '@/lib/types/activity'
import { Button } from '@nextui-org/button'
import { FaDownload } from 'react-icons/fa'
import Image from 'next/image'
import { cn } from '@nextui-org/theme'

export const ActivityCard = (activity: Activity) => {
  const [downloading, setDownloading] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  // 统一使用默认图片
  const imageUrl = '/default-activity.jpg'

  const handleDownload = async () => {
    if (!activity.link) return
    
    setDownloading(true)
    try {
      let downloadUrl = activity.link

      // 如果是 Supabase Storage 的对象路径（不带 http / 不以 / 开头），拼成可访问的 public URL
      if (!downloadUrl.startsWith('http') && !downloadUrl.startsWith('/')) {
        const cleanPath = downloadUrl.replace(/^\/+/, '')
        downloadUrl = `https://fxehqztapwouuyvpafce.supabase.co/storage/v1/object/public/${cleanPath}`
      }

      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = `${activity.name}-photos.zip`
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setDownloading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  return (
    <div
      className={cn(
        'group flex flex-col bg-white rounded-lg overflow-hidden transition-all border border-gray-200',
        'hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5',
        'active:scale-[0.98]'
      )}
    >
      <div className='h-28 relative overflow-hidden'>
        {!imageError ? (
          <Image
            src={imageUrl}
            alt={`${activity.name} 活动封面`}
            fill
            className="object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
            <div className="text-2xl text-gray-400 font-bold">
              {activity.name.charAt(0)}
            </div>
          </div>
        )}
        <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent' />
        <div className='absolute bottom-0 left-0 right-0 p-3 z-10'>
          <div className='text-sm font-bold text-white drop-shadow-md line-clamp-1'>
            {activity.name}
          </div>
          <div className='text-slate-200 text-xs drop-shadow-md line-clamp-1'>
            {formatDate(activity.date)} • {activity.department}
          </div>
        </div>
      </div>

      <div className='flex-1 p-3 relative min-h-[60px]'>
        <div className='text-xs mb-1 line-clamp-2 text-gray-600'>
          {activity.description}
        </div>
        <div className='text-xs text-slate-500 line-clamp-1'>
          {activity.category === 'Sports' ? '体育活动' : '艺术活动'}
        </div>

        {activity.link && (
          <Button
            onPress={handleDownload}
            isLoading={downloading}
            size='sm'
            className='absolute top-[50%] translate-y-[-50%] right-3 rounded-full flex justify-center items-center bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors'
            isIconOnly
            aria-label='下载活动照片压缩包'
          >
            <FaDownload className="text-sm" />
          </Button>
        )}
      </div>
    </div>
  )
}
