"use client"

import { usePageContext } from "../page-context"
import CustomCard from "./custom-card"

interface ICustomCardWithContext {
  title: string
  icon?: React.ReactNode | string
  description: string
  href?: string
  className?: string
}

export default function CustomCardWithContext(props: ICustomCardWithContext) {
  const { category } = usePageContext()

  return (
    <CustomCard
      {...props}
      category={category}
    />
  )
}
