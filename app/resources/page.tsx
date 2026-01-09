'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

// 更新后的分类结构
const resourceCategories = [
  // G10 分类
  {
    id: 'g10-math',
    title: 'G10 数学',
    description: '预备微积分等数学资料',
    grade: 'G10',
    subject: '数学',
    icon: '📐',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'g10-physics',
    title: 'G10 物理',
    description: '基础物理、预备AP物理等资料',
    grade: 'G10', 
    subject: '物理',
    icon: '⚡',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'g10-chemistry',
    title: 'G10 化学',
    description: '化学方程式、实验报告等',
    grade: 'G10',
    subject: '化学', 
    icon: '🧪',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'g10-biology',
    title: 'G10 生物',
    description: '生物图鉴、实验方法等',
    grade: 'G10',
    subject: '生物',
    icon: '🧬',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 'g10-english',
    title: 'G10 英语',
    description: '英语、词汇表、预备AP英语等',
    grade: 'G10',
    subject: '英语',
    icon: '📖',
    color: 'from-amber-500 to-amber-600'
  },
  
  // G11 分类 - 数学
  {
    id: 'g11-math-calc',
    title: 'G11 微积分',
    description: '微积分BC、统计等高等数学',
    grade: 'G11',
    subject: '数学',
    icon: '🧮',
    color: 'from-blue-400 to-blue-500'
  },
  
  // G11 分类 - 物理
  {
    id: 'g11-physics-c',
    title: 'G11 物理',
    description: 'AP物理C与物理2等',
    grade: 'G11',
    subject: '物理',
    icon: '⚛️',
    color: 'from-purple-400 to-purple-500'
  },
  
  // G11 分类 - 化学
  {
    id: 'g11-chemistry',
    title: 'G11 化学',
    description: 'AP化学课程资料',
    grade: 'G11',
    subject: '化学',
    icon: '⚗️',
    color: 'from-green-400 to-green-500'
  },
  
  // G11 分类 - 生物
  {
    id: 'g11-biology',
    title: 'G11 生物',
    description: 'AP生物课程资料',
    grade: 'G11',
    subject: '生物',
    icon: '🔬',
    color: 'from-emerald-400 to-emerald-500'
  },
  
  // G11 分类 - 英语
  {
    id: 'g11-english-aplang',
    title: 'G11 英语',
    description: 'AP语言与写作课程、荣誉英语等',
    grade: 'G11',
    subject: '英语',
    icon: '📚',
    color: 'from-amber-400 to-amber-500'
  },
  
  // G11 分类 - 人文社科
  {
    id: 'g11-humanities',
    title: 'G11 人文社科',
    description: '历史、地理、心理学等',
    grade: 'G11',
    subject: '人文社科',
    icon: '🏛️',
    color: 'from-red-500 to-red-600'
  },
  
  // G11 分类 - 计算机科学
  {
    id: 'g11-computer-science',
    title: 'G11 计算机科学',
    description: 'AP计算机科学原理等',
    grade: 'G11',
    subject: '计算机科学',
    icon: '💻',
    color: 'from-indigo-500 to-indigo-600'
  },
  
  // 其他分类
  {
    id: 'g11-other',
    title: '其他课程',
    description: '音乐理论、环境科学等',
    grade: 'G11',
    subject: '其他',
    icon: '🎯',
    color: 'from-gray-500 to-gray-600'
  }
]

// 所有可选的筛选选项
const gradeOptions = ['全部年级', 'G10', 'G11']
const subjectOptions = ['全部学科', '数学', '物理', '化学', '生物', '英语', '人文社科', '计算机科学', '其他']

