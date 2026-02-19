interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'w-10 h-12',
    md: 'w-14 h-16',
    lg: 'w-20 h-24',
  }

  return (
    <img
      src="/boat.jpg"
      alt="La Côte Bleue logo"
      className={`${sizes[size]} ${className} object-contain`}
    />
  )
}

export function Scallop({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-6 h-6 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M12 22C12 22 4 16 4 10C4 6 8 4 12 4C16 4 20 6 20 10C20 16 12 22 12 22Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M12 4V22M8 7C8 7 10 12 10 18M16 7C16 7 14 12 14 18"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  )
}

export function ScallopDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="h-px w-12 bg-marine-200" />
      <Scallop className="text-marine-300" />
      <div className="h-px w-12 bg-marine-200" />
    </div>
  )
}
