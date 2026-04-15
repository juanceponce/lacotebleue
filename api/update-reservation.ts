import { createClient } from '@supabase/supabase-js'

export const config = { runtime: 'nodejs' }

const VALID_STATUSES = ['pending', 'confirmed', 'cancelled']

export default async function handler(req: any, res: any) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const missing = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'].filter(k => !process.env[k])
  if (missing.length) {
    return res.status(500).json({ error: `Missing env vars: ${missing.join(', ')}` })
  }

  const { id, status } = req.body
  if (!id || !status || !VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Invalid id or status' })
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )

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
