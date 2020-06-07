import classnames from 'classnames'
import * as PropTypes from 'prop-types'
import React from 'react'
import { clsPrefix as rootClsPrefix } from '../commons/config'
import { FasCircleNotch } from '../icon'
import ButtonContext from './button-context'

export type ButtonSize = 'large' | 'default' | 'small'

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
  clsPrefix?: string
  shape?: 'circle' | 'round'
  size?: ButtonSize
  type?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'text'
}

export type ButtonProps = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>

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
    clsPrefix = `${rootClsPrefix}-button`,
    onClick,
    ...others
  } = props

  let { size } = React.useContext(ButtonContext)

  // 强制使用ButtonGroup的size
  size = size || others.size || 'default'

  delete others.size

  const classes = classnames(
    {
      [clsPrefix]: true,
      [`${clsPrefix}--${type}`]: true,
      [`${clsPrefix}--${shape}`]: shape,
      [`${clsPrefix}--size-${size}`]: size,
      [`${clsPrefix}--dashed`]: dashed,
      [`${clsPrefix}--plain`]: plain,
      [`${clsPrefix}--ghost`]: ghost,
      [`${clsPrefix}--long`]: long,
      [`${clsPrefix}--disabled`]: disabled,
      [`${clsPrefix}--loading`]: loading
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
      {loading && <FasCircleNotch className={`${clsPrefix}__icon`} spin={true} />}
      {formatChildren(children)}
    </>
  )

  const allProps = {
    ...others,
    children: childrenWrapper,
    className: classes,
    disabled,
    href,
    type: htmlType,
    onClick: onClickHandler
  }

  if (href) {
    return <a ref={ref} {...allProps} />
  }
  return <button ref={ref} {...allProps} />
})

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
  clsPrefix: PropTypes.string,
  shape: PropTypes.oneOf<'circle' | 'round'>(['circle', 'round']),
  size: PropTypes.oneOf(['large', 'default', 'small']),
  type: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error', 'text'])
}

export default Button

const formatChildren = (children: React.ReactNode) => {
  return React.Children.map(children, (child) => {
    if (typeof child === 'string') {
      return <span>{child}</span>
    }
    return child
  })
}
