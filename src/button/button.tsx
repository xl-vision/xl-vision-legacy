import classnames from 'classnames'
import * as React from 'react'
import { namePrefix } from '../commons/config'
import { FasSpinner } from '../icon'

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  disabled?: boolean
  ghost?: boolean
  href?: string
  htmlType?: 'submit' | 'reset' | 'button'
  icon?: React.ReactElement
  loading?: boolean
  long?: boolean
  plain?: boolean
  shape?: 'circle' | 'round'
  target?: string
  type?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'text'
}

const displayName = `${namePrefix}-button`

const Button: React.FunctionComponent<ButtonProps> = props => {
  const { disabled, ghost, plain, href, htmlType, icon, loading, long, shape, target, type = 'default', className, children, ...others } = props
  const classes = classnames({
    [displayName]: true,
    [`${displayName}--${type}`]: true,
    [`${displayName}--${shape}`]: shape,
    [`${displayName}--plain`]: plain,
    [`${displayName}--ghost`]: ghost,
    [`${displayName}--long`]: long,
    [`${displayName}--loading`]: loading
  }, className)

  const actualIcon = loading ? <FasSpinner className={`${displayName}__icon`} spin={true}/> : icon ? React.cloneElement(icon, {
    className: classnames(`${displayName}__icon`, icon.props.className)
  }) : null

  const childrenWrapper = (
    <>
      {actualIcon}
      {children && <span>{children}</span>}
    </>
  )

  const allProps = {
    children: childrenWrapper,
    className: classes,
    disabled,
    href,
    target,
    type: htmlType,
    ...others
  }

  if (href) {
    return <a {...allProps}/>
  }
  return <button {...allProps}/>
}

Button.displayName = displayName

export default Button
