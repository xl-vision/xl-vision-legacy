import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Ripple, { RippleRef } from '../Ripple'
import ConfigContext from '../ConfigProvider/ConfigContext'
import useConstantCallback from '../commons/hooks/useConstantCallback'

export interface CommonBaseButtonProps {
  href?: string
  disableRipple?: boolean
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
    disableRipple,
    href,
    disabled,
    loading,
    className,
    tabIndex = 0,
    onClick,
    onKeyDown,
    onKeyUp,
    onBlur,
    ...others
  } = props

  const rippleRef = React.useRef<RippleRef>(null)
  const isKeyDownRef = React.useRef(false)

  const Component = href ? 'a' : 'button'

  const classes = classnames(
    clsPrefix,
    {
      [`${clsPrefix}--disabled`]: disabled,
      [`${clsPrefix}--loading`]: loading && !disabled
    },
    className
  )

  const onClickWrap = useConstantCallback((e: React.MouseEvent) => {
    if (loading || disabled) {
      e.preventDefault()
      return
    }
    onClick && onClick(e)
  })

  const onKeyDownWrap = useConstantCallback((e: React.KeyboardEvent<ButtonElement>) => {
    if (rippleRef.current && !isKeyDownRef.current && e.key === ' ') {
      isKeyDownRef.current = true
      rippleRef.current.start()
    }

    onKeyDown && onKeyDown(e)
  })
  const onKeyUpWrap = useConstantCallback((e: React.KeyboardEvent<ButtonElement>) => {
    if (rippleRef.current && isKeyDownRef.current && e.key === ' ') {
      isKeyDownRef.current = false
      rippleRef.current.stop()
    }
    onKeyUp && onKeyUp(e)
  })

  // 防止按键按下时移除焦点了
  const onBlurWrap = useConstantCallback((e: React.FocusEvent<ButtonElement>) => {
    if (rippleRef.current && isKeyDownRef.current) {
      isKeyDownRef.current = false
      rippleRef.current.stop()
    }
    onBlur && onBlur(e)
  })

  const shouldEnableRipple = !disableRipple && !disabled && !loading

  return (
    <Component
      aria-disabled={disabled}
      aria-readonly={loading}
      {...others}
      disabled={disabled}
      onClick={onClickWrap}
      onKeyDown={onKeyDownWrap}
      onKeyUp={onKeyUpWrap}
      onBlur={onBlurWrap}
      className={classes}
      ref={ref}
      tabIndex={disabled ? -1 : tabIndex}
      href={href}
    >
      <span className={`${clsPrefix}__inner`}>{children}</span>
      <Ripple
        ref={rippleRef}
        disableEvents={!shouldEnableRipple}
        leaveAfterEnter={true}
        transitionClasses={`${clsPrefix}__ripple`}
      />
    </Component>
  )
})

BaseButton.displayName = 'BaseButton'

BaseButton.propTypes = {
  tabIndex: PropTypes.number,
  clsPrefix: PropTypes.string,
  children: PropTypes.node.isRequired,
  disableRipple: PropTypes.bool,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string
}

export default BaseButton
