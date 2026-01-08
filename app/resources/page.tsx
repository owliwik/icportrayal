import Link from 'next/link'

// 更新后的分类结构，将化学和生物分开
const resourceCategories = [
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
    id: 'g11-math', 
    title: 'G11 数学',
    description: '微积分（CalBC）等高等数学资料',
    grade: 'G11',
    subject: '数学',
    icon: '📊',
    color: 'from-blue-400 to-blue-500'
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
  }
]

const Page = () => {
  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
      <div className='mb-12 text-center'>
        <h1 className='text-4xl font-bold text-slate-900 mb-4'>
          学习资料库
        </h1>
        <p className='text-lg text-slate-600 max-w-2xl mx-auto'>
          按年级与学科分类，提供G10-G11各科学习资料下载
        </p>
      </div>

      {/* 年级筛选标签 */}
      <div className='mb-8 flex flex-wrap justify-center gap-3'>
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
      <div className='mb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
        {['数学', '物理', '化学', '生物', '英语'].map((subject) => {
          const count = resourceCategories.filter(cat => cat.subject === subject).length
          return (
            <div key={subject} className='bg-white p-4 rounded-xl border border-slate-200 text-center'>
              <div className='text-2xl font-bold text-slate-900'>{subject}</div>
              <div className='text-sm text-slate-500'>{count}个分类</div>
            </div>
          )
        })}
        <div className='bg-white p-4 rounded-xl border border-slate-200 text-center'>
          <div className='text-2xl font-bold text-slate-900'>合计</div>
          <div className='text-sm text-slate-500'>{resourceCategories.length}个分类</div>
        </div>
      </div>

      {/* 分类网格 */}
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {resourceCategories.map((category) => (
          <Link
            key={category.id}
            href={`/resources/${category.id}`}
            className='group relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl'
          >
            {/* 顶部颜色条 */}
            <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
            
            <div className='p-8'>
              {/* 图标和年级 */}
              <div className='flex items-center justify-between mb-6'>
                <div className='text-4xl'>{category.icon}</div>
                <span className='px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full'>
                  {category.grade}
                </span>
              </div>
              
              {/* 标题 */}
              <h2 className='text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors'>
                {category.title}
              </h2>
              
              {/* 描述 */}
              <p className='text-sm text-slate-600 mb-6'>
                {category.description}
              </p>
              
              {/* 学科标签 */}
              <div className='mb-4'>
                <span className='inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full'>
                  {category.subject}
                </span>
              </div>
              
              {/* 底部链接 */}
              <div className='flex items-center justify-between pt-4 border-t border-slate-100'>
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
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <h3 className='text-lg font-semibold text-slate-900 mb-3'>年级分布</h3>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-slate-600'>G10 年级</span>
                <span className='font-medium'>{resourceCategories.filter(c => c.grade === 'G10').length}个学科</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-slate-600'>G11 年级</span>
                <span className='font-medium'>{resourceCategories.filter(c => c.grade === 'G11').length}个学科</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className='text-lg font-semibold text-slate-900 mb-3'>学科分类</h3>
            <div className='flex flex-wrap gap-2'>
              {Array.from(new Set(resourceCategories.map(c => c.subject))).map(subject => (
                <span key={subject} className='px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm'>
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page