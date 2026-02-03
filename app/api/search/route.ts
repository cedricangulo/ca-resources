import { createSearchAPI } from "fumadocs-core/search/server"

import { guidesSource, resourcesSource } from "@/lib/source"
import type { MDXPageData } from "@/types/fumadocs"

export const { GET } = createSearchAPI("advanced", {
  indexes: [
    ...resourcesSource.getPages().map((page) => {
      const pageData = page.data as MDXPageData
      return {
        title: page.data.title || "",
        description: page.data.description || "",
        url: page.url,
        id: page.url,
        structuredData: pageData.structuredData,
        tag: "Resources",
      }
    }),
    ...guidesSource.getPages().map((page) => {
      const pageData = page.data as MDXPageData
      return {
        title: page.data.title || "",
        description: page.data.description || "",
        url: page.url,
        id: page.url,
        structuredData: pageData.structuredData,
        tag: "Guides",
      }
    }),
  ],
})
