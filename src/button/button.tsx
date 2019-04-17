import classnames from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { namePrefix } from '../commons/config'
import { FasCircleNotch } from '../icon'

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  children?: React.ReactNode
  className?: string
  dashed?: boolean
  disabled?: boolean
  ghost?: boolean
  href?: string
  htmlType?: 'submit' | 'reset' | 'button'
  loading?: boolean
  long?: boolean
  plain?: boolean
  shape?: 'circle' | 'round'
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
  const { dashed, disabled, ghost, plain, href, htmlType, loading, long, shape, type = 'default', className, children, ...others } = props

  const classes = classnames({
    [displayName]: true,
    [`${displayName}--${type}`]: true,
    [`${displayName}--${shape}`]: shape,
    [`${displayName}--dashed`]: dashed,
    [`${displayName}--plain`]: plain,
    [`${displayName}--ghost`]: ghost,
    [`${displayName}--long`]: long,
    [`${displayName}--loading`]: loading
  }, className)

  const childrenWrapper = (
    <>
      {loading && <FasCircleNotch className={`${displayName}__icon`} spin={true}/>}
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
  type: PropTypes.oneOf<'default' | 'primary' | 'success' | 'warning' | 'error' | 'text'>(['default', 'primary', 'success', 'warning', 'error', 'text'])
}

export default React.memo(Button)
