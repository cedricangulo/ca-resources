import { File, Files, Folder } from "fumadocs-ui/components/files"
import { ImageZoom } from "fumadocs-ui/components/image-zoom"
import { Step, Steps } from "fumadocs-ui/components/steps"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"
import defaultMdxComponents from "fumadocs-ui/mdx"

import { LoginForm } from "@/components/shared/login-form"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

import FavoritesPage from "../favorites/favorites-page"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Slider } from "../ui/slider"
import { EmailGenerator } from "./gen-email"
import ImageSection from "./image-section"
import {
  BorderExample,
  DataTable,
  DataTableExample,
  OrderedList,
  SummaryTable,
  TableCellSpanning,
  TableExample,
  UnorderedList,
} from "./mdx-elements"
import CustomCardWithContext from "./resources/custom-card-with-context"
import { Wrapper } from "./wrapper"

export const components = {
  BorderExample,
  Button,
  Checkbox,
  CustomCard: CustomCardWithContext,
  FavoritesPage,
  DataTable,
  DataTableExample,
  EmailGenerator,
  File,
  Files,
  Folder,
  Image: (props: React.ComponentProps<typeof ImageZoom>) => (
    <ImageZoom {...props} />
  ),
  ImageSection,
  Input,
  Label,
  LoginForm,
  OrderedList,
  RadioGroup,
  RadioGroupItem,
  Slider,
  Step,
  Steps,
  SummaryTable,
  Tab,
  Tabs,
  TableCellSpanning,
  TableExample,
  Textarea,
  UnorderedList,
  Wrapper,
  ...defaultMdxComponents,
  // Override the default Cards container classes globally for MDX
  Cards: (props: React.ComponentProps<"div">) => {
    const DefaultCards = defaultMdxComponents.Cards
    return (
      <DefaultCards
        {...props}
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 gap-3 @container",
          props.className,
        )}
      />
    )
  },
}
