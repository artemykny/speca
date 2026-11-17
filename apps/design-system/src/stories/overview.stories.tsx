import { storyUrl } from "../../.storybook/theme"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useId, useState, type ReactNode } from "react"
import { ArrowUpRightIcon, FileTextIcon, FolderIcon, GitDiffIcon, PlusIcon } from "@phosphor-icons/react"
import {
  Badge,
  Button,
  Checkbox,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  TooltipProvider,
} from "../index"
import buttonGroupMeta from "./button-group.stories"
import toggleMeta from "./toggle.stories"
import toggleGroupMeta from "./toggle-group.stories"
import kbdMeta from "./kbd.stories"
import alertMeta from "./alert.stories"
import progressMeta from "./progress.stories"
import spinnerMeta from "./spinner.stories"
import skeletonMeta from "./skeleton.stories"
import toastMeta from "./toast.stories"
import emptyMeta from "./empty.stories"
import inputMeta from "./input.stories"
import textareaMeta from "./textarea.stories"
import labelMeta from "./label.stories"
import fieldMeta from "./field.stories"
import inputGroupMeta from "./input-group.stories"
import inputOtpMeta from "./input-otp.stories"
import checkboxMeta from "./checkbox.stories"
import radioGroupMeta from "./radio-group.stories"
import switchMeta from "./switch.stories"
import sliderMeta from "./slider.stories"
import selectMeta from "./select.stories"
import nativeSelectMeta from "./native-select.stories"
import comboboxMeta from "./combobox.stories"
import calendarMeta from "./calendar.stories"
import questionnaireMeta from "./questionnaire.stories"
import breadcrumbMeta from "./breadcrumb.stories"
import navigationMenuMeta from "./navigation-menu.stories"
import menubarMeta from "./menubar.stories"
import dropdownMenuMeta from "./dropdown-menu.stories"
import contextMenuMeta from "./context-menu.stories"
import commandMeta from "./command.stories"
import paginationMeta from "./pagination.stories"
import tabsMeta from "./tabs.stories"
import cardMeta from "./card.stories"
import itemMeta from "./item.stories"
import avatarMeta from "./avatar.stories"
import tableMeta from "./table.stories"
import chartMeta from "./chart.stories"
import codeBlockMeta from "./code-block.stories"
import accordionMeta from "./accordion.stories"
import collapsibleMeta from "./collapsible.stories"
import aspectRatioMeta from "./aspect-ratio.stories"
import directionMeta from "./direction.stories"
import resizableMeta from "./resizable.stories"
import scrollAreaMeta from "./scroll-area.stories"
import separatorMeta from "./separator.stories"
import dialogMeta from "./dialog.stories"
import alertDialogMeta from "./alert-dialog.stories"
import sheetMeta from "./sheet.stories"
import drawerMeta from "./drawer.stories"
import popoverMeta from "./popover.stories"
import hoverCardMeta from "./hover-card.stories"
import tooltipMeta from "./tooltip.stories"
import attachmentMeta from "./attachment.stories"
import bubbleMeta from "./bubble.stories"
import messageMeta from "./message.stories"
import messageScrollerMeta from "./message-scroller.stories"
import markerMeta from "./marker.stories"
import traceMeta from "./trace.stories"

function ButtonExamples() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>
        <PlusIcon />
        Create
      </Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
      <Button disabled>Disabled</Button>
    </div>
  )
}

function BadgeExamples() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">Draft</Badge>
      <Badge variant="outline">Needs review</Badge>
      <Badge>Approved</Badge>
      <Badge variant="destructive">Blocked</Badge>
    </div>
  )
}

