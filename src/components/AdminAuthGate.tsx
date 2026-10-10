import { useState } from 'react'

export default function AdminAuthGate({ onAuth, title }: { onAuth: () => void; title?: string }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Incorrect password')
      }
      sessionStorage.setItem('admin_authed', '1')
      onAuth()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-sand-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-xs tracking-widest uppercase text-ink-400 mb-1">La Côte Bleue</p>
          <h1 className="font-serif text-2xl text-marine-900">{title ?? 'Admin Access'}</h1>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-sand-200 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-sand-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-marine-400"
              placeholder="Enter admin password"
              autoFocus
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-marine-900 text-sand-50 rounded-lg py-2.5 text-sm font-medium hover:bg-marine-800 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Checking…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
