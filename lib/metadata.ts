import type { Metadata } from "next"

import { guidesSource, resourcesSource } from "@/lib/source"

export function generateGuidesMetadata(
  slug: string[],
  data: { title: string; description?: string },
): Metadata {
  const page = guidesSource.getPage(slug)
  if (!page) return { title: data.title, description: data.description }

  const ogImageUrl = `/guides-og/${[...slug, "image.png"].join("/")}`

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      url: `/guides/${slug.join("/")}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [ogImageUrl],
    },
  }
}

export function generateResourcesMetadata(
  slug: string[],
  data: { title: string; description?: string },
): Metadata {
  const page = resourcesSource.getPage(slug)
  if (!page) return { title: data.title, description: data.description }

  const ogImageUrl = `/resources-og/${[...slug, "image.png"].join("/")}`

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      url: `/resources/${slug.join("/")}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [ogImageUrl],
    },
  }
}
