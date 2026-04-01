import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Logo } from './Logo'
import { Button } from './Button'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/story', label: 'Our Story' },
  { to: '/events', label: 'Events' },
  { to: '/contact', label: 'Contact' },
]

export function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-sand-50/90 backdrop-blur-md border-b border-sand-200/50">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <Logo size="sm" />
            <span className="font-serif text-xl text-marine-900 group-hover:text-marine-700 transition-colors hidden sm:block">
              La Cote Bleue
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative text-sm font-medium transition-colors pb-0.5 ${
                    isActive
                      ? 'text-marine-900 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-marine-900'
                      : 'text-ink-500 hover:text-marine-900'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Reserve Button (Desktop) */}
          <div className="hidden md:block">
            <Button as="link" to="/reserve" size="sm">
              Reserve
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-ink-600 hover:text-marine-900 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation — smooth slide */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-1 pb-6 pt-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-base font-medium py-2.5 px-2 rounded-lg transition-colors ${
                    isActive
                      ? 'text-marine-900 bg-marine-50'
                      : 'text-ink-600 hover:text-marine-900 hover:bg-sand-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-3">
              <Button as="link" to="/reserve" className="w-full" onClick={() => setIsOpen(false)}>
                Reserve a Table
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
