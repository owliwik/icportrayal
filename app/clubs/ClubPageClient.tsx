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

  const officialCount = useMemo(() => {
    return clubs.filter((club) => club.isOfficial).length
  }, [clubs])

  const activeLabel = activeCategory
    ? CATEGORY_LABELS.find((c) => c.value === activeCategory)?.label || ''
    : '所有社团'

  const handleCategoryClick = (category: ClubCategory) => {
    setActiveCategory((prev) => prev === category ? null : category)
  }

  const handleRefresh = () => {
    setError(null)
    fetchClubs()
  }

  if (loading && clubs.length === 0) {
    return (
      <div className="space-y-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-8 text-white shadow-lg">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 h-24 w-48 rounded-tr-3xl bg-white/10" />
          <div className='relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
            <div>
              <h1 className='text-4xl font-semibold tracking-tight'>社团列表</h1>
              <p className='text-slate-200 mt-2'>探索我们学校的各种社团活动</p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-200">
                <span className="rounded-full border border-white/20 px-3 py-1">
                  总数 {clubs.length}
                </span>
                <span className="rounded-full border border-white/20 px-3 py-1">
                  正式社团 {officialCount}
                </span>
              </div>
            </div>
            <div>
              <Link href='/report'>
                <Button color='primary' size='lg' className='px-8 shadow-md'>
                  活动打卡
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="min-h-[360px] flex items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white">
          <div className="flex flex-col items-center gap-3">
            <Spinner 
              label="加载社团数据中..." 
              color="primary" 
              size="lg" 
            />
            <div className="text-sm text-slate-500">首次加载可能需要一点时间</div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[360px] flex flex-col items-center justify-center space-y-4 rounded-2xl border border-rose-100 bg-rose-50/60 p-8 text-center">
        <div className="text-3xl">⚠️</div>
        <div className="text-rose-600 text-lg">
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
    <div className="space-y-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-8 text-white shadow-lg">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-0 left-0 h-24 w-48 rounded-tr-3xl bg-white/10" />
        <div className='relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
          <div>
            <h1 className='text-4xl font-semibold tracking-tight'>社团列表</h1>
            <p className='text-slate-200 mt-2'>探索我们学校的各种社团活动</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-200">
              <span className="rounded-full border border-white/20 px-3 py-1">
                总数 {clubs.length}
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1">
                正式社团 {officialCount}
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1">
                当前 {filteredClubs.length}
              </span>
            </div>
          </div>
          <div>
            <Link href='/report'>
              <Button color='primary' size='lg' className='px-8 shadow-md'>
                活动打卡
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-3">
          <Button
            variant={!activeCategory ? 'solid' : 'bordered'}
            color={!activeCategory ? 'primary' : 'default'}
            onPress={() => setActiveCategory(null)}
            className='min-w-[110px]'
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
                className='min-w-[110px]'
              >
                {category.label} ({categoryCount})
              </Button>
            )
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-gray-800">
            {activeLabel} 
            <span className="text-gray-500 text-lg ml-2">
              ({filteredClubs.length}个)
            </span>
          </h2>
          {activeCategory && (
            <Button
              size="sm"
              variant="flat"
              color="default"
              onPress={() => setActiveCategory(null)}
            >
              清除筛选
            </Button>
          )}
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
