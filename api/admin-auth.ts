export const config = { runtime: 'nodejs' }

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD env var not set' })
  }

  const { password } = req.body
  if (!password || password !== adminPassword) {
    return res.status(401).json({ error: 'Incorrect password' })
  }

  return res.status(200).json({ ok: true })
}
