"use client"

import { motion } from "motion/react"
import { Route } from "next"

import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function ActionButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)", scale: 0.9 }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      transition={{
        delay: 0.75,
        type: "spring",
        damping: 12,
        stiffness: 100,
      }}
      exit={{ opacity: 0, y: 20 }}
      className="z-10 flex w-fit justify-center gap-3 sm:mx-auto"
    >
      <Button
        variant="outline"
        size="lg"
        asChild
      >
        <Link
          href={`/guides` as Route}
          aria-label="Learn guides"
        >
          Build
        </Link>
      </Button>
      <Button
        size="lg"
        asChild
      >
        <Link
          href="/resources/chrome-extensions"
          aria-label="Explore resources"
        >
          Discover
        </Link>
      </Button>
    </motion.div>
  )
}
ActionButton.displayName = "ActionButton"
