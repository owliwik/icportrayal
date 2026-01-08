// app/api/clubs/route.ts
import { NextResponse } from 'next/server'
import { Club } from '@/lib/types/club'
import { createServerClient } from '@/lib/supabase/server'

export const GET = async () => {
  console.log('🔄 [API] 开始获取社团数据')
  
  try {
    const supabase = createServerClient()
    
    console.time('[API] supabase-query')
    
    // 只选择必要的字段，避免获取大文本字段
    const { data, error } = await supabase
      .from('clubs')
      .select(`
        id,
        created_at,
        name,
        aliasName,
        leaders,
        type,
        isOfficial,
        activityDay,
        activityPlace,
        profileImageID
      `)
      .order('name', { ascending: true })
    
    console.timeEnd('[API] supabase-query')
    
    if (error) {
      console.error('[API] 数据库查询错误:', {
        code: error.code,
        message: error.message,
        details: error.details
      })
      
      if (error.code === '57014' || error.message.includes('timeout')) {
        console.log('[API] 查询超时，返回简化数据')
        
        // 尝试一个更简单的查询
        const { data: simpleData, error: simpleError } = await supabase
          .from('clubs')
          .select('id, name, type, leaders, isOfficial')
          .limit(50)
          .order('name')
        
        if (simpleError || !simpleData) {
          return NextResponse.json(getMockClubs(), {
            headers: {
              'Cache-Control': 'no-store',
              'X-Data-Source': 'mock-timeout-fallback'
            }
          })
        }
        
        const simpleClubs = simpleData.map(item => createBasicClub(item))
        return NextResponse.json(simpleClubs, {
          headers: {
            'Cache-Control': 'public, max-age=300',
            'X-Data-Source': 'simple-query'
          }
        })
      }
      
      return NextResponse.json(getMockClubs(), {
        headers: {
          'Cache-Control': 'no-store',
          'X-Data-Source': 'mock-error-fallback'
        }
      })
    }
    
    console.log(`[API] 成功获取 ${data?.length || 0} 条记录`)
    
    if (!data || data.length === 0) {
      return NextResponse.json(getMockClubs(), {
        headers: {
          'Cache-Control': 'no-store',
          'X-Data-Source': 'mock-empty'
        }
      })
    }
    
    console.time('[API] data-transform')
    
    // 转换数据 - 只包含基本字段
    const clubs: Club[] = data.map((item: any) => {
      return {
        $id: item.id,
        name: item.name || '未命名社团',
        aliasName: item.aliasName || undefined,
        isOfficial: item.isOfficial || false,
        leaders: Array.isArray(item.leaders) ? item.leaders : [],
        type: item.type || '',
        activityDay: (item.activityDay && isValidDay(item.activityDay)) 
          ? item.activityDay as Club['activityDay'] 
          : undefined,
        activityPlace: item.activityPlace || '',
        profileImageID: item.profileImageID || undefined,
        // 简化其他字段
        contact: '',
        description: '',
        activityIntro: '',
        createdAt: item.created_at || new Date().toISOString(),
        updatedAt: item.created_at || new Date().toISOString(),
      }
    })
    
    console.timeEnd('[API] data-transform')
    console.log(`[API] 成功转换 ${clubs.length} 个社团`)
    
    const response = NextResponse.json(clubs, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=60, s-maxage=120',
        'X-Total-Count': clubs.length.toString(),
        'X-Data-Source': 'database'
      }
    })
    
    return response
    
  } catch (error: any) {
    console.error('[API] 服务器错误:', error)
    return NextResponse.json(getMockClubs(), {
      headers: {
        'Cache-Control': 'no-store',
        'X-Data-Source': 'mock-catch-all'
      }
    })
  }
}

// 辅助函数
function isValidDay(day: string): boolean {
  const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  return validDays.includes(day.trim())
}

function createBasicClub(item: any): Club {
  return {
    $id: item.id || `basic-${Math.random()}`,
    name: item.name || '社团',
    aliasName: undefined,
    isOfficial: item.isOfficial || false,
    leaders: Array.isArray(item.leaders) ? item.leaders : [],
    type: item.type || '',
    contact: '',
    description: '',
    activityDay: undefined,
    activityPlace: '',
    activityIntro: '',
    profileImageID: undefined,
  }
}

// 模拟数据函数（保持之前的）
function getMockClubs(): Club[] {
  // ... 保持之前的 mock 数据
  return []
}

export const dynamic = 'force-dynamic'