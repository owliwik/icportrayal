import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://fxehqztapwouuyvpafce.supabase.co'
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4ZWhxenRhcHdvdXV5dnBhZmNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzMzIwNzMsImV4cCI6MjA0NDkwODA3M30.Kz57Zdm-O0oImL2DTylCR9cTTqB6IDZ_SmBy7abg44s'

export const createServerClient = (accessToken?: string) => {
  const headers: Record<string, string> = {}
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers,
      fetch: (input, init) =>
        fetch(input, {
          ...init,
          cache: 'no-store',
        }),
    },
  })
}
