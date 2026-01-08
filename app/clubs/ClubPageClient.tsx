'use client'

import { useMemo, useState, useEffect, useCallback } from 'react'
import { Button } from '@nextui-org/button'
import { Club } from '@/lib/types/club'
import { ClubGrid } from './ClubGrid'
import Link from 'next/link'
import { Spinner } from '@nextui-org/spinner'
import { 
  ClubCategory, 
  CATEGORY_LABELS, 
  CATEGORY_TYPE_MATCHERS 
} from '@/lib/types/category'

const matchesCategory = (club: Club, category: ClubCategory) => {
  const type = club.type?.toLowerCase().trim()
  if (!type) return false
  return CATEGORY_TYPE_MATCHERS[category].some(keyword => 
    type.includes(keyword)
  )
}

export const ClubPageClient = () => {
  const [clubs, setClubs] = useState<Club[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<ClubCategory | null>(null)

  const fetchClubs = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      console.time('fetch-clubs')
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000)
      
      const response = await fetch('/api/clubs', {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'no-cache',
        }
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: 获取数据失败`)
      }
      
      const data = await response.json()
      console.timeEnd('fetch-clubs')
      console.log(`成功获取 ${data.length} 个社团`)
      
      setClubs(data)
    } catch (error) {
      console.error('Error fetching clubs:', error)
      
      if (error instanceof DOMException && error.name === 'AbortError') {
        setError('请求超时，请检查网络连接')
      } else {
        setError(error instanceof Error ? error.message : '获取社团数据失败')
      }
      
      setClubs([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchClubs()
  }, [fetchClubs])

  const filteredClubs = useMemo(() => {
    if (!activeCategory) return clubs
    return clubs.filter((club) => matchesCategory(club, activeCategory))
  }, [activeCategory, clubs])

  const handleCategoryClick = (category: ClubCategory) => {
    setActiveCategory((prev) => prev === category ? null : category)
  }

  const handleRefresh = () => {
    setError(null)
    fetchClubs()
  }

  if (loading && clubs.length === 0) {
    return (
      <div className="space-y-8">
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
          <div>
            <h1 className='text-4xl font-bold text-gray-900'>社团列表</h1>
            <p className='text-gray-600 mt-2'>探索我们学校的各种社团活动</p>
          </div>
          <div>
            <Link href='/report'>
              <Button color='primary' size='lg' className='px-8'>
                活动打卡
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="min-h-[400px] flex items-center justify-center">
          <Spinner 
            label="加载社团数据中..." 
            color="primary" 
            size="lg" 
          />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
        <div className="text-red-500 text-lg">
          加载失败: {error}
        </div>
        <Button 
          color="primary" 
          onPress={handleRefresh}
          startContent={
            <span className="text-xl">⟳</span>
          }
        >
          重试加载
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h1 className='text-4xl font-bold text-gray-900'>社团列表</h1>
          <p className='text-gray-600 mt-2'>探索我们学校的各种社团活动</p>
        </div>
        <div>
          <Link href='/report'>
            <Button color='primary' size='lg' className='px-8'>
              活动打卡
            </Button>
          </Link>
        </div>
      </div>

      <div className='flex flex-wrap gap-3'>
        <Button
          variant={!activeCategory ? 'solid' : 'bordered'}
          color={!activeCategory ? 'primary' : 'default'}
          onPress={() => setActiveCategory(null)}
          className='min-w-[100px]'
        >
          全部社团 ({clubs.length})
        </Button>
        {CATEGORY_LABELS.map((category) => {
          const isActive = activeCategory === category.value
          const categoryCount = clubs.filter(club => 
            matchesCategory(club, category.value)
          ).length
          
          return (
            <Button
              key={category.value}
              variant={isActive ? 'solid' : 'bordered'}
              color={isActive ? 'primary' : 'default'}
              onPress={() => handleCategoryClick(category.value)}
              className='min-w-[100px]'
            >
              {category.label} ({categoryCount})
            </Button>
          )
        })}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {activeCategory ? 
              `${CATEGORY_LABELS.find(c => c.value === activeCategory)?.label}社团` : 
              '所有社团'}
            <span className="text-gray-500 text-lg ml-2">
              ({filteredClubs.length}个)
            </span>
          </h2>
        </div>
        
        {clubs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-2xl mb-2">😔</div>
            <div className="mb-4">暂无社团数据</div>
            <Button 
              color="primary" 
              variant="flat"
              onPress={handleRefresh}
            >
              刷新数据
            </Button>
          </div>
        ) : filteredClubs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-2xl mb-2">🔍</div>
            <div className="mb-2">没有找到该分类的社团</div>
            <div className="text-sm text-gray-400 mb-4">尝试选择其他分类或查看全部社团</div>
            <Button 
              color="primary" 
              variant="flat"
              onPress={() => setActiveCategory(null)}
            >
              查看全部社团
            </Button>
          </div>
        ) : (
          <ClubGrid clubs={filteredClubs} />
        )}
      </div>
    </div>
  )
}