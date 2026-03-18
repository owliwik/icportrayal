'use client'

import { useState } from 'react'
import { Activity } from '@/lib/types/activity'
import { Button } from '@nextui-org/button'
import { FaDownload, FaMapMarkerAlt, FaCalendarAlt, FaUsers } from 'react-icons/fa'
import Image from 'next/image'
import { cn } from '@nextui-org/theme'
import { format } from 'date-fns'

interface ActivityCardProps extends Activity {}

export const ActivityCard = (activity: ActivityCardProps) => {
  const [imageError, setImageError] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    if (!activity.downloadUrl) return
    
    setDownloading(true)
    try {
      // 模拟下载，实际应该从后端获取下载链接
      const response = await fetch(activity.downloadUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${activity.title}-photos.zip`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download failed:', error)
      // 可以添加错误提示
    } finally {
      setDownloading(false)
    }
  }

  const categoryColors = {
    Sports: 'bg-blue-100 text-blue-700',
    Arts: 'bg-purple-100 text-purple-700'
  }

  return (
    <div
      className={cn(
        'group flex flex-col bg-white rounded-xl overflow-hidden transition-all border border-gray-200',
        'hover:shadow-lg hover:border-blue-300 hover:-translate-y-1',
        'active:scale-[0.99]'
      )}
    >
      {/* 图片区域 */}
      <div className='h-48 relative overflow-hidden bg-gray-100'>
        {!imageError && activity.imageUrl ? (
          <Image
            src={activity.imageUrl}
            alt={activity.title}
            fill
            className="object-cover transition-all duration-300 ease-in-out group-hover:scale-110"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-4xl text-gray-400 font-bold">
              {activity.title.charAt(0)}
            </div>
          </div>
        )}
        
        {/* 分类标签 */}
        <div className="absolute top-3 right-3 z-10">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[activity.category]}`}>
            {activity.category}
          </span>
        </div>
        
        {/* 日期标签 */}
        <div className="absolute bottom-3 left-3 z-10 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
          <FaCalendarAlt className="text-xs" />
          {format(new Date(activity.date), 'yyyy-MM-dd')}
        </div>
      </div>

      {/* 内容区域 */}
      <div className='flex-1 p-4'>
        <h3 className='text-lg font-semibold text-gray-900 mb-2 line-clamp-1'>
          {activity.title}
        </h3>
        
        <p className='text-sm text-gray-600 mb-3 line-clamp-2'>
          {activity.description}
        </p>

        {/* 活动信息 */}
        <div className='space-y-2 mb-4'>
          <div className='flex items-center gap-2 text-xs text-gray-500'>
            <FaMapMarkerAlt className="text-gray-400" />
            <span className='line-clamp-1'>{activity.location}</span>
          </div>
          
          {activity.organizer && (
            <div className='flex items-center gap-2 text-xs text-gray-500'>
              <FaUsers className="text-gray-400" />
              <span>主办：{activity.organizer}</span>
              {activity.participants && (
                <span className='ml-1'>({activity.participants}人参与)</span>
              )}
            </div>
          )}
        </div>

        {/* 下载按钮 */}
        {activity.downloadUrl && (
          <Button
            onPress={handleDownload}
            isLoading={downloading}
            size='sm'
            className='w-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors'
            startContent={<FaDownload className="text-sm" />}
          >
            {downloading ? '下载中...' : '下载活动照片'}
          </Button>
        )}
      </div>
    </div>
  )
}