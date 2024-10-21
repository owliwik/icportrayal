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
  return (
    <Modal isOpen={isOpened} onOpenChange={(isOpened) => setOpened(isOpened)}>
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
                  <div>{club.description || '什么也没有留下'}</div>
                </div>
                <div className='mb-4'>
                  <h2 className='text-xl font-semibold text-gray-800'>
                    活动介绍 & 计划
                  </h2>
                  <div>{club.activityIntro || '空空如也'}</div>
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
              <Button color='danger' variant='flat' onClick={onClose}>
                关闭
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  )
}
