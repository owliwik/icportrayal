// app/api/artworks/[id]/route.ts
import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export const GET = async (
  _request: Request,
  { params }: { params: { id: string } }
) => {
  const artworkId = params.id

  if (!artworkId) {
    return NextResponse.json(
      { error: 'Artwork ID is required' },
      { status: 400 }
    )
  }

  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('artworks') // 修正：表名是 artworks
      .select('*')
      .eq('id', artworkId)
      .maybeSingle()

    if (error) {
      console.error('[API] 作品详情查询错误:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Artwork not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error('[API] 作品详情服务器错误:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'