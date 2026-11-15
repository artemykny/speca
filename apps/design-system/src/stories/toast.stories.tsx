import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Button } from "../components/ui/button"
import { createToastManager, Toaster } from "../components/ui/toast"

function Notifications() {
  const [manager] = useState(() => createToastManager())

  return (
    <Toaster toastManager={manager}>
      <Button onClick={() => manager.add({ title: "Changes saved", description: "Your draft is ready for review.", type: "success" })}>
        Show notification
      </Button>
    </Toaster>
  )
}

const meta = { title: "Components/Toast", component: Notifications } satisfies Meta<typeof Notifications>
export default meta
export const Default: StoryObj<typeof meta> = {}
