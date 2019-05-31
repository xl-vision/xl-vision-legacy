import classnames from 'classnames'
import PropTypes from 'prop-types'
import * as React from 'react'
import Popper, { Placement, PopperProps } from '../commons/base/popper'
import { namePrefix } from '../commons/config'
import { Omit } from '../commons/types'

export interface TooltipProps extends Omit<Omit<PopperProps, 'popup'>, 'arrow'> {
  arrowSize?: number
  content: React.ReactNode
  prefixCls?: string,
}

export const displayName = `${namePrefix}-tooltip`

const Tooltip: React.FunctionComponent<TooltipProps> = props => {
  const {
    content,
    offset = 5,
    prefixCls = displayName,
    arrowSize = 10,
    ...others
  } = props

  const transitionName = others.transitionName || `${prefixCls}--fade`
  const overlayStyle = others.overlayStyle || overlayStyleCb

  delete others.transitionName
  delete others.overlayStyle

  const arrow = React.useCallback((_placement: Placement, center: { x: number, y: number }) => {
    const classes = classnames(`${prefixCls}__arrow`, `${prefixCls}__arrow--${_placement}`)
    let { x: left, y: top } = center
    left -= arrowSize / 2
    top -= arrowSize / 2

    const _style: React.CSSProperties = {
      left,
      position: 'absolute',
      top
    }

    return (
      <div className={classes} style={_style}/>
    )
  }, [prefixCls])

  const popup = React.useCallback((_placement: Placement) => {
    const _style: React.CSSProperties = {}
    if (_placement.startsWith('top')) {
      _style.paddingBottom = arrowSize / 2
    } else if (_placement.startsWith('bottom')) {
      _style.paddingTop = arrowSize / 2
    } else if (_placement.startsWith('left')) {
      _style.paddingRight = arrowSize / 2
    } else {
      _style.paddingLeft = arrowSize / 2
    }
    const classes = classnames(`${prefixCls}__body`)
    return (
      <div style={_style}>
        <div className={classes}>
          {content}
        </div>
      </div>
    )
  }, [content, prefixCls])
  return (
    <Popper
      arrow={arrow}
      popup={popup}
      offset={offset}
      transitionName={transitionName}
      overlayStyle={overlayStyle}
      {...others}
    />
  )
}

Tooltip.displayName = displayName

Tooltip.propTypes = {
  arrowSize: PropTypes.number,
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
