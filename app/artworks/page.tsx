'use client'

import { Button } from '@nextui-org/button'

const Page = () => {
  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
      <div className='mb-8'>
        <h1 className='text-3xl font-semibold text-slate-900'>
          Our Artworks · 我们的作品
        </h1>
        <p className='mt-2 text-slate-500'>Design &amp; Beauty</p>
      </div>

      <div className='flex flex-col items-center justify-center min-h-[500px] bg-white rounded-2xl border border-slate-100 shadow-sm'>
        <div className='text-center p-8'>
          <div className='text-6xl mb-4'>🎨</div>
          <h2 className='text-2xl font-semibold text-slate-900 mb-2'>
            开发中，敬请期待
          </h2>
          <p className='text-slate-500'>
            Our artwork gallery is currently under construction.
          </p>
          <p className='text-slate-500 mt-1'>
            我们的作品展示区正在精心准备中，即将与大家见面！
          </p>
          
          <div className='mt-8 max-w-md mx-auto'>
            <div className='grid grid-cols-2 gap-4 mb-6'>
              <div className='bg-slate-50 rounded-lg p-4 text-center'>
                <div className='text-2xl mb-2'>🖼️</div>
                <p className='text-sm text-slate-600'>艺术作品展示</p>
              </div>
              <div className='bg-slate-50 rounded-lg p-4 text-center'>
                <div className='text-2xl mb-2'>🎭</div>
                <p className='text-sm text-slate-600'>设计作品集</p>
              </div>
              <div className='bg-slate-50 rounded-lg p-4 text-center'>
                <div className='text-2xl mb-2'>📷</div>
                <p className='text-sm text-slate-600'>摄影作品</p>
              </div>
              <div className='bg-slate-50 rounded-lg p-4 text-center'>
                <div className='text-2xl mb-2'>✏️</div>
                <p className='text-sm text-slate-600'>插画设计</p>
              </div>
            </div>
            
            <Button 
              color='primary' 
              variant='flat'
              className='w-full'
              isDisabled
            >
              功能即将开放
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page