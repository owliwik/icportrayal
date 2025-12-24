import Image from 'next/image'
import { teamMembers } from '@/lib/mock-data'

const Page = () => {
  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
      <div className='mb-10'>
        <h1 className='text-3xl font-semibold text-slate-900'>
          IC Portrayal 开发团队
        </h1>
        <p className='mt-2 text-slate-500'>We have one more thing.</p>
      </div>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className='rounded-2xl bg-white border border-slate-100 p-5 shadow-sm'
          >
            <div className='relative h-40 w-full rounded-xl overflow-hidden'>
              <Image
                src={member.image}
                alt={member.name}
                fill
                className='object-cover'
              />
            </div>
            <h3 className='mt-4 text-lg font-semibold text-slate-900'>
              {member.name}
            </h3>
            <p className='mt-1 text-sm text-slate-500'>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
