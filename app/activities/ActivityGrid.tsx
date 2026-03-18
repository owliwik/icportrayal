'use client'

import { Activity } from '@/lib/types/activity'
import { ActivityCard } from './ActivityCard'
import { Skeleton } from '@/components/ui/skeleton'

export const ActivityGrid = ({ activities }: { activities?: Activity[] }) => {
  if (!activities) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className='bg-white rounded-xl border border-gray-200'>
            <Skeleton className='h-48 w-full rounded-t-xl' />
            <div className='p-4 space-y-3'>
              <Skeleton className='h-5 w-3/4' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-2/3' />
              <Skeleton className='h-8 w-full rounded-lg' />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
        <div className="text-4xl mb-4">📸</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          暂无活动
        </h3>
        <p className="text-gray-500">
          当前分类下还没有活动，敬请期待
        </p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {activities.map((activity) => (
        <ActivityCard key={activity.$id} {...activity} />
      ))}
    </div>
  )
}