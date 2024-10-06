import { adminDB, getSession } from '@/app/api/appwrite'
import { NextResponse } from 'next/server'
import { CLUBS, MAIN_DB } from '@/app/api/db'
import { Club } from '@/lib/types/club'

export const GET = async (req: Request) => {
  const { status, session } = await getSession()
  if (!session) return NextResponse.json(null, { status })

  const clubsData: Club[] = (await adminDB.listDocuments(MAIN_DB, CLUBS)).documents as any
  return NextResponse.json(clubsData)
}