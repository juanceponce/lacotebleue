import { useState, useEffect, useCallback } from 'react'

interface Reservation {
  id: string
  name: string
  party_size: number
  time: string
  occasion: string
  status: string
  notes: string
  phone: string
  email: string
  flexible: boolean
}

interface TimeBlock {
  label: string
  hour: number
  reservations: Reservation[]
}

const TIME_BLOCKS = [
  { label: '4:00 – 5:00 PM', hour: 16 },
  { label: '5:00 – 6:00 PM', hour: 17 },
  { label: '6:00 – 7:00 PM', hour: 18 },
  { label: '7:00 – 8:00 PM', hour: 19 },
  { label: '8:00 – 9:00 PM', hour: 20 },
]

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-600',
}

const STATUS_BTN: Record<string, string> = {
  pending: 'border-amber-300 text-amber-700 hover:bg-amber-50',
  confirmed: 'border-emerald-300 text-emerald-700 hover:bg-emerald-50',
  cancelled: 'border-red-300 text-red-600 hover:bg-red-50',
}

function parseHour(time: string): number {
  const [t, meridiem] = time.split(' ')
  const [h] = t.split(':').map(Number)
  if (meridiem === 'PM' && h !== 12) return h + 12
  if (meridiem === 'AM' && h === 12) return 0
  return h
}

function toLocalDateString(d: Date): string {
  return d.toLocaleDateString('en-CA')
}

function formatDisplayDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  })
}

// ─── Auth gate ────────────────────────────────────────────────────────────────

function AuthGate({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Incorrect password')
      }
      sessionStorage.setItem('admin_authed', '1')
      onAuth()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-sand-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-xs tracking-widest uppercase text-ink-400 mb-1">La Côte Bleue</p>
          <h1 className="font-serif text-2xl text-marine-900">Admin Access</h1>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-sand-200 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-sand-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-marine-400"
              placeholder="Enter admin password"
              autoFocus
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-marine-900 text-sand-50 rounded-lg py-2.5 text-sm font-medium hover:bg-marine-800 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Checking…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_authed') === '1')

  if (!authed) return <AuthGate onAuth={() => setAuthed(true)} />
  return <Dashboard />
}

