import Image from 'next/image'
import { departmentItems } from '@/lib/mock-data'

const Page = () => {
  return (
    <div className='w-full'>
      {/* Welcome Section */}
      <section className='max-w-6xl mx-auto px-6 py-12'>
        <div className='rounded-3xl bg-white shadow-sm border border-slate-100 px-8 py-12'>
          <p className='text-sm uppercase tracking-[0.2em] text-slate-400'>
            Welcome
          </p>
          <h1 className='mt-4 text-3xl md:text-4xl font-semibold text-slate-900'>
            欢迎来到 BHSFIC 学生官方网站
          </h1>
          <p className='mt-3 text-lg text-slate-500'>
            BHSFIC Official Student Platform
          </p>
          <div className='mt-6 flex gap-3'>
            <a
              href='/resources'
              className='rounded-full bg-primary-500 px-5 py-2 text-white text-sm font-medium'
            >
              浏览资源
            </a>
            <a
              href='/activities'
              className='rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600'
            >
              校园活动
            </a>
          </div>
        </div>
      </section>

      {/* 学生会简介 Section */}
      <section className='max-w-6xl mx-auto px-6 pb-16'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-semibold text-slate-900'>学生会简介</h2>
          <span className='text-sm text-slate-400'>
            About Student Union
          </span>
        </div>
        
        <div className='rounded-2xl bg-white border border-slate-100 p-8 shadow-sm'>
          <div className='prose prose-slate max-w-none'>
            <p className='text-lg text-slate-700 leading-relaxed mb-4'>
              <span className='block mb-2'>第十三届学生会坚持&quot;以人为本，让校园变得更好&quot;的核心理念。我们连接想法与行动的平台，致力于打造一个更开放、更有温度、更值得参与的校园公共空间。我们相信，真正让校园变得更好的，是每一个在这里发声、参与并成长的人。我们希望让每一位同学的声音被听见，让更多想法在校园中成为现实。</span>
              <span className='block text-base text-slate-500 mt-1'>The 13th IC Student Council is guided by the principle of &quot;People First — Making Our Campus Better.&quot; We are not only organizers of events, but also a platform that connects ideas with action. We believe that what truly improves a campus is the participation, voices, and growth of every individual within it. Our goal is to ensure that every student has the chance to be heard and that more ideas can become reality on campus.</span>
            </p>
          </div>
        </div>
      </section>

      {/* 我们的使命 Section */}
      <section className='max-w-6xl mx-auto px-6 pb-16'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-semibold text-slate-900'>我们的使命</h2>
          <span className='text-sm text-slate-400'>
            Our Mission
          </span>
        </div>
        
        <div className='rounded-2xl bg-white border border-slate-100 p-8 shadow-sm'>
          <div className='prose prose-slate max-w-none'>
            <p className='text-lg text-slate-700 leading-relaxed mb-4'>
              <span className='block mb-2'>北京四中国际校区学生会致力于通过学生自治推动校园的持续发展。我们关注同学需求，连接想法与行动，让更多学生参与到校园建设之中。</span>
              <span className='block text-base text-slate-500 mt-1'>The BHSFIC Student Union is committed to promoting the continuous development of the campus through student self-governance. We focus on student needs, connect ideas with action, and encourage more students to participate in campus development.</span>
            </p>
            <div className='mt-4 space-y-2'>
              <div className='flex gap-3 items-start'>
                <span className='text-primary-500 font-bold'>1.</span>
                <div>
                  <p className='font-medium text-slate-800'>推动校园改进</p>
                  <p className='text-sm text-slate-600'>倾听学生声音，提出改善校园生活的建议与政策。</p>
                  <p className='text-xs text-slate-500 mt-1'>Listen to student voices and propose suggestions and policies to improve campus life.</p>
                </div>
              </div>
              <div className='flex gap-3 items-start'>
                <span className='text-primary-500 font-bold'>2.</span>
                <div>
                  <p className='font-medium text-slate-800'>组织校园活动</p>
                  <p className='text-sm text-slate-600'>策划并支持面向全校的校园活动，丰富同学们的校园生活。</p>
                  <p className='text-xs text-slate-500 mt-1'>Plan and support campus-wide activities to enrich students' campus life.</p>
                </div>
              </div>
              <div className='flex gap-3 items-start'>
                <span className='text-primary-500 font-bold'>3.</span>
                <div>
                  <p className='font-medium text-slate-800'>连接校园与社会</p>
                  <p className='text-sm text-slate-600'>与金融街、西城区及北京各类社区和机构建立交流与合作，为更广阔的社会环境贡献学生力量。</p>
                  <p className='text-xs text-slate-500 mt-1'>Establish exchanges and cooperation with various communities and institutions in Beijing, contributing student power to the broader social environment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 组织架构 Section */}
      <section className='max-w-6xl mx-auto px-6 pb-16'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-semibold text-slate-900'>组织架构</h2>
          <span className='text-sm text-slate-400'>
            Organizational Structure
          </span>
        </div>
        
        <div className='rounded-2xl bg-white border border-slate-100 p-8 shadow-sm'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* 左侧文字空间 */}
            <div className='space-y-4'>
              <h3 className='text-xl font-medium text-slate-900'>
                <span className='block mb-1'>我们的组织架构</span>
                <span className='text-base text-slate-500 font-normal'>Our Structure</span>
              </h3>
              <div className='prose prose-slate'>
                <p className='text-slate-600 leading-relaxed'>
                  <span className='block mb-2'>学生会由主席负责整体统筹与协调，下设六个部门：生活部、学信部、文艺部、体育部、设计部与外联部。各部门在不同领域协同开展工作，涵盖校园生活支持、学术与信息服务、校级活动组织、视觉设计服务以及对外交流合作等职能，共同为同学们提供多方面的支持与服务。</span>
                  <span className='block text-sm text-slate-500 mt-1'>Together, these departments support campus life through student services, academic resources, event organization, visual design, and external partnerships.</span>
                </p>
                <p className='text-slate-600 leading-relaxed mt-3'>
                  <span className='block mb-2'>通过了解学生会的组织架构，各个角色的职责，以及他们如何共同为 IC 校园的发展贡献力量。</span>
                  <span className='block text-sm text-slate-500 mt-1'>Take a look through our structure to see who does what and how each role contributes to the IC community.</span>
                </p>
              </div>
            </div>
            
            {/* 右侧图片空间 */}
            <div className='flex flex-col space-y-4'>
              <div className='aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300'>
                <div className='text-center'>
                  <div className='text-6xl mb-3 text-slate-400'>🏛️</div>
                  <p className='text-slate-500 font-medium'>组织架构图</p>
                  <p className='text-sm text-slate-400 mt-1'>Organizational Chart</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 各部门介绍 Section - 包含职责列表 */}
      <section className='max-w-6xl mx-auto px-6 pb-16'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-semibold text-slate-900'>学生会部门</h2>
          <span className='text-sm text-slate-400'>
            Six Departments of Student Union
          </span>
        </div>
        
        <div className='space-y-6'>
          {departmentItems.map((dept) => (
            <div
              key={dept.id}
              className='rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow'
            >
              <div className='flex flex-col lg:flex-row gap-6'>
                {/* 左侧图片空间 */}
                <div className='flex-shrink-0'>
                  <div className={`w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden ${dept.color} flex items-center justify-center`}>
                    {dept.imageUrl ? (
                      <Image 
                        src={dept.imageUrl} 
                        alt={dept.name}
                        width={160}
                        height={160}
                        className='object-cover w-full h-full'
                      />
                    ) : (
                      <div className='text-4xl font-bold text-slate-400'>
                        {dept.name.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* 右侧内容区域 */}
                <div className='flex-1'>
                  {/* 部门名称和英文名 */}
                  <div className='mb-3'>
                    <h3 className='text-xl font-semibold text-slate-900'>
                      {dept.name}
                    </h3>
                    {dept.name_en && (
                      <p className='text-sm text-slate-500'>{dept.name_en}</p>
                    )}
                  </div>
                  
                  {/* 角色定位 */}
                  {dept.role && (
                    <p className='text-base text-slate-700 leading-relaxed mb-3'>
                      <span className='font-medium'>角色定位：</span>
                      {dept.role}
                    </p>
                  )}
                  
                  {/* 对社区的意义 */}
                  <p className='text-sm text-slate-600 bg-slate-50 p-3 rounded-lg mb-3'>
                    <span className='font-medium text-slate-700'>✨ 对社区的意义：</span>
                    {dept.summary}
                  </p>
                  
                  {/* 职责列表 */}
                  {dept.responsibilities && dept.responsibilities.length > 0 && (
                    <div className='mb-3'>
                      <p className='text-sm font-semibold text-slate-800 mb-2'>📋 主要职责：</p>
                      <ul className='space-y-1'>
                        {dept.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className='text-sm text-slate-600 flex items-start gap-2'>
                            <span className='text-primary-500 mt-0.5'>•</span>
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* 详细描述（可选） */}
                  {dept.description && (
                    <p className='text-sm text-slate-500 mt-2 pt-2 border-t border-slate-100'>
                      {dept.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 如何参与 Section */}
      <section className='max-w-6xl mx-auto px-6 pb-16'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-semibold text-slate-900'>如何参与</h2>
          <span className='text-sm text-slate-400'>
            Get Involved
          </span>
        </div>
        
        <div className='rounded-2xl bg-white border border-slate-100 p-8 shadow-sm'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* 参与方式 1 */}
            <div className='p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl'>
              <div className='text-3xl mb-3'>📝</div>
              <h3 className='text-lg font-semibold text-slate-900 mb-2'>
                <span className='block'>加入部门</span>
                <span className='text-sm font-normal text-slate-500'>Join a Department</span>
              </h3>
              <p className='text-sm text-slate-600'>
                <span className='block mb-1'>每学期初进行招新，可根据兴趣选择心仪的部门报名面试。欢迎所有有热情、有想法的同学加入。</span>
                <span className='block text-xs text-slate-500 mt-1'>Recruitment takes place at the beginning of each semester. You can choose your preferred department based on interests and sign up for interviews. All passionate and creative students are welcome.</span>
              </p>
            </div>
            
            {/* 参与方式 2 */}
            <div className='p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl'>
              <div className='text-3xl mb-3'>🎯</div>
              <h3 className='text-lg font-semibold text-slate-900 mb-2'>
                <span className='block'>参与活动</span>
                <span className='text-sm font-normal text-slate-500'>Participate in Activities</span>
              </h3>
              <p className='text-sm text-slate-600'>
                <span className='block mb-1'>积极参加学生会组织的各类活动，在活动中锻炼自己，结识朋友，丰富校园生活。</span>
                <span className='block text-xs text-slate-500 mt-1'>Actively participate in various activities organized by the Student Union, develop yourself, make friends, and enrich campus life.</span>
              </p>
            </div>
            
            {/* 参与方式 3 */}
            <div className='p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl'>
              <div className='text-3xl mb-3'>💡</div>
              <h3 className='text-lg font-semibold text-slate-900 mb-2'>
                <span className='block'>提出建议</span>
                <span className='text-sm font-normal text-slate-500'>Make Suggestions</span>
              </h3>
              <p className='text-sm text-slate-600'>
                <span className='block mb-1'>通过意见箱、公众号等渠道提出建议，参与校园建设，共同创造更好的学习生活环境。</span>
                <span className='block text-xs text-slate-500 mt-1'>Make suggestions through suggestion boxes, official accounts, and other channels, participate in campus development, and work together to create a better learning and living environment.</span>
              </p>
            </div>
          </div>
          
          {/* 行动按钮 */}
          <div className='mt-8 flex flex-wrap gap-4 justify-center'>
            <a
              href='/join'
              className='px-6 py-3 bg-primary-500 text-white rounded-full font-medium hover:bg-primary-600 transition-colors'
            >
              立即报名加入 | Join Now
            </a>
            <a
              href='/activities'
              className='px-6 py-3 border border-slate-200 text-slate-600 rounded-full font-medium hover:border-primary-200 hover:text-primary-600 transition-colors'
            >
              浏览近期活动 | Browse Activities
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page