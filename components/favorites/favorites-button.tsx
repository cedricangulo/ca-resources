"use client"

import { Heart } from "lucide-react"

import { IconButton } from "@/components/animate-ui/buttons/icon"
import { useFavorites } from "@/hooks/use-favorites"
import { cn } from "@/lib/utils"
import type { CreateFavoriteInput } from "@/types/favorites"

interface FavoritesButtonProps {
  resource: CreateFavoriteInput
  className?: string
}

export function FavoritesButton({ resource, className }: FavoritesButtonProps) {
  const { toggleFavorite, isFavorite, isLoaded } = useFavorites()

  const favorited = isLoaded ? isFavorite(resource.title, resource.href) : false

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent link navigation
    e.stopPropagation() // Prevent event bubbling
    toggleFavorite(resource)
  }

  if (!isLoaded) {
    // Show placeholder while loading to prevent layout shift
    return (
      <div
        className={cn(
          "absolute right-2 top-2 opacity-0 transition-opacity",
          className,
        )}
      >
        <IconButton
          icon={Heart}
          active={false}
          animate={false}
          size="sm"
          disabled
          aria-label="Loading favorites"
          color={[156, 163, 175]}
        />
      </div>
    )
  }

  return (
    <div className={cn("absolute right-2 top-2", className)}>
      <IconButton
        icon={Heart}
        active={favorited}
        animate={true}
        // size="sm"
        onClick={handleToggle}
        color={favorited ? [239, 68, 68] : [156, 163, 175]}
        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        title={favorited ? "Remove from favorites" : "Add to favorites"}
        className="hover:bg-background/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  )
}
