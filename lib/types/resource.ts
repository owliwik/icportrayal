/**
 * 学习资源类型定义
 */
export interface LearningResource {
  /** 资源ID（数据库主键） */
  id: number
  /** 创建时间 */
  created_at: string
  /** 文件在Supabase Storage中的路径 */
  storage_path: string
  /** 作者/上传者 */
  author: string
  /** 学科分类 */
  category: string
  /** 预计学习时间 */
  time: string
  /** 文件大小（字节） */
  file_size?: number
  /** 下载次数 */
  download_count?: number
  /** 文件类型（前端计算字段） */
  file_type?: FileType
  /** 显示标题（前端计算字段，从文件名提取） */
  display_title?: string
  /** 原始文件名 */
  original_filename?: string
}

/**
 * 资源分类类型定义
 */
export interface ResourceCategory {
  /** 分类ID（用于URL路由） */
  id: string
  /** 分类标题 */
  title: string
  /** 分类描述 */
  description: string
  /** 对应的数据库分类名称数组 */
  db_categories: string[]
}

/**
 * 文件类型枚举
 */
export type FileType = 
  | 'PDF'
  | 'Word'
  | 'PPT'
  | 'Excel'
  | '图片'
  | '视频'
  | '音频'
  | '压缩包'
  | '文本'
  | '其他'

/**
 * 文件扩展名到类型的映射
 */
export const FILE_TYPE_MAP: Record<string, FileType> = {
  // PDF
  'pdf': 'PDF',
  
  // Word
  'doc': 'Word',
  'docx': 'Word',
  'docm': 'Word',
  'dotx': 'Word',
  
  // PPT
  'ppt': 'PPT',
  'pptx': 'PPT',
  'pptm': 'PPT',
  'potx': 'PPT',
  
  // Excel
  'xls': 'Excel',
  'xlsx': 'Excel',
  'xlsm': 'Excel',
  'xltx': 'Excel',
  
  // 图片
  'jpg': '图片',
  'jpeg': '图片',
  'png': '图片',
  'gif': '图片',
  'bmp': '图片',
  'svg': '图片',
  'webp': '图片',
  
  // 视频
  'mp4': '视频',
  'avi': '视频',
  'mov': '视频',
  'wmv': '视频',
  'flv': '视频',
  'mkv': '视频',
  
  // 音频
  'mp3': '音频',
  'wav': '音频',
  'ogg': '音频',
  'm4a': '音频',
  
  // 压缩包
  'zip': '压缩包',
  'rar': '压缩包',
  '7z': '压缩包',
  'tar': '压缩包',
  'gz': '压缩包',
  
  // 文本
  'txt': '文本',
  'md': '文本',
  'json': '文本',
  'xml': '文本',
  'csv': '文本'
}

/**
 * 获取文件类型
 */
export function getFileType(filename: string): FileType {
  const extension = filename.split('.').pop()?.toLowerCase() || ''
  return FILE_TYPE_MAP[extension] || '其他'
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes?: number): string {
  if (!bytes) return '未知大小'
  
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let size = bytes
  let unitIndex = 0
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }
  
  return `${size.toFixed(1)} ${units[unitIndex]}`
}