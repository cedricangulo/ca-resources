import { HomeLayoutProps } from "fumadocs-ui/layouts/home"
import { Book, Box, Heart } from "lucide-react"

import React from "react"

import Image from "next/image"

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: HomeLayoutProps = {
  githubUrl: "https://github.com/cedricangulo/ca-resources",
  nav: {
    transparentMode: "top",
    title: (
      <>
        <Image
          alt="CA Resources logo"
          src="https://gvmemz92tx.ufs.sh/f/bnhBIvQHoxyMm919C1aUAiquZeMHCgXTYKxvsF7B3S2DyOjo"
          width={27}
          height={20}
          className="invert dark:invert-0"
          priority
          fetchPriority="high"
        />
        CA Resources
      </>
    ),
  },
  links: [
    // {
    // 	type: "menu",
    // 	text: "v1.6.0",
    // 	items: [
    // 		{
    // 			icon: <Check />,
    // 			text: "v1.9.8",
    // 			url: "https://ca-resources.vercel.app/",
    // 			external: false,
    // 		},
    // 		{
    // 			icon: <div className="size-4" />,
    // 			text: "v1.2.6",
    // 			url: "https://v1-ca-resources.vercel.app/",
    // 			external: false,
    // 		},
    // 	],
    // },
    {
      icon: <Box />,
      text: "Resources",
      url: "/resources/chrome-extensions",
      active: "none",
    },
    {
      icon: <Heart />,
      text: "Favorites",
      url: "/resources/favorites",
      active: "none",
    },
    {
      icon: <Book />,
      text: "Guides",
      url: "/guides",
      active: "none",
    },
  ],
}
