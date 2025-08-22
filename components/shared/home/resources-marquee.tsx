"use client"

import { motion } from "motion/react"

import { FC } from "react"

import { Marquee } from "@/components/ui/marquee"

import CustomCard from "../resources/custom-card"

const reviews = [
  {
    title: "Coolors",
    description:
      "Generate or browse beautiful color combinations for your designs.",
    icon: "/resources/colors/coolors.png",
    href: "https://coolors.co/",
    category: "colors",
  },
  {
    title: "Font Awesome",
    description:
      "The internet’s icon library + toolkit. Used by millions of designers, devs, & content creators. Open-source. Always free. Always awesome.",
    icon: "/resources/icons/fontawesome.svg",
    href: "https://fontawesome.com/",
  },
  {
    title: "Dribbble",
    description:
      "Find Top Designers & Creative Professionals on Dribbble. We are where designers gain inspiration, feedback, community, and jobs. Your best resource to discover and connect with designers worldwide.",
    icon: "/resources/inspirations/dribbble.jpg",
    href: "https://dribbble.com/",
  },
  {
    title: "Ls",
    description:
      "Free and premium mockups, UI/UX tools, scene creators for busy designers.",
    icon: "/resources/mockups/lsgraphics.svg",
    href: "https://www.ls.graphics/free-mockups/",
  },
  {
    title: "Freepik",
    description:
      "Millions of free graphic resources. ✓ Photos ✓ AI images ✓ Vectors ✓ Icons ✓ Templates ✓ Videos. Find out about our real-time AI art generator.",
    icon: "/resources/mockups/freepik.svg",
    href: "https://www.freepik.com/",
  },
  {
    title: "Google Fonts",
    description: "A vast collection of open-source fonts provided by Google.",
    icon: "/resources/typography/google-fonts.svg",
    href: "https://fonts.google.com",
  },
  {
    title: "The Odin Project",
    description:
      "The Odin Project empowers aspiring web developers to learn together for free",
    icon: "/resources/learnwebdev/top.png",
    href: "https://theodinproject.com/",
  },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const ResourcesMarquee: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        delay: 0.25,
        duration: 0.5,
        type: "spring",
        damping: 15,
        stiffness: 100,
      }}
      className="bg-card relative flex w-full flex-col items-center justify-center overflow-hidden"
    >
      <Marquee
        pauseOnHover
        className="[--duration:20s]"
        aria-label="First row of resource reviews"
      >
        {firstRow.map((review) => (
          <CustomCard
            className="max-w-52 md:max-w-sm"
            key={review.title}
            {...review}
          />
        ))}
      </Marquee>
      <Marquee
        reverse
        pauseOnHover
        className="[--duration:20s]"
        aria-label="Second row of resource reviews"
      >
        {secondRow.map((review) => (
          <CustomCard
            className="max-w-52 md:max-w-sm"
            key={review.title}
            {...review}
          />
        ))}
      </Marquee>
      <div className="from-card pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r"></div>
      <div className="from-card pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l"></div>
    </motion.div>
  )
}
ResourcesMarquee.displayName = "ResourcesMarquee"

export default ResourcesMarquee
