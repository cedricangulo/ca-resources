"use client"

import {
  FunctionSquare,
  ImageIcon,
  Layers3,
  List,
  MousePointerClick,
  Table,
} from "lucide-react"
import { motion } from "motion/react"
import { Route } from "next"

import React from "react"

const guidesHighlights = [
  {
    title: "Creating Images",
    icon: <ImageIcon className="size-5 md:size-6" />,
    description:
      "Images can improve the design and the appearance of a web page.",
    href: "/guides/images",
  },
  {
    title: "Lists",
    icon: <List className="size-5 md:size-6" />,
    description: "Lists are used to group items in a list of items.",
    href: "/guides/lists",
  },
  {
    title: "Table",
    icon: <Table className="size-5 md:size-6" />,
    description:
      "HTML tables allow web developers to arrange data into rows and columns.",
    href: "/guides/table",
  },
  {
    title: "Functions",
    icon: <FunctionSquare className="size-5 md:size-6" />,
    description: "Understand how to create and use functions in JavaScript.",
    href: "/guides/functions",
  },
  {
    title: "Event Handler",
    icon: <MousePointerClick className="size-5 md:size-6" />,
    description:
      "Learn how event handlers trigger JavaScript actions on user interactions.",
    href: "/guides/event",
  },
  {
    title: "Document Object Model",
    icon: <Layers3 className="size-5 md:size-6" />,
    description:
      "Understand how to manipulate the Document Object Model (DOM) in JavaScript.",
    href: "/guides/dom",
  },
]

export default function FeaturedGuides() {
  return (
    <div className="z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {guidesHighlights.map((g, index) => (
        <motion.a
          key={g.title}
          href={g.href as Route}
          className="relative border-r border-b border-dashed px-6 py-12"
          aria-label={`Guide: ${g.title}`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              delay: 0.05 * index,
              duration: 0.5,
              type: "spring",
              damping: 15,
              stiffness: 100,
            }}
          >
            <div className="mb-4 flex flex-row items-center gap-2">
              {g.icon}
              <h2 className="text-sm font-medium md:text-base">{g.title}</h2>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              {g.description}
            </p>
          </motion.div>
        </motion.a>
      ))}
    </div>
  )
}
FeaturedGuides.displayName = "FeaturedGuides"
