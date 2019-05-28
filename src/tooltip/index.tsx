import classnames from 'classnames'
import PropTypes from 'prop-types'
import * as React from 'react'
import Popper, { Placement, PopperProps } from '../commons/base/popper'
import { namePrefix } from '../commons/config'

export interface TooltipProps extends PopperProps {
  content: React.ReactElement<React.HTMLAttributes<HTMLElement>>
}

export const displayName = `${namePrefix}-tooltip`

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

const ARROW_HEIGHT = 10
const ARROW_WIDTH = ARROW_HEIGHT

const Tooltip: React.FunctionComponent<TooltipProps> = props => {
  const {
    content,
    offset = ARROW_HEIGHT / 2,
    transitionName = `${displayName}--fade`,
    overlayStyle = overlayStyleCb,
    ...others
  } = props

  delete others.popup
  delete others.arrow

  const arrow = React.useCallback((_placement: Placement, center: { x: number, y: number }) => {
    const classes = classnames(`${displayName}__arrow`, `${displayName}__arrow--${_placement}`)
    let { x: left, y: top } = center
    left -= ARROW_WIDTH / 2
    top -= ARROW_HEIGHT / 2

    const style: React.CSSProperties = {
      left,
      position: 'absolute',
      top
    }

    return (
      <div className={classes} style={style}/>
    )
  }, [])

  const popup = React.useCallback((_placement: Placement) => {
    const style: React.CSSProperties = {}
    if (_placement.startsWith('top')) {
      style.paddingBottom = ARROW_HEIGHT / 2
    } else if (_placement.startsWith('bottom')) {
      style.paddingTop = ARROW_HEIGHT / 2
    } else if (_placement.startsWith('left')) {
      style.paddingRight = ARROW_WIDTH / 2
    } else {
      style.paddingLeft = ARROW_WIDTH / 2
    }
    return (
      <div style={style}>
        <div className={`${displayName}__content`}>
          {content}
        </div>
      </div>
    )
  }, [])
  return (
    <Popper
      arrow={arrow}
      popup={popup}
      offset={offset}
      transitionName={transitionName}
      overlayStyle={overlayStyle}
      {...others}
      trigger={'click'}
    />
  )
}

Tooltip.displayName = displayName

Tooltip.propTypes = {
  content: PropTypes.element.isRequired
}

export default Tooltip
