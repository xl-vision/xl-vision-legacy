import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import Ripple, { RippleRef } from '../Ripple'
import ConfigContext from '../ConfigProvider/ConfigContext'
import useEventCallback from '../commons/hooks/useEventCallback'
import createUseClasses from '../styles/createUseClasses'

export interface CommonBaseButtonProps {
  href?: string
  disableRipple?: boolean
  clsPrefix?: string
  disabled?: boolean
  loading?: boolean
  onClick?: React.EventHandler<React.MouseEvent>
  classes?: Partial<{
    root: string
    inner: string
    ripple: string
    disabled: string
    loading: string
  }>
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
    classes,
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
  const buildinClasses = useClasses({ loading, disabled })

  const rippleRef = React.useRef<RippleRef>(null)
  const isKeyDownRef = React.useRef(false)

  const Component = href ? 'a' : 'button'

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

  const rootClasses = clsx(
    buildinClasses.root,
    classes?.root,
    disabled && classes?.disabled,
    loading && !disabled && classes?.loading,
    className
  )

  return (
    <Component
      aria-disabled={disabled}
      aria-readonly={loading}
      {...others}
      disabled={disabled}
      className={rootClasses}
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
      <span className={clsx(buildinClasses.inner, classes?.inner)}>{children}</span>
      <Ripple
        ref={rippleRef}
        className={clsx(buildinClasses.ripple, classes?.ripple)}
        leaveAfterEnter={true}
        transitionClasses={clsx(buildinClasses.ripple, classes?.ripple)}
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
  className: PropTypes.string,
  classes: PropTypes.object
}

export default BaseButton

const useClasses = createUseClasses((theme) => {
  return {
    root: {
      position: 'relative',
      display: 'inline-block',
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      whiteSpace: 'nowrap',
      textAlign: 'center',
      textDecoration: 'none',
      verticalAlign: 'middle',
      backgroundColor: 'transparent',
      border: 0,
      borderRadius: 0,
      outline: 'none',
      WebkitAppearance: 'none',
      userSelect: 'none',
      touchAction: 'manipulation',
      // 阻止在移动端按下按钮后闪烁的问题
      WebkitTapHighlightColor: 'transparent',
      cursor: ({ loading, disabled }) => (disabled || loading ? 'not-allowed' : 'pointer'),
      pointerEvents: ({ loading }) => (loading ? 'none' : '')
    },
    inner: {
      // 阻止ie下 focus时文字移动
      position: 'relative',
      display: 'inline-block',
      width: '100%',
      height: '100%'
    },
    ripple: {
      transform: 'scale(1)',
      opacity: theme.color.getContrastType().action.pressed,
      '&-enter-active': {
        transition: theme.animation.enter('all')
      },
      '&-leave-active': {
        transition: theme.animation.leavePermanent('all')
      },
      '&-enter': {
        transform: 'scale(0)',
        opacity: 0.1
      },
      '&-leave-to': {
        opacity: 0
      }
    }
  }
})
