import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export const GET = async (req: Request) => {
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length)
    : null
  if (!token) return NextResponse.json(null, { status: 401 })

  try {
    const supabase = createServerClient(token)
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json(null, { status: 401 })
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    if (error) {
      return NextResponse.json(null, { status: 500 })
    }

    return NextResponse.json(profile)
  } catch (error: any) {
    console.log(error)
    return NextResponse.json(null, { status: 500 })
  }
}
