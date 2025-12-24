'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { artworks } from '@/lib/mock-data'

const Page = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = artworks.find((item) => item.id === selectedId) || null

  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
      <div className='mb-8'>
        <h1 className='text-3xl font-semibold text-slate-900'>
          Our Artworks · 我们的作品
        </h1>
        <p className='mt-2 text-slate-500'>Design &amp; Beauty</p>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {artworks.map((item) => (
          <button
            key={item.id}
            type='button'
            className='rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-sm text-left transition hover:shadow-md'
            onClick={() => setSelectedId(item.id)}
          >
            <div className='relative h-52 w-full'>
              <Image
                src={item.image}
                alt={item.title}
                fill
                className='object-cover'
              />
            </div>
            <div className='p-4'>
              <h3 className='text-lg font-semibold text-slate-900'>
                {item.title}
              </h3>
              <p className='mt-1 text-sm text-slate-500'>
                {item.author} · {item.date}
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
                    <div className='relative h-80 w-full rounded-xl overflow-hidden'>
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
                    <p className='mt-1 text-sm text-slate-500'>
                      {selected.author} · {selected.date}
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
