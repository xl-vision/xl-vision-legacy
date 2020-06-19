import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ButtonProps, ButtonSize } from './Button'
import ButtonContext from './ButtonContext'
import ConfigContext from '../ConfigProvider/ConfigContext'

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement<ButtonProps> | Array<React.ReactElement<ButtonProps>>
  clsPrefix?: string
  round?: boolean
  size?: ButtonSize
  vertical?: boolean
}

const ButtonGroup: React.FunctionComponent<ButtonGroupProps> = (props) => {
  const { clsPrefix: rootClsPrefix } = React.useContext(ConfigContext)

  const {
    round,
    vertical,
    className,
    clsPrefix = `${rootClsPrefix}-button-group`,
    size = 'default',
    ...others
  } = props
  const classes = classnames(
    {
      [clsPrefix]: true,
      [`${clsPrefix}--horizontal`]: !vertical,
      [`${clsPrefix}--vertical`]: vertical,
      [`${clsPrefix}--round`]: round
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
  clsPrefix: PropTypes.string,
  round: PropTypes.bool,
  size: PropTypes.oneOf(['large', 'default', 'small']),
  vertical: PropTypes.bool
}

export default ButtonGroup
