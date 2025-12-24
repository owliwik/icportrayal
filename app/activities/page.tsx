'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { Button } from '@nextui-org/button'
import { Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/modal'
import { activities } from '@/lib/mock-data'

const categories = ['Sports', 'Arts'] as const

const Page = () => {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>('Sports')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = useMemo(
    () => activities.filter((item) => item.category === activeCategory),
    [activeCategory]
  )

  const selected = filtered.find((item) => item.id === selectedId) || null

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

      <div className='grid gap-6 md:grid-cols-2'>
        {filtered.map((item) => (
          <button
            key={item.id}
            type='button'
            className='group rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-sm text-left transition hover:shadow-md'
            onClick={() => setSelectedId(item.id)}
          >
            <div className='relative h-56 w-full'>
              <Image
                src={item.image}
                alt={item.title}
                fill
                className='object-cover transition duration-300 group-hover:scale-105'
              />
            </div>
            <div className='p-5'>
              <h3 className='text-lg font-semibold text-slate-900'>
                {item.title}
              </h3>
              <p className='mt-2 text-sm text-slate-500'>
                {item.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      <Modal
        isOpen={Boolean(selected)}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedId(null)
          }
        }}
        size='3xl'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                {selected && (
                  <div>
                    <div className='relative h-72 w-full rounded-xl overflow-hidden'>
                      <Image
                        src={selected.image}
                        alt={selected.title}
                        fill
                        className='object-cover'
                      />
                    </div>
                    <h3 className='mt-4 text-xl font-semibold text-slate-900'>
                      {selected.title}
                    </h3>
                    <p className='mt-2 text-sm text-slate-500'>
                      {selected.description}
                    </p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter className='flex justify-between'>
                {selected ? (
                  <a
                    href={selected.image}
                    download
                    className='text-sm text-primary-500'
                  >
                    下载原图
                  </a>
                ) : (
                  <span />
                )}
                <Button color='primary' variant='flat' onPress={onClose}>
                  关闭
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Page
