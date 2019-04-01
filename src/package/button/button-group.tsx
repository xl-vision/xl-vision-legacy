import * as React from 'react'
import { namePrefix } from '../commons/config'

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const displayName = `${namePrefix}-button`

const ButtonGroup: React.FunctionComponent<ButtonGroupProps> = props => {
  const {} = props
  return <div />
}

ButtonGroup.displayName = displayName

export default ButtonGroup