function Dashboard() {
  const [date, setDate] = useState(toLocalDateString(new Date()))
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const fetchReservations = useCallback(() => {
    setLoading(true)
    setError('')
    fetch(`/api/get-reservations?date=${date}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        setReservations(data.reservations)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [date])

  useEffect(() => {
    fetchReservations()
    setExpandedId(null)
  }, [fetchReservations])

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id)
    try {
      const res = await fetch('/api/update-reservation', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      if (!res.ok) throw new Error('Update failed')
      setReservations(prev =>
        prev.map(r => r.id === id ? { ...r, status } : r)
      )
    } catch {
      // silently ignore — user can refresh
    } finally {
      setUpdatingId(null)
    }
  }

  const shiftDate = (days: number) => {
    const [y, m, d] = date.split('-').map(Number)
    setDate(toLocalDateString(new Date(y, m - 1, d + days)))
  }

  const blocks: TimeBlock[] = TIME_BLOCKS.map(block => ({
    ...block,
    reservations: reservations.filter(r => parseHour(r.time) === block.hour),
  }))

  const totalGuests = reservations.reduce((sum, r) => sum + r.party_size, 0)

  return (
    <div className="min-h-screen bg-sand-100 font-sans">
      {/* Header */}
      <header className="bg-marine-900 text-sand-50 px-6 py-5 flex items-center justify-between">
        <div>
          <p className="text-xs tracking-widest uppercase text-marine-300 mb-0.5">La Côte Bleue</p>
          <h1 className="font-serif text-2xl">Reservations</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-marine-300">
            {reservations.length} table{reservations.length !== 1 ? 's' : ''} &middot; {totalGuests} guest{totalGuests !== 1 ? 's' : ''}
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

      {/* Date nav */}
      <div className="bg-white border-b border-sand-200 px-6 py-3 flex items-center gap-3">
        <button
          onClick={() => shiftDate(-1)}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-sand-100 text-ink-500 transition-colors"
          aria-label="Previous day"
        >
          &#8592;
        </button>
        <div className="flex items-center gap-3 flex-1">
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="text-sm font-medium text-marine-900 border border-sand-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-marine-400"
          />
          <span className="text-sm text-ink-500 hidden sm:block">{formatDisplayDate(date)}</span>
        </div>
        <button
          onClick={() => setDate(toLocalDateString(new Date()))}
          className="text-xs font-medium px-3 py-1.5 rounded-full bg-marine-900 text-sand-50 hover:bg-marine-800 transition-colors"
        >
          Today
        </button>
        <button
          onClick={() => shiftDate(1)}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-sand-100 text-ink-500 transition-colors"
          aria-label="Next day"
        >
          &#8594;
        </button>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 mb-6">
            {error}
          </div>
        )}

        {!loading && !error && reservations.length === 0 && (
          <div className="text-center py-20">
            <p className="text-ink-400 text-sm">No reservations for this date.</p>
          </div>
        )}

        {!error && reservations.length > 0 && (
          <div className="space-y-8">
            {blocks.filter(b => b.reservations.length > 0).map(block => (
              <div key={block.hour}>
                {/* Block header */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold tracking-wider uppercase text-ink-400">
                    {block.label}
                  </span>
                  <div className="flex-1 h-px bg-sand-200" />
                  <span className="text-xs text-ink-400">
                    {block.reservations.length} table{block.reservations.length !== 1 ? 's' : ''}
                    &nbsp;&middot;&nbsp;
                    {block.reservations.reduce((s, r) => s + r.party_size, 0)} guests
                  </span>
                </div>

                {/* Rows */}
                <div className="space-y-2">
                  {block.reservations.map(r => {
                    const isExpanded = expandedId === r.id
                    const hasNotes = !!r.notes?.trim()

                    return (
                      <div
                        key={r.id}
                        className="bg-white rounded-xl border border-sand-200 overflow-hidden"
                      >
                        {/* Summary row */}
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : r.id)}
                          className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-sand-50 transition-colors"
                        >
                          {/* Time */}
                          <div className="w-20 shrink-0">
                            <span className="text-sm font-semibold text-marine-900 tabular-nums">{r.time}</span>
                          </div>

                          {/* Name + flags */}
                          <div className="flex-1 min-w-0 flex items-center gap-2">
                            <p className="font-medium text-ink-900 truncate">{r.name}</p>
                            {hasNotes && (
                              <span title="Has special requests" className="shrink-0 w-1.5 h-1.5 rounded-full bg-amber-400" />
                            )}
                            {r.occasion && r.occasion !== 'No special occasion' && (
                              <span className="shrink-0 text-xs text-ink-400 hidden sm:block truncate">· {r.occasion}</span>
                            )}
                          </div>

                          {/* Party size */}
                          <div className="shrink-0 flex items-center gap-1.5 text-sm text-ink-600">
                            <svg className="w-4 h-4 text-ink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4.13a4 4 0 11-8 0 4 4 0 018 0zm6 4a4 4 0 00-4-4" />
                            </svg>
                            <span>{r.party_size}</span>
                          </div>

                          {/* Status badge */}
                          <div className="shrink-0">
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[r.status] ?? 'bg-sand-100 text-ink-500'}`}>
                              {r.status}
                            </span>
                          </div>

                          {/* Chevron */}
                          <svg
                            className={`w-4 h-4 text-ink-300 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Expanded detail */}
                        {isExpanded && (
                          <div className="border-t border-sand-100 px-5 py-4 bg-sand-50 space-y-4">
                            {/* Contact info */}
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <p className="text-xs text-ink-400 mb-0.5">Phone</p>
                                <a href={`tel:${r.phone}`} className="text-marine-700 hover:underline">{r.phone}</a>
                              </div>
                              <div>
                                <p className="text-xs text-ink-400 mb-0.5">Email</p>
                                <a href={`mailto:${r.email}`} className="text-marine-700 hover:underline truncate block">{r.email}</a>
                              </div>
                              {r.flexible && (
                                <div className="col-span-2">
                                  <span className="text-xs text-foam-700 bg-foam-100 px-2 py-0.5 rounded-full">Flexible with timing</span>
                                </div>
                              )}
                            </div>

                            {/* Notes */}
                            {hasNotes && (
                              <div>
                                <p className="text-xs text-ink-400 mb-1">Special requests</p>
                                <p className="text-sm text-ink-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">{r.notes}</p>
                              </div>
                            )}

                            {/* Status update */}
                            <div>
                              <p className="text-xs text-ink-400 mb-2">Update status</p>
                              <div className="flex gap-2">
                                {(['pending', 'confirmed', 'cancelled'] as const).map(s => (
                                  <button
                                    key={s}
                                    onClick={() => updateStatus(r.id, s)}
                                    disabled={r.status === s || updatingId === r.id}
                                    className={`text-xs font-medium px-3 py-1.5 rounded-full border capitalize transition-colors disabled:opacity-40 ${
                                      r.status === s
                                        ? STATUS_STYLES[s] + ' border-transparent'
                                        : STATUS_BTN[s] + ' bg-white'
                                    }`}
                                  >
                                    {updatingId === r.id ? '…' : s}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
