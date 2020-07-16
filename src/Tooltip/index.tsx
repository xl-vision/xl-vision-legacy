import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Popper, { PopperProps } from '../Popper'
import ConfigContext from '../ConfigProvider/ConfigContext'

export interface TooltipProps
  extends Omit<PopperProps, 'arrow' | 'popup' | 'popupClassName' | 'popupStyle'> {
  clsPrefix?: string
  content: React.ReactNode
  maxWidth?: number
  className?: string
  style?: React.CSSProperties
}

const Tooltip: React.FunctionComponent<TooltipProps> = (props) => {
  const { clsPrefix: rootClsPrefix } = React.useContext(ConfigContext)
  const {
    clsPrefix = `${rootClsPrefix}-tooltip`,
    children,
    content,
    offset = 10,
    transitionClasses = `${clsPrefix}--zoom`,
    maxWidth,
    className,
    style,
    ...others
  } = props

  const contentClasses = classnames(`${clsPrefix}__content`, {
    [`${clsPrefix}__content--with-width`]: maxWidth !== undefined
  })

  const arrow = <div className={`${clsPrefix}__arrow`} />
  const popup = (
    <div className={contentClasses} style={{ maxWidth }}>
      {content}
    </div>
  )

  const classes = classnames(clsPrefix, className)

  return (
    <Popper
      {...others}
      offset={offset}
      popupClassName={classes}
      popupStyle={style}
      arrow={arrow}
      popup={popup}
      transitionClasses={transitionClasses}
    >
      {children}
    </Popper>
  )
}

Tooltip.displayName = 'Tooltip'

Tooltip.propTypes = {
  clsPrefix: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  maxWidth: PropTypes.number,
  children: PropTypes.element.isRequired,
  offset: PropTypes.any,
  transitionClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  content: PropTypes.node.isRequired
}

export default Tooltip
