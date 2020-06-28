import classnames from 'classnames'
import * as PropTypes from 'prop-types'
import React from 'react'
import { Reload, IconProps } from '../icon'
import ButtonContext from './ButtonContext'
import ConfigContext from '../ConfigProvider/ConfigContext'
import Ripple from '../Ripple'
import BaseButton, { BaseButtonProps, ButtonElement } from '../BaseButton'

export interface ButtonProps extends BaseButtonProps {}

const Button = React.forwardRef<ButtonElement, ButtonProps>((props, ref) => {
  const { ...others } = props

  return <BaseButton {...others} ref={ref} />
})

Button.displayName = 'Button'

Button.propTypes = {}

export default Button
