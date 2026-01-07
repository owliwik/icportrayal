'use client'

import { useMemo, useState } from 'react'
import { Button } from '@nextui-org/button'
import { Club } from '@/lib/types/club'
import { ClubGrid } from './ClubGrid'

type Category = 'sports' | 'academic' | 'interests'

const CATEGORY_LABELS: { value: Category; label: string }[] = [
  { value: 'sports', label: 'Sports' },
  { value: 'academic', label: 'Academic' },
  { value: 'interests', label: 'Interests' },
]

const CATEGORY_TYPE_MATCHERS: Record<Category, string[]> = {
  sports: ['sports', 'sport'],
  academic: ['academic', 'acadamic'],
  interests: ['interests', 'interest'],
}

const matchesCategory = (club: Club, category: Category) => {
  const type = club.type?.toLowerCase().trim()
  if (!type) return false
  return CATEGORY_TYPE_MATCHERS[category].includes(type)
}

export const ClubPageClient = ({ clubs }: { clubs: Club[] }) => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)

  const filteredClubs = useMemo(() => {
    if (!activeCategory) return clubs
    return clubs.filter((club) => matchesCategory(club, activeCategory))
  }, [activeCategory, clubs])

  return (
    <>
      <div className='w-[60rem] flex justify-center gap-3 mb-10'>
        {CATEGORY_LABELS.map((category) => {
          const isActive = activeCategory === category.value
          return (
            <Button
              key={category.value}
              variant={isActive ? 'solid' : 'bordered'}
              color={isActive ? 'primary' : 'default'}
              onClick={() =>
                setActiveCategory((prev) =>
                  prev === category.value ? null : category.value
                )
              }
            >
              {category.label}
            </Button>
          )
        })}
      </div>

      <ClubGrid clubs={filteredClubs} />
    </>
  )
}
