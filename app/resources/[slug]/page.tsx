import Link from 'next/link'
import { notFound } from 'next/navigation'
import { resourceCategories } from '@/lib/mock-data'

const Page = ({ params }: { params: { slug: string } }) => {
  const category = resourceCategories.find((item) => item.id === params.slug)

  if (!category) {
    notFound()
  }

  return (
    <div className='max-w-5xl mx-auto px-6 py-12'>
      <Link href='/resources' className='text-sm text-slate-500 hover:text-slate-700'>
        ← 返回分类
      </Link>
      <h1 className='mt-4 text-3xl font-semibold text-slate-900'>
        {category.title}
      </h1>
      <p className='mt-2 text-slate-500'>{category.description}</p>

      <div className='mt-8 rounded-2xl bg-white border border-slate-100 p-6 shadow-sm'>
        <h2 className='text-lg font-semibold text-slate-900'>资源列表</h2>
        <div className='mt-4 space-y-3'>
          {category.resources.map((resource) => (
            <div
              key={resource.title}
              className='flex flex-col md:flex-row md:items-center md:justify-between gap-2 rounded-xl border border-slate-100 px-4 py-3'
            >
              <span className='text-slate-700'>{resource.title}</span>
              <a
                href={resource.path}
                download
                className='text-sm text-primary-500 hover:text-primary-600'
              >
                点击下载
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page
