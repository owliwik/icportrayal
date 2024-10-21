import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://fxehqztapwouuyvpafce.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4ZWhxenRhcHdvdXV5dnBhZmNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzMzIwNzMsImV4cCI6MjA0NDkwODA3M30.Kz57Zdm-O0oImL2DTylCR9cTTqB6IDZ_SmBy7abg44s'
)