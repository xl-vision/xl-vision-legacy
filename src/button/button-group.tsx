import classnames from 'classnames'
import PropTypes from 'prop-types'
import * as React from 'react'
import { namePrefix } from '../commons/config'
import { childrenValidator } from '../commons/utils/prop-type'

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement | React.ReactElement[]
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

ButtonGroup.propTypes = {
  children: childrenValidator(`${namePrefix}-button`),
  round: PropTypes.bool,
  vertical: PropTypes.bool
}

export default React.memo(ButtonGroup)
