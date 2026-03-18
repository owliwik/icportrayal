'use client'

import { useState, useEffect, useMemo } from 'react'
import { Button } from '@nextui-org/button'
import { Activity, ActivityCategory, mockActivities } from '@/lib/types/activity'
import { ActivityGrid } from './ActivityGrid'
import { Spinner } from '@nextui-org/spinner'
import { FaFilter, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'

const categories: ActivityCategory[] = ['Sports', 'Arts']

const Page = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<ActivityCategory | null>(null)
  const [error, setError] = useState<string | null>(null)

  // 模拟获取数据
  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true)
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        setActivities(mockActivities)
      } catch (err) {
        setError('获取活动数据失败')
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  const filteredActivities = useMemo(() => {
    if (!activeCategory) return activities
    return activities.filter(a => a.category === activeCategory)
  }, [activeCategory, activities])

  const categoryCounts = useMemo(() => {
    return {
      Sports: activities.filter(a => a.category === 'Sports').length,
      Arts: activities.filter(a => a.category === 'Arts').length
    }
  }, [activities])

  const activeLabel = activeCategory || '全部活动'

  if (loading) {
    return (
      <div className='max-w-7xl mx-auto px-6 py-12'>
        <div className="mb-8">
          <h1 className='text-3xl font-semibold text-slate-900'>
            Our Activities · 我们的活动
          </h1>
          <p className='mt-2 text-slate-500'>Study hard, Play hard!</p>
        </div>
        
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Spinner label="加载活动中..." color="primary" size="lg" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='max-w-7xl mx-auto px-6 py-12'>
        <div className="min-h-[400px] flex flex-col items-center justify-center bg-white rounded-2xl border border-rose-100 p-8">
          <div className="text-4xl mb-4">😢</div>
          <h2 className="text-xl font-semibold text-rose-600 mb-2">{error}</h2>
          <Button 
            color="primary" 
            onPress={() => window.location.reload()}
          >
            重试
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto px-6 py-12'>
      {/* 头部区域 */}
      <div className="mb-8">
        <h1 className='text-3xl font-semibold text-slate-900'>
          Our Activities · 我们的活动
        </h1>
        <p className='mt-2 text-slate-500'>Study hard, Play hard!</p>
        
        {/* 统计信息 */}
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
            总数 {activities.length}
          </span>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
            体育 {categoryCounts.Sports}
          </span>
          <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">
            艺术 {categoryCounts.Arts}
          </span>
        </div>
      </div>

      {/* 分类筛选 */}
      <div className='mb-8 flex flex-wrap gap-3'>
        <Button
          variant={!activeCategory ? 'solid' : 'bordered'}
          color={!activeCategory ? 'primary' : 'default'}
          onPress={() => setActiveCategory(null)}
          startContent={<FaFilter className="text-sm" />}
        >
          全部 ({activities.length})
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? 'solid' : 'bordered'}
            color={activeCategory === category ? 'primary' : 'default'}
            onPress={() => setActiveCategory(
              activeCategory === category ? null : category
            )}
          >
            {category} ({categoryCounts[category]})
          </Button>
        ))}
      </div>

      {/* 活动列表 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            {activeLabel}
            <span className="text-gray-500 text-lg ml-2">
              ({filteredActivities.length}个活动)
            </span>
          </h2>
          
          {activeCategory && (
            <Button
              size="sm"
              variant="flat"
              onPress={() => setActiveCategory(null)}
            >
              清除筛选
            </Button>
          )}
        </div>

        <ActivityGrid activities={filteredActivities} />
      </div>

      {/* 活动统计卡片 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500 rounded-lg text-white">
              <FaCalendarAlt />
            </div>
            <h3 className="font-semibold text-gray-800">近期活动</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600">
            {activities.filter(a => new Date(a.date) > new Date()).length}
          </p>
          <p className="text-sm text-gray-600 mt-1">即将举办的活动</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-500 rounded-lg text-white">
              <FaMapMarkerAlt />
            </div>
            <h3 className="font-semibold text-gray-800">活动地点</h3>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            {new Set(activities.map(a => a.location)).size}
          </p>
          <p className="text-sm text-gray-600 mt-1">不同的活动场地</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="font-semibold text-gray-800">总参与人数</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {activities.reduce((sum, a) => sum + (a.participants || 0), 0)}
          </p>
          <p className="text-sm text-gray-600 mt-1">累计参与活动</p>
        </div>
      </div>
    </div>
  )
}

export default Page