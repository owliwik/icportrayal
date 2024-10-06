import { NextResponse } from 'next/server'
import { adminStorage } from '@/app/api/appwrite'
import { CLUB_PROFILE_IMAGES } from '@/app/api/bucket'

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const file = await adminStorage.getFileView(CLUB_PROFILE_IMAGES, params.id)
  return new NextResponse(file, { headers: {
    'content-type': 'image'
  } })
}
