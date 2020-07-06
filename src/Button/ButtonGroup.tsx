import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ButtonProps } from './Button'
import ConfigContext from '../ConfigProvider/ConfigContext'
import ButtonContext, { ButtonContextProps } from './ButtonContext'

export interface ButtonGroupProps
  extends Omit<ButtonContextProps, 'groupClsPrefix'>,
    React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement<ButtonProps> | Array<React.ReactElement<ButtonProps>>
  clsPrefix?: string
  round?: boolean
}

const ButtonGroup: React.FunctionComponent<ButtonGroupProps> = (props) => {
  const { clsPrefix: rootClsPrefix } = React.useContext(ConfigContext)

  const {
    round,
    className,
    clsPrefix = `${rootClsPrefix}-button-group`,
    disableRipple,
    disableElevation,
    theme,
    variant,
    size,
    ...others
  } = props
  const classes = classnames(
    {
      [clsPrefix]: true,
      [`${clsPrefix}--round`]: round
    },
    className
  )

  return (
    <ButtonContext.Provider
      value={{
        groupClsPrefix: `${clsPrefix}`,
        size,
        disableRipple,
        disableElevation,
        theme,
        variant
      }}
    >
      <div {...others} className={classes} />
    </ButtonContext.Provider>
  )
}

ButtonGroup.displayName = 'ButtonGroup'

ButtonGroup.propTypes = {
  theme: PropTypes.oneOf([
    'default',
    'primary',
    'error',
    'warning',
    'secondary',
    'success',
    'info'
  ]),
  variant: PropTypes.oneOf(['contained', 'text', 'outlined']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disableRipple: PropTypes.bool,
  disableElevation: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired)
  ]).isRequired,
  clsPrefix: PropTypes.string,
  round: PropTypes.bool
}

export default ButtonGroup
