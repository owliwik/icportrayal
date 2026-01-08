import { NextResponse } from 'next/server'
import { CLUB_PROFILE_IMAGES } from '@/app/api/bucket'
import { createServerClient } from '@/lib/supabase/server'

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const supabase = createServerClient()
  const { data, error } = await supabase.storage
    .from(CLUB_PROFILE_IMAGES)
    .download(params.id)

  if (error || !data) {
    return NextResponse.json(null, { status: 404 })
  }

  return new NextResponse(data, {
    headers: {
      'content-type': data.type || 'image/*',
      'cache-control': 'public, max-age=3600',
    },
  })
}
