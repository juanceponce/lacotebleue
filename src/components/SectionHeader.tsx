import { ReactNode } from 'react'
import { ScallopDivider } from './Logo'

interface SectionHeaderProps {
  title: string
  subtitle?: string | ReactNode
  centered?: boolean
  divider?: boolean
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
  divider = true,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="font-serif text-3xl md:text-4xl text-marine-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-ink-600 text-lg max-w-2xl mx-auto mb-6">
          {subtitle}
        </p>
      )}
      {divider && <ScallopDivider className="mt-6" />}
    </div>
  )
}
