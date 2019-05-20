import classnames from 'classnames'
import * as React from 'react'
import { namePrefix } from '../commons/config'
import Popper, { Placement, PopperProps } from '../popper'

export interface PopoverProps extends PopperProps {
  xx: string
}

export const displayName = `${namePrefix}-popover`

const Popover: React.FunctionComponent<PopoverProps> = props => {

  const arrow = React.useCallback((placement: Placement, center: { left: number, top: number }) => {
    const classes = classnames(`${displayName}__arrow`, `${displayName}__arrow--${placement}`)
    return (
      <div
        className={classes}
        style={{
          left: center.left - 5,
          position: 'absolute',
          top: center.top - 5
        }}
      />
    )
  }, [])

  return (
    <Popper {...props} arrow={arrow}/>
  )
}

Popover.displayName = displayName

export default Popover
