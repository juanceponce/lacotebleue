import { supabase } from '../lib/supabase'

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

// In-memory fallback for local development without Supabase configured
const localStore: Reservation[] = []

export async function submitReservation(data: Reservation): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from('reservations').insert([{
      ...data,
      status: 'pending',
    }])
    if (error) throw new Error(error.message)
  } else {
    // Local mock — stores in memory, logs to console
    localStore.push(data)
    console.log('[Local mock] Reservation saved:', data)
    console.log('[Local mock] All reservations:', localStore)
    await new Promise(res => setTimeout(res, 500)) // simulate network delay
  }
}
