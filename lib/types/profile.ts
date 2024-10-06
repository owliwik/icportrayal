import { DBDocument } from './database'
import { z } from 'zod'

export const profileSchema = z.object({
  name: z.string().min(2).max(32),
  aliasName: z.string().min(2).max(32).optional(),
  gradYear: z.number().min(2000).max(2100).optional(),
  class: z.number().optional(),
  gender: z.string().min(2).max(32),
})

export interface Profile extends z.infer<typeof profileSchema>, DBDocument {}
