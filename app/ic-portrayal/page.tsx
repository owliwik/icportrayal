const highlights = [
  {
    title: '学生主导',
    description: '由学生团队策划内容与活动，记录校园日常。',
  },
  {
    title: '视觉档案',
    description: '整合摄影、设计与作品集，打造专属画廊。',
  },
  {
    title: '连接社区',
    description: '连接校内外资源，形成持续更新的平台。',
  },
]

const Page = () => {
  return (
    <div className='max-w-5xl mx-auto px-6 py-12'>
      <div className='rounded-3xl bg-white border border-slate-100 p-8 shadow-sm'>
        <h1 className='text-3xl font-semibold text-slate-900'>IC Portrayal</h1>
        <p className='mt-3 text-slate-500 leading-relaxed'>
          这是一个由学生主导的校园内容平台，聚焦活动、作品与学习资源，
          让每一次创造与分享都被记录。
        </p>
      </div>

      <div className='mt-8 grid gap-6 md:grid-cols-3'>
        {highlights.map((item) => (
          <div
            key={item.title}
            className='rounded-2xl bg-white border border-slate-100 p-6 shadow-sm'
          >
            <h2 className='text-lg font-semibold text-slate-900'>
              {item.title}
            </h2>
            <p className='mt-2 text-sm text-slate-500'>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
