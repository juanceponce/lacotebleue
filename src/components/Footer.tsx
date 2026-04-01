import { Link } from 'react-router-dom'
import { useState, FormEvent } from 'react'
import { Logo, Scallop } from './Logo'

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-marine-900 text-sand-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <Logo size="sm" className="text-sand-100" />
            </Link>
            <p className="text-sand-300 text-sm leading-relaxed">
              A French-Spanish-Italian coastal bistro. The kind of place you don't rush through.
            </p>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-serif text-lg mb-4">Hours</h3>
            <dl className="space-y-2 text-sm text-sand-300">
              <div className="flex justify-between">
                <dt>Mon – Tue</dt>
                <dd>Closed</dd>
              </div>
              <div className="flex justify-between">
                <dt>Wed – Mon</dt>
                <dd>4pm – 9pm</dd>
              </div>
            </dl>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg mb-4">Visit</h3>
            <address className="not-italic text-sm text-sand-300 space-y-2">
              <p>209 Forest Ave</p>
              <p>Pacific Grove, CA 93950</p>
              <p className="pt-2">
                <a href="tel:+18315551234" className="hover:text-sand-100 transition-colors">
                  (831) 555-1234
                </a>
              </p>
              <p>
                <a href="mailto:hello@lacotebleue.com" className="hover:text-sand-100 transition-colors">
                  hello@lacotebleue.com
                </a>
              </p>
            </address>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-lg mb-4">Stay in Touch</h3>
            {subscribed ? (
              <p className="text-sm text-foam-300">
                Thank you for subscribing. We'll be in touch.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <p className="text-sm text-sand-300 mb-3">
                  Seasonal menus, events, and the occasional recipe.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="flex-1 px-4 py-2 rounded-lg bg-marine-800 border border-marine-700 text-sand-100 placeholder:text-sand-400 text-sm focus:outline-none focus:ring-2 focus:ring-foam-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-sand-100 text-marine-900 text-sm font-medium hover:bg-white transition-colors"
                  >
                    Join
                  </button>
                </div>
              </form>
            )}

            {/* Social */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sand-400 hover:text-sand-100 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sand-400 hover:text-sand-100 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-marine-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sand-400 text-sm">
            <Scallop className="w-4 h-4" />
            <span>&copy; {new Date().getFullYear()} La Cote Bleue. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-sm text-sand-400">
            <Link to="/contact" className="hover:text-sand-100 transition-colors">
              Privacy
            </Link>
            <Link to="/contact" className="hover:text-sand-100 transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
