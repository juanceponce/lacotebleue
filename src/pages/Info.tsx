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

  return (
    <div className="min-h-screen bg-sand-100 font-sans">
      {/* Date nav */}
      <div className="bg-white border-b border-sand-200 px-4 py-2 flex items-center gap-2">
        <button
          onClick={() => shiftDate(-1)}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-sand-100 text-ink-500 transition-colors"
          aria-label="Previous day"
        >
          &#8592;
        </button>
        <div className="flex items-center gap-2 flex-1">
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="text-sm font-medium text-marine-900 border border-sand-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-marine-400"
          />
          <span className="text-xs text-ink-500 hidden sm:block">{formatDisplayDate(date)}</span>
        </div>
        <button
          onClick={() => setDate(toLocalDateString(new Date()))}
          className="text-xs font-medium px-2.5 py-1 rounded-full bg-marine-900 text-sand-50 hover:bg-marine-800 transition-colors"
        >
          Today
        </button>
        <button
          onClick={() => shiftDate(1)}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-sand-100 text-ink-500 transition-colors"
          aria-label="Next day"
        >
          &#8594;
        </button>
        <button
          onClick={fetchReservations}
          disabled={loading}
          title="Refresh"
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-sand-100 text-ink-500 transition-colors disabled:opacity-40"
        >
          <svg className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-3 py-3">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 mb-4">
            {error}
          </div>
        )}

        {!loading && !error && reservations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-ink-400 text-sm">No reservations for this date.</p>
          </div>
        )}

        {!error && reservations.length > 0 && (
          <div className="space-y-3">
            {blocks.filter(b => b.reservations.length > 0).map(block => (
              <div key={block.hour}>
                {/* Block header */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-ink-400">
                    {block.label}
                  </span>
                  <div className="flex-1 h-px bg-sand-200" />
                </div>

                {/* Rows */}
                <div className="divide-y divide-sand-100 rounded-lg border border-sand-200 bg-white overflow-hidden">
                  {block.reservations.map(r => {
                    const hasNotes = !!r.notes?.trim()

                    return (
                      <div
                        key={r.id}
                        className="px-3 py-1.5 flex items-center gap-3 text-sm"
                      >
                        {/* Time */}
                        <span className="w-16 shrink-0 font-semibold text-marine-900 tabular-nums">{r.time}</span>

                        {/* Name */}
                        <span className="font-medium text-ink-900 truncate shrink-0 max-w-[9rem]">{r.name}</span>

                        {/* Occasion */}
                        {r.occasion && r.occasion !== 'No special occasion' && (
                          <span className="shrink-0 text-xs text-ink-400 truncate max-w-[7rem]">{r.occasion}</span>
                        )}

                        {/* Notes */}
                        {hasNotes && (
                          <span className="flex-1 min-w-0 truncate text-xs text-amber-700" title={r.notes}>
                            {r.notes}
                          </span>
                        )}
                        {!hasNotes && <span className="flex-1" />}

                        {/* Party size */}
                        <span className="shrink-0 flex items-center gap-1 text-ink-600">
                          <svg className="w-3.5 h-3.5 text-ink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4.13a4 4 0 11-8 0 4 4 0 018 0zm6 4a4 4 0 00-4-4" />
                          </svg>
                          {r.party_size}
                        </span>
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
