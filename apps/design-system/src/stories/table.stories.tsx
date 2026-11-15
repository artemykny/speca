import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Badge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../index"

function EntityTable() {
  return (
    <div className="w-full max-w-2xl">
      <Table>
        <TableCaption>Workspace entities</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Entity</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Workspace navigation</TableCell>
            <TableCell>Specification</TableCell>
            <TableCell>
              <Badge variant="default">Approved</Badge>
            </TableCell>
          </TableRow>
          <TableRow data-state="selected">
            <TableCell className="font-medium">Branch switcher</TableCell>
            <TableCell>Component</TableCell>
            <TableCell>
              <Badge variant="outline">Needs review</Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Entity tree</TableCell>
            <TableCell>Component</TableCell>
            <TableCell>
              <Badge variant="secondary">In progress</Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

const meta = {
  title: "Components/Table",
  component: EntityTable,
  parameters: { layout: "padded" },
} satisfies Meta<typeof EntityTable>
export default meta
export const Default: StoryObj<typeof meta> = {}
