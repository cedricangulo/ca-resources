import { getGithubLastEdit } from "fumadocs-core/content/github"
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page"

import { notFound } from "next/navigation"

import { components } from "@/components/shared/mdx-components"
import { PageProvider } from "@/components/shared/page-context"
import { generateResourcesMetadata } from "@/lib/metadata"
import { resourcesSource } from "@/lib/source"
import type { MDXPageData } from "@/types/fumadocs"

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = resourcesSource.getPage(params.slug)
  if (!page) notFound()

  const path = `content/resources/${page.path}.mdx`

  const time =
    process.env.NODE_ENV === "development"
      ? null
      : await getGithubLastEdit({
          owner: "cedricangulo",
          repo: "ca-resources",
          token: `Bearer ${process.env.GITHUB_TOKEN}`,
          sha: "main",
          path: path,
        })

  // Cast to MDXPageData to access body and toc
  const pageData = page.data as MDXPageData
  const MDXContent = pageData.body
  const toc = pageData.toc
  const category = (page.data.title || "").toLowerCase().replace(/\s+/g, "-")

  // * Check if this is the favorites page to exclude editOnGithub button
  const isFavoritesPage = params.slug && params.slug.includes("favorites")
  const editOnGithubProps = isFavoritesPage
    ? undefined
    : {
        owner: "cedricangulo",
        repo: "ca-resources",
        sha: "main",
        path: path,
      }

  const showLastUpdate = isFavoritesPage ? undefined : time || undefined

  return (
    <PageProvider category={category}>
      <DocsPage
        lastUpdate={showLastUpdate}
        tableOfContent={{
          style: "clerk",
          single: false,
        }}
        editOnGithub={editOnGithubProps}
        toc={toc}
      >
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody>
          <MDXContent components={components} />
        </DocsBody>
      </DocsPage>
    </PageProvider>
  )
}

export function generateStaticParams() {
  return resourcesSource.generateParams()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug = [] } = await params
  const page = resourcesSource.getPage(slug)
  if (!page) notFound()

  return generateResourcesMetadata(slug, {
    title: page.data.title || "",
    description: page.data.description,
  })
}
