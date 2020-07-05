import React from 'react'
import Popper, { PopperProps } from '../Popper'
import ConfigContext from '../ConfigProvider/ConfigContext'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export interface PopoverProps
  extends Omit<PopperProps, 'arrow' | 'popup' | 'popupClassName' | 'popupStyle'> {
  clsPrefix?: string
  title?: React.ReactNode
  content: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const Popover: React.FunctionComponent<PopoverProps> = (props) => {
  const { clsPrefix: rootClsPrefix } = React.useContext(ConfigContext)
  const {
    clsPrefix = `${rootClsPrefix}-popover`,
    children,
    title,
    content,
    offset = 10,
    transitionClasses = `${clsPrefix}--zoom`,
    className,
    style,
    ...others
  } = props

  const titleNode = title && <div className={`${clsPrefix}__title`}>{title}</div>
  const contentNode = <div className={`${clsPrefix}__content`}>{content}</div>

  const containerClasses = classnames(`${clsPrefix}__inner`)

  const arrow = <div className={`${clsPrefix}__arrow`} />
  const popup = (
    <div className={containerClasses}>
      {titleNode}
      {contentNode}
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

Popover.displayName = 'Popover'

Popover.propTypes = {
  clsPrefix: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.element.isRequired,
  offset: PropTypes.any,
  transitionClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.node,
  content: PropTypes.node.isRequired
}

export default Popover
