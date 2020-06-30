import classnames from 'classnames'
import * as PropTypes from 'prop-types'
import React from 'react'
import { Reload } from '../icon'
import ConfigContext from '../ConfigProvider/ConfigContext'
import BaseButton, { BaseButtonProps, ButtonElement } from '../BaseButton'
import ButtonContext from './ButtonContext'

export type ButtonTheme = 'primary' | 'error' | 'warning' | 'secondary' | 'success' | 'info'
export type ButtonVariant = 'contained' | 'text' | 'outlined'

export interface ButtonProps extends BaseButtonProps {
  theme?: ButtonTheme
  variant?: ButtonVariant
  disableElevation?: boolean
  round?: boolean
  long?: boolean
  prefixIcon?: React.ReactNode
  suffixIcon?: React.ReactNode
}

const Button = React.forwardRef<ButtonElement, ButtonProps>((props, ref) => {
  const { clsPrefix: rootClsPrefix } = React.useContext(ConfigContext)
  const {
    groupClsPrefix,
    theme: cTheme,
    variant: cVariant,
    disableElevation: cDisableElevation,
    disableRipple: cDisableRipple
  } = React.useContext(ButtonContext)
  const {
    clsPrefix = `${rootClsPrefix}-button`,
    theme: _theme,
    variant: _variant,
    round,
    long,
    disableElevation: _disableElevation,
    prefixIcon: _prefixIcon,
    suffixIcon: _suffixIcon,
    disableRipple: _disableRipple,
    children,
    disabled,
    loading,
    className,
    ...others
  } = props

  const theme = cTheme || _theme
  const variant = cVariant || _variant || 'contained'
  const disableElevation = cDisableElevation || _disableElevation
  const disableRipple = cDisableRipple || _disableRipple

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

  const classes = classnames(
    clsPrefix,
    `${clsPrefix}--variant-${variant}`,
    {
      [`${groupClsPrefix}__child`]: groupClsPrefix,
      [`${clsPrefix}--theme-${theme}`]: theme,
      [`${clsPrefix}--disabled`]: disabled,
      [`${clsPrefix}--loading`]: loading,
      [`${clsPrefix}--round`]: round && !groupClsPrefix,
      [`${clsPrefix}--long`]: long && !groupClsPrefix,
      [`${clsPrefix}--only-icon`]:
        !children && ((prefixIcon && !suffixIcon) || (suffixIcon && !prefixIcon)),
      [`${clsPrefix}--elevation`]: !disableElevation && variant === 'contained'
    },
    className
  )

  return (
    <BaseButton
      {...others}
      disableRipple={disableRipple}
      disabled={disabled}
      loading={loading}
      className={classes}
      ref={ref}
    >
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
  disableRipple: PropTypes.bool,
  disableElevation: PropTypes.bool,
  disabled: PropTypes.bool,
  clsPrefix: PropTypes.string,
  className: PropTypes.string,
  round: PropTypes.bool,
  long: PropTypes.bool,
  loading: PropTypes.bool,
  prefixIcon: PropTypes.node,
  suffixIcon: PropTypes.node,
  children: PropTypes.node
}

export default Button
