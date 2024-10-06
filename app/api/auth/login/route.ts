import * as sdk from 'node-appwrite'
import { NextResponse } from 'next/server'
import { adminClient } from '@/app/api/appwrite'
import { cookies } from 'next/headers'

import { invalid_credentials_error_msg, server_error_msg } from '@/lang/auth'

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json()
    const auth = new sdk.Account(adminClient)
    const session = await auth.createEmailPasswordSession(email, password)

    const isProduction = process.env.NODE_ENV === 'production'
    const setCookie = (key: string, value: string) => {
      cookies().set(key, value, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'strict',
        maxAge: Math.floor(
          (new Date(session.expire).getTime() - Date.now()) / 1000
        ),
        path: '/',
      })
    }

    setCookie('sessionID', session.$id)
    setCookie('secret', session.secret)

    return NextResponse.json(session, {
      status: 200,
    })
  } catch (error: any) {
    console.log(error)
    if (error.code === 401) {
      return NextResponse.json(
        { error: invalid_credentials_error_msg },
        { status: 401 }
      )
    } else {
      return NextResponse.json({ error: server_error_msg }, { status: 500 })
    }
  }
}
