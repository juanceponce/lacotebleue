import nodemailer from 'nodemailer'
import { createClient } from '@supabase/supabase-js'

export const config = { runtime: 'nodejs' }

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const missing = ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'GMAIL_USER', 'GMAIL_APP_PASSWORD'].filter(k => !process.env[k])
  if (missing.length) {
    console.error('Missing env vars:', missing.join(', '))
    return res.status(500).json({ error: `Missing env vars: ${missing.join(', ')}` })
  }

  const data = req.body

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )

  const { error: dbError } = await supabase.from('reservations').insert([{
    name: data.name,
    email: data.email,
    phone: data.phone,
    date: data.date,
    time: data.time,
    party_size: data.party_size,
    occasion: data.occasion,
    notes: data.notes,
    flexible: data.flexible,
    status: 'pending',
  }])

  if (dbError) {
    console.error('Supabase error:', dbError)
    return res.status(500).json({ error: dbError.message })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  const from = `La Côte Bleue <${process.env.GMAIL_USER}>`
  const dateFormatted = new Date(data.date + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  })

  try {
    await transporter.sendMail({
        from,
        to: data.email,
        cc: 'team@lacotebleuepg.com',
        subject: 'Reservation Request Received — La Côte Bleue',
        html: `
          <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1a2332;">
            <div style="background:#1a2332;padding:32px;text-align:center;">
              <h1 style="color:#f5f0e8;font-size:28px;margin:0;letter-spacing:0.05em;">La Côte Bleue</h1>
              <p style="color:#8ba3b8;font-size:12px;margin:8px 0 0;letter-spacing:0.2em;text-transform:uppercase;">Pacific Grove, California</p>
            </div>
            <div style="padding:40px 32px;background:#fdfcf9;border:1px solid #e8e2d9;">
              <h2 style="font-size:22px;color:#1a2332;margin:0 0 8px;">Thank you, ${data.name.split(' ')[0]}.</h2>
              <p style="color:#4a5568;line-height:1.6;margin:0 0 24px;">We've received your reservation request and will confirm shortly.</p>
              <div style="background:#f0f4f8;border-radius:8px;padding:24px;margin-bottom:24px;">
                <table style="width:100%;border-collapse:collapse;font-size:15px;">
                  <tr><td style="padding:6px 0;color:#4a5568;">Date</td><td style="padding:6px 0;font-weight:bold;text-align:right;">${dateFormatted}</td></tr>
                  <tr><td style="padding:6px 0;color:#4a5568;">Time</td><td style="padding:6px 0;font-weight:bold;text-align:right;">${data.time}</td></tr>
                  <tr><td style="padding:6px 0;color:#4a5568;">Party size</td><td style="padding:6px 0;font-weight:bold;text-align:right;">${data.party_size} guest${data.party_size > 1 ? 's' : ''}</td></tr>
                  ${data.occasion && data.occasion !== 'No special occasion' ? `<tr><td style="padding:6px 0;color:#4a5568;">Occasion</td><td style="padding:6px 0;font-weight:bold;text-align:right;">${data.occasion}</td></tr>` : ''}
                </table>
              </div>
              <p style="color:#4a5568;line-height:1.6;font-size:14px;">Questions? Call us at <a href="tel:+18312339286" style="color:#2a5298;">(831) 233-9286</a> or reply to this email.</p>
            </div>
            <div style="padding:20px 32px;text-align:center;background:#f0f4f8;">
              <p style="font-size:12px;color:#8ba3b8;margin:0;">209 Forest Ave, Pacific Grove, CA 93950 &nbsp;·&nbsp; Wed–Mon 4pm–9pm</p>
            </div>
          </div>
        `,
    })
  } catch (emailError: any) {
    console.error('Email error:', emailError?.message)
    // Don't fail — reservation is already saved to DB
  }

  return res.status(200).json({ success: true })
}
