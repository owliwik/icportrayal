'use client'

import { Club } from '@/lib/types/club'
import { ClubCard } from './ClubCard'
import { Skeleton } from '@/components/ui/skeleton'

export const ClubGrid = ({ clubs }: { clubs?: Club[] }) => {
  return (
    <div className='max-w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-x-5 gap-y-8'>
      {clubs
        ? clubs.map((club) => (
            <div key={club.$id} className='w-64'>
              <ClubCard {...club} />
            </div>
          ))
        : Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i.toString()} className='w-64 h-[196px]' />
          ))}
    </div>
  )
}
