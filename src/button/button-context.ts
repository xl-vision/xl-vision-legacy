import * as React from 'react'
import { ButtonSize } from './button'

export interface ButtonContextState {
  size?: ButtonSize
}

const ButtonContext = React.createContext<ButtonContextState>({})

export default ButtonContext
