# CA Resources - GitHub Copilot Instructions

## Project Architecture

This is a **Next.js 15 documentation site** built with Fumadocs for curated web development resources and guides. The site features a **dual content system** (Resources + Guides) with a **client-side favorites system**.

### Key Architecture Patterns

- **Fumadocs Integration**: Content sources from `lib/source.ts` connect MDX files to search API and navigation
- **Dual Content Collections**: `guidesSource` and `resourcesSource` are independently managed via `source.config.ts`
- **Client-Side Favorites**: Uses localStorage with cross-component synchronization via custom events (`use-favorites.ts`)
- **Resource Cards**: External links with integrated favorites functionality (see `custom-card.tsx`)

## Essential Development Knowledge

### Content Management Flow

```typescript
// Content structure: content/{guides|resources}/*.mdx → .source/index.ts → lib/source.ts → API routes
// Navigation: content/*/meta.json defines folder structure and ordering
```

### Favorites System Architecture

- **Hook**: `useFavorites()` manages state with localStorage persistence and cross-component sync
- **Components**: `FavoritesButton` integrates into resource cards, `favorites-page.tsx` displays collections
- **Data Migration**: `migrateFavoritesData()` handles schema changes in `lib/favorites.ts`
- **ID Generation**: Deterministic IDs from title+href prevent duplicates

### Component Patterns

- **Cards**: `CustomCard` is the standard resource presentation with automatic favorites integration
- **Layout**: Uses Fumadocs `HomeLayoutProps` in `layout.config.tsx` for navigation structure
- **Styling**: `cn()` utility with Prettier auto-sorting via `prettier-plugin-tailwindcss`

## Development Workflows

### Adding New Resources

1. Create MDX in `content/resources/category-name.mdx`
2. Update `content/resources/meta.json` for navigation
3. Use `CustomCard` components within MDX for external links
4. Resources automatically appear in search and favorites system

### Adding New Guides

1. Create MDX in `content/guides/(category)/page-name.mdx`
2. Update `content/guides/(category)/meta.json`
3. Guides support full documentation features (code blocks, navigation, etc.)

### Local Development

```bash
bun dev          # Development server with Turbopack
bun run build    # Production build
bun run format   # Prettier formatting with Tailwind sorting
```

## Project-Specific Conventions

### Import Organization (Auto-sorted by Prettier)

```typescript
// React first
import { Metadata } from "next"

import React from "react"

// Next.js imports
import { cn } from "@/lib/utils"

// Internal @/ imports
import "./styles.css"

// Relative imports last
```

### Favorites Button Integration

Always add to resource cards with responsive visibility:

```tsx
<FavoritesButton
  resource={{ title, href, icon, description, category }}
  className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
/>
```

### Custom Card Usage Pattern

```tsx
<CustomCard
  title="Tool Name"
  description="Brief description"
  href="https://external-link.com"
  icon="/path/to/icon.png" // or React component
  category="tools" // for favorites organization
/>
```

## Integration Points

- **Search API**: `/api/search/route.ts` combines both content sources for unified search
- **External Links**: All resource cards open in new tabs with `?ref=ca-resources.vercel.app`
- **Image Optimization**: Remote images from `gvmemz92tx.ufs.sh` configured in `next.config.mjs`
- **Theme System**: Uses Fumadocs `RootProvider` with custom CSS variables in `global.css`

## Critical Files for Understanding

- `lib/source.ts` - Content source configuration and API integration
- `hooks/use-favorites.ts` - Complete favorites state management with persistence
- `components/shared/resources/custom-card.tsx` - Standard resource presentation
- `app/layout.config.tsx` - Navigation and branding configuration
- `source.config.ts` - Fumadocs content collection definitions

## Common Debugging

- **Favorites not syncing**: Check localStorage in DevTools, verify event listeners in `use-favorites.ts`
- **Search not working**: Verify content sources are properly exported from `.source/index.ts`
- **Navigation issues**: Check `meta.json` files for proper structure and ordering
- **Build failures**: Usually MDX syntax errors or missing frontmatter in content files

When modifying this codebase, maintain the existing Fumadocs patterns and ensure favorites functionality remains compatible with the localStorage-based synchronization system.
