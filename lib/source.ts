import { loader } from "fumadocs-core/source"
import { toFumadocsSource } from "fumadocs-mdx/runtime/server"

import { guides, guidesMeta, resources, resourcesMeta } from "@/.source"

export const guidesSource = loader({
  baseUrl: "/guides",
  source: toFumadocsSource(guides, guidesMeta),
})

export const resourcesSource = loader({
  baseUrl: "/resources",
  source: toFumadocsSource(resources, resourcesMeta),
})
