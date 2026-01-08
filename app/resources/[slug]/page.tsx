'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { 
  DownloadIcon, 
  CalendarIcon, 
  UserIcon, 
  ClockIcon,
  FileIcon,
  AlertCircleIcon,
  CalculatorIcon,
  AtomIcon,
  BeakerIcon,
  DnaIcon,
  BookTextIcon,
  ChevronRightIcon,
  BarChartIcon,
  GlobeIcon,      // 用于人文社科
  MusicIcon,      // 用于音乐和其他
  CpuIcon,        // 用于计算机科学
  BrainIcon,      // 用于心理学
  LeafIcon,       // 用于环境科学
  MapIcon,        // 用于地理
  HistoryIcon,     // 用于历史
  Calculator
} from 'lucide-react'

// 更新分类配置 - 化学和生物分开
// 在详情页中更新 RESOURCE_CATEGORIES 配置
const RESOURCE_CATEGORIES = [
  // G10 分类
  {
    id: 'g10-math',
    title: 'G10 数学资料',
    description: 'G10预备微积分等数学学习资料',
    grade: 'G10',
    subject: '数学',
    db_categories: ['G10 Precal'],
    color: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', gradient: 'from-blue-500 to-blue-600' }
  },
  {
    id: 'g10-physics',
    title: 'G10 物理资料',
    description: 'G10基础物理、预备AP物理等物理学习资料',
    grade: 'G10',
    subject: '物理',
    db_categories: ['G10 Physics', 'G10 preap physics'],
    color: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', gradient: 'from-purple-500 to-purple-600' }
  },
  {
    id: 'g10-chemistry',
    title: 'G10 化学资料',
    description: 'G10化学方程式、实验报告、元素周期表等化学学习资料',
    grade: 'G10',
    subject: '化学',
    db_categories: ['G10 Chemistry'],
    color: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', gradient: 'from-green-500 to-green-600' }
  },
  {
    id: 'g10-biology',
    title: 'G10 生物资料',
    description: 'G10生物图鉴、实验方法、考点总结等生物学习资料',
    grade: 'G10',
    subject: '生物',
    db_categories: ['G10 Biology'],
    color: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', gradient: 'from-emerald-500 to-emerald-600' }
  },
  {
    id: 'g10-english',
    title: 'G10 英语资料',
    description: 'G10英语、词汇表、预备AP英语等学习资料',
    grade: 'G10',
    subject: '英语',
    db_categories: ['G10 preap english', 'G10 wordlist'],
    color: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', gradient: 'from-amber-500 to-amber-600' }
  },
  
  // G11 分类
  {
    id: 'g11-math-calc',
    title: 'G11 微积分资料',
    description: 'G11微积分BC、统计等高等数学学习资料',
    grade: 'G11',
    subject: '数学',
    db_categories: ['G11 Calculus BC', 'G11 Statistics'],
    color: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300', gradient: 'from-blue-400 to-blue-500' }
  },
  {
    id: 'g11-physics',
    title: 'G11 物理资料',
    description: 'G11物理C、物理2等AP物理课程学习资料',
    grade: 'G11',
    subject: '物理',
    db_categories: ['G11 Physics C', 'G11 Physics 2'],
    color: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300', gradient: 'from-purple-400 to-purple-500' }
  },
  {
    id: 'g11-science',
    title: 'G11 科学资料',
    description: 'G11化学、生物、环境科学等AP科学课程学习资料',
    grade: 'G11',
    subject: '科学',
    db_categories: ['G11 Chemistry', 'G11 Biology', 'G11 APES'],
    color: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300', gradient: 'from-green-400 to-green-500' }
  },
  {
    id: 'g11-english',
    title: 'G11 英语资料',
    description: 'G11 AP语言、荣誉英语等人文课程学习资料',
    grade: 'G11',
    subject: '英语',
    db_categories: ['G11 APLang', 'G11 Honors English'],
    color: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300', gradient: 'from-amber-400 to-amber-500' }
  },
  {
    id: 'g11-humanities',
    title: 'G11 人文社科资料',
    description: 'G11 AP历史、地理、心理学等社科课程学习资料',
    grade: 'G11',
    subject: '人文社科',
    db_categories: ['G11 HG', 'G11 APUSH', 'G11 Micro', 'G11 Psyco'],
    color: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', gradient: 'from-red-500 to-red-600' }
  },
  {
    id: 'g11-other',
    title: 'G11 其他课程资料',
    description: 'G11音乐理论、计算机科学等其他学科学习资料',
    grade: 'G11',
    subject: '其他',
    db_categories: ['G11 Music Theory', 'APCSP'],
    color: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', gradient: 'from-indigo-500 to-indigo-600' }
  }
]

