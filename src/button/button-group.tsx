import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { namePrefix } from '../commons/config'
import { ButtonProps, ButtonSize } from './button'
import ButtonContext from './button-context'

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement<ButtonProps> | React.ReactElement<ButtonProps>[]
  prefixCls?: string
  round?: boolean
  size?: ButtonSize
  vertical?: boolean
}

const ButtonGroup: React.FunctionComponent<ButtonGroupProps> = props => {
  const {
    round,
    vertical,
    className,
    prefixCls = `${namePrefix}-button-group`,
    size = 'default',
    ...others
  } = props
  const classes = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--horizontal`]: !vertical,
      [`${prefixCls}--vertical`]: vertical,
      [`${prefixCls}--round`]: round
    },
    className
  )

  return (
    <ButtonContext.Provider value={{ size }}>
      <div {...others} className={classes} />
    </ButtonContext.Provider>
  )
}

ButtonGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired)
  ]).isRequired,
  prefixCls: PropTypes.string,
  round: PropTypes.bool,
  size: PropTypes.oneOf(['large', 'default', 'small']),
  vertical: PropTypes.bool
}

export default ButtonGroup
