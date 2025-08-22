import { getGithubLastEdit } from "fumadocs-core/server"
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page"

import { notFound } from "next/navigation"

import { components } from "@/components/shared/mdx-components"
import { PageProvider } from "@/components/shared/page-context"
import { resourcesMetadataImage } from "@/lib/metadata"
import { resourcesSource } from "@/lib/source"

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = resourcesSource.getPage(params.slug)
  if (!page) notFound()

  const path = `content/resources/${page.file.flattenedPath}.mdx`

  const time =
    process.env.NODE_ENV === "development"
      ? null
      : await getGithubLastEdit({
          owner: "bryan308",
          repo: "ca-resources",
          token: `Bearer ${process.env.GITHUB_TOKEN}`,
          sha: "main",
          path: path,
        })

  const MDXContent = page.data.body
  const category = page.data.title.toLowerCase().replace(/\s+/g, "-")

  // * Check if this is the favorites page to exclude editOnGithub button
  const isFavoritesPage = params.slug && params.slug.includes("favorites")
  const editOnGithubProps = isFavoritesPage
    ? undefined
    : {
        owner: "bryan308",
        repo: "ca-resources",
        sha: "main",
        path: path,
      }

  return (
    <PageProvider category={category}>
      <DocsPage
        lastUpdate={time || undefined}
        tableOfContent={{
          style: "clerk",
          single: false,
        }}
        editOnGithub={editOnGithubProps}
        toc={page.data.toc}
      >
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody>
          <MDXContent
            code={page.data.body}
            components={components}
          />
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

  return resourcesMetadataImage.withImage(slug, {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      url: `/resources/${slug.join("/")}`,
    },
  })
}
