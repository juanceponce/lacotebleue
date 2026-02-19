import { Link } from 'react-router-dom'
import { ReactNode, ButtonHTMLAttributes, MouseEventHandler } from 'react'

interface ButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  className?: string
}

interface ButtonAsButtonProps extends ButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> {
  as?: 'button'
  to?: never
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  as: 'link'
  to: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-marine-500 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-marine-900 text-sand-50 hover:bg-marine-800 active:bg-marine-950',
    secondary: 'bg-sand-100 text-marine-900 border border-marine-200 hover:bg-sand-200 active:bg-sand-300',
    ghost: 'text-marine-900 hover:bg-marine-50 active:bg-marine-100',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  if (props.as === 'link') {
    const { as: _, to, onClick, ...linkProps } = props as ButtonAsLinkProps
    return (
      <Link to={to} className={combinedClassName} onClick={onClick} {...linkProps}>
        {children}
      </Link>
    )
  }

  const { as: _, ...buttonProps } = props as ButtonAsButtonProps
  return (
    <button className={combinedClassName} {...buttonProps}>
      {children}
    </button>
  )
}
