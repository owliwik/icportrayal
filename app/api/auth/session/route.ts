import { NextResponse } from 'next/server'
import * as sdk from 'node-appwrite'
import { getSession } from '@/app/api/appwrite'
import { cookies } from 'next/headers'

export const GET = async (req: Request) => {
  const { status, session } = await getSession()
  return NextResponse.json(session, { status })
}
