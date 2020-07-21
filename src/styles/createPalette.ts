import common from './palette/common'
import grey from './palette/grey'
import indigo from './palette/indigo'
import pink from './palette/pink'
import red from './palette/red'
import orange from './palette/orange'
import blue from './palette/blue'
import green from './palette/green'

export type BaseColors = {
  text: {
    primary: string
    secondary: string
    disabled: string
    hint: string
    icon: string
  }
  divider: string
  background: {
    paper: string
    default: string
  }
  action: {
    enabled: number
    hover: number
    focus: number
    active: number
    selected: number
    disabled: number
  }
}

export const light: BaseColors = {
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)',
    icon: 'rgba(0, 0, 0, 0.38)'
  },
  divider: 'rgba(0, 0, 0, 0.12)',
  background: {
    paper: common.white,
    default: grey[50]
  },
  action: {
    enabled: 0,
    hover: 0.04,
    focus: 0.12,
    active: 0.12,
    selected: 0.08,
    disabled: 0.38
  }
}

export const dark: BaseColors = {
  text: {
    primary: common.white,
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    hint: 'rgba(255, 255, 255, 0.5)',
    icon: 'rgba(255, 255, 255, 0.5)'
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  background: {
    paper: grey[800],
    default: '#303030'
  },
  action: {
    enabled: 0,
    hover: 0.08,
    selected: 0.16,
    disabled: 0.38,
    focus: 0.12,
    active: 0.24
  }
}

export type ThemeColors = {
  primary: string
  secondary: string
  error: string
  warning: string
  info: string
  success: string
}

export const themes: ThemeColors = {
  primary: indigo[500],
  secondary: pink.A200,
  error: red[500],
  warning: orange[500],
  info: blue[500],
  success: green[500]
}
