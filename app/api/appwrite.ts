import { cookies } from 'next/headers'
import * as sdk from 'node-appwrite'

let adminClient = new sdk.Client()

adminClient
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_SECRET_KEY!)

if (process.env.NODE_ENV === 'development') {
  console.log('WARNING: Appwrite certificate will be self-signed.')
  adminClient.setSelfSigned(true)
}

let adminDB = new sdk.Databases(adminClient)
let adminStorage = new sdk.Storage(adminClient)

const getAuth = async (): Promise<{
  status: number
  auth: sdk.Account | null
}> => {
  const secretData = cookies().get('secret')
  if (!secretData) return { status: 401, auth: null }
  const secret = secretData.value

  try {
    const sessionClient = new sdk.Client()
    sessionClient
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
      .setSession(secret)

    const auth = new sdk.Account(sessionClient)
    return { status: 200, auth }
  } catch (error: any) {
    return { status: error.code, auth: null }
  }
}

const getSession = async (): Promise<{
  status: number
  session: sdk.Models.Session | null
}> => {
  const { status, auth } = await getAuth()
  if (!auth) return { status, session: null }

  try {
    const session = await auth.getSession('current')
    return { status: 200, session: session }
  } catch (error: any) {
    return { status: error.code, session: null }
  }
}

export { adminClient, adminDB, adminStorage, getSession, getAuth }
