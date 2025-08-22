"use client"

import { useCallback, useEffect, useState } from "react"

import { generateFavoriteId, migrateFavoritesData } from "@/lib/favorites"
import type { CreateFavoriteInput, FavoriteResource } from "@/types/favorites"

const STORAGE_KEY = "ca-resources-favorites"
const FAVORITES_EVENT = "favorites-updated"

function getFavoritesFromStorage(): FavoriteResource[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []

    const rawData = JSON.parse(stored)
    // Migrate and clean data to ensure compatibility
    return migrateFavoritesData(Array.isArray(rawData) ? rawData : [])
  } catch (error) {
    console.error("Failed to load favorites:", error)
    return []
  }
}

function saveFavoritesToStorage(favorites: FavoriteResource[]) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    // Dispatch custom event to sync across components
    window.dispatchEvent(
      new CustomEvent(FAVORITES_EVENT, { detail: favorites }),
    )
  } catch (error) {
    console.error("Failed to save favorites:", error)
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteResource[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load favorites on mount and listen for updates
  useEffect(() => {
    setFavorites(getFavoritesFromStorage())
    setIsLoaded(true)

    const handleFavoritesUpdate = (event: CustomEvent<FavoriteResource[]>) => {
      setFavorites(event.detail)
    }

    window.addEventListener(
      FAVORITES_EVENT,
      handleFavoritesUpdate as EventListener,
    )

    return () => {
      window.removeEventListener(
        FAVORITES_EVENT,
        handleFavoritesUpdate as EventListener,
      )
    }
  }, [])

  const addFavorite = useCallback((input: CreateFavoriteInput) => {
    // Always get fresh data from localStorage to avoid stale state
    const currentFavorites = getFavoritesFromStorage()
    const id = generateFavoriteId(input.title, input.href)

    // Check if already exists
    const exists = currentFavorites.some((f) => f.id === id)
    if (exists) return

    // Convert ReactNode icons to placeholder string
    const iconToSave = typeof input.icon === "string" ? input.icon : undefined

    const newFavorite: FavoriteResource = {
      title: input.title,
      href: input.href,
      description: input.description,
      category: input.category,
      id,
      addedAt: Date.now(),
      icon: iconToSave,
    }

    const newFavorites = [...currentFavorites, newFavorite]
    saveFavoritesToStorage(newFavorites)
  }, [])

  const removeFavorite = useCallback((id: string) => {
    // Always get fresh data from localStorage
    const currentFavorites = getFavoritesFromStorage()
    const newFavorites = currentFavorites.filter((f) => f.id !== id)
    saveFavoritesToStorage(newFavorites)
  }, [])

  const toggleFavorite = useCallback(
    (input: CreateFavoriteInput) => {
      const id = generateFavoriteId(input.title, input.href)
      const currentFavorites = getFavoritesFromStorage()
      const exists = currentFavorites.some((f) => f.id === id)

      if (exists) {
        removeFavorite(id)
      } else {
        addFavorite(input)
      }
    },
    [addFavorite, removeFavorite],
  )

  const isFavorite = useCallback(
    (title: string, href: string) => {
      const id = generateFavoriteId(title, href)
      return favorites.some((f) => f.id === id)
    },
    [favorites],
  )

  const getFavoritesByCategory = useCallback(
    (category: string) => {
      return favorites.filter((f) => f.category === category)
    },
    [favorites],
  )

  const clearAllFavorites = useCallback(() => {
    saveFavoritesToStorage([])
  }, [])

  const getFavoriteById = useCallback(
    (id: string) => {
      return favorites.find((f) => f.id === id)
    },
    [favorites],
  )

  return {
    favorites,
    isLoaded,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    getFavoritesByCategory,
    clearAllFavorites,
    getFavoriteById,
    // Computed values
    favoritesCount: favorites.length,
    categories: [...new Set(favorites.map((f) => f.category))],
  }
}
