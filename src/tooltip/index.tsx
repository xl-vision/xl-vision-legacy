import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import Popper, { Placement, PopperProps } from '../commons/base/popper'
import { namePrefix } from '../commons/config'
import { Omit } from '../commons/types'

export interface TooltipProps extends Omit<PopperProps, 'popup'> {
  content: React.ReactNode
  prefixCls?: string
}

export const displayName = `${namePrefix}-tooltip`

const Tooltip: React.FunctionComponent<TooltipProps> = props => {
  const { content, prefixCls = displayName, offset = 10, ...others } = props

  const transitionName = others.transitionName || `${prefixCls}--fade`

  delete others.transitionName

  const arrow = React.useCallback(
    (_placement: Placement) => {
      const classes = classnames(`${prefixCls}__arrow`, `${prefixCls}__arrow--${_placement}`)
      return <div className={classes} />
    },
    [prefixCls]
  )

  const popup = <div className={`${prefixCls}__body`}>{content}</div>

  return (
    <Popper
      arrow={arrow}
      popup={popup}
      offset={offset}
      transitionName={transitionName}
      overlayStyle={overlayStyleCb}
      {...others}
    />
  )
}

Tooltip.displayName = displayName

Tooltip.propTypes = {
  content: PropTypes.node.isRequired,
  prefixCls: PropTypes.string
}

export default Tooltip

/**
 * 设置动画的原点
 * @param placement
 */
const overlayStyleCb = (placement: Placement) => {
  const style: React.CSSProperties = {}
  if (placement.startsWith('top')) {
    style.transformOrigin = '50% 100%'
  } else if (placement.startsWith('bottom')) {
    style.transformOrigin = '50% 0%'
  } else if (placement.startsWith('left')) {
    style.transformOrigin = '100% 50%'
  } else {
    style.transformOrigin = '0% 50%'
  }
  return style
}
