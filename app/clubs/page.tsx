import { Club } from '@/lib/types/club'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { ClubGrid } from './ClubGrid'
import { getSession } from '@/app/api/appwrite'
import { redirect } from 'next/navigation'
import { adminDB } from '@/app/api/appwrite'
import { CLUBS, MAIN_DB } from '../api/db'
import { unstable_cache } from 'next/cache'

const getClubs = unstable_cache(
  async () => {
    const data = await adminDB.listDocuments(MAIN_DB, CLUBS)
    return data.documents as any
  },
  [],
  { revalidate: 3600 }
)

const Page = async () => {
  const { status } = await getSession()
  if (status === 401) {
    redirect('/auth/login')
  }

  const clubs: Club[] = await getClubs()

  return (
    <div className='w-full h-full flex flex-col items-center'>
      <div className='w-[60rem] flex justify-center my-16 relative'>
        <div className='text-4xl font-thin'>Our Clubs · 我们的社团</div>
        <div className='absolute right-0'>
          <Link href='/report'>
            <Button color='primary'>活动打卡</Button>
          </Link>
        </div>
      </div>

      <ClubGrid clubs={clubs} />
    </div>
  )
}

export default Page
