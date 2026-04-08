export interface Reservation {
  name: string
  email: string
  phone: string
  date: string
  time: string
  party_size: number
  occasion: string
  notes: string
  flexible: boolean
}

// In-memory fallback for local development without API server
const localStore: Reservation[] = []

export async function submitReservation(data: Reservation): Promise<void> {
  try {
    const res = await fetch('/api/send-reservation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error || 'Request failed')
    }
  } catch (err: any) {
    // Fallback for local dev without Vercel API server running
    if (err?.message?.includes('fetch') || err?.message?.includes('Failed to fetch')) {
      localStore.push(data)
      console.log('[Local mock] Reservation saved:', data)
      await new Promise(res => setTimeout(res, 500))
      return
    }
    throw err
  }
}
