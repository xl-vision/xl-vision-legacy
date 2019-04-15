import classnames from 'classnames'
import * as React from 'react'
import { namePrefix } from '../commons/config'

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  round?: boolean
  vertical?: boolean
}

const displayName = `${namePrefix}-button-group`

const ButtonGroup: React.FunctionComponent<ButtonGroupProps> = props => {
  const { round, vertical, className, ...others } = props
  const classes = classnames({
    [displayName]: true,
    [`${displayName}--horizontal`]: !vertical,
    [`${displayName}--vertical`]: vertical,
    [`${displayName}--round`]: round
  }, className)
  return (
      <div className={classes} {...others}/>
  )
}

ButtonGroup.displayName = displayName

export default ButtonGroup
