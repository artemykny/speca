import { create, getPreferredColorScheme } from "storybook/theming"

export const initialMode = getPreferredColorScheme()

export function getMode(value: unknown) {
  return value === "dark" || value === "light" ? value : initialMode
}

export function storyUrl(id: string, globals: { theme?: unknown }) {
  return `./?path=/story/${id}&globals=theme:${getMode(globals.theme)}`
}

const brand = {
  brandTitle: "Speca",
  brandTarget: "_self",
  fontBase: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
}

export const themes = {
  light: create({
    ...brand,
    base: "light",
    colorSecondary: "#36383c",
    appBg: "#f7f7f8",
    appContentBg: "#ffffff",
    appBorderColor: "#dfe0e4",
    textColor: "#202124",
    barSelectedColor: "#202124",
  }),
  dark: create({
    ...brand,
    base: "dark",
    colorSecondary: "#c6c6c6",
    appBg: "#111111",
    appContentBg: "#0b0b0b",
    appPreviewBg: "#0b0b0b",
    appHoverBg: "#272727",
    barHoverColor: "#ededed",
    barTextColor: "#ababab",
    buttonBg: "#171717",
    inputBg: "#171717",
    inputTextColor: "#f1f1f1",
    appBorderColor: "#323232",
    textColor: "#f1f1f1",
    barBg: "#171717",
    barSelectedColor: "#f1f1f1",
  }),
}
