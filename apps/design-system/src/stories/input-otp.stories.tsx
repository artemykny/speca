import type { Meta, StoryObj } from "@storybook/react-vite"
import { useId, useState } from "react"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "../components/ui/input-otp"
import { Label } from "../components/ui/label"

function Example() {
  const id = useId()
  const [value, setValue] = useState("")

  return (
    <div className="grid gap-3">
      <Label htmlFor={id}>Verification code</Label>
      <InputOTP id={id} maxLength={6} value={value} onChange={setValue} pattern="^[0-9]*$">
        <InputOTPGroup>{[0, 1, 2].map((index) => <InputOTPSlot key={index} index={index} />)}</InputOTPGroup><InputOTPSeparator /><InputOTPGroup>{[3, 4, 5].map((index) => <InputOTPSlot key={index} index={index} />)}</InputOTPGroup>
      </InputOTP>
      <p role="status" className="text-sm text-muted-foreground">{value.length === 6 ? "Code complete." : "Enter six digits."}</p>
    </div>
  )
}

const meta = {
  title: "Components/Input OTP",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
