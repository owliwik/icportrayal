import Image from 'next/image'

const Capsule = () => {
  return (
    <div className='w-64 h-28 p-3 flex items-center bg-white shadow-lg rounded-[1000rem]'>
      <div className='bg-gray-200 h-[100%] mr-3 aspect-square rounded-[50vh]'></div>
      <div className='h-[100%] flex-1'>
        <div className='pb-2'>
          <div className='text-sm'>
            <span className='text-xl font-semibold pr-2'>胡澍楷</span>
            <span className='text-red-700'>G10C1</span>
          </div>

          <div className='text-[0.75rem] font-light text-gray-400'>
            朝碧海而暮苍梧
          </div>
        </div>

        <div className='text-blue-500 text-sm'>#math #anti-nerd #traveler #iccu</div>
      </div>
    </div>
  )
}

export { Capsule }
