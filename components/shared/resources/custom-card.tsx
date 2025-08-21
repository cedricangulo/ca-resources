"use client"

import { Box, Heart } from "lucide-react"

import { ReactNode, useEffect, useState } from "react"

import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { generateCardId, useFavorites } from "@/lib/favorites"

interface ICustomCard {
  title: string
  icon?: ReactNode | string
  description: string
  href?: string
  className?: string
  id?: string // Optional ID, will be auto-generated if not provided
}

export default function CustomCard({
  title,
  href,
  icon,
  description,
  className,
  id,
}: ICustomCard) {
  const [cardId, setCardId] = useState<string>("")
  
  // Generate ID on client side to avoid SSR issues
  useEffect(() => {
    setCardId(id || generateCardId(title, href || ""))
  }, [id, title, href])
  
  // Use favorites hook
  const { isFavorite, toggleFavorite } = useFavorites()
  const isCurrentlyFavorite = cardId ? isFavorite(cardId) : false

  // Handle favorite toggle
  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault() // Prevent link navigation
    e.stopPropagation() // Stop event bubbling
    
    if (cardId) {
      await toggleFavorite({
        id: cardId,
        title,
        href: href || "",
        description,
        icon: typeof icon === "string" ? icon : undefined,
      })
    }
  }

  return (
    <Link
      className={cn(
        "not-prose bg-card text-card-foreground hover:bg-accent/80 block rounded-lg border p-4 text-sm shadow-xs transition-colors hover:shadow",
        className,
      )}
      href={`${href}?ref=ca-resources.vercel.app`}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
      prefetch={false}
      aria-label={title}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <div
            className="not-prose bg-muted text-muted-foreground mr-2 w-fit rounded-sm border p-1.5 [&_svg]:size-4"
            role="img"
          >
            {typeof icon === "string" ? (
              <Image
                src={icon}
                alt={title}
                width={16}
                height={16}
                className="size-4 min-w-4"
              />
            ) : icon ? (
              icon
            ) : (
              <Box className="size-4 min-w-4" />
            )}
          </div>
          <h4 className="text-base font-medium">{title}</h4>
        </div>
        
        {/* Favorites heart icon - only render on client side */}
        {cardId && (
          <button
            onClick={handleFavoriteClick}
            className={cn(
              "rounded-full p-1 transition-colors hover:bg-accent/50",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
            )}
            aria-label={isCurrentlyFavorite ? "Remove from favorites" : "Add to favorites"}
            type="button"
          >
            <Heart
              className={cn(
                "size-4 transition-colors",
                isCurrentlyFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-muted-foreground hover:text-red-500"
              )}
            />
          </button>
        )}
      </div>
      <p className="text-muted-foreground line-clamp-2">{description}</p>
    </Link>
  )
}
