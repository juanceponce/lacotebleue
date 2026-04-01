import { SectionHeader } from '../components/SectionHeader'
import { Card, CardContent } from '../components/Card'
import { Scallop } from '../components/Logo'

export default function Story() {
  const surpriseMoments = [
    {
      title: 'The Warm Bread Ritual',
      description: 'Fresh focaccia arrives at your table still warm, with olive oil we press ourselves each fall.',
    },
    {
      title: 'Complimentary Digestif',
      description: 'End your evening with a small glass of our house-made limoncello—on us.',
    },
    {
      title: 'The Birthday Photograph',
      description: "Celebrating? We'll capture the moment and send you a printed photo before you leave.",
    },
    {
      title: 'Weather-Day Treats',
      description: 'Rainy evenings mean complimentary hot chocolate for the table. Sunny days might bring a palate cleanser.',
    },
  ]

  return (
    <div className="page-transition">
      {/* Hero */}
      <section className="bg-marine-900 text-sand-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
            Our Story
          </h1>
          <p className="text-sand-200 text-lg italic">
            Where three coastlines meet.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="section-padding bg-sand-50">
        <div className="container-narrow">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-ink-700 leading-relaxed mb-8">
              La Cote Bleue was born from summers spent on three different shores: the rocky coves of the French Riviera, the sun-drenched beaches of Barcelona, and the fishing villages of the Amalfi Coast.
            </p>

            <p className="text-ink-600 leading-relaxed mb-8">
              Each place taught us something different. In France, we learned that the best meals unfold slowly—course by course, story by story. In Spain, we discovered the joy of shared plates and crowded tables. In Italy, we understood that simplicity, when executed with care, becomes extraordinary.
            </p>

            <p className="text-ink-600 leading-relaxed mb-8">
              We brought these lessons home and built a place where they could live together. A coastal bistro that feels like a memory you haven't made yet.
            </p>
          </div>
        </div>
      </section>

      {/* The Three Coasts */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeader
            title="Three Coasts, One Table"
            subtitle="The flavors that inspire our kitchen."
          />

          <div className="grid md:grid-cols-3 gap-12 mt-14">
            <div className="text-center">
              <div className="mb-6">
                <span className="font-serif text-7xl text-marine-200 leading-none select-none">I</span>
                <div className="w-8 h-px bg-marine-300 mx-auto mt-3" />
              </div>
              <h3 className="font-serif text-xl text-marine-900 mb-3 tracking-wide">France</h3>
              <p className="text-ink-600 text-sm leading-relaxed">
                Bouillabaisse traditions, Provençal herbs, the art of the long lunch. Butter, wine, and unhurried conversation.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6">
                <span className="font-serif text-7xl text-marine-200 leading-none select-none">II</span>
                <div className="w-8 h-px bg-marine-300 mx-auto mt-3" />
              </div>
              <h3 className="font-serif text-xl text-marine-900 mb-3 tracking-wide">Spain</h3>
              <p className="text-ink-600 text-sm leading-relaxed">
                Tapas culture, bold paprika, the spirit of sobremesa. The understanding that dinner is just the beginning.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6">
                <span className="font-serif text-7xl text-marine-200 leading-none select-none">III</span>
                <div className="w-8 h-px bg-marine-300 mx-auto mt-3" />
              </div>
              <h3 className="font-serif text-xl text-marine-900 mb-3 tracking-wide">Italy</h3>
              <p className="text-ink-600 text-sm leading-relaxed">
                Hand-made pasta, coastal simplicity, respect for ingredients. The belief that less, done well, is always more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-marine-900 text-sand-50">
        <div className="container-narrow text-center">
          <Scallop className="text-marine-400 mx-auto mb-8 w-12 h-12" />
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            The Presence Philosophy
          </h2>
          <p className="text-sand-200 text-lg leading-relaxed mb-8">
            We believe a restaurant should do more than feed you. It should create the conditions for you to be fully present—with your food, your companions, your evening.
          </p>
          <p className="text-sand-200 text-lg leading-relaxed">
            That's why we dim the lights. That's why the music is conversation-friendly. That's why we won't rush you. Your table is yours for the evening.
          </p>
        </div>
      </section>

      {/* Unreasonable Hospitality */}
      <section className="section-padding bg-sand-50">
        <div className="container-wide">
          <SectionHeader
            title="Small Surprises"
            subtitle="Inspired by the idea that hospitality should be unreasonable—in the best way."
          />

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {surpriseMoments.map((moment, index) => (
              <Card key={index} hover>
                <CardContent className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-foam-100 flex-shrink-0 flex items-center justify-center">
                    <Scallop className="w-5 h-5 text-foam-600" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-marine-900 mb-2">
                      {moment.title}
                    </h3>
                    <p className="text-ink-600 text-sm">
                      {moment.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-center text-ink-500 mt-8 text-sm">
            These aren't on the menu. They're just part of how we do things.
          </p>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeader
            title="The Space"
            subtitle="Designed for presence."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-12">
            {[
              { span: 'md:col-span-2 md:row-span-2', label: 'The Dining Room' },
              { span: '', label: 'The Bar' },
              { span: '', label: 'The Terrace' },
              { span: '', label: 'The Kitchen' },
              { span: '', label: 'The Details' },
            ].map((cell, i) => (
              <div
                key={i}
                className={`relative bg-gradient-to-br from-marine-100 to-marine-50 rounded-2xl overflow-hidden aspect-square ${cell.span}`}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <div className="w-8 h-px bg-marine-300" />
                  <span className="text-marine-500 text-xs uppercase tracking-[0.15em] font-medium">
                    {cell.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Note */}
      <section className="section-padding bg-sand-100">
        <div className="container-narrow text-center">
          <p className="text-ink-600 text-lg italic">
            "We didn't want to build a restaurant. We wanted to build a place where people feel at home—where the food is memorable, the service is warm, and time seems to slow down a little."
          </p>
          <p className="mt-4 text-marine-900 font-medium">
            — The La Cote Bleue Team
          </p>
        </div>
      </section>
    </div>
  )
}
