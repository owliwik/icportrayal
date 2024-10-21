'use client'

import { useState } from 'react'
import { Button } from '@nextui-org/button'

const Page = () => {
  const [counter, setCounter] = useState(0)

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='flex flex-col items-center gap-16'>
        <h1 className='text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-purple-600 to-blue-500'>
          欢迎来到 IC Portrayal!
        </h1>

        <div className='flex gap-6'>
          <a href='/auth/signup'>
            <Button variant='solid' color='primary'>
              加入我们
            </Button>
          </a>

          <a href='/clubs'>
            <Button href='/clubs'>社团页</Button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Page
