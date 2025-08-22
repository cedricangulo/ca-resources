"use client"

import { Treadmill } from "ldrs/react"
import "ldrs/react/Treadmill.css"
import { Heart, Trash2 } from "lucide-react"

import Link from "next/link"

import CustomCard from "@/components/shared/resources/custom-card"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/hooks/use-favorites"

const categories = {
  "chrome-extensions": "Chrome Extensions",
  colors: "Colors",
  icons: "Icons",
  illustrations: "Illustrations",
  inspirations: "Inspirations",
  "learn-design": "Learn Design",
  "learn-web-development": "Learn Web Development",
  "mockup-tools": "Mockup Tools",
  "stock-photos": "Stock Photos",
  "svg-generators": "SVG Generators",
  typography: "Typography",
  "ui-components": "UI Components",
}

export default function FavoritesPage() {
  const { favorites, isLoaded, clearAllFavorites, favoritesCount } =
    useFavorites()

  if (!isLoaded) {
    return (
      <>
        <div className="flex items-center justify-center min-h-[400px]">
          <Treadmill
            size="70"
            speed="1.25"
            color="gray"
          />
        </div>
      </>
    )
  }

  if (favorites.length === 0) {
    return (
      <>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center max-w-md">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
              <p className="text-muted-foreground mb-6">
                Start exploring resources and click the heart icon to save your
                favorites here.
              </p>
              <Button
                asChild
                variant="secondary"
                className="not-prose"
              >
                <Link
                  prefetch={false}
                  href="/resources/chrome-extensions"
                >
                  Browse Resources
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  }

  // Group favorites by category
  const favoritesByCategory = favorites.reduce(
    (acc, favorite) => {
      const category = favorite.category
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(favorite)
      return acc
    },
    {} as Record<string, typeof favorites>,
  )

  return (
    <>
      <div className="w-full sm:max-w-6xl sm:mx-auto">
        <div className="flex items-center justify-between mb-8">
          <p className="text-muted-foreground">
            {favoritesCount} {favoritesCount === 1 ? "resource" : "resources"}{" "}
            saved
          </p>

          {favoritesCount > 0 && (
            <Button
              variant="secondary"
              onClick={clearAllFavorites}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        <div className="space-y-12">
          {Object.entries(favoritesByCategory).map(
            ([category, categoryFavorites]) => (
              <div key={category}>
                <h2 className="text-2xl font-semibold mb-6 capitalize">
                  {categories[category as keyof typeof categories] ||
                    category.replace(/-/g, " ")}
                  <span className="text-sm text-muted-foreground font-normal ml-2">
                    ({categoryFavorites.length})
                  </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryFavorites.map((favorite) => (
                    <CustomCard
                      key={favorite.id}
                      title={favorite.title}
                      href={favorite.href}
                      icon={favorite.icon}
                      description={favorite.description}
                      category={favorite.category}
                    />
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </>
  )
}
