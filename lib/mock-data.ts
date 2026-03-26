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
    image: '/weiyou.jpg',
  },
  {
    name: '李浩民',
    role: '2027级学信部部长',
    image: '/liamli.jpg',
  },
  {
    name: '侯飞声',
    role: '2027级学信部部员,网站开发者',
    image: '/feisheng.jpg',
  },
  {
    name: '王明远',
    role: '2027级学信部部员,网站开发者',
    image: '/default.jpg',
  },
  {
    name: '钱曦文',
    role: '2028级学信部部员,后端开发者',
    image: '/default.jpg',
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

// lib/mock-data.ts

// 学生会部门数据 - 使用本地图片路径
export const departmentItems = [
  {
    id: 1,
    name: '文艺部',
    slug: 'arts',
    description: '负责校园文化艺术活动的策划与组织，包括文艺晚会、艺术展览、校园歌手大赛等。我们致力于丰富同学们的课余生活，营造浓厚的校园艺术氛围。',
    description_en: 'Responsible for planning and organizing campus cultural and artistic activities, including art evenings, art exhibitions, campus singer competitions, etc. We are committed to enriching students\' extracurricular life and creating a vibrant artistic atmosphere on campus.',
    summary: '策划组织校园文艺活动，丰富校园文化生活',
    summary_en: 'Plan and organize campus cultural activities, enrich campus cultural life',
    imageUrl: '/images/departments/文艺部.jpg',
    color: 'bg-pink-100'
  },
  {
    id: 2,
    name: '学信部',
    slug: 'academic',
    description: '负责学术竞赛、学习方法分享、学习资源整合等工作。定期举办学术讲座、学习经验交流会，帮助同学们提高学习效率，拓展学术视野。',
    description_en: 'Responsible for academic competitions, study method sharing, and learning resource integration. Regularly organize academic lectures and study experience exchange meetings to help students improve learning efficiency and expand academic horizons.',
    summary: '整合学习资源，搭建学术交流平台',
    summary_en: 'Integrate learning resources, build academic exchange platforms',
    imageUrl: '/images/departments/学信部.jpg',
    color: 'bg-blue-100'
  },
  {
    id: 3,
    name: '生活部',
    slug: 'life',
    description: '关注同学们的日常生活需求，负责校园生活服务、权益维护、生活建议收集等工作。定期开展生活技能培训，营造温馨和谐的校园生活环境。',
    description_en: 'Focus on students\' daily needs, responsible for campus life services, rights protection, and collecting life suggestions. Regularly conduct life skills training to create a warm and harmonious campus living environment.',
    summary: '关注生活需求，维护学生权益',
    summary_en: 'Focus on life needs, protect student rights',
    imageUrl: '/images/departments/生活部.jpg',
    color: 'bg-green-100'
  },
  {
    id: 4,
    name: '体育部',
    slug: 'sports',
    description: '组织各类体育赛事和健身活动，包括篮球赛、足球赛、趣味运动会等。推广健康生活方式，增强同学们的身体素质，培养团队合作精神。',
    description_en: 'Organize various sports events and fitness activities, including basketball games, football matches, fun sports meets, etc. Promote healthy lifestyles, enhance students\' physical fitness, and cultivate team spirit.',
    summary: '组织体育活动，倡导健康生活',
    summary_en: 'Organize sports activities, promote healthy living',
    imageUrl: '/images/departments/体育部.jpg',
    color: 'bg-orange-100'
  },
  {
    id: 5,
    name: '外联部',
    slug: 'public-relations',
    description: '负责校际交流、校企合作、活动赞助等工作。拓展校外资源，加强与其他学校的联系，为学生会活动提供支持和保障。',
    description_en: 'Responsible for inter-school exchanges, school-enterprise cooperation, and活动 sponsorship. Expand off-campus resources, strengthen connections with other schools, and provide support and guarantee for Student Union activities.',
    summary: '拓展校外资源，加强校际交流',
    summary_en: 'Expand off-campus resources, strengthen inter-school exchanges',
    imageUrl: '/images/departments/外联部.jpg',
    color: 'bg-purple-100'
  },
  {
    id: 6,
    name: '设计部',
    slug: 'design',
    description: '负责学生会各类活动的视觉设计，包括海报、宣传品、周边产品等。用创意和设计语言传达活动信息，提升学生会活动的视觉影响力。',
    description_en: 'Responsible for visual design of various Student Union activities, including posters, promotional materials, merchandise, etc. Convey activity information through creativity and design language, enhancing the visual impact of Student Union activities.',
    summary: '创意视觉设计，提升活动影响力',
    summary_en: 'Creative visual design, enhance activity impact',
    imageUrl: '/images/departments/设计部.jpg',
    color: 'bg-yellow-100'
  }
];