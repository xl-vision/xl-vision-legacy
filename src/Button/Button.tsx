import classnames from 'classnames'
import * as PropTypes from 'prop-types'
import React from 'react'
import { Reload } from '../icon'
import ConfigContext from '../ConfigProvider/ConfigContext'
import BaseButton, { BaseButtonProps, ButtonElement } from '../BaseButton'

export type ButtonTheme = 'primary' | 'error' | 'warning' | 'secondary' | 'success' | 'info'
export type ButtonVariant = 'contained' | 'text' | 'outlined'

export interface ButtonProps extends BaseButtonProps {
  theme?: ButtonTheme
  variant?: ButtonVariant
  disableElevation?: boolean
  round?: boolean
  long?: boolean
  loading?: boolean
  prefixIcon?: React.ReactNode
  suffixIcon?: React.ReactNode
}

const Button = React.forwardRef<ButtonElement, ButtonProps>((props, ref) => {
  const { clsPrefix: rootClsPrefix } = React.useContext(ConfigContext)
  const {
    clsPrefix = `${rootClsPrefix}-button`,
    theme,
    variant = 'contained',
    disableElevation,
    round,
    long,
    prefixIcon: _prefixIcon,
    suffixIcon: _suffixIcon,
    children,
    disabled,
    loading,
    ...others
  } = props

  let prefixIcon = _prefixIcon
  let suffixIcon = _suffixIcon

  if (loading) {
    if (prefixIcon || !suffixIcon) {
      prefixIcon = <Reload className={`${clsPrefix}__icon--loading`} />
    } else {
      suffixIcon = <Reload className={`${clsPrefix}__icon--loading`} />
    }
  }

  if (prefixIcon && (children || suffixIcon)) {
    prefixIcon = <span className={`${clsPrefix}__prefix`}>{prefixIcon}</span>
  }

  if (suffixIcon && (children || prefixIcon)) {
    suffixIcon = <span className={`${clsPrefix}__suffix`}>{suffixIcon}</span>
  }

  const classes = classnames(clsPrefix, `${clsPrefix}--variant-${variant}`, {
    [`${clsPrefix}--theme-${theme}`]: theme,
    [`${clsPrefix}--disabled`]: disabled,
    [`${clsPrefix}--loading`]: loading,
    [`${clsPrefix}--round`]: round,
    [`${clsPrefix}--long`]: long,
    [`${clsPrefix}--only-icon`]:
      !children && ((prefixIcon && !suffixIcon) || (suffixIcon && !prefixIcon)),
    [`${clsPrefix}--elevation`]: !disableElevation && variant === 'contained'
  })

  return (
    <BaseButton {...others} disabled={disabled} loading={loading} className={classes} ref={ref}>
      {prefixIcon}
      {children}
      {suffixIcon}
    </BaseButton>
  )
})

Button.displayName = 'Button'

Button.propTypes = {
  theme: PropTypes.oneOf(['primary', 'error', 'warning', 'secondary', 'success', 'info']),
  variant: PropTypes.oneOf(['contained', 'text', 'outlined']),
  disabled: PropTypes.bool,
  clsPrefix: PropTypes.string,
  disableElevation: PropTypes.bool,
  round: PropTypes.bool,
  long: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.node,
  children: PropTypes.node
}

export default Button
