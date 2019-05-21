import classnames from 'classnames'
import * as React from 'react'
import Popper, { Placement, PopperProps } from '../commons/base/popper'
import { namePrefix } from '../commons/config'

export interface PopoverProps extends PopperProps {
  xx: string
}

export const displayName = `${namePrefix}-popover`

const Popover: React.FunctionComponent<PopoverProps> = props => {

  const arrow = React.useCallback((placement: Placement, center: { x: number, y: number }) => {
    const classes = classnames(`${displayName}__arrow`, `${displayName}__arrow--${placement}`)
    return (
      <div
        className={classes}
        style={{
          left: center.x - 5,
          position: 'absolute',
          top: center.y - 5
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
