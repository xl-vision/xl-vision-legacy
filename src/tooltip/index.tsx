import classnames from 'classnames'
import PropTypes from 'prop-types'
import * as React from 'react'
import Popper, { Placement } from '../commons/base/popper'
import { namePrefix } from '../commons/config'

export interface TooltipProps {
  allowPopupEnter?: boolean
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>
  content: React.ReactNode
  delayHide?: number
  delayShow?: number
  getPopupContainer?: () => HTMLElement
  offset?: number
  onVisibleChange?: (visible: boolean) => void,
  placement?: Placement
  prefixCls?: string,
  trigger?: 'hover' | 'focus' | 'click' | 'contextMenu' | 'custom'
  visible?: boolean
}

export const displayName = `${namePrefix}-tooltip`

const ARROW_HEIGHT = 10
const ARROW_WIDTH = ARROW_HEIGHT

const Tooltip: React.FunctionComponent<TooltipProps> = props => {
  const {
    content,
    offset = ARROW_HEIGHT / 2,
    prefixCls = displayName,
    ...others
  } = props

  const transitionName = `${prefixCls}--fade`
  const overlayStyle = overlayStyleCb

  const arrow = React.useCallback((_placement: Placement, center: { x: number, y: number }) => {
    const classes = classnames(`${prefixCls}__arrow`, `${prefixCls}__arrow--${_placement}`)
    let { x: left, y: top } = center
    left -= ARROW_WIDTH / 2
    top -= ARROW_HEIGHT / 2

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
      _style.paddingBottom = ARROW_HEIGHT / 2
    } else if (_placement.startsWith('bottom')) {
      _style.paddingTop = ARROW_HEIGHT / 2
    } else if (_placement.startsWith('left')) {
      _style.paddingRight = ARROW_WIDTH / 2
    } else {
      _style.paddingLeft = ARROW_WIDTH / 2
    }
    const classes = classnames(`${prefixCls}__content`)
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
