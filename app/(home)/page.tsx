import { GitHubStarsButton } from "@/components/animate-ui/github-stars-button"
import { Footer } from "@/components/shared/footer"
import {
  ActionButton,
  FeaturedGuides,
  HeroImage,
  HeroParagraph,
  ResourcesMarquee,
  Section,
  SectionTitle,
} from "@/components/shared/home"
import WordReveal from "@/components/ui/word-reveal"
import { cn } from "@/lib/utils"

export default function HomePage() {
  return (
    <>
      <div className="overflow-x-hidden p-4 pt-14 md:pt-12">
        <div className="mt-4 md:mt-10" />
        <Section
          className={cn(
            "flex flex-col px-4 pt-24 pb-0",
            "md:px-12 md:pb-0",
            "z-2",
          )}
        >
          <div className="mx-auto max-w-5xl pb-24">
            <GitHubStarsButton
              username="cedricangulo"
              repo="ca-resources"
              className="mb-6 w-fit sm:mx-auto"
            />
            <WordReveal
              text="Enhance Your Productivity"
              className={cn(
                "text-foreground text-left text-3xl font-normal",
                "sm:text-center sm:text-4xl",
                "md:text-5xl",
              )}
            />
            <HeroParagraph />
            <ActionButton />
          </div>
          <HeroImage />
        </Section>
        <Section className="z-20 p-10">
          <SectionTitle>Explore Top Resources</SectionTitle>
        </Section>
        <Section className="z-20 md:py-20">
          <ResourcesMarquee />
        </Section>
        <Section className="z-20">
          <SectionTitle>Learn the Basics</SectionTitle>
        </Section>
        <Section className="z-20 border-r-0 p-0 md:p-0">
          <FeaturedGuides />
        </Section>
      </div>
      <Footer />
    </>
  )
}
