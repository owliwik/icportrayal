import Link from 'next/link'
import { newsItems } from '@/lib/mock-data'

const Page = () => {
  return (
    <div className='w-full'>
      <section className='max-w-6xl mx-auto px-6 py-12'>
        <div className='rounded-3xl bg-white shadow-sm border border-slate-100 px-8 py-12'>
          <p className='text-sm uppercase tracking-[0.2em] text-slate-400'>
            Welcome
          </p>
          <h1 className='mt-4 text-3xl md:text-4xl font-semibold text-slate-900'>
            欢迎来到 BHSF IC 学生官方网站
          </h1>
          <p className='mt-3 text-lg text-slate-500'>学生官方平台</p>
          <div className='mt-6 flex gap-3'>
            <Link
              href='/resources'
              className='rounded-full bg-primary-500 px-5 py-2 text-white text-sm font-medium'
            >
              浏览资源
            </Link>
            <Link
              href='/activities'
              className='rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600'
            >
              校园活动
            </Link>
          </div>
        </div>
      </section>

      <section className='max-w-6xl mx-auto px-6 pb-16'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-semibold text-slate-900'>NEWS</h2>
          <span className='text-sm text-slate-400'>
            最新动态与公告
          </span>
        </div>
        <div className='space-y-4'>
          {newsItems.map((item) => (
            <Link
              key={item.slug}
              href={`/news/${item.slug}`}
              className='block rounded-2xl bg-white border border-slate-100 p-5 shadow-sm transition hover:border-primary-200'
            >
              <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-2'>
                <div>
                  <h3 className='text-lg font-semibold text-slate-900'>
                    {item.title}
                  </h3>
                  <p className='mt-1 text-sm text-slate-500'>
                    {item.summary}
                  </p>
                </div>
                <span className='text-xs text-slate-400'>{item.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Page
