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
  round?: boolean
  target?: string
  type?: 'primary' | 'success' | 'warning' | 'error' | 'text' | 'default',
}

const displayName = `${namePrefix}-button`

const Button: React.FunctionComponent<ButtonProps> = props => {
  const { disabled, ghost, href, htmlType, icon, loading, long, round, target, type = 'default', className, style, children, ...others } = props
  const classes = classnames({
    [displayName]: true,
    [`${displayName}--${type}`]: true,
    [`${displayName}--round`]: round,
    [`${displayName}--long`]: long,
    [`${displayName}--ghost`]: ghost,
    [`${displayName}--loading`]: loading,
    [`${displayName}--disabled`]: disabled
  }, className)

  const actualIcon = loading ? <FasSpinner spin={true}/> : icon

  return (
    <button className={classes}>
      {[actualIcon, children]}
    </button>
  )
}

Button.displayName = displayName

export default Button
