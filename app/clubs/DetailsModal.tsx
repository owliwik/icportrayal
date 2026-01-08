'use client'

import { useEffect, useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal'

import { Club } from '@/lib/types/club'
import { Button } from '@nextui-org/button'
import { LuCalendarClock } from 'react-icons/lu'
import { FaLocationDot } from 'react-icons/fa6'
import { IoLogoWechat } from 'react-icons/io5'

export const DetailsModal = ({
  club,
  isOpened,
  setOpened,
}: {
  club: Club
  isOpened: boolean
  setOpened: (isOpened: boolean) => void
}) => {
  const [details, setDetails] = useState<{
    description: string
    activityIntro: string
  } | null>(null)
  const [detailsLoading, setDetailsLoading] = useState(false)

  useEffect(() => {
    setDetails(null)
  }, [club.$id])

  useEffect(() => {
    if (!isOpened || !club.$id) return
    let isMounted = true
    const controller = new AbortController()

    const loadDetails = async () => {
      setDetailsLoading(true)
      try {
        const response = await fetch(`/api/clubs/${club.$id}`, {
          signal: controller.signal,
          headers: { 'Cache-Control': 'no-cache' },
        })

        if (!response.ok) {
          throw new Error('failed to load club details')
        }

        const data = await response.json()
        if (isMounted) {
          setDetails({
            description: data.description || '',
            activityIntro: data.activityIntro || '',
          })
        }
      } catch (error) {
        if (isMounted) {
          setDetails({ description: '', activityIntro: '' })
        }
      } finally {
        if (isMounted) {
          setDetailsLoading(false)
        }
      }
    }

    loadDetails()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [club.$id, isOpened])

  return (
    <Modal scrollBehavior='outside' isOpen={isOpened} onOpenChange={(isOpened) => setOpened(isOpened)}>
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className='text-2xl flex-col'>
              <div>{club.name}</div>
              <div className='text-base font-normal text-gray-500'>
                {club.aliasName}
              </div>
            </ModalHeader>
            <ModalBody>
              <div className='flex gap-4 mb-4'>
                <div className='flex gap-2'>
                  <LuCalendarClock className='text-2xl' />
                  <div>{club.activityDay || '不定'}</div>
                </div>
                <div className='flex gap-2'>
                  <FaLocationDot className='text-2xl relative top-[0.1rem]' />
                  <div>{club.activityPlace || '不定'}</div>
                </div>
              </div>

              <div>
                <div className='mb-4'>
                  <h2 className='text-xl font-semibold text-gray-800'>
                    关于我们
                  </h2>
                  <div>
                    {detailsLoading && !details
                      ? '加载中...'
                      : details?.description || '什么也没有留下'}
                  </div>
                </div>
                <div className='mb-4'>
                  <h2 className='text-xl font-semibold text-gray-800'>
                    活动介绍 & 计划
                  </h2>
                  <div>
                    {detailsLoading && !details
                      ? '加载中...'
                      : details?.activityIntro || '空空如也'}
                  </div>
                </div>
                {club.contact && (
                  <div className='flex gap-2'>
                    <IoLogoWechat className='text-2xl' />
                    <div>{club.contact}</div>
                  </div>
                )}
              </div>
            </ModalBody>

            <ModalFooter>
              <Button color='danger' variant='flat' onPress={onClose}>
                关闭
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  )
}