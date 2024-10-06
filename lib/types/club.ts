import { z } from 'zod'
import { DBDocument } from './database'
import { DateValue } from '@internationalized/date'

const isBrowser = typeof window !== undefined

export const clubSchema = z.object({
  name: z.string().min(2).max(32),
  englishName: z.string().min(2).max(128).optional(),
  isOfficial: z.boolean().default(false),
  leaders: z.array(z.string().max(8)).max(16),
  contact: z.string().min(2).max(32).optional(),
  description: z.string().max(128).optional(),
  type: z.string().optional(),
  activityDay: z
    .enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
    .optional(),
  activityPlace: z.string().min(2).max(16).optional(),
  activityIntro: z.string().max(128).optional(),
})

export interface Club extends z.infer<typeof clubSchema>, DBDocument {
  profileImageID?: string
}

export const clubActivitySchema = z.object({
  clubName: z
    .string({ message: '请提供社团名' })
    .min(2, '请提供社团名')
    .max(32),
  date: z.custom<DateValue>().refine((v) => !!v, '请注明活动日期'),
  content: z.string().min(4, '需记录5字以上').max(128, '记录内容过长'),
  numOfMembers: z.coerce
    .number({ message: '请提供参与人数' })
    .min(1, '请提供参与人数')
    .int('人数必须为整数')
    .min(3, '至少3位参与者')
    .max(200, '超大型活动请向ICCU单独申请'),
  image: z
    .instanceof(File, { message: '请上传活动图片' })
    .refine((file) => !!file, '请上传活动图片')
    .refine((file) => file.size > 0, '请上传活动图片')
    .refine((file) => file.size <= 10 * 1024 * 1024, '图片大小应不超过10M')
    .refine(
      (file) => file.type.startsWith('image/'),
      '文件类型应是图片（jpg, png等）'
    ),
})

export interface ClubActivity
  extends z.infer<typeof clubActivitySchema>,
    DBDocument {}
