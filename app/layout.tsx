import { RootProvider } from "fumadocs-ui/provider/next"
import { Metadata } from "next"

import type { ReactNode } from "react"

import localFont from "next/font/local"

import { cn } from "@/lib/utils"

import "./global.css"

const mono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  display: "swap",
  variable: "--geist-mono",
})

const sans = localFont({
  src: "./fonts/GeistVF.woff",
  display: "swap",
  variable: "--geist-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://ca-resources.vercel.app"),
  title: {
    template: "%s | CA Resources",
    default: "CA Resources",
  },
  description: `Boost your productivity with valuable web development resources and educational guides.`,
  openGraph: {
    title: "CA Resources",
    description:
      "Boost your productivity with valuable web development resources and educational guides.",
    url: "https://ca-resources.vercel.app",
    siteName: "CA Resources",
    images: [
      {
        url: "https://gvmemz92tx.ufs.sh/f/bnhBIvQHoxyMMlsgS1q7Xg1VjFtBmd2lkRW0euP4q3pDSbKn",
        width: 1920,
        height: 1080,
        alt: "CA Resources",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CA Resources",
    description:
      "Boost your productivity with valuable web development resources and educational guides.",
    images: [
      "https://gvmemz92tx.ufs.sh/f/bnhBIvQHoxyMMlsgS1q7Xg1VjFtBmd2lkRW0euP4q3pDSbKn",
    ],
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={cn(
          sans.variable,
          sans.className,
          mono.variable,
          "relative overflow-x-hidden",
        )}
      >
        <RootProvider
          search={{
            // options: {
            // 	tags: [
            // 		{
            // 			name: "Resources",
            // 			value: "resources",
            // 		},
            // 		{
            // 			name: "Guides",
            // 			value: "guides",
            // 		},
            // 	],
            // },
            hotKey: [
              {
                display: "K",
                key: "k", // key code, or a function determining whether the key is pressed
              },
            ],
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  )
}

// ʕ•ᴥ•ʔ
