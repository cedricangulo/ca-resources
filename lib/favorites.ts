"use client"

import { useEffect, useState } from "react"

// Favorite item structure
export interface FavoriteItem {
  id: string
  title: string
  href: string
  description: string
  icon?: string
  dateAdded: number
}

// Generate unique ID for a card based on title and href
export function generateCardId(title: string, href: string): string {
  const content = `${title}-${href}`
  // Simple hash function for ID generation
  let hash = 0
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36)
}

// IndexedDB utilities
class FavoritesDB {
  private dbName = "ca-resources-favorites"
  private dbVersion = 1
  private storeName = "favorites"
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    if (typeof window === "undefined") return

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: "id" })
          store.createIndex("dateAdded", "dateAdded", { unique: false })
        }
      }
    })
  }

  async addFavorite(item: Omit<FavoriteItem, "dateAdded">): Promise<void> {
    if (!this.db) await this.init()
    if (!this.db) throw new Error("Database not initialized")

    const favoriteItem: FavoriteItem = {
      ...item,
      dateAdded: Date.now(),
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], "readwrite")
      const store = transaction.objectStore(this.storeName)
      const request = store.put(favoriteItem)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async removeFavorite(id: string): Promise<void> {
    if (!this.db) await this.init()
    if (!this.db) throw new Error("Database not initialized")

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], "readwrite")
      const store = transaction.objectStore(this.storeName)
      const request = store.delete(id)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async getFavorites(): Promise<FavoriteItem[]> {
    if (!this.db) await this.init()
    if (!this.db) return []

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], "readonly")
      const store = transaction.objectStore(this.storeName)
      const request = store.getAll()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result || [])
    })
  }

  async isFavorite(id: string): Promise<boolean> {
    if (!this.db) await this.init()
    if (!this.db) return false

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], "readonly")
      const store = transaction.objectStore(this.storeName)
      const request = store.get(id)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(!!request.result)
    })
  }
}

// Singleton instance
const favoritesDB = new FavoritesDB()

// Custom hook for favorites functionality
export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [loading, setLoading] = useState(true)

  // Load favorites on mount
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const items = await favoritesDB.getFavorites()
        setFavorites(items)
      } catch (error) {
        console.error("Failed to load favorites:", error)
      } finally {
        setLoading(false)
      }
    }

    loadFavorites()
  }, [])

  const addFavorite = async (item: Omit<FavoriteItem, "dateAdded">) => {
    try {
      await favoritesDB.addFavorite(item)
      const updatedFavorites = await favoritesDB.getFavorites()
      setFavorites(updatedFavorites)
    } catch (error) {
      console.error("Failed to add favorite:", error)
    }
  }

  const removeFavorite = async (id: string) => {
    try {
      await favoritesDB.removeFavorite(id)
      setFavorites((prev) => prev.filter((item) => item.id !== id))
    } catch (error) {
      console.error("Failed to remove favorite:", error)
    }
  }

  const isFavorite = (id: string): boolean => {
    return favorites.some((item) => item.id === id)
  }

  const toggleFavorite = async (item: Omit<FavoriteItem, "dateAdded">) => {
    if (isFavorite(item.id)) {
      await removeFavorite(item.id)
    } else {
      await addFavorite(item)
    }
  }

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  }
}