# CA Resources - Agent Guidelines

## Project Overview

Next.js 15 documentation site with Fumadocs for curated web development resources and guides. Features a dual content system (Resources + Guides) and client-side favorites system with localStorage persistence.

## Build/Lint/Test Commands

```bash
# Development
bun dev                 # Start dev server with Turbopack
bun run build           # Production build with Turbopack
bun start               # Start production server

# Code Quality
bun run lint            # Run ESLint
bun run format          # Format with Prettier + Tailwind sorting
bun run clean           # Clean .next and .source directories
bun run postinstall     # Run fumadocs-mdx setup
```

**Note:** No test runner is configured in this project.

## Code Style Guidelines

### Import Organization (Auto-sorted by Prettier)

Order: React → Next.js → Internal @/ imports → Relative imports

```typescript
// React first
// Next.js
import { Metadata } from "next"

import { useEffect, useState } from "react"

import { useFavorites } from "@/hooks/use-favorites"
// Internal @/ imports
import { cn } from "@/lib/utils"

// Relative imports last
import "./styles.css"
```

### Naming Conventions

- **Components:** PascalCase (`CustomCard`, `FavoritesButton`)
- **Hooks:** camelCase with `use` prefix (`useFavorites`, `useMeasure`)
- **Utilities:** camelCase (`cn`, `generateFavoriteId`)
- **Types:** PascalCase with descriptive names (`FavoriteResource`, `CreateFavoriteInput`)
- **Files:** kebab-case for non-component files, PascalCase for components
- **Constants:** UPPER_SNAKE_CASE for true constants (`STORAGE_KEY`, `FAVORITES_EVENT`)

### TypeScript Types

- Use explicit return types on exported functions
- Prefer interfaces for object shapes, types for unions/complex types
- Use `type` imports when only importing types: `import type { Favorite } from "@/types"`
- Enable strict mode (enabled in tsconfig)

### Styling with Tailwind CSS

Use `cn()` utility from `@/lib/utils` to combine classes. Prettier auto-sorts classes via `prettier-plugin-tailwindcss`.

```tsx
className={cn(
  // Base styles - automatically sorted by Prettier
  "inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
  // Variant styles
  variant === "default" && "bg-primary text-white hover:bg-primary-focus",
  // Responsive styles - automatically sorted
  "w-full text-sm sm:w-auto md:text-base",
  // State styles
  disabled && "cursor-not-allowed opacity-50",
  // External classes always last
  className,
)}
```

### Error Handling

- Use try/catch for localStorage operations (check `typeof window` first)
- Log errors to console with descriptive messages
- Return safe defaults on failure (empty arrays, null values)

```typescript
try {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return []
  return JSON.parse(stored)
} catch (error) {
  console.error("Failed to load favorites:", error)
  return []
}
```

### Client Components

Mark client components explicitly at the top:

```typescript
"use client"

import { useEffect, useState } from "react"
```

## Key Architectural Patterns

### Fumadocs Content System

```
content/{guides|resources}/*.mdx → .source/index.ts → lib/source.ts → API routes
```

- Update `meta.json` files to define navigation structure
- Use `CustomCard` component in MDX for external resource links

### Favorites System

- Hook: `useFavorites()` for state management and persistence
- Storage key: `ca-resources-favorites`
- Cross-component sync via custom event: `favorites-updated`
- ID generation: Deterministic from `title + href`

### Environment Constraints

- Always check `typeof window !== "undefined"` before accessing browser APIs
- Handle localStorage operations in try/catch blocks
- External links should include `?ref=ca-resources.vercel.app`

## Critical Files

- `lib/source.ts` - Content source configuration
- `source.config.ts` - Fumadocs collection definitions
- `hooks/use-favorites.ts` - Favorites state management
- `app/layout.config.tsx` - Navigation and branding
- `lib/utils.ts` - `cn()` utility for Tailwind

## Copilot Instructions (from .github/)

See `.github/copilot-instructions.md` and `.github/instructions/styling.instructions.md` for full guidelines on Fumadocs integration, favorites system, and Tailwind class organization.
