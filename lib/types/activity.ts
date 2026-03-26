// lib/types/activity.ts

export type ActivityCategory = 'Sports' | 'Arts'

export interface Activity {
  id: number
  created_at: string
  category: ActivityCategory
  link: string | null
  department: string
  date: string
  name: string
  description: string
}

// 部门选项
export const DEPARTMENT_OPTIONS = [
  '文艺部',
  '学信部',
  '生活部',
  '体育部',
  '外联部',
  '设计部'
] as const

export type Department = typeof DEPARTMENT_OPTIONS[number]

// 模拟数据（用于开发测试）
export const mockActivities: Activity[] = [
  {
    id: 1,
    created_at: new Date().toISOString(),
    category: 'Sports',
    link: '/downloads/basketball-photos.zip',
    department: '体育部',
    date: new Date().toISOString().split('T')[0],
    name: '篮球友谊赛',
    description: '精彩的篮球友谊赛，展现团队精神'
  },
  {
    id: 2,
    created_at: new Date().toISOString(),
    category: 'Arts',
    link: '/downloads/art-photos.zip',
    department: '文艺部',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    name: '校园艺术展',
    description: '展示学生艺术作品，感受艺术魅力'
  }
]