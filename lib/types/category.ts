export type ClubCategory = 'sports' | 'academic' | 'interests'

export const CATEGORY_LABELS: { value: ClubCategory; label: string }[] = [
  { value: 'sports', label: '运动类' },
  { value: 'academic', label: '学术类' },
  { value: 'interests', label: '兴趣类' },
]

export const CATEGORY_TYPE_MATCHERS: Record<ClubCategory, string[]> = {
  sports: ['sports', 'sport', '运动', '体育'],
  academic: ['academic', 'acadamic', '学术', '学习'],
  interests: ['interests', 'interest', '兴趣', '娱乐', '文化'],
}