import { getGithubLastEdit } from "fumadocs-core/server"
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page"

import { notFound } from "next/navigation"

import { components } from "@/components/shared/mdx-components"
import { guidesMetadataImage } from "@/lib/metadata"
import { guidesSource } from "@/lib/source"

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = guidesSource.getPage(params.slug)
  if (!page) notFound()

  const path = `content/guides/${page.file.flattenedPath}.mdx`

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

  const MDXContent = page.data.body

  return (
    <DocsPage
      lastUpdate={time || undefined}
      tableOfContent={{
        style: "clerk",
        single: false,
      }}
      editOnGithub={{
        owner: "cedricangulo",
        repo: "ca-resources",
        sha: "main",
        path: path,
      }}
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
  )
}

export function generateStaticParams() {
  return guidesSource.generateParams()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug = [] } = await params
  const page = guidesSource.getPage(slug)
  if (!page) notFound()

  const image = ["/guides-og", ...slug, "image.png"].join("/")
  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      images: image,
    },
  }
}
