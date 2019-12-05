import classnames from 'classnames'
import * as PropTypes from 'prop-types'
import React from 'react'
import { namePrefix } from '../commons/config'
import { Omit } from '../commons/types'
import { FasCircleNotch } from '../icon'
import ButtonContext from './button-context'

export type ButtonSize = 'large' | 'default' | 'small'

export type ButtonProps = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>

export interface BaseButtonProps {
  children: React.ReactNode
  className?: string
  dashed?: boolean
  disabled?: boolean
  ghost?: boolean
  href?: string
  htmlType?: 'submit' | 'reset' | 'button'
  loading?: boolean
  long?: boolean
  plain?: boolean
  prefixCls?: string
  shape?: 'circle' | 'round'
  size?: ButtonSize
  type?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'text'
}

const displayName = `${namePrefix}-button`

const Button: React.FunctionComponent<ButtonProps> = React.forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const {
    dashed,
    disabled,
    ghost,
    plain,
    href,
    htmlType,
    loading,
    long,
    shape,
    type = 'default',
    className,
    children,
    prefixCls = displayName,
    onClick,
    ...others
  } = props

  let { size } = React.useContext(ButtonContext)

  // 强制使用ButtonGroup的size
  size = size || others.size || 'default'

  delete others.size

  const classes = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--${type}`]: true,
      [`${prefixCls}--${shape}`]: shape,
      [`${prefixCls}--size-${size}`]: size,
      [`${prefixCls}--dashed`]: dashed,
      [`${prefixCls}--plain`]: plain,
      [`${prefixCls}--ghost`]: ghost,
      [`${prefixCls}--long`]: long,
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--loading`]: loading
    },
    className
  )

  const onClickHandler = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement, MouseEvent>) => {
      // 在disabled和loading状态下是不允许触发点击事件的
      if (disabled || loading) {
        e.preventDefault()
        return
      }
      onClick && onClick(e)
    },
    [onClick, disabled, loading]
  )

  const childrenWrapper = (
    <>
      {loading && <FasCircleNotch className={`${prefixCls}__icon`} spin={true} />}
      {formatChildren(children)}
    </>
  )

  const allProps = {
    children: childrenWrapper,
    className: classes,
    disabled,
    href,
    type: htmlType,
    onClick: onClickHandler,
    ...others
  }

  if (href) {
    return <a ref={ref} {...allProps} />
  }
  return <button ref={ref} {...allProps} />
})

Button.displayName = displayName

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  dashed: PropTypes.bool,
  disabled: PropTypes.bool,
  ghost: PropTypes.bool,
  href: PropTypes.string,
  htmlType: PropTypes.oneOf(['submit', 'reset', 'button']),
  loading: PropTypes.bool,
  long: PropTypes.bool,
  plain: PropTypes.bool,
  prefixCls: PropTypes.string,
  shape: PropTypes.oneOf<'circle' | 'round'>(['circle', 'round']),
  size: PropTypes.oneOf(['large', 'default', 'small']),
  type: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error', 'text'])
}

export default Button

const formatChildren = (children: React.ReactNode) => {
  return React.Children.map(children, child => {
    if (typeof child === 'string') {
      return <span>{child}</span>
    }
    return child
  })
}
