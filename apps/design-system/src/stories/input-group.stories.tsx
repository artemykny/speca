import type { Meta, StoryObj } from "@storybook/react-vite"
import { useId, useState } from "react"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from "../components/ui/input-group"
import { Label } from "../components/ui/label"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"

function Example() {
  const id = useId()
  const [query, setQuery] = useState("")
  const [result, setResult] = useState("")

  return (
    <form className="grid w-[min(24rem,85vw)] gap-2" onSubmit={(event) => { event.preventDefault(); setResult(query.trim() ? `Searching for “${query.trim()}”.` : "Enter a search term.") }}>
      <Label htmlFor={id}>Search changes</Label>
      <InputGroup><InputGroupAddon><MagnifyingGlassIcon aria-hidden="true" /></InputGroupAddon><InputGroupInput id={id} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Navigation" /><InputGroupAddon align="inline-end"><InputGroupButton type="submit">Search</InputGroupButton></InputGroupAddon></InputGroup>
      <p role="status" className="text-sm text-muted-foreground">{result}</p>
    </form>
  )
}

const meta = {
  title: "Components/Input group",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
