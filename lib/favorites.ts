import type { FavoriteResource } from "@/types/favorites"

// Generate unique ID from title and href
export function generateFavoriteId(title: string, href: string): string {
  return `${title}-${href}`.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()
}

// Validate favorite resource data
export function validateFavoriteResource(
  resource: unknown,
): resource is FavoriteResource {
  return (
    typeof resource === "object" &&
    resource !== null &&
    typeof (resource as Record<string, unknown>).id === "string" &&
    typeof (resource as Record<string, unknown>).title === "string" &&
    typeof (resource as Record<string, unknown>).href === "string" &&
    typeof (resource as Record<string, unknown>).description === "string" &&
    typeof (resource as Record<string, unknown>).category === "string" &&
    typeof (resource as Record<string, unknown>).addedAt === "number" &&
    ((resource as Record<string, unknown>).icon === undefined || typeof (resource as Record<string, unknown>).icon === "string")
  )
}

// Clean and migrate old favorites data
export function migrateFavoritesData(rawData: unknown[]): FavoriteResource[] {
  return rawData.filter(validateFavoriteResource).map((favorite) => ({
    ...favorite,
    // Ensure icon is string or undefined (remove any ReactNode references)
    icon: typeof favorite.icon === "string" ? favorite.icon : undefined,
  }))
}

// Get category display name
export function getCategoryDisplayName(category: string): string {
  return category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
}
