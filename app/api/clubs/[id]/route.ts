import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export const GET = async (
  _request: Request,
  { params }: { params: { id: string } }
) => {
  const clubId = params.id

  if (!clubId) {
    return NextResponse.json(
      { description: '', activityIntro: '' },
      { status: 400 }
    )
  }

  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('clubs')
      .select('description, activityIntro')
      .eq('id', clubId)
      .maybeSingle()

    if (error) {
      console.error('[API] 详情查询错误:', error)
      return NextResponse.json(
        { description: '', activityIntro: '' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        description: data?.description || '',
        activityIntro: data?.activityIntro || '',
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    )
  } catch (error) {
    console.error('[API] 详情服务器错误:', error)
    return NextResponse.json(
      { description: '', activityIntro: '' },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'
