export const config = { runtime: 'nodejs' }

export default function handler(req: any, res: any) {
  const keys = Object.keys(process.env).filter(k =>
    k.includes('SUPABASE') || k.includes('RESEND')
  )
  return res.status(200).json({ found: keys })
}
