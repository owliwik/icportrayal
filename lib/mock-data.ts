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
    title: '2024 俱乐部招新开启',
    date: '2024-09-01',
    summary: '校内社团集中展示，欢迎同学们报名加入。',
    content: [
      '本次招新覆盖学术、运动、艺术等多个方向。',
      '现场可领取社团介绍册，并参与体验活动。',
      '详情请关注公告栏与班级群通知。',
    ],
  },
  {
    slug: 'stem-expo',
    title: 'STEM 创意展预告',
    date: '2033-10-12',
    summary: '跨学科作品展将展示学生创新成果。',
    content: [
      '展览包含机器人、装置艺术与互动设计。',
      '活动期间安排作品讲解与评审环节。',
    ],
  },
  {
    slug: 'volunteer-week',
    title: '志愿服务周活动报名',
    date: '2044-11-03',
    summary: '服务社区，从小事做起。',
    content: [
      '报名面向全体年级，名额有限。',
      '参与活动可获得服务时长证明。',
      '学信部部长压榨员工',
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
    description: '班级对抗赛与校际友谊赛安排。',
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
    description: '舞台剧、绘画展与手工市集。free your mind',
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
    title: 'Quiet Lake',
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
  {
    id: 'sketches',
    title: 'Sketches',
    author: 'Yuki Tan',
    date: '2024-05-09',
    image: '/default.jpg',
  },
]

export const teamMembers: TeamMember[] = [
  {
    name: 'Sean Xue',
    role: 'Xuener',
    image: '/default.jpg',
  },
  {
    name: 'Patrick Hou',
    role: 'Houzi',
    image: '/engineering.jpg',
  },
  {
    name: 'Mia Guo',
    role: 'Visual Designer',
    image: '/humanities.jpg',
  },
  {
    name: 'Ethan Sun',
    role: 'Content Editor',
    image: '/geography.jpg',
  },
  {
    name: 'Chuck Zhou',
    role: 'Turtle Expert',
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
