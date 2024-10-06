import { NextResponse } from 'next/server'
import { adminDB, getSession } from '@/app/api/appwrite'
import { MAIN_DB, PROFILES } from '@/app/api/db'

export const GET = async (req: Request) => {
  const { status, session } = await getSession()
  if (!session) return NextResponse.json(null, { status })

  try {
    const profile = await adminDB.getDocument(MAIN_DB, PROFILES, session.userId)
    return NextResponse.json(profile)
  } catch (error: any) {
    console.log(error)
    return NextResponse.json(null, { status: 500 })
  }
}
