'use client'

import { Club } from '@/lib/types/club'
import { ClubCard } from './ClubCard'

export const ClubGrid = ({ clubs }: { clubs: Club[] }) => {
  return (
    <div className='max-w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-x-5'>
      {clubs &&
        clubs.map((club) => (
          <div key={club.$id} className='w-64 h-56'>
            <ClubCard {...club} />
          </div>
        ))}
    </div>
  )
}
