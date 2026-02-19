import { useState, useMemo } from 'react'
import { MenuItemCard } from '../components/MenuItemCard'
import { Tag } from '../components/Tag'
import menuData from '../data/menu.json'

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [dietaryFilter, setDietaryFilter] = useState<string[]>([])

  const categories = menuData.categories

  // Get tonight's highlights
  const highlights = useMemo(() => {
    return categories
      .flatMap(cat => cat.items)
      .filter(item => item.highlight)
  }, [])

  // Filter items
  const filteredCategories = useMemo(() => {
    return categories
      .map(category => ({
        ...category,
        items: category.items.filter(item => {
          // Category filter
          if (activeCategory !== 'all' && category.id !== activeCategory) {
            return false
          }

          // Search filter
          if (searchQuery) {
            const query = searchQuery.toLowerCase()
            if (
              !item.name.toLowerCase().includes(query) &&
              !item.description.toLowerCase().includes(query)
            ) {
              return false
            }
          }

          // Dietary filter
          if (dietaryFilter.length > 0) {
            const hasAllFilters = dietaryFilter.every(filter =>
              item.dietary.some(d => d.includes(filter))
            )
            if (!hasAllFilters) return false
          }

          return true
        }),
      }))
      .filter(category => category.items.length > 0)
  }, [activeCategory, searchQuery, dietaryFilter, categories])

  const toggleDietaryFilter = (filter: string) => {
    setDietaryFilter(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  return (
    <div className="page-transition">
      {/* Header */}
      <section className="bg-marine-900 text-sand-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
            Menu
          </h1>
          <p className="text-sand-200 text-lg">
            Mediterranean flavors from the French Riviera, Spanish coast, and Italian shores.
          </p>
        </div>
      </section>

      {/* Tonight's Highlights */}
      {highlights.length > 0 && (
        <section className="bg-foam-50 border-b border-foam-200 py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-foam-500 animate-pulse" />
              <h2 className="font-serif text-xl text-marine-900">Tonight's Highlights</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {highlights.map(item => (
                <span
                  key={item.id}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-foam-200 text-sm"
                >
                  <span className="font-medium text-marine-900">{item.name}</span>
                  <span className="text-ink-500">${item.price}</span>
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="sticky top-20 z-40 bg-sand-50/95 backdrop-blur-sm border-b border-sand-200 py-4 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === 'all'
                    ? 'bg-marine-900 text-sand-50'
                    : 'bg-white text-ink-600 border border-sand-300 hover:border-marine-300'
                }`}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-marine-900 text-sand-50'
                      : 'bg-white text-ink-600 border border-sand-300 hover:border-marine-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-sand-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-marine-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Dietary Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-sm text-ink-500 mr-2">Dietary:</span>
            {['vegetarian', 'vegan', 'gluten-free'].map(filter => (
              <button
                key={filter}
                onClick={() => toggleDietaryFilter(filter)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  dietaryFilter.includes(filter)
                    ? 'bg-foam-500 text-white'
                    : 'bg-foam-50 text-foam-700 border border-foam-200 hover:bg-foam-100'
                }`}
              >
                {filter === 'vegetarian' ? 'Vegetarian' : filter === 'vegan' ? 'Vegan' : 'Gluten-Free'}
              </button>
            ))}
            {dietaryFilter.length > 0 && (
              <button
                onClick={() => setDietaryFilter([])}
                className="text-xs text-ink-500 hover:text-ink-700 underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="section-padding bg-sand-50">
        <div className="max-w-4xl mx-auto">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-ink-500 text-lg">No items match your search.</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setDietaryFilter([])
                  setActiveCategory('all')
                }}
                className="mt-4 text-marine-600 hover:text-marine-800 font-medium"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map(category => (
                <div key={category.id}>
                  <h2 className="font-serif text-2xl text-marine-900 mb-6 pb-2 border-b border-sand-300">
                    {category.name}
                  </h2>
                  <div>
                    {category.items.map(item => (
                      <MenuItemCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Dietary Key */}
      <section className="bg-sand-100 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-sm font-medium text-ink-700 mb-3">Dietary Key</h3>
          <div className="flex flex-wrap gap-4 text-sm text-ink-600">
            <span><Tag variant="dietary">V</Tag> Vegetarian</span>
            <span><Tag variant="dietary">VG</Tag> Vegan</span>
            <span><Tag variant="dietary">GF</Tag> Gluten-Free</span>
            <span><Tag variant="dietary">opt</Tag> Available upon request</span>
          </div>
          <p className="mt-4 text-sm text-ink-500">
            Please inform your server of any allergies or dietary restrictions. We're happy to accommodate.
          </p>
        </div>
      </section>
    </div>
  )
}
