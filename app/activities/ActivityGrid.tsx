// app/activities/ActivityGrid.tsx
'use client'

import { Activity } from '@/lib/types/activity'
import { ActivityCard } from './ActivityCard'
import { Skeleton } from '@/components/ui/skeleton'

export const ActivityGrid = ({ activities }: { activities?: Activity[] }) => {
  return (
    <div className='max-w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-x-5 gap-y-8'>
      {activities
        ? activities.map((activity) => (
            <div key={activity.id} className='w-64'>
              <ActivityCard {...activity} />
            </div>
          ))
        : Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i.toString()} className='w-64 h-[196px]' />
          ))}
    </div>
  )
}
