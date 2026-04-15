import { createClient } from '@supabase/supabase-js'

export const config = { runtime: 'nodejs' }

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const missing = ['SUPABASE_URL'].filter(k => !process.env[k])
  if (missing.length) {
    return res.status(500).json({ error: `Missing env vars: ${missing.join(', ')}` })
  }

  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY
  if (!supabaseKey) {
    return res.status(500).json({ error: 'Missing Supabase key' })
  }

  const date = req.query.date as string
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: 'Invalid or missing date param (YYYY-MM-DD)' })
  }

  const supabase = createClient(process.env.SUPABASE_URL!, supabaseKey)

  const { data, error } = await supabase
    .from('reservations')
    .select('id, name, party_size, time, occasion, status, notes, phone, email, flexible')
    .eq('date', date)
    .order('time', { ascending: true })

  if (error) {
    console.error('Supabase error:', error)
    return res.status(500).json({ error: error.message })
  }

  return res.status(200).json({ reservations: data ?? [] })
}
