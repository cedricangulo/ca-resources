import { notFound } from "next/navigation"

import { guidesSource } from "@/lib/source"

import { generateOGImage } from "./og"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params
  const page = guidesSource.getPage(slug.slice(0, -1))
  if (!page) notFound()

  return generateOGImage({
    title: page.data.title || "",
    description: page.data.description || "",
  })
}

export function generateStaticParams() {
  return guidesSource.generateParams().map((page) => ({
    ...page,
    slug: [...page.slug, "image.png"],
  }))
}
