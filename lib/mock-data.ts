export type NewsItem = {
  slug: string
  title: string
  date: string
  summary: string
  content: string[]
}

export type ResourceItem = {
  title: string
  path: string
}

export type ResourceCategory = {
  id: string
  title: string
  description: string
  resources: ResourceItem[]
}

export type ActivityItem = {
  id: string
  title: string
  category: 'Sports' | 'Arts'
  image: string
  description: string
}

export type ArtworkItem = {
  id: string
  title: string
  author: string
  date: string
  image: string
}

export type TeamMember = {
  name: string
  role: string
  image: string
}

export type AlumniProfile = {
  name: string
  year: string
  focus: string
  image: string
}

export const newsItems: NewsItem[] = [
  {
    slug: 'club-fair-2024',
    title: '2026 Final Study Guide Released!!!',
    date: '2026-01-08',
    summary: '祝大家期末顺利',
    content: [
      '祝大家期末顺利~',
      '感谢学信部成员的努力~',
      '写了三天写完了这个网站',
      '终于写完了 直接给studyguide功能先发了'
    ],
  },
  {
    slug: 'volunteer-week',
    title: 'IC Portrayal Renovation Project Initial',
    date: '2026-01-08',
    summary: '网站开发中，更多功能敬请期待',
    content: [
      '网站开发中，更多功能敬请期待',
    ],
  },
  {
    slug: 'stem-expo',
    title: '2026新年舞会',
    date: '2026-01-01',
    summary: '新年舞会 雪域来信',
    content: [
      '新年舞会 来的人很多',
      '很多人来 活动很好 大家很开心',
    ],
  },

]

export const resourceCategories: ResourceCategory[] = [
  {
    id: 'g10-biology',
    title: 'G10 Biology',
    description: '基础生命科学知识整理。',
    resources: [
      {
        title: '2023 Biology Study Guide (PDF)',
        path: '/resources/2023-biology-study-guide.pdf',
      },
      {
        title: 'Mitosis PPT',
        path: '/resources/mitosis-presentation.ppt',
      },
    ],
  },
  {
    id: 'g10-chemistry',
    title: 'G10 Chemistry',
    description: '化学基础实验与概念复习。',
    resources: [
      {
        title: 'G10 Chemistry Lab Notes (PDF)',
        path: '/resources/g10-chemistry-lab-notes.pdf',
      },
    ],
  },
  {
    id: 'g11-math',
    title: 'G11 Mathematics',
    description: '函数与概率重点题型。',
    resources: [
      {
        title: 'G12 Calculus Review (PDF)',
        path: '/resources/g12-calculus-review.pdf',
      },
    ],
  },
]

export const activities: ActivityItem[] = [
  {
    id: 'basketball-league',
    title: '篮球联赛',
    category: 'Sports',
    image: '/default.jpg',
    description: '班级对抗赛与校际友谊赛安排。蔡徐坤打篮球。',
  },
  {
    id: 'track-meet',
    title: '秋季田径会',
    category: 'Sports',
    image: '/discussing.jpg',
    description: '短跑、接力与田赛项目同步进行。胸口碎大石',
  },
  {
    id: 'campus-concert',
    title: '校园音乐会',
    category: 'Arts',
    image: '/engineering.jpg',
    description: '合唱、独奏与学生乐队演出。born in a third tier town',
  },
  {
    id: 'art-festival',
    title: '艺术节展演',
    category: 'Arts',
    image: '/humanities.jpg',
    description: '舞台剧、绘画展与手工市集。skies always gray',
  },
]

export const artworks: ArtworkItem[] = [
  {
    id: 'blueprint',
    title: 'Blueprint',
    author: 'Avery Lin',
    date: '2024-03-15',
    image: '/science.jpg',
  },
  {
    id: 'quiet-lake',
    title: '大乌龟',
    author: 'Chuck Zhou',
    date: '2024-04-02',
    image: '/geography.jpg',
  },
  {
    id: 'first-light',
    title: 'First Light',
    author: 'Mina Zhou',
    date: '2024-04-20',
    image: '/engineering.jpg',
  },

]

export const teamMembers: TeamMember[] = [
  {
    name: '李为有',
    role: '网站创始人',
    image: '/humanities.jpg',
  },
  {
    name: '李浩民',
    role: '2027级学信部部长',
    image: '/liamli.jpg',
  },
  {
    name: '侯飞升',
    role: '2027级学信部部员,网站开发者',
    image: '/hacker.jpg',
  },
  {
    name: '王明远',
    role: '2027级学信部部员,网站开发者',
    image: '/geography.jpg',
  },
  {
    name: '钱曦文',
    role: '2028级学信部部员,后端开发者',
    image: '/geography.jpg',
  },
  
]

export const alumniProfiles: AlumniProfile[] = [
  {
    name: 'Rachel Zhou',
    year: 'Class of 2022',
    focus: 'Biomed Engineering',
    image: '/science.jpg',
  },
  {
    name: 'Tony Wang',
    year: 'Class of 2021',
    focus: 'Visual Arts',
    image: '/humanities.jpg',
  },
  {
    name: 'Hannah Li',
    year: 'Class of 2020',
    focus: 'Computer Science',
    image: '/engineering.jpg',
  },
]
