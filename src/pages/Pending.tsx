import { useState, useEffect, useCallback } from 'react'
import AdminAuthGate from '../components/AdminAuthGate'

interface Reservation {
  id: string
  name: string
  party_size: number
  date: string
  time: string
  occasion: string
  status: string
  notes: string
  phone: string
  email: string
  flexible: boolean
}

function parseHour(time: string): number {
  const [t, meridiem] = time.split(' ')
  const [h] = t.split(':').map(Number)
  if (meridiem === 'PM' && h !== 12) return h + 12
  if (meridiem === 'AM' && h === 12) return 0
  return h
}

function formatDisplayDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  })
}

export default function Pending() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_authed') === '1')

  if (!authed) return <AdminAuthGate title="Pending Reservations" onAuth={() => setAuthed(true)} />
  return <PendingTable />
}

function PendingTable() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const fetchReservations = useCallback(() => {
    setLoading(true)
    setError('')
    fetch('/api/get-pending-reservations')
      .then(r => r.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        const sorted = [...data.reservations].sort((a, b) =>
          a.date === b.date ? parseHour(a.time) - parseHour(b.time) : a.date.localeCompare(b.date)
        )
        setReservations(sorted)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetchReservations()
  }, [fetchReservations])

  const confirmReservation = async (id: string) => {
    setUpdatingId(id)
    try {
      const res = await fetch('/api/update-reservation', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'confirmed' }),
      })
      if (!res.ok) throw new Error('Update failed')
      setReservations(prev => prev.filter(r => r.id !== id))
    } catch {
      // silently ignore — row stays, user can retry
    } finally {
      setUpdatingId(null)
    }
  }

  const totalGuests = reservations.reduce((sum, r) => sum + r.party_size, 0)

  return (
    <div className="min-h-screen bg-sand-100 font-sans">
      {/* Header */}
      <header className="bg-marine-900 text-sand-50 px-6 py-5 flex items-center justify-between">
        <div>
          <p className="text-xs tracking-widest uppercase text-marine-300 mb-0.5">La Côte Bleue</p>
          <h1 className="font-serif text-2xl">Pending Reservations</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-marine-300">
            {reservations.length} unconfirmed &middot; {totalGuests} guest{totalGuests !== 1 ? 's' : ''}
          </span>
          <button
            onClick={fetchReservations}
            disabled={loading}
            title="Refresh"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-marine-800 text-marine-300 hover:text-sand-50 transition-colors disabled:opacity-40"
          >
            <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 mb-6">
            {error}
          </div>
        )}

        {!loading && !error && reservations.length === 0 && (
          <div className="text-center py-20">
            <p className="text-ink-400 text-sm">No pending reservations. Everything is confirmed.</p>
          </div>
        )}

        {!error && reservations.length > 0 && (
          <div className="bg-white rounded-xl border border-sand-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sand-200 text-left text-xs font-semibold tracking-wider uppercase text-ink-400">
                  <th className="px-4 py-3 whitespace-nowrap">Date</th>
                  <th className="px-4 py-3 whitespace-nowrap">Time</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3 whitespace-nowrap">Party</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Occasion</th>
                  <th className="px-4 py-3">Notes</th>
                  <th className="px-4 py-3 whitespace-nowrap text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map(r => (
                  <tr key={r.id} className="border-b border-sand-100 last:border-0 hover:bg-sand-50 transition-colors align-top">
                    <td className="px-4 py-3 whitespace-nowrap text-ink-700">{formatDisplayDate(r.date)}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-semibold text-marine-900 tabular-nums">{r.time}</td>
                    <td className="px-4 py-3 font-medium text-ink-900">{r.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-ink-600">{r.party_size}</td>
                    <td className="px-4 py-3">
                      <a href={`tel:${r.phone}`} className="text-marine-700 hover:underline block whitespace-nowrap">{r.phone}</a>
                      <a href={`mailto:${r.email}`} className="text-marine-700 hover:underline block truncate max-w-[200px]">{r.email}</a>
                    </td>
                    <td className="px-4 py-3 text-ink-600">
                      {r.occasion && r.occasion !== 'No special occasion' ? r.occasion : <span className="text-ink-300">—</span>}
                      {r.flexible && (
                        <span className="block text-xs text-foam-700 bg-foam-100 px-2 py-0.5 rounded-full mt-1 inline-block">Flexible</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-ink-600 max-w-[220px]">
                      {r.notes?.trim() || <span className="text-ink-300">—</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <label className="inline-flex items-center gap-2 cursor-pointer select-none" title="Toggle to confirmed">
                        <span className="text-xs font-medium text-amber-700">Pending</span>
                        <span className="relative inline-block w-10 h-5">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={false}
                            disabled={updatingId === r.id}
                            onChange={() => confirmReservation(r.id)}
                          />
                          <span className="absolute inset-0 rounded-full bg-amber-200 transition-colors" />
                          <span className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform" />
                        </span>
                        <span className="text-xs font-medium text-ink-400">Confirmed</span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
