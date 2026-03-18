export type ActivityCategory = 'Sports' | 'Arts'

export interface Activity {
  $id: string
  title: string
  description: string
  category: ActivityCategory
  location: string
  date: string
  createdAt: string
  imageUrl?: string
  downloadUrl?: string  
  organizer?: string
  participants?: number
}

export const mockActivities: Activity[] = [
  {
    $id: '1',
    title: '篮球友谊赛',
    description: '精彩的篮球友谊赛，展现团队精神',
    category: 'Sports',
    location: '体育馆',
    date: '2024-03-20',
    createdAt: '2024-03-01',
    imageUrl: '/images/activities/basketball.jpg',
    downloadUrl: '/downloads/basketball-photos.zip',
    organizer: '体育部',
    participants: 30
  },
  {
    $id: '2',
    title: '校园艺术展',
    description: '展示学生艺术作品，感受艺术魅力',
    category: 'Arts',
    location: '艺术中心',
    date: '2024-03-25',
    createdAt: '2024-03-05',
    imageUrl: '/images/activities/art-exhibition.jpg',
    downloadUrl: '/downloads/art-photos.zip',
    organizer: '文艺部',
    participants: 45
  },
  // ... 更多活动
]