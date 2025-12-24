import Link from 'next/link'
import { resourceCategories } from '@/lib/mock-data'

const Page = () => {
  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
      <div className='mb-10'>
        <h1 className='text-3xl font-semibold text-slate-900'>学习资源</h1>
        <p className='mt-2 text-slate-500'>
          按年级与学科分类，点击进入详情页。
        </p>
      </div>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {resourceCategories.map((category) => (
          <Link
            key={category.id}
            href={`/resources/${category.id}`}
            className='rounded-2xl bg-white border border-slate-100 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md'
          >
            <p className='text-xs uppercase tracking-[0.2em] text-slate-400'>
              {category.id.split('-')[0].toUpperCase()}
            </p>
            <h2 className='mt-3 text-xl font-semibold text-slate-900'>
              {category.title}
            </h2>
            <p className='mt-2 text-sm text-slate-500'>
              {category.description}
            </p>
            <span className='mt-4 inline-block text-sm text-primary-500'>
              查看资源 →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Page
