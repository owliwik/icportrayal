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
  // 处理活动日期：转换为数组
  const getActivityDays = (): string[] => {
    if (!club.activityDay) return []
    
    // 如果已经是数组
    if (Array.isArray(club.activityDay)) {
      return club.activityDay
    }
    
    // 如果是逗号分隔的字符串
    if (typeof club.activityDay === 'string') {
      return club.activityDay
        .split(',')
        .map(day => day.trim())
        .filter(day => day.length > 0)
    }
    
    // 如果是单一天
    return [club.activityDay]
  }
  
  const activityDays = getActivityDays()
  
  // 将英文星期转换为中文
  const dayToChinese = (day: string): string => {
    const dayMap: Record<string, string> = {
      'Monday': '周一',
      'Tuesday': '周二',
      'Wednesday': '周三',
      'Thursday': '周四',
      'Friday': '周五',
      '周一': '周一',
      '周二': '周二',
      '周三': '周三',
      '周四': '周四',
      '周五': '周五',
    }
    return dayMap[day] || day
  }

  return (
    <Modal 
      scrollBehavior='outside' 
      isOpen={isOpened} 
      onOpenChange={setOpened}
      size='lg'
    >
      <ModalContent>
        {(onClose) => (
          <div className='max-h-[80vh] overflow-y-auto'>
            <ModalHeader className='text-2xl flex-col items-start'>
              <div>{club.name}</div>
              {club.aliasName && (
                <div className='text-base font-normal text-gray-500'>
                  {club.aliasName}
                </div>
              )}
            </ModalHeader>
            
            <ModalBody>
              {/* 基本信息和活动日期 */}
              <div className='flex gap-6 mb-6 flex-wrap'>
                {/* 活动日期 */}
                <div className='flex gap-2 items-start'>
                  <LuCalendarClock className='text-xl text-gray-500 mt-1' />
                  <div>
                    <div className='font-medium text-gray-700 mb-1'>活动日期</div>
                    {activityDays.length > 0 ? (
                      <div className='flex flex-wrap gap-2'>
                        {activityDays.map((day, index) => (
                          <span 
                            key={index}
                            className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium'
                          >
                            {dayToChinese(day)}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className='text-gray-400'>未指定</div>
                    )}
                  </div>
                </div>
                
                {/* 活动地点 */}
                <div className='flex gap-2 items-start'>
                  <FaLocationDot className='text-xl text-gray-500 mt-1' />
                  <div>
                    <div className='font-medium text-gray-700 mb-1'>活动地点</div>
                    <div className='text-gray-600'>
                      {club.activityPlace || '未指定'}
                    </div>
                  </div>
                </div>
              </div>

              {/* 社团详情 */}
              <div className='space-y-6'>
                {/* 关于我们 */}
                {club.description && (
                  <div>
                    <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                      关于我们
                    </h3>
                    <div className='text-gray-600 leading-relaxed p-4 bg-gray-50 rounded-lg'>
                      {club.description}
                    </div>
                  </div>
                )}

                {/* 活动介绍 */}
                {club.activityIntro && (
                  <div>
                    <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                      活动介绍 & 计划
                    </h3>
                    <div className='text-gray-600 leading-relaxed p-4 bg-blue-50 rounded-lg'>
                      {club.activityIntro}
                    </div>
                  </div>
                )}

                {/* 社长信息 */}
                {club.leaders && club.leaders.length > 0 && (
                  <div>
                    <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                      社长
                    </h3>
                    <div className='flex flex-wrap gap-2'>
                      {club.leaders.map((leader, index) => (
                        <span 
                          key={index}
                          className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm'
                        >
                          {leader}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 联系方式 */}
                {club.contact && (
                  <div className='flex gap-2 items-center'>
                    <IoLogoWechat className='text-2xl text-green-500' />
                    <div>
                      <div className='font-medium text-gray-700'>联系方式</div>
                      <div className='text-gray-600'>{club.contact}</div>
                    </div>
                  </div>
                )}

                {/* 如果没有描述和介绍 */}
                {!club.description && !club.activityIntro && (
                  <div className='text-center py-8 text-gray-400'>
                    <div className='text-3xl mb-3'>📝</div>
                    <div>这个社团还没有添加介绍信息</div>
                  </div>
                )}
              </div>
            </ModalBody>

            <ModalFooter>
              <Button 
                color='primary' 
                variant='flat' 
                onPress={onClose}
                className='font-medium'
              >
                关闭
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  )
}