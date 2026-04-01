import { DietaryTag } from './Tag'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  priceLabel?: string
  dietary: string[]
  highlight?: boolean
}

interface MenuItemCardProps {
  item: MenuItem
  className?: string
}

export function MenuItemCard({ item, className = '' }: MenuItemCardProps) {
  return (
    <div
      className={`
        group relative py-4 border-b border-sand-200 last:border-b-0
        ${item.highlight ? 'bg-marine-50/30 -mx-4 px-4 rounded-lg border-none' : ''}
        ${className}
      `}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-serif text-lg text-marine-900 group-hover:text-marine-700 transition-colors">
              {item.name}
            </h3>
            {item.highlight && (
              <span className="text-xs font-medium text-foam-600 uppercase tracking-wide">
                Featured
              </span>
            )}
          </div>
          <p className="text-ink-600 text-sm leading-relaxed mb-2">
            {item.description}
          </p>
          {item.dietary.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {item.dietary.map((d) => (
                <DietaryTag key={d} dietary={d} />
              ))}
            </div>
          )}
        </div>
        <div className="text-marine-900 font-medium tabular-nums">
          {item.priceLabel ?? `$${item.price}`}
        </div>
      </div>
    </div>
  )
}