function InlineSidebar() {
  const [selected, setSelected] = useState("Changes")
  return (
    <SidebarProvider className="min-h-0 overflow-hidden rounded-xl border">
      <Sidebar collapsible="none" className="w-full">
        <SidebarHeader className="px-4 py-3 text-sm font-semibold">
          Workspace
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Project</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {[
                  { name: "Changes", Icon: FileTextIcon },
                  { name: "Files", Icon: FolderIcon },
                ].map(({ name, Icon }) => (
                  <SidebarMenuItem key={name}>
                    <SidebarMenuButton
                      isActive={selected === name}
                      onClick={() => setSelected(name)}
                    >
                      <Icon />
                      <span>{name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}

function InlineCarousel() {
  return (
    <div className="px-10">
      <Carousel className="w-full" aria-label="Change previews">
        <CarouselContent>
          {["Navigation", "Search", "Settings"].map((name) => (
            <CarouselItem key={name}>
              <div className="flex aspect-[4/3] items-center justify-center rounded-xl border bg-card p-4 text-sm font-medium">
                {name}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-10" />
        <CarouselNext className="-right-10" />
      </Carousel>
    </div>
  )
}

function Specimen({ name, children }: { name: string; children: ReactNode }) {
  const id = useId()
  return (
    <article
      aria-labelledby={id}
      data-component={name}
      className="min-w-0"
    >
      <h3 id={id} className="mb-4 text-sm font-medium">
        {name}
      </h3>
      <div className="min-w-0 [&>*]:max-w-full">{children}</div>
    </article>
  )
}

function ReviewPreview() {
  const files = ["navigation.tsx", "branch-switcher.tsx", "navigation.test.tsx"]
  const [reviewed, setReviewed] = useState<string[]>([files[0]])

  return (
    <div className="review-stage">
      <div className="review-sheet">
        <div className="mb-4 flex items-center gap-2.5 text-sm font-medium">
          <GitDiffIcon size={18} aria-hidden="true" />
          Change review
          <span className="ml-auto text-xs font-normal tabular-nums text-muted-foreground" aria-live="polite">
            {reviewed.length} / {files.length} reviewed
          </span>
        </div>
        <fieldset className="border-t pt-2">
          <legend className="sr-only">Mark files as reviewed</legend>
          {files.map((file) => (
            <Label key={file} className="flex cursor-pointer items-center gap-3 py-2 text-[13px] font-normal">
              <Checkbox
                checked={reviewed.includes(file)}
                onCheckedChange={(checked) => setReviewed((current) =>
                  checked ? [...current, file] : current.filter((name) => name !== file)
                )}
              />
              {file}
            </Label>
          ))}
        </fieldset>
      </div>
    </div>
  )
}

function Overview({ reviewUrl }: { reviewUrl: string }) {
  return (
    <TooltipProvider>
      <main className="mx-auto max-w-[76rem] px-5 pb-20 sm:px-10 lg:px-14">
        <header className="catalog-header">
          <div>
            <h1 className="text-[clamp(2.75rem,5.5vw,5rem)] leading-[0.98] font-medium tracking-[-0.065em]">
              Design system
            </h1>
            <p className="mt-5 max-w-[34ch] text-base/relaxed text-muted-foreground sm:text-lg/relaxed">
              Shared styles, components, and interaction patterns for the Speca app.
            </p>
            <a
              className="mt-6 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium decoration-border underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              href={reviewUrl}
              target="_top"
            >
              Open change review <ArrowUpRightIcon aria-hidden="true" />
            </a>
          </div>
          <ReviewPreview />
        </header>
        <section aria-labelledby="overview-button" className="space-y-8 border-t py-10 sm:py-12">
          <header className="space-y-1">
            <h2
              id="overview-button"
              className="text-2xl font-medium tracking-[-0.04em] sm:text-3xl"
            >
              Actions and feedback
            </h2>
            <p className="text-sm text-muted-foreground">
              Buttons, selection states, and progress.
            </p>
          </header>
          <div className="grid items-start gap-x-10 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            <Specimen name="Button">
              <ButtonExamples />
            </Specimen>
            <Specimen name={buttonGroupMeta.title.slice("Components/".length)}>
              <buttonGroupMeta.component />
            </Specimen>
            <Specimen name={toggleMeta.title.slice("Components/".length)}>
              <toggleMeta.component />
            </Specimen>
            <Specimen name={toggleGroupMeta.title.slice("Components/".length)}>
              <toggleGroupMeta.component />
            </Specimen>
            <Specimen name={kbdMeta.title.slice("Components/".length)}>
              <kbdMeta.component />
            </Specimen>
            <Specimen name="Badge">
              <BadgeExamples />
            </Specimen>
            <Specimen name={alertMeta.title.slice("Components/".length)}>
              <alertMeta.component />
            </Specimen>
            <Specimen name={progressMeta.title.slice("Components/".length)}>
              <progressMeta.component />
            </Specimen>
            <Specimen name={spinnerMeta.title.slice("Components/".length)}>
              <spinnerMeta.component />
            </Specimen>
            <Specimen name={skeletonMeta.title.slice("Components/".length)}>
              <skeletonMeta.component />
            </Specimen>
            <Specimen name={toastMeta.title.slice("Components/".length)}>
              <toastMeta.component />
            </Specimen>
            <Specimen name={emptyMeta.title.slice("Components/".length)}>
              <emptyMeta.component />
            </Specimen>
          </div>
        </section>
        <section aria-labelledby="overview-input" className="space-y-8 border-t py-10 sm:py-12">
          <header className="space-y-1">
            <h2
              id="overview-input"
              className="text-2xl font-medium tracking-[-0.04em] sm:text-3xl"
            >
              Inputs and forms
            </h2>
            <p className="text-sm text-muted-foreground">
              Text entry, choices, dates, and guided questions.
            </p>
          </header>
          <div className="grid items-start gap-x-10 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            <Specimen name={inputMeta.title.slice("Components/".length)}>
              <inputMeta.component {...inputMeta.args} />
            </Specimen>
            <Specimen name={textareaMeta.title.slice("Components/".length)}>
              <textareaMeta.component {...textareaMeta.args} />
            </Specimen>
            <Specimen name={labelMeta.title.slice("Components/".length)}>
              <labelMeta.render {...labelMeta.args} />
            </Specimen>
            <Specimen name={fieldMeta.title.slice("Components/".length)}>
              <fieldMeta.component />
            </Specimen>
            <Specimen name={inputGroupMeta.title.slice("Components/".length)}>
              <inputGroupMeta.component />
            </Specimen>
            <Specimen name={inputOtpMeta.title.slice("Components/".length)}>
              <inputOtpMeta.component />
            </Specimen>
            <Specimen name={checkboxMeta.title.slice("Components/".length)}>
              <checkboxMeta.render {...checkboxMeta.args} />
            </Specimen>
            <Specimen name={radioGroupMeta.title.slice("Components/".length)}>
              <radioGroupMeta.component />
            </Specimen>
            <Specimen name={switchMeta.title.slice("Components/".length)}>
              <switchMeta.render {...switchMeta.args} />
            </Specimen>
            <Specimen name={sliderMeta.title.slice("Components/".length)}>
              <sliderMeta.component />
            </Specimen>
            <Specimen name={selectMeta.title.slice("Components/".length)}>
              <selectMeta.component {...selectMeta.args} />
            </Specimen>
            <Specimen name={nativeSelectMeta.title.slice("Components/".length)}>
              <nativeSelectMeta.component />
            </Specimen>
            <Specimen name={comboboxMeta.title.slice("Components/".length)}>
              <comboboxMeta.component />
            </Specimen>
            <Specimen name={calendarMeta.title.slice("Components/".length)}>
              <calendarMeta.component />
            </Specimen>
            <Specimen
              name={questionnaireMeta.title.slice("Components/".length)}
            >
              <questionnaireMeta.component />
            </Specimen>
          </div>
        </section>
        <section aria-labelledby="overview-breadcrumb" className="space-y-8 border-t py-10 sm:py-12">
          <header className="space-y-1">
            <h2
              id="overview-breadcrumb"
              className="text-2xl font-medium tracking-[-0.04em] sm:text-3xl"
            >
              Navigation
            </h2>
            <p className="text-sm text-muted-foreground">
              Ways to move through a workspace and act on its contents.
            </p>
          </header>
          <div className="grid items-start gap-x-10 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            <Specimen name={breadcrumbMeta.title.slice("Components/".length)}>
              <breadcrumbMeta.component />
            </Specimen>
            <Specimen
              name={navigationMenuMeta.title.slice("Components/".length)}
            >
              <navigationMenuMeta.component />
            </Specimen>
            <Specimen name={menubarMeta.title.slice("Components/".length)}>
              <menubarMeta.component />
            </Specimen>
            <Specimen name={dropdownMenuMeta.title.slice("Components/".length)}>
              <dropdownMenuMeta.component />
            </Specimen>
            <Specimen name={contextMenuMeta.title.slice("Components/".length)}>
              <contextMenuMeta.component />
            </Specimen>
            <Specimen name={commandMeta.title.slice("Components/".length)}>
              <Popover>
                <PopoverTrigger render={<Button variant="outline" />}>Search actions</PopoverTrigger>
                <PopoverContent className="w-auto max-w-[calc(100vw-2rem)] p-3">
                  <commandMeta.component />
                </PopoverContent>
              </Popover>
            </Specimen>
            <Specimen name={paginationMeta.title.slice("Components/".length)}>
              <paginationMeta.component />
            </Specimen>
            <Specimen name="Sidebar">
              <InlineSidebar />
            </Specimen>
            <Specimen name={tabsMeta.title.slice("Components/".length)}>
              <tabsMeta.render {...tabsMeta.args} />
            </Specimen>
          </div>
        </section>
        <section aria-labelledby="overview-card" className="space-y-8 border-t py-10 sm:py-12">
          <header className="space-y-1">
            <h2
              id="overview-card"
              className="text-2xl font-medium tracking-[-0.04em] sm:text-3xl"
            >
              Content and data
            </h2>
            <p className="text-sm text-muted-foreground">
              Containers, identity, structured information, and code.
            </p>
          </header>
          <div className="grid items-start gap-x-10 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            <Specimen name={cardMeta.title.slice("Components/".length)}>
              <cardMeta.render />
            </Specimen>
            <Specimen name={itemMeta.title.slice("Components/".length)}>
              <itemMeta.component />
            </Specimen>
            <Specimen name={avatarMeta.title.slice("Components/".length)}>
              <avatarMeta.component />
            </Specimen>
            <Specimen name={tableMeta.title.slice("Components/".length)}>
              <tableMeta.component />
            </Specimen>
            <Specimen name={chartMeta.title.slice("Components/".length)}>
              <chartMeta.component />
            </Specimen>
            <Specimen name="Carousel">
              <InlineCarousel />
            </Specimen>
            <Specimen name={codeBlockMeta.title.slice("Components/".length)}>
              <codeBlockMeta.component />
            </Specimen>
          </div>
        </section>
        <section aria-labelledby="overview-accordion" className="space-y-8 border-t py-10 sm:py-12">
          <header className="space-y-1">
            <h2
              id="overview-accordion"
              className="text-2xl font-medium tracking-[-0.04em] sm:text-3xl"
            >
              Layout
            </h2>
            <p className="text-sm text-muted-foreground">
              Grouping, disclosure, scrolling, and flexible space.
            </p>
          </header>
          <div className="grid items-start gap-x-10 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            <Specimen name={accordionMeta.title.slice("Components/".length)}>
              <accordionMeta.component />
            </Specimen>
            <Specimen name={collapsibleMeta.title.slice("Components/".length)}>
              <collapsibleMeta.component />
            </Specimen>
            <Specimen name={aspectRatioMeta.title.slice("Components/".length)}>
              <aspectRatioMeta.component />
            </Specimen>
            <Specimen name={directionMeta.title.slice("Components/".length)}>
              <directionMeta.component />
            </Specimen>
            <Specimen name={resizableMeta.title.slice("Components/".length)}>
              <resizableMeta.component />
            </Specimen>
            <Specimen name={scrollAreaMeta.title.slice("Components/".length)}>
              <scrollAreaMeta.component />
            </Specimen>
            <Specimen name={separatorMeta.title.slice("Components/".length)}>
              <separatorMeta.render />
            </Specimen>
          </div>
        </section>
        <section aria-labelledby="overview-dialog" className="space-y-8 border-t py-10 sm:py-12">
          <header className="space-y-1">
            <h2
              id="overview-dialog"
              className="text-2xl font-medium tracking-[-0.04em] sm:text-3xl"
            >
              Overlays
            </h2>
            <p className="text-sm text-muted-foreground">
              Open a trigger to try its dialog, panel, or contextual detail.
            </p>
          </header>
          <div className="grid items-start gap-x-10 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            <Specimen name={dialogMeta.title.slice("Components/".length)}>
              <dialogMeta.component />
            </Specimen>
            <Specimen name={alertDialogMeta.title.slice("Components/".length)}>
              <alertDialogMeta.component />
            </Specimen>
            <Specimen name={sheetMeta.title.slice("Components/".length)}>
              <sheetMeta.component />
            </Specimen>
            <Specimen name={drawerMeta.title.slice("Components/".length)}>
              <drawerMeta.component />
            </Specimen>
            <Specimen name={popoverMeta.title.slice("Components/".length)}>
              <popoverMeta.component />
            </Specimen>
            <Specimen name={hoverCardMeta.title.slice("Components/".length)}>
              <hoverCardMeta.component />
            </Specimen>
            <Specimen name={tooltipMeta.title.slice("Components/".length)}>
              <tooltipMeta.render {...tooltipMeta.args} />
            </Specimen>
          </div>
        </section>
        <section aria-labelledby="overview-attachment" className="space-y-8 border-t py-10 sm:py-12">
          <header className="space-y-1">
            <h2
              id="overview-attachment"
              className="text-2xl font-medium tracking-[-0.04em] sm:text-3xl"
            >
              Conversation
            </h2>
            <p className="text-sm text-muted-foreground">
              Messages, attachments, milestones, and agent activity.
            </p>
          </header>
          <div className="grid items-start gap-x-10 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            <Specimen name={attachmentMeta.title.slice("Components/".length)}>
              <attachmentMeta.component />
            </Specimen>
            <Specimen name={bubbleMeta.title.slice("Components/".length)}>
              <bubbleMeta.component />
            </Specimen>
            <Specimen name={messageMeta.title.slice("Components/".length)}>
              <messageMeta.component />
            </Specimen>
            <Specimen
              name={messageScrollerMeta.title.slice("Components/".length)}
            >
              <messageScrollerMeta.component />
            </Specimen>
            <Specimen name={markerMeta.title.slice("Components/".length)}>
              <markerMeta.component />
            </Specimen>
            <Specimen name={traceMeta.title.slice("Components/".length)}>
              <traceMeta.component />
            </Specimen>
          </div>
        </section>
      </main>
    </TooltipProvider>
  )
}

const meta = {
  title: "Foundations/Overview",
  render: (_, { globals }) => <Overview reviewUrl={storyUrl("patterns-change-review--default", globals)} />,
  parameters: { layout: "fullscreen" },
} satisfies Meta
export default meta
export const Default: StoryObj<typeof meta> = {}
