import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://txdegpgoldnlkvpnxbnd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4ZGVncGdvbGRubGt2cG54Ym5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MjYyOTUsImV4cCI6MjA4NjIwMjI5NX0.cWi-bHYL2zqzl4mX5corhbdBHEDxJyrQtOwUSfHnJ0M'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
