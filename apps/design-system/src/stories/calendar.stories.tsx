import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Calendar } from "../components/ui/calendar"

function DateSelection() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 10, 15))

  return (
    <div className="grid gap-4">
      <Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={new Date(2026, 10, 1)} className="rounded-lg border" />
      <p role="status" className="text-sm text-muted-foreground">
        {date ? date.toLocaleDateString("en-GB", { dateStyle: "long" }) : "Choose a date"}
      </p>
    </div>
  )
}

const meta = { title: "Components/Calendar", component: DateSelection } satisfies Meta<typeof DateSelection>
export default meta
export const Default: StoryObj<typeof meta> = {}
