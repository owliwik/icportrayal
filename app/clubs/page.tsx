import { ClubPageClient } from './ClubPageClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '社团列表 | IC Club',
  description: '探索我们学校的各种社团活动',
}

export default function ClubsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <ClubPageClient />
      </div>
    </div>
  )
}