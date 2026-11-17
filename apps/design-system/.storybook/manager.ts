import { GLOBALS_UPDATED, SET_GLOBALS } from "storybook/internal/core-events"
import { addons } from "storybook/manager-api"
import { getMode, initialMode, storyUrl, themes } from "./theme"

function managerTheme(globals: { theme?: string }) {
  return {
    ...themes[getMode(globals.theme)],
    brandUrl: storyUrl("foundations-overview--default", globals),
  }
}

addons.setConfig({ theme: managerTheme({ theme: initialMode }) })

addons.register("speca/theme", (api) => {
  const applyTheme = ({ globals }: { globals: { theme?: string } }) => {
    api.setOptions({ theme: managerTheme(globals) })
  }
  api.on(SET_GLOBALS, applyTheme)
  api.on(GLOBALS_UPDATED, applyTheme)
})
