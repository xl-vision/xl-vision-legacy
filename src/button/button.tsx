import classnames from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { namePrefix } from '../commons/config'
import { FasCircleNotch } from '../icon'

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
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
  type?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'text'
}

export const displayName = `${namePrefix}-button`

const formatChildren = (children: React.ReactNode) => {
  return React.Children.map(children, child => {
    if (typeof child === 'string') {
      return <span>{child}</span>
    }
    return child
  })
}

const Button: React.FunctionComponent<ButtonProps> = React.forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>((props, ref) => {
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
    ...others
  } = props

  const classes = classnames({
    [prefixCls]: true,
    [`${prefixCls}--${type}`]: true,
    [`${prefixCls}--${shape}`]: shape,
    [`${prefixCls}--dashed`]: dashed,
    [`${prefixCls}--plain`]: plain,
    [`${prefixCls}--ghost`]: ghost,
    [`${prefixCls}--long`]: long,
    [`${prefixCls}--loading`]: loading
  }, className)

  const childrenWrapper = (
    <>
      {loading && <FasCircleNotch className={`${prefixCls}__icon`} spin={true}/>}
      {formatChildren(children)}
    </>
  )

  const allProps = {
    children: childrenWrapper,
    className: classes,
    disabled,
    href,
    type: htmlType,
    ...others
  }

  if (href) {
    return <a ref={ref} {...allProps}/>
  }
  return <button ref={ref} {...allProps}/>
})

Button.displayName = displayName

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  ghost: PropTypes.bool,
  href: PropTypes.string,
  htmlType: PropTypes.oneOf<'submit' | 'reset' | 'button'>(['submit', 'reset', 'button']),
  loading: PropTypes.bool,
  long: PropTypes.bool,
  plain: PropTypes.bool,
  prefixCls: PropTypes.string,
  shape: PropTypes.oneOf<'circle' | 'round'>(['circle', 'round']),
  type: PropTypes.oneOf<'default' | 'primary' | 'success' | 'warning' | 'error' | 'text'>(['default', 'primary', 'success', 'warning', 'error', 'text'])
}

export default Button
