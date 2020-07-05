import React from 'react'
import { ButtonTheme, ButtonVariant } from './Button'

export type ButtonContextProps = {
  theme?: ButtonTheme
  variant?: ButtonVariant
  disableElevation?: boolean
  disableRipple?: boolean
  groupClsPrefix?: string
  size?: string
}

export default React.createContext<ButtonContextProps>({})
