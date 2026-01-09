'use client'

import { useState } from 'react'
import { Button } from '@nextui-org/button'

const categories = ['Sports', 'Arts'] as const

const Page = () => {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>('Sports')

  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
      <div className='mb-8'>
        <h1 className='text-3xl font-semibold text-slate-900'>
          Our Activities · 我们的活动
        </h1>
        <p className='mt-2 text-slate-500'>Study hard, Play hard!</p>
      </div>

      <div className='flex gap-3 mb-8'>
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? 'solid' : 'bordered'}
            color={activeCategory === category ? 'primary' : 'default'}
            onPress={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className='flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl border border-slate-100 shadow-sm'>
        <div className='text-center p-8'>
          <div className='text-6xl mb-4'>🚧</div>
          <h2 className='text-2xl font-semibold text-slate-900 mb-2'>
            开发中，敬请期待
          </h2>
          <p className='text-slate-500'>
            This section is currently under development.
          </p>
          <p className='text-slate-500 mt-1'>
            我们正在努力开发这个功能，即将上线！
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page