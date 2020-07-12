import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Ripple, { RippleRef } from '../Ripple'
import ConfigContext from '../ConfigProvider/ConfigContext'
import useEventCallback from '../commons/hooks/useEventCallback'

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
    /* eslint-disable react/prop-types */
    onClick,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onTouchStart,
    onTouchEnd,
    onTouchMove,
    onDragLeave,
    onBlur,
    onKeyDown,
    onKeyUp,
    /* eslint-enable react/prop-types */
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

  // 按钮切换到loading或者disabled时，强制触发stop
  React.useEffect(() => {
    if (loading || disabled) {
      if (rippleRef.current) {
        rippleRef.current.stop()
      }
    }
  }, [loading, disabled])

  const shouldEnableRipple = !disableRipple && !disabled && !loading

  const useRippleHandler = <E extends React.SyntheticEvent, H extends React.EventHandler<E>>(
    action: keyof RippleRef,
    defaultEventHandler?: H,
    disableRippleAction = !shouldEnableRipple
  ) => {
    return useEventCallback((e: E) => {
      if (defaultEventHandler) {
        defaultEventHandler(e)
      }

      if (!disableRippleAction && rippleRef.current) {
        rippleRef.current[action](e)
      }
    })
  }

  const handleMouseDown = useRippleHandler('start', onMouseDown)
  const handleMouseUp = useRippleHandler('stop', onMouseUp)
  const handleMouseLeave = useRippleHandler('stop', onMouseLeave)
  const handleDragLeave = useRippleHandler('stop', onDragLeave)
  const handleTouchStart = useRippleHandler('start', onTouchStart)
  const handleTouchEnd = useRippleHandler('stop', onTouchEnd)
  const handleTouchMove = useRippleHandler('stop', onTouchMove)
  const handleBlur = useRippleHandler('stop', onBlur, false)

  const handleKeyDown = useEventCallback((e: React.KeyboardEvent<ButtonElement>) => {
    if (rippleRef.current && !isKeyDownRef.current && e.key === ' ') {
      isKeyDownRef.current = true
      rippleRef.current.start()
    }

    onKeyDown && onKeyDown(e)
  })
  const handleKeyUp = useEventCallback((e: React.KeyboardEvent<ButtonElement>) => {
    if (rippleRef.current && isKeyDownRef.current && e.key === ' ') {
      isKeyDownRef.current = false
      rippleRef.current.stop()
    }
    onKeyUp && onKeyUp(e)
  })

  const handleClick = useEventCallback((e: React.MouseEvent) => {
    if (loading || disabled) {
      e.preventDefault()
      return
    }
    onClick && onClick(e)
  })

  return (
    <Component
      aria-disabled={disabled}
      aria-readonly={loading}
      {...others}
      disabled={disabled}
      className={classes}
      ref={ref}
      tabIndex={disabled || loading ? -1 : tabIndex}
      href={href}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onBlur={handleBlur}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onDragLeave={handleDragLeave}
    >
      <span className={`${clsPrefix}__inner`}>{children}</span>
      <Ripple ref={rippleRef} leaveAfterEnter={true} transitionClasses={`${clsPrefix}__ripple`} />
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
  className: PropTypes.string
}

export default BaseButton
