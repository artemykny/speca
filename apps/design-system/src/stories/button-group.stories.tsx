import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { ButtonGroup, ButtonGroupText } from "../components/ui/button-group"
import { Button } from "../components/ui/button"

function Example() {
  const [zoom, setZoom] = useState(100)

  return (
    <ButtonGroup aria-label="Zoom controls">
      <Button variant="outline" aria-label="Zoom out" disabled={zoom <= 50} onClick={() => setZoom(zoom - 10)}>−</Button>
      <ButtonGroupText aria-live="polite">{zoom}%</ButtonGroupText>
      <Button variant="outline" aria-label="Zoom in" disabled={zoom >= 150} onClick={() => setZoom(zoom + 10)}>+</Button>
    </ButtonGroup>
  )
}

const meta = {
  title: "Components/Button group",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
