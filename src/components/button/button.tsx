import * as React from 'react'
// import * as PropTypes from 'prop-types'
import classnames from 'classnames'

export interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean,
  prefixCls?: string
}

export default function (props: ButtonProps) {

  const { prefixCls = 'xl-button', className, children, disabled, ...otherProps } = props

  const buttonClasses = classnames({
    [prefixCls]: true,
    [`${prefixCls}--disabled`]: disabled
  }, className)

  const click = otherProps.onClick
  otherProps.onClick = (e) => {
    !disabled && click && click(e)
  }

  return (
    <button className={buttonClasses} {...otherProps}>
      <span>{children}</span>
    </button>
  )
}
