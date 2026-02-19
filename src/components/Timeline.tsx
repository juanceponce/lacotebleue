interface TimelineItem {
  title: string
  date: string
  description: string
  status: 'completed' | 'current' | 'upcoming'
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export function Timeline({ items, className = '' }: TimelineProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Vertical line */}
      <div className="absolute left-4 top-2 bottom-2 w-px bg-marine-200" aria-hidden="true" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={index} className="relative pl-12">
            {/* Dot */}
            <div
              className={`
                absolute left-2 top-1.5 w-4 h-4 rounded-full border-2
                ${item.status === 'completed'
                  ? 'bg-marine-900 border-marine-900'
                  : item.status === 'current'
                    ? 'bg-foam-400 border-foam-400 ring-4 ring-foam-100'
                    : 'bg-white border-marine-300'
                }
              `}
              aria-hidden="true"
            />

            <div>
              <div className="flex items-baseline gap-3 mb-1">
                <h3 className="font-serif text-lg text-marine-900">{item.title}</h3>
                <span className="text-sm text-ink-500">{item.date}</span>
              </div>
              <p className="text-ink-600">{item.description}</p>
              {item.status === 'current' && (
                <span className="inline-block mt-2 text-sm font-medium text-foam-600">
                  Currently happening
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
