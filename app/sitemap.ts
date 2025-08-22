import { getGithubLastEdit } from "fumadocs-core/server"
import type { MetadataRoute } from "next"

import { resourcesSource } from "@/lib/source"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const resourcePages = resourcesSource.getPages()
  const sitemapEntries = await Promise.all(
    resourcePages.map(async (page) => {
      const lastEdit = await getGithubLastEdit({
        owner: "cedricangulo",
        repo: "ca-resources",
        token: `Bearer ${process.env.GITHUB_TOKEN}`,
        sha: "main",
        path: `/content/resources/${page.file.flattenedPath}.mdx`,
      })
      return {
        url: `https://ca-resources.vercel.app/resources/${page.slugs}`,
        lastModified: lastEdit || new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }
    }),
  )

  return [
    {
      url: "https://ca-resources.vercel.app",
      lastModified: "2025-04-15T22:33:00Z",
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    {
      url: "https://ca-resources.vercel.app/guides",
      lastModified: "2025-01-18",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...sitemapEntries,
  ]
}
