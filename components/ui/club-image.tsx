// components/ui/club-image.tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ClubImageProps {
  clubName: string
  type?: string
  imageId?: string
  className?: string
}

export function ClubImage({ clubName, type, imageId, className = '' }: ClubImageProps) {
  const [error, setError] = useState(false)
  
  const getImageUrl = () => {
    if (imageId && !error) {
      return imageId.startsWith('http') 
        ? imageId 
        : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/club-images/${imageId}`
    }
    
    // 使用占位图片
    const typeColorMap: Record<string, string> = {
      sports: '3b82f6',
      academic: '10b981', 
      interests: '8b5cf6',
      art: 'f59e0b',
      music: 'ef4444',
      default: '6b7280'
    }
    
    const color = typeColorMap[type?.toLowerCase() || ''] || typeColorMap.default
    
    return `https://placehold.co/600x400/${color}/ffffff?text=${encodeURIComponent(clubName)}&font=plus-jakarta-sans`
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={getImageUrl()}
        alt={`${clubName} 社团封面`}
        fill
        className="object-cover"
        onError={() => setError(true)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
      />
    </div>
  )
}