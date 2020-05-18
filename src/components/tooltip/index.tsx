import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import Popper, { Placement, PopperProps } from '../commons/base/popper'
import { clsPrefix } from '../commons/config'

export interface TooltipProps extends Omit<PopperProps, 'popup'> {
  content: React.ReactNode
  prefixCls?: string
}

const Tooltip: React.FunctionComponent<TooltipProps> = (props) => {
  const {
    content,
    prefixCls = `${clsPrefix}-tooltip`,
    offset = 10,
    placement = 'top',
    ...others
  } = props

  const transitionName = others.transitionName || `${prefixCls}--fade`

  delete others.transitionName

  const arrow = React.useCallback(
    (placement: Placement) => {
      const direction = placement.split('-')[0]
      const classes = classnames(`${prefixCls}__arrow`, `${prefixCls}__arrow--${direction}`)
      return <div className={classes} />
    },
    [prefixCls]
  )

  const popup = <div className={`${prefixCls}__body`}>{content}</div>

  return (
    <Popper
      {...others}
      arrow={arrow}
      popup={popup}
      offset={offset}
      placement={placement}
      transitionName={transitionName}
      overlayStyle={overlayStyleCb}
    />
  )
}

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
    setTransformOriginStyle(style, '50% 100%')
  } else if (placement.startsWith('bottom')) {
    setTransformOriginStyle(style, '50% 0%')
  } else if (placement.startsWith('left')) {
    setTransformOriginStyle(style, '100% 50%')
  } else {
    setTransformOriginStyle(style, '0% 50%')
  }
  return style
}

export const setTransformOriginStyle = (style: React.CSSProperties, transformOrigin: string) => {
  style.transformOrigin = transformOrigin
  style.WebkitTransformOrigin = transformOrigin
  style.msTransformOrigin = transformOrigin
  style.MozTransformOrigin = transformOrigin
}
