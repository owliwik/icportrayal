'use client'

export function storeJSON(key: string, value: Object) {
  if (!key || !value) return
  const data = JSON.stringify(value)
  localStorage.setItem(key, data)
}

export function getJSON(key: string) {
  const result = localStorage.getItem(key)
  let value
  try {
    value = result ? JSON.parse(result) : null
  } catch (error) {
    return null
  }

  return value
}
