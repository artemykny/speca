import type { Meta, StoryObj } from "@storybook/react-vite"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../components/ui/carousel"

function Example() {
  return (
    <Carousel className="mx-12 w-[min(20rem,65vw)]" aria-label="Change previews">
      <CarouselContent>{["Navigation", "Search", "Settings"].map((name) => (
        <CarouselItem key={name}><div className="flex aspect-square items-center justify-center rounded-lg border bg-card p-6 text-lg font-medium">{name}</div></CarouselItem>
      ))}</CarouselContent>
      <CarouselPrevious /><CarouselNext />
    </Carousel>
  )
}

const meta = {
  title: "Components/Carousel",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
