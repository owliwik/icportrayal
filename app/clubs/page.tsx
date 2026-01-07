import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { Club } from '@/lib/types/club'
import { adminDB, getSession } from '@/app/api/appwrite'
import { CLUBS, MAIN_DB } from '@/app/api/db'
import { ClubPageClient } from './ClubPageClient'

const Page = async () => {
  let clubs: Club[] = []
  const { session } = await getSession()
  if (session) {
    const data = await adminDB.listDocuments(MAIN_DB, CLUBS)
    clubs = data.documents as unknown as Club[]
  }

  return (
    <div className='w-full h-full flex flex-col items-center'>
      <div className='w-[60rem] flex justify-center my-16 relative'>
        <div className='text-4xl font-thin'>Our Clubs</div>
        <div className='absolute right-0'>
          <Link href='/report'>
            <Button color='primary'>活动打卡</Button>
          </Link>
        </div>
      </div>

      <ClubPageClient clubs={clubs} />
    </div>
  )
}

export default Page