const Page = () => {
  const [selectedGrade, setSelectedGrade] = useState('全部年级')
  const [selectedSubject, setSelectedSubject] = useState('全部学科')

  // 根据筛选条件过滤分类
  const filteredCategories = useMemo(() => {
    return resourceCategories.filter(category => {
      const gradeMatch = selectedGrade === '全部年级' || category.grade === selectedGrade
      const subjectMatch = selectedSubject === '全部学科' || category.subject === selectedSubject
      return gradeMatch && subjectMatch
    })
  }, [selectedGrade, selectedSubject])

  // 统计信息
  const stats = useMemo(() => {
    const total = resourceCategories.length
    const g10Count = resourceCategories.filter(c => c.grade === 'G10').length
    const g11Count = resourceCategories.filter(c => c.grade === 'G11').length
    
    const subjectCounts: Record<string, number> = {}
    resourceCategories.forEach(cat => {
      subjectCounts[cat.subject] = (subjectCounts[cat.subject] || 0) + 1
    })
    
    return { total, g10Count, g11Count, subjectCounts }
  }, [])

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12'>
      <div className='mb-8 sm:mb-12 text-center'>
        <h1 className='text-3xl sm:text-4xl font-bold text-slate-900 mb-3 sm:mb-4'>
          学习资料库
        </h1>
        <p className='text-base sm:text-lg text-slate-600 max-w-3xl mx-auto px-4'>
          按年级与学科分类，提供G10-G11各科学习资料下载，包含AP课程和荣誉课程
        </p>
      </div>

      {/* 筛选工具栏 */}
      <div className='mb-6 sm:mb-8'>
        {/* 年级筛选 */}
        <div className='mb-4'>
          <h3 className='text-sm font-medium text-slate-700 mb-2'>按年级筛选：</h3>
          <div className='flex flex-wrap gap-2'>
            {gradeOptions.map(grade => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedGrade === grade
                    ? grade === '全部年级'
                      ? 'bg-primary-500 text-white'
                      : grade === 'G10'
                      ? 'bg-blue-500 text-white'
                      : 'bg-purple-500 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {grade}
                {grade !== '全部年级' && (
                  <span className='ml-1 text-xs opacity-90'>
                    ({grade === 'G10' ? stats.g10Count : stats.g11Count})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 学科筛选 */}
        <div className='mb-4'>
          <h3 className='text-sm font-medium text-slate-700 mb-2'>按学科筛选：</h3>
          <div className='flex flex-wrap gap-2'>
            {subjectOptions.map(subject => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedSubject === subject
                    ? subject === '全部学科'
                      ? 'bg-primary-500 text-white'
                      : 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {subject}
                {subject !== '全部学科' && (
                  <span className='ml-1 text-xs opacity-90'>
                    ({stats.subjectCounts[subject] || 0})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 筛选结果统计 */}
        <div className='flex items-center justify-between text-sm text-slate-600 pt-3 border-t border-slate-200'>
          <div>
            找到 <span className='font-semibold text-primary-600'>{filteredCategories.length}</span> 个分类
            {selectedGrade !== '全部年级' && ` • ${selectedGrade}年级`}
            {selectedSubject !== '全部学科' && ` • ${selectedSubject}`}
          </div>
          <button
            onClick={() => {
              setSelectedGrade('全部年级')
              setSelectedSubject('全部学科')
            }}
            className='text-primary-600 hover:text-primary-700 font-medium'
          >
            重置筛选
          </button>
        </div>
      </div>

      {/* 分类网格 */}
      {filteredCategories.length > 0 ? (
        <div className='grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {filteredCategories.map((category) => (
            <Link
              key={category.id}
              href={`/resources/${category.id}`}
              className='group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg'
            >
              {/* 顶部颜色条 */}
              <div className={`h-1.5 sm:h-2 bg-gradient-to-r ${category.color}`}></div>
              
              <div className='p-4 sm:p-6'>
                {/* 图标和年级 */}
                <div className='flex items-center justify-between mb-3 sm:mb-4'>
                  <div className='text-2xl sm:text-3xl'>{category.icon}</div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    category.grade === 'G10' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {category.grade}
                  </span>
                </div>
                
                {/* 标题 */}
                <h2 className='text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors'>
                  {category.title}
                </h2>
                
                {/* 描述 */}
                <p className='text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4 line-clamp-2'>
                  {category.description}
                </p>
                
                {/* 学科标签 */}
                <div className='mb-3'>
                  <span className='inline-block px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded'>
                    {category.subject}
                  </span>
                </div>
                
                {/* 底部链接 */}
                <div className='flex items-center justify-between pt-3 border-t border-slate-100'>
                  <span className='text-sm font-medium text-primary-600 group-hover:text-primary-700 transition-colors'>
                    查看资料
                  </span>
                  <span className='text-slate-400 group-hover:text-primary-500 transition-colors'>
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className='text-center py-12 sm:py-16'>
          <div className='text-4xl sm:text-5xl mb-4'>🔍</div>
          <h3 className='text-lg sm:text-xl font-semibold text-slate-900 mb-2'>
            未找到匹配的分类
          </h3>
          <p className='text-slate-600 mb-4 max-w-md mx-auto'>
            当前筛选条件下没有找到匹配的学习资料分类
          </p>
          <button
            onClick={() => {
              setSelectedGrade('全部年级')
              setSelectedSubject('全部学科')
            }}
            className='px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600'
          >
            查看所有分类
          </button>
        </div>
      )}

      {/* 底部统计信息 */}
      <div className='mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-slate-200'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <div className='bg-slate-50 p-4 rounded-lg'>
            <div className='text-2xl font-bold text-slate-900 mb-1'>{stats.total}</div>
            <div className='text-sm text-slate-600'>总分类数量</div>
          </div>
          <div className='bg-blue-50 p-4 rounded-lg'>
            <div className='text-2xl font-bold text-blue-700 mb-1'>{stats.g10Count}</div>
            <div className='text-sm text-blue-600'>G10 分类</div>
          </div>
          <div className='bg-purple-50 p-4 rounded-lg'>
            <div className='text-2xl font-bold text-purple-700 mb-1'>{stats.g11Count}</div>
            <div className='text-sm text-purple-600'>G11 分类</div>
          </div>
          <div className='bg-emerald-50 p-4 rounded-lg'>
            <div className='text-2xl font-bold text-emerald-700 mb-1'>{subjectOptions.length - 1}</div>
            <div className='text-sm text-emerald-600'>学科类别</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page