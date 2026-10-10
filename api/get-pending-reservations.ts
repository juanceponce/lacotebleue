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

  const supabase = createClient(process.env.SUPABASE_URL!, supabaseKey)

  let query = supabase
    .from('reservations')
    .select('id, name, party_size, date, time, occasion, status, notes, phone, email, flexible')
    .eq('status', 'pending')
    .order('date', { ascending: true })

  const from = req.query.from as string
  if (from && /^\d{4}-\d{2}-\d{2}$/.test(from)) {
    query = query.gte('date', from)
  }

  const { data, error } = await query

  if (error) {
    console.error('Supabase error:', error)
    return res.status(500).json({ error: error.message })
  }

  return res.status(200).json({ reservations: data ?? [] })
}
