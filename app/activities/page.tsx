// app/activities/page.tsx
'use client'

import { useMemo, useState, useEffect, useCallback } from 'react'
import { Button } from '@nextui-org/button'
import { Activity, ActivityCategory } from '@/lib/types/activity'
import { ActivityGrid } from './ActivityGrid'
import { Spinner } from '@nextui-org/spinner'
import { FaFilter } from 'react-icons/fa'

const Page = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string>('')
  const [activeCategory, setActiveCategory] = useState<ActivityCategory | null>(null)

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      setDebugInfo('开始请求...')
      
      console.log('[Client] 开始获取活动数据')
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000)
      
      const response = await fetch('/api/activities', {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'no-cache',
        }
      })
      
      clearTimeout(timeoutId)
      
      console.log('[Client] 响应状态:', response.status, response.statusText)
      setDebugInfo(`响应状态: ${response.status}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error('[Client] 响应错误:', errorData)
        throw new Error(`HTTP ${response.status}: ${errorData.error || '获取数据失败'}`)
      }
      
      const data = await response.json()
      console.log('[Client] 成功获取数据:', data)
      console.log('[Client] 数据类型:', typeof data)
      console.log('[Client] 是否为数组:', Array.isArray(data))
      console.log('[Client] 数据条数:', data?.length || 0)
      
      setDebugInfo(`成功获取 ${data?.length || 0} 条数据`)
      
      if (data && Array.isArray(data)) {
        setActivities(data)
      } else {
        console.warn('[Client] 返回数据不是数组:', data)
        setActivities([])
        setDebugInfo(`数据格式错误: 期望数组，实际为 ${typeof data}`)
      }
    } catch (error) {
      console.error('[Client] 获取活动失败:', error)
      
      if (error instanceof DOMException && error.name === 'AbortError') {
        setError('请求超时，请检查网络连接')
        setDebugInfo('请求超时')
      } else {
        const errorMessage = error instanceof Error ? error.message : '获取活动数据失败'
        setError(errorMessage)
        setDebugInfo(`错误: ${errorMessage}`)
      }
      
      setActivities([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchActivities()
  }, [fetchActivities])

  const filteredActivities = useMemo(() => {
    if (!activeCategory) return activities
    return activities.filter((activity) => activity.category === activeCategory)
  }, [activeCategory, activities])

  const categoryCounts = useMemo(() => {
    return {
      Sports: activities.filter((a) => a.category === 'Sports').length,
      Arts: activities.filter((a) => a.category === 'Arts').length
    }
  }, [activities])

  const activeLabel = activeCategory
    ? activeCategory === 'Sports' ? '体育活动' : '艺术活动'
    : '所有活动'

  const handleCategoryClick = (category: ActivityCategory) => {
    setActiveCategory((prev) => prev === category ? null : category)
  }

  const handleRefresh = () => {
    setError(null)
    fetchActivities()
  }

  if (loading && activities.length === 0) {
    return (
      <div className="space-y-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-8 text-white shadow-lg">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 h-24 w-48 rounded-tr-3xl bg-white/10" />
          <div className='relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
            <div>
              <h1 className='text-4xl font-semibold tracking-tight'>校园活动</h1>
              <p className='text-slate-200 mt-2'>Study hard, Play hard!</p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-200">
                <span className="rounded-full border border-white/20 px-3 py-1">
                  总数 {activities.length}
                </span>
                <span className="rounded-full border border-white/20 px-3 py-1">
                  体育活动 {categoryCounts.Sports}
                </span>
                <span className="rounded-full border border-white/20 px-3 py-1">
                  艺术活动 {categoryCounts.Arts}
                </span>
              </div>
            </div>
            <div />
          </div>
        </div>
        
        <div className="min-h-[360px] flex items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white">
          <div className="flex flex-col items-center gap-3">
            <Spinner 
              label="加载活动数据中..." 
              color="primary" 
              size="lg" 
            />
            <div className="text-sm text-slate-500">首次加载可能需要一点时间</div>
            {debugInfo && (
              <div className="text-xs text-slate-400 mt-2">{debugInfo}</div>
            )}
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
        {debugInfo && (
          <div className="text-xs text-rose-500 bg-rose-100 px-3 py-1 rounded">
            {debugInfo}
          </div>
        )}
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
            <h1 className='text-4xl font-semibold tracking-tight'>校园活动</h1>
            <p className='text-slate-200 mt-2'>Study hard, Play hard!</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-200">
              <span className="rounded-full border border-white/20 px-3 py-1">
                总数 {activities.length}
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1">
                体育活动 {categoryCounts.Sports}
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1">
                艺术活动 {categoryCounts.Arts}
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1">
                当前 {filteredActivities.length}
              </span>
            </div>
            {debugInfo && (
              <div className="mt-2 text-xs text-slate-300">{debugInfo}</div>
            )}
          </div>
          <div />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-3">
          <Button
            variant={!activeCategory ? 'solid' : 'bordered'}
            color={!activeCategory ? 'primary' : 'default'}
            onPress={() => setActiveCategory(null)}
            startContent={<FaFilter className="text-sm" />}
            className='min-w-[110px]'
          >
            全部活动 ({activities.length})
          </Button>
          <Button
            variant={activeCategory === 'Sports' ? 'solid' : 'bordered'}
            color={activeCategory === 'Sports' ? 'primary' : 'default'}
            onPress={() => handleCategoryClick('Sports')}
            className='min-w-[110px]'
          >
            体育活动 ({categoryCounts.Sports})
          </Button>
          <Button
            variant={activeCategory === 'Arts' ? 'solid' : 'bordered'}
            color={activeCategory === 'Arts' ? 'primary' : 'default'}
            onPress={() => handleCategoryClick('Arts')}
            className='min-w-[110px]'
          >
            艺术活动 ({categoryCounts.Arts})
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-gray-800">
            {activeLabel} 
            <span className="text-gray-500 text-lg ml-2">
              ({filteredActivities.length}个)
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
        
        {activities.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-2xl mb-2">😔</div>
            <div className="mb-4">暂无活动数据</div>
            <div className="text-sm text-gray-400 mb-4">
              请检查后端数据库是否有数据，或联系管理员
            </div>
            <Button 
              color="primary" 
              variant="flat"
              onPress={handleRefresh}
            >
              刷新数据
            </Button>
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-2xl mb-2">🔍</div>
            <div className="mb-2">没有找到该分类的活动</div>
            <div className="text-sm text-gray-400 mb-4">尝试选择其他分类或查看全部活动</div>
            <Button 
              color="primary" 
              variant="flat"
              onPress={() => setActiveCategory(null)}
            >
              查看全部活动
            </Button>
          </div>
        ) : (
          <ActivityGrid activities={filteredActivities} />
        )}
      </div>
    </div>
  )
}

export default Page
