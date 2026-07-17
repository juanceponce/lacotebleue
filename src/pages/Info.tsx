import { useState, useEffect, useCallback } from 'react'

interface Reservation {
  id: string
  name: string
  party_size: number
  time: string
  occasion: string
  notes: string
}

interface TimeBlock {
  label: string
  hour: number
  reservations: Reservation[]
}

const TIME_BLOCKS = [
  { label: '11:00 AM – 12:00 PM', hour: 11 },
  { label: '12:00 – 1:00 PM', hour: 12 },
  { label: '1:00 – 2:00 PM', hour: 13 },
  { label: '2:00 – 3:00 PM', hour: 14 },
  { label: '4:00 – 5:00 PM', hour: 16 },
  { label: '5:00 – 6:00 PM', hour: 17 },
  { label: '6:00 – 7:00 PM', hour: 18 },
  { label: '7:00 – 8:00 PM', hour: 19 },
  { label: '8:00 – 9:00 PM', hour: 20 },
]

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

export default function Info() {
  const [date, setDate] = useState(toLocalDateString(new Date()))
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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
  }, [fetchReservations])

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
                    const hasNotes = !!r.notes?.trim()

                    return (
                      <div
                        key={r.id}
                        className="bg-white rounded-xl border border-sand-200 px-5 py-4 flex items-start gap-4"
                      >
                        {/* Time */}
                        <div className="w-20 shrink-0 pt-0.5">
                          <span className="text-sm font-semibold text-marine-900 tabular-nums">{r.time}</span>
                        </div>

                        {/* Name + occasion + notes */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-ink-900 truncate">{r.name}</p>
                            {r.occasion && r.occasion !== 'No special occasion' && (
                              <span className="shrink-0 text-xs text-ink-400 truncate">· {r.occasion}</span>
                            )}
                          </div>
                          {hasNotes && (
                            <p className="text-sm text-ink-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-1.5 mt-2">
                              {r.notes}
                            </p>
                          )}
                        </div>

                        {/* Party size */}
                        <div className="shrink-0 flex items-center gap-1.5 text-sm text-ink-600 pt-0.5">
                          <svg className="w-4 h-4 text-ink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4.13a4 4 0 11-8 0 4 4 0 018 0zm6 4a4 4 0 00-4-4" />
                          </svg>
                          <span>{r.party_size}</span>
                        </div>
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
