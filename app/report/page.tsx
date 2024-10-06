import { cache } from 'react'
import { ReportForm } from './ReportForm'
import { adminDB } from '@/app/api/appwrite'
import { MAIN_DB, CLUBS } from '@/app/api/db'
import { Club } from '@/lib/types/club'

const Page = async () => {
  const clubs: Club[] = await cache(async () => {
    const data = await adminDB.listDocuments(MAIN_DB, CLUBS)
    return data.documents as any
  })()

  return (
    <div className='w-full h-fit flex justify-center my-10'>
      <ReportForm clubs={clubs} />
    </div>
  )
}

export default Page
