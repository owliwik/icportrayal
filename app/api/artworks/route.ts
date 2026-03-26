// app/api/artworks/route.ts
import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export const GET = async (request: Request) => {
  console.log('[API] ========== 开始获取艺术作品列表 ==========')
  
  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    
    // 获取查询参数
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    
    let query = supabase
      .from('artworks') // 修正：表名是 artworks
      .select('*')
      .order('created_at', { ascending: false })
    
    // 应用筛选条件 - 使用正确的字段名 category
    if (category) {
      query = query.eq('category', category)
    }
    
    if (search) {
      query = query.or(`title.ilike.%${search}%,name.ilike.%${search}%`)
    }
    
    const { data, error, status, statusText } = await query
    
    console.log('[API] 查询完成，状态:', { status, statusText })
    
    if (error) {
      console.error('[API] Supabase 查询错误:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return NextResponse.json(
        { error: error.message, details: error.details },
        { status: 500 }
      )
    }
    
    console.log('[API] 查询成功，返回数据条数:', data?.length || 0)
    
    if (data && data.length > 0) {
      console.log('[API] 第一条数据示例:', data[0])
    }
    
    return NextResponse.json(data || [], {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error('[API] 艺术作品列表服务器错误:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'