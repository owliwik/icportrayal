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
    role: '网站创始人(无私奉献中)',
    image: '/weiyou.jpg',
  },
  {
    name: '李浩民',
    role: '2027级学信部长(压榨员工中)',
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
    image: '/hacker.jpg',
  },
  {
    name: 'Codex',
    role: '最强内置AI',
    image: '/codex.jpg',
  },
  {
    name: 'deepseek',
    role: '最强外置AI',
    image: '/deepseek.jpg',
  },
  {
    name: 'Cursor',
    role: '最强IDE',
    image: '/cursor.jpg',
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
// lib/mock-data.ts

export const departmentItems = [
  {
    id: 1,
    name: '生活部',
    name_en: 'Life Affairs Department',
    slug: 'life',
    role: '生活部主要负责校园生活事务的沟通与协调，是学生与学校之间的重要联系窗口。',
    description: '部门通过收集同学在校园生活中的反馈与需求，与学校进行沟通并推动问题解决，同时参与校园生活相关项目与活动的组织，致力于持续改善同学们的校园生活体验。',
    description_en: 'The department collects feedback and needs from students regarding campus life, communicates with the school to facilitate problem-solving, and participates in organizing campus life-related projects and activities, committed to continuously improving students\' campus life experience.',
    summary: '通过持续回应同学的实际需求，生活部让学生的声音能够被听见，并推动学生在校园事务中的参与与表达。',
    summary_en: 'By continuously responding to students\' actual needs, the Life Affairs Department ensures that students\' voices are heard and promotes student participation and expression in campus affairs.',
    responsibilities: [
      '收集并整理同学在校园生活中的意见与需求',
      '与学校沟通并推动校园生活问题解决',
      '协助推进校园生活相关项目与活动',
      '维护与优化校园生活服务设施'
    ],
    responsibilities_en: [
      'Collect and organize student opinions and needs regarding campus life',
      'Communicate with the school to facilitate resolution of campus life issues',
      'Assist in promoting campus life-related projects and activities',
      'Maintain and optimize campus life service facilities'
    ],
    imageUrl: '/life.jpg',
    color: 'bg-green-100'
  },
  {
    id: 2,
    name: '学信部',
    name_en: 'Academic & Information Department',
    slug: 'academic',
    role: '学信部主要负责IC的学术项目与信息平台建设，通过组织学习类项目与活动，为同学们的课内外学习提供支持。',
    description: '同时，部门负责学生会的信息平台建设与技术支持，包括IC Portrayal等数字平台的运营与维护。',
    description_en: 'Additionally, the department is responsible for building the student union\'s information platforms and providing technical support, including the operation and maintenance of digital platforms such as IC Portrayal.',
    summary: '通过推动学术交流与信息平台建设，学信部提升校园的信息透明度与资源整合能力，并通过数字化工具支持学生会运作，使各类资源能够更广泛地服务IC community。',
    summary_en: 'By promoting academic exchange and information platform development, the Academic & Information Department enhances campus information transparency and resource integration capabilities, supporting student union operations through digital tools and enabling various resources to serve the IC community more broadly.',
    responsibilities: [
      '组织学术类活动与相关项目',
      '为同学提供学术资源与学习支持',
      '维护与更新IC Portrayal等信息平台',
      '为学生会的内部管理与外部运营提供技术支持'
    ],
    responsibilities_en: [
      'Organize academic activities and related projects',
      'Provide academic resources and learning support to students',
      'Maintain and update information platforms such as IC Portrayal',
      'Provide technical support for student union internal management and external operations'
    ],
    imageUrl: '/study.jpg',
    color: 'bg-blue-100'
  },
  {
    id: 3,
    name: '文艺部',
    name_en: 'Activity Department',
    slug: 'arts',
    role: '文艺部负责策划与组织IC的大型文艺活动，通过音乐、舞会与主题活动丰富校园文化生活，为同学们提供展示创意与才华的平台。',
    description: '同时营造具有特色的校园文化氛围。',
    description_en: 'At the same time, it creates a distinctive campus cultural atmosphere.',
    summary: '通过组织具有仪式感与参与感的校园活动，文艺部为IC community创造共同的校园记忆，并强化同学们对校园文化与社区身份的认同。',
    summary_en: 'By organizing campus activities with a sense of ceremony and participation, the Activity Department creates shared campus memories for the IC community and strengthens students\' identification with campus culture and community identity.',
    responsibilities: [
      '组织校园大型活动',
      '策划并开展主题活动与校园文化项目',
      '推动校园文化氛围建设'
    ],
    responsibilities_en: [
      'Organize large-scale campus events',
      'Plan and implement themed activities and campus culture projects',
      'Promote the development of campus cultural atmosphere'
    ],
    imageUrl: '/art.jpg',
    color: 'bg-pink-100'
  },
  {
    id: 4,
    name: '体育部',
    name_en: 'Sports Department',
    slug: 'sports',
    role: '体育部负责统筹校园体育赛事与体育活动，通过组织校内比赛与体育项目，鼓励同学们积极参与体育运动，促进校园体育文化的发展。',
    description: '',
    description_en: '',
    summary: '通过体育赛事与日常运动活动，体育部增强同学之间的连接与团队精神，使运动成为IC community活跃与凝聚的重要方式。',
    summary_en: 'Through sports events and daily physical activities, the Sports Department enhances connections and team spirit among students, making sports an important way to keep the IC community active and united.',
    responsibilities: [
      '组织校内体育赛事与传统体育活动',
      '协调体育社团与校园体育资源',
      '推动常态化体育活动开展',
      '促进跨校体育交流'
    ],
    responsibilities_en: [
      'Organize intramural sports competitions and traditional sports events',
      'Coordinate sports clubs and campus sports resources',
      'Promote regular sports activities',
      'Facilitate inter-school sports exchanges'
    ],
    imageUrl: '/sport.jpg',
    color: 'bg-orange-100'
  },
  {
    id: 5,
    name: '设计部',
    name_en: 'Design Department',
    slug: 'design',
    role: '设计部主要负责IC的视觉内容创作与校园视觉文化建设。部门为学生会及校内组织提供视觉设计支持，并通过艺术展览与创意项目提升校园公共空间的文化氛围。',
    description: '',
    description_en: '',
    summary: '通过视觉创作与公共艺术项目，设计部塑造校园空间的文化表达，并提升同学们的审美意识与美育体验，让创意与艺术成为IC校园环境的重要组成部分。',
    summary_en: 'Through visual creation and public art projects, the Design Department shapes the cultural expression of campus spaces, enhances students\' aesthetic awareness and arts education experience, making creativity and art an important part of the IC campus environment.',
    responsibilities: [
      '为学生会与校园活动提供视觉设计支持',
      '组织校园艺术项目与创意活动',
      '推动校园视觉文化与公共艺术建设'
    ],
    responsibilities_en: [
      'Provide visual design support for student union and campus activities',
      'Organize campus art projects and creative activities',
      'Promote campus visual culture and public art development'
    ],
    imageUrl: '/design.jpg',
    color: 'bg-yellow-100'
  },
  {
    id: 6,
    name: '外联部',
    name_en: 'External Relations Department',
    slug: 'public-relations',
    role: '外联部负责学生会的对外合作与交流，推动IC与其他学校及组织之间的联系。通过组织跨校活动与合作项目，外联部为同学们提供更多交流机会，并在对外展示IC校园文化方面发挥重要作用。',
    description: '',
    description_en: '',
    summary: '通过建立跨校与社会连接，外联部拓展IC community的外部交流空间，并促进校园文化的传播与展示。',
    summary_en: 'By establishing inter-school and social connections, the External Relations Department expands the external communication space for the IC community and promotes the dissemination and display of campus culture.',
    responsibilities: [
      '组织与协调跨校交流活动',
      '协助各部门开展跨校合作项目',
      '负责学生会文创产品的制作与推广',
      '推动IC校园文化的对外传播与展示'
    ],
    responsibilities_en: [
      'Organize and coordinate inter-school exchange activities',
      'Assist various departments in implementing inter-school collaboration projects',
      'Responsible for the production and promotion of student union cultural products',
      'Promote the external dissemination and display of IC campus culture'
    ],
    imageUrl: '/external-relation.jpg',
    color: 'bg-purple-100'
  }
];