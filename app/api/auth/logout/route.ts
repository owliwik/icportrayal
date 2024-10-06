import { NextResponse } from 'next/server'
import { getAuth } from '@/app/api/appwrite'

export const GET = async (req: Request) => {
  const { status, auth } = await getAuth()
  if (!auth) return NextResponse.json(null, { status })

  try {
    await auth.deleteSession('current')
    return NextResponse.json({}, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(null, { status: error.code })
  }
}
