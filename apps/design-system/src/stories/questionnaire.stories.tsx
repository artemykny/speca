import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Questionnaire, QuestionnaireProgress, QuestionnaireItem, QuestionnaireTitle, QuestionnaireDescription, QuestionnaireChoices, QuestionnaireChoice, QuestionnaireInput, QuestionnaireActions, QuestionnairePrevious, QuestionnaireNext, QuestionnaireSubmit } from "../components/ui/questionnaire"

function Example() {
  const [result, setResult] = useState("")

  return (
    <div className="grid w-[min(28rem,85vw)] gap-4">
      <Questionnaire onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); setResult(`Saved ${data.get("name")} as ${data.get("status")}.`) }}>
        <QuestionnaireProgress />
        <QuestionnaireItem name="status" required><QuestionnaireTitle>Which status fits this change?</QuestionnaireTitle><QuestionnaireDescription>Select one option to continue.</QuestionnaireDescription><QuestionnaireChoices><QuestionnaireChoice value="draft">Draft</QuestionnaireChoice><QuestionnaireChoice value="review">In review</QuestionnaireChoice></QuestionnaireChoices></QuestionnaireItem>
        <QuestionnaireItem name="name" required><QuestionnaireTitle>What is the change called?</QuestionnaireTitle><QuestionnaireInput aria-label="Change name" placeholder="Update navigation" /></QuestionnaireItem>
        <QuestionnaireActions><QuestionnairePrevious /><QuestionnaireNext /><QuestionnaireSubmit>Save answers</QuestionnaireSubmit></QuestionnaireActions>
      </Questionnaire>
      <p role="status" className="text-sm text-muted-foreground">{result}</p>
    </div>
  )
}

const meta = {
  title: "Components/Questionnaire",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
