'use client'

import { useState } from 'react'
import { Button } from '@nextui-org/button'

const Page = () => {
  const [counter, setCounter] = useState(0)

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-80 h-64 p-8 bg-white shadow-lg rounded-lg flex flex-col justify-center items-center gap-8'>
        <div className='text-xl font-medium'>The counter is {counter}</div>

        <div className='flex gap-2'>
          <Button
            variant='solid'
            color='primary'
            onClick={() => {
              setCounter(counter + 1)
            }}
          >
            Increment
          </Button>
          <Button
            variant='light'
            color='secondary'
            onClick={() => {
              setCounter(0)
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Page
