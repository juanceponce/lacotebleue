interface TagProps {
  children: string
  variant?: 'default' | 'dietary' | 'highlight'
  className?: string
}

export function Tag({ children, variant = 'default', className = '' }: TagProps) {
  const variants = {
    default: 'bg-sand-100 text-ink-600 border-sand-200',
    dietary: 'bg-foam-50 text-foam-700 border-foam-200',
    highlight: 'bg-marine-50 text-marine-700 border-marine-200',
  }

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}

const dietaryLabels: Record<string, string> = {
  vegetarian: 'V',
  vegan: 'VG',
  'vegan-option': 'VG opt',
  'gluten-free': 'GF',
  'gluten-free-option': 'GF opt',
}

export function DietaryTag({ dietary }: { dietary: string }) {
  const label = dietaryLabels[dietary] || dietary
  return <Tag variant="dietary">{label}</Tag>
}
