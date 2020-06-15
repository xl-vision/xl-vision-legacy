import React from 'react'
import { ButtonSize } from './Button'

export interface ButtonContextState {
  size?: ButtonSize
}

const ButtonContext = React.createContext<ButtonContextState>({})

export default ButtonContext
