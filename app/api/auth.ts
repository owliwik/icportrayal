import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import * as sdk from 'node-appwrite'

export const useBasicAuth = async () => {
  const secretData = cookies().get('secret')
  if (!secretData) return NextResponse.json({}, { status: 401 })
  const secret = secretData.value
  
  try {
      const sessionClient = new sdk.Client()
  sessionClient
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setSession(secret)

  const auth = new sdk.Account(sessionClient)
  await auth.get()
  } catch (error: any) {
    if (error.code === 401) {
      return NextResponse.json({}, { status: 401 })
    } else {
      return NextResponse.json({}, { status: 500 })
    }
  }
  
}