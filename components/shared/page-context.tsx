"use client"

import { ReactNode, createContext, useContext } from "react"

interface PageContextValue {
  category: string
}

const PageContext = createContext<PageContextValue | undefined>(undefined)

export function PageProvider({
  children,
  category,
}: {
  children: ReactNode
  category: string
}) {
  return (
    <PageContext.Provider value={{ category }}>{children}</PageContext.Provider>
  )
}

export function usePageContext() {
  const context = useContext(PageContext)
  if (context === undefined) {
    throw new Error("usePageContext must be used within a PageProvider")
  }
  return context
}
