import { Button } from '../components/Button'
import { Card, CardContent } from '../components/Card'
import { SectionHeader } from '../components/SectionHeader'
import { MenuItemCard } from '../components/MenuItemCard'
import { Timeline } from '../components/Timeline'
import { Scallop } from '../components/Logo'
import menuData from '../data/menu.json'
import pressData from '../data/press.json'

export default function Home() {
  // Get signature dishes (highlighted items)
  const signatureDishes = menuData.categories
    .flatMap(cat => cat.items)
    .filter(item => item.highlight)
    .slice(0, 6)

  const timelineItems = [
    {
      title: 'Friends & Family',
      date: 'Jan 15 – 20',
      description: 'Soft opening for close friends and family. Testing our service flow and gathering feedback.',
      status: 'completed' as const,
    },
    {
      title: 'Industry Nights',
      date: 'Jan 22 – 26',
      description: 'Welcoming fellow hospitality professionals. Late-night service, industry pricing.',
      status: 'current' as const,
    },
    {
      title: 'Opening Week',
      date: 'Jan 28+',
      description: 'Doors open to the public. Full menu, full hours, full hearts.',
      status: 'upcoming' as const,
    },
  ]

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-marine-900 via-marine-800 to-sand-50 overflow-hidden">
        {/* Grain overlay for hero */}
        <div className="absolute inset-0 opacity-[0.08] bg-grain bg-repeat pointer-events-none" />

        <div className="relative z-10 text-center px-6 py-20">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl text-sand-50 mb-6 animate-fade-in"
            style={{ fontFamily: '"goodlife-brush", sans-serif', fontWeight: 400 }}
          >
            La Cote Bleue
          </h1>
          <p className="text-sand-200 text-xl md:text-2xl max-w-2xl mx-auto mb-12 animate-slide-up font-light italic">
            It's the kind of place you don't rush through.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button as="link" to="/reserve" size="lg">
              Reserve a Table
            </Button>
            <Button as="link" to="/menu" variant="secondary" size="lg" className="bg-sand-50/10 border-sand-200/30 text-sand-50 hover:bg-sand-50/20">
              View Menu
            </Button>
          </div>
        </div>

        {/* Subtle wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sand-50 to-transparent" />
      </section>

      {/* Presence Promise */}
      <section className="section-padding bg-sand-50">
        <div className="container-wide">
          <SectionHeader
            title="Be Present"
            subtitle="In a world that's always moving, we've created a space that asks you to stay."
          />

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <Card hover>
              <CardContent>
                <div className="w-12 h-12 rounded-full bg-marine-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-marine-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-marine-900 mb-2">Thoughtful Lighting</h3>
                <p className="text-ink-600">
                  Warm, low light that invites conversation. No harsh overheads, no dim corners. Just right.
                </p>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent>
                <div className="w-12 h-12 rounded-full bg-marine-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-marine-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-marine-900 mb-2">Curated Sound</h3>
                <p className="text-ink-600">
                  Music that sets a mood without demanding attention. Conversation-friendly volumes, always.
                </p>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent>
                <div className="w-12 h-12 rounded-full bg-marine-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-marine-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-marine-900 mb-2">Generous Spacing</h3>
                <p className="text-ink-600">
                  Tables that give you room to breathe. Your evening is yours—not shared with strangers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Signature Dishes Preview */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeader
            title="From the Kitchen"
            subtitle="Mediterranean flavors, coastal simplicity. A few things we're proud of."
          />

          <div className="mt-12 grid md:grid-cols-2 gap-x-12 gap-y-0">
            {signatureDishes.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button as="link" to="/menu" variant="secondary">
              View Full Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Soft Opening Timeline */}
      <section className="section-padding bg-sand-100">
        <div className="container-narrow">
          <SectionHeader
            title="Opening Soon"
            subtitle="We're opening our doors gradually. Here's where we are."
          />

          <div className="mt-12 bg-white rounded-2xl p-8 md:p-12 border border-sand-200">
            <Timeline items={timelineItems} />
          </div>
        </div>
      </section>

      {/* Press / Testimonials */}
      <section className="section-padding bg-marine-900 text-sand-50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Kind Words</h2>
            <Scallop className="text-marine-400 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pressData.quotes.slice(0, 3).map((quote) => (
              <blockquote key={quote.id} className="relative">
                <div className="text-marine-400 text-6xl font-serif absolute -top-4 -left-2">"</div>
                <p className="text-sand-100 text-lg leading-relaxed pl-6 mb-4">
                  {quote.text}
                </p>
                <footer className="pl-6">
                  <cite className="text-sand-300 text-sm not-italic">
                    — {quote.source}
                  </cite>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section-padding bg-sand-50">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Map Placeholder */}
            <div className="relative bg-marine-100 rounded-2xl h-80 lg:h-96 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 text-marine-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-marine-600 font-medium">Interactive map</p>
                  <p className="text-marine-500 text-sm">123 Harbor Street, Seaside</p>
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-marine-900 mb-6">Find Us</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-marine-900 mb-2">Address</h3>
                  <p className="text-ink-600">
                    123 Harbor Street<br />
                    Seaside, CA 93955
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-marine-900 mb-2">Parking</h3>
                  <p className="text-ink-600">
                    Street parking available on Harbor and Main. Complimentary valet on Friday and Saturday evenings.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-marine-900 mb-2">Contact</h3>
                  <p className="text-ink-600">
                    <a href="tel:+18315551234" className="hover:text-marine-600 transition-colors">(831) 555-1234</a><br />
                    <a href="mailto:hello@lacotebleue.com" className="hover:text-marine-600 transition-colors">hello@lacotebleue.com</a>
                  </p>
                </div>
                <Button as="link" to="/contact">
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
