import React from 'react'
import Ripple from '../Ripple'
import ConfigContext from '../ConfigProvider/ConfigContext'
import classnames from 'classnames'
import PropTypes from 'prop-types'

export interface CommonBaseButtonProps {
  href?: string
  enableRipple?: boolean
  clsPrefix?: string
  disabled?: boolean
  loading?: boolean
  onClick?: React.EventHandler<React.MouseEvent>
}

export type BaseButtonProps = CommonBaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>

export type ButtonElement = HTMLButtonElement & HTMLAnchorElement

const BaseButton = React.forwardRef<ButtonElement, BaseButtonProps>((props, ref) => {
  const { clsPrefix: rootClsPrefix } = React.useContext(ConfigContext)

  const {
    clsPrefix = `${rootClsPrefix}-base-button`,
    children,
    enableRipple = true,
    href,
    disabled,
    loading,
    onClick,
    className,
    ...others
  } = props

  const Component = href ? 'a' : 'button'

  const classes = classnames(
    clsPrefix,
    {
      [`${clsPrefix}--disabled`]: disabled,
      [`${clsPrefix}--loading`]: loading && !disabled
    },
    className
  )

  const onClickWrap = React.useCallback(
    (e: React.MouseEvent) => {
      if (loading || disabled) {
        e.preventDefault()
        return
      }
      onClick && onClick(e)
    },
    [loading, disabled, onClick]
  )

  const shouldEnableRipple = enableRipple && !disabled && !loading

  return (
    <Component {...others} onClick={onClickWrap} className={classes} ref={ref}>
      <span>{children}</span>
      <Ripple
        disableEvents={!shouldEnableRipple}
        leaveAfterEnter={true}
        transitionClasses={`${clsPrefix}__ripple`}
      />
    </Component>
  )
})

BaseButton.displayName = 'BaseButton'

BaseButton.propTypes = {
  clsPrefix: PropTypes.string,
  children: PropTypes.node,
  enableRipple: PropTypes.bool,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
}

export default BaseButton
