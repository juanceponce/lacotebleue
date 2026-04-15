import { createClient } from '@supabase/supabase-js'

export const config = { runtime: 'nodejs' }

const VALID_STATUSES = ['pending', 'confirmed', 'cancelled']

export default async function handler(req: any, res: any) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY
  if (!process.env.SUPABASE_URL || !supabaseKey) {
    return res.status(500).json({ error: 'Missing Supabase config' })
  }

  const { id, status } = req.body
  if (!id || !status || !VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Invalid id or status' })
  }

  const supabase = createClient(process.env.SUPABASE_URL, supabaseKey)

  const { error } = await supabase
    .from('reservations')
    .update({ status })
    .eq('id', id)

  if (error) {
    console.error('Supabase error:', error)
    return res.status(500).json({ error: error.message })
  }

  return res.status(200).json({ ok: true })
}
