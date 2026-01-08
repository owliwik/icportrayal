import Link from 'next/link'

// 更新后的分类结构
const resourceCategories = [
  // G10 分类
  {
    id: 'g10-math',
    title: 'G10 数学',
    description: '预备微积分、代数、几何等数学资料',
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
    description: '化学方程式、实验报告、元素周期表等',
    grade: 'G10',
    subject: '化学', 
    icon: '🧪',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'g10-biology',
    title: 'G10 生物',
    description: '生物图鉴、实验方法、考点总结等',
    grade: 'G10',
    subject: '生物',
    icon: '🧬',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 'g10-english',
    title: 'G10 英语',
    description: '英语、词汇表、预备AP英语等资料',
    grade: 'G10',
    subject: '英语',
    icon: '📖',
    color: 'from-amber-500 to-amber-600'
  },
  
  // G11 分类 - 数学和科学
  {
    id: 'g11-math-calc',
    title: 'G11 数学',
    description: '微积分BC、统计等高等数学资料',
    grade: 'G11',
    subject: '数学',
    icon: '🧮',
    color: 'from-blue-400 to-blue-500'
  },
  {
    id: 'g11-physics',
    title: 'G11 物理',
    description: '物理C、物理2等AP物理课程资料',
    grade: 'G11',
    subject: '物理',
    icon: '⚛️',
    color: 'from-purple-400 to-purple-500'
  },
  {
    id: 'g11-science',
    title: 'G11 科学',
    description: '化学、生物、环境科学等AP科学课程',
    grade: 'G11',
    subject: '科学',
    icon: '🔬',
    color: 'from-green-400 to-green-500'
  },
  
  // G11 分类 - 人文社科
  {
    id: 'g11-english',
    title: 'G11 英语',
    description: 'AP语言、荣誉英语等人文课程资料',
    grade: 'G11',
    subject: '英语',
    icon: '📚',
    color: 'from-amber-400 to-amber-500'
  },
  {
    id: 'g11-humanities',
    title: 'G11 人文社科',
    description: 'AP历史、地理、心理学等社科资料',
    grade: 'G11',
    subject: '人文社科',
    icon: '🏛️',
    color: 'from-red-500 to-red-600'
  },
  
  // 其他分类
  {
    id: 'g11-other',
    title: '其他课程',
    description: '音乐理论、计算机科学等其他学科资料',
    grade: 'G11',
    subject: '其他',
    icon: '🎯',
    color: 'from-indigo-500 to-indigo-600'
  }
]

const Page = () => {
  return (
    <div className='max-w-7xl mx-auto px-6 py-12'>
      <div className='mb-12 text-center'>
        <h1 className='text-4xl font-bold text-slate-900 mb-4'>
          学习资料库
        </h1>
        <p className='text-lg text-slate-600 max-w-3xl mx-auto'>
          按年级与学科分类，提供G10-G11各科学习资料下载，包含AP课程和荣誉课程
        </p>
      </div>

      {/* 年级筛选 */}
      <div className='mb-8'>
        <div className='flex flex-wrap justify-center gap-3 mb-6'>
          <button className='px-4 py-2 bg-primary-100 text-primary-700 rounded-full font-medium'>
            全部年级
          </button>
          <button className='px-4 py-2 bg-slate-100 text-slate-700 rounded-full font-medium hover:bg-slate-200'>
            G10
          </button>
          <button className='px-4 py-2 bg-slate-100 text-slate-700 rounded-full font-medium hover:bg-slate-200'>
            G11
          </button>
        </div>
        
        {/* 学科统计 */}
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-10'>
          {['数学', '物理', '化学', '生物', '英语', '人文社科', '科学', '其他'].map((subject) => {
            const count = resourceCategories.filter(cat => cat.subject === subject).length
            if (count === 0) return null
            return (
              <div key={subject} className='bg-white p-3 rounded-lg border border-slate-200 text-center shadow-sm'>
                <div className='text-lg font-semibold text-slate-900'>{subject}</div>
                <div className='text-xs text-slate-500'>{count}个分类</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 分类网格 */}
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {resourceCategories.map((category) => (
          <Link
            key={category.id}
            href={`/resources/${category.id}`}
            className='group relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl'
          >
            {/* 顶部颜色条 */}
            <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
            
            <div className='p-6'>
              {/* 图标和年级 */}
              <div className='flex items-center justify-between mb-4'>
                <div className='text-3xl'>{category.icon}</div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  category.grade === 'G10' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                }`}>
                  {category.grade}
                </span>
              </div>
              
              {/* 标题 */}
              <h2 className='text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors'>
                {category.title}
              </h2>
              
              {/* 描述 */}
              <p className='text-sm text-slate-600 mb-4 line-clamp-2'>
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

      {/* 底部信息 */}
      <div className='mt-16 pt-8 border-t border-slate-200'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          <div>
            <h3 className='text-lg font-semibold text-slate-900 mb-3'>年级分布</h3>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='w-3 h-3 bg-blue-500 rounded'></div>
                  <span className='text-slate-600'>G10 年级</span>
                </div>
                <span className='font-medium'>{resourceCategories.filter(c => c.grade === 'G10').length}个学科</span>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='w-3 h-3 bg-purple-500 rounded'></div>
                  <span className='text-slate-600'>G11 年级</span>
                </div>
                <span className='font-medium'>{resourceCategories.filter(c => c.grade === 'G11').length}个学科</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className='text-lg font-semibold text-slate-900 mb-3'>学科概览</h3>
            <div className='flex flex-wrap gap-2'>
              {Array.from(new Set(resourceCategories.map(c => c.subject))).map(subject => {
                const count = resourceCategories.filter(c => c.subject === subject).length
                return (
                  <span key={subject} className='px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm'>
                    {subject} ({count})
                  </span>
                )
              })}
            </div>
          </div>
          
          <div>
            <h3 className='text-lg font-semibold text-slate-900 mb-3'>课程类型</h3>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                <span className='text-slate-600'>基础课程</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
                <span className='text-slate-600'>荣誉课程</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                <span className='text-slate-600'>AP课程</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page