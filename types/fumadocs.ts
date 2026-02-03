import type { PageData } from "fumadocs-core/source"
import type { DocData } from "fumadocs-mdx/runtime/types"
import type { MDXProps } from "mdx/types"

import type { FC } from "react"

// Combined type for MDX page data with body, toc, structuredData
export type MDXPageData = PageData & DocData

// Type for the MDX body component
export type MDXContent = FC<MDXProps>
