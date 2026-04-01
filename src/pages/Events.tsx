import { useState, FormEvent } from 'react'
import { SectionHeader } from '../components/SectionHeader'
import { Card, CardContent } from '../components/Card'
import { FormField } from '../components/FormField'
import { Button } from '../components/Button'
import eventsData from '../data/events.json'

export default function Events() {
  const [inquiryType, setInquiryType] = useState<'private' | 'event'>('private')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guestCount: '',
    details: '',
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  const parseDate = (dateStr: string) => new Date(dateStr + 'T12:00:00')

  const formatDate = (dateStr: string) => {
    return parseDate(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="page-transition">
      {/* Header */}
      <section className="bg-marine-900 text-sand-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
            Events & Private Dining
          </h1>
          <p className="text-sand-200 text-lg">
            Celebrate milestones, host gatherings, or simply enjoy an evening with us.
          </p>
        </div>
      </section>

      {/* Two Panels */}
      <section className="section-padding bg-sand-50">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Private Dining */}
            <Card className="p-8">
              <CardContent>
                <h2 className="font-serif text-2xl text-marine-900 mb-4">Private Dining</h2>
                <p className="text-ink-600 mb-6">
                  {eventsData.privateDining.description}
                </p>

                <h3 className="font-medium text-marine-900 mb-3">Minimums</h3>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-ink-600">Lunch (Mon-Fri)</span>
                    <span className="font-medium text-marine-900">${eventsData.privateDining.minimums.lunch}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-ink-600">Dinner (Sun-Thu)</span>
                    <span className="font-medium text-marine-900">${eventsData.privateDining.minimums.dinner}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-ink-600">Friday & Saturday</span>
                    <span className="font-medium text-marine-900">${eventsData.privateDining.minimums.weekend}</span>
                  </div>
                </div>

                <h3 className="font-medium text-marine-900 mb-3">Includes</h3>
                <ul className="space-y-2 mb-6">
                  {eventsData.privateDining.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-ink-600">
                      <svg className="w-4 h-4 text-foam-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={inquiryType === 'private' ? 'primary' : 'secondary'}
                  onClick={() => setInquiryType('private')}
                  className="w-full"
                >
                  Inquire About Private Dining
                </Button>
              </CardContent>
            </Card>

            {/* Special Events */}
            <Card className="p-8">
              <CardContent>
                <h2 className="font-serif text-2xl text-marine-900 mb-4">Special Events</h2>
                <p className="text-ink-600 mb-6">
                  Throughout the year, we host wine dinners, cooking classes, and seasonal celebrations. Join us for something special.
                </p>

                <h3 className="font-medium text-marine-900 mb-3">Upcoming Events</h3>
                <div className="space-y-4 mb-6">
                  {eventsData.upcoming.slice(0, 3).map((event) => (
                    <div key={event.id} className="p-4 bg-sand-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-marine-900">{event.title}</h4>
                        <span className="text-sm font-medium text-foam-600">${event.price}</span>
                      </div>
                      <p className="text-sm text-ink-500 mb-1">
                        {formatDate(event.date)} at {event.time}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-ink-400">{event.spots} spots available</p>
                        {(event as any).status === 'pending' && (
                          <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">Pending</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant={inquiryType === 'event' ? 'primary' : 'secondary'}
                  onClick={() => setInquiryType('event')}
                  className="w-full"
                >
                  Reserve Event Tickets
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* All Upcoming Events */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeader
            title="Calendar"
            subtitle="Mark your calendar for these upcoming gatherings."
          />

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {eventsData.upcoming.map((event) => (
              <Card key={event.id} hover className="p-6">
                <CardContent>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-16 text-center">
                      <div className="text-2xl font-serif text-marine-900">
                        {parseDate(event.date).getDate()}
                      </div>
                      <div className="text-sm text-ink-500 uppercase">
                        {parseDate(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl text-marine-900 mb-2">{event.title}</h3>
                      <p className="text-sm text-ink-600 mb-3">{event.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-ink-500">{event.time}</span>
                        <span className="text-foam-600 font-medium">${event.price}/person</span>
                        <span className="text-ink-400">{event.spots} spots left</span>
                        {(event as any).status === 'pending' && (
                          <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">Pending</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="section-padding bg-sand-100">
        <div className="max-w-2xl mx-auto">
          <SectionHeader
            title={inquiryType === 'private' ? 'Private Dining Inquiry' : 'Event Reservation'}
            subtitle={inquiryType === 'private'
              ? 'Tell us about your event and we\'ll be in touch within 24 hours.'
              : 'Reserve your spot at one of our upcoming events.'
            }
          />

          {formSubmitted ? (
            <div className="mt-12 text-center py-12 bg-white rounded-xl border border-sand-200">
              <div className="w-16 h-16 rounded-full bg-foam-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-foam-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-marine-900 mb-2">Thank You</h3>
              <p className="text-ink-600">
                We've received your inquiry and will be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-12 space-y-6 bg-white p-8 rounded-xl border border-sand-200">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: (e.target as HTMLInputElement).value }))}
                  required
                />
                <FormField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: (e.target as HTMLInputElement).value }))}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label="Phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: (e.target as HTMLInputElement).value }))}
                  required
                />
                <FormField
                  label={inquiryType === 'private' ? 'Preferred Date' : 'Event Date'}
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: (e.target as HTMLInputElement).value }))}
                  required
                />
              </div>

              <FormField
                label="Number of Guests"
                type="number"
                name="guestCount"
                value={formData.guestCount}
                onChange={(e) => setFormData(prev => ({ ...prev, guestCount: (e.target as HTMLInputElement).value }))}
                min="1"
                max={inquiryType === 'private' ? '24' : '10'}
                required
              />

              <FormField
                as="textarea"
                label="Additional Details"
                name="details"
                value={formData.details}
                onChange={(e) => setFormData(prev => ({ ...prev, details: (e.target as HTMLTextAreaElement).value }))}
                placeholder={inquiryType === 'private'
                  ? 'Tell us about your event—occasion, dietary needs, special requests...'
                  : 'Any dietary restrictions or special requests?'
                }
              />

              <Button type="submit" size="lg" className="w-full">
                Submit Inquiry
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
