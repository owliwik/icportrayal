import { NextResponse } from 'next/server'
import { Club } from '@/lib/types/club'
import { createServerClient } from '@/lib/supabase/server'

export const GET = async (req: Request) => {
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length)
    : undefined
  const supabase = createServerClient(token)
  const { data, error } = await supabase
    .from('clubs')
    .select(
      'id,name,aliasName,isOfficial,leaders,contact,description,type,activityDay,activityPlace,activityIntro,profileImageID'
    )
  if (error) return NextResponse.json(null, { status: 500 })
  const clubs = (data ?? []).map((club) => ({
    ...club,
    $id: (club as { $id?: string; id?: string }).$id || club.id,
  })) as Club[]
  return NextResponse.json(clubs)
}