// 更新 getCategoryIcon 函数
const getCategoryIcon = (subject: string) => {
  switch (subject) {
    case '数学': return CalculatorIcon
    case '物理': return AtomIcon
    case '化学': return BeakerIcon
    case '生物': return DnaIcon
    case '英语': return BookTextIcon
    case '科学': return BeakerIcon
    case '人文社科': return GlobeIcon  // 需要导入
    case '其他': return MusicIcon      // 需要导入
    default: return CalculatorIcon
  }
}

// 更新 getCategoryColor 函数
const getCategoryColor = (subject: string) => {
  switch (subject) {
    case '数学': return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' }
    case '物理': return { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' }
    case '化学': return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' }
    case '生物': return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' }
    case '英语': return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' }
    case '科学': return { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' }
    case '人文社科': return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' }
    case '其他': return { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' }
    default: return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' }
  }
}

// 获取文件类型颜色
const getFileTypeColor = (fileType: string) => {
  switch (fileType) {
    case 'PDF': return 'bg-red-100 text-red-700 border-red-200'
    case 'Word': return 'bg-blue-100 text-blue-700 border-blue-200'
    case 'PPT': return 'bg-orange-100 text-orange-700 border-orange-200'
    case 'Excel': return 'bg-green-100 text-green-700 border-green-200'
    case '图片': return 'bg-purple-100 text-purple-700 border-purple-200'
    default: return 'bg-slate-100 text-slate-700 border-slate-200'
  }
}

const Page = ({ params }: { params: { slug: string } }) => {
  const [resources, setResources] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const category = RESOURCE_CATEGORIES.find((item) => item.id === params.slug)

  useEffect(() => {
    if (category) {
      fetchResources()
    }
  }, [category])

  if (!category) {
    notFound()
  }

  const fetchResources = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error: queryError } = await supabase
        .from('studyguide')
        .select('*')
        .in('category', category.db_categories)
        .order('created_at', { ascending: false })

      if (queryError) throw queryError

      const processedData = (data || []).map(resource => {
        const filename = resource.storage_path?.split('/').pop() || ''
        const extension = filename.split('.').pop()?.toLowerCase() || ''
        
        let fileType = '文件'
        if (['pdf'].includes(extension)) fileType = 'PDF'
        else if (['doc', 'docx'].includes(extension)) fileType = 'Word'
        else if (['ppt', 'pptx'].includes(extension)) fileType = 'PPT'
        else if (['xls', 'xlsx'].includes(extension)) fileType = 'Excel'
        else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) fileType = '图片'
        
        return {
          ...resource,
          file_type: fileType,
          short_desc: filename.replace(/\.[^/.]+$/, '').substring(0, 30)
        }
      })

      setResources(processedData)
    } catch (err: any) {
      console.error('获取资源失败:', err)
      setError(err.message || '获取资源失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (resource: any) => {
    try {
      const storagePath = resource.storage_path
      const cleanPath = storagePath.startsWith('/') ? storagePath.slice(1) : storagePath
      const directUrl = `https://fxehqztapwouuyvpafce.supabase.co/storage/v1/object/public/${cleanPath}`
      
      const testResponse = await fetch(directUrl, { method: 'HEAD' })
      if (!testResponse.ok) throw new Error('文件不可访问')
      
      const link = document.createElement('a')
      link.href = directUrl
      link.download = cleanPath.split('/').pop() || 'download'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      await updateDownloadCount(resource.id)
      
    } catch (err: any) {
      console.error('下载失败:', err)
      alert(`下载失败: ${err.message}`)
    }
  }

  const updateDownloadCount = async (resourceId: number) => {
    try {
      const { data: currentData } = await supabase
        .from('studyguide')
        .select('download_count')
        .eq('id', resourceId)
        .single()

      const currentCount = currentData?.download_count || 0
      await supabase
        .from('studyguide')
        .update({ download_count: currentCount + 1 })
        .eq('id', resourceId)
    } catch (err) {
      console.error('更新下载计数失败:', err)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('zh-CN')
    } catch {
      return '未知日期'
    }
  }

  const CategoryIcon = getCategoryIcon(category.subject)

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      {/* 面包屑导航 */}
      <nav className='flex items-center text-sm text-slate-500 mb-6'>
        <Link href='/' className='hover:text-slate-700'>首页</Link>
        <ChevronRightIcon className='w-4 h-4 mx-2' />
        <Link href='/resources' className='hover:text-slate-700'>学习资源</Link>
        <ChevronRightIcon className='w-4 h-4 mx-2' />
        <span className='text-slate-700 font-medium'>{category.title}</span>
      </nav>

      {/* 分类标题区域 */}
      <div className={`rounded-2xl p-8 mb-8 border-2 ${category.color.bg} ${category.color.border} relative overflow-hidden`}>
        {/* 背景渐变 */}
        <div className={`absolute inset-0 bg-gradient-to-r ${category.color.gradient} opacity-5`}></div>
        
        <div className='relative flex flex-col items-center text-center'>
          <div className={`p-4 rounded-2xl bg-white mb-6 shadow-sm border ${category.color.border}`}>
            <CategoryIcon className='w-12 h-12' />
          </div>
          
          {/* 年级和学科标签 */}
          <div className='flex flex-wrap justify-center gap-3 mb-6'>
            <span className='px-4 py-2 bg-white text-lg font-semibold rounded-full shadow-sm border border-slate-200'>
              {category.grade}
            </span>
            <span className={`px-4 py-2 ${category.color.text} text-lg font-semibold rounded-full bg-white shadow-sm border ${category.color.border}`}>
              {category.subject}
            </span>
          </div>
          
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            {category.title}
          </h1>
          <p className='text-xl text-gray-700 max-w-2xl'>
            {category.description}
          </p>
        </div>
      </div>

      {/* 统计信息卡片 */}
      {!loading && !error && resources.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
          <div className={`p-6 rounded-xl border ${category.color.border} shadow-sm text-center ${category.color.bg}`}>
            <div className='flex items-center justify-center gap-3 mb-4'>
              <FileIcon className={`w-6 h-6 ${category.color.text}`} />
              <div className='text-3xl font-bold text-gray-900'>
                {resources.length}
              </div>
            </div>
            <div className='text-sm font-medium text-gray-700'>学习资料</div>
          </div>
          
          <div className={`p-6 rounded-xl border ${category.color.border} shadow-sm text-center ${category.color.bg}`}>
            <div className='flex items-center justify-center gap-3 mb-4'>
              <BarChartIcon className={`w-6 h-6 ${category.color.text}`} />
              <div className='text-3xl font-bold text-gray-900'>
                {new Set(resources.map(r => r.category)).size}
              </div>
            </div>
            <div className='text-sm font-medium text-gray-700'>细分科目</div>
          </div>
          
          <div className={`p-6 rounded-xl border ${category.color.border} shadow-sm text-center ${category.color.bg}`}>
            <div className='flex items-center justify-center gap-3 mb-4'>
              <DownloadIcon className={`w-6 h-6 ${category.color.text}`} />
              <div className='text-3xl font-bold text-gray-900'>
                {resources.reduce((sum, r) => sum + (r.download_count || 0), 0)}
              </div>
            </div>
            <div className='text-sm font-medium text-gray-700'>总下载次数</div>
          </div>
        </div>
      )}

      {/* 主要内容区域 */}
      <div className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
        <div className='p-6 border-b border-slate-100'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
            <h2 className='text-xl font-semibold text-slate-900'>
              学习资料列表
              {!loading && resources.length > 0 && (
                <span className='ml-2 text-sm font-normal text-slate-500'>
                  ({resources.length}份)
                </span>
              )}
            </h2>
            
            {/* 科目类型标签 */}
            {category.db_categories.length > 0 && (
              <div className='flex flex-wrap gap-2'>
                {category.db_categories.map((dbCategory, index) => (
                  <span
                    key={index}
                    className='px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full border border-slate-200'
                  >
                    {dbCategory}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className='p-6'>
          {/* 加载状态 */}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
              <span className="ml-4 text-slate-600">正在加载资源...</span>
            </div>
          )}

          {/* 错误状态 */}
          {error && !loading && (
            <div className="text-center py-12">
              <AlertCircleIcon className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">加载失败</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={fetchResources}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                重试
              </button>
            </div>
          )}

          {/* 空状态 */}
          {!loading && !error && resources.length === 0 && (
            <div className="text-center py-12">
              <FileIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无资料</h3>
              <p className="text-gray-600 mb-4">当前分类下还没有上传学习资料</p>
              <p className="text-sm text-slate-500">
                包含的科目类型：{category.db_categories.join(', ')}
              </p>
            </div>
          )}

          {/* 资料列表 */}
          {!loading && !error && resources.length > 0 && (
            <div className='space-y-4'>
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className={`group rounded-xl border border-slate-200 p-6 hover:border-primary-300 hover:shadow-lg transition-all duration-300`}
                >
                  <div className='flex flex-col lg:flex-row lg:items-center gap-6'>
                    {/* 左侧：主要信息 */}
                    <div className='flex-1'>
                      <div className='flex flex-col lg:flex-row lg:items-start gap-4'>
                        {/* 文件类型标签 */}
                        <div className='flex-shrink-0'>
                          <span className={`px-4 py-2 ${getFileTypeColor(resource.file_type)} text-sm font-medium rounded-full border inline-block`}>
                            {resource.file_type}
                          </span>
                        </div>
                        
                        {/* 详细内容 */}
                        <div className='flex-1'>
                          {/* 分类和科目信息 */}
                          <div className='mb-3'>
                            <div className='text-lg font-semibold text-slate-900 mb-1'>
                              {resource.category}
                            </div>
                            
                            {/* 完成时间 */}
                            {resource.time && (
                              <div className='flex items-center gap-2 text-sm text-slate-600'>
                                <ClockIcon className="w-4 h-4" />
                                <span>完成时间: <span className='font-medium'>{resource.time}</span></span>
                              </div>
                            )}
                          </div>
                          
                          {/* 元数据 */}
                          <div className='flex flex-wrap items-center gap-4 text-sm text-slate-500'>
                            {resource.author && (
                              <div className='flex items-center gap-1'>
                                <UserIcon className="w-4 h-4" />
                                <span>{resource.author}</span>
                              </div>
                            )}
                            <div className='flex items-center gap-1'>
                              <CalendarIcon className="w-4 h-4" />
                              <span>{formatDate(resource.created_at)}</span>
                            </div>
                            {resource.download_count > 0 && (
                              <div className='flex items-center gap-1 text-amber-600'>
                                <DownloadIcon className="w-4 h-4" />
                                <span>{resource.download_count}次下载</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 右侧：下载按钮 */}
                    <div className='lg:w-48 flex-shrink-0'>
                      <button
                        onClick={() => handleDownload(resource)}
                        className={`w-full px-6 py-3 ${category.color.bg} ${category.color.text} font-medium rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 group/download border ${category.color.border}`}
                      >
                        <DownloadIcon className="w-4 h-4" />
                        下载资料
                      </button>
                      
                      {/* 文件格式提示 */}
                      <div className='mt-2 text-center text-xs text-slate-500'>
                        {resource.storage_path?.split('/').pop()?.split('.').pop()?.toUpperCase()} 格式
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 底部统计 */}
        {!loading && !error && resources.length > 0 && (
          <div className='p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl'>
            <div className='flex flex-col md:flex-row justify-between items-center'>
              <div className='text-sm text-slate-600 mb-2 md:mb-0'>
                共 {resources.length} 份学习资料 • 包含 {category.db_categories.length} 个科目类型
              </div>
              <div className='text-sm text-slate-500'>
                <span className='font-medium'>{category.grade} {category.subject}</span> 分类
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 返回按钮 */}
      <div className='mt-8 text-center'>
        <Link
          href='/resources'
          className='inline-flex items-center px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors'
        >
          ← 返回所有分类
        </Link>
      </div>
    </div>
  )
}

export default Page