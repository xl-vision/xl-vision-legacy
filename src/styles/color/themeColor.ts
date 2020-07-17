import { indigo, pink, red, blue, green, orange } from '../palette'

export type ThemeColors = {
  primary: string
  secondary: string
  error: string
  warning: string
  info: string
  success: string
}

const themes: ThemeColors = {
  primary: indigo[500],
  secondary: pink.A200,
  error: red[500],
  warning: orange[500],
  info: blue[500],
  success: green[500]
}

export default themes
