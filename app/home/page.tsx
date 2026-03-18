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

      {/* 各部门介绍 Section (原有的) */}
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
              className='rounded-2xl bg-white border border-slate-100 p-6 shadow-sm'
            >
              <div className='flex flex-col md:flex-row gap-6'>
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
                
                {/* 右侧文字简介 */}
                <div className='flex-1 flex flex-col justify-center'>
                  <div className='flex items-center gap-3 mb-2'>
                    <h3 className='text-xl font-semibold text-slate-900'>
                      {dept.name}
                    </h3>
                  </div>
                  <p className='text-sm text-slate-500 mb-3'>
                    <span className='block'>{dept.summary}</span>
                    <span className='block text-xs text-slate-400 mt-1'>{dept.summary_en || dept.summary}</span>
                  </p>
                  <p className='text-base text-slate-700 leading-relaxed'>
                    <span className='block mb-2'>{dept.description}</span>
                    <span className='block text-sm text-slate-500'>{dept.description_en || dept.description}</span>
                  </p>
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
                <span className='block text-xs text-slate-500 mt-1'>Make suggestions through suggestion boxes, official accounts, and other channels, participate in campus development, and共同创造 a better learning and living environment.</span>
              </p>
            </div>
          </div>
          
          {/* 预留文字空间的提示 */}
          <div className='mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 text-blue-700 text-sm'>
            <div className='font-medium mb-1'>预留文字空间 | Reserved Space</div>
            <div className='text-blue-600'>这里可以添加详细的参与指南、招新时间表、报名方式、联系方式等信息。</div>
            <div className='text-blue-600 mt-1'>Detailed participation guidelines, recruitment schedule, registration methods, contact information, etc., can be added here.</div>
          </div>
          
        </div>
      </section>
    </div>
  )
}

export default Page