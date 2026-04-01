import { useState, FormEvent } from 'react'
import { FormField } from '../components/FormField'
import { Button } from '../components/Button'
import { Card, CardContent } from '../components/Card'
import { ScallopDivider } from '../components/Logo'

interface FormData {
  date: string
  time: string
  partySize: string
  name: string
  email: string
  phone: string
  occasion: string
  notes: string
  flexible: boolean
}

interface FormErrors {
  [key: string]: string
}

const timeSlots = [
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM',
  '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM',
]

const partySizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9+']

const occasions = [
  'No special occasion',
  'Birthday',
  'Anniversary',
  'Business dinner',
  'Date night',
  'Celebration',
  'Other',
]

export default function Reserve() {
  const [formData, setFormData] = useState<FormData>({
    date: '',
    time: '',
    partySize: '2',
    name: '',
    email: '',
    phone: '',
    occasion: 'No special occasion',
    notes: '',
    flexible: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [suggestedTimes, setSuggestedTimes] = useState<string[]>([])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.date) {
      newErrors.date = 'Please select a date'
    } else {
      const selectedDate = new Date(formData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        newErrors.date = 'Please select a future date'
      }
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time'
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Simulate suggested alternatives if flexible
      if (formData.flexible) {
        const timeIndex = timeSlots.indexOf(formData.time)
        const alternatives = timeSlots
          .filter((_, i) => Math.abs(i - timeIndex) <= 2 && i !== timeIndex)
          .slice(0, 3)
        setSuggestedTimes(alternatives)
      }

      setSubmitted(true)
    }
  }

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  if (submitted) {
    return (
      <div className="page-transition min-h-[80vh] flex items-center justify-center py-20 px-6 bg-sand-50">
        <div className="max-w-lg text-center">
          <div className="w-20 h-20 rounded-full bg-foam-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-foam-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-marine-900 mb-4">
            Request Received
          </h1>
          <p className="text-ink-600 mb-6">
            Thank you, {formData.name.split(' ')[0]}. We've received your reservation request for{' '}
            <strong>{formData.partySize} guests</strong> on{' '}
            <strong>{new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</strong>{' '}
            at <strong>{formData.time}</strong>.
          </p>
          <p className="text-ink-600 mb-8">
            You'll receive a confirmation email at <strong>{formData.email}</strong> within the hour.
          </p>

          {suggestedTimes.length > 0 && (
            <Card className="mb-8 text-left">
              <CardContent>
                <h3 className="font-medium text-marine-900 mb-3">Alternative times available:</h3>
                <div className="flex flex-wrap gap-2">
                  {suggestedTimes.map(time => (
                    <span
                      key={time}
                      className="px-4 py-2 bg-foam-50 text-foam-700 rounded-full text-sm"
                    >
                      {time}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-ink-500 mt-3">
                  If your preferred time isn't available, we'll offer these alternatives.
                </p>
              </CardContent>
            </Card>
          )}

          <Button as="link" to="/">
            Return Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-transition">
      {/* Maintenance Notice */}
      <div className="min-h-[80vh] flex items-center justify-center bg-sand-50 px-6 py-20">
        <div className="max-w-lg w-full text-center">
          <div className="w-16 h-16 rounded-full bg-marine-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-marine-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-marine-900 mb-4">Online Reservations Temporarily Unavailable</h1>
          <p className="text-ink-600 mb-8">Our reservation system is currently under maintenance. To reserve a table, please contact us directly:</p>
          <div className="bg-white rounded-2xl border border-sand-200 p-8 space-y-4">
            <a href="tel:+18312339286" className="flex items-center justify-center gap-3 text-marine-900 hover:text-marine-600 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-lg font-medium">(831) 233-9286</span>
            </a>
            <div className="border-t border-sand-200" />
            <a href="mailto:team@lacotebleuepg.com" className="flex items-center justify-center gap-3 text-marine-900 hover:text-marine-600 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-lg font-medium">team@lacotebleuepg.com</span>
            </a>
          </div>
          <p className="text-ink-400 text-sm mt-6">We'll be back online shortly. Thank you for your patience.</p>
        </div>
      </div>

      {/* Original Reserve Form — hidden during maintenance */}
      {false && <div className="page-transition">
      {/* Header */}
      <section className="bg-marine-900 text-sand-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
            Reserve a Table
          </h1>
          <p className="text-sand-200 text-lg">
            Join us for an evening on the coast.
          </p>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="section-padding bg-sand-50">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Date & Time */}
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={(e) => updateField('date', (e.target as HTMLInputElement).value)}
                min={new Date().toISOString().split('T')[0]}
                error={errors.date}
                required
              />
              <FormField
                as="select"
                label="Time"
                name="time"
                value={formData.time}
                onChange={(e) => updateField('time', (e.target as HTMLSelectElement).value)}
                error={errors.time}
                required
              >
                <option value="">Select a time</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </FormField>
            </div>

            {/* Party Size */}
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-3">
                Party Size <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {partySizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => updateField('partySize', size)}
                    className={`w-12 h-12 rounded-lg font-medium transition-all ${
                      formData.partySize === size
                        ? 'bg-marine-900 text-sand-50'
                        : 'bg-white text-ink-600 border border-sand-300 hover:border-marine-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {parseInt(formData.partySize) >= 7 && (
                <p className="mt-2 text-sm text-ink-500">
                  For parties of 7 or more, please call us at (831) 233-9286 or inquire about private dining.
                </p>
              )}
            </div>

            <ScallopDivider />

            {/* Contact Info */}
            <div className="space-y-6">
              <FormField
                label="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => updateField('name', (e.target as HTMLInputElement).value)}
                placeholder="Your full name"
                error={errors.name}
                required
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', (e.target as HTMLInputElement).value)}
                  placeholder="your@email.com"
                  error={errors.email}
                  required
                />
                <FormField
                  label="Phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', (e.target as HTMLInputElement).value)}
                  placeholder="(555) 555-5555"
                  error={errors.phone}
                  required
                />
              </div>

              <FormField
                as="select"
                label="Occasion"
                name="occasion"
                value={formData.occasion}
                onChange={(e) => updateField('occasion', (e.target as HTMLSelectElement).value)}
              >
                {occasions.map(occasion => (
                  <option key={occasion} value={occasion}>{occasion}</option>
                ))}
              </FormField>

              <FormField
                as="textarea"
                label="Special Requests"
                name="notes"
                value={formData.notes}
                onChange={(e) => updateField('notes', (e.target as HTMLTextAreaElement).value)}
                placeholder="Allergies, dietary restrictions, seating preferences, etc."
                hint="Please let us know how we can make your evening special."
              />
            </div>

            {/* Flexible Toggle */}
            <div className="bg-foam-50 rounded-xl p-6 border border-foam-200">
              <label className="flex items-start gap-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.flexible}
                  onChange={(e) => updateField('flexible', e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-sand-300 text-marine-600 focus:ring-marine-500"
                />
                <div>
                  <span className="font-medium text-marine-900">I'm flexible with timing</span>
                  <p className="text-sm text-ink-600 mt-1">
                    If your preferred time isn't available, we'll suggest nearby alternatives.
                  </p>
                </div>
              </label>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Request Reservation
            </Button>
          </form>

          {/* Walk-ins Note */}
          <div className="mt-12 text-center">
            <p className="text-ink-600">
              <strong className="text-marine-900">Walk-ins welcome.</strong>
              {' '}Bar seating is always first-come, first-served.
            </p>
          </div>
        </div>
      </section>
    </div>}</div>
  )
}
