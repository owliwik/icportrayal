import Image from 'next/image'
import { alumniProfiles } from '@/lib/mock-data'

const Page = () => {
  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
      <div className='mb-10'>
        <h1 className='text-3xl font-semibold text-slate-900'>校友墙</h1>
        <p className='mt-2 text-slate-500'>
          记录前辈的足迹，连接未来的路径。
        </p>
      </div>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {alumniProfiles.map((alumni) => (
          <div
            key={alumni.name}
            className='rounded-2xl bg-white border border-slate-100 p-5 shadow-sm flex gap-4'
          >
            <div className='relative h-20 w-20 rounded-full overflow-hidden flex-shrink-0'>
              <Image
                src={alumni.image}
                alt={alumni.name}
                fill
                className='object-cover'
              />
            </div>
            <div>
              <h3 className='text-lg font-semibold text-slate-900'>
                {alumni.name}
              </h3>
              <p className='text-sm text-slate-500'>{alumni.year}</p>
              <p className='mt-1 text-sm text-slate-600'>{alumni.focus}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
