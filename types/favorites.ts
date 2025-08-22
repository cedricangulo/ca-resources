import { ReactNode } from "react"

export interface FavoriteResource {
  id: string
  title: string
  href: string
  icon?: string
  description: string
  category: string
  addedAt: number
}

export interface CreateFavoriteInput {
  title: string
  href: string
  icon?: string | ReactNode
  description: string
  category: string
}
