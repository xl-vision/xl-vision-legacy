import classnames from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { namePrefix } from '../commons/config'
import { FasSpinner } from '../icon'

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  ghost?: boolean
  href?: string
  htmlType?: 'submit' | 'reset' | 'button'
  loading?: boolean
  long?: boolean
  plain?: boolean
  shape?: 'circle' | 'round'
  target?: string
  type?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'text'
}

const displayName = `${namePrefix}-button`

const formatChildren = (children: React.ReactNode) => {
  return React.Children.map(children, child => {
    if (typeof child === 'string') {
      return <span>{child}</span>
    }
    return child
  })
}

const Button: React.FunctionComponent<ButtonProps> = props => {
  const { disabled, ghost, plain, href, htmlType, loading, long, shape, target, type = 'default', className, children, ...others } = props
  const classes = classnames({
    [displayName]: true,
    [`${displayName}--${type}`]: true,
    [`${displayName}--${shape}`]: shape,
    [`${displayName}--plain`]: plain,
    [`${displayName}--ghost`]: ghost,
    [`${displayName}--long`]: long,
    [`${displayName}--loading`]: loading
  }, className)

  const childrenWrapper = (
    <>
      {loading && <FasSpinner className={`${displayName}__icon`} spin={true}/>}
      {formatChildren(children)}
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

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  ghost: PropTypes.bool,
  href: PropTypes.string,
  htmlType: PropTypes.oneOf<'submit' | 'reset' | 'button'>(['submit', 'reset', 'button']),
  loading: PropTypes.bool,
  long: PropTypes.bool,
  plain: PropTypes.bool,
  shape: PropTypes.oneOf<'circle' | 'round'>(['circle', 'round']),
  target: PropTypes.string,
  type: PropTypes.oneOf<'default' | 'primary' | 'success' | 'warning' | 'error' | 'text'>(['default' , 'primary' , 'success' , 'warning' , 'error' , 'text'])
}

export default Button
