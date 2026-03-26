import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export const GET = async (request: Request) => {
  console.log('[API] ========== 开始获取活动列表 ==========')
  
  try {
    const supabase = createServerClient()
    
    // 测试连接 - 直接查询
    console.log('[API] 执行 Supabase 查询...')
    const { data, error, status, statusText } = await supabase
      .from('activities')
      .select('*')
      .order('date', { ascending: false })
    
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
      console.log('[API] 第一条数据:', JSON.stringify(data[0], null, 2))
    } else {
      console.log('[API] 数据库返回空数组，可能原因：')
      console.log('1. 表中确实没有数据')
      console.log('2. RLS 策略阻止了读取')
      console.log('3. 表名或字段名不正确')
    }
    
    return NextResponse.json(data || [], {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error('[API] 活动列表服务器错误:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'