import { useState, FormEvent } from 'react'
import { SectionHeader } from '../components/SectionHeader'
import { Card, CardContent } from '../components/Card'
import { FormField } from '../components/FormField'
import { Button } from '../components/Button'
import hoursData from '../data/hours.json'

const faqs = [
  {
    question: 'What is the dress code?',
    answer: 'Smart casual. We want you to feel comfortable and confident. Jeans are welcome; beachwear and athletic attire are not.',
  },
  {
    question: 'Do you accommodate dietary restrictions?',
    answer: 'Absolutely. Please inform your server of any allergies or dietary needs. We can modify most dishes and are happy to suggest alternatives.',
  },
  {
    question: 'Is there a corkage fee?',
    answer: 'Yes, $35 per bottle with a limit of two bottles per table. We waive corkage for one bottle if you purchase a bottle from our list.',
  },
  {
    question: 'Are children welcome?',
    answer: "Yes. We don't have a children's menu, but our kitchen is happy to prepare simple dishes. Highchairs are available.",
  },
  {
    question: 'Is the restaurant wheelchair accessible?',
    answer: 'Yes. Our main dining room, restrooms, and private dining space are all fully accessible. Please mention any accessibility needs when reserving.',
  },
  {
    question: 'Can I buy gift cards?',
    answer: 'Yes. Gift cards are available in any denomination. Call us or stop by to purchase.',
  },
]

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General inquiry',
    message: '',
  })
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  const subjects = [
    'General inquiry',
    'Reservation question',
    'Private dining',
    'Press inquiry',
    'Career opportunities',
    'Feedback',
  ]

  return (
    <div className="page-transition">
      {/* Header */}
      <section className="bg-marine-900 text-sand-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
            Get in Touch
          </h1>
          <p className="text-sand-200 text-lg">
            Questions, feedback, or just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="section-padding bg-sand-50">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-2xl text-marine-900 mb-6">Send a Message</h2>

              {formSubmitted ? (
                <div className="text-center py-12 bg-white rounded-xl border border-sand-200">
                  <div className="w-16 h-16 rounded-full bg-foam-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-foam-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl text-marine-900 mb-2">Message Sent</h3>
                  <p className="text-ink-600">
                    Thank you for reaching out. We'll respond within 24-48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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
                  <FormField
                    as="select"
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: (e.target as HTMLSelectElement).value }))}
                  >
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </FormField>
                  <FormField
                    as="textarea"
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: (e.target as HTMLTextAreaElement).value }))}
                    required
                  />
                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Hours */}
              <Card className="p-6">
                <CardContent>
                  <h3 className="font-serif text-xl text-marine-900 mb-4">Hours</h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-ink-600">Monday – Tuesday</dt>
                      <dd className="font-medium text-marine-900">Closed</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-ink-600">Wednesday – Monday</dt>
                      <dd className="font-medium text-marine-900">4pm – 9pm</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              {/* Contact Details */}
              <Card className="p-6">
                <CardContent>
                  <h3 className="font-serif text-xl text-marine-900 mb-4">Contact</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-marine-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="text-marine-900 font-medium">Address</p>
                        <p className="text-ink-600">209 Forest Ave<br />Pacific Grove, CA 93950</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-marine-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <p className="text-marine-900 font-medium">Phone</p>
                        <a href="tel:+18315551234" className="text-ink-600 hover:text-marine-600 transition-colors">
                          (831) 555-1234
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-marine-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="text-marine-900 font-medium">Email</p>
                        <a href="mailto:hello@lacotebleue.com" className="text-ink-600 hover:text-marine-600 transition-colors">
                          hello@lacotebleue.com
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-80 bg-marine-100 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-16 h-16 text-marine-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-marine-600 font-medium">Interactive Map</p>
            <p className="text-marine-500 text-sm">209 Forest Ave, Pacific Grove, CA 93950</p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Quick answers to common questions."
          />

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-sand-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-sand-50 transition-colors"
                  aria-expanded={expandedFaq === index}
                >
                  <span className="font-medium text-marine-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-ink-400 transition-transform ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-ink-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
