import {
  defineDocs,
} from "fumadocs-mdx/config"

export const { docs: guides, meta: guidesMeta } = defineDocs({
  dir: "content/guides",
})

export const { docs: resources, meta: resourcesMeta } = defineDocs({
  dir: "content/resources",
})
