export const config = { runtime: 'nodejs' }

export default function handler(req: any, res: any) {
  const all = Object.keys(process.env)
  const relevant = all.filter(k => k.includes('SUPABASE') || k.includes('RESEND'))
  return res.status(200).json({ relevant, totalKeys: all.length })
}
