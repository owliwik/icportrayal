import Link from 'next/link'
import { notFound } from 'next/navigation'
import { newsItems } from '@/lib/mock-data'

const Page = ({ params }: { params: { slug: string } }) => {
  const item = newsItems.find((news) => news.slug === params.slug)

  if (!item) {
    notFound()
  }

  return (
    <div className='max-w-4xl mx-auto px-6 py-12'>
      <Link href='/home' className='text-sm text-slate-500 hover:text-slate-700'>
        ← 返回首页
      </Link>
      <h1 className='mt-4 text-3xl font-semibold text-slate-900'>
        {item.title}
      </h1>
      <p className='mt-2 text-sm text-slate-400'>{item.date}</p>
      <div className='mt-6 space-y-4 text-slate-600 leading-relaxed'>
        {item.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  )
}

export default Page
