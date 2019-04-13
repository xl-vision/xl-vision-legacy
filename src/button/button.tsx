import * as React from 'react'
import { namePrefix } from '../commons/config'

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
}

const displayName = `${namePrefix}-button`

const Button: React.FunctionComponent<ButtonProps> = props => {
  const {} = props
  return <div/>
}

Button.displayName = displayName

export default Button
