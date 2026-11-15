import type { Meta, StoryObj } from "@storybook/react-vite"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../components/ui/chart"

function ChangesChart() {
  return (
    <ChartContainer className="h-64 w-[min(32rem,85vw)]" config={{ changes: { label: "Changes", color: "var(--chart-1)" } }}>
      <BarChart accessibilityLayer data={[{ day: "Mon", changes: 8 }, { day: "Tue", changes: 12 }, { day: "Wed", changes: 6 }, { day: "Thu", changes: 15 }, { day: "Fri", changes: 10 }]}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="changes" fill="var(--color-changes)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

const meta = { title: "Components/Chart", component: ChangesChart } satisfies Meta<typeof ChangesChart>

export default meta
export const Default: StoryObj<typeof meta> = {}
