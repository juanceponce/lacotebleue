# La Cote Bleue

A French-Spanish-Italian coastal bistro website built with React, TypeScript, and Tailwind CSS.

> "It's the kind of place you don't rush through."

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or navigate to the project directory
cd lacotebleue

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Footer.tsx
│   ├── FormField.tsx
│   ├── Layout.tsx
│   ├── Logo.tsx
│   ├── MenuItemCard.tsx
│   ├── Nav.tsx
│   ├── SectionHeader.tsx
│   ├── Tag.tsx
│   └── Timeline.tsx
├── data/             # JSON data files
│   ├── events.json
│   ├── hours.json
│   ├── menu.json
│   └── press.json
├── pages/            # Page components
│   ├── Contact.tsx
│   ├── Events.tsx
│   ├── Home.tsx
│   ├── Menu.tsx
│   ├── Reserve.tsx
│   └── Story.tsx
├── App.tsx           # Main app with routing
├── index.css         # Global styles
└── main.tsx          # Entry point
```

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/menu` | Menu |
| `/reserve` | Reservations |
| `/story` | Our Story |
| `/events` | Events & Private Dining |
| `/contact` | Contact |

## Design System

### Colors (Tailwind)

- `marine` - Primary dark blue (coastal feel)
- `sand` - Warm off-white (background)
- `ink` - Text colors
- `foam` - Accent color (muted teal)

### Typography

- **Serif**: Playfair Display (headings)
- **Sans**: Inter (body text)

## Features

- Responsive design (mobile-first)
- Accessible HTML with ARIA labels
- Form validation
- Menu filtering and search
- Soft animations and transitions
- Subtle grain texture overlay

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- React Router v6
- Vite

## License

This project is for demonstration purposes.
