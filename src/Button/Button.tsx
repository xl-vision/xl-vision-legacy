import classnames from 'classnames'
import * as PropTypes from 'prop-types'
import React from 'react'
import { Reload, IconProps } from '../icon'
import ButtonContext from './ButtonContext'
import ConfigContext from '../ConfigProvider/ConfigContext'
import BaseButton, { BaseButtonProps, ButtonElement } from '../BaseButton'

export type ButtonTheme = 'primary' | 'error' | 'warning' | 'secondary' | 'success' | 'info'
export type ButtonVariant = 'contained' | 'text' | 'outlined'

export interface ButtonProps extends BaseButtonProps {
  prefixIcon?: React.ReactNode
  suffixIcon?: React.ReactNode
  theme?: ButtonTheme
  variant?: ButtonVariant
  circle?: boolean
}

const Button = React.forwardRef<ButtonElement, ButtonProps>((props, ref) => {
  const { clsPrefix: rootClsPrefix } = React.useContext(ConfigContext)
  const {
    clsPrefix = `${rootClsPrefix}-button`,
    theme,
    variant = 'contained',
    prefixIcon,
    suffixIcon,
    disabled,
    ...others
  } = props

  const classes = classnames(clsPrefix, `${clsPrefix}--variant-${variant}`, {
    [`${clsPrefix}--theme-${theme}`]: theme,
    [`${clsPrefix}--disabled`]: disabled
  })

  return <BaseButton {...others} disabled={disabled} className={classes} ref={ref} />
})

Button.displayName = 'Button'

Button.propTypes = {
  theme: PropTypes.oneOf(['primary', 'error', 'warning', 'secondary', 'success', 'info']),
  variant: PropTypes.oneOf(['contained', 'text', 'outlined']),
  prefixIcon: PropTypes.node,
  suffixIcon: PropTypes.node,
  disabled: PropTypes.bool,
  clsPrefix: PropTypes.string
}

export default Button
