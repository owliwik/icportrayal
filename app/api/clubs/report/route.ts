import { ClubActivity } from '@/lib/types/club'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const data: ClubActivity = await req.formData() as any
  console.log(data)
  return NextResponse.json({ message: 'ok' })
}