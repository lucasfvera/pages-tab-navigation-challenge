# Fillout Challenge - Pages Tab Navigation

A modern, interactive form builder interface built with Next.js, featuring drag-and-drop page management, context menus, and smooth animations.

## Live Demo

- **GitHub Repository**: [https://github.com/lucasfvera/pages-tab-navigation-challenge](https://github.com/lucasfvera/pages-tab-navigation-challenge)
- **Deployed Version**: [https://pages-tab-navigation-challenge.vercel.app/](https://pages-tab-navigation-challenge.vercel.app/)

## Key Features

### Core Requirements

- **Form Pages Display**: Shows a series of form pages (Info, Details, Other, Ending)
- **Drag & Drop Reordering**: Support drag to re-order pages
- **Add Page Between**: Support adding a new page between any two existing pages via a "+" button that appears on hover
- **Context Menu**: Open a context menu per page (rename, duplicate, delete - those buttons don't need to do anything though)
- **Active Page Indication**: Highlight the active page
- **Page Selection**: Allow selecting other pages

### UI/UX Enhancements

- Animations for showing the add buttons to ensure smooth transitions when hovering different pages
- Timeout before hiding the buttons to prevent layout shift if the user moves away accidentally
- Show two buttons for adding pages on any side of the hovered page
- Show a drag handle on hover to let the user know they can re-arrange the pages
- Added a 100ms delay when dragging to prevent accidental drags. Also a 10px movement required to start drag to be extra careful

## Technical Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Drag & Drop**: @dnd-kit library
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library
- **Deployment**: Vercel

## Architecture Decisions

### Component Structure (Atomic Design)
```
src/components/
├── Atoms/          # Basic building blocks (TabCard, IconButton, Typography)
├── Molecules/      # Simple combinations (ContextMenu, ContextMenuButton)
└── Organisms/      # Complex components (PagesNavigationBar with drag-drop)
```

### State Management
- **Local State**: All state maintained in memory using React Context
- **Context Pattern**: `LocalPagesContext` for centralized page management
- **No Backend**: Pure frontend implementation as per requirements

## Running Locally

### Installation
```bash
# Clone the repository
git clone https://github.com/lucasfvera/pages-tab-navigation-challenge.git
cd pages-tab-navigation-challenge

# Install dependencies
npm install

# Start development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Scripts
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:cov     # Run tests with coverage
```

## Future Improvements
- Show page preview with a tooltip on hover so the user can know the content of the page without having to navigate to it
- When showing the context menu, add the page title to the menu like "Settings for ..." to give the user extra context about the page they are modifying
- Add the ability to create groups of pages to have a cleaner UI and allow the user to have a better information category