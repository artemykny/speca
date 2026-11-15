import type { Meta, StoryObj } from "@storybook/react-vite"
import { CodeBlock, CodeBlockActions, CodeBlockContent, CodeBlockCopyButton, CodeBlockHeader, CodeBlockLine, CodeBlockTitle } from "../components/ui/code-block"
import { useHighlightedCode } from "../hooks/use-highlighted-code"

const code = 'const change = {\n  title: "Update navigation",\n  status: "draft",\n}'

function HighlightedCode() {
  const lines = useHighlightedCode(code, "typescript")

  return (
    <CodeBlock className="w-[min(32rem,85vw)]">
      <CodeBlockHeader>
        <CodeBlockTitle>change.ts</CodeBlockTitle>
        <CodeBlockActions><CodeBlockCopyButton value={code} /></CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers>
        {lines.map((line, index) => <CodeBlockLine key={index}>{line}</CodeBlockLine>)}
      </CodeBlockContent>
    </CodeBlock>
  )
}

const meta = { title: "Components/Code block", component: HighlightedCode } satisfies Meta<typeof HighlightedCode>
export default meta
export const Default: StoryObj<typeof meta> = {}
