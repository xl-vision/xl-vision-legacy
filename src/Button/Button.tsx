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
  elevation?: boolean
  round?: boolean
  long?: boolean
  loading?: boolean
}

const Button = React.forwardRef<ButtonElement, ButtonProps>((props, ref) => {
  const { clsPrefix: rootClsPrefix } = React.useContext(ConfigContext)
  const {
    clsPrefix = `${rootClsPrefix}-button`,
    theme,
    variant = 'contained',
    elevation = true,
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
    const loadingIcon = <Reload className={`${clsPrefix}__icon--loading`} />
    if (prefixIcon || !suffixIcon) {
      prefixIcon = loadingIcon
    } else {
      suffixIcon = loadingIcon
    }
  }

  const classes = classnames(clsPrefix, `${clsPrefix}--variant-${variant}`, {
    [`${clsPrefix}--theme-${theme}`]: theme,
    [`${clsPrefix}--disabled`]: disabled,
    [`${clsPrefix}--loading`]: loading,
    [`${clsPrefix}--round`]: round,
    [`${clsPrefix}--long`]: long,
    [`${clsPrefix}--elevation`]: elevation && variant === 'contained'
  })

  const prefixNode = prefixIcon && <span className={`${clsPrefix}__prefix`}>{prefixIcon}</span>
  const suffixNode = suffixIcon && <span className={`${clsPrefix}__suffix`}>{suffixIcon}</span>

  return (
    <BaseButton {...others} disabled={disabled} loading={loading} className={classes} ref={ref}>
      {prefixNode}
      {children}
      {suffixNode}
    </BaseButton>
  )
})

Button.displayName = 'Button'

Button.propTypes = {
  theme: PropTypes.oneOf(['primary', 'error', 'warning', 'secondary', 'success', 'info']),
  variant: PropTypes.oneOf(['contained', 'text', 'outlined']),
  prefixIcon: PropTypes.node,
  suffixIcon: PropTypes.node,
  disabled: PropTypes.bool,
  clsPrefix: PropTypes.string,
  elevation: PropTypes.bool,
  round: PropTypes.bool,
  long: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.node
}

export default Button
