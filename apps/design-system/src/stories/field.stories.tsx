import type { Meta, StoryObj } from "@storybook/react-vite"
import { useId, useState } from "react"
import { Field, FieldLabel, FieldDescription, FieldError } from "../components/ui/field"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"

function Example() {
  const id = useId()
  const [name, setName] = useState("")
  const [submitted, setSubmitted] = useState(false)

  return (
    <form className="grid w-[min(24rem,85vw)] gap-4" noValidate onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
      <Field data-invalid={submitted && !name.trim()}>
        <FieldLabel htmlFor={id}>Change name</FieldLabel>
        <Input id={id} value={name} onChange={(event) => { setName(event.target.value); setSubmitted(false) }} aria-invalid={submitted && !name.trim()} aria-describedby={`${id}-help${submitted && !name.trim() ? ` ${id}-error` : ""}`} />
        <FieldDescription id={`${id}-help`}>Choose a name that describes the edit.</FieldDescription>
        {submitted && !name.trim() && <FieldError id={`${id}-error`}>Enter a change name.</FieldError>}
      </Field>
      <Button type="submit">Save name</Button>
      <p role="status" className="text-sm text-muted-foreground">{submitted && name.trim() ? `Saved “${name.trim()}”.` : ""}</p>
    </form>
  )
}

const meta = {
  title: "Components/Field",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
