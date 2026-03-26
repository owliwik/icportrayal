// lib/types/artwork.ts

export interface Artwork {
  id: number
  created_at: string
  category: string // 修正：category 而不是 catagory
  link: string | null
  name: string
  title: string
}

// 分类选项（用于筛选）
export const CATEGORY_OPTIONS = [
  '绘画',
  '摄影',
  '书法',
  '设计',
  '雕塑',
  '其他'
] as const

export type ArtworkCategory = typeof CATEGORY_OPTIONS[number]

// 模拟数据（用于开发测试）
export const mockArtworks: Artwork[] = [
  {
    id: 1,
    created_at: new Date().toISOString(),
    category: '绘画',
    link: '/artworks/1.jpg',
    name: '张三',
    title: '山水画'
  },
  {
    id: 2,
    created_at: new Date().toISOString(),
    category: '摄影',
    link: '/artworks/2.jpg',
    name: '李四',
    title: '城市夜景'
  },
  {
    id: 3,
    created_at: new Date().toISOString(),
    category: '书法',
    link: '/artworks/3.jpg',
    name: '王五',
    title: '兰亭序'
  }
]